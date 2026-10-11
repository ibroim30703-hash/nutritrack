import React, { useState } from 'react';
import {
  Search,
  Clock,
  Flame,
  Check,
  Plus,
  X,
  Sparkles,
  BookOpen,
  Filter,
  ChefHat,
  Copy,
  ListOrdered,
  Globe,
  Lock,
  Trash2,
  Users,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { MealRecipe, LoggedFood } from '../types/nutrition';
import {
  getAllRecipes,
  deleteCustomRecipeFromDatabase,
  CUISINE_OPTIONS,
  DISH_TYPE_OPTIONS,
  resolveDishType,
} from '../data/recipeDatabase';
import {
  deleteCommunityRecipeFromFirestore,
  deleteUserPrivateRecipeFromFirestore,
} from '../lib/firebase';
import { CustomRecipeModal } from './CustomRecipeModal';

interface RecipeViewProps {
  onLogMeal: (food: LoggedFood) => void;
  remainingCalories: number;
  initialRecipeId?: string | null;
  onClearInitialRecipeId?: () => void;
  currentUser?: User | null;
  communityRecipes?: MealRecipe[];
}

export const RecipeView: React.FC<RecipeViewProps> = ({
  onLogMeal,
  remainingCalories,
  initialRecipeId,
  onClearInitialRecipeId,
  currentUser,
  communityRecipes,
}) => {
  const [localRefreshKey, setLocalRefreshKey] = useState(0);
  const allAvailableRecipes = getAllRecipes(communityRecipes);
  const [scopeFilter, setScopeFilter] = useState<'all' | 'community' | 'private' | 'curated'>('all');
  const [selectedDishType, setSelectedDishType] = useState<string>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [fitRemainingOnly, setFitRemainingOnly] = useState<boolean>(false);
  const [activeModalRecipe, setActiveModalRecipe] = useState<MealRecipe | null>(
    initialRecipeId
      ? allAvailableRecipes.find((r) => r.id === initialRecipeId) || null
      : null
  );
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [copiedStepsNotification, setCopiedStepsNotification] = useState(false);

  const communityCount = allAvailableRecipes.filter((r) => r.visibility === 'community').length;
  const privateCount = allAvailableRecipes.filter(
    (r) => r.isUserCustom && r.visibility !== 'community'
  ).length;
  const curatedCount = allAvailableRecipes.filter((r) => !r.isUserCustom).length;

  const toggleStepDone = (key: string) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleDeleteRecipe = async (e: React.MouseEvent, recipe: MealRecipe) => {
    e.stopPropagation();
    deleteCustomRecipeFromDatabase(recipe.id);
    if (recipe.visibility === 'community') {
      try {
        await deleteCommunityRecipeFromFirestore(recipe.id);
      } catch (err) {
        console.warn('Could not delete from Firestore:', err);
      }
    } else if (currentUser) {
      try {
        await deleteUserPrivateRecipeFromFirestore(currentUser.uid, recipe.id);
      } catch (err) {}
    }
    setLocalRefreshKey((k) => k + 1);
    setToastMessage(`Removed recipe "${recipe.title}"`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyRecipeSteps = (recipe: MealRecipe) => {
    const text = `${recipe.title} (${recipe.category.toUpperCase()})\nPrep Time: ${recipe.prepTimeMinutes} mins | Difficulty: ${recipe.difficulty}\nNutrition: ${recipe.calories} kcal | ${recipe.protein}g Protein | ${recipe.carbs}g Carbs | ${recipe.fats}g Fat\n\nINGREDIENTS:\n${recipe.ingredients.map((i) => `• ${i.name}: ${i.amount}`).join('\n')}\n\nDETAILED STEP-BY-STEP COOKING INSTRUCTIONS:\n${recipe.instructions.map((step, idx) => `${idx + 1}. ${step}`).join('\n\n')}\n\nNUTRITIONIST NOTE:\n${recipe.chefTip}`;
    navigator.clipboard.writeText(text);
    setCopiedStepsNotification(true);
    setTimeout(() => setCopiedStepsNotification(false), 3000);
  };

  const filterTags = [
    'All',
    'High-Protein',
    'Low-Carb',
    'Gluten-Free',
    'Something Vegan',
    'Vegetarian',
    'Omega-3 Rich',
    'Meat & Poultry',
    'Fish & Seafood',
  ];

  const filteredRecipes = allAvailableRecipes.filter((recipe) => {
    // Database Scope Filter
    if (scopeFilter === 'community' && recipe.visibility !== 'community') return false;
    if (scopeFilter === 'private' && (!recipe.isUserCustom || recipe.visibility === 'community')) return false;
    if (scopeFilter === 'curated' && recipe.isUserCustom) return false;

    // Search query
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm.trim() ||
      recipe.title.toLowerCase().includes(term) ||
      (recipe.cuisine && recipe.cuisine.toLowerCase().includes(term)) ||
      recipe.ingredients.some((i) =>
        i.name.toLowerCase().includes(term)
      ) ||
      (recipe.authorName && recipe.authorName.toLowerCase().includes(term));

    // Cuisine Filter
    const rCuisine = (recipe.cuisine || 'mediterranean').toLowerCase();
    const matchesCuisine =
      selectedCuisine === 'all' ||
      rCuisine === selectedCuisine ||
      rCuisine.includes(selectedCuisine);

    // Dish Type Filter (Pasta, Soup, Salad, etc.)
    const rDishType = resolveDishType(recipe);
    const matchesDishType =
      selectedDishType === 'all' || rDishType === selectedDishType;

    // Dietary tag filter
    const matchesTag =
      selectedTag === 'All' || recipe.dietTags.includes(selectedTag);

    // Calories remaining filter
    const matchesRemaining = !fitRemainingOnly || recipe.calories <= remainingCalories;

    return matchesSearch && matchesCuisine && matchesDishType && matchesTag && matchesRemaining;
  });

  const handleLogFromRecipe = (recipe: MealRecipe) => {
    const newLoggedFood: LoggedFood = {
      id: `log_recipe_${recipe.id}_${Date.now()}`,
      foodName: recipe.title,
      mealSlot: recipe.category,
      servings: 1,
      servingDescription: '1 prepared serving',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fats: recipe.fats,
      fiber: recipe.fiber,
      timeLogged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onLogMeal(newLoggedFood);
    setActiveModalRecipe(null);
    if (onClearInitialRecipeId) onClearInitialRecipeId();
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Healthy Meal Suggestions & Recipes</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Explore global community contributions, your private creations, and chef standards
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Action: Create / Save Own Recipe */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create / Add Recipe</span>
            </button>

            {/* Toggle: Fit My Remaining Budget */}
            <button
              onClick={() => setFitRemainingOnly(!fitRemainingOnly)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all self-start md:self-auto cursor-pointer ${
                fitRemainingOnly
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fits Remaining ({remainingCalories} kcal)</span>
            </button>
          </div>
        </div>

        {/* Database Scope Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setScopeFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              scopeFilter === 'all'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <span>All Recipes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {allAvailableRecipes.length}
            </span>
          </button>

          <button
            onClick={() => setScopeFilter('community')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              scopeFilter === 'community'
                ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-600/30'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Global Community Database</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-900/20 font-bold">
              {communityCount}
            </span>
          </button>

          <button
            onClick={() => setScopeFilter('private')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              scopeFilter === 'private'
                ? 'bg-purple-700 text-white shadow-xs ring-2 ring-purple-600/30'
                : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>My Private Recipes</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-900/20 font-bold">
              {privateCount}
            </span>
          </button>

          <button
            onClick={() => setScopeFilter('curated')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              scopeFilter === 'curated'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Standard Chef Catalog</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-neutral-300 text-neutral-800 font-bold">
              {curatedCount}
            </span>
          </button>
        </div>

        {/* Search & Tag Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, or community authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Recipe Image */}
              <div
                className="relative h-48 w-full bg-neutral-100 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalRecipe(recipe)}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 max-w-[80%]">
                  {recipe.visibility === 'community' ? (
                    <div className="inline-flex items-center gap-1 bg-emerald-800/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      <Globe className="w-3 h-3 text-emerald-300" />
                      <span>Community · {recipe.authorName || 'Chef'}</span>
                    </div>
                  ) : recipe.isUserCustom ? (
                    <div className="inline-flex items-center gap-1 bg-purple-800/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      <Lock className="w-3 h-3 text-purple-300" />
                      <span>Private · My Recipe</span>
                    </div>
                  ) : (
                    <div className="bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
                      {recipe.category}
                    </div>
                  )}
                </div>
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-mono tabular-nums font-semibold px-2 py-0.5 rounded">
                  {recipe.calories} kcal
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-5 space-y-3">
                <h3
                  onClick={() => setActiveModalRecipe(recipe)}
                  className="text-base font-bold text-neutral-900 leading-snug cursor-pointer group-hover:text-emerald-700 transition-colors"
                >
                  {recipe.title}
                </h3>

                <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono tabular-nums">
                  <span className="text-emerald-700 font-semibold">{recipe.protein}g Protein</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 font-semibold">{recipe.carbs}g Carbs</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-blue-700 font-semibold">{recipe.fats}g Fat</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-neutral-500 pt-1 border-t border-neutral-100">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {recipe.prepTimeMinutes} mins
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.ingredients.length} ingredients</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveModalRecipe(recipe)}
                  className="text-xs font-semibold text-neutral-700 hover:text-emerald-700 cursor-pointer"
                >
                  Recipe & Steps
                </button>
                {/* Delete / Unpublish custom recipe if owned */}
                {((recipe.visibility === 'community' && (recipe.authorId === currentUser?.uid || !recipe.authorId)) ||
                  (recipe.isUserCustom && recipe.visibility !== 'community')) && (
                  <button
                    onClick={(e) => handleDeleteRecipe(e, recipe)}
                    title="Remove recipe"
                    className="p-1 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => handleLogFromRecipe(recipe)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Meal</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {activeModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Modal Image & Header */}
            <div className="relative h-56 w-full bg-neutral-100 overflow-hidden shrink-0">
              <img
                src={activeModalRecipe.image}
                alt={activeModalRecipe.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                  {activeModalRecipe.category} · {activeModalRecipe.prepTimeMinutes} mins
                </span>
                <h3 className="text-xl font-bold text-white leading-tight mt-1">
                  {activeModalRecipe.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalRecipe(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Macro Bar */}
              <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                <div>
                  <div className="text-[10px] text-neutral-400">Calories</div>
                  <div className="text-sm font-bold text-neutral-900 font-mono tabular-nums">
                    {activeModalRecipe.calories} kcal
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Protein</div>
                  <div className="text-sm font-bold text-emerald-700 font-mono tabular-nums">
                    {activeModalRecipe.protein}g
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Carbohydrates</div>
                  <div className="text-sm font-bold text-amber-700 font-mono tabular-nums">
                    {activeModalRecipe.carbs}g
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400">Fats</div>
                  <div className="text-sm font-bold text-blue-700 font-mono tabular-nums">
                    {activeModalRecipe.fats}g
                  </div>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div>
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                  Ingredients List
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  {activeModalRecipe.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-neutral-50 border border-neutral-100">
                      <span>{ing.name}</span>
                      <span className="font-semibold text-neutral-900">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                  <div className="flex items-center gap-1.5">
                    <ListOrdered className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                      Detailed Cooking Steps & Preparation
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyRecipeSteps(activeModalRecipe)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedStepsNotification ? 'Copied Steps!' : 'Copy Cooking Steps'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                  <span>Interactive Kitchen Checklist: Tap step to mark complete</span>
                  <span className="font-mono text-emerald-600 font-semibold">
                    {(activeModalRecipe.instructions.filter((_, i) => checkedSteps[`recipe_${activeModalRecipe.id}_step_${i}`])).length} of {activeModalRecipe.instructions.length} steps completed
                  </span>
                </div>

                <ol className="space-y-2.5 text-xs text-neutral-700">
                  {activeModalRecipe.instructions.map((step, idx) => {
                    const stepKey = `recipe_${activeModalRecipe.id}_step_${idx}`;
                    const isDone = !!checkedSteps[stepKey];
                    return (
                      <li
                        key={idx}
                        onClick={() => toggleStepDone(stepKey)}
                        className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
                          isDone
                            ? 'bg-emerald-50/70 border-emerald-200 text-neutral-400 line-through'
                            : 'bg-neutral-50/80 border-neutral-200/80 hover:border-emerald-400 text-neutral-800'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
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
              </div>

              {/* Nutritionist Tip */}
              <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Nutritionist Note: </span>
                  {activeModalRecipe.chefTip}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => setActiveModalRecipe(null)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>

              <button
                onClick={() => handleLogFromRecipe(activeModalRecipe)}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Log this Recipe into Diary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Custom Recipe Creator Modal */}
      <CustomRecipeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        onRecipeSaved={(newRecipe) => {
          setLocalRefreshKey((k) => k + 1);
          setToastMessage(
            newRecipe.visibility === 'community'
              ? `Published "${newRecipe.title}" to Global Community Database!`
              : `Saved "${newRecipe.title}" to your private recipe collection!`
          );
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />
    </div>
  );
};
