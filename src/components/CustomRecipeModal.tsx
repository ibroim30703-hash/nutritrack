import React, { useState, useEffect } from 'react';
import {
  X,
  ChefHat,
  Plus,
  Trash2,
  Sparkles,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
  Lock,
  Globe,
  Users,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { MealRecipe } from '../types/nutrition';
import { calculateRecipeNutrition } from '../utils/nutritionCalculator';
import { saveCustomRecipeToDatabase } from '../data/recipeDatabase';
import {
  saveCommunityRecipeToFirestore,
  saveUserPrivateRecipeToFirestore,
} from '../lib/firebase';

interface CustomRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeSaved: (savedRecipe: MealRecipe) => void;
  initialCategory?: 'breakfast' | 'lunch' | 'dinner' | 'supper' | 'snack';
  currentUser?: User | null;
}

export const CustomRecipeModal: React.FC<CustomRecipeModalProps> = ({
  isOpen,
  onClose,
  onRecipeSaved,
  initialCategory = 'supper',
  currentUser,
}) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'community'>('private');
  const [authorNameInput, setAuthorNameInput] = useState(
    currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'Community Chef')
  );
  const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'supper' | 'snack'>(
    initialCategory
  );
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(20);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Quick'>('Easy');
  const [cuisine, setCuisine] = useState('Mediterranean');
  const [chefTip, setChefTip] = useState('');
  const [instructionsText, setInstructionsText] = useState(
    'Step 1: Prep and season ingredients.\nStep 2: Cook gently over medium heat.\nStep 3: Plate and garnish.'
  );

  const [ingredients, setIngredients] = useState<Array<{ name: string; amount: string }>>([
    { name: 'Chicken Breast', amount: '150g' },
    { name: 'Extra Virgin Olive Oil', amount: '1 tbsp' },
    { name: 'Fresh Baby Spinach', amount: '2 cups (60g)' },
    { name: 'Brown Jasmine Rice', amount: '100g cooked' },
  ]);

  // Live nutritional count
  const [liveNutrition, setLiveNutrition] = useState(() => calculateRecipeNutrition(ingredients));

  // Recalculate whenever ingredients change
  useEffect(() => {
    const calculated = calculateRecipeNutrition(ingredients);
    setLiveNutrition(calculated);
  }, [ingredients]);

  if (!isOpen) return null;

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { name: '', amount: '100g' }]);
  };

  const handleUpdateIngredient = (index: number, field: 'name' | 'amount', value: string) => {
    setIngredients((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const instructionsArray = instructionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const authorFinal =
      authorNameInput.trim() ||
      currentUser?.displayName ||
      (currentUser?.email ? currentUser.email.split('@')[0] : 'Community Chef');

    const newRecipe: MealRecipe = {
      id: `custom_recipe_${Date.now()}`,
      title: title.trim(),
      category,
      cuisine: cuisine.toLowerCase(),
      calories: liveNutrition.calories,
      protein: liveNutrition.protein,
      carbs: liveNutrition.carbs,
      fats: liveNutrition.fats,
      fiber: liveNutrition.fiber,
      prepTimeMinutes: Number(prepTimeMinutes) || 15,
      difficulty,
      dietTags: [
        visibility === 'community' ? 'Community Recipe' : 'Private Recipe',
        `${category.toUpperCase()}`,
        cuisine,
      ],
      image: '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg',
      ingredients: ingredients.filter((i) => i.name.trim().length > 0),
      instructions:
        instructionsArray.length > 0
          ? instructionsArray
          : ['Prepare fresh ingredients and serve.'],
      chefTip:
        chefTip.trim() ||
        (visibility === 'community'
          ? 'Shared by community member.'
          : 'Custom recipe crafted for personalized nutritional goals.'),
      isUserCustom: true,
      visibility,
      authorId: currentUser?.uid || 'local_user',
      authorName: authorFinal,
      createdAt: Date.now(),
      micronutrients: liveNutrition.micronutrients,
    };

    saveCustomRecipeToDatabase(newRecipe);

    // Sync to Firestore if signed in
    if (currentUser) {
      if (visibility === 'community') {
        saveCommunityRecipeToFirestore(newRecipe, currentUser).catch((err) =>
          console.warn('Could not sync community recipe to Firestore:', err)
        );
      } else {
        saveUserPrivateRecipeToFirestore(currentUser.uid, newRecipe).catch((err) =>
          console.warn('Could not sync private recipe to Firestore:', err)
        );
      }
    }

    onRecipeSaved(newRecipe);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Custom Recipe Creator & Calorie Counter
              </h3>
              <p className="text-xs text-neutral-500">
                Create a meal with automated calorie, macro and vitamin calculations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSaveRecipe} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Live Calorie & Macro Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Automated Nutrition Calculation (Per Serving)</span>
              </span>
              <span className="text-sm font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                {liveNutrition.calories} kcal
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white dark:bg-neutral-800/80 p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Protein</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {liveNutrition.protein}g
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800/80 p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Carbs</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">
                  {liveNutrition.carbs}g
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800/80 p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Fats</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                  {liveNutrition.fats}g
                </span>
              </div>
              <div className="bg-white dark:bg-neutral-800/80 p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-700">
                <span className="text-[10px] text-neutral-500 block">Fiber</span>
                <span className="font-bold text-teal-600 dark:text-teal-400 font-mono">
                  {liveNutrition.fiber}g
                </span>
              </div>
            </div>
          </div>

          {/* Recipe Visibility & Database Scope Selector */}
          <div className="space-y-2 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recipe Scope & Visibility</span>
              </label>
              <span className="text-[11px] font-medium text-neutral-500">
                Choose where this recipe is saved
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Private Option */}
              <div
                onClick={() => setVisibility('private')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  visibility === 'private'
                    ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-400 dark:border-purple-600 ring-2 ring-purple-400/20 shadow-xs'
                    : 'bg-white dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    visibility === 'private'
                      ? 'bg-purple-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      Private (My Account Only)
                    </span>
                    {visibility === 'private' && (
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    Visible only to you. Saved securely in your personal account & diet plan.
                  </p>
                </div>
              </div>

              {/* Global Community Option */}
              <div
                onClick={() => setVisibility('community')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  visibility === 'community'
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/20 shadow-xs'
                    : 'bg-white dark:bg-neutral-800/80 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 ${
                    visibility === 'community'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      Global Community Database
                    </span>
                    {visibility === 'community' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                    Publish publicly! All users can browse, save, and cook this dish with your credit.
                  </p>
                </div>
              </div>
            </div>

            {/* Author Credit Field when Community is selected */}
            {visibility === 'community' && (
              <div className="pt-2 mt-2 border-t border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 sm:w-32 shrink-0">
                  Author / Publisher Name:
                </label>
                <input
                  type="text"
                  value={authorNameInput}
                  onChange={(e) => setAuthorNameInput(e.target.value)}
                  placeholder="Your Name or Chef Pseudonym"
                  className="flex-1 px-3 py-1.5 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Title & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Grilled Lemon Herb Chicken Bowl"
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Meal Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch / Dinner</option>
                <option value="supper">Supper (Evening Meal)</option>
                <option value="snack">Snack In-Between</option>
              </select>
            </div>
          </div>

          {/* Prep Time & Cuisine */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Prep Time (mins)
              </label>
              <input
                type="number"
                min="1"
                max="180"
                value={prepTimeMinutes}
                onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Quick">Quick</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                Cuisine Style
              </label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="e.g. Mediterranean, Italian, Asian"
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              />
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Ingredients & Portions (Real-Time Calorie Counting)
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ing.name}
                    onChange={(e) => handleUpdateIngredient(idx, 'name', e.target.value)}
                    placeholder="e.g., Salmon, Oats, Spinach, Olive Oil..."
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                  <input
                    type="text"
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(idx, 'amount', e.target.value)}
                    placeholder="150g, 1 tbsp, 2 cups"
                    className="w-28 px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    title="Remove ingredient"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Instructions */}
          <div>
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
              Step-by-Step Cooking Instructions (One per line)
            </label>
            <textarea
              rows={3}
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-sans"
            />
          </div>

          {/* Chef Tip */}
          <div>
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
              Dietitian / Chef Technique Tip
            </label>
            <input
              type="text"
              value={chefTip}
              onChange={(e) => setChefTip(e.target.value)}
              placeholder="e.g., Squeeze fresh lemon juice to boost iron bioavailability"
              className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Recipe to Database</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
