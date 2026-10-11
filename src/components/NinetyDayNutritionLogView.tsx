import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Flame,
  Activity,
  Download,
  Search,
  Filter,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Droplets,
  Sparkles,
  Info,
  ChevronRight,
  ShieldAlert,
  ArrowUpDown,
  Utensils,
  Clock,
  Layers,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { DailyNutritionLog, UserProfile, BmiResult } from '../types/nutrition';
import { export90DayLogsToCSV, export90DayLogsToJSON } from '../utils/ninetyDayLogGenerator';

interface NinetyDayNutritionLogViewProps {
  logs: DailyNutritionLog[];
  profile: UserProfile;
  bmiResult: BmiResult;
  onNavigateTab?: (tab: string) => void;
}

export const NinetyDayNutritionLogView: React.FC<NinetyDayNutritionLogViewProps> = ({
  logs,
  profile,
  bmiResult,
  onNavigateTab,
}) => {
  const [timeframe, setTimeframe] = useState<'90' | '30' | '14' | '7'>('90');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<DailyNutritionLog | null>(null);

  // Filter logs by timeframe
  const timeframeFiltered = useMemo(() => {
    const days = parseInt(timeframe, 10);
    return logs.slice(-days);
  }, [logs, timeframe]);

  // Apply search query and status filter
  const displayedLogs = useMemo(() => {
    return timeframeFiltered.filter((log) => {
      const matchSearch =
        searchQuery === '' ||
        log.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.dayLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (log.foodsSummary && log.foodsSummary.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchStatus = statusFilter === 'all' || log.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [timeframeFiltered, searchQuery, statusFilter]);

  // Compute aggregate 90-day statistics
  const stats = useMemo(() => {
    if (timeframeFiltered.length === 0) {
      return { avgCals: 0, complianceRate: 0, avgProtein: 0, avgCarbs: 0, avgFats: 0, totalDeficitSurplus: 0 };
    }
    const totalCals = timeframeFiltered.reduce((sum, l) => sum + l.caloriesConsumed, 0);
    const totalProtein = timeframeFiltered.reduce((sum, l) => sum + l.protein, 0);
    const totalCarbs = timeframeFiltered.reduce((sum, l) => sum + l.carbs, 0);
    const totalFats = timeframeFiltered.reduce((sum, l) => sum + l.fats, 0);
    const optimalDays = timeframeFiltered.filter((l) => l.status === 'optimal').length;

    const targetSum = timeframeFiltered.reduce((sum, l) => sum + l.caloriesTarget, 0);
    const delta = totalCals - targetSum;

    return {
      avgCals: Math.round(totalCals / timeframeFiltered.length),
      complianceRate: Math.round((optimalDays / timeframeFiltered.length) * 100),
      avgProtein: Math.round(totalProtein / timeframeFiltered.length),
      avgCarbs: Math.round(totalCarbs / timeframeFiltered.length),
      avgFats: Math.round(totalFats / timeframeFiltered.length),
      totalDeficitSurplus: delta,
    };
  }, [timeframeFiltered]);

  // Prepare chart dataset
  const chartData = useMemo(() => {
    return timeframeFiltered.map((item) => ({
      date: item.dayLabel.replace(/^...,\s*/, ''),
      fullDate: item.date,
      calories: item.caloriesConsumed,
      target: item.caloriesTarget,
      protein: item.protein,
      carbs: item.carbs,
      fats: item.fats,
    }));
  }, [timeframeFiltered]);

  const targetCalorieBudget = bmiResult.targetCalories || 2000;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                  90-Day Calorie & Nutrition Intake Log
                </h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Full 90-Day History
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Comprehensive day-by-day record of calories, macronutrients, hydration, and goal compliance.
              </p>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => export90DayLogsToCSV(logs)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors cursor-pointer"
              title="Export complete 90-day intake logs to CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => export90DayLogsToJSON(logs)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-colors cursor-pointer"
              title="Export raw JSON dataset"
            >
              <Download className="w-3.5 h-3.5 text-teal-600" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Aggregate KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-2">
          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Avg Calories
            </span>
            <div className="text-lg sm:text-xl font-black text-neutral-900 dark:text-neutral-100 font-mono mt-0.5">
              {stats.avgCals}
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              kcal / day
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Adherence
            </span>
            <div className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {stats.complianceRate}%
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              days on track
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Avg Protein
            </span>
            <div className="text-lg sm:text-xl font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
              {stats.avgProtein}g
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              goal: {bmiResult.macros.proteinGrams}g
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Avg Carbs
            </span>
            <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              {stats.avgCarbs}g
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              goal: {bmiResult.macros.carbsGrams}g
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Avg Fats
            </span>
            <div className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
              {stats.avgFats}g
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              goal: {bmiResult.macros.fatsGrams}g
            </span>
          </div>

          <div className="p-3 sm:p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-750">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block truncate">
              Net Shift
            </span>
            <div className={`text-lg sm:text-xl font-black font-mono mt-0.5 ${
              stats.totalDeficitSurplus <= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
            }`}>
              {stats.totalDeficitSurplus >= 0 ? `+${stats.totalDeficitSurplus}` : stats.totalDeficitSurplus}
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block truncate">
              kcal shift
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive 90-Day Trend Area Chart */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Caloric Intake Trajectory vs Daily Target</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Visualizing daily calories consumed against your {targetCalorieBudget} kcal reference budget line.
            </p>
          </div>

          {/* Timeframe Selector Chips */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl self-start sm:self-auto text-xs font-semibold">
            {(['7', '14', '30', '90'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {tf === '90' ? 'Full 90 Days' : `${tf} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#888888' }} tickLine={false} />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 10, fill: '#888888' }}
                tickLine={false}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-neutral-900/90 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 backdrop-blur-xs">
                        <div className="font-bold text-neutral-300">{data.fullDate}</div>
                        <div className="text-emerald-400 font-bold text-sm">
                          {data.calories} kcal consumed
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Target: {data.target} kcal ({data.calories - data.target >= 0 ? '+' : ''}
                          {data.calories - data.target} kcal)
                        </div>
                        <div className="pt-1 border-t border-neutral-700 text-[10px] grid grid-cols-3 gap-2">
                          <span>P: {data.protein}g</span>
                          <span>C: {data.carbs}g</span>
                          <span>F: {data.fats}g</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={targetCalorieBudget}
                stroke="#64748b"
                strokeDasharray="4 4"
                label={{ value: 'Target Budget', position: 'top', fill: '#64748b', fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="calories"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#calGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Search, Filter & Daily History Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Daily Intake Log Records ({displayedLogs.length} Days)
            </h3>
            <p className="text-xs text-neutral-400">
              Inspect specific days, meal dishes, and exact macronutrient balances.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search date or food..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-44"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="optimal">On Track (Optimal)</option>
              <option value="deficit">Deficit Days</option>
              <option value="surplus">Surplus Days</option>
            </select>
          </div>
        </div>

        {/* Daily Log List */}
        <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
          {displayedLogs.map((log, idx) => {
            const isToday = idx === displayedLogs.length - 1 && timeframe === '90';
            const delta = log.caloriesConsumed - log.caloriesTarget;
            const isPositive = delta > 0;

            return (
              <div
                key={log.date}
                className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-750 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Date & Status */}
                <div className="space-y-1 min-w-0 md:min-w-[150px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      {log.dayLabel}
                    </span>
                    {log.date === new Date().toISOString().split('T')[0] && (
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        Today
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-mono block">
                    {log.date}
                  </span>
                  <div className="pt-0.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        log.status === 'optimal'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : log.status === 'deficit'
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {log.status === 'optimal' ? 'Target Met' : log.status === 'deficit' ? 'Calorie Deficit' : 'Calorie Surplus'}
                    </span>
                  </div>
                </div>

                {/* Calories & Progress */}
                <div className="min-w-0 md:min-w-[130px] space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                      {log.caloriesConsumed}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      / {log.caloriesTarget} kcal
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        log.status === 'optimal' ? 'bg-emerald-500' : log.status === 'surplus' ? 'bg-amber-500' : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min(100, (log.caloriesConsumed / log.caloriesTarget) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 block">
                    {isPositive ? `+${delta}` : delta} kcal difference
                  </span>
                </div>

                {/* Macronutrient Chips */}
                <div className="grid grid-cols-4 gap-1.5 sm:flex sm:items-center sm:gap-2 text-xs font-mono w-full md:w-auto">
                  <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center min-w-0 sm:min-w-[50px]">
                    <span className="text-[9px] text-neutral-400 block font-sans">Prot</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{log.protein}g</span>
                  </div>
                  <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center min-w-0 sm:min-w-[50px]">
                    <span className="text-[9px] text-neutral-400 block font-sans">Carb</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{log.carbs}g</span>
                  </div>
                  <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center min-w-0 sm:min-w-[50px]">
                    <span className="text-[9px] text-neutral-400 block font-sans">Fat</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">{log.fats}g</span>
                  </div>
                  <div className="p-1.5 px-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-center min-w-0 sm:min-w-[50px]">
                    <span className="text-[9px] text-neutral-400 block font-sans">Fiber</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">{log.fiber}g</span>
                  </div>
                </div>

                {/* Sample Foods Summary */}
                <div className="flex-1 min-w-0 text-xs space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Meals Recorded ({log.loggedMealsCount})
                  </span>
                  <p className="text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                    {(log.foodsSummary || []).join(' · ')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Non-Clinical Health Advisory Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Health & Medical Notice:</span>
          <span>
            This 90-day intake log is designed for personal nutritional awareness and lifestyle tracking. NutriTrack does not provide clinical or medical advice. If you have chronic conditions, nutritional deficiencies, or experience any serious health problems, please visit a qualified doctor or healthcare professional.
          </span>
        </div>
      </div>
    </div>
  );
};
