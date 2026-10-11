import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  Sparkles,
  Check,
  Search,
  Flame,
  ChefHat,
  Sliders,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  RotateCcw,
} from 'lucide-react';
import { PlanMealSlot, MealRecipe } from '../types/nutrition';
import {
  getAllRecipes,
  CUISINE_OPTIONS,
  DISH_TYPE_OPTIONS,
  resolveDishType,
} from '../data/recipeDatabase';
import { optimizeMealPortion } from '../utils/nutritionCalculator';

interface ChangeCourseMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMeal: PlanMealSlot | null;
  onApplyMealChange: (slot: string, newMeal: PlanMealSlot) => void;
  onOpenCreateRecipe?: () => void;
}

export const ChangeCourseMealModal: React.FC<ChangeCourseMealModalProps> = ({
  isOpen,
  onClose,
  targetMeal,
  onApplyMealChange,
  onOpenCreateRecipe,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [selectedDishType, setSelectedDishType] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<MealRecipe | null>(null);
  const [autoOptimizePortions, setAutoOptimizePortions] = useState(true);
  const [activeTab, setActiveTab] = useState<'catalog' | 'manual'>('catalog');

  // Manual custom inputs
  const [manualTitle, setManualTitle] = useState('');
  const [manualDescription, setManualDescription] = useState('');
  const [manualCalories, setManualCalories] = useState(450);
  const [manualProtein, setManualProtein] = useState(35);
  const [manualCarbs, setManualCarbs] = useState(40);
  const [manualFats, setManualFats] = useState(15);
  const [manualIngredients, setManualIngredients] = useState('Chicken, Rice, Olive oil, Spinach');

  if (!isOpen || !targetMeal) return null;

  const allRecipes = getAllRecipes();
  const targetCalories = targetMeal.calories || 450;

  // Filter recipes by search, cuisine, and dish type
  const filteredRecipes = allRecipes.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      r.title.toLowerCase().includes(term) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(term)) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(term)) ||
      (r.dietTags && r.dietTags.some((t) => t.toLowerCase().includes(term)));

    const rCuisine = (r.cuisine || 'mediterranean').toLowerCase();
    const matchesCuisine =
      selectedCuisine === 'all' ||
      rCuisine === selectedCuisine ||
      rCuisine.includes(selectedCuisine);

    const rDishType = resolveDishType(r);
    const matchesDishType =
      selectedDishType === 'all' || rDishType === selectedDishType;

    return matchesSearch && matchesCuisine && matchesDishType;
  });

  // Calculate scaled preview if a recipe is selected
  const activeSelected = selectedRecipe || allRecipes[0];
  const scaleRatio = activeSelected ? targetCalories / (activeSelected.calories || 1) : 1;
  const scaledCalories = autoOptimizePortions ? targetCalories : activeSelected?.calories || targetCalories;
  const scaledProtein = autoOptimizePortions
    ? Math.round((activeSelected?.protein || 30) * scaleRatio * 10) / 10
    : activeSelected?.protein || 30;
  const scaledCarbs = autoOptimizePortions
    ? Math.round((activeSelected?.carbs || 30) * scaleRatio * 10) / 10
    : activeSelected?.carbs || 30;
  const scaledFats = autoOptimizePortions
    ? Math.round((activeSelected?.fats || 15) * scaleRatio * 10) / 10
    : activeSelected?.fats || 15;
  const scaledFiber = autoOptimizePortions
    ? Math.round((activeSelected?.fiber || 5) * scaleRatio * 10) / 10
    : activeSelected?.fiber || 5;

  const handleConfirmChange = () => {
    if (activeTab === 'catalog') {
      if (!activeSelected) return;

      const baseMealSlot: PlanMealSlot = {
        slot: targetMeal.slot,
        slotLabel: targetMeal.slotLabel,
        courseCategory: targetMeal.courseCategory,
        timeOfDay: targetMeal.timeOfDay,
        title: activeSelected.title,
        description: `${activeSelected.category.toUpperCase()} • ${activeSelected.cuisine || 'Mediterranean'} style recipe`,
        calories: activeSelected.calories,
        protein: activeSelected.protein,
        carbs: activeSelected.carbs,
        fats: activeSelected.fats,
        fiber: activeSelected.fiber,
        ingredients: activeSelected.ingredients.map((i) => `${i.amount} ${i.name}`),
        prepTime: `${activeSelected.prepTimeMinutes} mins`,
        recipeId: activeSelected.id,
        image: activeSelected.image,
        instructions: activeSelected.instructions,
        chefTip: activeSelected.chefTip,
        difficulty: activeSelected.difficulty,
        isUserCustom: activeSelected.isUserCustom,
        micronutrients: activeSelected.micronutrients,
      };

      const finalMeal = autoOptimizePortions
        ? optimizeMealPortion(baseMealSlot, targetCalories)
        : baseMealSlot;

      onApplyMealChange(targetMeal.slot, finalMeal);
    } else {
      // Manual entry
      const manualMeal: PlanMealSlot = {
        slot: targetMeal.slot,
        slotLabel: targetMeal.slotLabel,
        courseCategory: targetMeal.courseCategory,
        timeOfDay: targetMeal.timeOfDay,
        title: manualTitle.trim() || 'Custom Nutrition Course',
        description: manualDescription.trim() || 'User tailored daily course meal.',
        calories: Number(manualCalories) || targetCalories,
        protein: Number(manualProtein) || 30,
        carbs: Number(manualCarbs) || 30,
        fats: Number(manualFats) || 15,
        fiber: 5,
        ingredients: manualIngredients.split(',').map((s) => s.trim()).filter(Boolean),
        prepTime: '15 mins',
        instructions: ['Prepare ingredients according to portion targets and cook fresh.'],
        chefTip: 'Customized course intake preserving patient metabolic deficit.',
        isUserCustom: true,
      };

      onApplyMealChange(targetMeal.slot, manualMeal);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl w-full max-w-3xl my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  {targetMeal.slotLabel || targetMeal.slot}
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Current Target: {targetCalories} kcal
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Change Daily Course Meal
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'catalog'
                  ? 'border-emerald-600 text-emerald-600 font-bold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Choose from Recipe Database ({allRecipes.length})
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`pb-2.5 px-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'manual'
                  ? 'border-emerald-600 text-emerald-600 font-bold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Enter Custom Dish
            </button>
          </div>

          {onOpenCreateRecipe && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreateRecipe();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer mb-2"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>+ Create Brand New Recipe</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Automatic Portion Optimization Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-300 dark:border-emerald-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Automatic Portion & Nutrition Optimization
                </span>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoOptimizePortions}
                  onChange={(e) => setAutoOptimizePortions(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-emerald-800 dark:text-emerald-300">Lock Target Budget</span>
              </label>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When enabled, the ingredient quantities and portion sizes are automatically scaled by{' '}
              <strong className="text-neutral-900 dark:text-neutral-100 font-mono">
                {scaleRatio.toFixed(2)}x
              </strong>{' '}
              so the calories stay exactly at your course budget of{' '}
              <strong className="text-emerald-700 dark:text-emerald-400 font-mono">
                {targetCalories} kcal
              </strong>
              . This ensures your daily caloric deficit and macronutrient targets don't change!
            </p>

            {/* Scaled Nutrients Snapshot */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Calories</span>
                <span className="font-extrabold text-neutral-900 dark:text-neutral-100 font-mono">
                  {scaledCalories} kcal
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Protein</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {scaledProtein}g
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Carbs</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {scaledCarbs}g
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Fats</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {scaledFats}g
                </span>
              </div>
            </div>
          </div>

          {activeTab === 'catalog' ? (
            <div className="space-y-3.5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search recipes or ingredients (pasta, soup, salad, salmon, chicken)..."
                  className="w-full pl-9 pr-8 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Meal / Dish Type Filters (Pasta, Soup, Salad, etc.) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                    <span>Dish / Meal Type</span>
                    <span className="text-neutral-400 font-normal">
                      ({selectedDishType === 'all' ? 'All' : DISH_TYPE_OPTIONS.find((d) => d.id === selectedDishType)?.label})
                    </span>
                  </div>
                  {(selectedDishType !== 'all' || selectedCuisine !== 'all' || searchTerm) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDishType('all');
                        setSelectedCuisine('all');
                        setSearchTerm('');
                      }}
                      className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      Reset Filters
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {DISH_TYPE_OPTIONS.map((type) => {
                    const isSelected = selectedDishType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedDishType(type.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white font-bold shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cuisine Filters (Italian, Mediterranean, Japanese, etc.) */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <span>Cuisine</span>
                  <span className="text-neutral-400 font-normal">
                    ({selectedCuisine === 'all' ? 'All' : CUISINE_OPTIONS.find((c) => c.id === selectedCuisine)?.label})
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {CUISINE_OPTIONS.map((c) => {
                    const isSelected = selectedCuisine === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCuisine(c.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Results Summary */}
              <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
                <span>Showing <strong>{filteredRecipes.length}</strong> matching meals</span>
                {filteredRecipes.length === 0 && (
                  <span className="text-amber-600 font-medium">Try broadening your filters</span>
                )}
              </div>

              {/* Recipe List */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {filteredRecipes.length === 0 ? (
                  <div className="p-8 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 space-y-2">
                    <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                      No recipes found matching these filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDishType('all');
                        setSelectedCuisine('all');
                        setSearchTerm('');
                      }}
                      className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
                    >
                      Clear Filters & Show All
                    </button>
                  </div>
                ) : (
                  filteredRecipes.map((recipe) => {
                    const isSelected = activeSelected?.id === recipe.id;
                    const rDishType = resolveDishType(recipe);
                    const dishTypeMeta = DISH_TYPE_OPTIONS.find((d) => d.id === rDishType);
                    const cuisineMeta = CUISINE_OPTIONS.find(
                      (c) => c.id === (recipe.cuisine || '').toLowerCase()
                    );

                    return (
                      <div
                        key={recipe.id}
                        onClick={() => setSelectedRecipe(recipe)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {recipe.image && (
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg';
                              }}
                              className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                                {recipe.title}
                              </span>
                              {dishTypeMeta && dishTypeMeta.id !== 'all' && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shrink-0">
                                  {dishTypeMeta.icon} {dishTypeMeta.label.split(' ')[0]}
                                </span>
                              )}
                              {cuisineMeta && cuisineMeta.id !== 'all' && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 shrink-0">
                                  {cuisineMeta.flag} {cuisineMeta.label}
                                </span>
                              )}
                              {recipe.visibility === 'community' ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                                  🌐 Community
                                </span>
                              ) : recipe.isUserCustom ? (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 shrink-0">
                                  🔒 Private
                                </span>
                              ) : null}
                            </div>
                            <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                              Base: {recipe.calories} kcal · {recipe.protein}g P · {recipe.carbs}g C ·{' '}
                              {recipe.fats}g F
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {isSelected ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="text-xs text-neutral-400 font-semibold hover:text-emerald-600">
                              Select &rarr;
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            /* Manual Course Input */
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Dish Title
                </label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Garlic Herb Turkey Burger Bowl"
                  className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  value={manualIngredients}
                  onChange={(e) => setManualIngredients(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Calories (kcal)
                  </label>
                  <input
                    type="number"
                    value={manualCalories}
                    onChange={(e) => setManualCalories(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={manualProtein}
                    onChange={(e) => setManualProtein(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={manualCarbs}
                    onChange={(e) => setManualCarbs(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Fats (g)
                  </label>
                  <input
                    type="number"
                    value={manualFats}
                    onChange={(e) => setManualFats(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 flex items-center justify-between">
          <div className="text-xs text-neutral-500">
            Replacing: <strong className="text-neutral-800 dark:text-neutral-200">{targetMeal.title}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmChange}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply & Optimize Meal Course</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
