import React, { useState } from 'react';
import {
  Flame,
  Watch,
  Heart,
  Droplets,
  Scale,
  Plus,
  ArrowRight,
  Sparkles,
  BookOpen,
  Footprints,
  Calendar,
  Camera,
  MessageSquareHeart,
  Cloud,
  CheckCircle2,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  UserProfile,
  BmiResult,
  DietPlan,
  LoggedFood,
  WearableDeviceState,
} from '../types/nutrition';
import { BmiCard } from './BmiCard';
import { MacroPieChart } from './MacroPieChart';
import { WelcomeWindowModal } from './WelcomeWindowModal';

interface DashboardOverviewProps {
  profile: UserProfile;
  bmiResult: BmiResult;
  dietPlan: DietPlan;
  loggedFoods: LoggedFood[];
  wearableState: WearableDeviceState;
  waterIntakeMl: number;
  onNavigateTab: (tab: string) => void;
  onOpenProfile: () => void;
  onQuickLogFood: () => void;
  currentUser?: User | null;
  onGoogleSignIn?: () => void;
  isAuthLoading?: boolean;
  isCheckInDue?: boolean;
  daysUntilCheckIn?: number;
  onOpenCheckIn?: () => void;
  onOpenDynamics?: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  bmiResult,
  dietPlan,
  loggedFoods,
  wearableState,
  waterIntakeMl,
  onNavigateTab,
  onOpenProfile,
  onQuickLogFood,
  currentUser = null,
  onGoogleSignIn = () => {},
  isAuthLoading = false,
  isCheckInDue = false,
  daysUntilCheckIn = 7,
  onOpenCheckIn,
  onOpenDynamics,
}) => {
  // Welcome Window open state: opens automatically on first main menu visit, can be reopened anytime
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(() => {
    const hasSeen = sessionStorage.getItem('nutritrack_welcome_window_dismissed');
    return !hasSeen;
  });

  const handleCloseWelcome = () => {
    setIsWelcomeModalOpen(false);
    sessionStorage.setItem('nutritrack_welcome_window_dismissed', 'true');
  };

  const totalCaloriesConsumed = loggedFoods.reduce((sum, item) => sum + item.calories, 0);
  const totalProteinConsumed = Math.round(
    loggedFoods.reduce((sum, item) => sum + item.protein, 0)
  );
  const totalCarbsConsumed = Math.round(
    loggedFoods.reduce((sum, item) => sum + item.carbs, 0)
  );
  const totalFatsConsumed = Math.round(
    loggedFoods.reduce((sum, item) => sum + item.fats, 0)
  );

  const activeBurnBonus = wearableState.activeCaloriesBurned || 0;
  const effectiveCalorieBudget = bmiResult.targetCalories + activeBurnBonus;
  const remainingCalories = effectiveCalorieBudget - totalCaloriesConsumed;

  // Next meal to display
  const nextMeal = dietPlan.meals[0];

  const googleDisplayName = currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'Guest Explorer');
  const googleEmail = currentUser?.email;

  const currentHour = new Date().getHours();
  const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      {/* Main Menu Google Account Welcome Window Banner Tile */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-blue-500/10 dark:from-emerald-950/40 dark:via-neutral-900 dark:to-neutral-900 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Google Profile Avatar */}
            <div className="relative shrink-0">
              {currentUser?.photoURL ? (
                <div className="relative">
                  <img
                    src={currentUser.photoURL}
                    alt={googleDisplayName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-xs ring-2 ring-emerald-50 dark:ring-emerald-950/60"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white dark:bg-neutral-800 shadow-xs flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">
                  {currentUser ? (googleDisplayName[0] || 'U').toUpperCase() : '🥗'}
                </div>
              )}
            </div>

            {/* Welcome Text */}
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Main Menu
                </span>
                {currentUser && (
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <Cloud className="w-3 h-3" />
                    <span>Cloud Synced</span>
                  </span>
                )}
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {timeGreeting},{' '}
                <span className="text-emerald-700 dark:text-emerald-400 font-black">
                  {googleDisplayName}
                </span>
                !
              </h2>

              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                {currentUser ? (
                  <span>
                    Connected to Google Account <strong className="text-neutral-900 dark:text-neutral-200">{googleEmail}</strong>. Today's target: <strong>{bmiResult.targetCalories} kcal</strong>.
                  </span>
                ) : (
                  <span>
                    Your personalized nutrition and metabolic wellness hub. Sign in with Google to synchronize your logs across devices.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsWelcomeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-neutral-750 border border-emerald-300 dark:border-emerald-700 rounded-xl shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Welcome Window</span>
            </button>

            {!currentUser && (
              <button
                type="button"
                onClick={onGoogleSignIn}
                disabled={isAuthLoading}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.33 24 12 24z"
                  />
                  <path
                    fill="#ffffff"
                    d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span>{isAuthLoading ? 'Connecting...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Welcome Window Modal */}
      <WelcomeWindowModal
        isOpen={isWelcomeModalOpen}
        onClose={handleCloseWelcome}
        currentUser={currentUser}
        onGoogleSignIn={onGoogleSignIn}
        isAuthLoading={isAuthLoading}
        profile={profile}
        bmiResult={bmiResult}
        dietPlan={dietPlan}
        wearableState={wearableState}
        waterIntakeMl={waterIntakeMl}
        onNavigateTab={onNavigateTab}
      />

      {/* Anthropometric & BMI Core Gauge Card */}
      <BmiCard
        profile={profile}
        bmiResult={bmiResult}
        onEditProfile={onOpenProfile}
      />

      {/* 7-Day Metric Upload & Health Dynamics Banner */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isCheckInDue
            ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border-amber-300 dark:border-amber-800'
            : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs shrink-0 ${
              isCheckInDue
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {isCheckInDue ? '7-Day Metric Check-in Due' : '7-Day Metric Progress Cycle'}
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isCheckInDue
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 animate-pulse'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {isCheckInDue ? 'Upload Due Now' : `Next check-in in ${daysUntilCheckIn} days`}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Upload your metrics every 7 days to update your BMI and receive your Health Dynamics Update.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {onOpenDynamics && (
            <button
              type="button"
              onClick={onOpenDynamics}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors cursor-pointer"
            >
              View Dynamics
            </button>
          )}

          {onOpenCheckIn && (
            <button
              type="button"
              onClick={onOpenCheckIn}
              className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                isCheckInDue
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isCheckInDue ? 'Upload 7-Day Metrics' : 'Check In Early'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Daily Metrics 4-Box Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Calorie Balance */}
        <div
          onClick={() => onNavigateTab('tracker')}
          className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Remaining Budget</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="py-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {remainingCalories}
            </span>
            <span className="text-xs text-neutral-400 ml-1">kcal left</span>
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span>Consumed: {totalCaloriesConsumed} kcal</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              Tracker &rarr;
            </span>
          </div>
        </div>

        {/* Protein Progress */}
        <div
          onClick={() => onNavigateTab('tracker')}
          className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Target Protein</span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
              {Math.round((totalProteinConsumed / (bmiResult.macros.proteinGrams || 1)) * 100)}%
            </span>
          </div>
          <div className="py-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {totalProteinConsumed}
            </span>
            <span className="text-xs text-neutral-400 ml-1">
              / {bmiResult.macros.proteinGrams}g
            </span>
          </div>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (totalProteinConsumed / (bmiResult.macros.proteinGrams || 1)) * 100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Wearable Activity Burn */}
        <div
          onClick={() => onNavigateTab('wearables')}
          className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Wearable Activity</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Watch className="w-4 h-4" />
            </div>
          </div>
          <div className="py-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              +{activeBurnBonus}
            </span>
            <span className="text-xs text-neutral-400 ml-1">active kcal</span>
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span>{wearableState.stepsToday.toLocaleString()} steps</span>
            <span className="text-blue-700 dark:text-blue-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              Wearables &rarr;
            </span>
          </div>
        </div>

        {/* Hydration Status */}
        <div
          onClick={() => onNavigateTab('tracker')}
          className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Hydration Status</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/70 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="py-2">
            <span className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {waterIntakeMl}
            </span>
            <span className="text-xs text-neutral-400 ml-1">/ {profile.waterGoalMl} ml</span>
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-2">
            <span>{Math.round((waterIntakeMl / profile.waterGoalMl) * 100)}% target</span>
            <span className="text-sky-700 dark:text-sky-400 font-semibold group-hover:translate-x-0.5 transition-transform">
              Log Water &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* Daily Macronutrient Breakdown & Target Comparison (D3/Recharts) */}
      <MacroPieChart
        bmiResult={bmiResult}
        loggedFoods={loggedFoods}
        onNavigateTracker={() => onNavigateTab('tracker')}
        onQuickLogFood={onQuickLogFood}
      />

      {/* AI Superpowers Banner: AI Camera & AI Nutritionist Consultation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Camera Feature Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/40 dark:via-neutral-900 dark:to-neutral-900 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  AI Food Camera & Calorie Scanner
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                Vision AI
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Snap or upload a photo of your meal. Multimodal vision instantly estimates calories, protein, carbs, and fats. If no food is detected, you will receive an explanatory message.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Live webcam or photo upload
            </span>
            <button
              onClick={() => onNavigateTab('camera')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Meal</span>
            </button>
          </div>
        </div>

        {/* AI Nutritionist Chatbot Card */}
        <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent dark:from-blue-950/40 dark:via-neutral-900 dark:to-neutral-900 border border-blue-200 dark:border-blue-800/60 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <MessageSquareHeart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Dr. NutriBot Consultation
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Gemini 3.5
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have questions about your meal plan, macro distribution, carb cycling, or grocery substitutions? Consult our nutrition chatbot. Note: For medical issues or serious problems, please visit a doctor.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Personalized to your {profile.gender}, {profile.weightKg}kg profile
            </span>
            <button
              onClick={() => onNavigateTab('consultation')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Start Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Next Meal Card & Wearable Live Sensor Tile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Scheduled Meal from Diet Plan */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <span>{dietPlan.cuisineFlag}</span>
                  <span>Daily Course: {nextMeal ? (nextMeal.slotLabel || nextMeal.slot) : 'Featured Meal'}</span>
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('diet-plan')}
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                View Full Plan &rarr;
              </button>
            </div>

            {nextMeal && (
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {nextMeal.image && (
                  <img
                    src={nextMeal.image}
                    alt={nextMeal.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
                    }}
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-neutral-100 dark:border-neutral-800"
                  />
                )}
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded">
                      {nextMeal.slotLabel || nextMeal.slot}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
                      {nextMeal.calories} kcal
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {nextMeal.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {nextMeal.description}
                  </p>
                  <div className="text-xs font-mono tabular-nums text-neutral-500 dark:text-neutral-400 pt-1">
                    {nextMeal.protein}g Protein · {nextMeal.carbs}g Carbs · {nextMeal.fats}g Fats
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-neutral-400">
              Protocol: {profile.fitnessGoal.replace(/_/g, ' ')}
            </span>
            <button
              onClick={() => onNavigateTab('diet-plan')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore All Planned Meals</span>
            </button>
          </div>
        </div>

        {/* Live Wearable Telemetry & Device Bridge */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Watch className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Wearable Live Sensor
                </h3>
              </div>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                {wearableState.deviceName}
              </span>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Live Heart Rate</div>
                    <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                      {wearableState.liveHeartRateBpm}{' '}
                      <span className="text-xs font-normal text-neutral-400">BPM</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-neutral-400">
                  Resting: {wearableState.restingHeartRateBpm} BPM
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2.5">
                  <Footprints className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">Steps Recorded</div>
                    <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                      {wearableState.stepsToday.toLocaleString()}{' '}
                      <span className="text-xs font-normal text-neutral-400">steps</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-neutral-400">
                  Goal: {wearableState.stepGoal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-neutral-400">
              Sync: {wearableState.lastSyncTime}
            </span>
            <button
              onClick={() => onNavigateTab('wearables')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-lg transition-colors shrink-0"
            >
              <span>Manage Wearables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
