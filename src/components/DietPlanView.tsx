import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Clock,
  Flame,
  CheckCircle2,
  ShoppingCart,
  Sparkles,
  Check,
  RefreshCw,
  Plus,
  BookOpen,
  Globe2,
  SlidersHorizontal,
  ChevronRight,
  Info,
  X,
  ChefHat,
  Search,
  Filter,
  CheckCheck,
  Timer,
  Apple,
  Moon,
  Sun,
  Coffee,
  ChevronDown,
  ChevronUp,
  Copy,
  ListOrdered,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import {
  DietPlan,
  PlanMealSlot,
  LoggedFood,
  UserProfile,
  CuisineCountry,
  MealRecipe,
} from '../types/nutrition';
import {
  CUISINES_LIST,
  FOOD_PREFERENCE_CATEGORIES,
} from '../utils/dietPlanGenerator';
import { CustomRecipeModal } from './CustomRecipeModal';
import { ChangeCourseMealModal } from './ChangeCourseMealModal';
import { DailyVitaminCounterCard } from './DailyVitaminCounterCard';

interface DietPlanViewProps {
  dietPlan: DietPlan;
  onLogPlanMeal: (food: LoggedFood) => void;
  onSelectRecipe: (recipeId: string) => void;
  onRegeneratePlan: () => void;
  profile: UserProfile;
  onUpdatePreferences?: (updates: Partial<UserProfile>) => void;
  onAlterCourseMeal?: (slot: string, newMeal: PlanMealSlot) => void;
  onResetCourseMeals?: () => void;
  hasCustomMeals?: boolean;
}

export const DietPlanView: React.FC<DietPlanViewProps> = ({
  dietPlan,
  onLogPlanMeal,
  onSelectRecipe,
  onRegeneratePlan,
  profile,
  onUpdatePreferences,
  onAlterCourseMeal,
  onResetCourseMeals,
  hasCustomMeals = false,
}) => {
  const [loggedSlots, setLoggedSlots] = useState<Record<string, boolean>>({});
  const [checkedGrocery, setCheckedGrocery] = useState<Record<string, boolean>>({});
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(true);
  const [customInput, setCustomInput] = useState(profile.customFoodNotes || '');
  const [activeCourseFilter, setActiveCourseFilter] = useState<string>('all');
  const [activeModalMeal, setActiveModalMeal] = useState<PlanMealSlot | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [copiedStepsToast, setCopiedStepsToast] = useState<string | null>(null);

  // Custom Recipe & Course Alteration Modals
  const [isCustomRecipeModalOpen, setIsCustomRecipeModalOpen] = useState(false);
  const [isChangeMealModalOpen, setIsChangeMealModalOpen] = useState(false);
  const [targetChangeMeal, setTargetChangeMeal] = useState<PlanMealSlot | null>(null);
  const [recipeSavedToast, setRecipeSavedToast] = useState<string | null>(null);
  const [mealChangedToast, setMealChangedToast] = useState<string | null>(null);

  const toggleSteps = (slot: string) => {
    setExpandedSteps((prev) => ({
      ...prev,
      [slot]: !prev[slot],
    }));
  };

  const toggleStepDone = (key: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCopySteps = (meal: PlanMealSlot) => {
    const text = `${meal.title} (${meal.slotLabel || meal.slot})\nEstimated Prep & Cook Time: ${meal.prepTime}\nNutrition: ${meal.calories} kcal | ${meal.protein}g Protein | ${meal.carbs}g Carbs | ${meal.fats}g Fats | ${meal.fiber}g Fiber\n\nINGREDIENTS:\n${meal.ingredients.map((ing) => `• ${ing}`).join('\n')}\n\nDETAILED STEP-BY-STEP COOKING INSTRUCTIONS:\n${(meal.instructions || []).map((step, idx) => `${idx + 1}. ${step}`).join('\n\n')}\n\nCHEF CLINICAL TIP:\n${meal.chefTip || 'Prepare fresh and enjoy.'}`;
    navigator.clipboard.writeText(text);
    setCopiedStepsToast(meal.title);
    setTimeout(() => setCopiedStepsToast(null), 3000);
  };

  const selectedCuisine = profile.selectedCuisine || 'mediterranean';
  const selectedPreferences = profile.foodPreferences || ['meat_poultry', 'fish_seafood', 'dairy_products'];

  const handleLogSlot = (meal: PlanMealSlot) => {
    // Map daily course slot to food logger slot
    let mappedSlot: 'breakfast' | 'lunch' | 'dinner' | 'supper' | 'snack' = 'lunch';
    if (meal.slot === 'breakfast') mappedSlot = 'breakfast';
    else if (meal.slot === 'dinner' || meal.slot === 'lunch') mappedSlot = 'dinner';
    else if (meal.slot === 'supper') mappedSlot = 'supper';
    else mappedSlot = 'snack';

    const newLoggedFood: LoggedFood = {
      id: `log_plan_${meal.slot}_${Date.now()}`,
      foodName: meal.title,
      mealSlot: mappedSlot,
      servings: 1,
      servingDescription: '1 planned course portion',
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
      fiber: meal.fiber,
      timeLogged: meal.timeOfDay || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onLogPlanMeal(newLoggedFood);
    setLoggedSlots((prev) => ({ ...prev, [meal.slot]: true }));
  };

  const handleSelectCuisine = (cuisineId: CuisineCountry) => {
    if (onUpdatePreferences) {
      onUpdatePreferences({ selectedCuisine: cuisineId });
    }
  };

  const handleTogglePreference = (prefId: string) => {
    if (!onUpdatePreferences) return;
    const current = selectedPreferences.includes(prefId)
      ? selectedPreferences.filter((p) => p !== prefId)
      : [...selectedPreferences, prefId];
    onUpdatePreferences({ foodPreferences: current });
  };

  const handleApplyCustomNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdatePreferences) {
      onUpdatePreferences({ customFoodNotes: customInput });
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const handleQuickAddKeyword = (keyword: string) => {
    const trimmed = customInput.trim();
    const updated = trimmed ? `${trimmed}, ${keyword}` : keyword;
    setCustomInput(updated);
    if (onUpdatePreferences) {
      onUpdatePreferences({ customFoodNotes: updated });
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const toggleGroceryItem = (item: string) => {
    setCheckedGrocery((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Filter meals based on course selection
  const filteredMeals = activeCourseFilter === 'all'
    ? dietPlan.meals
    : dietPlan.meals.filter((m) => {
        if (activeCourseFilter === 'breakfast') return m.slot === 'breakfast';
        if (activeCourseFilter === 'dinner') return m.slot === 'dinner' || m.slot === 'lunch';
        if (activeCourseFilter === 'supper') return m.slot === 'supper';
        if (activeCourseFilter === 'snacks') return m.slot.includes('snack');
        if (activeCourseFilter === 'mains') return m.slot === 'breakfast' || m.slot === 'dinner' || m.slot === 'lunch' || m.slot === 'supper';
        return m.slot === activeCourseFilter;
      });

  const getCourseBadgeColor = (slot: string) => {
    if (slot === 'breakfast') return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
    if (slot === 'dinner' || slot === 'lunch') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    if (slot === 'supper') return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
    return 'bg-teal-50 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border-teal-200 dark:border-teal-800';
  };

  const getCourseIcon = (slot: string) => {
    if (slot === 'breakfast') return <Coffee className="w-3.5 h-3.5" />;
    if (slot === 'dinner' || slot === 'lunch') return <Sun className="w-3.5 h-3.5" />;
    if (slot === 'supper') return <Moon className="w-3.5 h-3.5" />;
    return <Apple className="w-3.5 h-3.5" />;
  };

  return (
    <div className="space-y-6">
      {/* 1. Protocol Overview Banner with Active Cuisine Flag & Macro Allocation */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-3xl">{dietPlan.cuisineFlag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {dietPlan.title}
                  </h2>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    6-Course Daily Protocol
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Chronological courses for Breakfast, Dinner, and Supper + Snacks in-between, calibrated to your BMI and gastronomy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCustomRecipeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              title="Create and save your own recipe with automatic calorie, macro, and vitamin calculations"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Save Your Own Recipe</span>
            </button>

            {hasCustomMeals && onResetCourseMeals && (
              <button
                onClick={onResetCourseMeals}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                title="Reset customized courses back to recommended dietary plan"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Courses</span>
              </button>
            )}

            <button
              onClick={() => setIsPreferencesOpen(!isPreferencesOpen)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer border ${
                isPreferencesOpen
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isPreferencesOpen ? 'Hide Preferences' : 'Preferences'}</span>
            </button>

            <button
              onClick={onRegeneratePlan}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors cursor-pointer"
              title="Edit Height, Weight & Physical Metrics"
            >
              <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
              <span>Edit Metrics</span>
            </button>
          </div>
        </div>

        {/* Nutritional Target Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Daily Energy Target</span>
            <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {dietPlan.targetCalories}{' '}
              <span className="text-xs font-normal text-neutral-400">kcal</span>
            </span>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Protein Target</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
              {dietPlan.macros.protein}{' '}
              <span className="text-xs font-normal text-neutral-400">g</span>
            </span>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Complex Carbs</span>
            <span className="text-lg sm:text-xl font-bold text-amber-700 dark:text-amber-400 font-mono tabular-nums">
              {dietPlan.macros.carbs}{' '}
              <span className="text-xs font-normal text-neutral-400">g</span>
            </span>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-center">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block font-medium">Healthy Fats</span>
            <span className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-400 font-mono tabular-nums">
              {dietPlan.macros.fats}{' '}
              <span className="text-xs font-normal text-neutral-400">g</span>
            </span>
          </div>
        </div>

        {/* 2. Interactive Cuisine Menu From Different Countries */}
        <div className="pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2.5 gap-1">
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                Cuisine Menu From Different Countries (Select to Alter Recipes & Seasonings):
              </span>
            </div>
            <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
              {CUISINES_LIST.length} authentic international culinary traditions
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 max-w-full w-full min-w-0">
            {CUISINES_LIST.map((c) => {
              const isSelected = selectedCuisine === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCuisine(c.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold scale-[1.02]'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-750'
                  }`}
                  title={`${c.name} - ${c.description}`}
                >
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Food Preferences Menu: Type & Toggle Food Preferences */}
      {isPreferencesOpen && (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-emerald-200 dark:border-emerald-800/60 p-6 shadow-xs space-y-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Food Preferences Menu & Custom Writer
                </h3>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Write which types of foods you prefer (e.g. meat, fish, dairy products, something vegan, vegetarian, etc.) or toggle categories below. Recipes will be tailored instantly.
              </p>
            </div>
            <button
              onClick={() => setIsPreferencesOpen(false)}
              className="text-xs font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          {/* User Custom Food Writer Box */}
          <form onSubmit={handleApplyCustomNotes} className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="block text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Write Your Preferred Foods & Exclusions:
              </label>
              {copiedNotification && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-pulse">
                  <CheckCheck className="w-3.5 h-3.5" />
                  Preferences Saved & Daily Courses Updated!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="e.g. Chicken breast, wild salmon, Greek yogurt, ribeye steak, cottage cheese, tofu, no pork, extra virgin olive oil..."
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-neutral-900 dark:text-neutral-100"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Apply & Update Course
              </button>
            </div>

            {/* Quick Keyword Inserts */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-neutral-400 dark:text-neutral-500 font-medium">Quick Insert:</span>
              {[
                { label: 'Meat & Poultry', icon: '🍗' },
                { label: 'Lean Red Meat', icon: '🥩' },
                { label: 'Fish & Seafood', icon: '🐟' },
                { label: 'Dairy Products', icon: '🥛' },
                { label: 'Something Vegan', icon: '🌱' },
                { label: 'Vegetarian', icon: '🥗' },
                { label: 'Pasture Eggs', icon: '🥚' },
                { label: 'Greek Yogurt & Skyr', icon: '🥣' },
                { label: 'Gluten-Free', icon: '🌾' },
                { label: 'Extra Olive Oil', icon: '🫒' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => handleQuickAddKeyword(item.label)}
                  className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-300 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-750 transition-colors cursor-pointer"
                >
                  <span className="mr-1">{item.icon}</span>
                  <span>+{item.label}</span>
                </button>
              ))}
            </div>
          </form>

          {/* Toggleable Food Group Cards */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
              Toggle Preferred Food Categories:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {FOOD_PREFERENCE_CATEGORIES.map((cat) => {
                const isChecked = selectedPreferences.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTogglePreference(cat.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                        : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{cat.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-bold flex items-center justify-between gap-1.5">
                        <span>{cat.label}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                        {cat.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. Daily Course Schedule & Timing Matrix Bar */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
              <span>Daily Food Course Schedule (Breakfast, Dinner & Supper + Snacks In-Between)</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Structured nutrition pacing: what to eat at each point in the day to maintain peak metabolic thermogenesis and cellular satiety.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs font-medium self-start sm:self-auto overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All 6 Courses' },
              { id: 'breakfast', label: 'Breakfast' },
              { id: 'dinner', label: 'Dinner' },
              { id: 'supper', label: 'Supper' },
              { id: 'snacks', label: 'Snacks In-Between' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCourseFilter(f.id)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCourseFilter === f.id
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-bold shadow-2xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Stage Daily Timeline Visualization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
          <div
            onClick={() => setActiveCourseFilter('breakfast')}
            className="p-2.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 cursor-pointer hover:border-amber-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
              <Coffee className="w-3 h-3" />
              <span>08:00 AM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">1. Breakfast</div>
            <div className="text-[10px] text-neutral-500 font-mono">~22% Target Cals</div>
          </div>

          <div
            onClick={() => setActiveCourseFilter('snacks')}
            className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 cursor-pointer hover:border-teal-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300">
              <Apple className="w-3 h-3" />
              <span>11:00 AM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">2. Morning Snack</div>
            <div className="text-[10px] text-neutral-500 font-mono">In-Between Bridge</div>
          </div>

          <div
            onClick={() => setActiveCourseFilter('dinner')}
            className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer hover:border-emerald-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
              <Sun className="w-3 h-3" />
              <span>01:30 PM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">3. Dinner (Midday)</div>
            <div className="text-[10px] text-neutral-500 font-mono">~32% Main Fuel</div>
          </div>

          <div
            onClick={() => setActiveCourseFilter('snacks')}
            className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 cursor-pointer hover:border-teal-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300">
              <Apple className="w-3 h-3" />
              <span>04:30 PM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">4. Afternoon Snack</div>
            <div className="text-[10px] text-neutral-500 font-mono">In-Between Recharge</div>
          </div>

          <div
            onClick={() => setActiveCourseFilter('supper')}
            className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 cursor-pointer hover:border-indigo-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-indigo-800 dark:text-indigo-300">
              <Moon className="w-3 h-3" />
              <span>07:30 PM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">5. Supper (Evening)</div>
            <div className="text-[10px] text-neutral-500 font-mono">~25% Restorative</div>
          </div>

          <div
            onClick={() => setActiveCourseFilter('snacks')}
            className="p-2.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 cursor-pointer hover:border-teal-400 transition-all"
          >
            <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-teal-800 dark:text-teal-300">
              <Moon className="w-3 h-3" />
              <span>09:15 PM</span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">6. Evening Snack</div>
            <div className="text-[10px] text-neutral-500 font-mono">In-Between Recovery</div>
          </div>
        </div>
      </div>

      {/* Daily Vitamin & Micronutrient Counter (Tracking Essential Vitamins & Vital Minerals) */}
      <DailyVitaminCounterCard meals={dietPlan.meals} profile={profile} />

      {/* 5. Planned Course Cards */}
      <div className="space-y-4">
        {filteredMeals.map((meal) => {
          const isAlreadyLogged = loggedSlots[meal.slot];
          const isMainMeal = meal.slot === 'breakfast' || meal.slot === 'dinner' || meal.slot === 'lunch' || meal.slot === 'supper';

          return (
            <div
              key={meal.slot}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col md:flex-row"
            >
              {/* Optional Food Photo */}
              {meal.image && (
                <div className="md:w-60 h-48 md:h-auto shrink-0 relative bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-neutral-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                    {getCourseIcon(meal.slot)}
                    <span>{meal.timeOfDay}</span>
                  </div>
                </div>
              )}

              {/* Main Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${getCourseBadgeColor(meal.slot)}`}
                      >
                        {getCourseIcon(meal.slot)}
                        <span>{meal.slotLabel || meal.slot}</span>
                      </span>

                      {meal.isUserCustom && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-purple-600" />
                          <span>Custom / Optimized</span>
                        </span>
                      )}

                      {meal.timeOfDay && (
                        <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{meal.timeOfDay}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-md">
                      <Flame className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{meal.calories} kcal</span>
                    </div>
                  </div>

                  {/* "What should be eaten" Clinical Directive Banner */}
                  {meal.whatShouldBeEaten && (
                    <div className="mb-2.5 p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/80 dark:border-neutral-750 text-[11px] text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{meal.whatShouldBeEaten}</span>
                    </div>
                  )}

                  <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                    {meal.title}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                    {meal.description}
                  </p>
                </div>

                {/* Macro Allocation Bar */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums py-2 border-y border-neutral-100 dark:border-neutral-800">
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{meal.protein}g Protein</span>
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">{meal.carbs}g Carbs</span>
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-blue-700 dark:text-blue-400 font-semibold">{meal.fats}g Fats</span>
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-teal-700 dark:text-teal-400 font-semibold">{meal.fiber}g Fiber</span>
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                  <span className="text-neutral-400 font-sans flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    <span>{meal.prepTime}</span>
                  </span>
                </div>

                {/* Core Ingredients Checklist */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                    Course Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {meal.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{ing}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expandable Step-by-Step Cooking Steps */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSteps(meal.slot)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      <ChefHat className="w-4 h-4 text-emerald-600" />
                      <span>Detailed Cooking Steps ({meal.instructions?.length || 5} steps)</span>
                      {expandedSteps[meal.slot] ? (
                        <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopySteps(meal)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                      title="Copy all instructions and ingredients"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedStepsToast === meal.title ? 'Copied to Clipboard!' : 'Copy Steps'}</span>
                    </button>
                  </div>

                  {expandedSteps[meal.slot] && (
                    <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200/70 dark:border-neutral-700 pb-2">
                        <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200">
                          <ListOrdered className="w-3.5 h-3.5 text-emerald-600" />
                          Kitchen Preparation Guide
                        </span>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          Tap step to mark complete
                        </span>
                      </div>

                      <ol className="space-y-2 text-xs">
                        {meal.instructions && meal.instructions.length > 0 ? (
                          meal.instructions.map((step, idx) => {
                            const stepKey = `${meal.slot}_card_step_${idx}`;
                            const isDone = !!checkedSteps[stepKey];
                            return (
                              <li
                                key={idx}
                                onClick={() => toggleStepDone(stepKey)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg transition-all cursor-pointer border ${
                                  isDone
                                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-neutral-400 dark:text-neutral-500 line-through'
                                    : 'bg-white dark:bg-neutral-800 border-neutral-200/80 dark:border-neutral-700/80 hover:border-emerald-400 text-neutral-800 dark:text-neutral-200'
                                }`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5 ${
                                    isDone
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                  }`}
                                >
                                  {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                                </span>
                                <span className="leading-relaxed flex-1">
                                  {step}
                                </span>
                              </li>
                            );
                          })
                        ) : (
                          <li className="text-neutral-500 italic text-xs">
                            Prepare fresh according to portion ingredients.
                          </li>
                        )}
                      </ol>

                      {meal.chefTip && (
                        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Chef's Technique Tip: </span>
                            <span>{meal.chefTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Course Actions */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalMeal(meal)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Fullscreen Recipe View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTargetChangeMeal(meal);
                        setIsChangeMealModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors cursor-pointer"
                      title="Manually swap or customize this course meal while preserving target calories and nutritional intake"
                    >
                      <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Change Course Meal</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLogSlot(meal)}
                    disabled={isAlreadyLogged}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isAlreadyLogged
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {isAlreadyLogged ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Logged to Diary</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Log this Course</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Dietary Guidelines & Categorized Grocery Shopping List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dietary Guidelines */}
        <div className="lg:col-span-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Dietary Optimization Guidelines
            </h3>
          </div>
          <div className="space-y-3">
            {dietPlan.guidelines.map((guideline, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{guideline}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400">
            <span>Notice: Guidelines are educational lifestyle suggestions. For serious medical conditions or chronic illnesses, please consult a physician.</span>
          </div>
        </div>

        {/* Categorized Grocery Shopping Blueprint */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {dietPlan.cuisineFlag} Grocery Shopping Blueprint ({dietPlan.cuisineName})
              </h3>
            </div>
            <span className="text-xs text-neutral-400">
              Market Prep Allocation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dietPlan.groceryList.map((category) => (
              <div key={category.category} className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700 pb-1">
                  {category.category}
                </h4>
                <div className="space-y-1.5">
                  {category.items.map((item) => {
                    const isChecked = checkedGrocery[item];
                    return (
                      <div
                        key={item}
                        onClick={() => toggleGroceryItem(item)}
                        className="flex items-center gap-2 cursor-pointer group text-xs select-none"
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-neutral-300 dark:border-neutral-700 group-hover:border-neutral-400'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span
                          className={`text-neutral-700 dark:text-neutral-300 transition-colors ${
                            isChecked ? 'line-through text-neutral-400 dark:text-neutral-500' : ''
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Detailed Recipe & Cooking Method Modal */}
      {activeModalMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    {activeModalMeal.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span>{activeModalMeal.slotLabel}</span>
                    <span>·</span>
                    <span className="font-mono">{activeModalMeal.calories} kcal</span>
                    <span>·</span>
                    <span>Prep: {activeModalMeal.prepTime}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalMeal(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              {activeModalMeal.image && (
                <div className="w-full h-48 rounded-xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-800 shadow-xs border border-neutral-200 dark:border-neutral-800">
                  <img
                    src={activeModalMeal.image}
                    alt={activeModalMeal.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AUTHENTIC RECIPE PREPARATION</span>
                  </div>
                </div>
              )}

              {/* Macros Breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Calories</span>
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-mono">{activeModalMeal.calories}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Protein</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{activeModalMeal.protein}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Carbs</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">{activeModalMeal.carbs}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Fats</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono">{activeModalMeal.fats}g</span>
                </div>
              </div>

              {/* What should be eaten rationale */}
              {activeModalMeal.whatShouldBeEaten && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  <span className="font-bold block mb-1">Nutritional Purpose:</span>
                  {activeModalMeal.whatShouldBeEaten}
                </div>
              )}

              {/* Ingredients list */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                  Ingredients:
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                  {activeModalMeal.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <ListOrdered className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                      Detailed Cooking Steps & Preparation:
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopySteps(activeModalMeal)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedStepsToast === activeModalMeal.title ? 'Copied Steps!' : 'Copy Cooking Steps'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>Interactive Kitchen Checklist: Tap step to mark complete</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {((activeModalMeal.instructions || []).filter((_, i) => checkedSteps[`modal_${activeModalMeal.slot}_step_${i}`])).length} of {(activeModalMeal.instructions || []).length} steps completed
                  </span>
                </div>

                {activeModalMeal.instructions && activeModalMeal.instructions.length > 0 ? (
                  <ol className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {activeModalMeal.instructions.map((step, idx) => {
                      const stepKey = `modal_${activeModalMeal.slot}_step_${idx}`;
                      const isDone = !!checkedSteps[stepKey];
                      return (
                        <li
                          key={idx}
                          onClick={() => toggleStepDone(stepKey)}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
                            isDone
                              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-neutral-400 dark:text-neutral-500 line-through'
                              : 'bg-neutral-50 dark:bg-neutral-800/80 border-neutral-200/80 dark:border-neutral-700/80 hover:border-emerald-400 text-neutral-800 dark:text-neutral-200'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 ${
                              isDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                            }`}
                          >
                            {isDone ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </span>
                          <span className="leading-relaxed flex-1 text-xs">
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                ) : (
                  <p className="text-xs text-neutral-500">
                    Prepare fresh according to portion ingredients. Sear or poach lean protein and assemble with vegetables and whole grains.
                  </p>
                )}
              </div>

              {/* Chef Tip */}
              {activeModalMeal.chefTip && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Chef's Culinary Tip: </span>
                    <span>{activeModalMeal.chefTip}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalMeal(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleLogSlot(activeModalMeal);
                  setActiveModalMeal(null);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log to Calorie Diary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert: Custom Recipe Saved */}
      {recipeSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
          <span>{recipeSavedToast}</span>
        </div>
      )}

      {/* Toast Alert: Course Meal Changed */}
      {mealChangedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-purple-200 shrink-0" />
          <span>{mealChangedToast}</span>
        </div>
      )}

      {/* Custom Recipe Creator & Calorie Counter Modal */}
      <CustomRecipeModal
        isOpen={isCustomRecipeModalOpen}
        onClose={() => setIsCustomRecipeModalOpen(false)}
        onRecipeSaved={(newRecipe) => {
          setRecipeSavedToast(`Saved "${newRecipe.title}" (${newRecipe.calories} kcal) to recipe database!`);
          setTimeout(() => setRecipeSavedToast(null), 4000);
        }}
      />

      {/* Manual Change Course Meal & Portion Optimizer Modal */}
      <ChangeCourseMealModal
        isOpen={isChangeMealModalOpen}
        onClose={() => {
          setIsChangeMealModalOpen(false);
          setTargetChangeMeal(null);
        }}
        targetMeal={targetChangeMeal}
        onApplyMealChange={(slot, newMeal) => {
          if (onAlterCourseMeal) {
            onAlterCourseMeal(slot, newMeal);
          }
          setMealChangedToast(`Updated ${newMeal.slotLabel || slot} to "${newMeal.title}" (${newMeal.calories} kcal) with portion optimization!`);
          setTimeout(() => setMealChangedToast(null), 4000);
        }}
        onOpenCreateRecipe={() => {
          setIsChangeMealModalOpen(false);
          setIsCustomRecipeModalOpen(true);
        }}
      />
    </div>
  );
};
