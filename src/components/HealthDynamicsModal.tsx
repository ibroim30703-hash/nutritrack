import React from 'react';
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  Calendar,
  X,
  ShieldAlert,
  ArrowRight,
  Flame,
  Droplets,
  Heart,
  FileText,
} from 'lucide-react';
import { HealthDynamicsReport, MetricCheckIn } from '../types/nutrition';

interface HealthDynamicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: HealthDynamicsReport | null;
  history: MetricCheckIn[];
}

export const HealthDynamicsModal: React.FC<HealthDynamicsModalProps> = ({
  isOpen,
  onClose,
  report,
  history,
}) => {
  if (!isOpen || !report) return null;

  const isWeightReduced = report.weightDeltaKg < 0;
  const isWeightGained = report.weightDeltaKg > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-2xl w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-xs">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">
                  Health Dynamics Update
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/25 backdrop-blur-xs uppercase tracking-wider">
                  7-Day Cycle
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Biometric velocity, BMI progression, and metabolic guidance across your 7-day window.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Key Metrics Dynamics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Weight Delta */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                7-Day Weight
              </span>
              <div className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {report.currentWeightKg} kg
              </div>
              <div className={`text-xs font-bold flex items-center gap-1 ${
                isWeightReduced ? 'text-emerald-600 dark:text-emerald-400' : isWeightGained ? 'text-amber-600 dark:text-amber-400' : 'text-neutral-500'
              }`}>
                {isWeightReduced ? <TrendingDown className="w-3.5 h-3.5" /> : isWeightGained ? <TrendingUp className="w-3.5 h-3.5" /> : null}
                <span>{report.weightDeltaKg >= 0 ? `+${report.weightDeltaKg}` : report.weightDeltaKg} kg</span>
              </div>
            </div>

            {/* 2. BMI Shift */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Updated BMI
              </span>
              <div className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {report.currentBmi}
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {report.bmiDelta >= 0 ? `+${report.bmiDelta}` : report.bmiDelta} pts shift
              </div>
            </div>

            {/* 3. Weekly Velocity */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Weekly Velocity
              </span>
              <div className="text-xl font-black text-neutral-900 dark:text-neutral-100 font-mono">
                {report.weeklyVelocityKg >= 0 ? `+${report.weeklyVelocityKg}` : report.weeklyVelocityKg}
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">
                kg / 7-day rate
              </div>
            </div>

            {/* 4. Dynamics Status */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Overall Trend
              </span>
              <div className="text-sm font-black uppercase text-emerald-600 dark:text-emerald-400 mt-1">
                {report.trend === 'improving' ? 'On Track' : report.trend === 'steady' ? 'Stabilized' : 'Reviewing'}
              </div>
              <div className="text-[10px] text-neutral-500">
                {report.daysTracked} days evaluated
              </div>
            </div>
          </div>

          {/* Dynamic Summary Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Metabolic Velocity Analysis</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* 7-Day Metric Check-in Timeline */}
          {history.length > 0 && (
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-750 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Recent Check-in Timeline
                </span>
                <span className="text-[11px] text-neutral-400">
                  {history.length} weekly records
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {history.slice(0, 3).map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {item.date}
                      </span>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          Latest
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-black font-mono text-neutral-900 dark:text-neutral-100">
                      {item.weightKg} kg · BMI {item.bmi}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      {item.bmiCategory}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Positive Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Positive Observations</span>
            </h4>
            <div className="space-y-1.5">
              {report.positiveHighlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming 7-Day Dietary Recommendations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Recommended Dietary Focus for the Next 7 Days</span>
            </h4>
            <div className="space-y-1.5">
              {report.dietaryRecommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-white dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700/80 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2"
                >
                  <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Clinical Advisory & Doctor Consultation Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Medical & Health Notice</span>
            </div>
            <p className="text-[11px]">
              {report.medicalDisclaimer}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-850 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            Next 7-day metric check-in scheduled in 7 days
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Acknowledge & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
