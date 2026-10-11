import { DailyNutritionLog, LoggedFood, UserProfile, BmiResult } from '../types/nutrition';

const STORAGE_KEY = 'nutritrack_90_day_logs';

/**
 * Formats a Date object to YYYY-MM-DD
 */
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Formats a Date object to a human-friendly day label (e.g., "Sat, Oct 11")
 */
export function formatDayLabel(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generates realistic dish name samples tailored to user goal and cuisine
 */
function getSampleDishesForCuisine(cuisine: string = 'mediterranean'): string[] {
  const dishes: Record<string, string[]> = {
    mediterranean: [
      'Greek Salad with Kalamata Olives & Feta',
      'Grilled Salmon with Lemon & Steamed Asparagus',
      'Herb-Marinated Chicken Breast with Quinoa',
      'Lentil & Tomato Stew with Extra Virgin Olive Oil',
      'Roasted Chickpeas & Cucumber Tzatziki Dip',
      'Overnight Chia Seeds with Berries & Walnuts',
    ],
    italian: [
      'Whole Wheat Pasta al Pomodoro & Fresh Basil',
      'Tuscan White Bean & Kale Soup',
      'Grilled Chicken Caprese with Balsamic Glaze',
      'Minestrone Vegetable Medley with Parmesan',
      'Ricotta & Spinach Whole Grain Toast',
      'Espresso with Steamed Almond Milk & Walnuts',
    ],
    japanese: [
      'Grilled Salmon Teriyaki with Brown Rice',
      'Miso Glazed Tofu & Steamed Bok Choy',
      'Chicken Yakitori Skewers with Edamame',
      'Seaweed & Cucumber Sunomono Salad',
      'Poached Eggs over Dashi Rice with Furikake',
      'Matcha Green Tea with Rice Crackers',
    ],
  };

  return dishes[cuisine] || dishes.mediterranean;
}

/**
 * Initializes or loads the 90-day nutrition and calorie log
 */
export function getOrInitialize90DayLogs(
  profile: UserProfile,
  bmiResult: BmiResult,
  currentLoggedFoods: LoggedFood[] = []
): DailyNutritionLog[] {
  let savedLogs: DailyNutritionLog[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      savedLogs = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse 90-day logs from storage', e);
  }

  const today = new Date();
  const todayKey = formatDateKey(today);
  const sampleDishes = getSampleDishesForCuisine(profile.selectedCuisine || 'mediterranean');
  const targetCals = bmiResult.targetCalories || 2000;
  const targetProtein = bmiResult.macros.proteinGrams || 130;
  const targetCarbs = bmiResult.macros.carbsGrams || 220;
  const targetFats = bmiResult.macros.fatsGrams || 65;
  const targetFiber = bmiResult.macros.fiberGrams || 28;

  // Build map of existing logs by date
  const logsMap = new Map<string, DailyNutritionLog>();
  if (Array.isArray(savedLogs)) {
    savedLogs.forEach((item) => {
      if (item && item.date) {
        logsMap.set(item.date, item);
      }
    });
  }

  // Ensure all 90 days (from day -89 to day 0) are populated
  const generatedLogs: DailyNutritionLog[] = [];

  for (let i = 89; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = formatDateKey(d);
    const dayLabel = formatDayLabel(d);

    if (i === 0) {
      // TODAY: Compute from active live logged foods
      const liveCals = currentLoggedFoods.reduce((sum, f) => sum + f.calories, 0);
      const liveProtein = currentLoggedFoods.reduce((sum, f) => sum + f.protein, 0);
      const liveCarbs = currentLoggedFoods.reduce((sum, f) => sum + f.carbs, 0);
      const liveFats = currentLoggedFoods.reduce((sum, f) => sum + f.fats, 0);
      const liveFiber = currentLoggedFoods.reduce((sum, f) => sum + f.fiber, 0);

      let status: DailyNutritionLog['status'] = 'optimal';
      const deltaPercent = (liveCals - targetCals) / targetCals;
      if (deltaPercent < -0.15) status = 'deficit';
      else if (deltaPercent > 0.1) status = 'surplus';
      else status = 'optimal';

      generatedLogs.push({
        date: dateKey,
        dayLabel,
        caloriesConsumed: liveCals,
        caloriesTarget: targetCals,
        protein: Math.round(liveProtein),
        carbs: Math.round(liveCarbs),
        fats: Math.round(liveFats),
        fiber: Math.round(liveFiber),
        waterMl: profile.waterGoalMl || 2200,
        status,
        loggedMealsCount: currentLoggedFoods.length,
        foodsSummary:
          currentLoggedFoods.length > 0
            ? currentLoggedFoods.map((f) => f.foodName)
            : ['Log meals above to record intake'],
        notes: currentLoggedFoods.length > 0 ? 'Live intake logged today' : 'In progress',
      });
    } else if (logsMap.has(dateKey)) {
      // Use existing saved historical log
      generatedLogs.push(logsMap.get(dateKey)!);
    } else {
      // Seed realistic historical entry with natural variance (±5% to ±10%)
      const seed = Math.sin(i * 1.618);
      const varianceFactor = 1 + seed * 0.08; // 0.92 to 1.08
      const dayCalories = Math.round(targetCals * varianceFactor);
      const dayProtein = Math.round(targetProtein * (1 + seed * 0.06));
      const dayCarbs = Math.round(targetCarbs * (1 + seed * 0.09));
      const dayFats = Math.round(targetFats * (1 + seed * 0.07));
      const dayFiber = Math.max(18, Math.round(targetFiber * (1 + seed * 0.05)));

      let status: DailyNutritionLog['status'] = 'optimal';
      if (dayCalories > targetCals + 120) status = 'surplus';
      else if (dayCalories < targetCals - 150) status = 'deficit';

      const pickedDishes = [
        sampleDishes[i % sampleDishes.length],
        sampleDishes[(i + 2) % sampleDishes.length],
        sampleDishes[(i + 4) % sampleDishes.length],
      ];

      generatedLogs.push({
        date: dateKey,
        dayLabel,
        caloriesConsumed: dayCalories,
        caloriesTarget: targetCals,
        protein: dayProtein,
        carbs: dayCarbs,
        fats: dayFats,
        fiber: dayFiber,
        waterMl: Math.round(1800 + Math.abs(seed) * 800),
        status,
        loggedMealsCount: 4 + (i % 3),
        foodsSummary: pickedDishes,
        notes: status === 'optimal' ? 'Met target calorie budget' : `${status.toUpperCase()} day`,
      });
    }
  }

  // Persist updated list
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedLogs));
  } catch (err) {
    console.error('Could not save 90-day logs', err);
  }

  return generatedLogs;
}

/**
 * Updates today's entry in the 90-day log with live foods
 */
export function updateTodayLogWithFoods(
  existingLogs: DailyNutritionLog[],
  loggedFoods: LoggedFood[],
  targetCalories: number,
  waterMl: number
): DailyNutritionLog[] {
  const todayKey = formatDateKey(new Date());
  const liveCals = loggedFoods.reduce((sum, f) => sum + f.calories, 0);
  const liveProtein = loggedFoods.reduce((sum, f) => sum + f.protein, 0);
  const liveCarbs = loggedFoods.reduce((sum, f) => sum + f.carbs, 0);
  const liveFats = loggedFoods.reduce((sum, f) => sum + f.fats, 0);
  const liveFiber = loggedFoods.reduce((sum, f) => sum + f.fiber, 0);

  let status: DailyNutritionLog['status'] = 'optimal';
  const delta = liveCals - targetCalories;
  if (delta < -200) status = 'deficit';
  else if (delta > 200) status = 'surplus';

  const updated = existingLogs.map((entry) => {
    if (entry.date === todayKey) {
      return {
        ...entry,
        caloriesConsumed: liveCals,
        caloriesTarget: targetCalories,
        protein: Math.round(liveProtein),
        carbs: Math.round(liveCarbs),
        fats: Math.round(liveFats),
        fiber: Math.round(liveFiber),
        waterMl,
        status,
        loggedMealsCount: loggedFoods.length,
        foodsSummary: loggedFoods.map((f) => f.foodName),
        notes: loggedFoods.length > 0 ? `Logged ${loggedFoods.length} meal items` : 'No meals recorded yet today',
      };
    }
    return entry;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  return updated;
}

/**
 * Exports 90-day log as CSV
 */
export function export90DayLogsToCSV(logs: DailyNutritionLog[]): void {
  const headers = [
    'Date',
    'Day',
    'Calories Consumed (kcal)',
    'Target Budget (kcal)',
    'Calorie Difference (kcal)',
    'Protein (g)',
    'Carbohydrates (g)',
    'Fats (g)',
    'Fiber (g)',
    'Water (ml)',
    'Status',
    'Meals Count',
    'Sample Foods',
  ];

  const rows = logs.map((log) => [
    log.date,
    `"${log.dayLabel}"`,
    log.caloriesConsumed,
    log.caloriesTarget,
    log.caloriesConsumed - log.caloriesTarget,
    log.protein,
    log.carbs,
    log.fats,
    log.fiber,
    log.waterMl,
    log.status,
    log.loggedMealsCount,
    `"${(log.foodsSummary || []).join('; ')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `nutritrack_90_day_nutrition_log_${formatDateKey(new Date())}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports 90-day log as JSON
 */
export function export90DayLogsToJSON(logs: DailyNutritionLog[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `nutritrack_90_day_nutrition_log_${formatDateKey(new Date())}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
