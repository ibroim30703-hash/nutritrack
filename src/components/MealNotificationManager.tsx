import React, { useState, useEffect } from 'react';
import {
  Bell,
  BellRing,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  UtensilsCrossed,
  X,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { PlanMealSlot, DailyMealSlotType, LoggedFood } from '../types/nutrition';
import { playMealReminderChime } from '../utils/notificationSound';

export interface ScheduledCourse {
  slot: DailyMealSlotType;
  label: string;
  mealTimeStr: string; // e.g. "08:30"
  reminderTimeStr: string; // 30 min earlier, e.g. "08:00"
  mealHour: number;
  mealMinute: number;
  reminderHour: number;
  reminderMinute: number;
}

export const COURSE_SCHEDULE: ScheduledCourse[] = [
  {
    slot: 'breakfast',
    label: '1. Breakfast',
    mealTimeStr: '08:30 AM',
    reminderTimeStr: '08:00 AM',
    mealHour: 8,
    mealMinute: 30,
    reminderHour: 8,
    reminderMinute: 0,
  },
  {
    slot: 'snack_morning',
    label: '2. Morning Snack',
    mealTimeStr: '11:00 AM',
    reminderTimeStr: '10:30 AM',
    mealHour: 11,
    mealMinute: 0,
    reminderHour: 10,
    reminderMinute: 30,
  },
  {
    slot: 'lunch',
    label: '3. Lunch (Midday Dinner)',
    mealTimeStr: '01:30 PM',
    reminderTimeStr: '01:00 PM',
    mealHour: 13,
    mealMinute: 30,
    reminderHour: 13,
    reminderMinute: 0,
  },
  {
    slot: 'snack_afternoon',
    label: '4. Afternoon Snack',
    mealTimeStr: '04:30 PM',
    reminderTimeStr: '04:00 PM',
    mealHour: 16,
    mealMinute: 30,
    reminderHour: 16,
    reminderMinute: 0,
  },
  {
    slot: 'supper',
    label: '5. Supper (Evening)',
    mealTimeStr: '07:30 PM',
    reminderTimeStr: '07:00 PM',
    mealHour: 19,
    mealMinute: 30,
    reminderHour: 19,
    reminderMinute: 0,
  },
  {
    slot: 'snack_evening',
    label: '6. Evening Snack',
    mealTimeStr: '09:15 PM',
    reminderTimeStr: '08:45 PM',
    mealHour: 21,
    mealMinute: 15,
    reminderHour: 20,
    reminderMinute: 45,
  },
];

interface MealNotificationManagerProps {
  plannedMeals?: PlanMealSlot[];
  onLogMeal?: (food: LoggedFood) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MealNotificationManager: React.FC<MealNotificationManagerProps> = ({
  plannedMeals = [],
  onLogMeal,
  onNavigateTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('nutritrack_reminders_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('nutritrack_reminders_sound');
    return saved !== null ? saved === 'true' : true;
  });
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(() => {
    return typeof Notification !== 'undefined' ? Notification.permission : 'default';
  });

  // Active in-app notification state
  const [activeBanner, setActiveBanner] = useState<{
    course: ScheduledCourse;
    dishTitle: string;
    calories: number;
    meal: PlanMealSlot | null;
  } | null>(null);

  const [lastFiredSlot, setLastFiredSlot] = useState<string | null>(null);

  // Sync settings to localStorage
  useEffect(() => {
    localStorage.setItem('nutritrack_reminders_enabled', String(enabled));
  }, [enabled]);

  useEffect(() => {
    localStorage.setItem('nutritrack_reminders_sound', String(soundEnabled));
  }, [soundEnabled]);

  // Request browser notification permission
  const handleRequestPermission = async () => {
    if (typeof Notification === 'undefined') return;
    try {
      const res = await Notification.requestPermission();
      setBrowserPermission(res);
    } catch (e) {
      console.error(e);
    }
  };

  // Find dish info for a slot
  const getDishForSlot = (slot: DailyMealSlotType): { title: string; calories: number; meal: PlanMealSlot | null } => {
    const match = plannedMeals.find(
      (m) => m.slot === slot || (slot === 'lunch' && (m.slot === 'dinner' || m.slot === 'lunch'))
    );
    if (match) {
      return { title: match.title, calories: match.calories, meal: match };
    }
    return { title: 'Scheduled Meal Course', calories: 450, meal: null };
  };

  // Trigger a reminder notification
  const triggerNotification = (course: ScheduledCourse, dishTitle: string, calories: number, meal: PlanMealSlot | null) => {
    // 1. In-app banner
    setActiveBanner({ course, dishTitle, calories, meal });

    // 2. Audio Chime
    if (soundEnabled) {
      playMealReminderChime();
    }

    // 3. Browser native notification if permission granted
    if (browserPermission === 'granted' && typeof Notification !== 'undefined') {
      try {
        new Notification(`🍽️ ${course.label} in 30 Minutes!`, {
          body: `Upcoming at ${course.mealTimeStr}: "${dishTitle}" (~${calories} kcal). Time to prepare your course!`,
          icon: '/favicon.ico',
        });
      } catch (err) {
        console.warn('Native notification failed', err);
      }
    }
  };

  // Check every 30 seconds if current time matches any 30-minute prior reminder time
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();

      COURSE_SCHEDULE.forEach((course) => {
        if (course.reminderHour === currentH && course.reminderMinute === currentM) {
          const fireKey = `${course.slot}_${now.toDateString()}`;
          if (lastFiredSlot !== fireKey) {
            setLastFiredSlot(fireKey);
            const { title, calories, meal } = getDishForSlot(course.slot);
            triggerNotification(course, title, calories, meal);
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [enabled, soundEnabled, browserPermission, lastFiredSlot, plannedMeals]);

  // Simulate test notification (30-min prior alert)
  const handleTestNotification = (course: ScheduledCourse = COURSE_SCHEDULE[0]) => {
    const { title, calories, meal } = getDishForSlot(course.slot);
    triggerNotification(course, title, calories, meal);
  };

  // Quick log from notification banner
  const handleLogFromBanner = () => {
    if (!activeBanner) return;
    if (onLogMeal && activeBanner.meal) {
      const food: LoggedFood = {
        id: `meal_${Date.now()}`,
        foodName: activeBanner.meal.title,
        mealSlot: activeBanner.meal.slot === 'breakfast' ? 'breakfast' : activeBanner.meal.slot === 'supper' ? 'supper' : 'lunch',
        servings: 1,
        servingDescription: '1 course serving',
        calories: activeBanner.meal.calories,
        protein: activeBanner.meal.protein,
        carbs: activeBanner.meal.carbs,
        fats: activeBanner.meal.fats,
        fiber: activeBanner.meal.fiber,
        timeLogged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      onLogMeal(food);
    }
    setActiveBanner(null);
  };

  // Calculate next upcoming meal reminder
  const now = new Date();
  const currentTotalMin = now.getHours() * 60 + now.getMinutes();

  let nextCourse: ScheduledCourse | null = null;
  let minutesUntilReminder = Infinity;

  for (const c of COURSE_SCHEDULE) {
    const reminderTotalMin = c.reminderHour * 60 + c.reminderMinute;
    let diff = reminderTotalMin - currentTotalMin;
    if (diff < 0) diff += 1440; // tomorrow
    if (diff < minutesUntilReminder) {
      minutesUntilReminder = diff;
      nextCourse = c;
    }
  }

  return (
    <>
      {/* Navigation Bell Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-9 w-9 rounded-xl transition-all relative cursor-pointer border flex items-center justify-center shrink-0 shadow-2xs ${
            enabled
              ? 'bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-700/80 hover:text-emerald-600 hover:border-emerald-300 dark:hover:border-emerald-700'
              : 'bg-neutral-50/80 dark:bg-neutral-850/80 text-neutral-400 border-neutral-200/80 dark:border-neutral-800/80'
          }`}
          title="Meal Reminders (30-Minute Prior Alert System)"
          aria-label="Meal Reminders"
        >
          {enabled ? <BellRing className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Bell className="w-4 h-4" />}
          {enabled && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-900 animate-pulse" />
          )}
        </button>

        {/* Dropdown Popover */}
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 z-50 p-4 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                      Meal Time Reminders
                    </h3>
                    <p className="text-[10px] text-neutral-400">
                      Alerts sent 30 minutes earlier
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Toggle Controls */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">Reminders</span>
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
                    Chime Sound
                  </span>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Browser Permission Button */}
              {browserPermission !== 'granted' && typeof Notification !== 'undefined' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Enable System Push Notifications</span>
                </button>
              )}

              {/* Next Upcoming Reminder Highlight */}
              {nextCourse && enabled && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                      Next 30-Min Alert
                    </span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">
                      {nextCourse.label}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block">
                      Alerts at {nextCourse.reminderTimeStr} (Meal: {nextCourse.mealTimeStr})
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-white dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-700">
                    in ~{minutesUntilReminder > 60 ? `${Math.floor(minutesUntilReminder / 60)}h ${minutesUntilReminder % 60}m` : `${minutesUntilReminder}m`}
                  </span>
                </div>
              )}

              {/* 6-Course Schedule Table */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block px-1">
                  6-Course Reminder Times (30m Prior)
                </span>
                {COURSE_SCHEDULE.map((course) => {
                  const dish = getDishForSlot(course.slot);
                  return (
                    <div
                      key={course.slot}
                      className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-750 flex items-center justify-between text-xs hover:border-neutral-300 transition-colors"
                    >
                      <div className="space-y-0.5 flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                            {course.label}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded">
                            Alert: {course.reminderTimeStr}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          Meal at {course.mealTimeStr} · {dish.title} ({dish.calories} kcal)
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleTestNotification(course)}
                        className="px-2 py-1 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-650 transition-colors shrink-0 cursor-pointer"
                        title="Simulate 30-min alert for this course"
                      >
                        Test
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer Quick Action */}
              <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[10px] text-neutral-400">
                  Runs automatically in-browser
                </span>
                <button
                  type="button"
                  onClick={() => handleTestNotification(COURSE_SCHEDULE[0])}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Test 30-Min Chime</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating In-App Meal Reminder Banner Toast */}
      {activeBanner && (
        <div className="fixed top-20 left-3 right-3 sm:left-auto sm:right-6 z-50 max-w-sm sm:w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border-2 border-emerald-500 p-4 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Meal in 30 Minutes!
                </span>
                <h4 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100">
                  {activeBanner.course.label} ({activeBanner.course.mealTimeStr})
                </h4>
              </div>
            </div>
            <button
              onClick={() => setActiveBanner(null)}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-xs">
            <div className="font-bold text-neutral-900 dark:text-neutral-100">
              {activeBanner.dishTitle}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Target: ~{activeBanner.calories} kcal · Time to start preparing your ingredients!
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setActiveBanner(null);
                if (onNavigateTab) onNavigateTab('diet-plan');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              View Course Recipe
            </button>

            <button
              type="button"
              onClick={handleLogFromBanner}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Log this Meal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
