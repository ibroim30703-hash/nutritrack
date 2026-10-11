import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Flame,
  UtensilsCrossed,
  Activity,
  MessageSquareHeart,
  CheckCircle2,
  Cloud,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Heart,
  Droplets,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { UserProfile, BmiResult, DietPlan, WearableDeviceState } from '../types/nutrition';

interface WelcomeWindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onGoogleSignIn: () => void;
  isAuthLoading?: boolean;
  profile: UserProfile;
  bmiResult: BmiResult;
  dietPlan: DietPlan;
  wearableState: WearableDeviceState;
  waterIntakeMl: number;
  onNavigateTab: (tab: string) => void;
}

export const WelcomeWindowModal: React.FC<WelcomeWindowModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onGoogleSignIn,
  isAuthLoading = false,
  profile,
  bmiResult,
  dietPlan,
  wearableState,
  waterIntakeMl,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  // Determine time of day greeting
  const hour = new Date().getHours();
  const timeOfDayGreeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // Format Google account name
  const googleName = currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'Health Enthusiast');
  const googleEmail = currentUser?.email;

  const nextMeal = dietPlan.meals[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Decorative Gradient Ribbon */}
        <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 shrink-0" />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close welcome window"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Google Profile Avatar */}
            <div className="relative shrink-0">
              {currentUser?.photoURL ? (
                <div className="relative">
                  <img
                    src={currentUser.photoURL}
                    alt={googleName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md ring-4 ring-emerald-50 dark:ring-emerald-950/40"
                  />
                  {/* Google G Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
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
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                  {currentUser ? (googleName[0] || 'U').toUpperCase() : '🥗'}
                </div>
              )}
            </div>

            {/* Title & Google Account Welcome */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  {currentUser ? 'Verified Google User' : 'NutriTrack Main Menu'}
                </span>
                {currentUser && (
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cloud Sync Active</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                {timeOfDayGreeting},{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-300">
                  {googleName}!
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                {currentUser ? (
                  <span>
                    Logged in as <strong className="text-neutral-800 dark:text-neutral-200">{googleEmail}</strong>. Your personalized diet plan, calorie budget, and vitals are ready.
                  </span>
                ) : (
                  <span>
                    Welcome to your personal nutrition and wellness hub. Sign in with Google to synchronize your logs across all devices.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="px-6 sm:px-8 py-2 overflow-y-auto space-y-4 flex-1">
          {/* Sign In Banner if not logged in */}
          {!currentUser && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 dark:from-blue-950/40 dark:to-neutral-900 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Connect Your Google Account
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                  Sign in once to save your progress, unlock cloud sync, and get personalized consultation notes.
                </p>
              </div>

              <button
                type="button"
                onClick={onGoogleSignIn}
                disabled={isAuthLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span>{isAuthLoading ? 'Connecting...' : 'Sign In with Google'}</span>
              </button>
            </div>
          )}

          {/* Quick Metrics 4-Grid at a Glance */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Daily Calorie Budget */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Target Calories</span>
                <Flame className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-lg font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {bmiResult.targetCalories}
                <span className="text-[11px] font-normal text-neutral-400 ml-1">kcal</span>
              </div>
              <div className="text-[10px] text-neutral-500">
                Goal: {profile.fitnessGoal.replace(/_/g, ' ')}
              </div>
            </div>

            {/* Clinical BMI */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">BMI Status</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <div className="text-lg font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {bmiResult.bmi}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                {bmiResult.category}
              </div>
            </div>

            {/* Active Diet Plan Cuisine */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Diet Plan</span>
                <UtensilsCrossed className="w-3.5 h-3.5 text-blue-500" />
              </div>
              <div className="text-base font-black text-neutral-900 dark:text-neutral-100 truncate">
                {dietPlan.cuisineFlag} {dietPlan.cuisineName || 'Mediterranean'}
              </div>
              <div className="text-[10px] text-neutral-500">
                {dietPlan.meals.length} Prescribed Courses
              </div>
            </div>

            {/* Wearable Activity / Hydration */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750 space-y-1">
              <div className="flex items-center justify-between text-neutral-400">
                <span className="text-[10px] font-bold uppercase tracking-wider">Hydration</span>
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
              </div>
              <div className="text-lg font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {waterIntakeMl}
                <span className="text-[11px] font-normal text-neutral-400 ml-1">/ {profile.waterGoalMl}ml</span>
              </div>
              <div className="text-[10px] text-neutral-500">
                {Math.round((waterIntakeMl / profile.waterGoalMl) * 100)}% of Daily Goal
              </div>
            </div>
          </div>

          {/* Today's Featured Course Preview */}
          {nextMeal && (
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                  Today's Featured Course ({nextMeal.slotLabel || nextMeal.slot})
                </span>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {nextMeal.title}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-1">
                  {nextMeal.calories} kcal · {nextMeal.protein}g Protein · {nextMeal.carbs}g Carbs · {nextMeal.fats}g Fats
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTab('diet-plan');
                }}
                className="px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-neutral-850 hover:bg-emerald-100 rounded-xl shadow-2xs transition-colors shrink-0 cursor-pointer border border-emerald-200 dark:border-emerald-800"
              >
                View Plan &rarr;
              </button>
            </div>
          )}

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('tracker');
              }}
              className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-emerald-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Log Meals</span>
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Track calories, macros & water intake
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('consultation');
              }}
              className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-blue-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <MessageSquareHeart className="w-3.5 h-3.5 text-blue-600" />
                  <span>Dr. NutriBot</span>
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Chat & alter your meal programs
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateTab('camera');
              }}
              className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-purple-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Food Camera</span>
                </span>
                <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                Scan dish photos for calories & macros
              </p>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:p-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Health Dashboard</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
