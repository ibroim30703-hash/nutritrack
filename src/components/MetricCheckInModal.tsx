import React, { useState } from 'react';
import {
  Calendar,
  Scale,
  Sparkles,
  TrendingDown,
  TrendingUp,
  X,
  CheckCircle2,
  Info,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { UserProfile, BmiResult, MetricCheckIn } from '../types/nutrition';
import { calculateBmiAndMetabolism, kgToLbs, lbsToKg } from '../utils/calculations';

interface MetricCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  bmiResult: BmiResult;
  lastCheckIn?: MetricCheckIn;
  onCompleteCheckIn: (newCheckIn: MetricCheckIn) => void;
}

export const MetricCheckInModal: React.FC<MetricCheckInModalProps> = ({
  isOpen,
  onClose,
  profile,
  bmiResult,
  lastCheckIn,
  onCompleteCheckIn,
}) => {
  const [weightKg, setWeightKg] = useState<number>(profile.weightKg || 70);
  const [waistCm, setWaistCm] = useState<number>(lastCheckIn?.waistCm || 80);
  const [bodyFat, setBodyFat] = useState<string>(
    lastCheckIn?.bodyFatPercent ? String(lastCheckIn.bodyFatPercent) : ''
  );
  const [notes, setNotes] = useState<string>('Weekly routine check-in');

  if (!isOpen) return null;

  // Real-time recalculation of preview BMI
  const preview = calculateBmiAndMetabolism({
    ...profile,
    weightKg: Number(weightKg) || profile.weightKg,
  });

  const prevWeight = lastCheckIn?.weightKg ?? profile.weightKg;
  const prevBmi = lastCheckIn?.bmi ?? bmiResult.bmi;

  const weightDelta = Math.round((Number(weightKg) - prevWeight) * 10) / 10;
  const bmiDelta = Math.round((preview.bmi - prevBmi) * 10) / 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCheckIn: MetricCheckIn = {
      id: `checkin_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      weightKg: Number(weightKg),
      heightCm: profile.heightCm,
      bmi: preview.bmi,
      bmiCategory: preview.category,
      waistCm: waistCm ? Number(waistCm) : undefined,
      bodyFatPercent: bodyFat ? Number(bodyFat) : undefined,
      notes,
    };

    onCompleteCheckIn(finalCheckIn);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                  7-Day Metric Check-in
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  Weekly Update
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Upload your metrics every 7 days to update your BMI and receive your Health Dynamics Update.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Previous Check-in Reference Banner */}
          {lastCheckIn && (
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                  Last Recorded Check-in ({lastCheckIn.date})
                </span>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {lastCheckIn.weightKg} kg · BMI {lastCheckIn.bmi} ({lastCheckIn.bmiCategory})
                </span>
              </div>
              <span className="text-[10px] bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
                7 Days Ago
              </span>
            </div>
          )}

          {/* Weight Input */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Current Body Weight ({profile.unitSystem === 'metric' ? 'kg' : 'lbs'}) *
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="25"
                max="350"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-semibold border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
              <span className="absolute right-3 top-2.5 text-xs text-neutral-400 font-medium">
                {profile.unitSystem === 'metric' ? 'kg' : 'lbs'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1">
              {profile.unitSystem === 'metric'
                ? `Equivalent to ~${kgToLbs(weightKg)} lbs`
                : `Equivalent to ~${lbsToKg(weightKg)} kg`}
            </p>
          </div>

          {/* Optional Waist & Body Fat */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Waist Circumference (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waistCm}
                onChange={(e) => setWaistCm(parseFloat(e.target.value) || 0)}
                placeholder="e.g. 82"
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                Body Fat % (Optional)
              </label>
              <input
                type="number"
                step="0.1"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                placeholder="e.g. 18.5"
                className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Check-in Notes & Observations
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Felt energized, followed 6-course schedule well..."
              className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Real-Time Recalculated Dynamics Preview Box */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Live Recalculated BMI Preview
              </span>
              <span className="font-bold text-emerald-800 dark:text-emerald-300">
                {preview.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] text-neutral-400 block">New BMI</span>
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {preview.bmi}
                </span>
                <span className="text-[10px] font-bold block mt-0.5 text-emerald-600 dark:text-emerald-400">
                  {bmiDelta >= 0 ? `+${bmiDelta}` : bmiDelta} pts
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] text-neutral-400 block">7-Day Change</span>
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {weightDelta >= 0 ? `+${weightDelta}` : weightDelta} kg
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  vs last check-in
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] text-neutral-400 block">Updated Target</span>
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                  {preview.targetCalories}
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  kcal/day
                </span>
              </div>
            </div>
          </div>

          {/* Non-Clinical Advisory Notice */}
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              This update provides nutritional dynamics tracking. It does not provide medical or clinical advice. If you experience unexpected rapid weight loss, severe pain, or chronic fatigue, please visit a doctor.
            </span>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save & View Health Dynamics</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
