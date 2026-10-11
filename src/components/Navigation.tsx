import React, { useState } from 'react';
import {
  Flame,
  Activity,
  UtensilsCrossed,
  BookOpen,
  Watch,
  User as UserIcon,
  Plus,
  MessageSquareHeart,
  LogOut,
  Cloud,
  Sliders,
  Menu,
  X,
  ChevronRight,
  Camera,
  Globe,
  ChevronDown,
  Calendar,
  MoreHorizontal,
  Check,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { AppSettings, AppLanguage, PlanMealSlot, LoggedFood } from '../types/nutrition';
import { TRANSLATIONS } from '../utils/translations';
import { MealNotificationManager } from './MealNotificationManager';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenProfile: () => void;
  onQuickLogFood: () => void;
  wearableConnected: boolean;
  currentUser: User | null;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  isAuthLoading: boolean;
  settings: AppSettings;
  onUpdateSettings?: (newSettings: AppSettings) => void;
  plannedMeals?: PlanMealSlot[];
  onLogMeal?: (food: LoggedFood) => void;
  isCheckInDue?: boolean;
  daysUntilCheckIn?: number;
  onOpenCheckIn?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenProfile,
  onQuickLogFood,
  wearableConnected,
  currentUser,
  onGoogleSignIn,
  onSignOut,
  isAuthLoading,
  settings,
  onUpdateSettings,
  plannedMeals = [],
  onLogMeal,
  isCheckInDue = false,
  daysUntilCheckIn = 7,
  onOpenCheckIn,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const t = TRANSLATIONS[settings.language] || TRANSLATIONS.en;

  const languages: { id: AppLanguage; label: string; native: string; flag: string }[] = [
    { id: 'en', label: 'English', native: 'English', flag: '🇺🇸' },
    { id: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸' },
    { id: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪' },
    { id: 'fr', label: 'French', native: 'Français', flag: '🇫🇷' },
    { id: 'ru', label: 'Russian', native: 'Русский', flag: '🇷🇺' },
    { id: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦' },
    { id: 'ja', label: 'Japanese', native: '日本語', flag: '🇯🇵' },
  ];

  const currentLangObj = languages.find((l) => l.id === settings.language) || languages[0];

  // Primary desktop navigation tabs
  const primaryNavItems = [
    { id: 'dashboard', label: t.navDashboard, icon: Flame },
    { id: 'diet-plan', label: t.navDietPlan, icon: UtensilsCrossed },
    { id: 'tracker', label: t.navCalorieTracker, icon: Activity },
    { id: 'history-90', label: '90-Day Log', icon: Calendar },
    { id: 'camera', label: t.navAICamera, icon: Camera },
    { id: 'consultation', label: t.navAIConsultation, icon: MessageSquareHeart },
  ];

  // Secondary items: inline on 2xl+, tucked in a clean "More" menu on xl
  const secondaryNavItems = [
    { id: 'recipes', label: t.navHealthyMeals, icon: BookOpen },
    { id: 'wearables', label: t.navWearablesHub, icon: Watch },
  ];

  // All navigation items for drawer and mobile
  const allNavItems = [
    ...primaryNavItems,
    ...secondaryNavItems,
    { id: 'settings', label: t.navSettings, icon: Sliders },
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeTab);
  const activeSecondaryItem = secondaryNavItems.find((item) => item.id === activeTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsDrawerOpen(false);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border-b border-neutral-200/70 dark:border-neutral-800/70 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-4 overflow-x-hidden">
          
          {/* Zone 1: Brand Mark & Identity */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0">
            {/* Mobile Hamburger Side Drawer Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="xl:hidden h-9 w-9 rounded-xl border border-neutral-200/80 dark:border-neutral-750/80 bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-750 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus-visible:outline-none cursor-pointer select-none min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-xs shadow-emerald-600/20 transition-transform group-hover:scale-105 shrink-0">
                <span>{settings.avatarEmoji || '🥗'}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight truncate">
                  {t.appName}
                </span>
                <span className="hidden sm:inline text-[10px] font-medium text-neutral-400 dark:text-neutral-500 leading-none">
                  Nutrition & Vitals
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Harmonious Desktop Segmented Navigation Track */}
          <nav className="hidden xl:flex items-center bg-neutral-100/70 dark:bg-neutral-850/70 p-1 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-xs gap-0.5 shadow-2xs">
            {/* Primary Nav Items */}
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`h-8 px-2.5 2xl:px-3 text-xs rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-750/50 font-medium'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Secondary items visible inline on ultra-wide screens */}
            <div className="hidden 2xl:flex items-center gap-0.5">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`h-8 px-2.5 2xl:px-3 text-xs rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-750/50 font-medium'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
                      }`}
                    />
                    <span>{item.label}</span>
                    {item.id === 'wearables' && wearableConnected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* "More" Dropdown Trigger on standard desktop (xl to 2xl) */}
            <div className="relative xl:block 2xl:hidden">
              <button
                type="button"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`h-8 px-2.5 text-xs rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isSecondaryActive
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-750/50 font-medium'
                }`}
                title="More Features"
              >
                {activeSecondaryItem ? (
                  <>
                    <activeSecondaryItem.icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{activeSecondaryItem.label}</span>
                  </>
                ) : (
                  <>
                    <MoreHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                    <span>More</span>
                  </>
                )}
                <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsMoreMenuOpen(false)}
                  />
                  <div className="absolute left-0 mt-1.5 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200/80 dark:border-neutral-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {secondaryNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleTabClick(item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-semibold'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-neutral-400'}`} />
                            <span>{item.label}</span>
                          </span>
                          {item.id === 'wearables' && wearableConnected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Zone 3: Unified Actions Toolbar (All exact 36px / h-9 height) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* 7-Day Metric Check-in Tracker Indicator (Hidden on mobile unless check-in is due) */}
            {onOpenCheckIn && (
              <button
                type="button"
                onClick={onOpenCheckIn}
                className={`h-9 px-2 sm:px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer items-center gap-1.5 shadow-2xs shrink-0 ${
                  isCheckInDue
                    ? 'flex bg-amber-500/10 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700/80 hover:bg-amber-500/15'
                    : 'hidden sm:flex bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-400 border-neutral-200/70 dark:border-neutral-750/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-750 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                title={isCheckInDue ? '7-Day Check-in Due! Upload latest metrics' : `Next check-in due in ${daysUntilCheckIn} days`}
              >
                {isCheckInDue ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                    </span>
                    <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span className="hidden md:inline">Check-in</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
                    <span className="hidden lg:inline text-[11px] font-mono">{daysUntilCheckIn}d</span>
                  </>
                )}
              </button>
            )}

            {/* Meal Time Notification Manager (30 Min Prior Alerts) */}
            <MealNotificationManager
              plannedMeals={plannedMeals}
              onLogMeal={onLogMeal}
              onNavigateTab={setActiveTab}
            />

            {/* Quick Log Food CTA Button (Icon-only on small mobile, full text on sm+) */}
            <button
              type="button"
              onClick={onQuickLogFood}
              className="h-9 w-9 sm:w-auto px-0 sm:px-3.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
              title={t.logFood}
              aria-label={t.logFood}
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">{t.logFood}</span>
            </button>

            {/* Language Selector Dropdown (Accessible in mobile drawer on small screens) */}
            {onUpdateSettings && (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="h-9 px-2.5 text-xs font-medium rounded-xl text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-750 transition-colors border border-neutral-200/70 dark:border-neutral-750/70 shadow-2xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="Switch Language / Cambiar Idioma / Sprache wechseln"
                >
                  <span className="text-sm leading-none">{currentLangObj?.flag || '🌐'}</span>
                  <span className="uppercase tracking-wider font-mono text-[11px] font-semibold hidden sm:inline">
                    {settings.language}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLangMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                        <span>{t.languageSection || 'Language'}</span>
                        <Globe className="w-3 h-3 text-neutral-400" />
                      </div>
                      <div className="py-1">
                        {languages.map((l) => (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => {
                              onUpdateSettings({ ...settings, language: l.id });
                              setIsLangMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                              settings.language === l.id
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-semibold'
                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-base">{l.flag}</span>
                              <span>{l.native}</span>
                            </span>
                            {settings.language === l.id && (
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Settings Quick Icon Trigger (direct access) */}
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`h-9 w-9 rounded-xl border items-center justify-center transition-colors cursor-pointer shrink-0 hidden sm:flex ${
                activeTab === 'settings'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                  : 'bg-neutral-100/70 dark:bg-neutral-800/70 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-750 border-neutral-200/70 dark:border-neutral-750/70'
              }`}
              title={t.navSettings}
              aria-label={t.navSettings}
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Account & Profile Control Hub */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="h-9 pl-1.5 pr-2.5 rounded-xl border border-neutral-200/70 dark:border-neutral-750/70 bg-neutral-100/70 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-750 transition-colors flex items-center gap-2 cursor-pointer shrink-0 shadow-2xs"
                  title={`${currentUser.displayName || currentUser.email} · Profile & Account`}
                >
                  <div className="relative">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Avatar"
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-500/40"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-[10px] font-bold">
                        {settings.avatarEmoji || (currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-neutral-900" />
                  </div>
                  <span className="hidden xl:inline text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[90px]">
                    {currentUser.displayName?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                      {/* User Info Header */}
                      <div className="px-3.5 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                          {currentUser.displayName || 'Google Account'}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                          {currentUser.email}
                        </div>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                          <Cloud className="w-3 h-3" />
                          <span>{t.cloudSynced}</span>
                        </div>
                      </div>

                      {/* Menu Actions */}
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            onOpenProfile();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-neutral-400" />
                          <span>{t.profileAndBmi}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('settings');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Sliders className="w-4 h-4 text-neutral-400" />
                          <span>{t.navSettings}</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                        <button
                          type="button"
                          onClick={() => {
                            onSignOut();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3.5 py-2 text-xs text-left text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>{t.signOut}</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={onGoogleSignIn}
                  disabled={isAuthLoading}
                  className="h-9 px-2 sm:px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750 rounded-xl shadow-2xs transition-colors whitespace-nowrap flex items-center gap-1.5 sm:gap-2 cursor-pointer"
                  title={t.signInWithGoogle}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                    />
                  </svg>
                  <span className="hidden md:inline">{isAuthLoading ? 'Connecting...' : t.signInWithGoogle}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="h-9 w-9 rounded-xl border border-neutral-200/70 dark:border-neutral-750/70 bg-neutral-100/70 dark:bg-neutral-800/70 hover:bg-neutral-200/60 dark:hover:bg-neutral-750 text-neutral-600 dark:text-neutral-400 flex items-center justify-center transition-colors cursor-pointer"
                  title={t.profileAndBmi}
                  aria-label={t.profileAndBmi}
                >
                  <UserIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out Mobile & Tablet Drawer Panel */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-72 sm:w-80 max-w-[85vw] h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300 no-scrollbar">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between p-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                    <span>{settings.avatarEmoji || '🥗'}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                      {t.appName}
                    </h3>
                    <p className="text-[10px] text-neutral-400">Personal Nutrition & Vitals</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Mini Card in Drawer */}
              <div className="p-4 border-b border-neutral-100 dark:border-neutral-800">
                {currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt="Avatar"
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 flex items-center justify-center text-sm font-bold">
                          {settings.avatarEmoji || 'U'}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[140px]">
                          {currentUser.displayName || 'Google Account'}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Cloud className="w-3 h-3" />
                          <span>{t.cloudSynced}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSignOut();
                        setIsDrawerOpen(false);
                      }}
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title={t.signOut}
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onGoogleSignIn();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.27 21.43 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.57 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                    <span>{t.signInWithGoogle}</span>
                  </button>
                )}
              </div>

              {/* Vertical Navigation Items List */}
              <nav className="p-3 space-y-1">
                {allNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border-l-3 border-emerald-600'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'
                          }`}
                        />
                        <span>{item.label}</span>
                        {item.id === 'wearables' && wearableConnected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-neutral-400'}`} />
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Language Selector */}
              {onUpdateSettings && (
                <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-neutral-400" />
                    <span>{t.languageSection || 'Language'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {languages.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => {
                          onUpdateSettings({ ...settings, language: l.id });
                        }}
                        className={`flex items-center justify-center gap-1 py-1 px-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                          settings.language === l.id
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                        }`}
                      >
                        <span>{l.flag}</span>
                        <span className="uppercase text-[10px] font-mono">{l.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850 space-y-2">
              <button
                onClick={() => {
                  onQuickLogFood();
                  setIsDrawerOpen(false);
                }}
                className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.logFood}</span>
              </button>

              <button
                onClick={() => {
                  onOpenProfile();
                  setIsDrawerOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-750 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t.profileAndBmi}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

