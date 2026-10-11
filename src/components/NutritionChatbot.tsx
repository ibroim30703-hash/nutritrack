import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  Phone,
  Video,
  Info,
  X,
  CheckCircle2,
  Trash2,
  Plus,
  Camera,
  Mic,
  Smile,
  ThumbsUp,
  ChefHat,
  Flame,
  CheckCheck,
  BookOpen,
  ArrowRight,
  RefreshCw,
  PhoneOff,
  VideoOff,
  Heart,
  Footprints,
  Clock,
  ExternalLink,
} from 'lucide-react';
import {
  UserProfile,
  BmiResult,
  LoggedFood,
  WearableDeviceState,
  DietPlan,
  PlanMealSlot,
  MealProposal,
} from '../types/nutrition';
import { ChatMessageItem, saveChatMessageToFirestore } from '../lib/firebase';
import { User } from 'firebase/auth';

interface NutritionChatbotProps {
  profile: UserProfile;
  bmiResult: BmiResult;
  dietPlan: DietPlan;
  loggedFoods: LoggedFood[];
  wearableState: WearableDeviceState;
  currentUser: User | null;
  savedChatHistory?: ChatMessageItem[];
  onAlterDietPlanMeal?: (slot: string, newMeal: PlanMealSlot) => void;
  onResetDietPlan?: () => void;
  onNavigateTab?: (tab: string) => void;
}

// Replaces all * and # characters with clean typography
const stripMarkdownSigns = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/#/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\*/g, '•');
};

const formatCleanInline = (text: string, isUser: boolean): React.ReactNode => {
  const withoutHash = text.replace(/#/g, '');
  const boldParts = withoutHash.split(/(\*\*.*?\*\*)/g);

  return boldParts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2).replace(/[*#]/g, '');
      return (
        <strong
          key={index}
          className={`font-semibold ${isUser ? 'text-white font-bold' : 'text-black font-semibold'}`}
        >
          {inner}
        </strong>
      );
    }

    const subParts = part.split(/(\*.*?\*)/g);
    return subParts.map((sub, subIndex) => {
      if (sub.startsWith('*') && sub.endsWith('*') && sub.length > 2) {
        const innerSub = sub.slice(1, -1).replace(/[*#]/g, '');
        return (
          <span
            key={`${index}-${subIndex}`}
            className={isUser ? 'text-white' : 'text-black'}
          >
            {innerSub}
          </span>
        );
      }
      const sanitized = sub.replace(/\*/g, '•').replace(/#/g, '');
      return <React.Fragment key={`${index}-${subIndex}`}>{sanitized}</React.Fragment>;
    });
  });
};

const renderCleanMessageText = (rawText: string, isUser: boolean) => {
  if (!rawText) return null;

  const lines = rawText.split('\n');

  return (
    <div className="space-y-1.5">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1" />;
        }

        // Header starting with #
        const headerMatch = trimmed.match(/^#{1,6}\s*(.*)$/);
        if (headerMatch) {
          const cleanHeader = headerMatch[1].replace(/[*#]/g, '').trim();
          return (
            <div
              key={lineIdx}
              className={`font-bold text-sm pt-0.5 ${isUser ? 'text-white' : 'text-black'}`}
            >
              {cleanHeader}
            </div>
          );
        }

        // Bullet starting with *, -, or •
        const bulletMatch = trimmed.match(/^(\*|-|•)\s+(.*)$/);
        if (bulletMatch) {
          const bulletContent = bulletMatch[2].replace(/[*#]/g, '').trim();
          return (
            <div key={lineIdx} className="flex items-start gap-1.5 pl-0.5">
              <span className={`font-bold shrink-0 ${isUser ? 'text-blue-200' : 'text-black'}`}>
                •
              </span>
              <span className="flex-1">{formatCleanInline(bulletContent, isUser)}</span>
            </div>
          );
        }

        return (
          <p key={lineIdx} className="leading-relaxed">
            {formatCleanInline(line, isUser)}
          </p>
        );
      })}
    </div>
  );
};

export const NutritionChatbot: React.FC<NutritionChatbotProps> = ({
  profile,
  bmiResult,
  dietPlan,
  loggedFoods,
  wearableState,
  currentUser,
  savedChatHistory = [],
  onAlterDietPlanMeal,
  onResetDietPlan,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
    if (savedChatHistory && savedChatHistory.length > 0) {
      return savedChatHistory.map((m) => ({
        ...m,
        text: stripMarkdownSigns(m.text),
      }));
    }
    const local = localStorage.getItem('nutritrack_chat_history');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return parsed.map((m: ChatMessageItem) => ({
          ...m,
          text: stripMarkdownSigns(m.text),
        }));
      } catch (e) {}
    }
    return [
      {
        id: 'msg_welcome',
        role: 'model',
        text: `Hey there! I'm Dr. NutriBot, your personal nutritionist.

I took a quick look at your goals—you're working with a daily target of around ${bmiResult.targetCalories} kcal with a focus on ${profile.fitnessGoal.replace(/_/g, ' ')}.

Whenever you feel like switching up your meals, want something lighter or higher in protein, or just have a question about what to eat, let me know! If you want to change any meal in your plan, just ask and I can swap it for you right here.

How has your eating been going today?`,
        timestamp: Date.now(),
        status: 'read',
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelSpeed, setModelSpeed] = useState<'standard' | 'fast'>('standard');
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false);
  const [activeCallModal, setActiveCallModal] = useState<'audio' | 'video' | null>(null);
  const [callTimer, setCallTimer] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync incoming Firestore messages if updated
  useEffect(() => {
    if (savedChatHistory && savedChatHistory.length > 0) {
      setMessages(
        savedChatHistory.map((m) => ({
          ...m,
          text: stripMarkdownSigns(m.text),
        }))
      );
    }
  }, [savedChatHistory]);

  // Persist locally
  useEffect(() => {
    localStorage.setItem('nutritrack_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isRecordingVoice]);

  // Simulated Call Timer
  useEffect(() => {
    let interval: any = null;
    if (activeCallModal) {
      setCallTimer(0);
      interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeCallModal]);

  const quickPrompts = [
    '🔄 Swap supper to high-protein grilled salmon',
    '🥗 Make my lunch plant-based & high-fiber',
    '🥞 Suggest a lower-carb breakfast idea',
    '⚡ Pre-workout snack under 200 kcal',
    '🇮🇹 Switch my active plan to Italian cuisine',
    '📉 How can I break a weight loss plateau?',
  ];

  const foodEmojis = ['🥗', '🥑', '🥩', '🍳', '🥦', '🍎', '🍣', '🫐', '🍗', '🥜', '🥣', '🍵'];

  const formatCallTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessageItem = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      text,
      timestamp: Date.now(),
      status: 'sent',
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setShowEmojiPicker(false);
    setIsLoading(true);

    if (currentUser) {
      saveChatMessageToFirestore(currentUser.uid, userMessage).catch(console.error);
    }

    try {
      const caloriesConsumed = loggedFoods.reduce((sum, item) => sum + item.calories, 0);

      // Pass active meal program to Gemini context so Dr. NutriBot can inspect current dishes
      const activePlanMeals = dietPlan.meals.map((m) => ({
        slot: m.slot,
        slotLabel: m.slotLabel,
        title: m.title,
        calories: m.calories,
        protein: m.protein,
        carbs: m.carbs,
        fats: m.fats,
      }));

      const userContext = {
        age: profile.age,
        gender: profile.gender,
        heightCm: profile.heightCm,
        weightKg: profile.weightKg,
        targetWeightKg: profile.targetWeightKg,
        bmi: bmiResult.bmi,
        category: bmiResult.category,
        bmr: bmiResult.bmr,
        tdee: bmiResult.tdee,
        targetCalories: bmiResult.targetCalories,
        calorieDeficitOrSurplus: bmiResult.calorieDeficitOrSurplus,
        fitnessGoal: profile.fitnessGoal,
        dietPreference: profile.dietPreference,
        caloriesConsumed,
        wearableBurn: wearableState.activeCaloriesBurned,
        activePlanMeals,
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, text: m.text })),
          userContext,
          modelChoice: modelSpeed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get nutrition consultation response.');
      }

      const botMessage: ChatMessageItem = {
        id: `msg_bot_${Date.now()}`,
        role: 'model',
        text: stripMarkdownSigns(data.text),
        proposal: data.proposal || undefined,
        timestamp: Date.now(),
        status: 'delivered',
      };

      setMessages((prev) => [...prev, botMessage]);

      if (currentUser) {
        saveChatMessageToFirestore(currentUser.uid, botMessage).catch(console.error);
      }
    } catch (err: any) {
      console.error('Chat consultation error:', err);
      const errorMessage: ChatMessageItem = {
        id: `msg_err_${Date.now()}`,
        role: 'model',
        text: `⚠️ ${err.message || 'Unable to connect to Dr. NutriBot. Please check your network connection.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendThumbsUp = () => {
    handleSendMessage('👍');
  };

  const handleAcceptProposal = (messageId: string, proposal: MealProposal) => {
    if (!onAlterDietPlanMeal) return;

    // Find current meal in slot to preserve labeling
    const currentMeal = dietPlan.meals.find((m) => m.slot === proposal.slot);

    const newPlanMeal: PlanMealSlot = {
      slot: proposal.slot,
      slotLabel: proposal.slotLabel || currentMeal?.slotLabel || `Course: ${proposal.slot}`,
      courseCategory: currentMeal?.courseCategory || 'supper',
      title: proposal.title,
      description: proposal.description,
      calories: proposal.calories,
      protein: proposal.protein,
      carbs: proposal.carbs,
      fats: proposal.fats,
      fiber: proposal.fiber || 5,
      ingredients: proposal.ingredients || [],
      instructions: proposal.instructions || [
        'Prepare fresh ingredients and assemble meal according to clinical portion guidelines.',
      ],
      prepTime: proposal.prepTime || '15 mins',
      chefTip: proposal.chefTip || 'Prepared according to clinical nutritionist guidelines.',
      whatShouldBeEaten: proposal.whatShouldBeEaten || proposal.rationale || 'Nutritionally tailored replacement meal.',
      image: proposal.image || currentMeal?.image,
    };

    // Apply alteration to active DietPlan
    onAlterDietPlanMeal(proposal.slot, newPlanMeal);

    // Update message proposal state to 'accepted'
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId && m.proposal) {
          return {
            ...m,
            proposal: {
              ...m.proposal,
              status: 'accepted',
            },
          };
        }
        return m;
      })
    );

    // Post bot confirmation message in chat
    const confirmMessage: ChatMessageItem = {
      id: `msg_confirm_${Date.now()}`,
      role: 'model',
      text: `All done! I've swapped your ${newPlanMeal.slotLabel} for ${newPlanMeal.title} (${newPlanMeal.calories} kcal · ${newPlanMeal.protein}g Protein).

Your daily calorie budget and macros are all updated. You can check out the full recipe and ingredients in your Diet Plan tab whenever you're ready!`,
      timestamp: Date.now(),
      status: 'delivered',
    };

    setMessages((prev) => [...prev, confirmMessage]);

    if (currentUser) {
      saveChatMessageToFirestore(currentUser.uid, confirmMessage).catch(console.error);
    }

    setActionSuccessToast(`Updated ${newPlanMeal.slotLabel} to "${newPlanMeal.title}"`);
    setTimeout(() => setActionSuccessToast(null), 4500);
  };

  const handleDeclineProposal = (messageId: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id === messageId && m.proposal) {
          return {
            ...m,
            proposal: {
              ...m.proposal,
              status: 'declined',
            },
          };
        }
        return m;
      })
    );

    const declineMsg: ChatMessageItem = {
      id: `msg_decline_${Date.now()}`,
      role: 'model',
      text: `Sounds good! I kept your current meal in place. If there's anything else you'd like to try or adjust instead, just say the word!`,
      timestamp: Date.now(),
      status: 'delivered',
    };
    setMessages((prev) => [...prev, declineMsg]);
  };

  const handleClearHistory = () => {
    const welcome: ChatMessageItem = {
      id: `msg_welcome_${Date.now()}`,
      role: 'model',
      text: `All cleared! What would you like to chat about or tweak in your meals?`,
      timestamp: Date.now(),
      status: 'read',
    };
    setMessages([welcome]);
    localStorage.removeItem('nutritrack_chat_history');
  };

  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col h-[760px] max-h-[85vh]">
      {/* Toast Notification for Plan Modifications */}
      {actionSuccessToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{actionSuccessToast}</span>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('diet-plan')}
              className="ml-2 underline text-white hover:text-emerald-100 font-bold"
            >
              View Plan &rarr;
            </button>
          )}
        </div>
      )}

      {/* Messenger App Header */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between gap-3 shadow-xs shrink-0 z-10">
        {/* Clinician Profile */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-xs ring-2 ring-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            {/* Green Active Dot */}
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900 animate-pulse"
              title="Active now"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1">
                <span>Dr. NutriBot</span>
                <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-black">
                  ✓
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Active now</span>
              <span>·</span>
              <span className="hidden sm:inline">AI Nutrition Guide</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Simulated Call Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Audio Call Button */}
          <button
            type="button"
            onClick={() => setActiveCallModal('audio')}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            title="Start Audio Consultation"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Video Call Button */}
          <button
            type="button"
            onClick={() => setActiveCallModal('video')}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            title="Start Video Consultation"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Patient Info Drawer Toggle */}
          <button
            type="button"
            onClick={() => setIsPatientInfoOpen(!isPatientInfoOpen)}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isPatientInfoOpen
                ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title="Nutrition Profile"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Model Speed Selector */}
          <div className="hidden md:flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-[11px]">
            <button
              onClick={() => setModelSpeed('standard')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                modelSpeed === 'standard'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
              }`}
              title="Gemini 3.5 Flash: Comprehensive Nutrition Analysis"
            >
              In-Depth
            </button>
            <button
              onClick={() => setModelSpeed('fast')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                modelSpeed === 'fast'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
              }`}
              title="Gemini 3.1 Flash Lite: High-Speed Responses"
            >
              Lite
            </button>
          </div>

          {/* Clear History */}
          <button
            type="button"
            onClick={handleClearHistory}
            className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Important Doctor Consultation Notice Banner */}
      <div className="bg-amber-50/90 dark:bg-amber-950/50 border-b border-amber-200/80 dark:border-amber-900/60 px-4 py-2 text-[11px] text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className="font-bold shrink-0">⚠️ Health Notice:</span>
          <span>
            NutriBot provides nutritional and meal guidance only. No clinical or medical advice is given. If you experience serious health problems, illness, or severe symptoms, please visit a doctor.
          </span>
        </div>
      </div>

      {/* Main Chat Canvas with Optional Patient Info Sidebar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left/Center: Message Stream */}
        <div className="flex-1 flex flex-col bg-neutral-50/60 dark:bg-neutral-950/40 overflow-hidden">
          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Date Badge */}
            <div className="flex justify-center my-2">
              <span className="px-3 py-0.5 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-[10px] font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                TODAY
              </span>
            </div>

            {messages.map((message) => {
              const isUser = message.role === 'user';
              const hasProposal = !!message.proposal;

              return (
                <div
                  key={message.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] sm:max-w-[78%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Bot Avatar */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-0.5 text-xs">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Chat Bubble */}
                    <div
                      className={`relative px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs transition-all ${
                        isUser
                          ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 text-white rounded-2xl rounded-br-xs'
                          : 'bg-white dark:bg-white text-black font-normal border border-neutral-200/90 rounded-2xl rounded-bl-xs'
                      }`}
                    >
                      <div className="font-sans text-xs sm:text-[13px] leading-relaxed selection:bg-neutral-200 selection:text-black">
                        {renderCleanMessageText(message.text, isUser)}
                      </div>

                      {/* Time & Read Receipts */}
                      <div
                        className={`text-[9px] mt-1 font-mono flex items-center justify-end gap-1 ${
                          isUser ? 'text-blue-100' : 'text-neutral-500'
                        }`}
                      >
                        <span>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {isUser && (
                          <span title="Delivered and seen">
                            <CheckCheck className="w-3 h-3 inline-block" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Meal Alteration Proposal Card */}
                  {hasProposal && message.proposal && (
                    <div className="ml-9 max-w-[88%] sm:max-w-[80%] rounded-2xl border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-white text-black p-4 shadow-sm space-y-3.5 transition-all">
                      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-200 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                            <ChefHat className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-700 block tracking-wider">
                              Diet Plan Alteration Proposal
                            </span>
                            <span className="text-xs font-semibold text-black">
                              {message.proposal.slotLabel || `Course: ${message.proposal.slot}`}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono font-bold text-black bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                          {message.proposal.calories} kcal
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-black">
                          {message.proposal.title}
                        </h4>
                        <p className="text-xs text-black/90 mt-0.5">
                          {message.proposal.description}
                        </p>
                      </div>

                      {/* Macro Specs Grid */}
                      <div className="grid grid-cols-4 gap-2 text-center p-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                        <div>
                          <span className="text-[9px] text-neutral-600 block">Protein</span>
                          <span className="font-bold text-emerald-700 font-mono">
                            {message.proposal.protein}g
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-neutral-600 block">Carbs</span>
                          <span className="font-bold text-amber-700 font-mono">
                            {message.proposal.carbs}g
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-neutral-600 block">Fats</span>
                          <span className="font-bold text-blue-700 font-mono">
                            {message.proposal.fats}g
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] text-neutral-600 block">Fiber</span>
                          <span className="font-bold text-teal-700 font-mono">
                            {message.proposal.fiber || 5}g
                          </span>
                        </div>
                      </div>

                      {/* Ingredients Pill List */}
                      {message.proposal.ingredients && message.proposal.ingredients.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-wider block">
                            Included Ingredients:
                          </span>
                          <div className="flex flex-wrap gap-1 text-[11px]">
                            {message.proposal.ingredients.map((ing, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-neutral-100 text-black border border-neutral-200"
                              >
                                {ing}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Clinical Tip */}
                      {message.proposal.chefTip && (
                        <div className="text-[11px] text-black bg-emerald-50/70 p-2 rounded-lg border border-emerald-200 leading-relaxed">
                          <strong className="text-emerald-900">
                            Helpful Tip:{' '}
                          </strong>
                          {message.proposal.chefTip}
                        </div>
                      )}

                      {/* Interactive Confirmation Question & Buttons */}
                      <div className="pt-2 border-t border-neutral-100">
                        {(!message.proposal.status || message.proposal.status === 'pending') && (
                          <div className="space-y-2.5">
                            <p className="text-xs font-semibold text-black flex items-center gap-1.5">
                              <span>👉 Would you like me to update your active meal program with this change?</span>
                            </p>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleAcceptProposal(message.id, message.proposal!)}
                                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Accept & Apply to Diet Plan</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeclineProposal(message.id)}
                                className="py-2 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-600 dark:text-neutral-300 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                              >
                                Keep Current
                              </button>
                            </div>
                          </div>
                        )}

                        {message.proposal.status === 'accepted' && (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs">
                            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200 font-semibold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Applied to Active Diet Plan</span>
                            </div>

                            {onNavigateTab && (
                              <button
                                type="button"
                                onClick={() => onNavigateTab('diet-plan')}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                              >
                                <span>View Plan</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}

                        {message.proposal.status === 'declined' && (
                          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-500 text-center">
                            Proposal Declined — Current meal plan retained.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Messenger Bounce Typing Indicator */}
            {isLoading && (
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mb-0.5 text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-750 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-neutral-400 ml-1.5 font-medium">Dr. NutriBot is typing...</span>
                </div>
              </div>
            )}

            {/* Voice Recording Simulation Indicator */}
            {isRecordingVoice && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl text-xs text-rose-700 dark:text-rose-300 animate-pulse">
                <Mic className="w-4 h-4 text-rose-600 animate-ping" />
                <span>Simulated Voice Note Recording... Say your request or tap mic to send.</span>
                <button
                  onClick={() => {
                    setIsRecordingVoice(false);
                    handleSendMessage('Can you swap my supper for something lighter under 400 kcal?');
                  }}
                  className="ml-auto px-2.5 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-lg"
                >
                  Send Audio
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Messenger Quick-Reply Suggestions Carousel */}
          <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800/60 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs shrink-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0 mr-1">
              Suggestions:
            </span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 whitespace-nowrap transition-colors cursor-pointer text-xs font-medium border border-neutral-200/60 dark:border-neutral-700/60 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Emoji Floating Bar */}
          {showEmojiPicker && (
            <div className="p-2 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2 overflow-x-auto">
              {foodEmojis.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInput((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Messenger Bottom Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-2 shrink-0"
          >
            {/* Attachment / Action shortcuts */}
            <div className="flex items-center gap-1 text-neutral-400">
              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('camera')}
                  className="p-2 hover:text-emerald-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
                  title="Open AI Food Scanner"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsRecordingVoice(!isRecordingVoice)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isRecordingVoice
                    ? 'text-rose-600 bg-rose-50 dark:bg-rose-950'
                    : 'hover:text-blue-600 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Pill Input Container */}
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Aa · Message Dr. NutriBot to alter meals..."
                disabled={isLoading}
                className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm border border-neutral-200 dark:border-neutral-750 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-neutral-100/80 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              />

              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                title="Insert Food Emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>

            {/* Dynamic Send / Thumbs Up Button */}
            {input.trim() ? (
              <button
                type="submit"
                disabled={isLoading}
                className="p-2.5 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 rounded-full font-semibold text-xs flex items-center justify-center transition-colors shadow-xs cursor-pointer shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendThumbsUp}
                disabled={isLoading}
                className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-full transition-colors cursor-pointer shrink-0"
                title="Send Thumbs Up"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Right Drawer: User Nutrition Profile & Active Courses Summary */}
        {isPatientInfoOpen && (
          <div className="w-72 sm:w-80 border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 overflow-y-auto space-y-4 shrink-0 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Member Nutrition Profile
              </h4>
              <button
                onClick={() => setIsPatientInfoOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Patient Vitals Card */}
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">BMI Metric:</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {bmiResult.bmi} ({bmiResult.category})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Target Calories:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {bmiResult.targetCalories} kcal
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Biological Sex:</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 capitalize">
                  {profile.gender}, {profile.age}y
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Weight & Target:</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {profile.weightKg}kg &rarr; {profile.targetWeightKg}kg
                </span>
              </div>
            </div>

            {/* Active Meal Plan Courses */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Active Prescribed Meals
                </h5>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  {dietPlan.cuisineFlag} {dietPlan.cuisineName}
                </span>
              </div>

              <div className="space-y-2">
                {dietPlan.meals.map((meal) => (
                  <div
                    key={meal.slot}
                    className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-750 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                        {meal.slotLabel || meal.slot}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-500">
                        {meal.calories} kcal
                      </span>
                    </div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {meal.title}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {meal.protein}g P · {meal.carbs}g C · {meal.fats}g F
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wearable Real-time Status */}
            <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-200 text-[11px]">
                <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>Wearable Telemetry Active</span>
              </div>
              <div className="flex justify-between text-[11px] text-blue-800 dark:text-blue-300">
                <span>Heart Rate:</span>
                <span className="font-mono font-bold">{wearableState.liveHeartRateBpm} BPM</span>
              </div>
              <div className="flex justify-between text-[11px] text-blue-800 dark:text-blue-300">
                <span>Active Burn:</span>
                <span className="font-mono font-bold">+{wearableState.activeCaloriesBurned} kcal</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Audio / Video Call Telehealth Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 text-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-neutral-700 flex flex-col items-center p-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="space-y-2">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 text-white flex items-center justify-center text-4xl shadow-xl ring-4 ring-emerald-500/30">
                  <Bot className="w-12 h-12" />
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-neutral-900" />
              </div>
              <h3 className="text-xl font-bold text-white">NutriBot AI</h3>
              <p className="text-xs text-neutral-400">
                Interactive Nutrition & Meal Consultation ({activeCallModal === 'video' ? 'Video View' : 'Voice Voice'})
              </p>
            </div>

            {/* Audio Waveform / Live Call Timer */}
            <div className="space-y-3 w-full">
              <div className="text-2xl font-mono font-bold text-emerald-400">
                {formatCallTime(callTimer)}
              </div>
              <div className="flex items-center justify-center gap-1.5 h-8">
                {[12, 24, 18, 30, 15, 28, 20, 32, 16, 26].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-500 rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                ))}
              </div>
              <p className="text-xs text-neutral-300 italic px-4">
                "Hi! I'm reviewing your metabolic targets. I can adjust your breakfast, midday lunch, or supper courses right here in real time."
              </p>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setActiveCallModal(null)}
                className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
                title="End Consultation"
              >
                <PhoneOff className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveCallModal(null);
                  handleSendMessage('Can you swap my supper to a lighter high-protein option?');
                }}
                className="px-4 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition-colors"
              >
                Switch to Text Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
