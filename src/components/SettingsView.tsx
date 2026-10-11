import React, { useState } from 'react';
import {
  Globe,
  Palette,
  Type,
  Smile,
  Check,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import {
  AppSettings,
  AppLanguage,
  AppTheme,
  AppBackground,
  AppFontStyle,
} from '../types/nutrition';
import { TRANSLATIONS } from '../utils/translations';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onSaveToCloud?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onSaveToCloud,
}) => {
  const [current, setCurrent] = useState<AppSettings>(settings);
  const [customEmojiInput, setCustomEmojiInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const t = TRANSLATIONS[current.language] || TRANSLATIONS.en;

  const languages: { id: AppLanguage; label: string; native: string; flag: string }[] = [
    { id: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
    { id: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { id: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { id: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
    { id: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { id: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { id: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  ];

  const themes: { id: AppTheme; label: string; colorPreview: string; desc: string }[] = [
    { id: 'light', label: 'Clean Light', colorPreview: 'bg-white border-neutral-300', desc: 'Optimal clarity with crisp emerald accents' },
    { id: 'dark', label: 'Dark Slate', colorPreview: 'bg-slate-900 border-slate-700', desc: 'Restful low-light contrast (#0F172A)' },
    { id: 'midnight', label: 'Obsidian Black', colorPreview: 'bg-neutral-950 border-neutral-800', desc: 'OLED deep black luxury interface' },
    { id: 'forest', label: 'Forest Emerald', colorPreview: 'bg-emerald-950 border-emerald-800', desc: 'Organic deep botanical dark palette' },
    { id: 'sand', label: 'Warm Sand', colorPreview: 'bg-amber-50/80 border-amber-200', desc: 'Softer linen and warm parchment tones' },
  ];

  const backgrounds: { id: AppBackground; label: string; previewClass: string; desc: string }[] = [
    { id: 'clean', label: 'Pure Minimal', previewClass: 'bg-neutral-100', desc: 'Solid distraction-free background' },
    { id: 'grid', label: 'Dot Matrix Grid', previewClass: 'bg-pattern-grid', desc: 'Subtle engineering telemetry pattern' },
    { id: 'mesh', label: 'Nutrition Glow', previewClass: 'bg-pattern-mesh', desc: 'Gentle organic emerald radial glow' },
    { id: 'aurora', label: 'Aurora Gradient', previewClass: 'bg-pattern-aurora', desc: 'Subtle dynamic energetic atmosphere' },
  ];

  const fontStyles: { id: AppFontStyle; label: string; sample: string; desc: string; previewClass: string }[] = [
    { id: 'sans', label: 'Modern Sans', sample: 'Plus Jakarta Sans', desc: 'Balanced, highly readable medical sans-serif', previewClass: 'font-sans-modern' },
    { id: 'serif', label: 'Editorial Serif', sample: 'Source Serif 4', desc: 'Elegant, literary and thoughtful typography', previewClass: 'font-serif-editorial' },
    { id: 'geometric', label: 'Geometric Clean', sample: 'Outfit Sans', desc: 'Crisp contemporary geometric forms', previewClass: 'font-geometric-clean' },
    { id: 'mono', label: 'Technical Mono', sample: 'JetBrains Mono', desc: 'Precision tabular numerals and data lines', previewClass: 'font-mono-tech' },
    { id: 'rounded', label: 'Friendly Rounded', sample: 'Nunito Soft', desc: 'Approachable, warm, and friendly curves', previewClass: 'font-rounded-soft' },
  ];

  const presetEmojis = [
    '🥗', '🥑', '🏃‍♂️', '🍎', '💪', '⚡', '🧘', '🍳', '🥩', '🍓', '🏋️', '🥦', '🍇', '🏊‍♂️', '🚴', '🍵', '🌱', '🔥', '🎯', '🥑'
  ];

  const handleApply = (updated: AppSettings) => {
    setCurrent(updated);
    onUpdateSettings(updated);
    if (onSaveToCloud) onSaveToCloud();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2400);
  };

  const handleCustomEmojiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmojiInput.trim()) {
      const updated = { ...current, avatarEmoji: customEmojiInput.trim() };
      handleApply(updated);
      setCustomEmojiInput('');
    }
  };

  const handleResetDefaults = () => {
    const defaults: AppSettings = {
      language: 'en',
      theme: 'light',
      background: 'clean',
      fontStyle: 'sans',
      fontSize: 'normal',
      avatarEmoji: '🥗',
    };
    handleApply(defaults);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {t.settingsTitle}
            </h2>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {t.settingsSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saveToast && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved & Applied!</span>
            </span>
          )}

          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDefaults}</span>
          </button>
        </div>
      </div>

      {/* 1. Desired Language Selection */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {t.languageSection}
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            Selected: <span className="font-semibold uppercase text-emerald-700">{current.language}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {languages.map((lang) => {
            const isSelected = current.language === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleApply({ ...current, language: lang.id })}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 shadow-2xs font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="text-xl mb-1">{lang.flag}</div>
                <div className="text-xs font-semibold leading-tight">{lang.native}</div>
                <div className="text-[10px] text-neutral-400">{lang.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interface Theme & Background Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Theme */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {t.themeSection}
              </h3>
            </div>
            <span className="text-xs text-neutral-400 capitalize">{current.theme}</span>
          </div>

          <div className="space-y-2">
            {themes.map((th) => {
              const isSelected = current.theme === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => handleApply({ ...current, theme: th.id })}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-2xs'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md border shadow-2xs ${th.colorPreview}`} />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{th.label}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{th.desc}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Texture Pattern */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                {t.backgroundSection}
              </h3>
            </div>
            <span className="text-xs text-neutral-400 capitalize">{current.background}</span>
          </div>

          <div className="space-y-2">
            {backgrounds.map((bg) => {
              const isSelected = current.background === bg.id;
              return (
                <button
                  key={bg.id}
                  onClick={() => handleApply({ ...current, background: bg.id })}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-2xs'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700 ${bg.previewClass}`} />
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{bg.label}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{bg.desc}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Typography & Font Style ("Shrift") */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {t.fontSection} (Шрифт / Font Style)
            </h3>
          </div>
          <span className="text-xs text-neutral-400 capitalize">{current.fontStyle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fontStyles.map((f) => {
            const isSelected = current.fontStyle === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleApply({ ...current, fontStyle: f.id })}
                className={`p-4 rounded-lg border text-left flex flex-col justify-between transition-all ${f.previewClass} ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-2xs'
                    : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                }`}
              >
                <div>
                  <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {f.label}
                  </div>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {f.sample}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                    {f.desc}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Preview: 2,450 kcal</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Avatar & Custom Profile Emoji */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Smile className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {t.emojiSection}
            </h3>
          </div>
          <span className="text-xs text-neutral-400">Displays on header & profile</span>
        </div>

        {/* Current Active Emoji Display */}
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-4xl shadow-xs">
            {current.avatarEmoji}
          </div>
          <div>
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              Your Profile Avatar Emoji: {current.avatarEmoji}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Choose from the curated nutritional icons below or type/paste your own custom emoji.
            </p>
          </div>
        </div>

        {/* Curated Health Emojis Grid */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Quick Health & Fitness Presets:
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {presetEmojis.map((emoji, index) => {
              const isSelected = current.avatarEmoji === emoji;
              return (
                <button
                  key={`${emoji}-${index}`}
                  onClick={() => handleApply({ ...current, avatarEmoji: emoji })}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-emerald-100 dark:bg-emerald-950 border-2 border-emerald-600 shadow-xs scale-110'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Emoji Input Form */}
        <form onSubmit={handleCustomEmojiSubmit} className="pt-2 flex items-center gap-3">
          <input
            type="text"
            placeholder={t.customEmojiPlaceholder}
            value={customEmojiInput}
            onChange={(e) => setCustomEmojiInput(e.target.value)}
            className="flex-1 max-w-sm px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
          />
          <button
            type="submit"
            disabled={!customEmojiInput.trim()}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-700 rounded-lg transition-colors shadow-xs"
          >
            Set Custom Emoji
          </button>
        </form>
      </div>
    </div>
  );
};
