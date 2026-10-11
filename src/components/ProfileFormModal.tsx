import React, { useState } from 'react';
import {
  X,
  Scale,
  Sparkles,
  ArrowRight,
  Info,
  Globe2,
  UtensilsCrossed,
  Check,
} from 'lucide-react';
import {
  UserProfile,
  Gender,
  ActivityLevel,
  FitnessGoal,
  DietPreference,
  UnitSystem,
  CuisineCountry,
} from '../types/nutrition';
import {
  calculateFullNutrition,
  feetInchesToCm,
  cmToFeetInches,
  kgToLbs,
  lbsToKg,
} from '../utils/calculations';
import {
  CUISINES_LIST,
  FOOD_PREFERENCE_CATEGORIES,
} from '../utils/dietPlanGenerator';

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileFormModal: React.FC<ProfileFormModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(profile.unitSystem);
  const [age, setAge] = useState<number>(profile.age);
  const [gender, setGender] = useState<Gender>(profile.gender);

  // Height states
  const [heightCm, setHeightCm] = useState<number>(profile.heightCm);
  const { feet: initFeet, inches: initInches } = cmToFeetInches(profile.heightCm);
  const [heightFt, setHeightFt] = useState<number>(initFeet);
  const [heightIn, setHeightIn] = useState<number>(initInches);

  // Weight states
  const [weightKg, setWeightKg] = useState<number>(profile.weightKg);
  const [weightLbs, setWeightLbs] = useState<number>(kgToLbs(profile.weightKg));
  const [targetWeightKg, setTargetWeightKg] = useState<number>(profile.targetWeightKg);
  const [targetWeightLbs, setTargetWeightLbs] = useState<number>(kgToLbs(profile.targetWeightKg));

  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(profile.activityLevel);
  const [fitnessGoal, setFitnessGoal] = useState<FitnessGoal>(profile.fitnessGoal);
  const [dietPreference, setDietPreference] = useState<DietPreference>(profile.dietPreference);

  // Cuisine & Food Preferences states
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineCountry>(
    profile.selectedCuisine || 'mediterranean'
  );
  const [foodPreferences, setFoodPreferences] = useState<string[]>(
    profile.foodPreferences || ['meat_poultry', 'fish_seafood', 'dairy_products']
  );
  const [customFoodNotes, setCustomFoodNotes] = useState<string>(
    profile.customFoodNotes || ''
  );

  if (!isOpen) return null;

  // Compute live current values
  const currentHeightCm = unitSystem === 'metric' ? heightCm : feetInchesToCm(heightFt, heightIn);
  const currentWeightKg = unitSystem === 'metric' ? weightKg : lbsToKg(weightLbs);
  const currentTargetWeightKg = unitSystem === 'metric' ? targetWeightKg : lbsToKg(targetWeightLbs);

  const previewProfile: UserProfile = {
    age,
    gender,
    heightCm: Math.max(100, currentHeightCm || 170),
    weightKg: Math.max(30, currentWeightKg || 70),
    targetWeightKg: Math.max(30, currentTargetWeightKg || 68),
    unitSystem,
    activityLevel,
    fitnessGoal,
    dietPreference,
    waterGoalMl: profile.waterGoalMl,
    selectedCuisine,
    foodPreferences,
    customFoodNotes,
  };

  const previewCalc = calculateFullNutrition(previewProfile);

  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    if (newSystem === unitSystem) return;
    setUnitSystem(newSystem);
    if (newSystem === 'imperial') {
      const { feet, inches } = cmToFeetInches(heightCm);
      setHeightFt(feet);
      setHeightIn(inches);
      setWeightLbs(kgToLbs(weightKg));
      setTargetWeightLbs(kgToLbs(targetWeightKg));
    } else {
      const cm = feetInchesToCm(heightFt, heightIn);
      setHeightCm(cm);
      setWeightKg(lbsToKg(weightLbs));
      setTargetWeightKg(lbsToKg(targetWeightLbs));
    }
  };

  const handleTogglePreference = (id: string) => {
    setFoodPreferences((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...previewProfile,
      waterGoalMl: previewCalc.macros.waterMl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Personal Anthropometrics, Cuisine & Diet Preferences
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Enter your body metrics, preferred international cuisine, and food choices.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-6 py-5 space-y-6 flex-1 no-scrollbar">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => handleUnitSystemChange('metric')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                unitSystem === 'metric'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Metric (kg, cm)
            </button>
            <button
              type="button"
              onClick={() => handleUnitSystemChange('imperial')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                unitSystem === 'imperial'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Imperial (lbs, ft/in)
            </button>
          </div>

          {/* Age & Biological Sex */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Age (years)
              </label>
              <input
                type="number"
                min="14"
                max="100"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                required
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Biological Sex (for Mifflin-St Jeor BMR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Height & Current Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unitSystem === 'metric' ? (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="120"
                  max="240"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Height (Feet & Inches)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono tabular-nums"
                    />
                    <span className="absolute right-3 top-2 text-xs text-neutral-400">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono tabular-nums"
                    />
                    <span className="absolute right-3 top-2 text-xs text-neutral-400">in</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Current Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="35"
                  max="250"
                  value={unitSystem === 'metric' ? weightKg : weightLbs}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (unitSystem === 'metric') {
                      setWeightKg(val);
                      setWeightLbs(kgToLbs(val));
                    } else {
                      setWeightLbs(val);
                      setWeightKg(lbsToKg(val));
                    }
                  }}
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
                />
                <span className="absolute right-3 top-2.5 text-xs text-neutral-400">
                  {unitSystem === 'metric' ? 'kg' : 'lbs'}
                </span>
              </div>
            </div>
          </div>

          {/* Target Weight */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Target Weight Goal ({unitSystem === 'metric' ? 'kg' : 'lbs'})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="35"
                max="250"
                value={unitSystem === 'metric' ? targetWeightKg : targetWeightLbs}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (unitSystem === 'metric') {
                    setTargetWeightKg(val);
                    setTargetWeightLbs(kgToLbs(val));
                  } else {
                    setTargetWeightLbs(val);
                    setTargetWeightKg(lbsToKg(val));
                  }
                }}
                required
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tabular-nums"
              />
              <span className="absolute right-3 top-2.5 text-xs text-neutral-400">
                {unitSystem === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Baseline Daily Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            >
              <option value="sedentary">Sedentary (Desk job, little or no exercise)</option>
              <option value="light">Lightly Active (Light exercise or sports 1–3 days/wk)</option>
              <option value="moderate">Moderately Active (Moderate exercise 3–5 days/wk)</option>
              <option value="very_active">Very Active (Hard training 6–7 days/wk)</option>
              <option value="extra_active">Extremely Active (Physical labor or double workouts)</option>
            </select>
          </div>

          {/* Fitness Goal & Diet Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Primary Fitness Goal
              </label>
              <select
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value as FitnessGoal)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <option value="lose_weight_steady">Steady Weight Loss (-500 kcal/day)</option>
                <option value="lose_weight_fast">Accelerated Fat Loss (-750 kcal/day)</option>
                <option value="maintain">Body Recomposition & Maintain</option>
                <option value="gain_muscle">Lean Muscle Hypertrophy (+350 kcal/day)</option>
                <option value="athletic">Athletic Endurance Performance</option>
                <option value="keto">Ketogenic Fat Oxidation Protocol</option>
                <option value="mediterranean">Mediterranean Heart Health Protocol</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Dietary Framework
              </label>
              <select
                value={dietPreference}
                onChange={(e) => setDietPreference(e.target.value as DietPreference)}
                className="w-full px-3 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                <option value="balanced">Balanced Macro Ratio (High Fiber)</option>
                <option value="high_protein">High-Protein (30–35% Protein)</option>
                <option value="low_carb">Low-Carb / Glycemic Control</option>
                <option value="mediterranean">Mediterranean (Omega-3 & Olive Oil)</option>
                <option value="keto">Ketogenic (70% Healthy Fats)</option>
                <option value="vegetarian">Vegetarian (Dairy & Egg)</option>
                <option value="vegan">Plant-Based / 100% Vegan</option>
              </select>
            </div>
          </div>

          {/* Preferred Country Cuisine Menu */}
          <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>International Cuisine Preference (Alters Course Recipes)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CUISINES_LIST.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCuisine(c.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    selectedCuisine === c.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-2xs'
                      : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-lg block mb-0.5">{c.flag}</span>
                  <div className="truncate">{c.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Food Types Checkboxes */}
          <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
              <span>Food Type Preferences (Meat, Fish, Dairy, Plant-based, etc.)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {FOOD_PREFERENCE_CATEGORIES.map((cat) => {
                const isSelected = foodPreferences.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleTogglePreference(cat.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-semibold'
                        : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate flex-1">{cat.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Custom Food Wishlist Text Box */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Custom Food Choices & Dietary Exclusions (Write in your own words):
            </label>
            <textarea
              rows={2}
              value={customFoodNotes}
              onChange={(e) => setCustomFoodNotes(e.target.value)}
              placeholder="e.g. Prefer wild salmon, chicken breast, Greek yogurt, berries. Dislike pork or bell peppers."
              className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Live Calculated Clinical Metric Preview */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Real-Time Nutritional Metrics Preview
              </span>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded"
                style={{
                  color: previewCalc.categoryColor,
                  backgroundColor: `${previewCalc.categoryColor}15`,
                }}
              >
                {previewCalc.category}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Calculated BMI</div>
                <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {previewCalc.bmi}
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Basal BMR</div>
                <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {previewCalc.bmr} <span className="text-xs font-normal text-neutral-400">kcal</span>
                </div>
              </div>
              <div className="bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Total TDEE</div>
                <div className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
                  {previewCalc.tdee} <span className="text-xs font-normal text-neutral-400">kcal</span>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/70 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">Target Budget</div>
                <div className="text-base font-bold text-emerald-900 dark:text-emerald-100 font-mono tabular-nums">
                  {previewCalc.targetCalories} <span className="text-xs font-normal text-emerald-700">kcal</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
              {previewCalc.healthAnalysis}
            </p>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <span>Save & Recalibrate Diet Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
