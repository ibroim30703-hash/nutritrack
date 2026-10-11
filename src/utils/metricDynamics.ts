import { MetricCheckIn, HealthDynamicsReport, UserProfile, BmiResult } from '../types/nutrition';
import { calculateBmiAndMetabolism } from './calculations';

const STORAGE_KEY = 'nutritrack_metric_checkins';

/**
 * Calculates days passed since a given date string (or timestamp)
 */
export function getDaysSinceDate(dateStrOrTs: string | number): number {
  const past = new Date(dateStrOrTs).getTime();
  const now = Date.now();
  const diffMs = now - past;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Initializes or loads metric check-ins from localStorage
 * Seeds 2 realistic past check-ins (14 days ago and 7 days ago) if none exist
 */
export function getOrInitializeMetricCheckIns(profile: UserProfile, bmiResult: BmiResult): MetricCheckIn[] {
  let list: MetricCheckIn[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      list = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load metric check-ins', e);
  }

  if (Array.isArray(list) && list.length > 0) {
    return list;
  }

  // Seed 2 realistic prior check-ins for rich health dynamics
  const now = new Date();

  // 14 days ago
  const date14 = new Date();
  date14.setDate(now.getDate() - 14);
  const wt14 = profile.weightKg + (profile.fitnessGoal.includes('lose') ? 1.4 : -0.8);
  const calc14 = calculateBmiAndMetabolism({ ...profile, weightKg: wt14 });

  // 7 days ago
  const date7 = new Date();
  date7.setDate(now.getDate() - 7);
  const wt7 = profile.weightKg + (profile.fitnessGoal.includes('lose') ? 0.7 : -0.4);
  const calc7 = calculateBmiAndMetabolism({ ...profile, weightKg: wt7 });

  const seeded: MetricCheckIn[] = [
    {
      id: `checkin_${date14.getTime()}`,
      date: date14.toISOString().split('T')[0],
      timestamp: date14.getTime(),
      weightKg: Math.round(wt14 * 10) / 10,
      heightCm: profile.heightCm,
      bmi: calc14.bmi,
      bmiCategory: calc14.category,
      waistCm: profile.gender === 'male' ? 88 : 76,
      notes: 'Baseline biometric check-in',
    },
    {
      id: `checkin_${date7.getTime()}`,
      date: date7.toISOString().split('T')[0],
      timestamp: date7.getTime(),
      weightKg: Math.round(wt7 * 10) / 10,
      heightCm: profile.heightCm,
      bmi: calc7.bmi,
      bmiCategory: calc7.category,
      waistCm: profile.gender === 'male' ? 87 : 75,
      notes: 'Weekly 7-day metric upload',
    },
  ];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  } catch (e) {
    console.error(e);
  }

  return seeded;
}

/**
 * Saves a new 7-day check-in
 */
export function saveMetricCheckIn(newCheckIn: MetricCheckIn): MetricCheckIn[] {
  let list = getOrInitializeMetricCheckIns(
    { weightKg: newCheckIn.weightKg, heightCm: newCheckIn.heightCm } as UserProfile,
    { bmi: newCheckIn.bmi } as BmiResult
  );
  list = [newCheckIn, ...list];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }
  return list;
}

/**
 * Evaluates health dynamics and generates the dynamics update report
 */
export function generateHealthDynamicsReport(
  history: MetricCheckIn[],
  currentProfile: UserProfile,
  currentBmiResult: BmiResult
): HealthDynamicsReport {
  const currentWeight = currentProfile.weightKg;
  const currentBmi = currentBmiResult.bmi;

  const previous = history.length > 0 ? history[0] : undefined;
  const previousWeight = previous?.weightKg ?? currentWeight;
  const previousBmi = previous?.bmi ?? currentBmi;

  const weightDeltaKg = Math.round((currentWeight - previousWeight) * 10) / 10;
  const bmiDelta = Math.round((currentBmi - previousBmi) * 10) / 10;

  const daysDiff = previous ? Math.max(1, getDaysSinceDate(previous.timestamp)) : 7;
  const weeklyVelocityKg = Math.round(((weightDeltaKg / daysDiff) * 7) * 10) / 10;

  let trend: HealthDynamicsReport['trend'] = 'steady';
  const isLossGoal = currentProfile.fitnessGoal.includes('lose');
  const isGainGoal = currentProfile.fitnessGoal.includes('gain');

  if (isLossGoal) {
    if (weightDeltaKg < 0) trend = 'improving';
    else if (weightDeltaKg > 0.5) trend = 'needs_adjustment';
  } else if (isGainGoal) {
    if (weightDeltaKg > 0) trend = 'improving';
    else if (weightDeltaKg < -0.5) trend = 'needs_adjustment';
  } else {
    // maintenance
    if (Math.abs(weightDeltaKg) <= 0.8) trend = 'improving';
    else trend = 'needs_adjustment';
  }

  let summary = '';
  if (isLossGoal) {
    if (weightDeltaKg < 0) {
      summary = `Excellent progress! Over the last ${daysDiff} days, your weight reduced by ${Math.abs(weightDeltaKg)} kg (${Math.abs(weeklyVelocityKg)} kg/week rate). Your BMI improved from ${previousBmi} to ${currentBmi}.`;
    } else if (weightDeltaKg === 0) {
      summary = `Your weight remained steady at ${currentWeight} kg over the last ${daysDiff} days. This indicates metabolic stabilization before your next fat adaptation phase.`;
    } else {
      summary = `Your weight fluctuated by +${weightDeltaKg} kg over the last ${daysDiff} days. This can be normal water retention or glycogen replenishment. We recommend slightly increasing hydration and reviewing evening supper portions.`;
    }
  } else {
    summary = `Your current BMI is ${currentBmi} (${currentBmiResult.category}). Over the last ${daysDiff} days, your weight shift is ${weightDeltaKg >= 0 ? '+' : ''}${weightDeltaKg} kg.`;
  }

  const positiveHighlights = [
    `Consistent 7-day metric tracking maintains accountability and metabolic awareness.`,
    `BMI is currently ${currentBmi} (${currentBmiResult.category}) with a baseline target of ${currentBmiResult.targetCalories} kcal/day.`,
    `Hydration intake target of ${currentProfile.waterGoalMl || 2200} ml supports kidney and metabolic efficiency.`,
  ];

  const dietaryRecommendations = [
    isLossGoal
      ? `Prioritize lean protein (e.g. 25-30g per meal) to protect muscle mass during your caloric deficit.`
      : `Distribute complex carbohydrates around workouts for optimal glycogen storage.`,
    `Emphasize whole foods rich in dietary fiber (target: ${currentBmiResult.macros.fiberGrams}g/day) to support digestion and steady energy.`,
    `Maintain scheduled meal timings with healthy snacks in between to prevent late-night cravings.`,
  ];

  const lifestyleTips = [
    `Upload your metrics every 7 days at the same time (ideally morning before breakfast) for consistent trend accuracy.`,
    `Combine daily step activity (7,000–10,000 steps) with 2–3 resistance sessions weekly.`,
    `Ensure 7–8 hours of quality sleep to optimize recovery and hormonal balance.`,
  ];

  return {
    currentBmi,
    previousBmi,
    bmiDelta,
    currentWeightKg: currentWeight,
    previousWeightKg: previousWeight,
    weightDeltaKg,
    weeklyVelocityKg,
    trend,
    daysTracked: daysDiff,
    summary,
    positiveHighlights,
    dietaryRecommendations,
    lifestyleTips,
    medicalDisclaimer:
      'Notice: This health dynamics update is for educational and wellness tracking purposes only and does not provide clinical or medical advice. If you experience serious health problems, unexplained rapid weight loss, chronic fatigue, or pain, please visit a doctor.',
  };
}
