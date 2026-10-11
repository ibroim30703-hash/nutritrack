import {
  UserProfile,
  BmiResult,
  DietPlan,
  PlanMealSlot,
  CuisineCountry,
  AppLanguage,
} from '../types/nutrition';
import { localizeDietPlan } from './dietPlanLocalization';

export interface CuisineMetadata {
  id: CuisineCountry;
  name: string;
  flag: string;
  region: string;
  description: string;
  signatureFlavors: string[];
}

export const CUISINES_LIST: CuisineMetadata[] = [
  {
    id: 'mediterranean',
    name: 'Mediterranean & Greek',
    flag: '🇬🇷',
    region: 'Southern Europe',
    description: 'Extra virgin olive oil, wild oregano, fresh lemons, feta, and lean seafood.',
    signatureFlavors: ['EVOO', 'Kalamata Olives', 'Feta', 'Greek Oregano', 'Lemon Zest'],
  },
  {
    id: 'italian',
    name: 'Italian Cucina Rustica',
    flag: '🇮🇹',
    region: 'Southern Europe',
    description: 'San Marzano tomatoes, sweet basil, aged balsamic, garlic, parmesan, and legumes.',
    signatureFlavors: ['San Marzano Tomatoes', 'Sweet Basil', 'Aged Balsamic', 'Parmigiano-Reggiano', 'Rosemary'],
  },
  {
    id: 'japanese',
    name: 'Japanese Washoku',
    flag: '🇯🇵',
    region: 'East Asia',
    description: 'Miso, umami dashi, nori, steamed edamame, wild salmon, and clean brown rice.',
    signatureFlavors: ['Aka Miso', 'Shiitake Dashi', 'Toasted Sesame', 'Pickled Ginger', 'Matcha'],
  },
  {
    id: 'mexican',
    name: 'Mexican Sabores Frescos',
    flag: '🇲🇽',
    region: 'North America',
    description: 'Charred chili, fresh lime, cilantro, black beans, fajita seasoning, and avocado.',
    signatureFlavors: ['Fresh Lime', 'Cilantro', 'Poblano Chilis', 'Cumin & Oregano', 'Salsa Fresca'],
  },
  {
    id: 'indian',
    name: 'Indian Ayurvedic & Spices',
    flag: '🇮🇳',
    region: 'South Asia',
    description: 'Turmeric, ginger, roasted cumin, tandoori marinades, lentils, and fragrant herbs.',
    signatureFlavors: ['Golden Turmeric', 'Garam Masala', 'Fresh Ginger', 'Curry Leaves', 'Toasted Mustard Seed'],
  },
  {
    id: 'middle_eastern',
    name: 'Middle Eastern & Levantine',
    flag: '🇱🇧',
    region: 'Middle East',
    description: 'Creamy tahini, za’atar, tangy sumac, pomegranate molasses, fresh mint, and hummus.',
    signatureFlavors: ['Za\'atar Herbs', 'Sumac', 'Raw Tahini', 'Pomegranate', 'Fresh Mint'],
  },
  {
    id: 'french',
    name: 'French Clean Bistro',
    flag: '🇫🇷',
    region: 'Western Europe',
    description: 'Herbes de Provence, Dijon mustard, tarragon, steamed garden greens, and poached proteins.',
    signatureFlavors: ['Dijon Vinaigrette', 'Herbes de Provence', 'French Tarragon', 'Shallots', 'White Wine Reduction'],
  },
  {
    id: 'thai',
    name: 'Thai & Southeast Asian',
    flag: '🇹🇭',
    region: 'Southeast Asia',
    description: 'Aromatic lemongrass, kaffir lime, chili, coconut-lime broth, and Thai holy basil.',
    signatureFlavors: ['Lemongrass', 'Kaffir Lime Leaf', 'Thai Basil', 'Galangal Ginger', 'Bird\'s Eye Chili'],
  },
  {
    id: 'spanish',
    name: 'Spanish Tapas & Mediterráneo',
    flag: '🇪🇸',
    region: 'Southwestern Europe',
    description: 'Saffron, sweet smoked pimentón, garlic, piquillo peppers, fresh seafood, and gazpacho greens.',
    signatureFlavors: ['Smoked Pimentón', 'Saffron', 'Garlic & Parsley', 'Piquillo Peppers', 'EVOO'],
  },
  {
    id: 'american',
    name: 'American Modern Grill',
    flag: '🇺🇸',
    region: 'North America',
    description: 'Smoky hickory rub, roasted sweet potatoes, charred sweet corn, avocado, and greens.',
    signatureFlavors: ['Smoked Paprika Rub', 'Hickory Smoke', 'Charred Garlic', 'Cracked Pepper', 'Apple Cider Tang'],
  },
  {
    id: 'eastern_european',
    name: 'Eastern European & Slavic',
    flag: '🇺🇦',
    region: 'Eastern Europe',
    description: 'Buckwheat kasha groats, fresh dill, pickled root vegetables, fermented kefir, and lean stewed cuts.',
    signatureFlavors: ['Roasted Buckwheat Kasha', 'Fresh Garden Dill', 'Fermented Kefir', 'Caraway Seeds', 'Grated Horseradish'],
  },
  {
    id: 'nordic',
    name: 'Nordic & Scandinavian',
    flag: '🇸🇪',
    region: 'Northern Europe',
    description: 'Whole rye crisps, cold-water cured salmon, tart lingonberries, dill, and Icelandic Skyr.',
    signatureFlavors: ['Wild Lingonberries', 'Fresh Dill & Mustard', 'Icelandic Skyr', 'Cold Smoked Fish', 'Rye Sourdough'],
  },
  {
    id: 'korean',
    name: 'Korean Hansik & Superfoods',
    flag: '🇰🇷',
    region: 'East Asia',
    description: 'Fermented kimchi, toasted sesame, gochugaru, ginger, lean bulgogi proteins, and seaweed broths.',
    signatureFlavors: ['Aged Kimchi', 'Toasted Sesame Oil', 'Gochugaru Spice', 'Fresh Ginger', 'Seaweed Broth'],
  },
  {
    id: 'vietnamese',
    name: 'Vietnamese Clean Herbs & Pho',
    flag: '🇻🇳',
    region: 'Southeast Asia',
    description: 'Fresh mint, Thai basil, star anise pho broth, crisp bean sprouts, lime, and lean grilled meats.',
    signatureFlavors: ['Star Anise Broth', 'Fresh Mint & Basil', 'Lime Juice', 'Lemongrass', 'Crisp Bean Sprouts'],
  },
];

export const FOOD_PREFERENCE_CATEGORIES = [
  { id: 'meat_poultry', label: 'Poultry & Fowl', icon: '🍗', desc: 'Chicken breast, turkey cutlets, lean ground turkey' },
  { id: 'meat_red', label: 'Lean Red Meat', icon: '🥩', desc: 'Grass-fed beef steak, lean sirloin, lamb loin, flank steak' },
  { id: 'fish_seafood', label: 'Fish & Wild Seafood', icon: '🐟', desc: 'Wild salmon, tuna steak, sea bass, cod, halibut, tiger shrimp' },
  { id: 'dairy_products', label: 'Cultured Dairy Products', icon: '🥛', desc: 'Greek yogurt 0%, cottage cheese, Skyr, kefir, feta, ricotta' },
  { id: 'vegan_plant', label: 'Something Vegan (Plant Proteins)', icon: '🌱', desc: 'Firm tofu, tempeh, green lentils, chickpeas, edamame' },
  { id: 'vegetarian', label: 'Vegetarian Friendly', icon: '🥗', desc: 'Lacto-ovo plant-forward balanced recipes' },
  { id: 'eggs', label: 'Pasture-Raised Eggs', icon: '🥚', desc: 'Whole pasture eggs, soft scrambles, egg white omelets' },
  { id: 'nuts_seeds', label: 'Healthy Fats & Nuts', icon: '🥑', desc: 'Hass avocado, extra virgin olive oil, almonds, walnuts, chia' },
  { id: 'gluten_free', label: 'Gluten-Free Whole Grains', icon: '🌾', desc: 'Quinoa, brown jasmine rice, buckwheat groats, rolled oats' },
];

/**
 * Generates an individualized diet plan with exact meals, caloric allocation,
 * macronutrient splits, clinical guidelines, and categorized grocery lists
 * tailored to the user's calculated BMI, chosen international cuisine,
 * and food preferences (meat, fish, dairy, vegan, vegetarian, etc.).
 */
export function generateDietPlan(
  profile: UserProfile,
  bmiResult: BmiResult,
  language?: AppLanguage
): DietPlan {
  const targetCalories = bmiResult.targetCalories;
  const isLoss = profile.fitnessGoal.includes('lose');
  const isGain = profile.fitnessGoal === 'gain_muscle';
  const isKeto = profile.fitnessGoal === 'keto' || profile.dietPreference === 'keto';
  const isVegan = profile.dietPreference === 'vegan' || Boolean(profile.foodPreferences?.includes('vegan_plant'));
  const isVegetarian = isVegan || profile.dietPreference === 'vegetarian' || Boolean(profile.foodPreferences?.includes('vegetarian'));

  const selectedCuisine: CuisineCountry = profile.selectedCuisine || 'mediterranean';
  const cuisineInfo = CUISINES_LIST.find((c) => c.id === selectedCuisine) || CUISINES_LIST[0];
  const userPreferences = profile.foodPreferences || ['meat_poultry', 'fish_seafood', 'dairy_products'];
  const customNotes = profile.customFoodNotes || '';

  // Daily Food Course Caloric Allocations:
  // 1. Breakfast (Morning Course): ~22%
  // 2. Morning Snack (In-between bridge): ~8%
  // 3. Dinner (Midday heartiest main course): ~32%
  // 4. Afternoon Snack (In-between recharge): ~8%
  // 5. Supper (Evening nourishing recovery): ~25%
  // 6. Evening Snack (In-between night recovery): ~5%
  const breakfastCals = Math.round(targetCalories * 0.22);
  const morningSnackCals = Math.round(targetCalories * 0.08);
  const dinnerCals = Math.round(targetCalories * 0.32);
  const afternoonSnackCals = Math.round(targetCalories * 0.08);
  const supperCals = Math.round(targetCalories * 0.25);
  const eveningSnackCals = Math.max(50, targetCalories - (breakfastCals + morningSnackCals + dinnerCals + afternoonSnackCals + supperCals));

  const meals: PlanMealSlot[] = [];

  // 1. BREAKFAST (Morning Course ~ 08:00 AM)
  meals.push(
    createBreakfastForCuisine(
      selectedCuisine,
      breakfastCals,
      isKeto,
      isVegan,
      isVegetarian,
      userPreferences,
      customNotes
    )
  );

  // 2. MORNING SNACK (In-Between ~ 11:00 AM)
  meals.push(
    createMorningSnackForCuisine(
      selectedCuisine,
      morningSnackCals,
      isKeto,
      isVegan,
      userPreferences
    )
  );

  // 3. DINNER (Midday Main Course ~ 01:30 PM)
  meals.push(
    createMiddayDinnerForCuisine(
      selectedCuisine,
      dinnerCals,
      isKeto,
      isVegan,
      isVegetarian,
      userPreferences,
      customNotes
    )
  );

  // 4. AFTERNOON SNACK (In-Between ~ 04:30 PM)
  meals.push(
    createAfternoonSnackForCuisine(
      selectedCuisine,
      afternoonSnackCals,
      isKeto,
      isVegan,
      userPreferences
    )
  );

  // 5. SUPPER (Evening Nourishing Course ~ 07:30 PM)
  meals.push(
    createSupperForCuisine(
      selectedCuisine,
      supperCals,
      isKeto,
      isVegan,
      isVegetarian,
      userPreferences,
      customNotes
    )
  );

  // 6. EVENING SNACK (In-Between / Night Calm ~ 09:15 PM)
  meals.push(
    createEveningSnackForCuisine(
      selectedCuisine,
      eveningSnackCals,
      isKeto,
      isVegan,
      userPreferences
    )
  );

  // Generate Grocery List customized to cuisine & food preferences
  const groceryList = generateGroceryList(cuisineInfo, userPreferences, isVegan, isKeto);

  // Generate Clinical Guidelines based on BMI & chosen cuisine
  const guidelines = [
    `Cuisine Protocol: Infuse meals with ${cuisineInfo.signatureFlavors.slice(0, 3).join(', ')} for polyphenol antioxidant optimization.`,
    `Meal Timing: Consume Breakfast within 90 min of waking; pace Midday Dinner and Evening Supper with light hydration snacks in between.`,
    isLoss
      ? `Caloric Deficit Guard: Prioritize lean proteins first during Dinner and Supper to trigger CCK and PYY satiety hormones.`
      : isGain
      ? `Hypertrophy Target: Distribute at least 30g protein across Breakfast, Dinner, and Supper for optimal muscle protein synthesis.`
      : `Metabolic Maintenance: Emphasize whole-food fiber and low-glycemic carbs to stabilize blood sugar and insulin curve.`,
    `Daily Hydration: Drink 500ml water between courses; avoid sugary beverages and limit sodium to <2300mg/day.`,
  ];

  if (customNotes.trim()) {
    guidelines.push(`Personal Food Preference Applied: Customized for: "${customNotes.slice(0, 80)}"`);
  }

  const rawPlan: DietPlan = {
    id: `plan_${profile.fitnessGoal}_${selectedCuisine}_${Date.now()}`,
    title: `${cuisineInfo.flag} ${cuisineInfo.name} Daily Food Course`,
    targetCalories,
    cuisine: selectedCuisine,
    cuisineName: cuisineInfo.name,
    cuisineFlag: cuisineInfo.flag,
    foodPreferences: userPreferences,
    customFoodNotes: customNotes,
    goalSummary: `Structured daily course (Breakfast, Morning Snack, Dinner, Afternoon Snack, Supper & Evening Snack) formatted for ${profile.fitnessGoal.replace(/_/g, ' ')} and ${cuisineInfo.name} culinary traditions.`,
    macros: {
      protein: Math.round(bmiResult.macros.proteinGrams),
      carbs: Math.round(bmiResult.macros.carbsGrams),
      fats: Math.round(bmiResult.macros.fatsGrams),
      fiber: Math.round(bmiResult.macros.fiberGrams),
    },
    meals,
    guidelines,
    groceryList,
  };

  const activeLang = language || profile.settings?.language || 'en';
  return localizeDietPlan(rawPlan, activeLang);
}

// -------------------------------------------------------------
// CUISINE & PREFERENCE MEAL BUILDERS
// -------------------------------------------------------------

export function getMatchingDishImage(title: string, slot?: string): string {
  const lower = title.toLowerCase();

  // 1. Bedtime & Night Recovery Herbal Teas & Seeds (Chamomile, Sleep Elixir, Evening Calm)
  if (
    slot === 'snack_evening' ||
    lower.includes('chamomile') ||
    lower.includes('sleep elixir') ||
    lower.includes('bedtime') ||
    lower.includes('night') ||
    (lower.includes('tea') && (lower.includes('evening') || lower.includes('seed crunch')))
  ) {
    return '/src/assets/images/herbal_tea_night_snack_1791387323890.jpg';
  }

  // 2. Poached Tiger Shrimp & Bangkok Coconut Lemongrass Broth
  if (
    lower.includes('shrimp') ||
    lower.includes('prawn') ||
    lower.includes('coconut lime poached') ||
    lower.includes('tiger shrimp')
  ) {
    return '/src/assets/images/thai_poached_shrimp_1791387408173.jpg';
  }

  // 3. Japanese Bento, Miso / Teriyaki Glazed Salmon & Steamed Rice Sets
  if (
    (lower.includes('salmon') || lower.includes('bento')) &&
    (lower.includes('teriyaki') ||
      lower.includes('miso') ||
      lower.includes('doenjang') ||
      lower.includes('bok choy') ||
      lower.includes('japanese') ||
      lower.includes('washoku'))
  ) {
    return '/src/assets/images/japanese_salmon_bento_1791387313317.jpg';
  }

  // 4. Glazed Wild Salmon & Quinoa Power Bowl
  if (
    lower.includes('salmon') &&
    (lower.includes('quinoa') || lower.includes('power bowl') || lower.includes('avocado'))
  ) {
    return '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg';
  }

  // 5. Lean Beef Sirloin Steak, Flank Steak & Roasted Asparagus
  if (
    lower.includes('steak') ||
    lower.includes('sirloin') ||
    lower.includes('beef') ||
    lower.includes('flank')
  ) {
    return '/src/assets/images/grilled_sirloin_steak_1791387288438.jpg';
  }

  // 6. Pan-Seared White Fish, Sea Bass, Cod, Snapper & Pescado al Horno
  if (
    lower.includes('sea bass') ||
    lower.includes('cod') ||
    lower.includes('snapper') ||
    lower.includes('pescado') ||
    lower.includes('chả cá') ||
    lower.includes('hake') ||
    lower.includes('halibut') ||
    (lower.includes('fish') && !lower.includes('salmon'))
  ) {
    return '/src/assets/images/seared_fish_dinner_1791375522971.jpg';
  }

  // 7. Plant-Based / Vegan Harvest Bowls, Falafel Mezze & Tempeh Soba
  if (
    lower.includes('vegan') ||
    lower.includes('falafel') ||
    lower.includes('tempeh') ||
    lower.includes('quinoa mezze') ||
    lower.includes('harvest bowl') ||
    (lower.includes('tofu') && !lower.includes('scramble')) ||
    (lower.includes('soba') && lower.includes('broccoli'))
  ) {
    return '/src/assets/images/vegan_harvest_bowl_1791375550373.jpg';
  }

  // 8. Pasture-Raised Scrambled/Poached Eggs, Sourdough Avocado Toast, Omelets & Tortillas
  if (
    lower.includes('egg') ||
    lower.includes('scramble') ||
    lower.includes('frittata') ||
    lower.includes('omelet') ||
    lower.includes('toast') ||
    lower.includes('rancheros') ||
    lower.includes('gyeran') ||
    lower.includes('tamagoyaki') ||
    lower.includes('pan con tomate') ||
    lower.includes('tortilla española')
  ) {
    return '/src/assets/images/breakfast_egg_toast_1791375494924.jpg';
  }

  // 9. Whole Rolled Oats, Warm Porridge & Kasha Power Bowls
  if (
    lower.includes('oat') ||
    lower.includes('porridge') ||
    lower.includes('chia power') ||
    lower.includes('kasha')
  ) {
    return '/src/assets/images/nutrition_oatmeal_berries_1791285463333.jpg';
  }

  // 10. Cultured Greek Yogurt & Wild Berry Parfaits
  if (
    lower.includes('yogurt') ||
    lower.includes('parfait') ||
    lower.includes('skyr') ||
    (lower.includes('berry') && lower.includes('cup')) ||
    (lower.includes('kefir') && slot !== 'snack_evening')
  ) {
    return '/src/assets/images/greek_yogurt_berries_1791375536456.jpg';
  }

  // 11. Midday & Afternoon Bridge Snacks: Edamame Pods, Matcha, Green Tea, Nori, Almonds & Figs
  if (
    slot === 'snack_morning' ||
    slot === 'snack_afternoon' ||
    lower.includes('edamame') ||
    lower.includes('matcha') ||
    lower.includes('sencha') ||
    lower.includes('barley tea') ||
    lower.includes('seaweed') ||
    lower.includes('nori') ||
    lower.includes('almond') ||
    lower.includes('fig') ||
    lower.includes('jujube') ||
    lower.includes('clementine') ||
    lower.includes('jicama') ||
    lower.includes('chickpea') ||
    lower.includes('tahini dip')
  ) {
    return '/src/assets/images/edamame_tea_snack_1791387301304.jpg';
  }

  // 12. Crisp Mediterranean Greens & Fresh Salads
  if (
    lower.includes('harvest salad') ||
    lower.includes('greek salad') ||
    lower.includes('fattoush') ||
    lower.includes('mesclun')
  ) {
    return '/src/assets/images/nutrition_greek_salad_1791285451456.jpg';
  }

  // 13. Poultry & Grilled Chicken Courses (Pollo al Limone, Chipotle, Tandoori, Ajillo, Bulgogi, Lemongrass)
  if (
    lower.includes('chicken') ||
    lower.includes('turkey') ||
    lower.includes('pollo') ||
    lower.includes('ajillo') ||
    lower.includes('bulgogi') ||
    lower.includes('tandoori') ||
    lower.includes('chipotle') ||
    lower.includes('lemongrass') ||
    lower.includes('tawook')
  ) {
    return '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
  }

  // Fallbacks by slot
  if (slot === 'breakfast') return '/src/assets/images/breakfast_egg_toast_1791375494924.jpg';
  if (slot === 'dinner' || slot === 'lunch') return '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg';
  if (slot === 'supper') return '/src/assets/images/seared_fish_dinner_1791375522971.jpg';
  if (slot === 'snack_evening') return '/src/assets/images/herbal_tea_night_snack_1791387323890.jpg';
  if (slot === 'snack_morning' || slot === 'snack_afternoon') return '/src/assets/images/edamame_tea_snack_1791387301304.jpg';
  return '/src/assets/images/greek_yogurt_berries_1791375536456.jpg';
}

function createBreakfastForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  isVegetarian: boolean,
  preferences: string[],
  notes: string
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: High-biological-value protein (25–35g) paired with slow complex carbohydrates and healthy fats to break the overnight fast, jumpstart metabolic thermogenesis, and maintain steady blood sugar.';

  let title = 'Mediterranean Olive Oil & Herb Scramble Bowl';
  let description = 'Soft pasture-raised eggs scrambled with Greek oregano, diced vine tomatoes, and crumbled feta with sourdough.';
  let ingredients = ['3 Pasture-raised eggs', '1 slice artisanal sourdough (45g)', '30g Greek feta', '1/2 cup cherry tomatoes', '1 tsp extra virgin olive oil'];
  let image = '/src/assets/images/nutrition_greek_salad_1791285451456.jpg';
  let instructions = [
    'Step 1: Whisk & Season Eggs — In a ceramic bowl, briskly whisk 3 pasture-raised whole eggs with 1 tbsp cold water, 1/4 tsp flaky sea salt, cracked black pepper, and dried Greek oregano until light and aerated.',
    'Step 2: Warm Pan & Sauté Tomatoes — Heat 1 tsp cold-pressed extra virgin olive oil in a non-stick skillet over medium-low heat. Add halved cherry tomatoes and sauté for 90 seconds until skins soften and release sweet juices.',
    'Step 3: Gentle Low-Heat Scramble — Pour whisked eggs into the pan around the tomatoes. Reduce heat to low. Using a silicone spatula, gently draw broad ribbons from the edges toward the center every few seconds, allowing soft custardy curds to form without browning (approx 2 to 3 minutes).',
    'Step 4: Toast Artisanal Sourdough — Toast a thick slice of sourdough until deeply golden, crusty, and warm.',
    'Step 5: Assemble & Plate — Spoon the velvety egg and tomato scramble over the warm sourdough toast. Crumble authentic sheep milk feta over the hot eggs, drizzle with 1/2 tsp fresh olive oil, and finish with a dusting of wild Greek oregano.',
  ];
  let chefTip = 'Cook eggs on gentle low heat with cold-pressed olive oil to preserve delicate lutein and carotenoids and prevent watery protein weeping.';

  const hasDairy = preferences.includes('dairy_products');
  const hasFish = preferences.includes('fish_seafood');
  const notesLower = notes.toLowerCase();

  if (isVegan || notesLower.includes('vegan') || notesLower.includes('tofu')) {
    title = 'Organic Turmeric Tofu Scramble & Avocado Toast';
    description = 'High-protein organic firm tofu sautéed with nutritional yeast, baby spinach, cherry tomatoes, and seeded avocado toast.';
    ingredients = ['160g Organic firm tofu', '1 cup baby spinach', '1 slice sprouted grain toast', '1/3 Hass avocado', '1 tbsp nutritional yeast & turmeric'];
    instructions = [
      'Step 1: Press & Crumble Tofu — Press organic firm tofu between clean tea towels to remove excess moisture. Crumble with a fork into rustic bite-sized curds resembling scrambled eggs.',
      'Step 2: Season Golden Blend — In a small cup, stir 1 tbsp nutritional yeast, 1/2 tsp ground turmeric, 1/4 tsp garlic powder, 1/4 tsp black salt (kala namak for rich eggy flavor), and 2 tbsp water.',
      'Step 3: Sauté Vegetables & Scramble — Heat 1 tsp olive oil in a skillet over medium heat. Add cherry tomatoes and cook 1 minute. Add crumbled tofu and pour seasoning mixture over top. Sauté for 3 to 4 minutes until hot, golden, and fragrant.',
      'Step 4: Wilt Baby Spinach — Add fresh baby spinach leaves to the pan and fold continuously for 60 seconds until just wilted into the warm tofu.',
      'Step 5: Toast & Assemble — Toast sprouted grain bread until crisp. Mash fresh Hass avocado with lemon juice onto the toast. Spoon the warm golden tofu scramble generously over top and finish with crushed red pepper.',
    ];
    chefTip = 'Nutritional yeast adds a savory umami depth while providing vital B-complex vitamins for morning cellular energy.';
  } else if (hasFish || notesLower.includes('salmon')) {
    title = 'Smoked Wild Salmon & Dill Scramble with Sourdough';
    description = 'Pasture-raised eggs soft-scrambled with wild-caught smoked salmon ribbons, fresh garden dill, and capers on toasted sourdough.';
    ingredients = ['60g Wild smoked salmon', '2 Pasture eggs + 1 egg white', '1 slice sourdough toast', 'Fresh garden dill', '1 tsp capers'];
    instructions = [
      'Step 1: Whisk Egg Mixture — Whisk 2 pasture eggs and 1 egg white with a pinch of white pepper and 1 tbsp water until frothy and smooth.',
      'Step 2: Prep Herb & Smoked Salmon — Tear wild smoked salmon into 1-inch bite-sized ribbons. Finely chop fresh garden dill. Drain 1 tsp capers.',
      'Step 3: Slow-Cook Soft Curds — Melt 1/2 tsp grass-fed butter or olive oil in a non-stick skillet over low heat. Pour in eggs and stir continuously with a spatula in gentle figure-eights for 2.5 minutes until soft, glossy curds form.',
      'Step 4: Fold Salmon Off Heat — Pull pan completely off the heat source while eggs are still soft. Fold in the smoked salmon ribbons and fresh dill; the residual skillet heat will warm the salmon without turning it salty or tough.',
      'Step 5: Toast & Plate — Toast artisanal sourdough until crunchy. Pile the warm smoked salmon scramble atop the toast, scatter capers, and garnish with delicate dill sprigs.',
    ];
    chefTip = 'Add the smoked salmon at the very end to prevent overcooking and preserve heart-healthy omega-3 EPA/DHA.';
  } else if (hasDairy && (notesLower.includes('yogurt') || notesLower.includes('cottage'))) {
    title = 'Cultured Greek Yogurt & Wild Berry Power Bowl';
    description = 'Strained authentic Greek yogurt layered with wild blueberries, raw chia seeds, crushed walnuts, and a dusting of Ceylon cinnamon.';
    ingredients = ['220g Plain Greek yogurt 0%', '3/4 cup fresh wild blueberries', '15g Raw walnuts', '1 tbsp Chia seeds', '1/4 tsp Ceylon cinnamon'];
    instructions = [
      'Step 1: Chill Bowl & Portion Yogurt — Spoon chilled 0% strained authentic Greek yogurt into a wide ceramic bowl, smoothing a gentle well into the center with the back of a spoon.',
      'Step 2: Wash & Dry Berries — Rinse fresh wild blueberries and raspberries in cold water and gently pat completely dry on paper towels.',
      'Step 3: Hydrate Seeds & Crunch — Scatter raw black chia seeds and roughly crushed raw walnuts across the top of the yogurt.',
      'Step 4: Layer Fruit & Spices — Arrange the vibrant berries across the bowl. Dust evenly with 1/4 tsp fragrant Ceylon cinnamon and drizzle with raw honey if desired.',
      'Step 5: Mindful Enjoyment — Enjoy fresh to savor the contrast between cold velvety yogurt, bursting berries, and crunchy walnut fats.',
    ];
    chefTip = 'Strained Greek yogurt delivers twice the protein of standard yogurt, fueling sustained muscle satiety.';
  } else if (cuisine === 'japanese') {
    title = 'Washoku Tamagoyaki & Salmon Dashi Morning Set';
    description = 'Delicate dashi-rolled Japanese omelet served with hot wakame miso broth, steamed brown rice, and grilled wild salmon.';
    ingredients = ['2 Pasture eggs + dashi', '60g Grilled salmon slice', '1/2 cup brown rice', '1 bowl wakame miso soup', '1 sheet nori seaweed'];
    instructions = [
      'Step 1: Whisk Dashi Tamagoyaki Base — In a bowl, whisk 2 eggs with 2 tbsp dashi stock, 1 tsp mirin, and 1/2 tsp tamari soy sauce. Strain through a fine sieve for a silky, lump-free texture.',
      'Step 2: Roll the Omelet — Lightly oil a tamagoyaki rectangular pan over medium-low heat. Pour a thin layer of egg; when barely set, roll tightly from back to front. Push roll to back, oil pan again, pour another layer lifting the roll so egg flows underneath, and roll again until layered and pillowy.',
      'Step 3: Grill Wild Salmon Slice — Sear a 60g salted wild salmon fillet in a dry skillet over medium-high heat for 3 minutes per side until skin is blistered and flesh is flaky.',
      'Step 4: Prepare Miso Soup — Simmer 1 cup dashi broth with dried wakame seaweed. Remove from boil, dissolve 1 tbsp fermented miso paste using a ladle and chopsticks, and add silken tofu cubes.',
      'Step 5: Assemble Traditional Set — Slice the warm tamagoyaki into 3 rounds. Serve alongside steamed brown rice, grilled salmon, hot wakame miso soup, and crisp nori seaweed strips.',
    ];
    chefTip = 'Fermented miso soup supports morning gut microbial diversity and enzyme activation.';
  } else if (cuisine === 'italian') {
    title = 'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil';
    description = 'Oven-baked egg frittata with sweet basil, San Marzano sun-dried tomatoes, and creamy ricotta on toasted ciabatta.';
    ingredients = ['2 Pasture eggs + 2 whites', '25g Italian ricotta', '2 tbsp sun-dried tomatoes', 'Fresh sweet basil', '1 slice rustic ciabatta'];
    instructions = [
      'Step 1: Whisk & Season Eggs — Vigorously whisk 2 whole eggs and 2 egg whites with 1 tbsp water, cracked black pepper, sea salt, and a pinch of dried oregano until light and frothy.',
      'Step 2: Fold Aromatics — Slice sun-dried tomatoes into thin julienne strips and tear fresh sweet basil leaves. Gently fold into the egg mixture.',
      'Step 3: Stovetop Setting — Heat 1 tsp olive oil in an 8-inch oven-safe skillet over medium heat. Pour in egg mixture and cook for 3 minutes without stirring until outer edges are firm and center is softly custardy.',
      'Step 4: Ricotta Dollops & Broil — Drop small spoonfuls of fresh sheep ricotta cheese evenly over the top surface. Transfer skillet under an oven broiler set to high for 2 minutes until frittata puffs up, golden-brown and fragrant.',
      'Step 5: Toast Ciabatta & Plate — Toast a slice of rustic whole grain ciabatta. Slide the puffy frittata onto a board, cut into wedges, and serve alongside the warm bread garnished with extra fresh basil.',
    ];
    chefTip = 'Ricotta provides whey fractions that stimulate rapid morning amino acid delivery.';
  } else if (cuisine === 'mexican') {
    title = 'Huevos Rancheros & Black Bean Power Plate';
    description = 'Poached eggs over warm corn tortillas, simmered fire-roasted ranchero salsa, stewed black beans, and diced Hass avocado.';
    ingredients = ['2 Pasture eggs poached', '2 Warm corn tortillas', '1/2 cup stewed black beans', '3 tbsp fire-roasted salsa', '1/3 Hass avocado'];
    instructions = [
      'Step 1: Warm Corn Tortillas — Place corn tortillas directly on a hot dry skillet or griddle for 30 seconds per side until pliable, lightly blistered, and fragrant. Keep warm wrapped in a clean cloth.',
      'Step 2: Simmer Ranchero Salsa & Beans — In a small saucepan, warm 3 tbsp fire-roasted tomato salsa with a pinch of ground cumin and Mexican oregano. In a second pan, warm stewed black beans with a squeeze of lime juice.',
      'Step 3: Poach Eggs — Crack 2 fresh eggs into simmering water with a drop of vinegar. Cook gently for 3 minutes until whites are completely set and yolks remain warm and liquid.',
      'Step 4: Build Tortilla Base — Lay the warm corn tortillas flat on a wide plate. Spread 1/4 cup warm black beans evenly over each tortilla.',
      'Step 5: Top & Garnish — Carefully place a poached egg atop each bean-covered tortilla. Spoon hot fire-roasted ranchero salsa over the whites, top with diced Hass avocado, and scatter fresh cilantro sprigs.',
    ];
    chefTip = 'Corn tortillas and black beans form a complete plant-based amino acid profile with high soluble prebiotic fiber.';
  } else if (cuisine === 'spanish') {
    title = 'Tortilla Española & Pan con Tomate';
    description = 'Traditional light Spanish potato and caramelized onion omelet served with grated garlic vine tomato rubbed over crusty bread.';
    ingredients = ['2 Eggs + 1 white', '1 Small boiled potato sliced', '1/4 Caramelized onion', '1 slice rustic bread', 'Grated tomato & olive oil'];
    instructions = [
      'Step 1: Prep Potatoes & Onions — Slice pre-boiled waxy potato into thin 1/8-inch rounds. Thinly slice 1/4 sweet onion.',
      'Step 2: Sauté in Olive Oil — Heat 1 tbsp Spanish extra virgin olive oil in an 8-inch non-stick skillet over medium heat. Sauté onion and potato slices for 4 minutes until golden and tender. Season with sea salt.',
      'Step 3: Beat Eggs & Combine — Beat 2 whole eggs and 1 egg white in a bowl with 1/4 tsp salt. Pour hot potatoes and onions into the eggs; let rest for 3 minutes so the potato starches meld into the egg base.',
      'Step 4: Cook & Flip Tortilla — Pour the mixture back into the warm pan. Cook on low heat for 3 minutes, running a spatula around the edge to form a round cake. Place a flat plate over the pan, invert swiftly, and slide the tortilla back in to cook the other side for 2 minutes for a creamy center (jugosa).',
      'Step 5: Pan con Tomate — Toast a thick slice of rustic bread. Cut a garlic clove in half and rub across the hot crunchy surface. Grate a ripe vine tomato against a box grater, spread the pulp over the bread, and drizzle generously with Spanish olive oil and flaky sea salt.',
    ];
    chefTip = 'Grated vine tomato contains bioavailable lycopene maximized by healthy monounsaturated olive oil fats.';
  } else if (cuisine === 'korean') {
    title = 'Korean Steamed Gyeran-jjim & Seaweed Rice';
    description = 'Fluffy Korean silken steamed eggs seasoned with scallions and sesame, served with toasted nori and brown rice.';
    ingredients = ['3 Pasture eggs', '1/2 cup Kelp-anchovy broth', '2 Scallions chopped', '1 tsp Toasted sesame oil', '1/2 cup Steamed brown rice'];
    instructions = [
      'Step 1: Whisk Broth & Eggs — Whisk 3 eggs thoroughly with 1/2 cup warm kelp-anchovy broth (or light vegetable stock), 1/2 tsp fish sauce or tamari, and a pinch of salt until frothy. Strain through a sieve into a heatproof bowl or small earthenware pot (ttukbaegi).',
      'Step 2: Stir While Heating — Place pot over medium-low heat. Stir continuously in small circles with a spoon for 3 minutes as the egg curds begin to set and thicken along the sides and bottom.',
      'Step 3: Cover & Steam Dome — Once curds form about 70% of the volume, sprinkle finely sliced scallions and sesame seeds across the top. Cover tightly with a domed lid or heatproof bowl. Reduce heat to very low and steam undisturbed for 3 minutes until the egg puffs into a dramatic soufflé dome.',
      'Step 4: Drizzle Sesame Oil — Remove lid, immediately drizzle 1 tsp toasted sesame oil over the steaming fluffy eggs, and remove from heat.',
      'Step 5: Serve with Warm Rice & Nori — Serve steaming hot alongside warm brown rice and crispy sheets of roasted seasoned seaweed.',
    ];
    chefTip = 'Gentle steaming retains 100% of the egg micronutrients, choline, and lutein.';
  } else if (cuisine === 'vietnamese') {
    title = 'Vietnamese Bánh Mì Egg Scramble Bowl';
    description = 'Fragrant eggs scrambled with cilantro, cucumber ribbons, pickled daikon carrots, and a touch of chili-lime dressing.';
    ingredients = ['3 Pasture eggs', '1/2 cup Pickled daikon & carrot', '1/2 English cucumber', 'Fresh cilantro & mint', '1 tsp Tamari & lime'];
    instructions = [
      'Step 1: Whisk Tamari Eggs — Whisk 3 eggs with 1 tsp low-sodium tamari soy sauce, 1 finely sliced scallion, and a pinch of white pepper.',
      'Step 2: Quick High-Heat Wok Scramble — Heat 1 tsp oil in a wok or skillet over medium-high heat until smoking hot. Pour in the eggs; they will puff immediately. Swirl for 45 seconds with chopsticks, folding gently until barely set and soft.',
      'Step 3: Prep Pickles & Fresh Herbs — Drain crisp pickled daikon and carrot matchsticks (đồ chua). Thinly slice English cucumber on a bias. Pick fresh cilantro sprigs and mint leaves.',
      'Step 4: Plate the Scramble Bowl — Transfer the steaming hot egg scramble to a serving bowl. Arrange crisp cucumber ribbons and bright pickled carrots along the perimeter.',
      'Step 5: Garnish & Finish — Crown with abundant fresh cilantro, mint, sliced red birds-eye chilies, a squeeze of fresh lime juice, and a light splash of Maggi or tamari seasoning.',
    ];
    chefTip = 'Pickled vegetables add natural lactic acid bacteria supporting gut-brain axis neurotransmitter synthesis.';
  } else if (cuisine === 'nordic') {
    title = 'Nordic Smoked Salmon & Rye Crisp Breakfast';
    description = 'Wild smoked salmon layered over whole grain Finnish rye crisps with whipped Skyr, fresh dill, and cucumber ribbons.';
    ingredients = ['60g Wild smoked salmon', '2 Whole rye crispbreads', '50g Plain Icelandic Skyr', 'Fresh garden dill', '1 boiled egg'];
    instructions = [
      'Step 1: Boil 6-Minute Soft Egg — Lower pasture egg into gently boiling water and cook for 6.5 minutes. Transfer immediately to an ice bath for 3 minutes, peel carefully, and slice into rounds to reveal a jammy golden yolk.',
      'Step 2: Whip Skyr with Lemon & Dill — In a small bowl, whisk 50g plain Icelandic Skyr with 1/2 tsp fresh lemon juice, a pinch of sea salt, cracked black pepper, and finely minced fresh garden dill.',
      'Step 3: Spread Rye Crisps — Place 2 whole grain Finnish rye crispbreads on a wooden board. Spread the seasoned whipped Skyr generously over each crisp.',
      'Step 4: Layer Salmon & Jammy Egg — Drape delicate ribbons of wild smoked salmon across the Skyr. Top with slices of the jammy boiled egg and shaved cucumber ribbons.',
      'Step 5: Garnish — Scatter whole fresh dill fronds and cracked black pepper over the open-faced crisps. Serve immediately while crisps are firm and crunchy.',
    ];
    chefTip = 'Whole rye grain contains alkylresorcinols that improve insulin sensitivity and prolong fullness.';
  } else if (cuisine === 'eastern_european') {
    title = 'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg';
    description = 'Toasted buckwheat groats simmered tender, topped with sautéed wild cremini mushrooms, garden dill, and a soft-poached pasture egg.';
    ingredients = ['1/2 cup Toasted buckwheat kasha (cooked)', '1 Poached egg', '1/2 cup Cremini mushrooms', 'Fresh garden dill', '1 tsp grass-fed butter'];
    instructions = [
      'Step 1: Toast & Simmer Buckwheat — In a dry pot, toast 1/4 cup raw buckwheat groats over medium heat for 2 minutes until nutty and fragrant. Add 1/2 cup water and a pinch of salt. Bring to a boil, cover tightly, reduce to low, and simmer for 14 minutes until grains are tender and fluffy.',
      'Step 2: Sauté Garlic Cremini Mushrooms — Slice cremini mushrooms. Heat 1 tsp grass-fed butter in a skillet over medium heat. Sauté mushrooms with 1 minced garlic clove and black pepper for 4 minutes until deeply browned and caramelized.',
      'Step 3: Poach Pasture Egg — Simmer water in a deep saucepan. Slide in 1 fresh egg and poach gently for 3 minutes until white is set and yolk is warm and liquid.',
      'Step 4: Fold Fresh Dill into Kasha — Fluff the cooked buckwheat kasha with a fork and stir in chopped garden dill and a small dab of butter.',
      'Step 5: Assemble Warm Bowl — Spoon fragrant warm buckwheat into a rustic ceramic bowl. Top with the golden sautéed mushrooms, nestle the soft-poached egg in the center, and shower with fresh garden dill.',
    ];
    chefTip = 'Buckwheat contains the bioflavonoid rutin which strengthens vascular wall elasticity and microcirculation.';
  } else if (cuisine === 'french') {
    title = 'Parisian Fine Herb Omelet with Petite Mesclun Salad';
    description = 'Silky rolled French omelet folded with chives, tarragon, and chervil, accompanied by a light lemon-Dijon salad.';
    ingredients = ['3 Pasture eggs', 'Fresh fines herbes (chives, tarragon, parsley)', '2 cups tender mesclun greens', '1 tsp Dijon vinaigrette'];
    instructions = [
      'Step 1: Prep Fines Herbes — Finely mince fresh French tarragon, chives, chervil, and flat-leaf parsley (about 1 tbsp total).',
      'Step 2: Whisk Homogenous Eggs — Vigorously whisk 3 eggs with a pinch of fine sea salt, white pepper, and half the herbs until completely uniform with zero strands of white showing.',
      'Step 3: Rapid Swirl in Warm Buttered Pan — Melt 1 tsp butter in an 8-inch non-stick skillet over medium-low heat until foamy but not browned. Pour in eggs. Immediately shake pan vigorously back and forth while rapidly stirring eggs with a fork in small circles to create micro-curds.',
      'Step 4: Roll the Omelet — When eggs are 80% set but still glossy and moist on top (baveuse), stop stirring. Smooth the surface with a spatula. Tip the pan forward and gently roll the omelet from bottom to top into a neat, smooth, pale yellow cylinder with zero browning.',
      'Step 5: Turn Out & Plate — Turn the omelet out seam-side down onto a warm plate. Rub a tiny dab of butter over the surface for a classic French restaurant shine, scatter remaining fines herbes, and serve alongside dressed tender mesclun greens.',
    ];
    chefTip = 'Fresh French tarragon stimulates gastric digestive juices and enhances nutrient absorption. True French omelets should have zero browning on the exterior.';
  }

  return {
    slot: 'breakfast',
    courseCategory: 'breakfast',
    slotLabel: 'Breakfast (Morning Course)',
    timeOfDay: '08:00 AM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.28) / 4),
    carbs: isKeto ? 8 : Math.round((calories * 0.42) / 4),
    fats: isKeto ? Math.round((calories * 0.70) / 9) : Math.round((calories * 0.30) / 9),
    fiber: 6,
    ingredients,
    prepTime: '12 min',
    recipeId: 'recipe_power_berry_oatmeal',
    image: getMatchingDishImage(title, 'breakfast'),
    cuisineTag: cuisine,
    preferenceMatch: preferences,
    instructions,
    chefTip,
    difficulty: 'Easy',
  };
}

function createMorningSnackForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  preferences: string[]
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: Light, nutrient-dense bridge snack (150–250 kcal) to maintain steady cognitive focus, replenish hydration, and prevent compensatory overeating at midday dinner.';

  let title = 'Greek Yogurt & Wild Berry Antioxidant Cup';
  let description = 'Strained 0% Greek yogurt topped with wild blueberries, crushed walnuts, and a dusting of Ceylon cinnamon.';
  let ingredients = ['140g Greek yogurt 0%', '1/3 cup wild blueberries', '10g raw walnuts'];
  let instructions = [
    'Step 1: Chill Glassware & Portion Yogurt — Spoon 140g chilled 0% strained Greek yogurt into a glass tumbler or small ceramic cup.',
    'Step 2: Wash & Scatter Fresh Berries — Rinse fresh wild blueberries and pat dry with paper towel. Scatter over the surface of the yogurt.',
    'Step 3: Crush Walnuts & Dust Ceylon Cinnamon — Roughly crush raw walnuts with your fingers over the cup, and finish with a dusting of 1/4 tsp fragrant Ceylon cinnamon to support glycemic regulation.',
    'Step 4: Mindful Tasting — Savor slowly 2.5 hours prior to midday dinner to sustain continuous amino acid circulation and cognitive focus.',
  ];
  let chefTip = 'Casein proteins release amino acids slowly over 3 hours, keeping you sharp until dinner.';

  if (isVegan) {
    title = 'Steamed Sea Salt Edamame & Roasted Almonds';
    description = 'Warm steamed edamame pods paired with raw crunchy almonds for clean plant fiber and magnesium.';
    ingredients = ['3/4 cup Steamed edamame pods', '15g Raw almonds', 'Flaky sea salt'];
    instructions = [
      'Step 1: Steam Edamame Pods — Bring a small pot with 2 inches of water to a boil. Steam edamame pods in a steamer basket for 3 minutes until tender and bright emerald green.',
      'Step 2: Season with Mineral Salt — Drain well and immediately toss hot pods with a pinch of flaky sea salt so the crystals adhere.',
      'Step 3: Portion Crunchy Almonds — Count out 15g raw almonds into a small dish.',
      'Step 4: Serve & Squeeze — Enjoy hot edamame by sliding beans from the salted pods directly into your mouth, paired with crunchy magnesium-rich almonds.',
    ];
    chefTip = 'Edamame is one of the few plant foods that contains all nine essential amino acids.';
  } else if (cuisine === 'japanese') {
    title = 'Matcha Green Tea & Steamed Edamame Pods';
    description = 'Ceremonial grade unsweetened matcha paired with warm sea salt edamame pods for L-theanine focus.';
    ingredients = ['1 cup Ceremonial matcha tea', '3/4 cup Steamed edamame in pods', 'Flaky sea salt'];
    instructions = [
      'Step 1: Sift & Whisk Ceremonial Matcha — Sift 1/2 tsp ceremonial matcha powder through a fine sieve into a wide ceramic bowl (chawan). Add 60ml hot water at 80°C (175°F). Whisk rapidly with a bamboo whisk (chasen) in a "W" motion for 30 seconds until a creamy jade micro-foam appears.',
      'Step 2: Steam Edamame Pods — Steam whole edamame pods for 3 minutes until tender and piping hot. Drain thoroughly.',
      'Step 3: Salt & Present — Sprinkle hot pods with flaky Maldon sea salt and serve alongside the frothy matcha.',
      'Step 4: Mindful Sip & Savor — Sip the warm antioxidant-rich matcha between bites of edamame for sustained L-theanine cognitive flow without caffeine jitters.',
    ];
    chefTip = 'L-theanine in matcha works synergistically with caffeine to provide calm alertness without jitters.';
  } else if (cuisine === 'middle_eastern') {
    title = 'Persian Cucumbers & Lemon Garlic Tahini Dip';
    description = 'Crisp mini cucumbers with whipped lemon-tahini dip, toasted pine nuts, and za’atar herbs.';
    ingredients = ['2 Persian cucumbers', '2 tbsp Raw sesame tahini', 'Fresh lemon juice', '1 tsp Za\'atar'];
    instructions = [
      'Step 1: Slice Persian Cucumbers — Wash mini cucumbers and slice lengthwise into sturdy dipping spears.',
      'Step 2: Whip Tahini Emulsion — In a small bowl, whisk 2 tbsp raw sesame tahini with 1 tbsp warm water, 1 tsp lemon juice, and a pinch of sea salt. Whisk vigorously until the emulsion turns pale, airy, and creamy.',
      'Step 3: Garnish with Za’atar — Spoon the whipped tahini into a dipping bowl and dust with aromatic za’atar herbs (wild thyme and sumac).',
      'Step 4: Dip & Enjoy — Dip crisp cucumber spears into the rich sesame cream for a refreshing, calcium-rich morning recharge.',
    ];
    chefTip = 'Sesame tahini is extraordinarily rich in bioavailable calcium and copper.';
  } else if (cuisine === 'spanish') {
    title = 'Almonds of Valencia & Sweet Clementine';
    description = 'Crisp Spanish Marcona almonds paired with a fresh sweet clementine for hydration and vitamin C.';
    ingredients = ['20g Raw Marcona almonds', '1 Sweet clementine'];
    instructions = [
      'Step 1: Peel Fresh Fruit — Peel sweet ripe clementine, gently pulling segments apart into bite-sized wedges.',
      'Step 2: Portion Raw Almonds — Portion 20g raw Marcona almonds into a small terracotta tapas bowl.',
      'Step 3: Mindful Glycemic Pairing — Eat almond kernels alongside juicy clementine wedges. The natural plant fats and fiber blunt the fructose absorption, providing smooth, stable morning energy.',
    ];
    chefTip = 'Vitamin C boosts the cellular absorption of plant non-heme iron.';
  } else if (cuisine === 'korean') {
    title = 'Roasted Seaweed Crisps & Barley Tea';
    description = 'Lightly toasted seaweed nori seasoned with sesame oil and a chilled cup of antioxidant barley tea (Boricha).';
    ingredients = ['2 Packs Roasted seaweed sheets', '1 Glass Chilled roasted barley tea', '10g Roasted pumpkin seeds'];
    instructions = [
      'Step 1: Brew or Chill Barley Tea — Steep 1 pouch of roasted barley tea (boricha) in hot or chilled water for 5 minutes until amber and roasty.',
      'Step 2: Portion Crunchy Seaweed & Seeds — Open crisp roasted seaweed nori sheets seasoned with sesame oil and sea salt. Portion 10g roasted pumpkin seeds.',
      'Step 3: Refresh & Mineralize — Sip fragrant roasted barley tea while enjoying crunchy seaweed sheets for clean iodine and thyroid support.',
    ];
    chefTip = 'Seaweed provides essential dietary iodine required for thyroid hormone T3/T4 synthesis.';
  }

  return {
    slot: 'snack_morning',
    courseCategory: 'snack',
    slotLabel: 'Morning Snack (In-Between Breakfast & Dinner)',
    timeOfDay: '11:00 AM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.35) / 4),
    carbs: Math.round((calories * 0.35) / 4),
    fats: Math.round((calories * 0.30) / 9),
    fiber: 3,
    ingredients,
    prepTime: '4 min',
    recipeId: 'recipe_greek_yogurt_parfait',
    image: getMatchingDishImage(title, 'snack_morning'),
    cuisineTag: cuisine,
    instructions,
    chefTip,
    difficulty: 'Quick',
  };
}

function createMiddayDinnerForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  isVegetarian: boolean,
  preferences: string[],
  notes: string
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: Hearty, balanced main midday dinner (30–35% daily energy) combining lean complete protein, abundant fibrous greens, and complex low-glycemic carbohydrates to fuel peak physical and mental activity.';

  const hasFish = preferences.includes('fish_seafood');
  const hasRedMeat = preferences.includes('meat_red');
  const notesLower = notes.toLowerCase();

  let title = 'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad';
  let description = 'Charred chicken breast with kalamata olives, cucumber, vine tomatoes, quinoa, and cold-pressed olive oil.';
  let ingredients = ['160g Grilled chicken breast', '1/2 cup cooked quinoa', '2 cups mixed greens', '30g Greek feta', '1 tbsp Extra virgin olive oil'];
  let image = '/src/assets/images/nutrition_greek_salad_1791285451456.jpg';
  let instructions = [
    'Step 1: Marinate Herb Chicken — In a shallow glass dish, toss 160g chicken breast cutlet with 1 tbsp fresh lemon juice, 1 minced garlic clove, 1/2 tsp dried Greek oregano, cracked black pepper, and 1 tsp olive oil. Marinate for 15 minutes at room temperature.',
    'Step 2: Grill Chicken to Golden Perfection — Preheat a ridged cast-iron grill pan over medium-high heat until hot. Grill chicken cutlet for 5 to 6 minutes per side without moving until charred grill marks form and internal temperature registers 74°C (165°F).',
    'Step 3: Rest Protein — Transfer grilled chicken to a cutting board and rest for 5 full minutes so natural juices redistribute throughout the meat fibers.',
    'Step 4: Prep Greens & Vegetables — Wash crisp mixed greens and baby spinach. Halve cherry tomatoes, slice English cucumber into half-moons, and drain kalamata olives.',
    'Step 5: Assemble Grains & Salad — Fluff 1/2 cup cooked quinoa into the base of a wide salad bowl. Layer fresh greens, cucumber, cherry tomatoes, and kalamata olives.',
    'Step 6: Carve & Plate — Slice the rested chicken breast diagonally into 1/2-inch strips. Arrange over the salad, crumble authentic Greek sheep feta across the top, and drizzle with extra virgin olive oil and fresh lemon juice.',
  ];
  let chefTip = 'Let grilled chicken rest for 5 minutes before slicing so the flavorful juices redistribute evenly.';

  if (isVegan || notesLower.includes('vegan') || notesLower.includes('falafel') || notesLower.includes('tofu')) {
    title = 'Mediterranean Baked Falafel & Quinoa Mezze Bowl';
    description = 'Herb-infused baked chickpea falafels over tri-color quinoa, roasted eggplant, crisp cucumbers, and lemon tahini dressing.';
    ingredients = ['4 Baked chickpea falafels', '3/4 cup cooked quinoa', '1/2 cup roasted eggplant', '2 cups baby arugula', '2 tbsp garlic lemon tahini'];
    instructions = [
      'Step 1: Roast Eggplant & Falafels — Preheat oven to 200°C (400°F). Toss cubed eggplant with olive oil, cumin, and sea salt. Arrange alongside herb falafels on a parchment-lined baking sheet. Roast for 15 minutes, flipping once, until falafels are crunchy golden and eggplant is creamy and caramelized.',
      'Step 2: Whisk Garlic Tahini Emulsion — In a small bowl, whisk 2 tbsp raw sesame tahini with 1.5 tbsp warm water, 1 tbsp fresh lemon juice, 1/2 clove minced garlic, and a pinch of salt until silky and pourable.',
      'Step 3: Fluff Quinoa & Toss Greens — Warm tri-color quinoa and fluff with a fork. Toss fresh baby arugula with a squeeze of lemon juice.',
      'Step 4: Assemble Mezze Bowl — Layer arugula and warm quinoa in a wide bowl. Arrange roasted eggplant cubes, crisp diced Persian cucumber, and hot crunchy falafels in sections.',
      'Step 5: Garnish & Drizzle — Drizzle creamy garlic tahini across the entire bowl, scatter toasted pine nuts or sesame seeds, and dust with ruby sumac.',
    ];
    chefTip = 'Chickpeas and quinoa together form a complete amino acid protein chain with prebiotic galacto-oligosaccharides.';
  } else if (hasFish || notesLower.includes('fish') || notesLower.includes('salmon') || notesLower.includes('sea bass')) {
    title = 'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes';
    description = 'Wild sea bass fillet pan-seared with blistered cherry tomatoes, capers, fresh garlic, and steamed zucchini ribbons.';
    ingredients = ['170g Wild sea bass fillet', '1 cup stewed cherry tomatoes', '1 tbsp capers', '1 medium zucchini sliced', '1 tbsp olive oil'];
    instructions = [
      'Step 1: Score & Season Skin — Pat sea bass fillet completely dry. Score skin with 3 shallow slashes using a sharp knife to prevent curling. Season both sides with flaky sea salt and white pepper.',
      'Step 2: Shave & Steam Zucchini — Use a vegetable peeler to shave zucchini into long ribbons. Steam in a covered pan with 2 tbsp water for 2 minutes until tender-crisp. Drain and plate.',
      'Step 3: Sear Crispy Skin — Heat 1 tbsp cold-pressed olive oil in a non-stick skillet over medium-high heat. Place sea bass skin-side down and press gently with a spatula for 15 seconds. Sear undisturbed for 4 minutes until skin is golden and crispy.',
      'Step 4: Flip & Finish — Turn fillet over and cook flesh-side for 2 minutes until opaque and flaky (internal temp 55°C / 130°F). Transfer carefully onto the bed of zucchini ribbons.',
      'Step 5: Blister Capers & Cherry Tomatoes — In the same hot pan, toss halved cherry tomatoes, sliced garlic, and drained capers for 90 seconds until tomatoes burst. Deglaze with 1 tbsp lemon juice and spoon pan reduction over the crispy fish.',
    ];
    chefTip = 'Scoring the fish skin prevents curling in the hot skillet and ensures maximum crispness.';
  } else if (hasRedMeat || notesLower.includes('steak') || notesLower.includes('beef')) {
    title = 'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes';
    description = 'Lean grass-fed beef flank steak seared medium-rare with fresh rosemary, blistered asparagus spears, and roasted fingerling potatoes.';
    ingredients = ['160g Grass-fed flank steak', '2 cups roasted asparagus spears', '3 small roasted baby potatoes', '1 tbsp chimichurri / fresh herb sauce'];
    instructions = [
      'Step 1: Temper & Season Steak — Bring flank steak to room temperature for 15 minutes. Pat dry and rub with 1 tsp olive oil, 1 minced garlic clove, chopped fresh rosemary, coarse sea salt, and black pepper.',
      'Step 2: Roast Potatoes & Asparagus — Roast halved baby potatoes at 200°C (400°F) for 15 minutes. Add trimmed asparagus spears tossed with olive oil and roast 7 minutes more until tender and blistered.',
      'Step 3: Hot Cast-Iron Sear — Heat a heavy cast-iron skillet over high heat until smoking hot. Lay flank steak in pan and sear without moving for 3.5 to 4 minutes per side for medium-rare (internal temp 54°C / 130°F).',
      'Step 4: Rest Steak 5 Minutes — Transfer steak to a warm wooden board and let rest undisturbed for 5 minutes to lock in intramuscular juices.',
      'Step 5: Slice Against the Grain — Carve flank steak across the muscle grain at a 45-degree angle into thin 1/4-inch slices for optimal tenderness.',
      'Step 6: Plate & Sauce — Plate sliced steak alongside roasted potatoes and asparagus. Spoon vibrant green herb chimichurri over the meat and finish with flaky salt.',
    ];
    chefTip = 'Grass-fed beef provides five times more anti-inflammatory conjugated linoleic acid (CLA) than conventional beef.';
  } else if (cuisine === 'italian') {
    title = 'Italian Pollo al Limone with Polenta & Rosemary Greens';
    description = 'Tender chicken breast seared in white wine lemon reduction with garlic, soft polenta, and sautéed Tuscan kale.';
    ingredients = ['160g Chicken breast cutlet', '1/2 cup soft yellow polenta', '2 cups chopped Tuscan kale', '1 tbsp olive oil & garlic', 'Fresh rosemary'];
    instructions = [
      'Step 1: Prep Cutlets & Season — Pound chicken breast cutlets to an even 1/2-inch thickness. Season with sea salt, white pepper, and fresh lemon zest.',
      'Step 2: Cook Soft Polenta — Whisk quick corn polenta into simmering seasoned vegetable stock for 4 minutes until thick, velvety, and creamy. Keep warm covered.',
      'Step 3: Golden Chicken Sear — Heat 1 tbsp olive oil with a fresh rosemary sprig in a stainless skillet over medium-high heat. Sear chicken cutlets for 3 minutes per side until deeply golden.',
      'Step 4: Lemon Deglaze — Pour fresh lemon juice (2 tbsp) directly into the skillet. Swirl for 60 seconds as the citrus reduction bubbles and lifts savory caramelized fond from the pan.',
      'Step 5: Wilt Tuscan Kale — Remove chicken to rest. Add sliced garlic and chopped Tuscan kale to the pan drippings; sauté 2 minutes until tender.',
      'Step 6: Assemble Italian Plate — Spoon creamy polenta onto plate, top with tender kale and golden chicken cutlets, and spoon the fragrant lemon pan reduction over top.',
    ];
    chefTip = 'Kale and rosemary deliver powerful carotenoids and rosmarinic acid to quench cellular oxidation.';
  } else if (cuisine === 'japanese') {
    title = 'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento';
    description = 'Pan-roasted chicken breast glazed in ginger-mirin reduction with steamed broccoli florets and brown sushi rice.';
    ingredients = ['160g Chicken breast cutlet', '3/4 cup brown rice', '1.5 cups steamed broccoli', '1 tbsp ginger tamari glaze', 'Sesame seeds'];
    instructions = [
      'Step 1: Mix Teriyaki Glaze — In a small bowl, whisk 1 tbsp low-sodium tamari soy sauce, 1 tbsp Japanese mirin, 1 tsp grated ginger root, and 1/2 tsp garlic.',
      'Step 2: Sear Chicken Breast — Heat 1 tsp oil in a non-stick skillet over medium-high heat. Add seasoned chicken cutlet and sear 4 minutes per side until cooked through (74°C internal).',
      'Step 3: Caramelize with Glaze — Pour ginger-tamari glaze around chicken. As it vigorously bubbles and thickens into a glossy sticky sauce (about 60 seconds), spoon continuously over chicken.',
      'Step 4: Steam Broccoli Florets — Steam fresh broccoli florets in a covered pot with 2 tbsp water for 3 minutes until tender-crisp and bright emerald green.',
      'Step 5: Bento Arrangement — Slice chicken on a bias into neat strips. Arrange in a bowl or bento tray alongside steamed brown rice and vibrant broccoli florets. Drizzle remaining glaze over chicken and finish with toasted sesame seeds.',
    ];
    chefTip = 'Ginger stimulates digestive enzymes and speeds gastric emptying after a hearty meal.';
  } else if (cuisine === 'mexican') {
    title = 'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl';
    description = 'Grilled chipotle marinated chicken, seasoned pinto beans, charred bell peppers, salsa verde, and cilantro rice.';
    ingredients = ['160g Chipotle chicken breast', '1/2 cup pinto beans', '1/2 cup cilantro lime rice', '1 cup charred fajita peppers', '2 tbsp fresh guacamole'];
    instructions = [
      'Step 1: Chipotle Marinade — Coat chicken breast with 1 tsp chipotle adobo, cumin, smoked paprika, garlic, lime juice, and olive oil. Marinate 10 minutes.',
      'Step 2: Blister Fajita Peppers — In a smoking-hot dry cast-iron skillet, char sliced bell peppers and red onion for 3 minutes until blackened at edges but crisp-tender.',
      'Step 3: Grill Chipotle Chicken — In the same hot pan with 1 tsp oil, grill chicken 5 minutes per side until deeply charred and thoroughly cooked through.',
      'Step 4: Rest & Slice — Rest cooked chicken for 5 minutes on a clean board, then slice into strips.',
      'Step 5: Assemble Fiesta Bowl — Layer warm brown rice tossed with fresh lime juice and cilantro in bowl. Arrange seasoned pinto beans, charred fajita vegetables, and sliced chicken in neat sections. Crown with fresh guacamole.',
    ];
    chefTip = 'Capsaicin in chipotle peppers stimulates metabolic thermogenesis and enhances satiety.';
  } else if (cuisine === 'indian') {
    title = 'Tandoori Spiced Chicken Breast with Yellow Lentil Dal';
    description = 'Yogurt-marinated tandoori chicken roasted tender, served with turmeric yellow split pea dal and fragrant basmati.';
    ingredients = ['160g Tandoori chicken breast', '1/2 cup yellow lentil dal', '1/2 cup fragrant basmati rice', 'Fresh cilantro & lime'];
    instructions = [
      'Step 1: Tandoori Yogurt Marinade — In a bowl, mix 2 tbsp Greek yogurt with 1 tsp garam masala, 1/2 tsp turmeric, 1/2 tsp ground cumin, grated ginger, minced garlic, and lemon juice. Coat chicken cutlet thoroughly and marinate 15 minutes.',
      'Step 2: High-Heat Roast — Preheat oven or air fryer to 220°C (425°F). Place marinated chicken on a wire rack over a baking sheet. Roast for 16 to 18 minutes until edges are charred tandoori-style and juices run clear.',
      'Step 3: Simmer Turmeric Dal — Simmer yellow split lentils with water, turmeric, cumin, and a pinch of salt for 15 minutes until soft and creamy. Whisk gently to break down.',
      'Step 4: Rest & Carve Chicken — Rest chicken for 4 minutes, then slice into thick medallions.',
      'Step 5: Plate Authentic Indian Style — Spoon warm fragrant basmati rice on one side and golden lentil dal on the other. Lay roasted tandoori chicken medallions over top, garnish with fresh cilantro, and serve with fresh lime wedges.',
    ];
    chefTip = 'Curcumin in turmeric is enhanced up to 2000% when combined with black pepper and natural meal fats.';
  } else if (cuisine === 'spanish') {
    title = 'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers';
    description = 'Golden garlic chicken cutlets simmered in dry Spanish white wine and smoked pimentón with saffron rice and roasted piquillo peppers.';
    ingredients = ['160g Chicken cutlets', '4 Cloves sliced garlic', '1/2 cup Saffron brown rice', '3 Piquillo peppers', '1 tbsp Olive oil & parsley'];
    instructions = [
      'Step 1: Prep & Slice Garlic Chips — Cut chicken into bite-sized medallions and season with sea salt. Slice garlic cloves into thick chips.',
      'Step 2: Infuse Garlic Oil — Heat 1 tbsp Spanish olive oil in a skillet over medium-low heat. Cook garlic chips slowly for 3 minutes until golden and fragrant. Remove half the chips and reserve.',
      'Step 3: Brown Chicken Pieces — Turn heat to medium-high. Add chicken medallions to garlic oil and sear 3 minutes per side until deeply browned.',
      'Step 4: Deglaze with Wine & Pimentón — Sprinkle 1 tsp smoked Spanish pimentón into pan, then immediately deglaze with 3 tbsp dry white wine or chicken broth. Simmer for 3 minutes until a rich golden garlic sauce coats the chicken.',
      'Step 5: Assemble Tapas Plate — Plate warm saffron brown rice. Arrange golden garlic chicken alongside tender sliced piquillo peppers. Spoon pan sauce over everything and scatter crispy reserved garlic chips and chopped parsley.',
    ];
    chefTip = 'Saffron contains crocin and safranal, natural phytochemicals that enhance mood and cognitive clarity.';
  } else if (cuisine === 'korean') {
    title = 'Korean Bulgogi Chicken & Fermented Kimchi Bowl';
    description = 'Thin-sliced chicken marinated in ginger-tamari and sesame, served with steamed brown rice, aged kimchi, and sautéed spinach.';
    ingredients = ['160g Bulgogi chicken strips', '1/2 cup Aged cabbage kimchi', '3/4 cup Steamed brown rice', '1 cup Sautéed sesame spinach', '1 tsp Sesame oil'];
    instructions = [
      'Step 1: Bulgogi Marinade — Thinly slice chicken breast into ribbons. Toss with 1 tbsp tamari, 1 tsp toasted sesame oil, 1 tsp grated ginger, 1 minced garlic clove, and 1 sliced scallion. Marinate 10 minutes.',
      'Step 2: Blanch Sesame Spinach — Drop fresh spinach into boiling water for 30 seconds. Transfer immediately to cold water, squeeze out excess liquid, and toss with a drop of sesame oil and sesame seeds.',
      'Step 3: Flash-Sear in Hot Skillet — Heat a heavy skillet or wok over high heat until smoking. Add chicken strips in a single layer and sear for 4 minutes, stirring rapidly until cooked through and lightly charred.',
      'Step 4: Assemble Bento Bowl — Spoon warm steamed brown rice into a wide bowl. Arrange bulgogi chicken, chilled aged cabbage kimchi, and seasoned sesame spinach in distinct sections.',
      'Step 5: Finish & Garnish — Drizzle with 1/2 tsp toasted sesame oil, scatter roasted sesame seeds, and garnish with sliced green scallions.',
    ];
    chefTip = 'Fermented kimchi is loaded with beneficial Lactobacillus strains that modulate gut inflammation.';
  } else if (cuisine === 'vietnamese') {
    title = 'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad';
    description = 'Charred lemongrass and shallot chicken served over cool rice vermicelli with crisp cucumber, fresh mint, and lime dressing.';
    ingredients = ['160g Lemongrass chicken breast', '1 cup Rice vermicelli noodles', '1 cup Fresh mint, cilantro & bean sprouts', '1/2 Cucumber diced', '1 tbsp Lime tamari dressing'];
    instructions = [
      'Step 1: Lemongrass Marinade — Finely mince 1 stalk fresh lemongrass, 1 shallot, and 1 garlic clove. Rub over chicken breast with 1 tbsp tamari, 1 tsp lime juice, and black pepper. Marinate 15 minutes.',
      'Step 2: Cook Rice Vermicelli — Submerge thin rice vermicelli noodles in boiling water for 3 minutes. Drain in a colander and rinse thoroughly with cold running water to remove excess starch and keep strands springy.',
      'Step 3: Grill Charred Chicken — Grill or pan-sear marinated chicken cutlet in a hot pan over medium-high heat for 5 minutes per side until deeply caramelized and charred at edges (74°C internal).',
      'Step 4: Rest & Slice — Rest cooked chicken for 4 minutes, then slice into thin bite-sized ribbons.',
      'Step 5: Build Noodle Salad (Bún Chay Style) — Place cool rice vermicelli in a large bowl. Layer fresh bean sprouts, diced English cucumber, torn mint leaves, and fresh cilantro.',
      'Step 6: Plate & Dress — Top with warm charred lemongrass chicken slices. Drizzle with a zesty dressing of lime juice, tamari, and crushed chilies. Garnish with crushed roasted peanuts.',
    ];
    chefTip = 'Fresh mint and lemongrass provide potent essential oils that ease digestion and eliminate bloating.';
  }

  return {
    slot: 'dinner',
    courseCategory: 'dinner',
    slotLabel: 'Dinner (Midday Main Course)',
    timeOfDay: '01:30 PM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.35) / 4),
    carbs: isKeto ? 12 : Math.round((calories * 0.38) / 4),
    fats: isKeto ? Math.round((calories * 0.65) / 9) : Math.round((calories * 0.27) / 9),
    fiber: 7,
    ingredients,
    prepTime: '20 min',
    recipeId: 'recipe_greek_chicken_salad',
    image: getMatchingDishImage(title, 'dinner'),
    cuisineTag: cuisine,
    preferenceMatch: preferences,
    instructions,
    chefTip,
    difficulty: 'Easy',
  };
}

function createAfternoonSnackForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  preferences: string[]
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: Slow-digesting healthy fats and fiber to bridge the metabolic gap between midday dinner and evening supper, stabilizing evening hunger hormones.';

  let title = 'Californian Almonds & Sweet Dried Fig Fuel Bite';
  let description = 'Handful of raw Californian almonds paired with sweet Mediterranean dried figs for natural endurance.';
  let ingredients = ['20g Raw almonds', '2 Mediterranean dried figs'];
  let instructions = [
    'Step 1: Portion Raw Almonds — Count out 20g raw whole Californian almonds into a small snack dish.',
    'Step 2: Slice Dried Figs — Halve 2 sun-dried Mediterranean figs to reveal the chewy seed-filled interior.',
    'Step 3: Slow Mindful Mastication — Chew each bite slowly alongside 250ml water between 04:00 PM and 04:30 PM to stabilize metabolic blood sugar before supper.',
  ];
  let chefTip = 'Figs supply soluble pectin fiber and potassium, keeping neuromuscular contractions optimal.';

  if (cuisine === 'japanese') {
    title = 'Steamed Nori Rice Crisps & Sencha Green Tea';
    description = 'Baked brown rice nori crackers with unsweetened sencha green tea for gentle afternoon antioxidants.';
    ingredients = ['3 Nori rice crisps', '1 cup Sencha green tea'];
    instructions = [
      'Step 1: Brew Japanese Sencha — Heat water to 75°C (167°F). Steep green tea leaves for 90 seconds, then strain into a ceramic teacup.',
      'Step 2: Portion Rice Crisps — Plate 3 crisp baked brown rice nori sheets on a small dish.',
      'Step 3: Afternoon Tea Ritual — Alternate sips of warm grassy sencha with the savory nori crisps to recharge mental focus without sugar crashes.',
    ];
    chefTip = 'Epigallocatechin gallate (EGCG) in green tea aids lipid oxidation and cellular longevity.';
  } else if (cuisine === 'mexican') {
    title = 'Jicama & Cucumber with Chili-Lime Tajín';
    description = 'Crisp refreshing jicama and cucumber spears dusted with mild chili lime seasoning and pumpkin seeds.';
    ingredients = ['1 cup Jicama & cucumber sticks', '1 tsp Tajín chili lime', '10g Pepitas (pumpkin seeds)'];
    instructions = [
      'Step 1: Cut Crisp Crudités — Peel fibrous skin from jicama root. Slice jicama and English cucumber into 3-inch finger batons.',
      'Step 2: Season with Citrus & Chili — Squeeze fresh lime juice over the vegetables, then dust with 1 tsp Tajín chili-lime mineral seasoning.',
      'Step 3: Portion Pepitas — Scatter 10g raw pumpkin seeds over top for crunchy healthy fats and minerals.',
    ];
    chefTip = 'Jicama is packed with inulin, a powerhouse prebiotic fiber feeding beneficial Bifidobacteria.';
  } else if (cuisine === 'middle_eastern') {
    title = 'Lemon Roasted Chickpeas with Za’atar Herbs';
    description = 'Crunchy oven-roasted chickpeas seasoned with za’atar herbs, cold-pressed olive oil, and sea salt.';
    ingredients = ['1/3 cup Roasted chickpeas', '1 tsp Za\'atar', '1/2 tsp olive oil'];
    instructions = [
      'Step 1: Dry & Season Chickpeas — Drain cooked chickpeas and pat completely dry on paper towels. Toss with 1/2 tsp olive oil, sea salt, and 1 tsp za’atar herbs.',
      'Step 2: Roast until Crunchy — Roast in oven or air fryer at 200°C (400°F) for 15 minutes, shaking pan every 5 minutes until crispy and hollow sounding.',
      'Step 3: Cool & Crunch — Let cool for 3 minutes for maximum crispiness before enjoying.',
    ];
    chefTip = 'Za’atar contains wild thyme rich in thymol, which has natural antimicrobial and gut-soothing properties.';
  } else if (cuisine === 'korean') {
    title = 'Crispy Dried Jujube Dates & Walnuts';
    description = 'Sweet antioxidant red dates (daechu) sliced and paired with raw brain-boosting walnut halves.';
    ingredients = ['15g Dried jujube date chips', '15g Raw walnut halves'];
    instructions = [
      'Step 1: Portion Crisp Jujube Chips — Portion 15g sliced dried Korean red date chips (daechu) into a small bowl.',
      'Step 2: Add Raw Walnut Halves — Add 15g raw walnut halves.',
      'Step 3: Nutrient-Dense Pairing — Enjoy together: the natural sweetness of jujube dates perfectly balances the rich earthy walnut oils.',
    ];
    chefTip = 'Walnuts are the premier nut source of alpha-linolenic acid (ALA), supporting cognitive performance.';
  }

  return {
    slot: 'snack_afternoon',
    courseCategory: 'snack',
    slotLabel: 'Afternoon Snack (In-Between Dinner & Supper)',
    timeOfDay: '04:30 PM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.22) / 4),
    carbs: Math.round((calories * 0.48) / 4),
    fats: Math.round((calories * 0.30) / 9),
    fiber: 3,
    ingredients,
    prepTime: '2 min',
    recipeId: 'recipe_avocado_egg_toast',
    image: getMatchingDishImage(title, 'snack_afternoon'),
    cuisineTag: cuisine,
    instructions,
    chefTip,
    difficulty: 'Quick',
  };
}

function createSupperForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  isVegetarian: boolean,
  preferences: string[],
  notes: string
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: Lean, restorative protein and cooked green vegetables (25% daily energy) designed for easy nighttime digestion, overnight muscle protein synthesis, and restful deep sleep without digestive strain.';

  const hasFish = preferences.includes('fish_seafood');
  const hasRedMeat = preferences.includes('meat_red');
  const notesLower = notes.toLowerCase();

  let title = 'Glazed Wild Salmon & Quinoa Power Bowl';
  let description = 'Pan-crisped wild salmon fillet over tri-color quinoa, steamed edamame, avocado, and sesame citrus drizzle.';
  let ingredients = ['160g Wild Atlantic salmon fillet', '3/4 cup cooked quinoa', '1/2 cup steamed edamame', '1/3 avocado', '1 tbsp sesame citrus glaze'];
  let image = '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg';
  let instructions = [
    'Step 1: Dry & Season Salmon — Pat 160g wild salmon fillet completely dry with paper towels. Season with 1/4 tsp sea salt, cracked black pepper, and a drop of olive oil.',
    'Step 2: Pan-Sear in Skillet — Heat 1 tsp olive oil in an oven-safe skillet over medium-high heat. Sear salmon presentation-side down for 3.5 minutes until a golden crust forms.',
    'Step 3: Glaze & Finish Gently — Flip fillet over. Brush with 1 tbsp sesame-citrus tamari glaze. Reduce heat to medium-low and cook for 3 minutes until flaky and tender (medium center).',
    'Step 4: Steam Edamame & Slice Avocado — Steam 1/2 cup edamame in pods or shelled for 2.5 minutes. Thinly slice 1/3 ripe Hass avocado.',
    'Step 5: Assemble Evening Bowl — Fluff warm cooked tri-color quinoa in a wide bowl. Arrange avocado fans and steamed edamame along the side. Place warm seared salmon in the center and drizzle with remaining pan juices and toasted sesame seeds.',
  ];
  let chefTip = 'Wild salmon delivers bioactive peptides that modulate collagen synthesis and joint cartilage repair overnight.';

  if (isVegan || notesLower.includes('vegan') || notesLower.includes('tempeh') || notesLower.includes('tofu')) {
    title = 'Sesame Crusted Tempeh & Roasted Broccoli Soba';
    description = 'Golden pan-seared organic tempeh glazed with ginger-tamari over 100% buckwheat soba noodles and roasted broccoli.';
    ingredients = ['160g Organic tempeh cutlets', '1 cup buckwheat soba noodles', '2 cups roasted broccoli florets', '1 tbsp ginger tamari reduction'];
    instructions = [
      'Step 1: Steam Tempeh to Soften — Cut organic tempeh into 1/2-inch triangles. Steam in a covered pan with 2 inches of water for 5 minutes (removes natural bitterness and opens pores for marinade).',
      'Step 2: Roast Broccoli Florets — Toss 2 cups broccoli florets with 1 tsp olive oil and sea salt. Roast at 200°C (400°F) for 12 minutes until tips are lightly charred and stems are tender.',
      'Step 3: Cook Buckwheat Soba — Boil 100% pure buckwheat soba noodles in unsalted water for 4 minutes. Drain and rinse immediately in cold water to preserve toothsome chew.',
      'Step 4: Pan-Sear & Glaze Tempeh — Heat 1 tsp sesame oil in a skillet. Sear tempeh triangles for 3 minutes per side until golden brown. Pour in 1 tbsp ginger-tamari reduction and glaze for 60 seconds.',
      'Step 5: Plate Soba Bowl — Toss cold soba with roasted broccoli and sesame seeds. Crown with glazed golden tempeh triangles and scallions.',
    ];
    chefTip = 'Fermented tempeh is exceptionally easy to digest before bedtime with zero gastrointestinal heaviness.';
  } else if (hasRedMeat && !isVegetarian) {
    title = 'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree';
    description = 'Tender lean sirloin steak seared medium, served with garlic roasted asparagus spears and cauliflower-potato mash.';
    ingredients = ['160g Lean sirloin steak', '2 cups roasted asparagus', '1 cup cauliflower potato mash', '1 tsp olive oil & thyme'];
    instructions = [
      'Step 1: Season & Temper Sirloin — Bring 160g lean sirloin steak to room temperature for 15 minutes. Season with coarse salt, cracked pepper, and fresh thyme.',
      'Step 2: Roast Asparagus Spears — Toss fresh asparagus spears with olive oil and garlic. Roast at 200°C for 10 minutes until blistered and tender.',
      'Step 3: Sear in Hot Skillet — Heat a heavy skillet over high heat until smoking. Sear sirloin for 3.5 minutes on first side, flip and cook 3 minutes on second side for medium-rare.',
      'Step 4: Rest Steak 5 Minutes — Transfer to warm cutting board and rest 5 minutes before carving across the grain.',
      'Step 5: Plate with Velvet Puree — Spoon warm cauliflower-potato mash onto plate. Arrange roasted asparagus spears alongside and fan carved steak slices over top, drizzling with pan juices.',
    ];
    chefTip = 'Heme iron in sirloin supports red blood cell oxygenation and overnight restorative recovery.';
  } else if (cuisine === 'japanese') {
    title = 'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl';
    description = 'Wild salmon glazed with white miso reduction over steaming cauliflower rice, shiitake mushrooms, and braised bok choy.';
    ingredients = ['160g Wild salmon fillet', '1 tbsp white miso glaze', '2 cups braised baby bok choy', '1 cup shiitake mushrooms', '1/2 cup brown rice'];
    instructions = [
      'Step 1: Whisk Miso Marinade — Whisk 1 tbsp white miso paste with 1 tsp mirin, 1 tsp water, and a drop of tamari until smooth.',
      'Step 2: Broil Miso Salmon — Coat salmon fillet with miso glaze. Place on a foil-lined baking sheet and broil 6 inches from heat for 6 to 7 minutes until surface bubbles and caramelizes.',
      'Step 3: Sauté Shiitake & Bok Choy — Sauté sliced shiitake mushrooms and halved baby bok choy in a skillet with 1 tsp oil and garlic for 3 minutes until tender.',
      'Step 4: Plate Evening Bento — Spoon warm brown rice and cauliflower rice into a shallow bowl. Arrange braised greens and mushrooms. Set the caramelized miso salmon atop and garnish with sesame seeds.',
    ];
    chefTip = 'Shiitake mushrooms contain lentinan and beta-glucans that support immune surveillance during deep sleep.';
  } else if (cuisine === 'italian') {
    title = 'Herb-Crusted Baked Cod with Caponata & Polenta';
    description = 'Tender Atlantic cod baked with herbs over Sicilian eggplant caponata and creamy yellow polenta.';
    ingredients = ['180g Wild Atlantic cod fillet', '1 cup Sicilian eggplant caponata', '1/2 cup soft yellow polenta', '1 tbsp extra virgin olive oil'];
    instructions = [
      'Step 1: Season Cod Fillet — Pat cod fillet dry. Coat top with fresh chopped oregano, flat-leaf parsley, lemon zest, black pepper, and sea salt.',
      'Step 2: Bake Cod Tender — Place cod on a lightly oiled baking dish. Bake at 190°C (375°F) for 12 minutes until opaque and easily flaking with a fork.',
      'Step 3: Simmer Eggplant Caponata — In a saucepan, warm diced eggplant, cherry tomatoes, capers, and celery in olive oil until sweet and tender.',
      'Step 4: Plate over Polenta — Spoon warm soft yellow polenta on the plate. Top with eggplant caponata and nestle the tender baked cod on top with fresh lemon.',
    ];
    chefTip = 'Cod is among the leanest marine proteins, delivering pure amino acids without heavy saturated fats.';
  } else if (cuisine === 'mexican') {
    title = 'Veracruz Style Red Snapper with Cilantro & Lime';
    description = 'Wild snapper fillet baked in spicy Veracruz tomato broth with green olives, capers, and sweet peppers.';
    ingredients = ['170g Wild red snapper fillet', '1 cup Veracruz tomato broth', '1 tbsp Spanish green olives', '1 cup steamed green beans'];
    instructions = [
      'Step 1: Simmer Veracruz Broth — Simmer fresh crushed tomatoes with sliced garlic, diced sweet peppers, green olives, capers, and Mexican oregano for 6 minutes.',
      'Step 2: Poach Snapper in Broth — Nestle snapper fillet directly into the bubbling tomato broth in an oven-safe skillet. Cover with lid.',
      'Step 3: Bake Covered — Transfer skillet to oven at 190°C (375°F) for 14 minutes until fish is tender, flaky, and infused with the tangy sauce.',
      'Step 4: Steam Green Beans & Plate — Steam green beans for 3 minutes. Plate the red snapper covered in Veracruz tomato-caper sauce with beans alongside and fresh cilantro.',
    ];
    chefTip = 'Baking in broth prevents surface drying and keeps white fish succulent and digestible.';
  } else if (cuisine === 'thai') {
    title = 'Bangkok Coconut Lime Poached Shrimp & Greens';
    description = 'Jumbo tiger shrimp poached gently in a light coconut-lemongrass broth with baby corn, snow peas, and Thai basil.';
    ingredients = ['170g Jumbo tiger shrimp', '1/2 cup light coconut lemongrass broth', '1 cup snow peas & baby corn', '1/2 cup jasmine brown rice'];
    instructions = [
      'Step 1: Simmer Coconut Lemongrass Infusion — Simmer light coconut milk with bruised lemongrass stalk, sliced ginger, and torn kaffir lime leaf for 5 minutes over medium-low heat.',
      'Step 2: Cook Vegetables — Add crisp snow peas and baby corn to the aromatic broth; cook 2 minutes until tender-crisp.',
      'Step 3: Gentle Poach Shrimp — Add peeled and deveined tiger shrimp. Poach gently for 3 to 4 minutes until shrimp turn pink and curl into a loose "C" shape.',
      'Step 4: Finish with Basil & Lime — Turn off heat. Stir in fresh lime juice and fresh Thai holy basil leaves until fragrant.',
      'Step 5: Serve in Bowl — Ladle aromatic coconut broth and poached shrimp over warm steamed brown jasmine rice.',
    ];
    chefTip = 'Poaching seafood gently in herbal broth preserves natural electrolytes and tender texture.';
  } else if (cuisine === 'spanish') {
    title = 'Spanish Pescado al Horno with Escalivada & Roasted Fennel';
    description = 'Oven-roasted wild white fish fillet baked with sweet roasted bell peppers, caramelized onions, and fennel bulb.';
    ingredients = ['180g White fish fillet (hake or cod)', '1 cup Catalan escalivada (roasted peppers & onion)', '1/2 Roasted fennel bulb', '1 tbsp Extra virgin olive oil'];
    instructions = [
      'Step 1: Roast Fennel & Peppers — Thinly slice fresh fennel bulb and bell peppers. Toss with 1 tbsp olive oil and roast at 200°C for 14 minutes until sweet and caramelized.',
      'Step 2: Season White Fish Fillet — Season white fish fillet with sea salt, smoked pimentón, and lemon juice.',
      'Step 3: Lay Fish Over Vegetables & Bake — Place fish directly atop the roasted vegetable bed. Bake at 190°C for 11 minutes until fish flakes easily.',
      'Step 4: Garnish & Plate — Finish with a squeeze of fresh lemon juice, flat-leaf parsley, and a drizzle of cold-pressed Spanish olive oil.',
    ];
    chefTip = 'Fennel contains anethole, an organic compound that eases nighttime digestion and relaxes smooth muscle.';
  } else if (cuisine === 'korean') {
    title = 'Korean Doenjang Salmon Stew & Braised Greens';
    description = 'Salmon fillet poached in mild fermented soybean paste broth with zucchini, tofu cubes, and braised crown daisy greens.';
    ingredients = ['160g Salmon fillet cut into cubes', '1 tbsp Mild doenjang broth', '1 cup Cubed zucchini & radishes', '1/2 cup Silken tofu', '1/2 cup Brown rice'];
    instructions = [
      'Step 1: Simmer Doenjang Broth — Dissolve 1 tbsp fermented Korean doenjang paste in 1.5 cups kelp broth. Add sliced Korean radish and zucchini cubes; simmer 8 minutes.',
      'Step 2: Add Tofu & Salmon Cubes — Add cubed wild salmon fillet and silken tofu to the simmering broth. Cook gently for 4 minutes until salmon is tender.',
      'Step 3: Add Fresh Greens — Stir in crown daisy greens (ssukgat) and sliced scallions during the final 60 seconds.',
      'Step 4: Serve in Earthenware Bowl — Serve steaming hot in a stone bowl alongside a small portion of warm brown rice.',
    ];
    chefTip = 'Fermented doenjang provides peptide isoflavones shown to optimize nighttime cellular repair.';
  } else if (cuisine === 'vietnamese') {
    title = 'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)';
    description = 'Delicate fish fillet poached with fresh golden turmeric, garden dill, scallions, and served over delicate rice noodles.';
    ingredients = ['180g White fish fillet', '1 tsp Fresh grated turmeric', '2 cups Garden dill & scallions', '1/2 cup Thin rice noodles', '1 tbsp Lime tamari dressing'];
    instructions = [
      'Step 1: Marinate Fish with Fresh Turmeric — Toss white fish chunks with grated fresh golden turmeric, ginger, garlic, and 1 tsp tamari. Let marinate 10 minutes.',
      'Step 2: Cook Delicate Vermicelli — Submerge thin rice vermicelli in boiling water for 3 minutes, drain, and rinse with cold water.',
      'Step 3: Sear Fish with Heaps of Dill — Heat 1 tsp oil in a pan over medium heat. Sear fish chunks for 3 minutes, then add 2 generous cups of fresh dill fronds and scallions; toss until greens wilt around the golden fish.',
      'Step 4: Assemble Chả Cá Plate — Place cool vermicelli noodles in bowl, top with hot turmeric fish and wilted dill, and drizzle with lime-tamari dressing.',
    ];
    chefTip = 'Fresh dill in Vietnamese cuisine acts as a natural calmative and carminative for restful sleep.';
  }

  return {
    slot: 'supper',
    courseCategory: 'supper',
    slotLabel: 'Supper (Evening Nourishing Course)',
    timeOfDay: '07:30 PM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.35) / 4),
    carbs: isKeto ? 10 : Math.round((calories * 0.35) / 4),
    fats: isKeto ? Math.round((calories * 0.65) / 9) : Math.round((calories * 0.30) / 9),
    fiber: 6,
    ingredients,
    prepTime: '22 min',
    recipeId: 'recipe_salmon_quinoa',
    image: getMatchingDishImage(title, 'supper'),
    cuisineTag: cuisine,
    preferenceMatch: preferences,
    instructions,
    chefTip,
    difficulty: 'Easy',
  };
}

function createEveningSnackForCuisine(
  cuisine: CuisineCountry,
  calories: number,
  isKeto: boolean,
  isVegan: boolean,
  preferences: string[]
): PlanMealSlot {
  const whatShouldBeEaten =
    'What should be eaten: Zero-sugar bedtime recovery infusion with bioavailable magnesium, L-tryptophan, or soothing cultured probiotics to stimulate nocturnal melatonin production and promote deep REM/slow-wave sleep.';

  let title = 'Organic Chamomile & Magnesium Seed Crunch';
  let description = 'Calming nighttime blend of whole Egyptian chamomile tea accompanied by magnesium-rich raw pumpkin seeds and 85% dark cacao.';
  let ingredients = ['1 cup Organic chamomile tea', '15g Raw pumpkin seeds (pepitas)', '10g 85% dark chocolate'];
  let instructions = [
    'Step 1: Heat Spring Water to 95°C — Heat fresh filtered water to 95°C (just before boiling).',
    'Step 2: Steep Covered 5–7 Minutes — Place whole organic chamomile flowers into a ceramic mug, pour water, and cover with a small saucer to trap soothing volatile oils.',
    'Step 3: Portion Magnesium Seeds — Place 15g raw pumpkin seeds and a square of 85% dark cacao in a small dish.',
    'Step 4: Relax 45 Minutes Before Sleep — Uncover mug, breathe in the apple-floral steam, and sip slowly while chewing the crunchy seeds to trigger GABA synthesis.',
  ];
  let chefTip = 'Pumpkin seeds are one of nature’s highest sources of zinc and magnesium, essential cofactors in GABA synthesis.';

  if (preferences.includes('dairy_products')) {
    title = 'Probiotic Kefir & Tart Cherry Sleep Elixir';
    description = 'Cultured plain kefir swirled with Montmorency tart cherry juice for natural exogenous melatonin and microbiome replenishment.';
    ingredients = ['120ml Plain cultured kefir', '2 tbsp Tart cherry juice concentrate'];
    instructions = [
      'Step 1: Chill Glassware — Pour 120ml cold plain cultured probiotic kefir into a small glass.',
      'Step 2: Swirl Tart Cherry Concentrate — Add 2 tbsp pure unsweetened Montmorency tart cherry concentrate and gently swirl with a spoon to create ruby ribbons.',
      'Step 3: Consume 30 Minutes Before Bed — Drink slowly 30 minutes before turning off lights for natural exogenous melatonin and gut microbial replenishment.',
    ];
    chefTip = 'Tart cherries naturally contain high concentrations of melatonin and proanthocyanidins that reduce sleep latency.';
  }

  return {
    slot: 'snack_evening',
    courseCategory: 'snack',
    slotLabel: 'Evening Snack (In-Between Supper & Bedtime)',
    timeOfDay: '09:15 PM',
    whatShouldBeEaten,
    title,
    description,
    calories,
    protein: Math.round((calories * 0.20) / 4),
    carbs: Math.round((calories * 0.40) / 4),
    fats: Math.round((calories * 0.40) / 9),
    fiber: 2,
    ingredients,
    prepTime: '3 min',
    recipeId: 'recipe_greek_yogurt_parfait',
    image: getMatchingDishImage(title, 'snack_evening'),
    cuisineTag: cuisine,
    instructions,
    chefTip,
    difficulty: 'Quick',
  };
}

function generateGroceryList(
  cuisine: CuisineMetadata,
  preferences: string[],
  isVegan: boolean,
  isKeto: boolean
) {
  const isFish = preferences.includes('fish_seafood');
  const isMeat = preferences.includes('meat_poultry') || preferences.includes('meat_red');
  const isDairy = preferences.includes('dairy_products');

  const proteins: string[] = [];
  if (isVegan) {
    proteins.push('Organic Extra-Firm Tofu (400g)', 'Fermented Tempeh (200g)', 'Green Edamame (frozen 500g)', 'Dried Brown Lentils');
  } else {
    if (isMeat) proteins.push('Boneless Skinless Chicken Breast (800g)', 'Lean Turkey Breast (500g)');
    if (isFish) proteins.push('Wild Atlantic Salmon Fillets (600g)', 'Wild White Cod Fillets (400g)');
    if (preferences.includes('meat_red')) proteins.push('Grass-Fed Flank Steak (400g)');
    proteins.push('Pasture-Raised Eggs (Dozen)');
  }

  const produce: string[] = [
    'Baby Spinach & Crisp Romaine (3 tubs)',
    'English Cucumbers (3 pieces)',
    'Vine Cherry Tomatoes (2 pints)',
    'Hass Avocados (4 medium)',
    'Fresh Lemons & Limes (6 pieces)',
    'Fresh Herbs (Oregano, Basil, Dill, Cilantro)',
    'Garlic Bulb & Fresh Ginger Root',
    'Baby Broccoli or Broccolini (2 bunches)',
  ];

  const pantry: string[] = [
    'Cold-Pressed Extra Virgin Olive Oil (500ml)',
    isKeto ? 'Cauliflower Rice (3 bags)' : 'Tri-Color Quinoa (500g)',
    isKeto ? 'Raw Macadamia Nuts & Walnuts' : 'Rolled Whole Oats & Buckwheat',
    'Raw Pumpkin Seeds & Chia Seeds',
    ...cuisine.signatureFlavors.slice(0, 3).map((f) => `Signature: ${f}`),
  ];

  if (isDairy && !isVegan) {
    pantry.push('Plain Strained Greek Yogurt 0% (1kg)', 'Block Greek Feta (200g)', 'Plain Kefir or Skyr (500g)');
  }

  return [
    { category: 'Lean Proteins & Seafood', items: proteins },
    { category: 'Fresh Market Produce & Herbs', items: produce },
    { category: `Pantry Grains, Healthy Fats & ${cuisine.name} Essentials`, items: pantry },
  ];
}
