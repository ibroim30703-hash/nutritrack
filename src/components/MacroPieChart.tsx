import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Target, PieChart as PieIcon, Flame, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { BmiResult, LoggedFood } from '../types/nutrition';

interface MacroPieChartProps {
  bmiResult: BmiResult;
  loggedFoods: LoggedFood[];
  onNavigateTracker?: () => void;
  onQuickLogFood?: () => void;
}

const MACRO_COLORS = {
  protein: {
    base: '#10b981', // emerald-500
    hover: '#059669',
    light: 'rgba(16, 185, 129, 0.15)',
    border: 'border-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-400',
    bgBadge: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
  },
  carbs: {
    base: '#f59e0b', // amber-500
    hover: '#d97706',
    light: 'rgba(245, 158, 11, 0.15)',
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    bgBadge: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
  },
  fats: {
    base: '#3b82f6', // blue-500
    hover: '#2563eb',
    light: 'rgba(59, 130, 246, 0.15)',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-400',
    bgBadge: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
  },
};

export const MacroPieChart: React.FC<MacroPieChartProps> = ({
  bmiResult,
  loggedFoods,
  onNavigateTracker,
  onQuickLogFood,
}) => {
  const [viewMode, setViewMode] = useState<'comparison' | 'consumed' | 'target'>('comparison');

  // Compute consumed totals
  const consumedProtein = Math.round(loggedFoods.reduce((sum, item) => sum + item.protein, 0));
  const consumedCarbs = Math.round(loggedFoods.reduce((sum, item) => sum + item.carbs, 0));
  const consumedFats = Math.round(loggedFoods.reduce((sum, item) => sum + item.fats, 0));
  const consumedCalories = loggedFoods.reduce((sum, item) => sum + item.calories, 0);

  // Targets
  const targetProtein = bmiResult.macros.proteinGrams || 140;
  const targetCarbs = bmiResult.macros.carbsGrams || 180;
  const targetFats = bmiResult.macros.fatsGrams || 55;
  const targetCalories = bmiResult.targetCalories || 2000;

  // Grams total for consumed (avoid 0 divide)
  const totalConsumedGrams = consumedProtein + consumedCarbs + consumedFats;
  const hasConsumedData = totalConsumedGrams > 0;

  // Caloric contributions from macros (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fats: 9 kcal/g)
  const proteinKcal = consumedProtein * 4;
  const carbsKcal = consumedCarbs * 4;
  const fatsKcal = consumedFats * 9;

  // Target Caloric contributions
  const targetProteinKcal = targetProtein * 4;
  const targetCarbsKcal = targetCarbs * 4;
  const targetFatsKcal = targetFats * 9;

  // Percentage of target achieved
  const proteinProgress = Math.min(200, Math.round((consumedProtein / targetProtein) * 100));
  const carbsProgress = Math.min(200, Math.round((consumedCarbs / targetCarbs) * 100));
  const fatsProgress = Math.min(200, Math.round((consumedFats / targetFats) * 100));

  // Consumed pie data (in grams)
  const consumedPieData = hasConsumedData
    ? [
        {
          name: 'Protein',
          value: consumedProtein,
          calories: proteinKcal,
          target: targetProtein,
          color: MACRO_COLORS.protein.base,
          type: 'protein',
        },
        {
          name: 'Carbohydrates',
          value: consumedCarbs,
          calories: carbsKcal,
          target: targetCarbs,
          color: MACRO_COLORS.carbs.base,
          type: 'carbs',
        },
        {
          name: 'Healthy Fats',
          value: consumedFats,
          calories: fatsKcal,
          target: targetFats,
          color: MACRO_COLORS.fats.base,
          type: 'fats',
        },
      ]
    : [
        // Placeholder when zero foods logged
        {
          name: 'Target Protein (Goal)',
          value: targetProtein,
          calories: targetProteinKcal,
          target: targetProtein,
          color: 'rgba(16, 185, 129, 0.4)',
          type: 'protein',
        },
        {
          name: 'Target Carbs (Goal)',
          value: targetCarbs,
          calories: targetCarbsKcal,
          target: targetCarbs,
          color: 'rgba(245, 158, 11, 0.4)',
          type: 'carbs',
        },
        {
          name: 'Target Fats (Goal)',
          value: targetFats,
          calories: targetFatsKcal,
          target: targetFats,
          color: 'rgba(59, 130, 246, 0.4)',
          type: 'fats',
        },
      ];

  // Target pie data
  const targetPieData = [
    {
      name: 'Target Protein',
      value: targetProtein,
      calories: targetProteinKcal,
      target: targetProtein,
      color: MACRO_COLORS.protein.base,
      type: 'protein',
    },
    {
      name: 'Target Carbohydrates',
      value: targetCarbs,
      calories: targetCarbsKcal,
      target: targetCarbs,
      color: MACRO_COLORS.carbs.base,
      type: 'carbs',
    },
    {
      name: 'Target Healthy Fats',
      value: targetFats,
      calories: targetFatsKcal,
      target: targetFats,
      color: MACRO_COLORS.fats.base,
      type: 'fats',
    },
  ];

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const macroType = data.type as 'protein' | 'carbs' | 'fats';
      const targetVal = data.target;
      const pctOfTarget = Math.round((data.value / (targetVal || 1)) * 100);

      return (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-xl p-3.5 text-xs space-y-1.5 min-w-[180px] z-50">
          <div className="flex items-center justify-between font-bold border-b border-neutral-100 dark:border-neutral-800 pb-1.5">
            <span className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              {data.name}
            </span>
            <span className="font-mono text-neutral-500 dark:text-neutral-400">
              {data.value}g
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
            <span>Energy Value:</span>
            <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
              {data.calories} kcal
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600 dark:text-neutral-300">
            <span>Daily Target:</span>
            <span className="font-mono text-neutral-500 dark:text-neutral-400">
              {targetVal}g
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100 dark:border-neutral-800 text-[11px]">
            <span className="text-neutral-500">Target Progress:</span>
            <span
              className={`font-semibold font-mono ${
                pctOfTarget >= 100
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {pctOfTarget}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-xs space-y-6">
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <PieIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Daily Macronutrient Distribution
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Real-time breakdown of consumed Protein, Carbohydrates, and Fats plotted against your daily nutrition targets.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="grid grid-cols-3 sm:flex w-full sm:w-auto p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-[11px] sm:text-xs font-medium gap-0.5">
          <button
            type="button"
            onClick={() => setViewMode('comparison')}
            className={`px-1.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center truncate ${
              viewMode === 'comparison'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Comparison
          </button>
          <button
            type="button"
            onClick={() => setViewMode('consumed')}
            className={`px-1.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center truncate ${
              viewMode === 'consumed'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Consumed
          </button>
          <button
            type="button"
            onClick={() => setViewMode('target')}
            className={`px-1.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center truncate ${
              viewMode === 'target'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            Target Budget
          </button>
        </div>
      </div>

      {/* Main Content: Chart on the left, Macro Progress Cards on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Recharts Pie / Donut Canvas */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="w-full h-64 sm:h-72 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'comparison' ? (
                /* Dual Concentric Donut: Outer ring = Target Budget, Inner ring = Consumed Today */
                <PieChart>
                  {/* Outer Ring: Daily Target Allocation */}
                  <Pie
                    data={targetPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={76}
                    outerRadius={95}
                    paddingAngle={3}
                    stroke="none"
                    opacity={0.35}
                  >
                    {targetPieData.map((entry, index) => (
                      <Cell key={`target-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  {/* Inner Ring: Consumed Intake */}
                  <Pie
                    data={consumedPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={70}
                    paddingAngle={hasConsumedData ? 4 : 0}
                    stroke="none"
                  >
                    {consumedPieData.map((entry, index) => (
                      <Cell
                        key={`consumed-cell-${index}`}
                        fill={entry.color}
                        stroke="currentColor"
                        strokeWidth={1}
                        className="dark:stroke-neutral-900 stroke-white"
                      />
                    ))}
                  </Pie>

                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : viewMode === 'consumed' ? (
                /* Single Donut: Consumed Only */
                <PieChart>
                  <Pie
                    data={consumedPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={hasConsumedData ? 4 : 0}
                    stroke="none"
                  >
                    {consumedPieData.map((entry, index) => (
                      <Cell
                        key={`consumed-single-${index}`}
                        fill={entry.color}
                        stroke="currentColor"
                        strokeWidth={1}
                        className="dark:stroke-neutral-900 stroke-white"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : (
                /* Single Donut: Target Budget Only */
                <PieChart>
                  <Pie
                    data={targetPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {targetPieData.map((entry, index) => (
                      <Cell
                        key={`target-single-${index}`}
                        fill={entry.color}
                        stroke="currentColor"
                        strokeWidth={1}
                        className="dark:stroke-neutral-900 stroke-white"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              )}
            </ResponsiveContainer>

            {/* Center Donut Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-2">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
                {viewMode === 'target' ? 'Daily Target' : 'Consumed'}
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums leading-tight">
                {viewMode === 'target' ? targetCalories : consumedCalories}
              </span>
              <span className="text-[11px] text-neutral-400">kcal</span>
              {viewMode === 'comparison' && (
                <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded-full mt-0.5">
                  / {targetCalories}
                </span>
              )}
            </div>
          </div>

          {/* Concentric Legend Indicator */}
          {viewMode === 'comparison' && (
            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Inner ring: Consumed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500" />
                <span>Outer ring: Target Goal</span>
              </div>
            </div>
          )}

          {!hasConsumedData && (
            <div className="mt-2 text-center text-xs text-neutral-400 flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800/60 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>No meals logged yet today. Displaying target baseline.</span>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Macronutrient Progress Cards */}
        <div className="lg:col-span-7 space-y-3.5">
          {/* 1. Protein Metric Card */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850/60 space-y-2.5 transition-all hover:border-emerald-300 dark:hover:border-emerald-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Protein
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  (4 kcal/g)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-neutral-900 dark:text-neutral-100">
                  {consumedProtein}g <span className="text-neutral-400 font-normal">/ {targetProtein}g</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    proteinProgress >= 100
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                      : 'bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {proteinProgress}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-750 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, proteinProgress)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>
                Energy: <strong className="text-neutral-800 dark:text-neutral-200">{proteinKcal} kcal</strong> ({hasConsumedData ? Math.round((proteinKcal / (consumedCalories || 1)) * 100) : bmiResult.macros.proteinPercent}% of calories)
              </span>
              <span>
                {consumedProtein >= targetProtein ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Target Met (+{consumedProtein - targetProtein}g)
                  </span>
                ) : (
                  <span>Remaining: <strong>{targetProtein - consumedProtein}g</strong></span>
                )}
              </span>
            </div>
          </div>

          {/* 2. Carbohydrates Metric Card */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850/60 space-y-2.5 transition-all hover:border-amber-300 dark:hover:border-amber-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Carbohydrates
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  (4 kcal/g)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-neutral-900 dark:text-neutral-100">
                  {consumedCarbs}g <span className="text-neutral-400 font-normal">/ {targetCarbs}g</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    carbsProgress >= 100
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                      : 'bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {carbsProgress}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-750 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, carbsProgress)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>
                Energy: <strong className="text-neutral-800 dark:text-neutral-200">{carbsKcal} kcal</strong> ({hasConsumedData ? Math.round((carbsKcal / (consumedCalories || 1)) * 100) : bmiResult.macros.carbsPercent}% of calories)
              </span>
              <span>
                {consumedCarbs >= targetCarbs ? (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Budget Reached (+{consumedCarbs - targetCarbs}g)
                  </span>
                ) : (
                  <span>Remaining: <strong>{targetCarbs - consumedCarbs}g</strong></span>
                )}
              </span>
            </div>
          </div>

          {/* 3. Healthy Fats Metric Card */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850/60 space-y-2.5 transition-all hover:border-blue-300 dark:hover:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Healthy Fats
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  (9 kcal/g)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-neutral-900 dark:text-neutral-100">
                  {consumedFats}g <span className="text-neutral-400 font-normal">/ {targetFats}g</span>
                </span>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    fatsProgress >= 100
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-neutral-200/80 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {fatsProgress}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-200 dark:bg-neutral-750 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, fatsProgress)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
              <span>
                Energy: <strong className="text-neutral-800 dark:text-neutral-200">{fatsKcal} kcal</strong> ({hasConsumedData ? Math.round((fatsKcal / (consumedCalories || 1)) * 100) : bmiResult.macros.fatsPercent}% of calories)
              </span>
              <span>
                {consumedFats >= targetFats ? (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3 h-3" /> Budget Reached (+{consumedFats - targetFats}g)
                  </span>
                ) : (
                  <span>Remaining: <strong>{targetFats - consumedFats}g</strong></span>
                )}
              </span>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target: {bmiResult.macros.proteinPercent}% P · {bmiResult.macros.carbsPercent}% C · {bmiResult.macros.fatsPercent}% F</span>
            </span>

            <div className="flex items-center gap-2">
              {onQuickLogFood && (
                <button
                  type="button"
                  onClick={onQuickLogFood}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Food</span>
                </button>
              )}
              {onNavigateTracker && (
                <button
                  type="button"
                  onClick={onNavigateTracker}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Detailed Calorie Tracker &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
