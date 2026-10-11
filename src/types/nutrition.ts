export type Gender = 'male' | 'female';
export type UnitSystem = 'metric' | 'imperial';

export type ActivityLevel =
  | 'sedentary'
  | 'light'
  | 'moderate'
  | 'very_active'
  | 'extra_active';

export type FitnessGoal =
  | 'lose_weight_steady'
  | 'lose_weight_fast'
  | 'maintain'
  | 'gain_muscle'
  | 'athletic'
  | 'keto'
  | 'mediterranean';

export type DietPreference =
  | 'balanced'
  | 'high_protein'
  | 'low_carb'
  | 'keto'
  | 'mediterranean'
  | 'vegetarian'
  | 'vegan';

export type CuisineCountry =
  | 'mediterranean'
  | 'italian'
  | 'japanese'
  | 'mexican'
  | 'indian'
  | 'middle_eastern'
  | 'french'
  | 'thai'
  | 'american'
  | 'eastern_european'
  | 'nordic'
  | 'spanish'
  | 'korean'
  | 'vietnamese';

export type AppTheme = 'light' | 'dark' | 'midnight' | 'forest' | 'sand';
export type AppBackground = 'clean' | 'mesh' | 'grid' | 'aurora';
export type AppFontStyle = 'sans' | 'serif' | 'mono' | 'rounded' | 'geometric';
export type AppLanguage = 'en' | 'es' | 'de' | 'fr' | 'ru' | 'ar' | 'ja';

export interface AppSettings {
  language: AppLanguage;
  theme: AppTheme;
  background: AppBackground;
  fontStyle: AppFontStyle;
  fontSize: 'compact' | 'normal' | 'comfortable';
  avatarEmoji: string;
}

export interface UserProfile {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  targetWeightKg: number;
  unitSystem: UnitSystem;
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  dietPreference: DietPreference;
  waterGoalMl: number;
  selectedCuisine?: CuisineCountry;
  foodPreferences?: string[];
  customFoodNotes?: string;
  settings?: AppSettings;
}

export type BmiCategory =
  | 'Underweight'
  | 'Normal weight'
  | 'Overweight'
  | 'Obesity Class I'
  | 'Obesity Class II'
  | 'Obesity Class III';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryColor: string;
  idealWeightRange: { minKg: number; maxKg: number };
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieDeficitOrSurplus: number;
  macros: {
    proteinGrams: number;
    carbsGrams: number;
    fatsGrams: number;
    fiberGrams: number;
    waterMl: number;
    proteinPercent: number;
    carbsPercent: number;
    fatsPercent: number;
  };
  healthAnalysis: string;
  dietRecommendation: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Protein' | 'Carbohydrate' | 'Healthy Fat' | 'Vegetable' | 'Fruit' | 'Dairy & Alt' | 'Meal & Snack';
  servingSize: string;
  servingGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface LoggedFood {
  id: string;
  foodName: string;
  mealSlot: 'breakfast' | 'lunch' | 'dinner' | 'supper' | 'snack';
  servings: number;
  servingDescription: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  timeLogged: string;
}

export interface MicronutrientProfile {
  vitaminA_mcg: number;
  vitaminC_mg: number;
  vitaminD_mcg: number;
  vitaminE_mg: number;
  vitaminK_mcg: number;
  vitaminB6_mg: number;
  vitaminB12_mcg: number;
  folate_mcg: number;
  calcium_mg: number;
  iron_mg: number;
  magnesium_mg: number;
  potassium_mg: number;
  zinc_mg: number;
}

export interface MealRecipe {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'supper' | 'snack';
  cuisine?: CuisineCountry | string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  prepTimeMinutes: number;
  difficulty: 'Easy' | 'Moderate' | 'Quick';
  dietTags: string[];
  image: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  chefTip: string;
  isUserCustom?: boolean;
  micronutrients?: Partial<MicronutrientProfile>;
}

export type DailyMealSlotType =
  | 'breakfast'
  | 'snack_morning'
  | 'lunch'
  | 'snack_afternoon'
  | 'supper'
  | 'snack_evening'
  | 'snack'
  | 'dinner';

export interface PlanMealSlot {
  slot: DailyMealSlotType;
  slotLabel?: string;
  courseCategory?: 'breakfast' | 'dinner' | 'supper' | 'snack';
  whatShouldBeEaten?: string;
  timeOfDay?: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  ingredients: string[];
  prepTime: string;
  recipeId?: string;
  image?: string;
  cuisineTag?: string;
  preferenceMatch?: string[];
  instructions?: string[];
  chefTip?: string;
  difficulty?: string;
  isUserCustom?: boolean;
  portionScale?: number;
  baseCalories?: number;
  micronutrients?: Partial<MicronutrientProfile>;
}

export interface DietPlan {
  id: string;
  title: string;
  targetCalories: number;
  goalSummary: string;
  cuisine: CuisineCountry;
  cuisineName: string;
  cuisineFlag: string;
  foodPreferences: string[];
  customFoodNotes?: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  meals: PlanMealSlot[];
  guidelines: string[];
  groceryList: {
    category: string;
    items: string[];
  }[];
}

export interface WearableDeviceState {
  isConnected: boolean;
  deviceName: string;
  connectionType: 'bluetooth_ble' | 'apple_health' | 'garmin' | 'fitbit' | 'whoop' | 'simulated';
  liveHeartRateBpm: number;
  restingHeartRateBpm: number;
  stepsToday: number;
  stepGoal: number;
  activeCaloriesBurned: number;
  activeMinutes: number;
  distanceKm: number;
  lastSyncTime: string;
  isSyncing: boolean;
  batteryPercentage: number;
}

export interface MealProposal {
  slot: DailyMealSlotType;
  slotLabel?: string;
  action: 'replace_meal' | 'update_cuisine' | 'adjust_macros';
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  prepTime?: string;
  ingredients: string[];
  instructions?: string[];
  chefTip?: string;
  whatShouldBeEaten?: string;
  rationale?: string;
  cuisine?: CuisineCountry;
  image?: string;
  status?: 'pending' | 'accepted' | 'declined';
}

export interface DailyNutritionLog {
  date: string; // YYYY-MM-DD
  dayLabel: string; // e.g. "Sat, Oct 11"
  caloriesConsumed: number;
  caloriesTarget: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  waterMl: number;
  status: 'optimal' | 'surplus' | 'deficit' | 'under';
  loggedMealsCount: number;
  foodsSummary?: string[];
  notes?: string;
}

export interface MetricCheckIn {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: number;
  weightKg: number;
  heightCm: number;
  bmi: number;
  bmiCategory: BmiCategory;
  waistCm?: number;
  bodyFatPercent?: number;
  notes?: string;
}

export interface HealthDynamicsReport {
  currentBmi: number;
  previousBmi?: number;
  bmiDelta: number;
  currentWeightKg: number;
  previousWeightKg?: number;
  weightDeltaKg: number;
  weeklyVelocityKg: number;
  trend: 'improving' | 'steady' | 'needs_adjustment';
  daysTracked: number;
  summary: string;
  positiveHighlights: string[];
  dietaryRecommendations: string[];
  lifestyleTips: string[];
  medicalDisclaimer: string;
}

export interface MealReminderNotification {
  id: string;
  mealSlot: DailyMealSlotType;
  slotLabel: string;
  mealTime: string; // e.g. "08:30 AM"
  reminderTime: string; // e.g. "08:00 AM" (30 min earlier)
  dishTitle: string;
  calories: number;
  isRead: boolean;
  createdAt: number;
}


