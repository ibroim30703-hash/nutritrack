import { MicronutrientProfile, PlanMealSlot, UserProfile } from '../types/nutrition';

export interface IngredientNutrientRef {
  name: string;
  category: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatsPer100g: number;
  fiberPer100g: number;
  microsPer100g: MicronutrientProfile;
}

// Clinically grounded micronutrient & macronutrient reference library (per 100g edible portion)
export const INGREDIENT_NUTRITION_DB: Record<string, IngredientNutrientRef> = {
  chicken: {
    name: 'Chicken Breast (Skinless)',
    category: 'Poultry',
    caloriesPer100g: 165,
    proteinPer100g: 31,
    carbsPer100g: 0,
    fatsPer100g: 3.6,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 6,
      vitaminC_mg: 0,
      vitaminD_mcg: 0.1,
      vitaminE_mg: 0.3,
      vitaminK_mcg: 0.3,
      vitaminB6_mg: 0.6,
      vitaminB12_mcg: 0.34,
      folate_mcg: 4,
      calcium_mg: 15,
      iron_mg: 1.0,
      magnesium_mg: 29,
      potassium_mg: 256,
      zinc_mg: 1.0,
    },
  },
  salmon: {
    name: 'Wild Atlantic Salmon',
    category: 'Fish & Seafood',
    caloriesPer100g: 208,
    proteinPer100g: 22,
    carbsPer100g: 0,
    fatsPer100g: 13,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 40,
      vitaminC_mg: 0,
      vitaminD_mcg: 11.5,
      vitaminE_mg: 2.8,
      vitaminK_mcg: 0.1,
      vitaminB6_mg: 0.8,
      vitaminB12_mcg: 3.2,
      folate_mcg: 29,
      calcium_mg: 12,
      iron_mg: 0.8,
      magnesium_mg: 29,
      potassium_mg: 384,
      zinc_mg: 0.6,
    },
  },
  egg: {
    name: 'Whole Large Egg',
    category: 'Eggs & Dairy',
    caloriesPer100g: 143,
    proteinPer100g: 12.6,
    carbsPer100g: 0.8,
    fatsPer100g: 9.5,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 160,
      vitaminC_mg: 0,
      vitaminD_mcg: 2.0,
      vitaminE_mg: 1.05,
      vitaminK_mcg: 0.3,
      vitaminB6_mg: 0.17,
      vitaminB12_mcg: 0.89,
      folate_mcg: 47,
      calcium_mg: 56,
      iron_mg: 1.75,
      magnesium_mg: 12,
      potassium_mg: 138,
      zinc_mg: 1.29,
    },
  },
  beef: {
    name: 'Lean Grass-Fed Beef',
    category: 'Meat',
    caloriesPer100g: 215,
    proteinPer100g: 26,
    carbsPer100g: 0,
    fatsPer100g: 12,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 0,
      vitaminC_mg: 0,
      vitaminD_mcg: 0.1,
      vitaminE_mg: 0.4,
      vitaminK_mcg: 1.6,
      vitaminB6_mg: 0.4,
      vitaminB12_mcg: 2.6,
      folate_mcg: 8,
      calcium_mg: 18,
      iron_mg: 2.8,
      magnesium_mg: 21,
      potassium_mg: 318,
      zinc_mg: 5.3,
    },
  },
  tofu: {
    name: 'Firm Organic Tofu',
    category: 'Plant Protein',
    caloriesPer100g: 83,
    proteinPer100g: 10,
    carbsPer100g: 2.3,
    fatsPer100g: 5.3,
    fiberPer100g: 1.2,
    microsPer100g: {
      vitaminA_mcg: 26,
      vitaminC_mg: 0.2,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.1,
      vitaminK_mcg: 2.4,
      vitaminB6_mg: 0.07,
      vitaminB12_mcg: 0,
      folate_mcg: 19,
      calcium_mg: 350,
      iron_mg: 5.4,
      magnesium_mg: 58,
      potassium_mg: 121,
      zinc_mg: 1.6,
    },
  },
  yogurt: {
    name: 'Greek Yogurt (Plain 0-2%)',
    category: 'Dairy',
    caloriesPer100g: 73,
    proteinPer100g: 10,
    carbsPer100g: 3.6,
    fatsPer100g: 2.0,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 22,
      vitaminC_mg: 0,
      vitaminD_mcg: 0.1,
      vitaminE_mg: 0.05,
      vitaminK_mcg: 0.2,
      vitaminB6_mg: 0.06,
      vitaminB12_mcg: 0.75,
      folate_mcg: 12,
      calcium_mg: 110,
      iron_mg: 0.1,
      magnesium_mg: 11,
      potassium_mg: 141,
      zinc_mg: 0.5,
    },
  },
  spinach: {
    name: 'Fresh Baby Spinach',
    category: 'Leafy Greens',
    caloriesPer100g: 23,
    proteinPer100g: 2.9,
    carbsPer100g: 3.6,
    fatsPer100g: 0.4,
    fiberPer100g: 2.2,
    microsPer100g: {
      vitaminA_mcg: 469,
      vitaminC_mg: 28,
      vitaminD_mcg: 0,
      vitaminE_mg: 2.0,
      vitaminK_mcg: 483,
      vitaminB6_mg: 0.2,
      vitaminB12_mcg: 0,
      folate_mcg: 194,
      calcium_mg: 99,
      iron_mg: 2.7,
      magnesium_mg: 79,
      potassium_mg: 558,
      zinc_mg: 0.5,
    },
  },
  broccoli: {
    name: 'Fresh Steamed Broccoli',
    category: 'Cruciferous Produce',
    caloriesPer100g: 34,
    proteinPer100g: 2.8,
    carbsPer100g: 6.6,
    fatsPer100g: 0.4,
    fiberPer100g: 2.6,
    microsPer100g: {
      vitaminA_mcg: 31,
      vitaminC_mg: 89,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.8,
      vitaminK_mcg: 102,
      vitaminB6_mg: 0.18,
      vitaminB12_mcg: 0,
      folate_mcg: 63,
      calcium_mg: 47,
      iron_mg: 0.7,
      magnesium_mg: 21,
      potassium_mg: 316,
      zinc_mg: 0.4,
    },
  },
  bellpepper: {
    name: 'Red Bell Pepper',
    category: 'Produce',
    caloriesPer100g: 31,
    proteinPer100g: 1.0,
    carbsPer100g: 6.0,
    fatsPer100g: 0.3,
    fiberPer100g: 2.1,
    microsPer100g: {
      vitaminA_mcg: 157,
      vitaminC_mg: 128,
      vitaminD_mcg: 0,
      vitaminE_mg: 1.6,
      vitaminK_mcg: 4.9,
      vitaminB6_mg: 0.29,
      vitaminB12_mcg: 0,
      folate_mcg: 46,
      calcium_mg: 7,
      iron_mg: 0.4,
      magnesium_mg: 12,
      potassium_mg: 211,
      zinc_mg: 0.25,
    },
  },
  avocado: {
    name: 'Hass Avocado',
    category: 'Healthy Fats',
    caloriesPer100g: 160,
    proteinPer100g: 2.0,
    carbsPer100g: 8.5,
    fatsPer100g: 14.7,
    fiberPer100g: 6.7,
    microsPer100g: {
      vitaminA_mcg: 7,
      vitaminC_mg: 10,
      vitaminD_mcg: 0,
      vitaminE_mg: 2.1,
      vitaminK_mcg: 21,
      vitaminB6_mg: 0.26,
      vitaminB12_mcg: 0,
      folate_mcg: 81,
      calcium_mg: 12,
      iron_mg: 0.55,
      magnesium_mg: 29,
      potassium_mg: 485,
      zinc_mg: 0.64,
    },
  },
  oliveoil: {
    name: 'Extra Virgin Olive Oil',
    category: 'Oils & Fats',
    caloriesPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatsPer100g: 100,
    fiberPer100g: 0,
    microsPer100g: {
      vitaminA_mcg: 0,
      vitaminC_mg: 0,
      vitaminD_mcg: 0,
      vitaminE_mg: 14.3,
      vitaminK_mcg: 60.2,
      vitaminB6_mg: 0,
      vitaminB12_mcg: 0,
      folate_mcg: 0,
      calcium_mg: 1,
      iron_mg: 0.56,
      magnesium_mg: 0,
      potassium_mg: 1,
      zinc_mg: 0,
    },
  },
  oats: {
    name: 'Whole Rolled Oats',
    category: 'Whole Grains',
    caloriesPer100g: 389,
    proteinPer100g: 16.9,
    carbsPer100g: 66.3,
    fatsPer100g: 6.9,
    fiberPer100g: 10.6,
    microsPer100g: {
      vitaminA_mcg: 0,
      vitaminC_mg: 0,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.5,
      vitaminK_mcg: 2.0,
      vitaminB6_mg: 0.12,
      vitaminB12_mcg: 0,
      folate_mcg: 56,
      calcium_mg: 54,
      iron_mg: 4.7,
      magnesium_mg: 177,
      potassium_mg: 429,
      zinc_mg: 3.97,
    },
  },
  quinoa: {
    name: 'Tri-Color Quinoa (Cooked)',
    category: 'Whole Grains',
    caloriesPer100g: 120,
    proteinPer100g: 4.4,
    carbsPer100g: 21.3,
    fatsPer100g: 1.9,
    fiberPer100g: 2.8,
    microsPer100g: {
      vitaminA_mcg: 0,
      vitaminC_mg: 0,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.6,
      vitaminK_mcg: 1.1,
      vitaminB6_mg: 0.12,
      vitaminB12_mcg: 0,
      folate_mcg: 42,
      calcium_mg: 17,
      iron_mg: 1.5,
      magnesium_mg: 64,
      potassium_mg: 172,
      zinc_mg: 1.1,
    },
  },
  rice: {
    name: 'Brown Jasmine Rice (Cooked)',
    category: 'Grains',
    caloriesPer100g: 111,
    proteinPer100g: 2.6,
    carbsPer100g: 23,
    fatsPer100g: 0.9,
    fiberPer100g: 1.8,
    microsPer100g: {
      vitaminA_mcg: 0,
      vitaminC_mg: 0,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.2,
      vitaminK_mcg: 0.6,
      vitaminB6_mg: 0.15,
      vitaminB12_mcg: 0,
      folate_mcg: 9,
      calcium_mg: 10,
      iron_mg: 0.5,
      magnesium_mg: 43,
      potassium_mg: 83,
      zinc_mg: 0.6,
    },
  },
  almonds: {
    name: 'Raw Whole Almonds',
    category: 'Nuts & Seeds',
    caloriesPer100g: 579,
    proteinPer100g: 21.2,
    carbsPer100g: 21.6,
    fatsPer100g: 49.9,
    fiberPer100g: 12.5,
    microsPer100g: {
      vitaminA_mcg: 1,
      vitaminC_mg: 0,
      vitaminD_mcg: 0,
      vitaminE_mg: 25.6,
      vitaminK_mcg: 0,
      vitaminB6_mg: 0.14,
      vitaminB12_mcg: 0,
      folate_mcg: 44,
      calcium_mg: 269,
      iron_mg: 3.7,
      magnesium_mg: 270,
      potassium_mg: 733,
      zinc_mg: 3.12,
    },
  },
  blueberries: {
    name: 'Wild Blueberries',
    category: 'Fruits & Berries',
    caloriesPer100g: 57,
    proteinPer100g: 0.7,
    carbsPer100g: 14.5,
    fatsPer100g: 0.3,
    fiberPer100g: 2.4,
    microsPer100g: {
      vitaminA_mcg: 3,
      vitaminC_mg: 9.7,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.57,
      vitaminK_mcg: 19.3,
      vitaminB6_mg: 0.05,
      vitaminB12_mcg: 0,
      folate_mcg: 6,
      calcium_mg: 6,
      iron_mg: 0.28,
      magnesium_mg: 6,
      potassium_mg: 77,
      zinc_mg: 0.16,
    },
  },
  sweetpotato: {
    name: 'Roasted Sweet Potato',
    category: 'Root Vegetables',
    caloriesPer100g: 86,
    proteinPer100g: 1.6,
    carbsPer100g: 20.1,
    fatsPer100g: 0.1,
    fiberPer100g: 3.0,
    microsPer100g: {
      vitaminA_mcg: 709,
      vitaminC_mg: 2.4,
      vitaminD_mcg: 0,
      vitaminE_mg: 0.26,
      vitaminK_mcg: 1.8,
      vitaminB6_mg: 0.21,
      vitaminB12_mcg: 0,
      folate_mcg: 11,
      calcium_mg: 30,
      iron_mg: 0.6,
      magnesium_mg: 25,
      potassium_mg: 337,
      zinc_mg: 0.3,
    },
  },
};

// Recommended Daily Allowance (RDA) reference values (adult standard)
export const RDA_MICRONUTRIENTS: Record<
  keyof MicronutrientProfile,
  { name: string; rda: number; unit: string; category: 'vitamin' | 'mineral'; benefit: string }
> = {
  vitaminA_mcg: {
    name: 'Vitamin A',
    rda: 900,
    unit: 'mcg',
    category: 'vitamin',
    benefit: 'Vision, cellular regeneration & immune mucous membranes',
  },
  vitaminC_mg: {
    name: 'Vitamin C',
    rda: 90,
    unit: 'mg',
    category: 'vitamin',
    benefit: 'Collagen synthesis, immune activation & powerful antioxidant',
  },
  vitaminD_mcg: {
    name: 'Vitamin D',
    rda: 20,
    unit: 'mcg',
    category: 'vitamin',
    benefit: 'Bone density, neuromuscular integrity & immune regulation',
  },
  vitaminE_mg: {
    name: 'Vitamin E',
    rda: 15,
    unit: 'mg',
    category: 'vitamin',
    benefit: 'Lipid cell membrane protection & cardiovascular defense',
  },
  vitaminK_mcg: {
    name: 'Vitamin K',
    rda: 120,
    unit: 'mcg',
    category: 'vitamin',
    benefit: 'Blood coagulation factors & vascular bone mineralization',
  },
  vitaminB6_mg: {
    name: 'Vitamin B6',
    rda: 1.7,
    unit: 'mg',
    category: 'vitamin',
    benefit: 'Amino acid metabolism, neurotransmitter & hemoglobin synthesis',
  },
  vitaminB12_mcg: {
    name: 'Vitamin B12',
    rda: 2.4,
    unit: 'mcg',
    category: 'vitamin',
    benefit: 'DNA synthesis, red blood cell generation & myelin nerve sheath',
  },
  folate_mcg: {
    name: 'Folate (B9)',
    rda: 400,
    unit: 'mcg',
    category: 'vitamin',
    benefit: 'Cellular replication, methylation & tissue growth',
  },
  calcium_mg: {
    name: 'Calcium',
    rda: 1000,
    unit: 'mg',
    category: 'mineral',
    benefit: 'Skeletal strength, cardiac rhythm & muscular contraction',
  },
  iron_mg: {
    name: 'Iron',
    rda: 18,
    unit: 'mg',
    category: 'mineral',
    benefit: 'Hemoglobin oxygen transport & mitochondrial cellular respiration',
  },
  magnesium_mg: {
    name: 'Magnesium',
    rda: 420,
    unit: 'mg',
    category: 'mineral',
    benefit: '300+ enzymatic reactions, ATP energy production & deep sleep',
  },
  potassium_mg: {
    name: 'Potassium',
    rda: 3400,
    unit: 'mg',
    category: 'mineral',
    benefit: 'Electrolyte osmotic balance & healthy vascular blood pressure',
  },
  zinc_mg: {
    name: 'Zinc',
    rda: 11,
    unit: 'mg',
    category: 'mineral',
    benefit: 'Immune cell proliferation, protein synthesis & wound healing',
  },
};

// Helper: parse string amount like "150g", "1 tbsp", "2 cups", "2 eggs" into estimated grams
export function parseGramsFromAmountString(amountStr: string): number {
  if (!amountStr) return 100;

  const str = amountStr.toLowerCase().trim();
  const numMatch = str.match(/(\d+(\.\d+)?)/);
  const num = numMatch ? parseFloat(numMatch[1]) : 1;

  if (str.includes('kg')) return num * 1000;
  if (str.includes('g') && !str.includes('egg')) return num;
  if (str.includes('ml')) return num; // ~1ml water density
  if (str.includes('oz')) return num * 28.35;
  if (str.includes('tbsp') || str.includes('tablespoon')) return num * 15;
  if (str.includes('tsp') || str.includes('teaspoon')) return num * 5;
  if (str.includes('cup')) return num * 150;
  if (str.includes('slice')) return num * 35;
  if (str.includes('egg') || str.includes('piece') || str.includes('fillet')) return num * 60;
  if (str.includes('handful')) return 30;

  return num > 10 ? num : num * 100;
}

// Find closest matching nutrient reference from name
export function matchIngredientRef(name: string): IngredientNutrientRef {
  const clean = name.toLowerCase();

  for (const [key, ref] of Object.entries(INGREDIENT_NUTRITION_DB)) {
    if (clean.includes(key)) {
      return ref;
    }
  }

  // Keyword inferences if not exact key
  if (clean.includes('turkey') || clean.includes('poultry') || clean.includes('breast')) return INGREDIENT_NUTRITION_DB.chicken;
  if (clean.includes('tuna') || clean.includes('trout') || clean.includes('cod') || clean.includes('shrimp')) return INGREDIENT_NUTRITION_DB.salmon;
  if (clean.includes('steak') || clean.includes('lamb') || clean.includes('pork')) return INGREDIENT_NUTRITION_DB.beef;
  if (clean.includes('cheese') || clean.includes('feta') || clean.includes('milk')) return INGREDIENT_NUTRITION_DB.yogurt;
  if (clean.includes('kale') || clean.includes('salad') || clean.includes('lettuce') || clean.includes('greens')) return INGREDIENT_NUTRITION_DB.spinach;
  if (clean.includes('cauliflower') || clean.includes('cabbage') || clean.includes('asparagus')) return INGREDIENT_NUTRITION_DB.broccoli;
  if (clean.includes('pepper') || clean.includes('tomato') || clean.includes('cucumber')) return INGREDIENT_NUTRITION_DB.bellpepper;
  if (clean.includes('oil') || clean.includes('butter') || clean.includes('ghee')) return INGREDIENT_NUTRITION_DB.oliveoil;
  if (clean.includes('walnut') || clean.includes('seed') || clean.includes('peanut') || clean.includes('cashew')) return INGREDIENT_NUTRITION_DB.almonds;
  if (clean.includes('berry') || clean.includes('apple') || clean.includes('fruit') || clean.includes('orange')) return INGREDIENT_NUTRITION_DB.blueberries;
  if (clean.includes('potato') || clean.includes('yam') || clean.includes('carrot') || clean.includes('squash')) return INGREDIENT_NUTRITION_DB.sweetpotato;
  if (clean.includes('quinoa') || clean.includes('grain') || clean.includes('couscous')) return INGREDIENT_NUTRITION_DB.quinoa;
  if (clean.includes('bread') || clean.includes('pasta') || clean.includes('noodle')) return INGREDIENT_NUTRITION_DB.rice;
  if (clean.includes('bean') || clean.includes('lentil') || clean.includes('chickpea')) return INGREDIENT_NUTRITION_DB.tofu;

  // Generic balanced whole food baseline (per 100g)
  return {
    name: name,
    category: 'Whole Food',
    caloriesPer100g: 110,
    proteinPer100g: 6,
    carbsPer100g: 14,
    fatsPer100g: 3,
    fiberPer100g: 2.5,
    microsPer100g: {
      vitaminA_mcg: 25,
      vitaminC_mg: 15,
      vitaminD_mcg: 0.2,
      vitaminE_mg: 0.8,
      vitaminK_mcg: 10,
      vitaminB6_mg: 0.2,
      vitaminB12_mcg: 0.3,
      folate_mcg: 25,
      calcium_mg: 35,
      iron_mg: 1.2,
      magnesium_mg: 28,
      potassium_mg: 220,
      zinc_mg: 0.8,
    },
  };
}

// Calculate total calories, macros & full micronutrient profile for a recipe
export function calculateRecipeNutrition(ingredients: { name: string; amount: string }[]): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  micronutrients: MicronutrientProfile;
} {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFats = 0;
  let totalFiber = 0;

  const totalMicros: MicronutrientProfile = {
    vitaminA_mcg: 0,
    vitaminC_mg: 0,
    vitaminD_mcg: 0,
    vitaminE_mg: 0,
    vitaminK_mcg: 0,
    vitaminB6_mg: 0,
    vitaminB12_mcg: 0,
    folate_mcg: 0,
    calcium_mg: 0,
    iron_mg: 0,
    magnesium_mg: 0,
    potassium_mg: 0,
    zinc_mg: 0,
  };

  ingredients.forEach((ing) => {
    if (!ing.name.trim()) return;
    const grams = parseGramsFromAmountString(ing.amount);
    const ref = matchIngredientRef(ing.name);
    const factor = grams / 100;

    totalCalories += ref.caloriesPer100g * factor;
    totalProtein += ref.proteinPer100g * factor;
    totalCarbs += ref.carbsPer100g * factor;
    totalFats += ref.fatsPer100g * factor;
    totalFiber += ref.fiberPer100g * factor;

    // Accumulate micronutrients
    (Object.keys(totalMicros) as (keyof MicronutrientProfile)[]).forEach((key) => {
      totalMicros[key] += (ref.microsPer100g[key] || 0) * factor;
    });
  });

  return {
    calories: Math.max(50, Math.round(totalCalories)),
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fats: Math.round(totalFats * 10) / 10,
    fiber: Math.round(totalFiber * 10) / 10,
    micronutrients: {
      vitaminA_mcg: Math.round(totalMicros.vitaminA_mcg),
      vitaminC_mg: Math.round(totalMicros.vitaminC_mg * 10) / 10,
      vitaminD_mcg: Math.round(totalMicros.vitaminD_mcg * 10) / 10,
      vitaminE_mg: Math.round(totalMicros.vitaminE_mg * 10) / 10,
      vitaminK_mcg: Math.round(totalMicros.vitaminK_mcg),
      vitaminB6_mg: Math.round(totalMicros.vitaminB6_mg * 10) / 10,
      vitaminB12_mcg: Math.round(totalMicros.vitaminB12_mcg * 10) / 10,
      folate_mcg: Math.round(totalMicros.folate_mcg),
      calcium_mg: Math.round(totalMicros.calcium_mg),
      iron_mg: Math.round(totalMicros.iron_mg * 10) / 10,
      magnesium_mg: Math.round(totalMicros.magnesium_mg),
      potassium_mg: Math.round(totalMicros.potassium_mg),
      zinc_mg: Math.round(totalMicros.zinc_mg * 10) / 10,
    },
  };
}

// Portion Optimizer: Scales meal ingredients and macros so calories match target precisely
export function optimizeMealPortion(meal: PlanMealSlot, targetCalories: number): PlanMealSlot {
  const currentCals = meal.calories || 1;
  const ratio = Math.max(0.4, Math.min(2.5, targetCalories / currentCals));

  // Scale ingredients text
  const scaledIngredients = (meal.ingredients || []).map((ingStr) => {
    // Look for numbers like "150g", "2 tbsp", "1 cup"
    return ingStr.replace(/(\d+(\.\d+)?)\s*([a-zA-Z]+)?/g, (match, num, _p2, unit) => {
      const orig = parseFloat(num);
      const scaled = Math.round(orig * ratio * 10) / 10;
      return `${scaled}${unit ? (unit.startsWith('g') || unit.startsWith('ml') ? unit : ` ${unit}`) : ''}`;
    });
  });

  // Scale micronutrients if present
  let scaledMicros: Partial<MicronutrientProfile> | undefined = undefined;
  if (meal.micronutrients) {
    scaledMicros = {};
    (Object.keys(meal.micronutrients) as (keyof MicronutrientProfile)[]).forEach((key) => {
      scaledMicros![key] = Math.round(((meal.micronutrients![key] || 0) * ratio) * 10) / 10;
    });
  }

  return {
    ...meal,
    calories: Math.round(targetCalories),
    protein: Math.round(meal.protein * ratio * 10) / 10,
    carbs: Math.round(meal.carbs * ratio * 10) / 10,
    fats: Math.round(meal.fats * ratio * 10) / 10,
    fiber: Math.round(meal.fiber * ratio * 10) / 10,
    ingredients: scaledIngredients,
    portionScale: Math.round(ratio * 100) / 100,
    baseCalories: meal.baseCalories || meal.calories,
    micronutrients: scaledMicros,
    chefTip: meal.chefTip
      ? `${meal.chefTip} (Portion optimized to ${Math.round(ratio * 100)}% to match your daily course budget)`
      : `Portion optimized to ${Math.round(ratio * 100)}% to match your daily course budget.`,
  };
}

// Daily Micronutrient & Vitamin Intake Aggregator
export interface VitaminIntakeReportItem {
  id: keyof MicronutrientProfile;
  name: string;
  category: 'vitamin' | 'mineral';
  dailyTotal: number;
  rda: number;
  unit: string;
  percentRda: number;
  status: 'optimal' | 'adequate' | 'needs_boost';
  benefit: string;
  topSources: string[];
}

export function calculateDailyVitaminIntake(
  meals: PlanMealSlot[],
  profile: UserProfile
): {
  items: VitaminIntakeReportItem[];
  overallScore: number;
  optimalCount: number;
} {
  const totals: Record<keyof MicronutrientProfile, { value: number; sources: { name: string; amount: number }[] }> = {
    vitaminA_mcg: { value: 0, sources: [] },
    vitaminC_mg: { value: 0, sources: [] },
    vitaminD_mcg: { value: 0, sources: [] },
    vitaminE_mg: { value: 0, sources: [] },
    vitaminK_mcg: { value: 0, sources: [] },
    vitaminB6_mg: { value: 0, sources: [] },
    vitaminB12_mcg: { value: 0, sources: [] },
    folate_mcg: { value: 0, sources: [] },
    calcium_mg: { value: 0, sources: [] },
    iron_mg: { value: 0, sources: [] },
    magnesium_mg: { value: 0, sources: [] },
    potassium_mg: { value: 0, sources: [] },
    zinc_mg: { value: 0, sources: [] },
  };

  meals.forEach((meal) => {
    // If meal already has micronutrients stored, use them
    let micros: MicronutrientProfile;
    if (meal.micronutrients && Object.keys(meal.micronutrients).length >= 5) {
      micros = meal.micronutrients as MicronutrientProfile;
    } else {
      // Otherwise estimate from its ingredients
      const ingObjects = (meal.ingredients || []).map((ing) => ({ name: ing, amount: '100g' }));
      const calc = calculateRecipeNutrition(ingObjects);
      micros = calc.micronutrients;
    }

    (Object.keys(totals) as (keyof MicronutrientProfile)[]).forEach((key) => {
      const amt = micros[key] || 0;
      if (amt > 0) {
        totals[key].value += amt;
        totals[key].sources.push({ name: meal.title, amount: amt });
      }
    });
  });

  const items: VitaminIntakeReportItem[] = (
    Object.keys(RDA_MICRONUTRIENTS) as (keyof MicronutrientProfile)[]
  ).map((key) => {
    const meta = RDA_MICRONUTRIENTS[key];
    const total = totals[key].value;
    const percentRda = Math.round((total / meta.rda) * 100);

    let status: 'optimal' | 'adequate' | 'needs_boost' = 'needs_boost';
    if (percentRda >= 90) status = 'optimal';
    else if (percentRda >= 65) status = 'adequate';

    // Sort top 2 contributing dishes
    const topDishes = totals[key].sources
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 2)
      .map((s) => s.name);

    return {
      id: key,
      name: meta.name,
      category: meta.category,
      dailyTotal: Math.round(total * 10) / 10,
      rda: meta.rda,
      unit: meta.unit,
      percentRda,
      status,
      benefit: meta.benefit,
      topSources: topDishes.length > 0 ? topDishes : ['Whole Foods & Course Ingredients'],
    };
  });

  const optimalCount = items.filter((i) => i.status === 'optimal' || i.status === 'adequate').length;
  const overallScore = Math.min(
    100,
    Math.round(items.reduce((sum, item) => sum + Math.min(100, item.percentRda), 0) / items.length)
  );

  return { items, overallScore, optimalCount };
}
