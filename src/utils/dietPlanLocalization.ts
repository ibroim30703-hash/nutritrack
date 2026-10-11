import {
  AppLanguage,
  DietPlan,
  PlanMealSlot,
  CuisineCountry,
} from '../types/nutrition';
import { CuisineMetadata, CUISINES_LIST, FOOD_PREFERENCE_CATEGORIES } from './dietPlanGenerator';
import { getLocalizedRecipe } from '../data/recipeTranslations';
import { getLocalizedCuisineDish, localizeStepInstructions } from '../data/cuisineDishTranslations';

export interface LocalizedSlotInfo {
  label: string;
  whatShouldBeEaten: string;
}

const SLOT_TEXTS: Record<AppLanguage, Record<string, LocalizedSlotInfo>> = {
  en: {
    breakfast: {
      label: 'Breakfast (Morning Course)',
      whatShouldBeEaten:
        'What should be eaten: High-protein, complex carbohydrates, and clean micronutrients (~22% daily energy) to break the nocturnal fast, replenish liver glycogen, and activate cognitive neurotransmitters.',
    },
    snack_morning: {
      label: 'Morning Snack (Mid-Morning Bridge)',
      whatShouldBeEaten:
        'What should be eaten: Light, nutrient-dense bridge snack (150–250 kcal) to maintain steady cognitive focus, replenish hydration, and prevent compensatory overeating at midday dinner.',
    },
    dinner: {
      label: 'Dinner (Midday Main Course)',
      whatShouldBeEaten:
        'What should be eaten: Heartiest nutrient-dense meal of the day (30–35% daily energy) providing lean animal or plant protein, low-glycemic complex starches, healthy lipids, and abundant phytonutrients.',
    },
    snack_afternoon: {
      label: 'Afternoon Snack (In-Between Dinner & Supper)',
      whatShouldBeEaten:
        'What should be eaten: Slow-digesting healthy fats and fiber to bridge the metabolic gap between midday dinner and evening supper, stabilizing evening hunger hormones.',
    },
    supper: {
      label: 'Supper (Evening Nourishing Course)',
      whatShouldBeEaten:
        'What should be eaten: Lean, restorative protein and cooked green vegetables (25% daily energy) designed for easy nighttime digestion, overnight muscle protein synthesis, and restful deep sleep.',
    },
    snack_evening: {
      label: 'Evening Snack (In-Between Supper & Bedtime)',
      whatShouldBeEaten:
        'What should be eaten: Zero-sugar bedtime recovery infusion with bioavailable magnesium, L-tryptophan, or soothing cultured probiotics to stimulate nocturnal melatonin production and deep sleep.',
    },
  },
  es: {
    breakfast: {
      label: 'Desayuno (Curso de la Mañana)',
      whatShouldBeEaten:
        'Qué debe comerse: Proteína magra de alta calidad, carbohidratos complejos y micronutrientes (~22% de energía diaria) para romper el ayuno nocturno, recargar glucógeno hepático y activar neurotransmisores.',
    },
    snack_morning: {
      label: 'Snack de Media Mañana (Puente Metabólico)',
      whatShouldBeEaten:
        'Qué debe comerse: Snack ligero y denso en nutrientes (150–250 kcal) para sostener la concentración mental, hidratación y evitar comer en exceso al mediodía.',
    },
    dinner: {
      label: 'Almuerzo Principal (Comida del Mediodía)',
      whatShouldBeEaten:
        'Qué debe comerse: La comida principal más sustanciosa del día (30–35% de energía) con proteína magra de calidad, almidones de bajo índice glucémico y grasas cardiosaludables.',
    },
    snack_afternoon: {
      label: 'Merienda de la Tarde (Entre Almuerzo y Cena)',
      whatShouldBeEaten:
        'Qué debe comerse: Grasas saludables de digestión pausada y fibra para estabilizar las hormonas del hambre entre la comida y la cena.',
    },
    supper: {
      label: 'Cena (Curso Nutritivo Nocturno)',
      whatShouldBeEaten:
        'Qué debe comerse: Proteína ligera reparadora y verduras cocinadas al vapor (~25% de energía) para facilitar la digestión nocturna y la síntesis de masa muscular durante el sueño.',
    },
    snack_evening: {
      label: 'Snack Nocturno (Antes de Dormir)',
      whatShouldBeEaten:
        'Qué debe comerse: Infusión relajante sin azúcar acompañada de magnesio biodisponible o probióticos para estimular la melatonina y el sueño profundo.',
    },
  },
  de: {
    breakfast: {
      label: 'Frühstück (Morgendlicher Gang)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Proteinreich, komplexe Kohlenhydrate und Mikronährstoffe (~22% des Tagesbedarfs), um das Fasten zu brechen und die geistige Leistungsfähigkeit zu aktivieren.',
    },
    snack_morning: {
      label: 'Vormittagssnack (Metabolische Brücke)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Leichter Snack (150–250 kcal) für gleichmäßige mentale Klarheit, Flüssigkeitsversorgung und Schutz vor Heißhunger am Mittag.',
    },
    dinner: {
      label: 'Mittagessen (Hauptmahlzeit des Tages)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Nahrhafteste Mahlzeit des Tages (30–35% der Tagesenergie) mit magerem Eiweiß, langkettigen Kohlenhydraten und sekundären Pflanzenstoffen.',
    },
    snack_afternoon: {
      label: 'Nachmittagssnack (Zwischen Mittag & Abend)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Gesunde Fette und Ballaststoffe zur Stabilisierung des Blutzuckerspiegels und der Sättigungshormone vor dem Abendessen.',
    },
    supper: {
      label: 'Abendessen (Leichter regenerativer Abendschmaus)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Leicht verdauliches Protein und gedünstetes Gemüse (~25% Energie) zur nächtlichen Muskelregeneration und für tiefen Schlaf.',
    },
    snack_evening: {
      label: 'Spät-Snack (Vor dem Schlafengehen)',
      whatShouldBeEaten:
        'Was gegessen werden sollte: Beruhigender Kräuteraufguss mit Magnesium und Zink zur Förderung der natürlichen Melatoninproduktion.',
    },
  },
  fr: {
    breakfast: {
      label: 'Petit-déjeuner (Course du Matin)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Protéines de haute valeur biologique, glucides lents et micronutriments (~22% d\'énergie) pour recharger le glycogène et stimuler l\'éveil.',
    },
    snack_morning: {
      label: 'Collation Matinale (Pause Énergie)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Encas léger (150–250 kcal) maintenant la vivacité d\'esprit et prévenant les fringales avant le déjeuner.',
    },
    dinner: {
      label: 'Déjeuner Principal (Repas du Midi)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Repas le plus généreux de la journée (30–35% des calories) associant protéines maigres, féculents complets et légumes riches en antioxydants.',
    },
    snack_afternoon: {
      label: 'Goûter d\'Après-Midi (Entre Déjeuner et Dîner)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Lipides sains et fibres pour faire la transition métabolique vers le soir et calmer la ghréline.',
    },
    supper: {
      label: 'Dîner Léger (Repas Régénérant du Soir)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Protéines digestes et légumes cuits (~25% d\'énergie) pour favoriser la réparation musculaire sans alourdir le sommeil.',
    },
    snack_evening: {
      label: 'Encas du Soir (Avant le Coucher)',
      whatShouldBeEaten:
        'Ce qu\'il faut consommer: Infusion sans sucre riche en magnésium biodisponible pour déclencher la sécrétion naturelle de mélatonine.',
    },
  },
  ru: {
    breakfast: {
      label: 'Завтрак (Утренний прием пищи)',
      whatShouldBeEaten:
        'Что следует съесть: Высокобелковые продукты, сложные углеводы и микроэлементы (~22% суточной нормы) для запуска метаболизма и восполнения гликогена.',
    },
    snack_morning: {
      label: 'Утренний перекус (Поддержка энергии)',
      whatShouldBeEaten:
        'Что следует съесть: Легкий перекус (150–250 ккал) для поддержания когнитивной концентрации и предотвращения переедания в обед.',
    },
    dinner: {
      label: 'Обед (Главный дневной прием пищи)',
      whatShouldBeEaten:
        'Что следует съесть: Самый сытный и насыщенный прием пищи (30–35% калорий): нежирный белок, сложные углеводы с низким ГИ и полезные жиры.',
    },
    snack_afternoon: {
      label: 'Полдник (Перекус между обедом и ужином)',
      whatShouldBeEaten:
        'Что следует съесть: Полезные жиры и клетчатка для стабилизации вечернего уровня сахара в крови перед ужином.',
    },
    supper: {
      label: 'Ужин (Легкий восстановительный вечерний прием)',
      whatShouldBeEaten:
        'Что следует съесть: Легкоусвояемый белок и тушеные зеленые овощи (~25% калорий) для ночного восстановления мышц и крепкого сна.',
    },
    snack_evening: {
      label: 'Поздний перекус (Перед сном)',
      whatShouldBeEaten:
        'Что следует съесть: Травяной чай без сахара с семенами, богатыми магнием, для стимуляции выработки мелатонина и фазы глубокого сна.',
    },
  },
  ar: {
    breakfast: {
      label: 'الإفطار (الوجبة الصباحية)',
      whatShouldBeEaten:
        'ما يجب تناوله: بروتين عالي الجودة وكربوهيدرات معقدة (~22% من السعرات) لكسر الصيام الليلي وتنشيط التركيز والذهن.',
    },
    snack_morning: {
      label: 'وجبة خفيفة صباحية (تجديد النشاط)',
      whatShouldBeEaten:
        'ما يجب تناوله: وجبة خفيفة غنية بالمغذيات (150–250 سعرة) للحفاظ على صفاء الذهن وتجنب الإفراط في تناول الطعام عند الغداء.',
    },
    dinner: {
      label: 'الغداء الرئيسي (الوجبة اليومية الكبرى)',
      whatShouldBeEaten:
        'ما يجب تناوله: الوجبة الأكبر والأكثر تكاملاً في اليوم (30–35% من السعرات) مع بروتين صافٍ ونشويات معقدة ودهون صحية وخضار طازجة.',
    },
    snack_afternoon: {
      label: 'وجبة خفيفة بعد الظهر (بين الغداء والعشاء)',
      whatShouldBeEaten:
        'ما يجب تناوله: دهون صحية بطيئة الهضم وألياف لتنظيم هرمونات الجوع حتى موعد العشاء.',
    },
    supper: {
      label: 'العشاء (وجبة الاستشفاء المسائية)',
      whatShouldBeEaten:
        'ما يجب تناوله: بروتين خفيف سهل الهضم مع خضار مطهوة (~25% من السعرات) لتحفيز ترميم العضلات وضمان نوم عميق ومريح.',
    },
    snack_evening: {
      label: 'وجبة ما قبل النوم (تهدئة واستشفاء)',
      whatShouldBeEaten:
        'ما يجب تناوله: مشروب أعشاب خالٍ من السكر مع بذور غنية بالماغنيسيوم لتحفيز هرمون الميلاتونين والنوم العميق.',
    },
  },
  ja: {
    breakfast: {
      label: '朝食（モーニングコース）',
      whatShouldBeEaten:
        '推奨される食事内容: 高タンパク質、複合炭水化物、ビタミン・ミネラル（1日の約22%）を摂取し、夜間の断食状態から肝グリコーゲンを補給して集中力を高めます。',
    },
    snack_morning: {
      label: '午前の間食（モーニングブリッジ）',
      whatShouldBeEaten:
        '推奨される食事内容: 軽めで栄養価の高い補食（150〜250 kcal）。安定した水分補給と集中力を維持し、昼食時の急激な血糖値上昇を防ぎます。',
    },
    dinner: {
      label: '昼食・メインディナー（日中の主食）',
      whatShouldBeEaten:
        '推奨される食事内容: 1日で最も充実した栄養バランス食（1日の30〜35%）。良質なタンパク質、低GIの玄米や全粒穀物、良質な脂質と豊富な野菜を摂取します。',
    },
    snack_afternoon: {
      label: '午後の間食（夕食前のエネルギー補給）',
      whatShouldBeEaten:
        '推奨される食事内容: 消化吸収の緩やかな良質な脂質と食物繊維。昼食から夕食までの血糖値を安定させ、夕方の過度な空腹を防ぎます。',
    },
    supper: {
      label: '夕食・サパー（夜のリカバリー食）',
      whatShouldBeEaten:
        '推奨される食事内容: 胃腸に優しい高タンパク質と温かい温野菜（1日の約25%）。就寝中の筋肉修復を促し、深い睡眠を妨げない消化の良い構成です。',
    },
    snack_evening: {
      label: '就寝前の夜食（安眠サポート）',
      whatShouldBeEaten:
        '推奨される食事内容: 糖分ゼロの温かいハーブティーとマグネシウムを含むナッツ・種子類。メラトニン分泌を促し、深いレム睡眠をサポートします。',
    },
  },
};

/**
 * Localizes grocery list categories according to user language
 */
export function getLocalizedGroceryCategory(category: string, language: AppLanguage): string {
  const map: Record<AppLanguage, Record<string, string>> = {
    en: {
      'Fresh Produce & Herbs': 'Fresh Produce & Herbs',
      'Lean Proteins & Seafood': 'Lean Proteins & Seafood',
      'Complex Grains & Legumes': 'Complex Grains & Legumes',
      'Healthy Fats & Dairy': 'Healthy Fats & Dairy',
      'Aromatic Spices & Pantry': 'Aromatic Spices & Pantry',
    },
    es: {
      'Fresh Produce & Herbs': 'Verduras, Frutas y Hierbas',
      'Lean Proteins & Seafood': 'Proteínas Magras y Mariscos',
      'Complex Grains & Legumes': 'Cereales Integrales y Legumbres',
      'Healthy Fats & Dairy': 'Grasas Saludables y Lácteos',
      'Aromatic Spices & Pantry': 'Especias y Despensa',
    },
    de: {
      'Fresh Produce & Herbs': 'Frisches Gemüse, Obst & Kräuter',
      'Lean Proteins & Seafood': 'Mageres Eiweiß & Meeresfrüchte',
      'Complex Grains & Legumes': 'Vollkorngetreide & Hülsenfrüchte',
      'Healthy Fats & Dairy': 'Gesunde Fette & Milchprodukte',
      'Aromatic Spices & Pantry': 'Gewürze & Vorratsschrank',
    },
    fr: {
      'Fresh Produce & Herbs': 'Légumes Frais, Fruits & Herbes',
      'Lean Proteins & Seafood': 'Protéines Maigres & Poissons',
      'Complex Grains & Legumes': 'Céréales Complètes & Légumineuses',
      'Healthy Fats & Dairy': 'Matières Grasses Saines & Produits Laitiers',
      'Aromatic Spices & Pantry': 'Épices & Placard',
    },
    ru: {
      'Fresh Produce & Herbs': 'Свежие овощи, зелень и фрукты',
      'Lean Proteins & Seafood': 'Нежирный белок, рыба и птица',
      'Complex Grains & Legumes': 'Цельнозерновые крупы и бобовые',
      'Healthy Fats & Dairy': 'Полезные жиры и молочные продукты',
      'Aromatic Spices & Pantry': 'Ароматные пряности и бакалея',
    },
    ar: {
      'Fresh Produce & Herbs': 'خضروات وفواكه وأعشاب طازجة',
      'Lean Proteins & Seafood': 'بروتينات صافية ومأكولات بحرية',
      'Complex Grains & Legumes': 'حبوب كاملة وبقوليات',
      'Healthy Fats & Dairy': 'دهون صحية ومنتجات ألبان',
      'Aromatic Spices & Pantry': 'توابل ومؤونة المطبخ',
    },
    ja: {
      'Fresh Produce & Herbs': '新鮮な野菜・果物・ハーブ',
      'Lean Proteins & Seafood': '良質なタンパク質・魚介類',
      'Complex Grains & Legumes': '玄米・全粒穀物・豆類',
      'Healthy Fats & Dairy': '良質な油脂・乳製品',
      'Aromatic Spices & Pantry': 'スパイス・調味料・ストック',
    },
  };

  return map[language]?.[category] || category;
}

/**
 * Returns localized cuisines metadata list
 */
export function getLocalizedCuisines(language: AppLanguage): CuisineMetadata[] {
  if (language === 'en') return CUISINES_LIST;

  const names: Record<AppLanguage, Record<CuisineCountry, { name: string; desc: string }>> = {
    en: {} as any,
    es: {
      mediterranean: { name: 'Mediterránea y Griega', desc: 'Aceite de oliva virgen extra, orégano silvestre, limones, queso feta y pescado fresco.' },
      italian: { name: 'Cocina Rústica Italiana', desc: 'Tomates San Marzano, albahaca dulce, balsámico añejo, ajo, parmesano y legumbres.' },
      japanese: { name: 'Washoku Tradicional Japonés', desc: 'Miso fermentado, caldo dashi, nori, edamame al vapor, salmón y arroz integral.' },
      mexican: { name: 'Sabores Frescos Mexicanos', desc: 'Chile asado, lima fresca, cilantro, frijoles negros, pimientos y aguacate.' },
      indian: { name: 'Ayurvédica y Especias de la India', desc: 'Cúrcuma dorada, jengibre, comino tostado, adobos tandoori y lentejas dal.' },
      middle_eastern: { name: 'Mezze del Medio Oriente', desc: 'Tahini de sésamo, garbanzos, zumaque, hierbas zaatar, granada y menta.' },
      french: { name: 'Bistró Santé Francés', desc: 'Hierbas de Provenza, estragón, mostaza Dijon, chalotas y verduras estofadas.' },
      thai: { name: 'Herbal y Aromática Tailandesa', desc: 'Hierba limón, albahaca sagrada, leche de coco ligera, lima y jengibre galanga.' },
      american: { name: 'Gourmet Limpio Americano', desc: 'Batatas asadas, pavos de granja, salmón silvestre del Pacífico y brotes.' },
      eastern_european: { name: 'Tradición Campestre de Europa del Este', desc: 'Remolacha asada, eneldo de huerto, chucrut fermentado, kéfir y trigo sarraceno.' },
      nordic: { name: 'Nueva Dieta Nórdica', desc: 'Pescados azules de aguas frías, centeno germinado, bayas silvestres y tubérculos.' },
      spanish: { name: 'Tapas Mediterráneas de España', desc: 'Aceite de oliva virgen, pimentón de la Vera, azafrán, ajo y pescados a la plancha.' },
      korean: { name: 'Hansik Fermentado Coreano', desc: 'Kimchi tradicional, pasta de soja doenjang, aceite de sésamo tostado y algas.' },
      vietnamese: { name: 'Hierbas Frescas de Vietnam', desc: 'Cilantro fresco, menta vietnamita, lima, fideos ligeros de arroz y caldos aromáticos.' },
    },
    de: {
      mediterranean: { name: 'Mediterran & Griechisch', desc: 'Natives Olivenöl extra, wilder Oregano, Zitronen, Schafsfeta und frischer Fisch.' },
      italian: { name: 'Italienische Cucina Rustica', desc: 'San-Marzano-Tomaten, Basilikum, Aceto Balsamico, Knoblauch und Hülsenfrüchte.' },
      japanese: { name: 'Japanisches Washoku', desc: 'Fermentiertes Miso, Dashi-Brühe, Nori-Algen, gedämpfte Edamame und Lachs.' },
      mexican: { name: 'Mexikanische Frischeküche', desc: 'Geröstete Chilis, Limette, Koriander, schwarze Bohnen und Avocado.' },
      indian: { name: 'Indische Ayurveda & Gewürzküche', desc: 'Goldene Kurkuma, Ingwer, gerösteter Kreuzkümmel, Tandoori und Linsen.' },
      middle_eastern: { name: 'Nahöstliche Mezze-Küche', desc: 'Sesam-Tahini, Kichererbsen, Sumach, Zaatar-Kräuter und Granatapfel.' },
      french: { name: 'Französisches Bistro Santé', desc: 'Kräuter der Provence, Estragon, Dijon-Senf und feine Schalotten.' },
      thai: { name: 'Thailändische Kräuterküche', desc: 'Zitronengras, Thai-Basilikum, leichte Kokosmilch und Limette.' },
      american: { name: 'Amerikanische Vollwertküche', desc: 'Ofen-Süßkartoffeln, Freilandputenfleisch, Wildlachs und Blattgrün.' },
      eastern_european: { name: 'Osteuropäische Landküche', desc: 'Ofen-Rote-Bete, frischer Dill, fermentiertes Sauerkraut, Kefir und Buchweizen.' },
      nordic: { name: 'Neue Nordische Ernährung', desc: 'Kaltwasserfische, Vollkornroggen, Preiselbeeren und Wurzelgemüse.' },
      spanish: { name: 'Spanische Tapas-Küche', desc: 'Natives Olivenöl, Pimentón de la Vera, Safran, Knoblauch und Meeresfrüchte.' },
      korean: { name: 'Koreanische Fermentationsküche', desc: 'Kimchi, Doenjang-Paste, geröstetes Sesamöl und Algen.' },
      vietnamese: { name: 'Vietnamesische Frischekräuterküche', desc: 'Koriander, Minze, Limette, zarte Reisnudeln und aromatische Brühen.' },
    },
    fr: {
      mediterranean: { name: 'Méditerranéenne & Grecque', desc: 'Huile d\'olive vierge extra, origan sauvage, citrons frais, feta et poissons nobles.' },
      italian: { name: 'Cucina Rustica Italienne', desc: 'Tomates San Marzano, basilic frais, vinaigre balsamique, parmesan et légumineuses.' },
      japanese: { name: 'Washoku Japonais', desc: 'Miso traditionnel, bouillon dashi, nori, edamame vapeur et saumon sauvage.' },
      mexican: { name: 'Saveurs Fraîches du Mexique', desc: 'Piments doux grillés, citron vert, coriandre, haricots noirs et avocat.' },
      indian: { name: 'Ayurveda & Épices d\'Inde', desc: 'Curcuma doré, gingembre, cumin torréfié, tandoori et lentilles corail.' },
      middle_eastern: { name: 'Mezze du Moyen-Orient', desc: 'Tahini de sésame, pois chiches, sumac, zaatar et grenade.' },
      french: { name: 'Bistrot Santé Français', desc: 'Herbes de Provence, estragon, moutarde de Dijon et légumes braisés.' },
      thai: { name: 'Herboristerie Thaïlandaise', desc: 'Citronnelle fraîche, basilic sacré, lait de coco léger et lime.' },
      american: { name: 'Alimentation Propre Américaine', desc: 'Patates douces rôties, dinde fermière, saumon sauvage et pousses.' },
      eastern_european: { name: 'Tradition d\'Europe de l\'Est', desc: 'Betteraves rôties, aneth frais, choucroute fermentée, kéfir et sarrasin.' },
      nordic: { name: 'Régime Nordique Vitalité', desc: 'Poissons gras des mers froides, seigle germé, airelles et racines.' },
      spanish: { name: 'Tapas Méditerranéennes d\'Espagne', desc: 'Huile d\'olive, pimentón doux, safran, ail et poissons grillés.' },
      korean: { name: 'Hansik Coréen Fermenté', desc: 'Kimchi maison, pâte de soja doenjang, huile de sésame et algues.' },
      vietnamese: { name: 'Herbes Fraîches du Vietnam', desc: 'Coriandre, menthe fraîche, lime, nouilles de riz et bouillons légers.' },
    },
    ru: {
      mediterranean: { name: 'Средиземноморская и греческая', desc: 'Оливковое масло Extra Virgin, дикий орегано, лимоны, сыр фета и свежая рыба.' },
      italian: { name: 'Итальянская Cucina Rustica', desc: 'Томаты Сан-Марцано, базилик, выдержанный бальзамик, чеснок и полента.' },
      japanese: { name: 'Японская кухня Васёку', desc: 'Мисо-паста, наваристый бульон даси, водоросли нори, эдамаме и лосось.' },
      mexican: { name: 'Мексиканская свежая кухня', desc: 'Опаленные перцы чили, сок лайма, кинза, черная фасоль и спелый авокадо.' },
      indian: { name: 'Индийские аюрведические специи', desc: 'Золотая куркума, корень имбиря, тандури-маринады и чечевичный дал.' },
      middle_eastern: { name: 'Ближневосточное мезе', desc: 'Кунжутный тахини, нут, сумах, травы заатар и зерна граната.' },
      french: { name: 'Французское бистро Santé', desc: 'Прованские травы, эстрагон, дижонская горчица и лук-шалот.' },
      thai: { name: 'Тайская пряно-травяная кухня', desc: 'Свежий лемонграсс, тайский базилик, легкое кокосовое молоко и лайм.' },
      american: { name: 'Американское здоровое питание', desc: 'Запеченный батат, фермерская индейка, тихоокеанский дикий лосось.' },
      eastern_european: { name: 'Восточноевропейские традиции', desc: 'Печеная свекла, свежий укроп, квашеная капуста, кефир и гречневая крупа.' },
      nordic: { name: 'Новая скандинавская диета', desc: 'Северная рыба, пророщенная рожь, лесные ягоды и корнеплоды.' },
      spanish: { name: 'Испанские тапас', desc: 'Оливковое масло, копченая паприка, шафран, чеснок и морепродукты на гриле.' },
      korean: { name: 'Корейский ферментированный Хансик', desc: 'Ферментированный кимчи, соевая паста твенджан, кунжутное масло и водоросли.' },
      vietnamese: { name: 'Вьетнамская кухня свежих трав', desc: 'Свежая кинза, мята, лайм, рисовая вермишель и ароматные бульоны.' },
    },
    ar: {
      mediterranean: { name: 'المتوسطية واليونانية', desc: 'زيت زيتون بكر ممتاز، أوريغانو بري، ليمون طازج، جبن فيتا وأسماك طازجة.' },
      italian: { name: 'المطبخ الريفي الإيطالي', desc: 'طماطم سان مارزانو، ريحان طازج، بلسميك معتق، ثوم وبقوليات.' },
      japanese: { name: 'واشوكو الياباني الأصيل', desc: 'ميسو متخمر، مرق داشي، نوري، فول إدامامي وسلمون بري.' },
      mexican: { name: 'النكهات المكسيكية الطازجة', desc: 'فلفل مشوي، ليمون أخضر، كزبرة، فاصوليا سوداء وأفوكادو.' },
      indian: { name: 'التوابل الهندية والأيورفيدا', desc: 'كركم ذهبي، زنجبيل طازج، كمون محمص وتوابل تندوري وعدس.' },
      middle_eastern: { name: 'المزة الشرق أوسطية', desc: 'طحينة سمسم، حمص، سماق، أعشاب زعتر وحبوب رمان.' },
      french: { name: 'بيسترو الصحة الفرنسي', desc: 'أعشاب بروفنسية، خردل ديجون وخضار مطهوة بهدوء.' },
      thai: { name: 'الأعشاب التايلاندية العطرية', desc: 'عشبة الليمون، ريحان تايلاندي، حليب جوز هند خفيف وليمون.' },
      american: { name: 'التغذية الصحية الأمريكية', desc: 'بطاطا حلوة مشوية، ديك رومي، سلمون بري وخضار ورقية.' },
      eastern_european: { name: 'المطبخ الريفي لأوروبا الشرقية', desc: 'شمندر مشوي، شبت طازج، ملفوف مخلل، كفير وحبوب حنطة سوداء.' },
      nordic: { name: 'الحمية الاسكندنافية الحيوية', desc: 'أسماك بحرية باردة، خبز الجاودار، توت بري وجذور نباتية.' },
      spanish: { name: 'التاباس الإسباني المتوسطي', desc: 'زيت زيتون، بابريكا مدخنة، زعفران، ثوم ومأكولات بحرية.' },
      korean: { name: 'هانسيك الكوري المتخمر', desc: 'كيمتشي تقليدي، معجون صويا دوينجانغ، زيت سمسم وأعشاب بحرية.' },
      vietnamese: { name: 'الأعشاب الفيتنامية الطازجة', desc: 'كزبرة ونعناع طازج، ليمون، نودلز أرز ومرق خفيف.' },
    },
    ja: {
      mediterranean: { name: '地中海＆ギリシャ料理', desc: '上質エキストラバージンオリーブオイル、野生オレガノ、レモン、フェタチーズ、白身魚。' },
      italian: { name: 'イタリア伝統クチーナ・ルスティカ', desc: '完熟サンマルツァーノトマト、スイートバジル、熟成バルサミコ、ニンニク、豆類。' },
      japanese: { name: '日本の伝統和食（Washoku）', desc: '伝統発酵味噌、旨味出汁、海苔、蒸し枝豆、天然鮭、ふっくら玄米。' },
      mexican: { name: 'メキシカン・フレッシュ＆スパイス', desc: '香ばしいチリ、生ライム、パクチー、ブラックビーンズ、アボカド。' },
      indian: { name: 'インド伝統アーユルヴェーダ＆スパイス', desc: '黄金ターメリック、生姜、焙煎クミン、タンドリー仕立て、高タンパクなダール豆。' },
      middle_eastern: { name: '中東の伝統メッゼ', desc: '白ごまタヒニ、ひよこ豆、ルビースマック、ザアタルハーブ、ざくろ。' },
      french: { name: 'フランス風ヘルシー・ビストロ', desc: 'プロヴァンスハーブ、エストラゴン、ディジョンマスタード、香味野菜。' },
      thai: { name: 'タイ伝統ハーブ＆アロマ', desc: 'レモングラス、ホーリーバジル、ライトココナッツミルク、生ライム。' },
      american: { name: 'アメリカン・クリーンイーティング', desc: 'ローストスイートポテト、放牧七面鳥、天然サーモン、スプラウト。' },
      eastern_european: { name: '東欧の伝統ファーム食', desc: 'ローストビーツ、生ディル、発酵ザワークラウト、ケフィア、蕎麦の実。' },
      nordic: { name: 'ニュー・ノルディック（北欧式）', desc: '冷水青魚、ライ麦全粒粉、野生ベリー類、根菜類。' },
      spanish: { name: 'スペイン風地中海タパス', desc: 'オリーブオイル、パプリカパウダー、サフラン、ニンニク、魚介のプランチャ。' },
      korean: { name: '韓国伝統発酵食（ハンシク）', desc: '自家製キムチ、テンジャン味噌、香ばしいごま油、海藻。' },
      vietnamese: { name: 'ベトナム香草フレッシュキュイジーヌ', desc: '生パクチー、ミント、ライム、米粉麺、滋味深いクリアスープ。' },
    },
  };

  const lMap = names[language];
  if (!lMap) return CUISINES_LIST;

  return CUISINES_LIST.map((item) => {
    const loc = lMap[item.id];
    if (!loc) return item;
    return {
      ...item,
      name: loc.name,
      description: loc.desc,
    };
  });
}

/**
 * Returns localized food preferences list
 */
export function getLocalizedPreferences(language: AppLanguage) {
  if (language === 'en') return FOOD_PREFERENCE_CATEGORIES;

  const prefMap: Record<AppLanguage, Record<string, { label: string; desc: string }>> = {
    en: {} as any,
    es: {
      meat_poultry: { label: 'Aves y Carne Blanca', desc: 'Pechuga de pollo, pavo campero, picada magra' },
      meat_red: { label: 'Carne Roja Magra', desc: 'Ternera de pasto, solomillo magro, lomo' },
      fish_seafood: { label: 'Pescados y Mariscos', desc: 'Salmón salvaje, lubina, bacalao, langostinos' },
      dairy_products: { label: 'Lácteos Fermentados', desc: 'Yogur griego 0%, kéfir, queso feta, ricota' },
      vegan_plant: { label: 'Algo Vegano (Proteína Vegetal)', desc: 'Tofu firme, tempeh, lentejas, garbanzos, edamame' },
      vegetarian: { label: 'Apto para Vegetarianos', desc: 'Recetas equilibradas ovolactovegetarianas' },
      eggs: { label: 'Huevos de Pastoreo', desc: 'Huevos camperos enteros, revueltos, poché' },
      nuts_seeds: { label: 'Grasas Saludables y Frutos Secos', desc: 'Aguacate Hass, aceite de oliva virgen, nueces, chía' },
      gluten_free: { label: 'Cereales Sin Gluten', desc: 'Quinoa, arroz jazmín integral, sarraceno, avena' },
    },
    de: {
      meat_poultry: { label: 'Geflügel & weißes Fleisch', desc: 'Hähnchenbrust, Putenfilet, mageres Geflügelhack' },
      meat_red: { label: 'Mageres rotes Fleisch', desc: 'Rindersteak aus Weidehaltung, Hüftsteak' },
      fish_seafood: { label: 'Fisch & Meeresfrüchte', desc: 'Wildlachs, Seebarsch, Kabeljau, Garnelen' },
      dairy_products: { label: 'Fermentierte Milchprodukte', desc: 'Griechischer Joghurt 0%, Kefir, Feta, Skyr' },
      vegan_plant: { label: 'Etwas Veganes (Pflanzliches Eiweiß)', desc: 'Tofu, Tempeh, Linsen, Kichererbsen, Edamame' },
      vegetarian: { label: 'Vegetarierfreundlich', desc: 'Ausgewogene pflanzenbasierte Rezepte' },
      eggs: { label: 'Freilandeier', desc: 'Ganze Bio-Eier, Rührei, pochierte Eier' },
      nuts_seeds: { label: 'Gesunde Fette & Nüsse', desc: 'Hass-Avocado, Olivenöl, Walnüsse, Chiasamen' },
      gluten_free: { label: 'Glutenfreie Vollkornkörner', desc: 'Quinoa, Naturreis, Buchweizen, Haferflocken' },
    },
    fr: {
      meat_poultry: { label: 'Volaille & Viande Blanche', desc: 'Blanc de poulet, dinde fermière' },
      meat_red: { label: 'Viande Rouge Maigre', desc: 'Bœuf élevé à l\'herbe, surlonge' },
      fish_seafood: { label: 'Poissons & Fruits de Mer', desc: 'Saumon sauvage, bar, cabillaud, crevettes' },
      dairy_products: { label: 'Produits Laitiers Fermentés', desc: 'Yaourt grec 0%, kéfir, feta, ricotta' },
      vegan_plant: { label: 'Option Végétalienne (Végétal)', desc: 'Tofu ferme, tempeh, lentilles, pois chiches' },
      vegetarian: { label: 'Convient aux Végétariens', desc: 'Repas équilibrés ovolactovégétariens' },
      eggs: { label: 'Œufs de Plein Air', desc: 'Œufs entiers fermiers, brouillés, pochés' },
      nuts_seeds: { label: 'Graisses Saines & Noix', desc: 'Avocat Hass, huile d\'olive vierge, noix, chia' },
      gluten_free: { label: 'Céréales Sans Gluten', desc: 'Quinoa, riz complet, sarrasin, flocons d\'avoine' },
    },
    ru: {
      meat_poultry: { label: 'Птица и белое мясо', desc: 'Куриная грудка, филе индейки' },
      meat_red: { label: 'Нежирное красное мясо', desc: 'Стейк травяного откорма, сирлойн' },
      fish_seafood: { label: 'Рыба и морепродукты', desc: 'Дикий лосось, сибас, треска, креветки' },
      dairy_products: { label: 'Кисломолочные продукты', desc: 'Греческий йогурт 0%, кефир, сыр фета' },
      vegan_plant: { label: 'Что-то веганское (Растительный белок)', desc: 'Тофу, темпе, чечевица, нут, эдамаме' },
      vegetarian: { label: 'Вегетарианское меню', desc: 'Сбалансированные растительные блюда' },
      eggs: { label: 'Фермерские яйца', desc: 'Цельные яйца, омлеты, яйца пашот' },
      nuts_seeds: { label: 'Полезные жиры и орехи', desc: 'Авокадо Хасс, оливковое масло, чиа' },
      gluten_free: { label: 'Безглютеновые цельные злаки', desc: 'Киноа, бурый рис, гречневая крупа, овсянка' },
    },
    ar: {
      meat_poultry: { label: 'دواجن ولحوم بيضاء', desc: 'صدور دجاج، ديك رومي خفيف' },
      meat_red: { label: 'لحوم حمراء قليلة الدهن', desc: 'ستيك بقري مغذى على العشب، لحم عجل' },
      fish_seafood: { label: 'أسماك ومأكولات بحرية', desc: 'سلمون بري، قاروص، روبيان' },
      dairy_products: { label: 'منتجات ألبان متخمرة', desc: 'زبادي يوناني 0%، كفير، جبن فيتا' },
      vegan_plant: { label: 'خيار نباتي (بروتين نباتي)', desc: 'توفو، تمبيه، عدس، حمص، إدامامي' },
      vegetarian: { label: 'مناسب للنباتيين', desc: 'وجبات نباتية متوازنة مع البيض والألبان' },
      eggs: { label: 'بيض بلدي طازج', desc: 'بيض كامل، بيض مخفوق، بيض مسلوق' },
      nuts_seeds: { label: 'دهون صحية ومكسرات', desc: 'أفوكادو، زيت زيتون، جوز، بذور شيا' },
      gluten_free: { label: 'حبوب كاملة خالية من الغلوتين', desc: 'كينوا، أرز بني، حنطة سوداء، شوفان' },
    },
    ja: {
      meat_poultry: { label: '鶏肉・ヘルシーな白身肉', desc: '国産鶏むね肉、ささみ、ターキー' },
      meat_red: { label: '赤身肉・グラスフェッドビーフ', desc: '牧草牛赤身ステーキ、ヒレ肉' },
      fish_seafood: { label: '魚介類・新鮮シーフード', desc: '天然鮭、スズキ、真鱈、エビ' },
      dairy_products: { label: '発酵乳製品・高タンパク乳', desc: '無脂肪ギリシャヨーグルト、ケフィア、フェタ' },
      vegan_plant: { label: 'ヴィーガン（植物性タンパク質）', desc: '木綿豆腐、テンペ、レンズ豆、ひよこ豆、枝豆' },
      vegetarian: { label: 'ベジタリアンフレンドリー', desc: '卵乳菜食のバランスの良い献立' },
      eggs: { label: '放し飼い新鮮卵', desc: '全卵、スクランブルエッグ、ポーチドエッグ' },
      nuts_seeds: { label: '良質な脂質・ナッツ類', desc: 'アボカド、オリーブオイル、くるみ、チアシード' },
      gluten_free: { label: 'グルテンフリー全粒穀物', desc: 'キヌア、発芽玄米、蕎麦の実、オートミール' },
    },
  };

  const lMap = prefMap[language];
  if (!lMap) return FOOD_PREFERENCE_CATEGORIES;

  return FOOD_PREFERENCE_CATEGORIES.map((item) => {
    const loc = lMap[item.id];
    if (!loc) return item;
    return {
      ...item,
      label: loc.label,
      desc: loc.desc,
    };
  });
}

/**
 * Localizes an entire DietPlan object into the active language
 */
export function localizeDietPlan(plan: DietPlan, language: AppLanguage): DietPlan {
  if (language === 'en') {
    return plan;
  }

  const slotDict = SLOT_TEXTS[language] || SLOT_TEXTS.en;

  // Localize each meal slot
  const localizedMeals: PlanMealSlot[] = plan.meals.map((meal) => {
    const slotInfo = slotDict[meal.slot] || slotDict.breakfast;

    // 1. Check custom cuisine dish dictionary for this title
    const customDish = getLocalizedCuisineDish(meal.title, language);

    let title = customDish?.title || meal.title;
    let description = customDish?.description || meal.description;
    let ingredients = customDish?.ingredients || meal.ingredients;
    let instructions = customDish?.instructions || (meal.instructions ? localizeStepInstructions(meal.instructions, language) : undefined);
    let chefTip = customDish?.chefTip || meal.chefTip;

    // 2. If no custom dish matched, check if recipeId is present and matches the recipe's title
    const recId = meal.recipeId;
    if (!customDish && recId) {
      const localizedRec = getLocalizedRecipe(recId, language);
      if (localizedRec && localizedRec.title && meal.title.toLowerCase().includes(recId.replace('recipe_', '').slice(0, 4))) {
        title = localizedRec.title;
        instructions = localizedRec.instructions;
        chefTip = localizedRec.chefTip;
        ingredients = localizedRec.ingredients.map((ing) => `${ing.amount} ${ing.name}`);
      }
    }

    return {
      ...meal,
      slotLabel: slotInfo.label,
      whatShouldBeEaten: slotInfo.whatShouldBeEaten,
      title,
      description,
      ingredients,
      instructions,
      chefTip,
    };
  });

  // Localize Cuisine Name and Plan Title
  const localizedCuisines = getLocalizedCuisines(language);
  const matchedCuisine = localizedCuisines.find((c) => c.id === plan.cuisine);
  const localizedCuisineName = matchedCuisine ? matchedCuisine.name : plan.cuisineName;
  const courseSuffixes: Record<AppLanguage, string> = {
    en: 'Daily Food Course',
    es: 'Plan Nutricional Diario',
    de: 'Täglicher Ernährungsplan',
    fr: 'Protocole Nutritionnel Quotidien',
    ru: 'Ежедневный план питания',
    ar: 'جدول الوجبات الغذائية اليومية',
    ja: '毎日の食事プログラム',
  };
  const localizedPlanTitle = `${plan.cuisineFlag} ${localizedCuisineName} — ${courseSuffixes[language] || 'Daily Food Course'}`;

  const goalSummaries: Record<AppLanguage, string> = {
    en: plan.goalSummary,
    es: `Protocolo diario estructurado (Desayuno, Media Mañana, Almuerzo, Merienda, Cena y Snack Nocturno) adaptado a tus objetivos y la tradición culinaria de ${localizedCuisineName}.`,
    de: `Strukturierter Tagesernährungsplan (Frühstück, Vormittagssnack, Mittagessen, Nachmittagssnack, Abendessen & Nachtsnack) abgestimmt auf Ihre Ziele und die kulinarische Tradition von ${localizedCuisineName}.`,
    fr: `Protocole nutritionnel structuré (Petit-déjeuner, Collation matinale, Dîner, Collation d'après-midi, Souper et Collation nocturne) aligné sur vos objectifs et les traditions culinaires de ${localizedCuisineName}.`,
    ru: `Структурированный рацион на день (Завтрак, Утренний перекус, Обед, Полдник, Ужин и Вечерний перекус), адаптированный под ваши цели и кулинарные традиции: ${localizedCuisineName}.`,
    ar: `جدول غذائي يومي منظم (إفطار، وجبة صباحية خفيفة، غداء رئيسي، وجبة مسائية خفيفة، عشاء، ووجبة ليلية خفيفة) متوافق مع أهدافك وتقاليد المطبخ: ${localizedCuisineName}.`,
    ja: `目標と${localizedCuisineName}の伝統料理に合わせた毎日の食事プログラム（朝食、午前スナック、昼食、午後スナック、夕食、就寝前スナック）。`,
  };

  // Localize Grocery list categories
  const localizedGrocery = plan.groceryList.map((g) => ({
    category: getLocalizedGroceryCategory(g.category, language),
    items: g.items,
  }));

  // Localize Guidelines
  const guidelinesMap: Record<AppLanguage, string[]> = {
    en: plan.guidelines,
    es: [
      'Bebe al menos 500 ml de agua filtrada al despertar para rehidratar los tejidos.',
      'Prioriza la proteína en cada comida principal para proteger la masa magra.',
      'Mastica lentamente cada bocado durante al menos 20 segundos para una digestión óptima.',
      'Cena al menos 2.5 horas antes de acostarte para maximizar el sueño REM reparador.',
      'Sazona con especias naturales y hierbas aromáticas ricas en polifenoles.',
    ],
    de: [
      'Trinken Sie direkt nach dem Aufstehen 500 ml Wasser zur Rehydrierung.',
      'Integrieren Sie in jede Hauptmahlzeit mageres Protein zum Erhalt der Muskelmasse.',
      'Kauen Sie jeden Bissen gründlich für optimale Verdauungsenzyme.',
      'Essen Sie das Abendessen mindestens 2,5 Stunden vor dem Schlafen für tiefen Schlaf.',
      'Nutzen Sie aromatische Kräuter und Gewürze mit wertvollen sekundären Pflanzenstoffen.',
    ],
    fr: [
      'Buvez 500 ml d\'eau dès le réveil pour relancer l\'hydratation cellulaire.',
      'Assurez un apport en protéines maigres à chaque repas principal.',
      'Prenez le temps de mastiquer au moins 20 secondes chaque bouchée.',
      'Dînez au moins 2h30 avant de dormir pour optimiser la qualité du sommeil réparateur.',
      'Privilégiez les herbes aromatiques et épices riches en polyphénols protecteurs.',
    ],
    ru: [
      'Выпивайте 500 мл чистой воды сразу после пробуждения для регидратации клеток.',
      'Включайте качественный белок в каждый прием пищи для сохранения мышечной массы.',
      'Тщательно пережевывайте пищу для лучшего усвоения питательных веществ.',
      'Ужинайте не позднее чем за 2,5 часа до сна для глубокого восстановительного сна.',
      'Используйте свежую зелень и натуральные специи, богатые антиоксидантами.',
    ],
    ar: [
      'اشرب 500 مل من الماء فور الاستيقاظ لترطيب الخلايا والأعضاء.',
      'احرص على تناول البروتين في كل وجبة رئيسية للحفاظ على الكتلة العضلية.',
      'امضغ الطعام ببطء لتسهيل إفراز الإنزيمات الهاضمة وامتصاص المغذيات.',
      'تناول وجبة العشاء قبل النوم بساعتين ونصف على الأقل لنوم عميق ومريح.',
      'استخدم الأعشاب والتوابل الطبيعية الغنية بمضادات الأكسدة.',
    ],
    ja: [
      '起床直後にコップ2杯（約500ml）の水分を摂り、細胞の水分を回復させます。',
      '毎食しっかりタンパク質を取り入れ、筋肉の分解を防ぎます。',
      '一口ごとに20秒以上よく噛み、消化酵素の働きを高めます。',
      '就寝の2.5時間前までに夕食を済ませ、質の高い深い睡眠を確保します。',
      '天然ハーブやスパイスを活かし、抗酸化ポリフェノールを豊富に補給します。',
    ],
  };

  return {
    ...plan,
    title: localizedPlanTitle,
    cuisineName: localizedCuisineName,
    goalSummary: goalSummaries[language] || plan.goalSummary,
    meals: localizedMeals,
    groceryList: localizedGrocery,
    guidelines: guidelinesMap[language] || plan.guidelines,
  };
}
