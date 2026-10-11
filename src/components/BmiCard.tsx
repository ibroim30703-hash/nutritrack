import React from 'react';
import {
  Heart,
  Scale,
  Zap,
  Flame,
  Droplets,
  Edit3,
} from 'lucide-react';
import { UserProfile, BmiResult, AppLanguage } from '../types/nutrition';
import { kgToLbs } from '../utils/calculations';

interface BmiCardProps {
  profile: UserProfile;
  bmiResult: BmiResult;
  onEditProfile: () => void;
  language?: AppLanguage;
}

export const BmiCard: React.FC<BmiCardProps> = ({
  profile,
  bmiResult,
  onEditProfile,
  language = 'en',
}) => {
  // BMI scale percentage for visual gauge: min 15 to max 40
  const minScale = 14;
  const maxScale = 42;
  const clampedBmi = Math.min(Math.max(bmiResult.bmi, minScale), maxScale);
  const needlePercent = ((clampedBmi - minScale) / (maxScale - minScale)) * 100;

  const isMetric = profile.unitSystem === 'metric';
  const displayWeight = isMetric
    ? `${profile.weightKg} kg`
    : `${kgToLbs(profile.weightKg)} lbs`;
  const displayTarget = isMetric
    ? `${profile.targetWeightKg} kg`
    : `${kgToLbs(profile.targetWeightKg)} lbs`;
  const minIdeal = isMetric
    ? `${bmiResult.idealWeightRange.minKg} kg`
    : `${kgToLbs(bmiResult.idealWeightRange.minKg)} lbs`;
  const maxIdeal = isMetric
    ? `${bmiResult.idealWeightRange.maxKg} kg`
    : `${kgToLbs(bmiResult.idealWeightRange.maxKg)} lbs`;

  // Localized Labels Dictionary
  const cardTexts: Record<
    AppLanguage,
    {
      title: string;
      modelDesc: string;
      updateMetrics: string;
      idealRange: string;
      under: string;
      obese: string;
      ageSex: string;
      height: string;
      currentWt: string;
      bmr: string;
      rest: string;
      tdee: string;
      healthyRange: string;
      targetLabel: string;
      dailyTarget: string;
      clinicalEval: string;
    }
  > = {
    en: {
      title: 'Anthropometric Body Analysis',
      modelDesc: 'Mifflin-St Jeor metabolic model & WHO standard thresholds',
      updateMetrics: 'Update Metrics',
      idealRange: 'Ideal Range: 18.5 – 24.9',
      under: 'Under',
      obese: 'Obese',
      ageSex: 'Age / Sex',
      height: 'Height',
      currentWt: 'Current Wt',
      bmr: 'Basal BMR',
      rest: 'At complete rest',
      tdee: 'TDEE Burn',
      healthyRange: 'Healthy Range',
      targetLabel: 'Target',
      dailyTarget: 'Daily Target',
      clinicalEval: 'Nutritional Evaluation',
    },
    es: {
      title: 'Análisis Antropométrico Corporal',
      modelDesc: 'Modelo metabólico Mifflin-St Jeor y umbrales OMS',
      updateMetrics: 'Editar Métricas',
      idealRange: 'Rango Ideal: 18.5 – 24.9',
      under: 'Bajo',
      obese: 'Obesidad',
      ageSex: 'Edad / Sexo',
      height: 'Estatura',
      currentWt: 'Peso Actual',
      bmr: 'Tasa Basal TMB',
      rest: 'En reposo absoluto',
      tdee: 'Gasto TDEE',
      healthyRange: 'Rango Saludable',
      targetLabel: 'Meta',
      dailyTarget: 'Objetivo Diario',
      clinicalEval: 'Evaluación Nutricional',
    },
    de: {
      title: 'Klinische anthropometrische Analyse',
      modelDesc: 'Mifflin-St-Jeor-Stoffwechselmodell & WHO-Kriterien',
      updateMetrics: 'Metriken anpassen',
      idealRange: 'Idealbereich: 18.5 – 24.9',
      under: 'Untergew.',
      obese: 'Adipositas',
      ageSex: 'Alter / Geschlecht',
      height: 'Größe',
      currentWt: 'Gewicht',
      bmr: 'Grundumsatz BMR',
      rest: 'In völliger Ruhe',
      tdee: 'Gesamtumsatz TDEE',
      healthyRange: 'Gesunder Bereich',
      targetLabel: 'Ziel',
      dailyTarget: 'Tagesziel',
      clinicalEval: 'Klinische Beurteilung',
    },
    fr: {
      title: 'Analyse Anthropométrique Clinique',
      modelDesc: 'Modèle métabolique Mifflin-St Jeor & seuils OMS',
      updateMetrics: 'Modifier Métriques',
      idealRange: 'Plage Idéale : 18.5 – 24.9',
      under: 'Insuff.',
      obese: 'Obésité',
      ageSex: 'Âge / Sexe',
      height: 'Taille',
      currentWt: 'Poids Actuel',
      bmr: 'Métabolisme BMR',
      rest: 'Au repos complet',
      tdee: 'Dépense TDEE',
      healthyRange: 'Plage Optimale',
      targetLabel: 'Cible',
      dailyTarget: 'Objectif Journalier',
      clinicalEval: 'Évaluation Clinique',
    },
    ru: {
      title: 'Клинический антропометрический анализ',
      modelDesc: 'Метаболическая модель Миффлина-Сан Жеора и нормы ВОЗ',
      updateMetrics: 'Изменить параметры',
      idealRange: 'Норма ИМТ: 18.5 – 24.9',
      under: 'Дефицит',
      obese: 'Ожирение',
      ageSex: 'Возраст / Пол',
      height: 'Рост',
      currentWt: 'Текущий вес',
      bmr: 'Базовый BMR',
      rest: 'В полном покое',
      tdee: 'Расход TDEE',
      healthyRange: 'Здоровый вес',
      targetLabel: 'Цель',
      dailyTarget: 'Дневная норма',
      clinicalEval: 'Клиническое заключение',
    },
    ar: {
      title: 'التحليل السريري للقياسات الحيوية',
      modelDesc: 'معادلة ميفلين-سانت جور وحدود منظمة الصحة العالمية',
      updateMetrics: 'تعديل البيانات',
      idealRange: 'المعدل المثالي: 18.5 – 24.9',
      under: 'نقص',
      obese: 'سمنة',
      ageSex: 'العمر / الجنس',
      height: 'الطول',
      currentWt: 'الوزن الحالي',
      bmr: 'الأيض الأساسي BMR',
      rest: 'أثناء الراحة التامة',
      tdee: 'الحرق الإجمالي TDEE',
      healthyRange: 'النطاق الصحي',
      targetLabel: 'الهدف',
      dailyTarget: 'الهدف اليومي',
      clinicalEval: 'التقييم الطبي السريري',
    },
    ja: {
      title: '臨床身体計測・代謝分析',
      modelDesc: 'ミフリン-サン・ジョール代謝モデル＆WHO臨床基準',
      updateMetrics: '計測値を編集',
      idealRange: '適正範囲: 18.5 – 24.9',
      under: '低体重',
      obese: '肥満',
      ageSex: '年齢 / 性別',
      height: '身長',
      currentWt: '現在の体重',
      bmr: '基礎代謝 BMR',
      rest: '完全安静時',
      tdee: '総消費 TDEE',
      healthyRange: '適正体重範囲',
      targetLabel: '目標',
      dailyTarget: '1日の摂取目標',
      clinicalEval: '臨床診断所見',
    },
  };

  const cText = cardTexts[language] || cardTexts.en;

  // Localized BMI Category
  const categoryMap: Record<AppLanguage, Record<string, string>> = {
    en: {},
    es: { Underweight: 'Bajo peso', Normal: 'Peso saludable', Overweight: 'Sobrepeso', 'Obese I': 'Obesidad Clase I', 'Obese II': 'Obesidad Severa' },
    de: { Underweight: 'Untergewicht', Normal: 'Normalgewicht', Overweight: 'Übergewicht', 'Obese I': 'Adipositas Grad I', 'Obese II': 'Schwere Adipositas' },
    fr: { Underweight: 'Insuffisance pondérale', Normal: 'Poids normal', Overweight: 'Surpoids', 'Obese I': 'Obésité modérée', 'Obese II': 'Obésité sévère' },
    ru: { Underweight: 'Дефицит веса', Normal: 'Нормальный вес', Overweight: 'Избыточный вес', 'Obese I': 'Ожирение I степени', 'Obese II': 'Ожирение II степени' },
    ar: { Underweight: 'نقص في الوزن', Normal: 'وزن مثالي طبيعي', Overweight: 'زيادة في الوزن', 'Obese I': 'سمنة درجة أولى', 'Obese II': 'سمنة مفرطة' },
    ja: { Underweight: '低体重（痩せ型）', Normal: '普通体重（適正）', Overweight: '肥満予備軍（過体重）', 'Obese I': '肥満（1度）', 'Obese II': '高度肥満' },
  };

  const localizedCategory = categoryMap[language]?.[bmiResult.category] || bmiResult.category;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Anthropometric Clinical Analysis
            </h2>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{
                color: bmiResult.categoryColor,
                backgroundColor: `${bmiResult.categoryColor}15`,
              }}
            >
              {bmiResult.category}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Mifflin-St Jeor metabolic model & WHO clinical thresholds
          </p>
        </div>

        <button
          onClick={onEditProfile}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Update Metrics</span>
        </button>
      </div>

      {/* Main Gauge & Core Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pt-5">
        {/* Left: BMI Score & Visual Gauge */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums tracking-tight">
              {bmiResult.bmi}
            </span>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">BMI</span> (kg/m²)
              <div className="text-[11px] text-neutral-400">
                Ideal Range: 18.5 – 24.9
              </div>
            </div>
          </div>

          {/* Color-segmented Gauge Bar */}
          <div className="my-4">
            <div className="relative h-3 w-full rounded-full overflow-hidden flex bg-neutral-100 dark:bg-neutral-800">
              <div className="w-[16%] bg-amber-400" title="Underweight (< 18.5)" />
              <div className="w-[23%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
              <div className="w-[18%] bg-amber-500" title="Overweight (25 - 29.9)" />
              <div className="w-[18%] bg-rose-500" title="Obese I (30 - 34.9)" />
              <div className="w-[25%] bg-rose-800" title="Obese II/III (35+)" />
            </div>

            {/* Indicator Needle */}
            <div className="relative w-full h-3 mt-1">
              <div
                className="absolute top-0 -ml-1.5 w-3 h-3 border-l-4 border-r-4 border-b-6 border-transparent border-b-neutral-900 dark:border-b-neutral-100 transition-all duration-300"
                style={{ left: `${needlePercent}%` }}
              />
            </div>

            {/* Gauge Labels */}
            <div className="flex justify-between text-[9px] sm:text-[10px] text-neutral-400 font-mono tabular-nums mt-0.5">
              <span>15 (Under)</span>
              <span>18.5</span>
              <span>25.0</span>
              <span>30.0</span>
              <span>40+ (Obese)</span>
            </div>
          </div>

          {/* Quick Demographics Bar */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs py-2 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <div>
              <div className="text-neutral-400 text-[10px]">Age / Sex</div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200 capitalize text-[11px] sm:text-xs">
                {profile.age}y · {profile.gender}
              </div>
            </div>
            <div>
              <div className="text-neutral-400 text-[10px]">Height</div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums text-[11px] sm:text-xs">
                {profile.heightCm} cm
              </div>
            </div>
            <div>
              <div className="text-neutral-400 text-[10px]">Current Wt</div>
              <div className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono tabular-nums text-[11px] sm:text-xs">
                {displayWeight}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Metabolic breakdown (BMR, TDEE, Deficit/Surplus, Goal Target) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 shadow-2xs">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs mb-1">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Basal BMR</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {bmiResult.bmr}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              At complete rest
            </div>
          </div>

          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 shadow-2xs">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>TDEE Burn</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {bmiResult.tdee}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5 capitalize truncate">
              {profile.activityLevel.replace('_', ' ')}
            </div>
          </div>

          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-850 shadow-2xs">
            <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 text-xs mb-1">
              <Scale className="w-3.5 h-3.5 text-blue-500" />
              <span>Healthy Range</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 font-mono tabular-nums">
              {minIdeal} – {maxIdeal}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              Target: {displayTarget}
            </div>
          </div>

          <div className="p-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-2xs">
            <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 text-xs mb-1 font-medium">
              <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Daily Target</span>
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-emerald-900 dark:text-emerald-100 font-mono tabular-nums">
              {bmiResult.targetCalories}
            </div>
            <div className="text-[10px] text-emerald-700 dark:text-emerald-300 mt-0.5 font-medium">
              {bmiResult.calorieDeficitOrSurplus >= 0 ? '+' : ''}
              {bmiResult.calorieDeficitOrSurplus} kcal/day
            </div>
          </div>

          {/* Full Width Nutritional Insight Box */}
          <div className="col-span-2 sm:col-span-4 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">{cText.clinicalEval}: </span>
            {bmiResult.healthAnalysis}
          </div>

          {/* Medical & Non-Clinical Disclaimer Banner */}
          <div className="col-span-2 sm:col-span-4 p-2.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed flex items-start gap-2">
            <span className="font-bold shrink-0">⚠️ Notice:</span>
            <span>
              NutriTrack provides general nutritional and lifestyle calculations for informational purposes only. It does not provide medical or clinical advice. If you experience serious health problems, persistent pain, dizziness, or medical concerns, please visit a qualified doctor or physician.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
