import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Search,
  Droplets,
  Flame,
  Watch,
  X,
  Check,
  Sparkles,
  Camera,
} from 'lucide-react';
import { LoggedFood, FoodItem, BmiResult, WearableDeviceState } from '../types/nutrition';
import { FOOD_DATABASE } from '../data/foodDatabase';

interface CalorieTrackerViewProps {
  loggedFoods: LoggedFood[];
  onAddFood: (food: LoggedFood) => void;
  onRemoveFood: (id: string) => void;
  bmiResult: BmiResult;
  wearableState: WearableDeviceState;
  waterIntakeMl: number;
  onUpdateWater: (ml: number) => void;
  targetWaterMl: number;
  onNavigateToCamera?: () => void;
}

export const CalorieTrackerView: React.FC<CalorieTrackerViewProps> = ({
  loggedFoods,
  onAddFood,
  onRemoveFood,
  bmiResult,
  wearableState,
  waterIntakeMl,
  onUpdateWater,
  targetWaterMl,
  onNavigateToCamera,
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState<
    'breakfast' | 'lunch' | 'dinner' | 'snack'
  >('breakfast');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);

  // Custom food entry tab state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFats, setCustomFats] = useState('');
  const [customPortion, setCustomPortion] = useState('1 serving (100g)');

  // Calorie calculations
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
  const totalFiberConsumed = Math.round(
    loggedFoods.reduce((sum, item) => sum + (item.fiber || 0), 0)
  );

  // Dynamic Wearable Adjustment:
  // Daily Calorie Budget = Baseline Goal + Active Wearable Burn
  const activeBurnBonus = wearableState.activeCaloriesBurned || 0;
  const effectiveCalorieBudget = bmiResult.targetCalories + activeBurnBonus;
  const remainingCalories = effectiveCalorieBudget - totalCaloriesConsumed;

  // Meal slot filter
  const mealSlots: { id: 'breakfast' | 'lunch' | 'dinner' | 'snack'; label: string }[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snacks & Extras' },
  ];

  const filteredFoods = FOOD_DATABASE.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Protein', 'Carbohydrate', 'Healthy Fat', 'Vegetable', 'Fruit', 'Dairy & Alt', 'Meal & Snack'];

  const handleSelectFood = (food: FoodItem) => {
    const mult = Math.max(0.25, servingMultiplier);
    const newLoggedFood: LoggedFood = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      foodName: food.name,
      mealSlot: selectedMealSlot,
      servings: mult,
      servingDescription: mult === 1 ? food.servingSize : `${mult} × ${food.servingSize}`,
      calories: Math.round(food.calories * mult),
      protein: Math.round(food.protein * mult * 10) / 10,
      carbs: Math.round(food.carbs * mult * 10) / 10,
      fats: Math.round(food.fats * mult * 10) / 10,
      fiber: Math.round(food.fiber * mult * 10) / 10,
      timeLogged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    onAddFood(newLoggedFood);
    setIsSearchModalOpen(false);
    setSearchTerm('');
    setServingMultiplier(1);
  };

  const handleCreateCustomFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customCalories) return;

    const newLoggedFood: LoggedFood = {
      id: `log_custom_${Date.now()}`,
      foodName: customName.trim(),
      mealSlot: selectedMealSlot,
      servings: 1,
      servingDescription: customPortion || '1 serving',
      calories: Number(customCalories) || 0,
      protein: Number(customProtein) || 0,
      carbs: Number(customCarbs) || 0,
      fats: Number(customFats) || 0,
      fiber: 0,
      timeLogged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddFood(newLoggedFood);
    setIsSearchModalOpen(false);
    setIsCustomMode(false);
    setCustomName('');
    setCustomCalories('');
    setCustomProtein('');
    setCustomCarbs('');
    setCustomFats('');
  };

  const openAddModalForSlot = (slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealSlot(slot);
    setIsSearchModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Caloric Budget and Macro Rings */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800 gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Daily Caloric & Macro Tracker
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              <span>Target: {bmiResult.targetCalories} kcal</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <Watch className="w-3.5 h-3.5" />
                Wearable Active Burn: +{activeBurnBonus} kcal
              </span>
              <span aria-hidden="true">·</span>
              <span>Net Allowance: {effectiveCalorieBudget} kcal</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {onNavigateToCamera && (
              <button
                onClick={onNavigateToCamera}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-2xs transition-colors cursor-pointer"
                title="Scan meal with camera to auto-calculate calories"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>AI Camera Scan</span>
              </button>
            )}

            <button
              onClick={() => openAddModalForSlot('breakfast')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Food Item</span>
            </button>
          </div>
        </div>

        {/* Primary Calorie Meter & Macros Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pt-6">
          {/* Calorie Ring Summary */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-750">
            {/* Circular Progress Meter */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="9"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={remainingCalories >= 0 ? '#10B981' : '#EF4444'}
                  strokeWidth="9"
                  strokeDasharray="251.2"
                  strokeDashoffset={
                    251.2 -
                    Math.min(
                      1,
                      totalCaloriesConsumed / (effectiveCalorieBudget || 1)
                    ) *
                      251.2
                  }
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums block leading-tight">
                  {Math.abs(remainingCalories)}
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  {remainingCalories >= 0 ? 'Remaining' : 'Over Limit'}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs w-full sm:flex-1">
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Consumed:</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {totalCaloriesConsumed} kcal
                </span>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Base Target:</span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {bmiResult.targetCalories} kcal
                </span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Wearable Burn:
                </span>
                <span className="font-bold font-mono tabular-nums">
                  +{activeBurnBonus} kcal
                </span>
              </div>
              <div className="pt-1 border-t border-neutral-200 dark:border-neutral-750 flex justify-between font-bold text-neutral-900 dark:text-neutral-100">
                <span>Effective Budget:</span>
                <span className="font-mono tabular-nums">{effectiveCalorieBudget} kcal</span>
              </div>
            </div>
          </div>

          {/* Macronutrients Progress Bars */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {/* Protein */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-750 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Protein</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-[11px] font-mono tabular-nums">
                    {totalProteinConsumed} / {bmiResult.macros.proteinGrams}g
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalProteinConsumed / (bmiResult.macros.proteinGrams || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 mt-2 font-mono tabular-nums">
                {Math.round(totalProteinConsumed * 4)} kcal ({bmiResult.macros.proteinPercent}%)
              </div>
            </div>

            {/* Carbs */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-750 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Carbs</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-[11px] font-mono tabular-nums">
                    {totalCarbsConsumed} / {bmiResult.macros.carbsGrams}g
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalCarbsConsumed / (bmiResult.macros.carbsGrams || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 mt-2 font-mono tabular-nums">
                {Math.round(totalCarbsConsumed * 4)} kcal ({bmiResult.macros.carbsPercent}%)
              </div>
            </div>

            {/* Fats */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-750 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Fats</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-[11px] font-mono tabular-nums">
                    {totalFatsConsumed} / {bmiResult.macros.fatsGrams}g
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalFatsConsumed / (bmiResult.macros.fatsGrams || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 mt-2 font-mono tabular-nums">
                {Math.round(totalFatsConsumed * 9)} kcal ({bmiResult.macros.fatsPercent}%)
              </div>
            </div>

            {/* Fiber */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-850 rounded-xl border border-neutral-200 dark:border-neutral-750 flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  <span>Fiber</span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-[10px] sm:text-[11px] font-mono tabular-nums">
                    {totalFiberConsumed} / {bmiResult.macros.fiberGrams}g
                  </span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        100,
                        (totalFiberConsumed / (bmiResult.macros.fiberGrams || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-neutral-400 mt-2 truncate">
                Gut Microbiome
              </div>
            </div>
          </div>
        </div>

        {/* Daily Hydration Bar */}
        <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                Hydration Tracker
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
                {waterIntakeMl} ml of {targetWaterMl} ml goal (
                {Math.round((waterIntakeMl / targetWaterMl) * 100)}%)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full w-full sm:w-auto pb-1 min-w-0">
            {[250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500].map((step, idx) => {
              const isFilled = waterIntakeMl >= step;
              return (
                <button
                  key={step}
                  onClick={() => onUpdateWater(step)}
                  className={`w-6 h-7 shrink-0 rounded-sm flex items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                    isFilled
                      ? 'bg-blue-500 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 hover:bg-neutral-200'
                  }`}
                  title={`${step} ml`}
                >
                  {idx + 1}
                </button>
              );
            })}
            <button
              onClick={() => onUpdateWater(waterIntakeMl + 250)}
              className="ml-2 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-md transition-colors shrink-0 cursor-pointer"
            >
              +250ml
            </button>
            {waterIntakeMl > 0 && (
              <button
                onClick={() => onUpdateWater(0)}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-1.5 py-1 shrink-0 cursor-pointer"
                title="Reset Hydration"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logged Meal Sections */}
      <div className="space-y-4">
        {mealSlots.map((slot) => {
          const slotItems = loggedFoods.filter((item) => item.mealSlot === slot.id);
          const slotCalories = slotItems.reduce((acc, curr) => acc + curr.calories, 0);
          const slotProtein = slotItems.reduce((acc, curr) => acc + curr.protein, 0);

          return (
            <div
              key={slot.id}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs"
            >
              {/* Slot Header */}
              <div className="flex flex-wrap items-center justify-between px-4 sm:px-5 py-3.5 bg-neutral-50/70 dark:bg-neutral-850 border-b border-neutral-100 dark:border-neutral-800 gap-2">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{slot.label}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono tabular-nums">
                    {slotCalories} kcal · {Math.round(slotProtein)}g prot
                  </span>
                </div>

                <button
                  onClick={() => openAddModalForSlot(slot.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200/60 dark:border-emerald-800/60 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Food</span>
                </button>
              </div>

              {/* Slot Items Table / Empty State */}
              {slotItems.length === 0 ? (
                <div className="px-5 py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
                  No food logged for {slot.label.toLowerCase()} yet.
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {slotItems.map((item) => (
                    <div
                      key={item.id}
                      className="px-3.5 sm:px-5 py-3 flex items-center justify-between gap-2.5 hover:bg-neutral-50/60 dark:hover:bg-neutral-800/40 transition-colors"
                    >
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                          {item.foodName}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 sm:gap-2 truncate">
                          <span className="truncate">{item.servingDescription}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-400 shrink-0">{item.timeLogged}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                            {item.calories} <span className="text-xs font-normal text-neutral-500">kcal</span>
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono tabular-nums">
                            {item.protein}g P · {item.carbs}g C · {item.fats}g F
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveFood(item.id)}
                          className="p-1.5 text-neutral-300 dark:text-neutral-600 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Food Search & Custom Food Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-850">
              <div className="min-w-0 pr-2">
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  Log Food for {selectedMealSlot.toUpperCase()}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  Search whole foods or input custom caloric measurements
                </p>
              </div>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switch: Database Search vs Custom Food */}
            <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-850 p-1">
              <button
                onClick={() => setIsCustomMode(false)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  !isCustomMode
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <span className="hidden sm:inline">Nutritional Food Library (60+ Whole Foods)</span>
                <span className="sm:hidden">Food Library</span>
              </button>
              <button
                onClick={() => setIsCustomMode(true)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isCustomMode
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <span className="hidden sm:inline">+ Quick Add Custom Food</span>
                <span className="sm:hidden">+ Custom Food</span>
              </button>
            </div>

            {/* Modal Content */}
            {!isCustomMode ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search Bar & Categories */}
                <div className="p-4 border-b border-neutral-100 space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search foods (e.g., salmon, oats, chicken, berries, avocado)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                          selectedCategory === cat
                            ? 'bg-neutral-900 text-white'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Serving multiplier slider / control */}
                  <div className="flex items-center justify-between text-xs text-neutral-600 pt-1">
                    <span>Serving Multiplier:</span>
                    <div className="flex items-center gap-2">
                      {[0.5, 1, 1.5, 2].map((m) => (
                        <button
                          key={m}
                          onClick={() => setServingMultiplier(m)}
                          className={`px-2 py-0.5 rounded text-xs font-mono font-semibold ${
                            servingMultiplier === m
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                        >
                          {m}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Search Results List */}
                <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2">
                  {filteredFoods.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 text-sm">
                      No matching foods found. Try a different query or use "Quick Add Custom Food".
                    </div>
                  ) : (
                    filteredFoods.map((food) => (
                      <div
                        key={food.id}
                        className="p-3 rounded-lg hover:bg-neutral-50 flex items-center justify-between transition-colors group cursor-pointer"
                        onClick={() => handleSelectFood(food)}
                      >
                        <div>
                          <div className="text-sm font-semibold text-neutral-900 group-hover:text-emerald-700">
                            {food.name}
                          </div>
                          <div className="text-xs text-neutral-500">
                            {food.servingSize} · {food.category}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono tabular-nums mt-0.5">
                            P: {food.protein}g · C: {food.carbs}g · F: {food.fats}g
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-base font-bold text-neutral-900 font-mono tabular-nums">
                              {Math.round(food.calories * servingMultiplier)}
                            </span>
                            <span className="text-xs text-neutral-500 ml-1">kcal</span>
                          </div>
                          <button
                            type="button"
                            className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* Custom Food Form */
              <form onSubmit={handleCreateCustomFood} className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Food or Recipe Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grandma's Chicken Soup, Whey Shake, Granola Bar"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Calories (kcal) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 350"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Portion Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1 bowl (250g)"
                      value={customPortion}
                      onChange={(e) => setCustomPortion(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Protein (g)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 25"
                      value={customProtein}
                      onChange={(e) => setCustomProtein(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Carbs (g)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 30"
                      value={customCarbs}
                      onChange={(e) => setCustomCarbs(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Fats (g)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      placeholder="e.g. 10"
                      value={customFats}
                      onChange={(e) => setCustomFats(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg font-mono tabular-nums"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                  >
                    Add Custom Food to {selectedMealSlot.toUpperCase()}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
