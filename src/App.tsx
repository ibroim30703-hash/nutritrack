import React, { useState, useEffect, useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  UserProfile,
  LoggedFood,
  WearableDeviceState,
  AppSettings,
  PlanMealSlot,
  DietPlan,
  DailyNutritionLog,
  MetricCheckIn,
  HealthDynamicsReport,
} from './types/nutrition';
import { calculateFullNutrition, calculateBmiAndMetabolism } from './utils/calculations';
import { generateDietPlan } from './utils/dietPlanGenerator';
import { Navigation } from './components/Navigation';
import { DashboardOverview } from './components/DashboardOverview';
import { BmiCard } from './components/BmiCard';
import { DietPlanView } from './components/DietPlanView';
import { CalorieTrackerView } from './components/CalorieTrackerView';
import { RecipeView } from './components/RecipeView';
import { WearablesView } from './components/WearablesView';
import { ProfileFormModal } from './components/ProfileFormModal';
import { NutritionChatbot } from './components/NutritionChatbot';
import { SettingsView } from './components/SettingsView';
import { AiCameraView } from './components/AiCameraView';
import { NinetyDayNutritionLogView } from './components/NinetyDayNutritionLogView';
import { MetricCheckInModal } from './components/MetricCheckInModal';
import { HealthDynamicsModal } from './components/HealthDynamicsModal';
import {
  getOrInitialize90DayLogs,
  updateTodayLogWithFoods,
} from './utils/ninetyDayLogGenerator';
import {
  getOrInitializeMetricCheckIns,
  saveMetricCheckIn,
  generateHealthDynamicsReport,
  getDaysSinceDate,
} from './utils/metricDynamics';
import {
  auth,
  loginWithGoogle,
  logoutUser,
  saveUserProfileToFirestore,
  loadUserProfileFromFirestore,
  saveFoodLogToFirestore,
  deleteFoodLogFromFirestore,
  subscribeFoodLogs,
  subscribeChatHistory,
  ChatMessageItem,
} from './lib/firebase';
import { Cloud, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from './utils/translations';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [targetRecipeModalId, setTargetRecipeModalId] = useState<string | null>(null);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessageItem[]>([]);

  // App Interface & Preferences Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('nutritrack_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      language: 'en',
      theme: 'light',
      background: 'clean',
      fontStyle: 'sans',
      fontSize: 'normal',
      avatarEmoji: '🥗',
    };
  });

  // Default User Anthropometric Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nutritrack_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      age: 28,
      gender: 'male',
      heightCm: 178,
      weightKg: 78,
      targetWeightKg: 73,
      unitSystem: 'metric',
      activityLevel: 'moderate',
      fitnessGoal: 'lose_weight_steady',
      dietPreference: 'high_protein',
      waterGoalMl: 2800,
      selectedCuisine: 'mediterranean',
      foodPreferences: ['meat_poultry', 'fish_seafood', 'dairy_products'],
      customFoodNotes: '',
      settings: {
        language: 'en',
        theme: 'light',
        background: 'clean',
        fontStyle: 'sans',
        fontSize: 'normal',
        avatarEmoji: '🥗',
      },
    };
  });

  // Translations
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  // Calculate clinical BMI, BMR, TDEE, macros
  const bmiResult = useMemo(() => calculateFullNutrition(profile), [profile]);

  // Base Generated Personalized Diet Plan
  const generatedDietPlan = useMemo(
    () => generateDietPlan(profile, bmiResult),
    [profile, bmiResult]
  );

  // Custom Diet Plan Meal Overrides (when altered by user or AI Nutritionist)
  const [customPlanMeals, setCustomPlanMeals] = useState<Record<string, PlanMealSlot>>(() => {
    const saved = localStorage.getItem('nutritrack_custom_plan_meals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {};
  });

  // Active Diet Plan merged with customized/altered courses
  const dietPlan = useMemo<DietPlan>(() => {
    if (Object.keys(customPlanMeals).length === 0) {
      return generatedDietPlan;
    }
    const updatedMeals = generatedDietPlan.meals.map((meal) => {
      if (customPlanMeals[meal.slot]) {
        return {
          ...meal,
          ...customPlanMeals[meal.slot],
        };
      }
      return meal;
    });

    const totalCals = updatedMeals.reduce((sum, m) => sum + m.calories, 0);
    const totalP = updatedMeals.reduce((sum, m) => sum + m.protein, 0);
    const totalC = updatedMeals.reduce((sum, m) => sum + m.carbs, 0);
    const totalF = updatedMeals.reduce((sum, m) => sum + m.fats, 0);
    const totalFiber = updatedMeals.reduce((sum, m) => sum + m.fiber, 0);

    return {
      ...generatedDietPlan,
      targetCalories: totalCals,
      macros: {
        protein: Math.round(totalP),
        carbs: Math.round(totalC),
        fats: Math.round(totalF),
        fiber: Math.round(totalFiber),
      },
      meals: updatedMeals,
    };
  }, [generatedDietPlan, customPlanMeals]);

  const handleAlterDietPlanMeal = (slot: string, newMeal: PlanMealSlot) => {
    setCustomPlanMeals((prev) => {
      const next = { ...prev, [slot]: newMeal };
      localStorage.setItem('nutritrack_custom_plan_meals', JSON.stringify(next));
      return next;
    });
  };

  const handleResetDietPlan = () => {
    setCustomPlanMeals({});
    localStorage.removeItem('nutritrack_custom_plan_meals');
  };

  // Daily Logged Food Items
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>(() => {
    const saved = localStorage.getItem('nutritrack_logged_foods');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'seed_1',
        foodName: 'Whole Large Egg',
        mealSlot: 'breakfast',
        servings: 2,
        servingDescription: '2 large (100g)',
        calories: 148,
        protein: 12.6,
        carbs: 0.8,
        fats: 10.0,
        fiber: 0,
        timeLogged: '08:15 AM',
      },
      {
        id: 'seed_2',
        foodName: 'Artisan Sourdough Bread',
        mealSlot: 'breakfast',
        servings: 1,
        servingDescription: '1 slice (45g)',
        calories: 110,
        protein: 4.0,
        carbs: 22.0,
        fats: 0.5,
        fiber: 1.5,
        timeLogged: '08:16 AM',
      },
      {
        id: 'seed_3',
        foodName: 'Hass Avocado',
        mealSlot: 'breakfast',
        servings: 0.5,
        servingDescription: '1/2 medium (75g)',
        calories: 120,
        protein: 1.5,
        carbs: 6.4,
        fats: 11.0,
        fiber: 5.0,
        timeLogged: '08:18 AM',
      },
    ];
  });

  // Hydration state
  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(() => {
    const saved = localStorage.getItem('nutritrack_water');
    return saved ? Number(saved) : 1250;
  });

  // Wearable Device State
  const [wearableState, setWearableState] = useState<WearableDeviceState>(() => {
    return {
      isConnected: true,
      deviceName: 'Apple Watch Series 9',
      connectionType: 'apple_health',
      liveHeartRateBpm: 78,
      restingHeartRateBpm: 62,
      stepsToday: 7420,
      stepGoal: 10000,
      activeCaloriesBurned: 360,
      activeMinutes: 44,
      distanceKm: 5.4,
      lastSyncTime: 'Just now',
      isSyncing: false,
      batteryPercentage: 86,
    };
  });

  // Firebase Auth State Listener & Cloud Sync
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Load cloud profile
        try {
          const cloudProfile = await loadUserProfileFromFirestore(user.uid);
          if (cloudProfile) {
            setProfile(cloudProfile);
            if (cloudProfile.settings) {
              setSettings(cloudProfile.settings);
            }
          } else {
            // Initial backup to cloud
            await saveUserProfileToFirestore(user.uid, { ...profile, settings }, user);
          }
        } catch (err) {
          console.error('Error syncing cloud profile:', err);
        }

        // Subscribe to Firestore food logs
        const unsubFood = subscribeFoodLogs(user.uid, (cloudFoods) => {
          if (cloudFoods && cloudFoods.length > 0) {
            setLoggedFoods(cloudFoods);
          }
        });

        // Subscribe to Firestore consultation chat history
        const unsubChat = subscribeChatHistory(user.uid, (cloudMessages) => {
          if (cloudMessages && cloudMessages.length > 0) {
            setChatHistory(cloudMessages);
          }
        });

        return () => {
          unsubFood();
          unsubChat();
        };
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Persist Settings locally
  useEffect(() => {
    localStorage.setItem('nutritrack_settings', JSON.stringify(settings));
    document.documentElement.lang = settings.language;
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';

    if (settings.theme === 'dark' || settings.theme === 'midnight' || settings.theme === 'forest') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  // Persist Profile locally
  useEffect(() => {
    localStorage.setItem('nutritrack_profile', JSON.stringify(profile));
  }, [profile]);

  // Persist Logged Foods locally
  useEffect(() => {
    localStorage.setItem('nutritrack_logged_foods', JSON.stringify(loggedFoods));
  }, [loggedFoods]);

  // Persist Water locally
  useEffect(() => {
    localStorage.setItem('nutritrack_water', String(waterIntakeMl));
  }, [waterIntakeMl]);

  // Live wearable pulse simulation
  useEffect(() => {
    if (!wearableState.isConnected) return;
    const interval = setInterval(() => {
      setWearableState((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newBpm = Math.min(130, Math.max(62, prev.liveHeartRateBpm + delta));
        return {
          ...prev,
          liveHeartRateBpm: newBpm,
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [wearableState.isConnected]);

  // Handlers
  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    try {
      const user = await loginWithGoogle();
      setCurrentUser(user);
    } catch (err) {
      console.error('Sign in error:', err);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const handleSaveProfile = (newProfile: UserProfile) => {
    const merged = { ...newProfile, settings };
    setProfile(merged);
    if (currentUser) {
      saveUserProfileToFirestore(currentUser.uid, merged, currentUser).catch(console.error);
    }
  };

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    const updatedProfile = { ...profile, settings: newSettings };
    setProfile(updatedProfile);
    if (currentUser) {
      saveUserProfileToFirestore(currentUser.uid, updatedProfile, currentUser).catch(console.error);
    }
  };

  const handleAddFood = (food: LoggedFood) => {
    setLoggedFoods((prev) => [food, ...prev]);
    if (currentUser) {
      saveFoodLogToFirestore(currentUser.uid, food).catch(console.error);
    }
  };

  const handleRemoveFood = (id: string) => {
    setLoggedFoods((prev) => prev.filter((item) => item.id !== id));
    if (currentUser) {
      deleteFoodLogFromFirestore(currentUser.uid, id).catch(console.error);
    }
  };

  const handleUpdatePreferences = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    if (currentUser) {
      saveUserProfileToFirestore(currentUser.uid, updated, currentUser).catch(console.error);
    }
  };

  const handleUpdateWearableState = (updates: Partial<WearableDeviceState>) => {
    setWearableState((prev) => ({ ...prev, ...updates }));
  };

  const handleSelectRecipe = (recipeId: string) => {
    setTargetRecipeModalId(recipeId);
    setActiveTab('recipes');
  };

  // Calculate remaining calories for recipes filter
  const totalCaloriesConsumed = loggedFoods.reduce((sum, item) => sum + item.calories, 0);
  const effectiveCalorieBudget = bmiResult.targetCalories + (wearableState.activeCaloriesBurned || 0);
  const remainingCalories = effectiveCalorieBudget - totalCaloriesConsumed;

  // 90-Day Calorie & Nutrition Intake Logs
  const [ninetyDayLogs, setNinetyDayLogs] = useState<DailyNutritionLog[]>(() =>
    getOrInitialize90DayLogs(profile, bmiResult, loggedFoods)
  );

  // Sync today's log whenever logged foods or water intake changes
  useEffect(() => {
    setNinetyDayLogs((prev) =>
      updateTodayLogWithFoods(prev, loggedFoods, bmiResult.targetCalories, waterIntakeMl)
    );
  }, [loggedFoods, bmiResult.targetCalories, waterIntakeMl]);

  // 7-Day Metric Check-in & Health Dynamics State
  const [metricCheckIns, setMetricCheckIns] = useState<MetricCheckIn[]>(() =>
    getOrInitializeMetricCheckIns(profile, bmiResult)
  );
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isDynamicsModalOpen, setIsDynamicsModalOpen] = useState(false);
  const [healthDynamicsReport, setHealthDynamicsReport] = useState<HealthDynamicsReport | null>(null);

  const lastCheckIn = metricCheckIns[0];
  const daysSinceLastCheckIn = lastCheckIn ? getDaysSinceDate(lastCheckIn.timestamp) : 7;
  const isCheckInDue = daysSinceLastCheckIn >= 7;
  const daysUntilCheckIn = Math.max(0, 7 - daysSinceLastCheckIn);

  const handleCompleteCheckIn = (newCheckIn: MetricCheckIn) => {
    const updatedHistory = saveMetricCheckIn(newCheckIn);
    setMetricCheckIns(updatedHistory);

    const updatedProfile = {
      ...profile,
      weightKg: newCheckIn.weightKg,
    };
    handleSaveProfile(updatedProfile);

    const newBmiCalc = calculateBmiAndMetabolism(updatedProfile);
    const report = generateHealthDynamicsReport(updatedHistory, updatedProfile, newBmiCalc);
    setHealthDynamicsReport(report);

    setIsCheckInModalOpen(false);
    setIsDynamicsModalOpen(true);
  };

  // Determine dynamic styling classes
  const themeClass = useMemo(() => {
    switch (settings.theme) {
      case 'dark':
        return 'dark bg-slate-900 text-slate-100';
      case 'midnight':
        return 'dark bg-neutral-950 text-neutral-100';
      case 'forest':
        return 'dark bg-emerald-950 text-emerald-100';
      case 'sand':
        return 'bg-[#FAF7F2] text-stone-900';
      case 'light':
      default:
        return 'bg-neutral-50 text-neutral-900';
    }
  }, [settings.theme]);

  const backgroundClass = useMemo(() => {
    switch (settings.background) {
      case 'grid':
        return 'bg-pattern-grid';
      case 'mesh':
        return 'bg-pattern-mesh';
      case 'aurora':
        return 'bg-pattern-aurora';
      case 'clean':
      default:
        return '';
    }
  }, [settings.background]);

  const fontClass = useMemo(() => {
    switch (settings.fontStyle) {
      case 'serif':
        return 'font-serif-editorial';
      case 'mono':
        return 'font-mono-tech';
      case 'rounded':
        return 'font-rounded-soft';
      case 'geometric':
        return 'font-geometric-clean';
      case 'sans':
      default:
        return 'font-sans-modern';
    }
  }, [settings.fontStyle]);

  return (
    <div
      dir={settings.language === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full max-w-full overflow-x-hidden flex flex-col transition-colors duration-300 selection:bg-emerald-100 selection:text-emerald-900 ${themeClass} ${backgroundClass} ${fontClass}`}
    >
      {/* Top Bar Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onQuickLogFood={() => setActiveTab('tracker')}
        wearableConnected={wearableState.isConnected}
        currentUser={currentUser}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
        isAuthLoading={isAuthLoading}
        settings={settings}
        plannedMeals={dietPlan.meals}
        onLogMeal={handleAddFood}
        isCheckInDue={isCheckInDue}
        daysUntilCheckIn={daysUntilCheckIn}
        onOpenCheckIn={() => setIsCheckInModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 overflow-x-hidden">
        {/* Cloud Sync Announcement if Not Signed In */}
        {!currentUser && activeTab !== 'settings' && (
          <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Cloud className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Save your diet plan & daily logs to your Google Account
                </h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                  Sign in with Google to synchronize your BMI progress, food logs, themes, and chatbot consultations across devices with Firestore.
                </p>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthLoading}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-750 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-2xs transition-colors self-start sm:self-auto shrink-0"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
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
              <span>{isAuthLoading ? 'Connecting...' : t.signInWithGoogle}</span>
            </button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            profile={profile}
            bmiResult={bmiResult}
            dietPlan={dietPlan}
            loggedFoods={loggedFoods}
            wearableState={wearableState}
            waterIntakeMl={waterIntakeMl}
            onNavigateTab={setActiveTab}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onQuickLogFood={() => setActiveTab('tracker')}
            currentUser={currentUser}
            onGoogleSignIn={handleGoogleSignIn}
            isAuthLoading={isAuthLoading}
            isCheckInDue={isCheckInDue}
            daysUntilCheckIn={daysUntilCheckIn}
            onOpenCheckIn={() => setIsCheckInModalOpen(true)}
            onOpenDynamics={() => {
              const report = generateHealthDynamicsReport(metricCheckIns, profile, bmiResult);
              setHealthDynamicsReport(report);
              setIsDynamicsModalOpen(true);
            }}
          />
        )}

        {activeTab === 'diet-plan' && (
          <div className="space-y-6">
            <BmiCard
              profile={profile}
              bmiResult={bmiResult}
              onEditProfile={() => setIsProfileModalOpen(true)}
            />
            <DietPlanView
              dietPlan={dietPlan}
              onLogPlanMeal={handleAddFood}
              onSelectRecipe={handleSelectRecipe}
              onRegeneratePlan={() => setIsProfileModalOpen(true)}
              profile={profile}
              onUpdatePreferences={handleUpdatePreferences}
              onAlterCourseMeal={handleAlterDietPlanMeal}
              onResetCourseMeals={handleResetDietPlan}
              hasCustomMeals={Object.keys(customPlanMeals).length > 0}
            />
          </div>
        )}

        {activeTab === 'history-90' && (
          <NinetyDayNutritionLogView
            logs={ninetyDayLogs}
            profile={profile}
            bmiResult={bmiResult}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'tracker' && (
          <CalorieTrackerView
            loggedFoods={loggedFoods}
            onAddFood={handleAddFood}
            onRemoveFood={handleRemoveFood}
            bmiResult={bmiResult}
            wearableState={wearableState}
            waterIntakeMl={waterIntakeMl}
            onUpdateWater={setWaterIntakeMl}
            targetWaterMl={profile.waterGoalMl}
            onNavigateToCamera={() => setActiveTab('camera')}
          />
        )}

        {activeTab === 'camera' && (
          <AiCameraView
            onLogFood={handleAddFood}
            settings={settings}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipeView
            onLogMeal={handleAddFood}
            remainingCalories={remainingCalories}
            initialRecipeId={targetRecipeModalId}
            onClearInitialRecipeId={() => setTargetRecipeModalId(null)}
          />
        )}

        {activeTab === 'consultation' && (
          <NutritionChatbot
            profile={profile}
            bmiResult={bmiResult}
            dietPlan={dietPlan}
            loggedFoods={loggedFoods}
            wearableState={wearableState}
            currentUser={currentUser}
            savedChatHistory={chatHistory}
            onAlterDietPlanMeal={handleAlterDietPlanMeal}
            onResetDietPlan={handleResetDietPlan}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'wearables' && (
          <WearablesView
            wearableState={wearableState}
            onUpdateWearableState={handleUpdateWearableState}
            profile={profile}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onSaveToCloud={() => {
              if (currentUser) {
                saveUserProfileToFirestore(currentUser.uid, { ...profile, settings }, currentUser).catch(console.error);
              }
            }}
          />
        )}
      </main>

      {/* Anthropometric Profile & Goal Modal */}
      <ProfileFormModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* 7-Day Metric Check-in Modal */}
      <MetricCheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        profile={profile}
        bmiResult={bmiResult}
        lastCheckIn={metricCheckIns[0]}
        onCompleteCheckIn={handleCompleteCheckIn}
      />

      {/* Health Dynamics Update Report Modal */}
      <HealthDynamicsModal
        isOpen={isDynamicsModalOpen}
        onClose={() => setIsDynamicsModalOpen(false)}
        report={healthDynamicsReport}
        history={metricCheckIns}
      />

      {/* Quiet Footer with Health Advisory */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 py-6 mt-12 text-center text-xs text-neutral-500 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{t.appName}</span>
            <span aria-hidden="true">·</span>
            <span>Personal Nutrition, Gemini AI & Wearables Hub</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured with Firebase Google Authentication & Firestore</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
          <span>⚠️ <strong>Wellness Notice:</strong> NutriTrack provides nutritional and lifestyle insights for educational purposes only and does not provide medical or clinical advice. If you experience serious health problems or chronic symptoms, please visit a doctor.</span>
        </div>
      </footer>
    </div>
  );
}
