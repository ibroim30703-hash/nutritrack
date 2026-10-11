import {
  UserProfile,
  BmiResult,
  BmiCategory,
} from '../types/nutrition';

// Unit conversion helpers
export const lbsToKg = (lbs: number): number => Math.round((lbs * 0.45359237) * 10) / 10;
export const kgToLbs = (kg: number): number => Math.round((kg * 2.20462) * 10) / 10;
export const feetInchesToCm = (feet: number, inches: number): number =>
  Math.round(((feet * 12) + inches) * 2.54);
export const cmToFeetInches = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
};

/**
 * Calculates BMI and clinical classification based on WHO standards
 */
export function calculateBmi(weightKg: number, heightCm: number): {
  bmi: number;
  category: BmiCategory;
  categoryColor: string;
  idealWeightRange: { minKg: number; maxKg: number };
} {
  const heightM = heightCm / 100;
  const rawBmi = weightKg / (heightM * heightM);
  const bmi = Math.round(rawBmi * 10) / 10;

  // Ideal weight range based on normal BMI 18.5 - 24.9
  const minKg = Math.round(18.5 * (heightM * heightM) * 10) / 10;
  const maxKg = Math.round(24.9 * (heightM * heightM) * 10) / 10;

  let category: BmiCategory = 'Normal weight';
  let categoryColor = '#16A34A'; // Green

  if (bmi < 18.5) {
    category = 'Underweight';
    categoryColor = '#D97706'; // Amber
  } else if (bmi <= 24.9) {
    category = 'Normal weight';
    categoryColor = '#16A34A'; // Green
  } else if (bmi <= 29.9) {
    category = 'Overweight';
    categoryColor = '#EA580C'; // Orange
  } else if (bmi <= 34.9) {
    category = 'Obesity Class I';
    categoryColor = '#DC2626'; // Red
  } else if (bmi <= 39.9) {
    category = 'Obesity Class II';
    categoryColor = '#B91C1C'; // Crimson
  } else {
    category = 'Obesity Class III';
    categoryColor = '#7F1D1D'; // Deep dark red
  }

  return {
    bmi,
    category,
    categoryColor,
    idealWeightRange: { minKg, maxKg },
  };
}

/**
 * Mifflin-St Jeor Basal Metabolic Rate (BMR) Formula:
 * Men: 10 * weight (kg) + 6.25 * height (cm) - 5 * age + 5
 * Women: 10 * weight (kg) + 6.25 * height (cm) - 5 * age - 161
 */
export function calculateBmr(
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  age: number
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === 'male' ? base + 5 : base - 161;
  return Math.round(bmr);
}

/**
 * Total Daily Energy Expenditure (TDEE) based on activity multiplier
 */
export function calculateTdee(bmr: number, activityLevel: UserProfile['activityLevel']): number {
  const multipliers: Record<UserProfile['activityLevel'], number> = {
    sedentary: 1.2, // Little or no exercise, desk job
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    very_active: 1.725, // Hard exercise 6-7 days/week
    extra_active: 1.9, // Very hard exercise or physical job
  };
  return Math.round(bmr * multipliers[activityLevel]);
}

/**
 * Calculates complete nutritional strategy, target calories, and macros
 */
export function calculateFullNutrition(profile: UserProfile): BmiResult {
  const { bmi, category, categoryColor, idealWeightRange } = calculateBmi(
    profile.weightKg,
    profile.heightCm
  );

  const bmr = calculateBmr(profile.gender, profile.weightKg, profile.heightCm, profile.age);
  const tdee = calculateTdee(bmr, profile.activityLevel);

  // Goal calorie adjustment
  let calorieAdjustment = 0;
  switch (profile.fitnessGoal) {
    case 'lose_weight_steady':
      calorieAdjustment = -500; // ~0.5kg / 1lb per week
      break;
    case 'lose_weight_fast':
      calorieAdjustment = -750; // ~0.75kg / 1.5lb per week
      break;
    case 'maintain':
      calorieAdjustment = 0;
      break;
    case 'gain_muscle':
      calorieAdjustment = 350; // Lean surplus for hypertrophy
      break;
    case 'athletic':
      calorieAdjustment = 200; // Performance fueling
      break;
    case 'keto':
      calorieAdjustment = -400; // Fat-burning deficit
      break;
    case 'mediterranean':
      calorieAdjustment = -350; // Sustainable heart-healthy deficit
      break;
  }

  // Minimum caloric floor safety (1200 kcal for women, 1500 kcal for men)
  const minFloor = profile.gender === 'female' ? 1200 : 1500;
  let targetCalories = Math.max(minFloor, tdee + calorieAdjustment);

  // If severely underweight, gently bump calories to support healthy weight gain
  if (category === 'Underweight' && profile.fitnessGoal !== 'gain_muscle') {
    targetCalories = Math.max(targetCalories, tdee + 300);
    calorieAdjustment = targetCalories - tdee;
  }

  // Macronutrient split based on diet preference and fitness goal
  let proteinRatio = 0.28;
  let carbsRatio = 0.44;
  let fatsRatio = 0.28;

  if (profile.dietPreference === 'high_protein' || profile.fitnessGoal === 'gain_muscle') {
    proteinRatio = 0.32;
    carbsRatio = 0.43;
    fatsRatio = 0.25;
  } else if (profile.dietPreference === 'keto' || profile.fitnessGoal === 'keto') {
    proteinRatio = 0.25;
    carbsRatio = 0.05;
    fatsRatio = 0.70;
  } else if (profile.dietPreference === 'low_carb') {
    proteinRatio = 0.35;
    carbsRatio = 0.25;
    fatsRatio = 0.40;
  } else if (profile.dietPreference === 'mediterranean' || profile.fitnessGoal === 'mediterranean') {
    proteinRatio = 0.25;
    carbsRatio = 0.45;
    fatsRatio = 0.30;
  } else if (profile.dietPreference === 'vegan' || profile.dietPreference === 'vegetarian') {
    proteinRatio = 0.25;
    carbsRatio = 0.50;
    fatsRatio = 0.25;
  }

  // Gram calculations (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g)
  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
  const fatsGrams = Math.round((targetCalories * fatsRatio) / 9);
  const fiberGrams = Math.round((targetCalories / 1000) * 14); // 14g per 1000 kcal

  // Hydration recommendation: ~35ml per kg of bodyweight, adjusted for activity
  const activityWaterBonus = profile.activityLevel === 'very_active' || profile.activityLevel === 'extra_active' ? 750 : 350;
  const waterMl = Math.round(profile.weightKg * 35 + activityWaterBonus);

  // Health analysis string
  let healthAnalysis = '';
  if (category === 'Normal weight') {
    healthAnalysis = `Your BMI of ${bmi} is in the healthy standard range (18.5–24.9). Focus on muscle tone, cardiovascular wellness, and nutrient density.`;
  } else if (category === 'Overweight') {
    const diff = Math.round((profile.weightKg - idealWeightRange.maxKg) * 10) / 10;
    healthAnalysis = `Your BMI of ${bmi} indicates moderate weight above reference (~${diff} kg above baseline). A steady, sustainable caloric deficit combined with strength training will support lean mass and fat loss. If you have chronic conditions, please consult your doctor.`;
  } else if (category.includes('Obesity')) {
    const diff = Math.round((profile.weightKg - idealWeightRange.maxKg) * 10) / 10;
    healthAnalysis = `Your BMI of ${bmi} falls in ${category}. Evidence-based lifestyle studies indicate that reducing 5–10% of body weight supports cardiovascular and metabolic wellness. Please visit a doctor before starting any aggressive diet or if you experience health issues.`;
  } else {
    const diff = Math.round((idealWeightRange.minKg - profile.weightKg) * 10) / 10;
    healthAnalysis = `Your BMI of ${bmi} is below the 18.5 reference line. Increasing your caloric budget with dense whole foods will support vitality. If you feel weak or fatigued, please consult a physician.`;
  }

  const dietRecommendation = `To meet your ${profile.fitnessGoal.replace(/_/g, ' ')} goal, aim for ${targetCalories} kcal daily with ${proteinGrams}g protein to maintain muscular repair, ${carbsGrams}g clean carbs for sustained energy, and ${fatsGrams}g healthy fats for hormonal vitality. (Educational guidance only; visit a doctor for medical advice).`;

  return {
    bmi,
    category,
    categoryColor,
    idealWeightRange,
    bmr,
    tdee,
    targetCalories,
    calorieDeficitOrSurplus: calorieAdjustment,
    macros: {
      proteinGrams,
      carbsGrams,
      fatsGrams,
      fiberGrams,
      waterMl,
      proteinPercent: Math.round(proteinRatio * 100),
      carbsPercent: Math.round(carbsRatio * 100),
      fatsPercent: Math.round(fatsRatio * 100),
    },
    healthAnalysis,
    dietRecommendation,
  };
}

export const calculateBmiAndMetabolism = calculateFullNutrition;
