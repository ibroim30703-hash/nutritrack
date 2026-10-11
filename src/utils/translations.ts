import { AppLanguage } from '../types/nutrition';

export interface Translations {
  appName: string;
  navDashboard: string;
  navDietPlan: string;
  navCalorieTracker: string;
  navHealthyMeals: string;
  navAIConsultation: string;
  navAICamera: string;
  navWearablesHub: string;
  navSettings: string;
  logFood: string;
  profileAndBmi: string;
  signInWithGoogle: string;
  signOut: string;
  cloudSynced: string;
  remainingBudget: string;
  consumed: string;
  burned: string;
  target: string;
  targetProtein: string;
  carbs: string;
  fats: string;
  fiber: string;
  hydration: string;
  stepsRecorded: string;
  liveHeartRate: string;
  activeCalories: string;
  settingsTitle: string;
  settingsSubtitle: string;
  languageSection: string;
  themeSection: string;
  backgroundSection: string;
  fontSection: string;
  emojiSection: string;
  saveSettings: string;
  resetDefaults: string;
  customEmojiPlaceholder: string;
  fontSizeLabel: string;
  // Localized 503 Retry System
  serviceUnavailableTitle: string;
  serviceUnavailableDesc: string;
  retryingAttempt: string;
  retryingNow: string;
  retryNowButton: string;
  retriesExhausted: string;
  simulate503Test: string;

  // Diet Plan Keys
  dietPlanTitle: string;
  dietPlanSubtitle: string;
  cuisineSelectorTitle: string;
  foodPreferencesTitle: string;
  specialNotesTitle: string;
  specialNotesPlaceholder: string;
  generateDietPlanButton: string;
  detailedCookingSteps: string;
  exploreRecipeAndSteps: string;
  logToCalorieDiary: string;
  kitchenPrepGuide: string;
  interactiveChecklist: string;
  tapStepToComplete: string;
  stepsCompleted: string;
  copyCookingSteps: string;
  copiedStepsToast: string;
  chefsClinicalTip: string;
  nutritionistNote: string;
  nutritionalPurpose: string;
  courseIngredients: string;
  marketPrepAllocation: string;
  macroAllocation: string;
  close: string;
  stepWord: string;

  // Recipe Explorer Keys
  recipeCatalogTitle: string;
  recipeCatalogSubtitle: string;
  searchRecipesPlaceholder: string;
  allCuisines: string;
  allCategories: string;
  prepTimeLabel: string;
  difficultyLabel: string;
  ingredientsList: string;
  detailedStepsPrep: string;
  noRecipesFound: string;
  viewFullRecipe: string;
  caloriesLabel: string;
  proteinLabel: string;
  carbsLabel: string;
  fatsLabel: string;
  fiberLabel: string;

  // Dashboard Overview Keys
  todaysSchedule: string;
  featuredNextMeal: string;
  quickActions: string;
  waterIntake: string;
  dailyBudget: string;
  viewDietPlan: string;
  exploreRecipes: string;
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  // ================= ENGLISH =================
  en: {
    appName: 'NutriTrack',
    navDashboard: 'Dashboard',
    navDietPlan: 'Diet Plan',
    navCalorieTracker: 'Calorie Tracker',
    navHealthyMeals: 'Healthy Meals',
    navAIConsultation: 'AI Consultation',
    navAICamera: 'AI Camera',
    navWearablesHub: 'Wearables Hub',
    navSettings: 'Settings',
    logFood: 'Log Food',
    profileAndBmi: 'Profile & BMI',
    signInWithGoogle: 'Sign In with Google',
    signOut: 'Sign Out',
    cloudSynced: 'Cloud Synced',
    remainingBudget: 'Remaining Budget',
    consumed: 'Consumed',
    burned: 'Burned',
    target: 'Target',
    targetProtein: 'Protein Target',
    carbs: 'Carbohydrates',
    fats: 'Healthy Fats',
    fiber: 'Dietary Fiber',
    hydration: 'Hydration Status',
    stepsRecorded: 'Steps Recorded',
    liveHeartRate: 'Live Heart Rate',
    activeCalories: 'Active Burned',
    settingsTitle: 'Interface & Preferences Settings',
    settingsSubtitle: 'Customize your language, visual theme, background, typography, and avatar emoji.',
    languageSection: 'Language & Locale',
    themeSection: 'Visual Color Theme',
    backgroundSection: 'Canvas Background Texture',
    fontSection: 'Typography & Font Family',
    emojiSection: 'Profile & Avatar Emoji',
    saveSettings: 'Save Preferences',
    resetDefaults: 'Reset to Defaults',
    customEmojiPlaceholder: 'Type or paste any custom emoji...',
    fontSizeLabel: 'Font Scale & Spacing',
    serviceUnavailableTitle: 'AI Vision Service Temporarily Unavailable (Code 503)',
    serviceUnavailableDesc: 'The neural vision server is experiencing elevated load. Our localized retry wrapper is automatically reconnecting.',
    retryingAttempt: 'Retrying attempt {current} of {max} in {seconds}s...',
    retryingNow: 'Retrying connection now...',
    retryNowButton: 'Retry Now',
    retriesExhausted: 'The AI service remains unavailable after multiple retry attempts. Please try again in a few moments or upload a different photo.',
    simulate503Test: '🧪 Simulate 503 (Test Retry Wrapper)',

    // Diet Plan
    dietPlanTitle: 'Daily Food Course Protocol',
    dietPlanSubtitle: 'Personalized nutrition aligned with your BMI and wellness targets.',
    cuisineSelectorTitle: 'Choose International Cuisine',
    foodPreferencesTitle: 'Food & Ingredient Preferences',
    specialNotesTitle: 'Special Food Notes & Instructions',
    specialNotesPlaceholder: 'e.g., wild salmon, extra avocado, low-sodium, no dairy...',
    generateDietPlanButton: 'Generate Tailored Daily Plan',
    detailedCookingSteps: 'Detailed Cooking Steps',
    exploreRecipeAndSteps: 'Explore Recipe & Cooking Steps',
    logToCalorieDiary: 'Log to Calorie Diary',
    kitchenPrepGuide: 'Kitchen Preparation Guide',
    interactiveChecklist: 'Interactive Kitchen Checklist: Tap step to mark complete',
    tapStepToComplete: 'Tap step to mark complete',
    stepsCompleted: '{done} of {total} steps completed',
    copyCookingSteps: 'Copy Cooking Steps',
    copiedStepsToast: 'Copied to Clipboard!',
    chefsClinicalTip: "Chef's Culinary Tip",
    nutritionistNote: 'Nutritionist Note',
    nutritionalPurpose: 'Nutritional Purpose',
    courseIngredients: 'Course Ingredients',
    marketPrepAllocation: 'Market Prep Allocation (Grocery List)',
    macroAllocation: 'Macro Allocation',
    close: 'Close',
    stepWord: 'Step',

    // Recipe Explorer
    recipeCatalogTitle: 'Healthy Culinary Recipe Explorer',
    recipeCatalogSubtitle: 'Search nutrient-dense recipes calibrated for peak vitality and metabolic health.',
    searchRecipesPlaceholder: 'Search recipes by name, ingredient, cuisine...',
    allCuisines: 'All Cuisines',
    allCategories: 'All Courses',
    prepTimeLabel: 'Prep Time',
    difficultyLabel: 'Difficulty',
    ingredientsList: 'Ingredients List',
    detailedStepsPrep: 'Detailed Cooking Steps & Preparation',
    noRecipesFound: 'No matching recipes found',
    viewFullRecipe: 'View Full Recipe & Cooking Steps',
    caloriesLabel: 'Calories',
    proteinLabel: 'Protein',
    carbsLabel: 'Carbs',
    fatsLabel: 'Fats',
    fiberLabel: 'Fiber',

    // Dashboard
    todaysSchedule: "Today's Meal Course Schedule",
    featuredNextMeal: 'Featured Next Course',
    quickActions: 'Quick Actions',
    waterIntake: 'Water Intake',
    dailyBudget: 'Daily Budget',
    viewDietPlan: 'View Daily Diet Plan',
    exploreRecipes: 'Explore Recipe Catalog',
  },

  // ================= ESPAÑOL =================
  es: {
    appName: 'NutriTrack',
    navDashboard: 'Panel',
    navDietPlan: 'Plan de Dieta',
    navCalorieTracker: 'Contador de Calorías',
    navHealthyMeals: 'Comidas Saludables',
    navAIConsultation: 'Consulta IA',
    navAICamera: 'Cámara IA',
    navWearablesHub: 'Dispositivos',
    navSettings: 'Ajustes',
    logFood: 'Registrar Alimento',
    profileAndBmi: 'Perfil e IMC',
    signInWithGoogle: 'Acceder con Google',
    signOut: 'Cerrar Sesión',
    cloudSynced: 'Sincronizado',
    remainingBudget: 'Presupuesto Restante',
    consumed: 'Consumido',
    burned: 'Quemado',
    target: 'Objetivo',
    targetProtein: 'Proteína Objetivo',
    carbs: 'Carbohidratos',
    fats: 'Grasas Saludables',
    fiber: 'Fibra Dietética',
    hydration: 'Hidratación',
    stepsRecorded: 'Pasos Registrados',
    liveHeartRate: 'Ritmo Cardíaco',
    activeCalories: 'Calorías Activas',
    settingsTitle: 'Ajustes y Preferencias de Interfaz',
    settingsSubtitle: 'Personaliza idioma, tema visual, fondo, tipografía y emoji de perfil.',
    languageSection: 'Idioma y Región',
    themeSection: 'Tema de Color',
    backgroundSection: 'Textura de Fondo',
    fontSection: 'Tipografía y Fuente',
    emojiSection: 'Emoji de Perfil',
    saveSettings: 'Guardar Ajustes',
    resetDefaults: 'Restablecer Valores',
    customEmojiPlaceholder: 'Escribe o pega cualquier emoji...',
    fontSizeLabel: 'Tamaño de Fuente',
    serviceUnavailableTitle: 'Servicio de Visión IA No Disponible Temporalmente (Código 503)',
    serviceUnavailableDesc: 'El servidor de visión tiene alta demanda. El sistema de reintentos localizados se está reconectando.',
    retryingAttempt: 'Reintentando intento {current} de {max} en {seconds}s...',
    retryingNow: 'Reintentando conexión ahora...',
    retryNowButton: 'Reintentar Ahora',
    retriesExhausted: 'El servicio sigue no disponible tras varios reintentos. Por favor intenta de nuevo en unos momentos.',
    simulate503Test: '🧪 Simular 503 (Probar Reintento)',

    // Diet Plan
    dietPlanTitle: 'Protocolo de Comidas Diarias',
    dietPlanSubtitle: 'Nutrición personalizada calculada según tu IMC y objetivos biométricos.',
    cuisineSelectorTitle: 'Seleccionar Cocina Internacional',
    foodPreferencesTitle: 'Preferencias de Alimentos e Ingredientes',
    specialNotesTitle: 'Notas e Instrucciones Especiales',
    specialNotesPlaceholder: 'ej. preferencia por salmón salvaje, aguacate extra, bajo en sodio...',
    generateDietPlanButton: 'Generar Plan Diario Personalizado',
    detailedCookingSteps: 'Pasos Detallados de Cocina',
    exploreRecipeAndSteps: 'Explorar Receta y Pasos de Cocina',
    logToCalorieDiary: 'Registrar en Diario de Calorías',
    kitchenPrepGuide: 'Guía de Preparación en Cocina',
    interactiveChecklist: 'Lista Interactiva: Toca el paso para marcar como completado',
    tapStepToComplete: 'Toca el paso para marcar como completado',
    stepsCompleted: '{done} de {total} pasos completados',
    copyCookingSteps: 'Copiar Pasos de Cocina',
    copiedStepsToast: '¡Copiado al Portapapeles!',
    chefsClinicalTip: 'Consejo Culinario del Chef',
    nutritionistNote: 'Nota del Nutricionista',
    nutritionalPurpose: 'Propósito Nutricional',
    courseIngredients: 'Ingredientes del Plato',
    marketPrepAllocation: 'Lista de Compras y Mercado',
    macroAllocation: 'Distribución de Macronutrientes',
    close: 'Cerrar',
    stepWord: 'Paso',

    // Recipe Explorer
    recipeCatalogTitle: 'Explorador de Recetas Saludables',
    recipeCatalogSubtitle: 'Busca recetas ricas en nutrientes diseñadas para máxima vitalidad y salud metabólica.',
    searchRecipesPlaceholder: 'Buscar recetas por nombre, ingrediente, cocina...',
    allCuisines: 'Todas las Cocinas',
    allCategories: 'Todos los Platos',
    prepTimeLabel: 'Tiempo de Prep.',
    difficultyLabel: 'Dificultad',
    ingredientsList: 'Lista de Ingredientes',
    detailedStepsPrep: 'Pasos Detallados de Cocina y Preparación',
    noRecipesFound: 'No se encontraron recetas que coincidan',
    viewFullRecipe: 'Ver Receta Completa y Pasos',
    caloriesLabel: 'Calorías',
    proteinLabel: 'Proteína',
    carbsLabel: 'Carbohidratos',
    fatsLabel: 'Grasas',
    fiberLabel: 'Fibra',

    // Dashboard
    todaysSchedule: 'Horario de Comidas de Hoy',
    featuredNextMeal: 'Próxima Comida Destacada',
    quickActions: 'Acciones Rápidas',
    waterIntake: 'Consumo de Agua',
    dailyBudget: 'Presupuesto Diario',
    viewDietPlan: 'Ver Plan de Dieta',
    exploreRecipes: 'Explorar Recetas',
  },

  // ================= DEUTSCH =================
  de: {
    appName: 'NutriTrack',
    navDashboard: 'Übersicht',
    navDietPlan: 'Ernährungsplan',
    navCalorieTracker: 'Kalorientracker',
    navHealthyMeals: 'Gesunde Rezepte',
    navAIConsultation: 'KI-Beratung',
    navAICamera: 'KI-Kamera',
    navWearablesHub: 'Wearables Hub',
    navSettings: 'Einstellungen',
    logFood: 'Essen eintragen',
    profileAndBmi: 'Profil & BMI',
    signInWithGoogle: 'Mit Google anmelden',
    signOut: 'Abmelden',
    cloudSynced: 'Cloud-synchronisiert',
    remainingBudget: 'Verbleibendes Budget',
    consumed: 'Verbraucht',
    burned: 'Verbrannt',
    target: 'Ziel',
    targetProtein: 'Eiweiß-Ziel',
    carbs: 'Kohlenhydrate',
    fats: 'Gesunde Fette',
    fiber: 'Ballaststoffe',
    hydration: 'Flüssigkeitshaushalt',
    stepsRecorded: 'Schritte heute',
    liveHeartRate: 'Pulsfrequenz',
    activeCalories: 'Aktivkalorien',
    settingsTitle: 'Einstellungen & Benutzeroberfläche',
    settingsSubtitle: 'Sprache, Farbthema, Hintergrund, Schriftart und Profil-Emoji anpassen.',
    languageSection: 'Sprache & Region',
    themeSection: 'Farbschema & Design',
    backgroundSection: 'Hintergrund-Stil',
    fontSection: 'Schriftart & Typografie',
    emojiSection: 'Profil-Emoji',
    saveSettings: 'Einstellungen speichern',
    resetDefaults: 'Zurücksetzen',
    customEmojiPlaceholder: 'Beliebiges Emoji eingeben...',
    fontSizeLabel: 'Schriftgröße',
    serviceUnavailableTitle: 'KI-Bildanalyse vorübergehend nicht verfügbar (Code 503)',
    serviceUnavailableDesc: 'Der Server hat momentan eine hohe Auslastung. Die lokale Wiederholungsschleife verbindet sich automatisch neu.',
    retryingAttempt: 'Wiederholungsversuch {current} von {max} in {seconds}s...',
    retryingNow: 'Wiederhole Verbindung jetzt...',
    retryNowButton: 'Jetzt wiederholen',
    retriesExhausted: 'Der Dienst ist nach mehreren Versuchen weiterhin ausgelastet. Bitte versuchen Sie es gleich erneut.',
    simulate503Test: '🧪 503 simulieren (Test Wiederholung)',

    // Diet Plan
    dietPlanTitle: 'Tägliches Mahlzeiten-Protokoll',
    dietPlanSubtitle: 'Individuelle Ernährung abgestimmt auf Ihren klinischen BMI und Stoffwechsel.',
    cuisineSelectorTitle: 'Internationale Küche wählen',
    foodPreferencesTitle: 'Ernährungs- & Lebensmittelpräferenzen',
    specialNotesTitle: 'Besondere Notizen & Wünsche',
    specialNotesPlaceholder: 'z.B. Bevorzugung von Wildlachs, extra Avocado, salzarm...',
    generateDietPlanButton: 'Individuellen Tagesplan erstellen',
    detailedCookingSteps: 'Detaillierte Zubereitungsschritte',
    exploreRecipeAndSteps: 'Rezept & Zubereitung ansehen',
    logToCalorieDiary: 'Ins Kalorientagebuch eintragen',
    kitchenPrepGuide: 'Küchen-Zubereitungsanleitung',
    interactiveChecklist: 'Interaktive Küchen-Checkliste: Schritt antippen zum Abhaken',
    tapStepToComplete: 'Schritt antippen zum Abhaken',
    stepsCompleted: '{done} von {total} Schritten erledigt',
    copyCookingSteps: 'Zubereitungsschritte kopieren',
    copiedStepsToast: 'In die Zwischenablage kopiert!',
    chefsClinicalTip: 'Tipp des Chefkochs',
    nutritionistNote: 'Hinweis des Ernährungsberaters',
    nutritionalPurpose: 'Ernährungsphysiologischer Nutzen',
    courseIngredients: 'Zutaten des Menügangs',
    marketPrepAllocation: 'Einkaufsliste & Vorratsplanung',
    macroAllocation: 'Makronährstoff-Verteilung',
    close: 'Schließen',
    stepWord: 'Schritt',

    // Recipe Explorer
    recipeCatalogTitle: 'Rezept-Katalog für gesunde Ernährung',
    recipeCatalogSubtitle: 'Nährstoffreiche Rezepte für maximale Vitalität und metabolische Gesundheit.',
    searchRecipesPlaceholder: 'Rezepte nach Name, Zutat, Küche suchen...',
    allCuisines: 'Alle Küchen',
    allCategories: 'Alle Menügänge',
    prepTimeLabel: 'Zubereitungszeit',
    difficultyLabel: 'Schwierigkeit',
    ingredientsList: 'Zutatenliste',
    detailedStepsPrep: 'Detaillierte Zubereitungsschritte',
    noRecipesFound: 'Keine passenden Rezepte gefunden',
    viewFullRecipe: 'Vollständiges Rezept ansehen',
    caloriesLabel: 'Kalorien',
    proteinLabel: 'Eiweiß',
    carbsLabel: 'Kohlenhydrate',
    fatsLabel: 'Fette',
    fiberLabel: 'Ballaststoffe',

    // Dashboard
    todaysSchedule: 'Heutiger Mahlzeitenplan',
    featuredNextMeal: 'Nächste Mahlzeit',
    quickActions: 'Schnellaktionen',
    waterIntake: 'Wasserzufuhr',
    dailyBudget: 'Tagesbudget',
    viewDietPlan: 'Ernährungsplan ansehen',
    exploreRecipes: 'Rezepte entdecken',
  },

  // ================= FRANÇAIS =================
  fr: {
    appName: 'NutriTrack',
    navDashboard: 'Tableau de bord',
    navDietPlan: 'Plan Alimentaire',
    navCalorieTracker: 'Suivi Calories',
    navHealthyMeals: 'Repas Sains',
    navAIConsultation: 'Consultation IA',
    navAICamera: 'Caméra IA',
    navWearablesHub: 'Objets Connectés',
    navSettings: 'Paramètres',
    logFood: 'Ajouter un repas',
    profileAndBmi: 'Profil & IMC',
    signInWithGoogle: 'Connexion Google',
    signOut: 'Déconnexion',
    cloudSynced: 'Synchronisé',
    remainingBudget: 'Budget Restant',
    consumed: 'Consommé',
    burned: 'Brûlé',
    target: 'Cible',
    targetProtein: 'Protéines Cibles',
    carbs: 'Glucides',
    fats: 'Lipides Sains',
    fiber: 'Fibres',
    hydration: 'Hydratation',
    stepsRecorded: 'Pas enregistrés',
    liveHeartRate: 'Rythme Cardiaque',
    activeCalories: 'Calories Actives',
    settingsTitle: 'Paramètres & Personnalisation',
    settingsSubtitle: 'Modifiez la langue, le thème, le fond, la police et votre emoji.',
    languageSection: 'Langue & Région',
    themeSection: 'Thème Visuel',
    backgroundSection: 'Arrière-plan',
    fontSection: 'Typographie & Police',
    emojiSection: 'Emoji de Profil',
    saveSettings: 'Sauvegarder',
    resetDefaults: 'Par défaut',
    customEmojiPlaceholder: 'Entrez un emoji...',
    fontSizeLabel: 'Taille de Police',
    serviceUnavailableTitle: 'Service Vision IA Temporairement Indisponible (Code 503)',
    serviceUnavailableDesc: 'Le serveur de vision fait face à une forte charge. Reconnexion automatique en cours.',
    retryingAttempt: 'Tentative de reconnexion {current} sur {max} dans {seconds}s...',
    retryingNow: 'Reconnexion en cours...',
    retryNowButton: 'Réessayer Maintenant',
    retriesExhausted: 'Le service reste indisponible après plusieurs tentatives. Veuillez patienter un instant.',
    simulate503Test: '🧪 Simuler 503 (Tester le Réessai)',

    // Diet Plan
    dietPlanTitle: 'Protocole Quotidien des Repas',
    dietPlanSubtitle: 'Nutrition personnalisée alignée sur votre IMC et vos objectifs métaboliques.',
    cuisineSelectorTitle: 'Choisir la Cuisine Internationale',
    foodPreferencesTitle: 'Préférences Alimentaires & Ingrédients',
    specialNotesTitle: 'Notes & Instructions Particulières',
    specialNotesPlaceholder: 'ex: préférence pour le saumon sauvage, avocat, pauvre en sel...',
    generateDietPlanButton: 'Générer le Plan Quotidien Sur Mesure',
    detailedCookingSteps: 'Étapes Détaillées de Préparation',
    exploreRecipeAndSteps: 'Découvrir la Recette & les Étapes',
    logToCalorieDiary: 'Enregistrer au Journal',
    kitchenPrepGuide: 'Guide de Préparation en Cuisine',
    interactiveChecklist: 'Liste Interactive: Appuyez pour valider l\'étape',
    tapStepToComplete: 'Appuyez pour valider l\'étape',
    stepsCompleted: '{done} sur {total} étapes complétées',
    copyCookingSteps: 'Copier les Étapes de Cuisine',
    copiedStepsToast: 'Copié dans le Presse-papiers !',
    chefsClinicalTip: 'Conseil Culinaire du Chef',
    nutritionistNote: 'Note du Nutritionniste',
    nutritionalPurpose: 'Objectif Nutritionnel',
    courseIngredients: 'Ingrédients du Plat',
    marketPrepAllocation: 'Liste des Courses & Provisions',
    macroAllocation: 'Répartition des Macronutriments',
    close: 'Fermer',
    stepWord: 'Étape',

    // Recipe Explorer
    recipeCatalogTitle: 'Explorateur de Recettes Santé',
    recipeCatalogSubtitle: 'Recettes riches en nutriments calibrées pour votre vitalité.',
    searchRecipesPlaceholder: 'Rechercher par nom, ingrédient, cuisine...',
    allCuisines: 'Toutes les Cuisines',
    allCategories: 'Tous les Plats',
    prepTimeLabel: 'Temps de Préparation',
    difficultyLabel: 'Difficulté',
    ingredientsList: 'Liste des Ingrédients',
    detailedStepsPrep: 'Étapes de Préparation Détaillées',
    noRecipesFound: 'Aucune recette correspondante trouvée',
    viewFullRecipe: 'Voir la Recette Complète',
    caloriesLabel: 'Calories',
    proteinLabel: 'Protéines',
    carbsLabel: 'Glucides',
    fatsLabel: 'Lipides',
    fiberLabel: 'Fibres',

    // Dashboard
    todaysSchedule: 'Programme des Repas du Jour',
    featuredNextMeal: 'Prochain Repas',
    quickActions: 'Actions Rapides',
    waterIntake: 'Apport en Eau',
    dailyBudget: 'Budget Quotidien',
    viewDietPlan: 'Voir le Plan Alimentaire',
    exploreRecipes: 'Découvrir les Recettes',
  },

  // ================= РУССКИЙ =================
  ru: {
    appName: 'NutriTrack',
    navDashboard: 'Панель',
    navDietPlan: 'План Питания',
    navCalorieTracker: 'Трекер Калорий',
    navHealthyMeals: 'Здоровые Блюда',
    navAIConsultation: 'ИИ Консультант',
    navAICamera: 'ИИ Камера',
    navWearablesHub: 'Гаджеты и Часы',
    navSettings: 'Настройки',
    logFood: 'Записать еду',
    profileAndBmi: 'Профиль и ИМТ',
    signInWithGoogle: 'Войти через Google',
    signOut: 'Выйти',
    cloudSynced: 'Синхронизировано',
    remainingBudget: 'Остаток калорий',
    consumed: 'Съедено',
    burned: 'Сожжено',
    target: 'Цель',
    targetProtein: 'Целевой Белок',
    carbs: 'Углеводы',
    fats: 'Полезные Жиры',
    fiber: 'Клетчатка',
    hydration: 'Водный баланс',
    stepsRecorded: 'Шагов пройдено',
    liveHeartRate: 'Пульс в реальном времени',
    activeCalories: 'Активный расход',
    settingsTitle: 'Настройки интерфейса и профиля',
    settingsSubtitle: 'Выбор языка, цветовой темы, фона, шрифта и персонального эмодзи.',
    languageSection: 'Язык интерфейса',
    themeSection: 'Цветовая тема',
    backgroundSection: 'Фон интерфейса',
    fontSection: 'Шрифт и Типографика',
    emojiSection: 'Аватар / Эмодзи',
    saveSettings: 'Сохранить настройки',
    resetDefaults: 'Сбросить по умолчанию',
    customEmojiPlaceholder: 'Введите или вставьте любой эмодзи...',
    fontSizeLabel: 'Масштаб шрифта',
    serviceUnavailableTitle: 'Сервис ИИ-зрения временно недоступен (Код 503)',
    serviceUnavailableDesc: 'Сервер компьютерного зрения временно перегружен. Автоматическое восстановление соединения.',
    retryingAttempt: 'Повторная попытка {current} из {max} через {seconds} сек...',
    retryingNow: 'Выполняется повторное подключение...',
    retryNowButton: 'Повторить сейчас',
    retriesExhausted: 'Сервис по-прежнему недоступен после всех попыток. Пожалуйста, подождите немного.',
    simulate503Test: '🧪 Симулировать 503 (Тест механизма повторов)',

    // Diet Plan
    dietPlanTitle: 'Ежедневный протокол питания',
    dietPlanSubtitle: 'Персонализированный рацион, рассчитанный по вашему ИМТ и биометрическим целям.',
    cuisineSelectorTitle: 'Выбор международной кухни',
    foodPreferencesTitle: 'Предпочтения в еде и ингредиентах',
    specialNotesTitle: 'Особые пожелания и инструкции',
    specialNotesPlaceholder: 'напр., предпочтение дикому лососю, спелый авокадо, меньше соли...',
    generateDietPlanButton: 'Составить индивидуальный план',
    detailedCookingSteps: 'Пошаговые шаги приготовления',
    exploreRecipeAndSteps: 'Посмотреть рецепт и инструкции',
    logToCalorieDiary: 'Записать в дневник питания',
    kitchenPrepGuide: 'Кулинарное руководство',
    interactiveChecklist: 'Интерактивный список: Нажмите на шаг, чтобы отметить выполненным',
    tapStepToComplete: 'Нажмите на шаг, чтобы отметить выполненным',
    stepsCompleted: '{done} из {total} шагов выполнено',
    copyCookingSteps: 'Скопировать шаги приготовления',
    copiedStepsToast: 'Скопировано в буфер обмена!',
    chefsClinicalTip: 'Кулинарный совет шеф-повара',
    nutritionistNote: 'Совет нутрициолога',
    nutritionalPurpose: 'Пищевая ценность и цель',
    courseIngredients: 'Ингредиенты блюда',
    marketPrepAllocation: 'Список покупок в магазине',
    macroAllocation: 'Баланс макронутриентов',
    close: 'Закрыть',
    stepWord: 'Шаг',

    // Recipe Explorer
    recipeCatalogTitle: 'Каталог здоровых рецептов',
    recipeCatalogSubtitle: 'Рецепты высокой питательной плотности для метаболического здоровья и энергии.',
    searchRecipesPlaceholder: 'Поиск рецептов по названию, ингредиентам, кухне...',
    allCuisines: 'Все кухни',
    allCategories: 'Все блюда',
    prepTimeLabel: 'Время готовки',
    difficultyLabel: 'Сложность',
    ingredientsList: 'Список ингредиентов',
    detailedStepsPrep: 'Пошаговые инструкции приготовления',
    noRecipesFound: 'Подходящих рецептов не найдено',
    viewFullRecipe: 'Открыть полный рецепт',
    caloriesLabel: 'Калории',
    proteinLabel: 'Белки',
    carbsLabel: 'Углеводы',
    fatsLabel: 'Жиры',
    fiberLabel: 'Клетчатка',

    // Dashboard
    todaysSchedule: 'Расписание приемов пищи на сегодня',
    featuredNextMeal: 'Следующий прием пищи',
    quickActions: 'Быстрые действия',
    waterIntake: 'Выпито воды',
    dailyBudget: 'Дневная норма',
    viewDietPlan: 'Перейти к плану питания',
    exploreRecipes: 'Открыть рецепты',
  },

  // ================= ARABIC =================
  ar: {
    appName: 'نيوتري تراك',
    navDashboard: 'لوحة التحكم',
    navDietPlan: 'خطة النظام الغذائي',
    navCalorieTracker: 'متتبع السعرات',
    navHealthyMeals: 'وجبات صحية',
    navAIConsultation: 'استشارة الذكاء الاصطناعي',
    navAICamera: 'كاميرا الذكاء الاصطناعي',
    navWearablesHub: 'الأجهزة الذكية',
    navSettings: 'الإعدادات',
    logFood: 'تسجيل وجبة',
    profileAndBmi: 'الملف و BMI',
    signInWithGoogle: 'تسجيل الدخول بجوجل',
    signOut: 'تسجيل الخروج',
    cloudSynced: 'تمت المزامنة',
    remainingBudget: 'المتبقي من السعرات',
    consumed: 'المستهلك',
    burned: 'المحروق',
    target: 'الهدف',
    targetProtein: 'البروتين المستهدف',
    carbs: 'الكربوهيدرات',
    fats: 'الدهون الصحية',
    fiber: 'الألياف',
    hydration: 'الترطيب',
    stepsRecorded: 'الخطوات المسجلة',
    liveHeartRate: 'معدل نبضات القلب',
    activeCalories: 'الحرق النشط',
    settingsTitle: 'إعدادات الواجهة والتفضيلات',
    settingsSubtitle: 'تخصيص اللغة والمظهر والخلفية والخط والرمز التعبيري.',
    languageSection: 'اللغة والمنطقة',
    themeSection: 'مظهر الألوان',
    backgroundSection: 'نقش الخلفية',
    fontSection: 'الخط ونمط الطباعة',
    emojiSection: 'الرمز التعبيري',
    saveSettings: 'حفظ التفضيلات',
    resetDefaults: 'استعادة الافتراضي',
    customEmojiPlaceholder: 'أدخل أي رمز تعبيري...',
    fontSizeLabel: 'حجم الخط',
    serviceUnavailableTitle: 'خدمة الرؤية الذكية غير متاحة مؤقتاً (رمز 503)',
    serviceUnavailableDesc: 'يشهد خادم الرؤية ضغطاً متزايداً. جاري إعادة الاتصال تلقائياً.',
    retryingAttempt: 'إعادة المحاولة رقم {current} من {max} خلال {seconds} ثانية...',
    retryingNow: 'جارٍ إعادة الاتصال الآن...',
    retryNowButton: 'إعادة المحاولة الآن',
    retriesExhausted: 'لا تزال الخدمة غير متاحة بعد عدة محاولات. يرجى الانتظار قليلاً.',
    simulate503Test: '🧪 محاكاة 503 (اختبار إعادة المحاولة)',

    // Diet Plan
    dietPlanTitle: 'جدول الوجبات الغذائية اليومية',
    dietPlanSubtitle: 'تغذية مخصصة ومحسوبة بدقة وفقاً لمؤشر كتلة جسمك وأهدافك الصحية.',
    cuisineSelectorTitle: 'اختيار المطبخ العالمي',
    foodPreferencesTitle: 'تفضيلات الأطعمة والمكونات',
    specialNotesTitle: 'ملاحظات وتعليمات خاصة',
    specialNotesPlaceholder: 'مثال: تفضيل السلمون البري، أفوكادو إضافي، قليل الملح...',
    generateDietPlanButton: 'إنشاء خطة يومية مخصصة',
    detailedCookingSteps: 'خطوات الطهي المفصلة',
    exploreRecipeAndSteps: 'استكشاف الوصفة وخطوات الطهي',
    logToCalorieDiary: 'تسجيل في متتبع السعرات',
    kitchenPrepGuide: 'دليل التحضير في المطبخ',
    interactiveChecklist: 'قائمة المطبخ التفاعلية: اضغط على الخطوة لتحديدها كمكتملة',
    tapStepToComplete: 'اضغط على الخطوة لتحديدها كمكتملة',
    stepsCompleted: '{done} من {total} خطوات مكتملة',
    copyCookingSteps: 'نسخ خطوات الطهي',
    copiedStepsToast: 'تم النسخ إلى الحافظة!',
    chefsClinicalTip: 'نصيحة الشيف الغذائية',
    nutritionistNote: 'ملاحظة أخصائي التغذية',
    nutritionalPurpose: 'الهدف الغذائي للوجبة',
    courseIngredients: 'مكونات الوجبة',
    marketPrepAllocation: 'قائمة التسوق والمشتريات',
    macroAllocation: 'توزيع المغذيات الكبرى',
    close: 'إغلاق',
    stepWord: 'الخطوة',

    // Recipe Explorer
    recipeCatalogTitle: 'مستكشف الوصفات الصحية',
    recipeCatalogSubtitle: 'وصفات غنية بالمغذيات مصممة لتعزيز الحيوية والصحة الأيضية.',
    searchRecipesPlaceholder: 'ابحث عن الوصفات بالاسم، المكونات، المطبخ...',
    allCuisines: 'جميع المطابخ',
    allCategories: 'جميع الوجبات',
    prepTimeLabel: 'وقت التحضير',
    difficultyLabel: 'درجة الصعوبة',
    ingredientsList: 'قائمة المكونات',
    detailedStepsPrep: 'خطوات الطهي والتحضير المفصلة',
    noRecipesFound: 'لم يتم العثور على وصفات مطابقة',
    viewFullRecipe: 'عرض الوصفة الكاملة',
    caloriesLabel: 'السعرات',
    proteinLabel: 'البروتين',
    carbsLabel: 'الكربوهيدرات',
    fatsLabel: 'الدهون',
    fiberLabel: 'الألياف',

    // Dashboard
    todaysSchedule: 'جدول وجبات اليوم',
    featuredNextMeal: 'الوجبة القادمة المميزة',
    quickActions: 'إجراءات سريعة',
    waterIntake: 'استهلاك الماء',
    dailyBudget: 'الميزانية اليومية',
    viewDietPlan: 'عرض الخطة الغذائية',
    exploreRecipes: 'استكشاف الوصفات',
  },

  // ================= 日本語 =================
  ja: {
    appName: 'ニュートリトラック',
    navDashboard: 'ダッシュボード',
    navDietPlan: '食事プラン',
    navCalorieTracker: 'カロリー記録',
    navHealthyMeals: 'ヘルシーレシピ',
    navAIConsultation: 'AI栄養相談',
    navAICamera: 'AIカメラ',
    navWearablesHub: 'ウェアラブル連携',
    navSettings: '設定',
    logFood: '食事を記録',
    profileAndBmi: 'プロフィールとBMI',
    signInWithGoogle: 'Googleでログイン',
    signOut: 'ログアウト',
    cloudSynced: 'クラウド同期済',
    remainingBudget: '残りのカロリー枠',
    consumed: '摂取カロリー',
    burned: '消費カロリー',
    target: '目標値',
    targetProtein: '目標タンパク質',
    carbs: '炭水化物',
    fats: '良質な脂質',
    fiber: '食物繊維',
    hydration: '水分補給',
    stepsRecorded: '本日の歩数',
    liveHeartRate: 'リアルタイム心拍数',
    activeCalories: 'アクティブ消費',
    settingsTitle: '設定とインターフェース',
    settingsSubtitle: '言語、テーマカラー、背景、フォント、絵文字アイコンをカスタマイズ。',
    languageSection: '言語設定',
    themeSection: 'カラーテーマ',
    backgroundSection: '背景デザイン',
    fontSection: 'フォント（書体）',
    emojiSection: 'アバター絵文字',
    saveSettings: '設定を保存',
    resetDefaults: 'デフォルトに戻す',
    customEmojiPlaceholder: 'お好みの絵文字を入力...',
    fontSizeLabel: 'フォントサイズ',
    serviceUnavailableTitle: 'AI画像認識サービスが一時的に利用不可 (コード503)',
    serviceUnavailableDesc: 'サーバーにアクセスが集中しています。自動再接続を試行しています。',
    retryingAttempt: '再試行中 {current}/{max}回目 （{seconds}秒後）...',
    retryingNow: 'ただいま再接続中...',
    retryNowButton: '今すぐ再試行',
    retriesExhausted: '複数回再試行しましたが現在サービスが利用できません。',
    simulate503Test: '🧪 503をシミュレート (リトライ検証)',

    // Diet Plan
    dietPlanTitle: '1日の食事コース・プロトコル',
    dietPlanSubtitle: 'BMIと身体目標に合わせて最適化されたパーソナライズ栄養プラン。',
    cuisineSelectorTitle: '世界の料理スタイルを選択',
    foodPreferencesTitle: '食材・食事の好み',
    specialNotesTitle: '特別なリクエスト・備考',
    specialNotesPlaceholder: '例: 天然サーモン希望、アボカド多め、減塩、乳製品控えめ...',
    generateDietPlanButton: 'カスタム食事プランを生成',
    detailedCookingSteps: '詳細な調理手順',
    exploreRecipeAndSteps: 'レシピと調理手順を確認',
    logToCalorieDiary: 'カロリー日記に記録',
    kitchenPrepGuide: 'キッチン調理ガイド',
    interactiveChecklist: 'キッチンチェックリスト: タップして完了マーク',
    tapStepToComplete: 'タップして完了マーク',
    stepsCompleted: '{total}ステップ中 {done}ステップ完了',
    copyCookingSteps: '調理手順をコピー',
    copiedStepsToast: 'クリップボードにコピーしました！',
    chefsClinicalTip: 'シェフのワンポイントアドバイス',
    nutritionistNote: '管理栄養士ノート',
    nutritionalPurpose: 'この食事の栄養学的目的',
    courseIngredients: 'コース食材',
    marketPrepAllocation: 'お買い物・買い出しリスト',
    macroAllocation: 'マクロ栄養素バランス',
    close: '閉じる',
    stepWord: 'ステップ',

    // Recipe Explorer
    recipeCatalogTitle: 'ヘルシーレシピ・エクスプローラー',
    recipeCatalogSubtitle: '代謝の活性化と健康維持のために厳選された高栄養レシピ。',
    searchRecipesPlaceholder: 'レシピ名、食材、料理ジャンルで検索...',
    allCuisines: 'すべての料理ジャンル',
    allCategories: 'すべてのコース',
    prepTimeLabel: '調理時間',
    difficultyLabel: '難易度',
    ingredientsList: '材料リスト',
    detailedStepsPrep: '詳細な調理手順と下ごしらえ',
    noRecipesFound: '該当するレシピが見つかりませんでした',
    viewFullRecipe: 'レシピの全手順を見る',
    caloriesLabel: 'カロリー',
    proteinLabel: 'タンパク質',
    carbsLabel: '炭水化物',
    fatsLabel: '脂質',
    fiberLabel: '食物繊維',

    // Dashboard
    todaysSchedule: '本日の食事コーススケジュール',
    featuredNextMeal: '次の食事コース',
    quickActions: 'クイックアクション',
    waterIntake: '水分補給量',
    dailyBudget: '1日のカロリー目標',
    viewDietPlan: '食事プランを見る',
    exploreRecipes: 'レシピを見る',
  },
};
