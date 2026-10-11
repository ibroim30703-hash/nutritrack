import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  AlertCircle,
  Pill,
  Sun,
  Apple,
} from 'lucide-react';
import { PlanMealSlot, UserProfile } from '../types/nutrition';
import { calculateDailyVitaminIntake, VitaminIntakeReportItem } from '../utils/nutritionCalculator';

interface DailyVitaminCounterCardProps {
  meals: PlanMealSlot[];
  profile: UserProfile;
}

export const DailyVitaminCounterCard: React.FC<DailyVitaminCounterCardProps> = ({
  meals,
  profile,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'vitamin' | 'mineral'>('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const { items, overallScore, optimalCount } = calculateDailyVitaminIntake(meals, profile);

  const filteredItems = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.category === filterType;
  });

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-xs space-y-4">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Daily Vitamin & Micronutrient Counter
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300">
                RDA Tracking
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Real-time micronutrient coverage computed across all 6 prescribed daily courses
            </p>
          </div>
        </div>

        {/* Status Score Badge & Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-right">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
              {overallScore}% RDA Met
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
              {optimalCount} of {items.length} Optimal
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg cursor-pointer"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs font-medium self-start sm:self-auto w-fit">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              All 13 Nutrients
            </button>
            <button
              type="button"
              onClick={() => setFilterType('vitamin')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filterType === 'vitamin'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Essential Vitamins
            </button>
            <button
              type="button"
              onClick={() => setFilterType('mineral')}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filterType === 'mineral'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Vital Minerals
            </button>
          </div>

          {/* Vitamin Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => {
              const isOptimal = item.percentRda >= 90;
              const isAdequate = item.percentRda >= 65 && item.percentRda < 90;

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850/60 space-y-2 hover:border-purple-300 dark:hover:border-purple-800 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 capitalize ml-1.5">
                        ({item.category})
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isOptimal
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : isAdequate
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {item.percentRda}% RDA
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-200 dark:bg-neutral-750 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOptimal
                          ? 'bg-emerald-500'
                          : isAdequate
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, item.percentRda)}%` }}
                    />
                  </div>

                  {/* Daily Intake vs Target */}
                  <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-neutral-600 dark:text-neutral-400">
                    <span>
                      Daily: <strong className="text-neutral-900 dark:text-neutral-100">{item.dailyTotal}</strong> {item.unit}
                    </span>
                    <span>
                      RDA: {item.rda} {item.unit}
                    </span>
                  </div>

                  {/* Top Food Sources */}
                  <div className="text-[10px] text-neutral-500 truncate pt-1 border-t border-neutral-100 dark:border-neutral-800">
                    <span className="font-semibold text-neutral-600 dark:text-neutral-400">Top Sources: </span>
                    <span>{item.topSources.join(', ')}</span>
                  </div>

                  {/* Health Benefit */}
                  <div className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-50/60 dark:bg-purple-950/40 p-1.5 rounded-md leading-tight">
                    {item.benefit}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
