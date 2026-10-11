import { AppLanguage } from '../types/nutrition';

export interface LocalizedDish {
  title: string;
  description: string;
  chefTip?: string;
  ingredients?: string[];
  instructions?: string[];
}

export const STEP_PREFIXES: Record<AppLanguage, (stepNum: number) => string> = {
  en: (n) => `Step ${n}:`,
  es: (n) => `Paso ${n}:`,
  de: (n) => `Schritt ${n}:`,
  fr: (n) => `Étape ${n}:`,
  ru: (n) => `Шаг ${n}:`,
  ar: (n) => `الخطوة ${n}:`,
  ja: (n) => `ステップ ${n}:`,
};

export function localizeStepInstructions(steps: string[], language: AppLanguage): string[] {
  if (language === 'en') return steps;
  const prefixFn = STEP_PREFIXES[language] || STEP_PREFIXES.en;

  return steps.map((step, idx) => {
    // Replace "Step X:" or "Step X —" with localized prefix
    return step.replace(/^Step\s*\d+[\s:—–-]+/i, `${prefixFn(idx + 1)} `);
  });
}

export const DISH_TRANSLATIONS: Record<
  Exclude<AppLanguage, 'en'>,
  Record<string, LocalizedDish>
> = {
  // ========================= ESPAÑOL =========================
  es: {
    // Breakfasts
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: 'Revuelto Mediterráneo al Aceite de Oliva y Hierbas Silvestres',
      description: 'Huevos de campo revueltos a fuego lento en aceite de oliva virgen extra, tomates cherry dulces, queso feta de oveja y orégano silvestre griego sobre pan de masa madre.',
      chefTip: 'Cocina los huevos a fuego muy bajo con aceite prensado en frío para proteger la luteína y evitar que suelten agua.',
      ingredients: ['3 Huevos de campo camperos', '1 cda Aceite de oliva virgen extra', '1/2 taza Tomates cherry', '30g Queso feta tradicional', '1 rebanada Pan de masa madre artesanal', 'Orégano griego silvestre'],
      instructions: [
        'Paso 1: Batir los Huevos — Bate los huevos con una pizca de flor de sal marina, pimienta negra molida y 1 cucharada de agua fría hasta obtener una emulsión ligera y espumosa.',
        'Paso 2: Confitar Tomates — Calienta 1 cda de aceite de oliva en una sartén antiadherente a fuego medio. Añade los tomates cherry cortados en mitades y saltea 90 segundos hasta que la piel se arrugue ligeramente.',
        'Paso 3: Revuelto a Fuego Lento — Vierte los huevos batidos alrededor de los tomates y baja el fuego al mínimo. Con espátula de silicona, arrastra suavemente desde los bordes hacia el centro creando cintas cremosas y aterciopeladas.',
        'Paso 4: Tostar Masa Madre — Tuesta una rebanada gruesa de pan de masa madre hasta dorar de manera crujiente.',
        'Paso 5: Emplatar — Coloca el revuelto cremoso sobre la tostada caliente, desmenuza el queso feta encima, rocía con unas gotas de aceite virgen extra y espolvorea orégano griego.',
      ],
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: 'Revuelto de Tofu a la Cúrcuma Orgánica y Tostada de Aguacate',
      description: 'Tofu firme orgánico salteado con levadura nutricional, espinacas baby, tomates cherry dulces y tostada integral con aguacate Hass.',
      chefTip: 'La levadura nutricional aporta un sabor umami profundo y vitaminas esenciales del complejo B para la energía matutina.',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: 'Revuelto de Salmón Salvaje Ahumado, Eneldo y Masa Madre',
      description: 'Huevos de campo revueltos y cremosos con láminas de salmón salvaje ahumado, eneldo fresco y alcaparras sobre tostada artesanal crujiente.',
      chefTip: 'Agrega el salmón ahumado al final fuera del fuego para preservar los ácidos grasos omega-3 intactos.',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: 'Bol Energético de Yogur Griego Auténtico y Frutos del Bosque',
      description: 'Yogur griego colado 0% con arándanos silvestres, semillas de chía, nueces crudas troceadas y canela de Ceilán pura.',
      chefTip: 'El yogur griego colado contiene el doble de proteína natural, manteniendo la saciedad muscular durante toda la mañana.',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: 'Desayuno Japonés Washoku: Tamagoyaki y Salmón al Caldo Dashi',
      description: 'Tortilla japonesa enrollada con caldo dashi tradicional, sopa de miso con wakame, arroz integral al vapor y salmón salvaje a la plancha.',
      chefTip: 'La sopa de miso tradicional activa el microbioma digestivo y las enzimas metabólicas matutinas.',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'Frittata Toscana con Tomates Secos y Albahaca Fresca',
      description: 'Frittata al horno con albahaca dulce, tomates secos San Marzano y ricotta suave sobre pan ciabatta tostado.',
      chefTip: 'El horneado a baja temperatura mantiene la textura sedosa de los huevos y preserva los antioxidantes de la albahaca.',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'Huevos Rancheros con Frijoles Negros y Salsa Casera',
      description: 'Huevos fritos en sartén sobre tortillas de maíz calientes, salsa ranchera de tomate y chile asado, frijoles negros cocidos y aguacate.',
      chefTip: 'Los frijoles negros aportan fibra prebiótica soluble que equilibra la glucosa postprandial.',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'Tortilla Española Jugosa con Pan con Tomate',
      description: 'Tortilla clásica de patatas confitadas en aceite de oliva virgen extra y huevos de campo con pan crujiente frotado con tomate maduro y ajo.',
      chefTip: 'Confitar la patata a fuego lento en aceite virgen extra crea una textura melosa e incomparable.',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: 'Gyeran-jjim Coreano al Vapor con Arroz y Algas Nori',
      description: 'Huevos al vapor estilo coreano esponjosos en cazuela de barro con cebolleta, aceite de sésamo tostado y arroz integral con algas.',
      chefTip: 'La cocción al vapor suave es la técnica más digestiva para conservar la biodisponibilidad de las proteínas.',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'Bol Estilo Bánh Mì Vietnamita con Huevos y Encurtidos',
      description: 'Huevos revueltos aromatizados con hierbas frescas, zanahorias y daikon encurtidos, pepino crujiente y cilantro.',
      chefTip: 'Las verduras encurtidas fermentadas aportan probióticos y frescura para activar la digestión.',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: 'Desayuno Nórdico: Salmón Ahumado y Tostadas Crujientes de Centeno',
      description: 'Láminas de salmón salvaje del Atlántico, queso quark bajo en grasa, pepino y eneldo sobre pan crujiente de centeno integral.',
      chefTip: 'El centeno integral fermentado reduce los picos de insulina y brinda energía sostenida de bajo índice glucémico.',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: 'Kasha de Trigo Sarraceno con Setas Salteadas y Huevo Poché',
      description: 'Granos de trigo sarraceno tostados con setas silvestres al ajo, eneldo fresco y huevo poché con yema líquida dorada.',
      chefTip: 'El trigo sarraceno es un pseudocereal libre de gluten rico en rutina, un flavonoide cardioprotector.',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'Omelette Parisina a las Finas Hierbas con Ensalada Mesclun',
      description: 'Omelette francesa clásica cremosa con perifollo, estragón, perejil y cebollino acompañada de hojas tiernas aliñadas.',
      chefTip: 'Mueve la sartén en círculos rápidos a fuego bajo para lograr una textura externa lisa sin color dorado.',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: 'Copa Antioxidante de Yogur Griego y Arándanos Silvestres',
      description: 'Yogur colado 0% cubierto con arándanos silvestres frescos, nueces crudas trituradas y una pizca de canela pura.',
      chefTip: 'Las proteínas de caseína liberan aminoácidos de forma continua durante 3 horas para evitar caídas de energía.',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: 'Edamame al Vapor con Sal Marina y Almendras Tostadas',
      description: 'Vainas de edamame verde al vapor con cristales de sal marina y almendras enteras tostadas crujientes.',
      chefTip: 'La combinación de isoflavonas de soja y vitamina E protege la piel y sacia el apetito de media mañana.',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'Té Matcha Ceremonial y Vainas de Edamame al Vapor',
      description: 'Té verde matcha rico en antioxidantes EGCG acompañado de edamame con una pizca de sal marina.',
      chefTip: 'La L-teanina del matcha equilibra la cafeína, aportando calma y concentración sin nerviosismo.',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'Pepinos Persas con Salsa de Tahini al Limón y Ajo',
      description: 'Bastones de pepino persa crujiente con dip de sésamo tahini molido a la piedra, zumo de limón fresco y zumaque.',
      chefTip: 'El tahini de sésamo es rico en calcio biodisponible y grasas monoinsaturadas cardiosaludables.',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'Almendras Valencianas Tostadas y Clementina Dulce',
      description: 'Almendras tostadas ligeramente saladas combinadas con una clementina jugosa rica en vitamina C natural.',
      chefTip: 'Los flavonoides cítricos potencian la absorción de los minerales presentes en las almendras.',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: 'Láminas Crujientes de Alga Nori Tostada y Té de Cebada',
      description: 'Crujientes hojas de alga nori tostada con una gota de aceite de sésamo y té boricha caliente sin teína.',
      chefTip: 'El alga nori aporta yodo natural para el metabolismo tiroideo con mínimas calorías.',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: 'Ensalada Mediterránea de Pollo a las Hierbas y Limón',
      description: 'Pechuga de pollo a la plancha marinada con romero y limón sobre hojas verdes mixtas, tomates cherry, pepino, aceitunas y aderezo de oliva virgen extra.',
      chefTip: 'La combinación de vitamina C del limón y hierro vegetal maximiza la energía celular y la síntesis de colágeno.',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'Bol Mezze de Falafel al Horno y Quinoa Real',
      description: 'Crujientes falafels caseros al horno con quinoa cocida, hummus cremoso, pepino persa, tomates y salsa tahini ligera.',
      chefTip: 'Hornear los falafels en lugar de freírlos reduce grasas saturadas manteniendo fibra y proteína vegetal saciantes.',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'Lubina Salteada con Alcaparras y Tomates Mediterráneos',
      description: 'Filete de lubina dorada a la plancha con piel crujiente sobre salsa de tomates cherry salteados, alcaparras y albahaca.',
      chefTip: 'Cocina primero con la piel hacia abajo presionando suavemente para lograr un dorado parejo y crujiente.',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'Filete de Ternera con Espárragos Asados y Patatas Nuevas',
      description: 'Ternera magra criada en pasto a la parrilla con espárragos trigueros al horno y patatitas tiernas al romero.',
      chefTip: 'Deja reposar la carne 5 minutos antes de cortarla para que los jugos se redistribuyan y se mantenga tierna.',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'Pollo al Limón Italiano con Polenta y Verduras al Romero',
      description: 'Suprema de pollo estofada en reducción de limón y vino blanco con polenta de maíz cremosa y acelgas salteadas.',
      chefTip: 'La reducción de limón disuelve los colágenos aportando jugosidad sin necesidad de cremas pesadas.',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: 'Bento de Pollo Glaseado Teriyaki y Arroz Integral Tokio',
      description: 'Tiras de pollo salteadas con salsa teriyaki natural sin azúcar refinada, brócoli al vapor y arroz integral.',
      chefTip: 'Utiliza mirin natural y tamari bajo en sodio para lograr brillo y sabor umami auténtico sin exceso de sal.',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'Bol Mexicano de Pollo al Chipotle y Arroz con Lima y Cilantro',
      description: 'Pechuga de pollo marinada con chipotle y comino sobre arroz integral con zumo de lima fresca, frijoles negros y aguacate.',
      chefTip: 'La capsaicina del chile chipotle estimula levemente la termogénesis y activa los receptores de saciedad.',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'Pechuga de Pollo Tandoori con Dal de Lentejas Amarillas',
      description: 'Pollo marinado en yogur y especias aromáticas garam masala acompañado de guiso dal de lentejas amarillas y espinacas.',
      chefTip: 'La cúrcuma y el jengibre del adobo tandoori aportan potentes bioactivos antiinflamatorios comprobados.',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'Pollo al Ajillo Tradicional con Arroz al Azafrán y Pimientos del Piquillo',
      description: 'Trozos de pollo dorado con láminas de ajo crujiente, vino blanco y perejil servido con arroz al azafrán y pimientos asados.',
      chefTip: 'La alicina del ajo ligeramente dorado apoya la salud cardiovascular y refuerza el sistema inmunitario.',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: 'Bol Coreano de Pollo Bulgogi con Kimchi Fermentado y Arroz',
      description: 'Tiras de pollo marinadas con pera coreana, jengibre y soja, salteadas con cebolletas y acompañadas de kimchi tradicional.',
      chefTip: 'El kimchi fermentado enriquece la microbiota con cepas de Lactobacillus beneficiosas para la salud intestinal.',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'Ensalada Vietnamita de Pollo a la Hierba Limón y Fideos de Arroz',
      description: 'Pollo a la plancha perfumado con hierba limón y jengibre sobre fideos de arroz finos, brotes de soja, menta fresca y lima.',
      chefTip: 'Los aceites esenciales de la hierba limón facilitan la digestión gástrica tras comidas ricas en proteínas.',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'Bocado Energético de Almendras y Higo Seco Dulce',
      description: 'Almendras crudas seleccionadas combinadas con higos secos ricos en fibra soluble y minerales.',
      chefTip: 'La fibra de los higos y las grasas saludables de la almendra estabilizan la glucemia durante la tarde.',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: 'Crujientes de Arroz con Nori y Té Verde Sencha',
      description: 'Mini tortitas ligeras de arroz integral envueltas en nori con infusión caliente de té verde sencha.',
      chefTip: 'El té sencha proporciona catequinas termogénicas que reactivan el metabolismo vespertino.',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'Jícama y Pepino Fresco con Chile, Lima y Tajín',
      description: 'Palitos crujientes de jícama y pepino rociados con zumo de lima y condimento suave de chile en polvo.',
      chefTip: 'La jícama es excepcionalmente rica en inulina, un prebiótico que nutre las bacterias beneficiosas del colon.',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'Garbanzos Crujientes al Horno con Limón y Zaatar',
      description: 'Garbanzos cocidos y horneados hasta quedar crujientes con aceite de oliva virgen, zumo de limón y mezcla de hierbas zaatar.',
      chefTip: 'Una excelente fuente de proteína vegetal crujiente sin gluten para superar el bajón de la tarde.',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'Dátiles Jujube Crujientes con Nueces de Nogal',
      description: 'Dátiles rojos jujube deshidratados crujientes con mitades de nueces ricas en ácidos grasos omega-3.',
      chefTip: 'Los dátiles jujube contienen saponinas que promueven la relajación del sistema nervioso al final de la jornada.',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: 'Bol Energético de Salmón Salvaje Glaseado y Quinoa Real',
      description: 'Lomo de salmón salvaje dorado con quinoa tricolor al vapor, edamame, aguacate y vinagreta cítrica suave.',
      chefTip: 'Los ácidos grasos omega-3 EPA y DHA favorecen la recuperación muscular y mejoran la calidad del descanso.',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: 'Tempeh con Costra de Sésamo y Fideos Soba con Brócoli',
      description: 'Tiras de tempeh fermentado marinadas y cubiertas de sésamo con fideos de trigo sarraceno soba y ramilletes de brócoli al vapor.',
      chefTip: 'La fermentación del tempeh hace que sus proteínas e isoflavonas sean de absorción extraordinariamente fácil.',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: 'Filete de Solomillo con Espárragos Asados y Puré de Coliflor al Ajo',
      description: 'Medallón de solomillo de ternera magra a la plancha con espárragos trigueros y suave puré aterciopelado de coliflor con hierbas.',
      chefTip: 'Reemplazar el puré de patata por coliflor reduce los carbohidratos nocturnos y aporta glucosinolatos protectores.',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: 'Salmón Salvaje al Miso con Bok Choy Asado al Vapor',
      description: 'Filete de salmón glaseado con miso blanco y jengibre servido sobre corazones tiernos de bok choy salteados al wok.',
      chefTip: 'La cocción al horno a fuego medio mantiene el salmón jugoso y concentra los aminoácidos sabrosos del miso.',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: 'Bacalao al Horno con Costra de Hierbas y Caponata Siciliana',
      description: 'Lomo de bacalao fresco al horno cubierto con hierbas aromáticas provenzales sobre guiso agridulce de berenjena y tomate.',
      chefTip: 'El bacalao es una de las fuentes de proteína más puras y ligeras para facilitar la digestión nocturna.',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: 'Huachinango Estilo Veracruzano con Lima y Cilantro',
      description: 'Pescado blanco cocinado a fuego lento en salsa ligera de tomates asados, aceitunas verdes, alcaparras y cilantro.',
      chefTip: 'El sofrito veracruzano aporta licopeno biodisponible sin grasas añadidas pesadas.',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: 'Langostinos Pochados al Coco y Lima con Verduras Bangkok',
      description: 'Langostinos jugosos pochados en caldo suave de leche de coco ligera, lima, hierba limón y brotes tiernos verdes.',
      chefTip: 'Pochar los mariscos a fuego suave conserva su textura tierna y sus antioxidantes astaxantina naturales.',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: 'Pescado Blanco al Horno con Escalivada e Hinojo Asado',
      description: 'Filete de merluza fresca al horno con pimientos rojos y berenjenas asadas a la leña con bulbos de hinojo crujiente.',
      chefTip: 'El hinojo asado alivia la pesadez estomacal y favorece un tránsito digestivo tranquilo antes de dormir.',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: 'Guiso Coreano de Salmón al Doenjang con Verduras Estofadas',
      description: 'Sopa reconfortante de salmón con pasta tradicional de soja fermentada doenjang, calabacín, tofu sedoso y espinacas.',
      chefTip: 'El doenjang aporta péptidos bioactivos que apoyan las defensas y la regulación del colesterol nocturno.',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'Pescado Estilo Chả Cá Lã Vọng a la Cúrcuma y Eneldo Fresco',
      description: 'Pescado blanco marinado con cúrcuma dorada y jengibre, salteado con abundantes ramas de eneldo fresco y cebolleta.',
      chefTip: 'El eneldo actúa como carminativo natural relajando las paredes intestinales para un sueño reparador.',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: 'Infusión de Manzanilla Orgánica con Semillas Ricas en Magnesio',
      description: 'Flores enteras de manzanilla egipcia en infusión relajante con semillas de calabaza ricas en magnesio y chocolate negro 85%.',
      chefTip: 'Las semillas de calabaza y el cacao aportan magnesio y zinc esenciales para sintetizar el neurotransmisor GABA.',
      ingredients: ['1 taza Infusión de manzanilla orgánica', '15g Semillas de calabaza crudas', '10g Chocolate negro 85%'],
      instructions: [
        'Paso 1: Calentar Agua — Calienta agua filtrada a 95°C (justo antes del punto de hervor).',
        'Paso 2: Infusionar Tapado — Coloca flores enteras de manzanilla en una taza, vierte el agua y tapa 6 minutos para atrapar los aceites esenciales calmantes.',
        'Paso 3: Servir Semillas y Cacao — Sirve en un plato pequeño 15g de semillas de calabaza crudas y una onza de cacao puro.',
        'Paso 4: Saborear 40 Minutos Antes de Dormir — Destapa la taza, inhala el vapor floral y bebe despacio mientras masticas las semillas para inducir el descanso.',
      ],
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: 'Elixir de Kéfir Probiótico y Cereza Ácida Montmorency',
      description: 'Kéfir cultivado artesanal batido con concentrado de cereza ácida Montmorency rica en melatonina natural exógena.',
      chefTip: 'Las cerezas Montmorency son una de las fuentes naturales más concentradas de melatonina y antioxidantes del sueño.',
      ingredients: ['120ml Kéfir probiótico natural', '2 cdas Concentrado de cereza ácida Montmorency'],
      instructions: [
        'Paso 1: Servir Kéfir — Vierte 120ml de kéfir frío en un vaso pequeño.',
        'Paso 2: Mezclar Concentrado — Añade 2 cdas de concentrado puro de cereza ácida y remueve suavemente con una cuchara.',
        'Paso 3: Tomar 30 Minutos Antes de Acostarse — Bebe despacio para nutrir el microbioma y activar los ciclos naturales de melatonina.',
      ],
    },
  },

  // ========================= DEUTSCH (GERMAN) =========================
  de: {
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: 'Mediterranes Rührei mit Olivenöl und Wildkräutern',
      description: 'Sanft in kaltgepresstem Olivenöl gestocktes Rührei mit süßen Kirschtomaten, Schafskäse und wildem griechischen Oregano auf Sauerteigbrot.',
      chefTip: 'Eier bei milder Hitze mit Olivenöl stocken lassen, um Lutein und Carotinoide vor Hitzeoxidation zu schützen.',
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: 'Bio-Kurkuma-Tofu-Rührei und Avocado-Vollkorntoast',
      description: 'Proteinreicher Bio-Tofu mit Hefeflocken, Babyspinat, Kirschtomaten und feiner Avocado auf gekeimtem Vollkornbrot.',
      chefTip: 'Hefeflocken liefern ein herzhaftes Umami-Aroma und wertvolle B-Vitamine für den morgendlichen Zellstoffwechsel.',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: 'Räucherlachs-Dill-Rührei auf knusprigem Sauerteigbrot',
      description: 'Cremiges Freilandei-Rührei mit Wildlachsstreifen, frischem Gartendill und Kapern auf geröstetem Natursauerteig.',
      chefTip: 'Den Lachs erst ganz zum Schluss von der Herdplatte nehmen, um die wertvollen Omega-3-Fettsäuren zu schonen.',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: 'Griechischer Joghurt-Power-Bowl mit Waldbeeren & Walnüssen',
      description: 'Echter 0%-Schafsjoghurt mit wilden Blaubeeren, Chiasamen, knackigen Walnüssen und einer Prise Ceylon-Zimt.',
      chefTip: 'Echter traditioneller Schafsjoghurt liefert doppelt so viel Eiweiß und hält den Muskelaufbau optimal stabil.',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: 'Japanisches Washoku-Frühstück: Tamagoyaki & Lachs-Dashi',
      description: 'Gerollte Omelettstreifen mit traditionellem Dashi-Fond, Wakame-Misosuppe, gedämpftem Vollkornreis und gegrilltem Lachs.',
      chefTip: 'Fermentierte Misosuppe aktiviert die morgendliche Darmflora und sorgt für optimale Nährstoffresorption.',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'Toskanische Frittata mit getrockneten Tomaten & Basilikum',
      description: 'Im Ofen gebackene Eierfrittata mit sonnengetrockneten San-Marzano-Tomaten, frischem Basilikum und cremigem Ricotta.',
      chefTip: 'Sanftes Garen im Ofen verleiht der Frittata eine saftige Konsistenz ohne Verbrennen.',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'Huevos Rancheros mit schwarzen Bohnen und pikanter Salsa',
      description: 'Spiegeleier auf warmen Maistortillas mit gerösteter Tomatensalsa, ballaststoffreichen schwarzen Bohnen und Avocado.',
      chefTip: 'Schwarze Bohnen enthalten lösliche Ballaststoffe, die den Blutzuckerspiegel nach dem Frühstück glätten.',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'Spanische Tortilla Española mit knusprigem Tomatenbrot',
      description: 'Klassische spanische Kartoffeltortilla in Olivenöl geschmort mit geröstetem Landbrot und frischer Tomaten-Knoblauch-Paste.',
      chefTip: 'Schmoren der Kartoffeln in bestem Olivenöl sorgt für die berühmte saftige Textur.',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: 'Koreanisches gedämpftes Gyeran-jjim mit Seetang-Reis',
      description: 'Luftig gedämpfte Eierspeise im Tontopf mit Frühlingszwiebeln, geröstetem Sesamöl und Vollkornreis mit Noristreifen.',
      chefTip: 'Schonendes Dämpfen ist die schonendste Garmethode für maximale Bioverfügbarkeit von Proteinen.',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'Vietnamesische Bánh-Mì-Rührei-Bowl mit eingelegtem Gemüse',
      description: 'Gewürztes Rührei mit frischem Koriander, eingelegten Möhren und Daikon-Rettich auf knackigem Gurkenbett.',
      chefTip: 'Fermentiertes Gemüse unterstützt die Verdauungsenzyme für den ganzen Tag.',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: 'Nordisches Räucherlachs-Frühstück auf Roggenknäckebrot',
      description: 'Zarter atlantischer Räucherlachs, Magerquark, Gurkenscheiben und Dill auf ballaststoffreichem Vollkornroggenbrot.',
      chefTip: 'Vollkornroggen hat einen besonders niedrigen glykämischen Index und liefert anhaltende Konzentration.',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: 'Buchweizen-Kascha mit gebratenen Waldpilzen & weichem Ei',
      description: 'Gerösteter Buchweizen mit Knoblauch-Waldpilzen, frischem Dill und einem pochierten Freilandei mit flüssigem Eigelb.',
      chefTip: 'Buchweizen ist von Natur aus glutenfrei und reich an gefäßschützendem Rutin.',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'Pariser Kräuteromelett mit feinem Mesclun-Blattsalat',
      description: 'Klassisch französisches Omelett mit Kerbel, Estragon, Petersilie und Schnittlauch zu zartem Vinaigrette-Salat.',
      chefTip: 'Das Omelett mit schnellen Kreisbewegungen stocken lassen, damit es außen samtig und innen weich bleibt.',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: 'Antioxidantien-Becher mit griechischem Joghurt & Waldbeeren',
      description: 'Cremiger Schafsjoghurt mit frischen Waldblaubeeren, zerkleinerten Walnüssen und einer Prise edlem Ceylon-Zimt.',
      chefTip: 'Kaseinprotein wird über drei Stunden hinweg langsam verdaut und schützt vor Heißhunger.',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: 'Gedämpfte Meersalz-Edamame mit gerösteten Mandeln',
      description: 'Knackige junge Sojabohnen im Dampf gegart mit grobem Meersalz und aromatisch gerösteten ganzen Mandeln.',
      chefTip: 'Sojaisoflavone und natürliches Vitamin E schützen Zellen vor oxidativem Alltagsstress.',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'Zeremonieller Matcha-Grüntee & gedämpfte Edamame-Schoten',
      description: 'Belebender EGCG-reicher Matcha-Tee kombiniert mit warmen Edamame-Schoten und feinem Meersalz.',
      chefTip: 'L-Theanin im Matcha sorgt für fokussierte Wachheit ohne Herzrasen.',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'Persische Gurkensticks mit Zitronen-Knoblauch-Tahini-Dip',
      description: 'Knackige Mini-Gurken mit cremigem Steinmühlen-Sesam-Tahini, frischem Zitronensaft und herbem Sumach.',
      chefTip: 'Sesamsamen sind herausragende pflanzliche Kalzium- und Zinklieferanten.',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'Valencianische Röstmandeln & sonnengereifte Clementine',
      description: 'Zart geröstete Mandeln mit Meersalz kombiniert mit einer saftigen Clementine voller natürlichem Vitamin C.',
      chefTip: 'Zitrusflavonoide erleichtern dem Körper die Aufnahme der wertvollen Spurenelemente.',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: 'Geröstete Nori-Seetang-Chips & wärmender Gerstentee',
      description: 'Knusprige Nori-Algenblätter mit feinstem Sesamöl zu koffeinfreiem geröstetem Gerstentee.',
      chefTip: 'Nori liefert natürliches Spurenelement Jod für eine gesunde Schilddrüsenfunktion.',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: 'Mediterraner Kräuter-Zitronen-Hähnchensalat',
      description: 'Saftig gegrillte Hähnchenbrust mit Rosmarin und Zitrone auf buntem Salatbett mit Kirschtomaten, Gurke, Oliven und Olivenöl.',
      chefTip: 'Zitronensaft und frische Kräuter maximieren die Bioverfügbarkeit von Eisen und Kollagen.',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'Ofen-Falafel & Quinoa-Mezze-Bowl mit Hummus',
      description: 'Knusprig im Ofen gebackene Kichererbsen-Falafel mit Quinoa, samtigem Hummus, Tomaten und feinem Tahini-Dressing.',
      chefTip: 'Backen statt Frittieren spart unerwünschtes Fett und erhält wertvolle Pflanzenfasern.',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'Gebratener Wolfsbarsch mit Kapern & mediterranen Tomaten',
      description: 'Kross gebratenes Wolfsbarschfilet auf der Haut serviert auf warmem Sugo aus Kirschtomaten, Kapern und Basilikum.',
      chefTip: 'Den Fisch zuerst auf der Hautseite braten und leicht andrücken für gleichmäßige Knusprigkeit.',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'Gegrilltes Weiderind-Steak mit grünem Spargel & Rosmarinkartoffeln',
      description: 'Mageres Rindersteak von Weiderindern mit geröstetem Ofenspargel und zarten kleinen Kartoffeln.',
      chefTip: 'Das Fleisch vor dem Anschneiden 5 Minuten ruhen lassen, damit der Fleischsaft erhalten bleibt.',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'Italienisches Pollo al Limone mit Polenta & Mangold',
      description: 'Zarte Hähnchenbrust in feiner Zitronen-Weißwein-Sauce mit cremiger Maispolenta und geschmortem Mangold.',
      chefTip: 'Die milde Zitronensäure macht das Geflügelfleisch wunderbar zart ohne schwere Sahnesaucen.',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: 'Tokio Teriyaki-Hähnchen-Bento mit Vollkornreis & Brokkoli',
      description: 'Zartes Hähnchen mit naturbelassener Teriyakisauce ohne Raffinadezucker, gedämpftem Brokkoli und Vollkornreis.',
      chefTip: 'Traditionelles Mirin und natriumreduziertes Tamari sorgen für Umami-Tiefe ohne Wasseransammlungen.',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'Mexikanische Chipotle-Hähnchen-Bowl mit Koriander-Limetten-Reis',
      description: 'Würzig mariniertes Chipotle-Hähnchen auf Vollkornreis mit Limettensaft, schwarzen Bohnen und frischer Avocado.',
      chefTip: 'Capsaicin aus Chipotle-Chilis kurbelt die Wärmeproduktion des Körpers sanft an.',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'Tandoori-Gewürz-Hähnchenbrust mit gelbem Linsen-Dal',
      description: 'In Joghurt und Garam Masala mariniertes Hähnchen mit mild-würzigem Dal aus gelben Linsen und Babyspinat.',
      chefTip: 'Kurkuma und Ingwer in der Tandoorimarinade wirken nachweislich stark antioxidativ und entzündungshemmend.',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'Spanisches Knoblauchhähnchen Pollo al Ajillo mit Safranreis',
      description: 'Goldgelb gebratenes Hähnchen mit Knoblauchchips, Weißwein und Petersilie zu Safranreis und Piquillo-Paprika.',
      chefTip: 'Allicin aus frischem Knoblauch unterstützt Gefäßgesundheit und Blutdruckregulation.',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: 'Koreanische Bulgogi-Hähnchen-Bowl mit fermentiertem Kimchi',
      description: 'Mit Birne, Soja und Ingwer mariniertes Hähnchenfleisch mit Frühlingszwiebeln und traditionellem probiotischem Kimchi.',
      chefTip: 'Milchsäurebakterien im Kimchi fördern eine artenreiche, gesunde Darmflora.',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'Saigon Zitronengras-Hähnchen mit Reisnudel-Kräutersalat',
      description: 'Aromatisch über Holzkohle gegrilltes Hähnchen mit Zitronengras auf zarten Reisnudeln mit Minze und Limettendressing.',
      chefTip: 'Ätherische Öle im Zitronengras erleichtern dem Magen die Eiweißspaltung spürbar.',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'Kalifornische Mandeln & süße Feigen-Power-Snack',
      description: 'Naturbelassene Mandeln mit sonnengetrockneten Feigen voller Ballaststoffe und Spurenelemente.',
      chefTip: 'Die Kombination aus Ballaststoffen und Pflanzenfetten hält das Nachmittagstief zuverlässig fern.',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: 'Reis-Nori-Cracker mit dampfendem Sencha-Grüntee',
      description: 'Luftige Vollkornreis-Waffeln mit Nori-Ummantelung zu einer Schale frisch aufgebrühtem Sencha-Tee.',
      chefTip: 'Grüntee-Polyphenole unterstützen die geistige Konzentration am späten Nachmittag.',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'Knackige Jícama & Gurkensticks mit Limetten-Chili-Tajín',
      description: 'Erfrischende Streifen aus Jícama-Wurzel und Gurke beträufelt mit frischem Limettensaft und milder Chiliwürze.',
      chefTip: 'Jícama enthält wertvolles Inulin, das als Präbiotikum nützliche Bifidobakterien ernährt.',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'Geröstete Zitronen-Kichererbsen mit Zaatar-Kräutern',
      description: 'Im Ofen kross gebackene Kichererbsen mit nativem Olivenöl, Zitronensaft und aromatischer Zaatar-Gewürzmischung.',
      chefTip: 'Ein idealer pflanzlicher Proteinsnack mit hohem Sättigungsgrad.',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'Knusprige getrocknete Jujube-Datteln mit Walnusskernen',
      description: 'Getrocknete rote Jujube-Früchte kombiniert mit knackigen Walnusshälften reich an Omega-3.',
      chefTip: 'Jujube-Datteln enthalten beruhigende Pflanzenstoffe, die den Übergang in den Feierabend einleiten.',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: 'Glasierter Wildlachs-Power-Bowl mit Quinoa & Edamame',
      description: 'Zarter Wildlachs aus dem Ofen mit dreifarbiger Quinoa, gedämpften Edamame, Avocado und mildem Zitrussud.',
      chefTip: 'Omega-3-Fettsäuren EPA und DHA regenerieren Zellmembranen während der Nachtruhe.',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: 'Sesam-Tempeh mit Soba-Buchweizennudeln & Brokkoli',
      description: 'In Tamari mariniertes Tempeh mit Sesampanade zu nussigen Buchweizennudeln und knackigem Brokkoli.',
      chefTip: 'Fermentiertes Tempeh ist besonders bekömmlich und schont den Verdauungstrakt vor dem Schlafen.',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: 'Rinderfilet mit grünem Ofenspargel & Knoblauch-Kräuter-Püree',
      description: 'Mageres Rinderfiletmedaillon mit knackigem Spargel und samtigem Blumenkohlpüree statt schwerer Kartoffeln.',
      chefTip: 'Blumenkohlpüree spart Kohlenhydrate am Abend und liefert zellschützende Glucosinolate.',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: 'Miso-Wildlachs mit gebratenem Pak Choi im Wok',
      description: 'Mit hellem Miso und Ingwer glasierter Lachs zu im Wok geschmortem zartem Pak-Choi-Gemüse.',
      chefTip: 'Miso-Glasur karamellisiert sanft und schließt die Feuchtigkeit im Lachsfilet ein.',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: 'Kräuter-Kabeljau aus dem Ofen mit sizilianischer Caponata',
      description: 'Frischer Kabeljau mit feiner Kräuterkruste auf mildem Auberginen-Tomaten-Gemüse mit feiner Polenta.',
      chefTip: 'Kabeljau liefert reines, mageres Protein für optimale Muskelregeneration ohne Völlegefühl.',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: 'Roter Schnapper nach Veracruz-Art mit Limette & Koriander',
      description: 'Zarter Edelfisch sanft gegart in milder Sauce aus Tomaten, Oliven, Kapern und Limettensaft.',
      chefTip: 'Gekochte Tomaten enthalten hoch bioverfügbares Lycopin zum Schutz der Gefäße.',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: 'Pochierte Garnelen in Kokos-Limetten-Brühe mit Blattgrün',
      description: 'Knackige Garnelen sanft gegart in milder fettarmer Kokosmilch mit Zitronengras, Limette und zartem Spinat.',
      chefTip: 'Sanftes Garziehen bei niedriger Temperatur hält Garnelen saftig und schützt das wertvolle Astaxanthin.',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: 'Spanischer Ofenfisch mit Escalivada & geröstetem Fenchel',
      description: 'Weißer Fisch im Ofen geschmort mit feinem Grillgemüse aus Paprika, Auberginen und aromatischem Fenchel.',
      chefTip: 'Fenchel enthält ätherische Öle, die die Magenmuskulatur entspannen und die Schlafqualität steigern.',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: 'Koreanischer Doenjang-Lachseintopf mit geschmortem Gemüse',
      description: 'Wärmende Brühe mit Doenjang-Sojapaste, Lachsfilet, Zucchini, Seidentofu und Frühlingsgemüse.',
      chefTip: 'Traditionell gebraute Sojapaste spendet bioaktive Peptide zur Regulierung des nächtlichen Stoffwechsels.',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'Vietnamesischer Fisch nach Chả-Cá-Art mit Kurkuma & Dill',
      description: 'Mit Kurkuma und Ingwer marinierter Fisch in der Pfanne geschwenkt mit reichlich frischem Gartendill und Frühlingszwiebeln.',
      chefTip: 'Dill wirkt krampflösend auf den Darm und bereitet den Körper auf erholsamen Schlaf vor.',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: 'Bio-Kamillentee mit magnesiumreichen Kürbiskernen',
      description: 'Ganze ägyptische Kamillenblüten frisch aufgebrüht mit gerösteten Kürbiskernen und einem Stück 85% Edelbitter-Schokolade.',
      chefTip: 'Kürbiskerne zählen zu den reichsten natürlichen Quellen für Zink und Magnesium zur GABA-Bildung.',
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: 'Probiotischer Kefir & Sauerkirsch-Schlaf-Elixier',
      description: 'Cremiger Naturkefir verstrudelt mit reinem Montmorency-Sauerkirschsaft als natürliche Melatoninquelle.',
      chefTip: 'Montmorency-Sauerkirschen enthalten hohe Konzentrationen an natürlichem Melatonin und verkürzen die Einschlafzeit.',
    },
  },

  // ========================= FRANÇAIS (FRENCH) =========================
  fr: {
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: 'Brouillade d\'Œufs Méditerranéenne à l\'Huile d\'Olive et Herbes',
      description: 'Œufs fermiers doucement brouillés à l\'huile d\'olive extra vierge, tomates cerises confites, feta authentique et origan sauvage sur pain au levain.',
      chefTip: 'Cuire à feu très doux avec une huile de première pression à froid pour préserver la lutéine et éviter que les œufs ne rendent d\'eau.',
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: 'Brouillade de Tofu au Curcuma Bio et Toast d\'Avocat',
      description: 'Tofu ferme biologique riche en protéines, levure maltée, épinards tendres, tomates cerises et avocat sur pain complet germé.',
      chefTip: 'La levure maltée apporte un parfum umami incomparable et les vitamines du complexe B nécessaires au tonus matinal.',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: 'Brouillade de Saumon Sauvage Fumé à l\'Aneth sur Levain',
      description: 'Œufs fermiers crémeux parsemés de lanières de saumon sauvage fumé, aneth frais du jardin et câpres sur tartine croustillante.',
      chefTip: 'Incorporer le saumon fumé hors du feu pour ne pas cuire ses précieux acides gras oméga-3.',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: 'Bol d\'Énergie au Yaourt Grec Traditionnel et Baies Sauvages',
      description: 'Véritable yaourt égoutté 0% nappé de myrtilles sauvages fraîches, graines de chia, cerneaux de noix et cannelle de Ceylan.',
      chefTip: 'Le yaourt grec traditionnel contient deux fois plus de protéines naturelles, assurant une satiété durable.',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: 'Petit-Déjeuner Washoku Japonais : Tamagoyaki & Saumon au Dashi',
      description: 'Omelette roulée japonaise au bouillon dashi, soupe miso aux algues wakame, riz complet vapeur et pavé de saumon grillé.',
      chefTip: 'La soupe miso fermentée active la flore intestinale et les enzymes métaboliques dès le réveil.',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'Frittata Toscane aux Tomates Séchées et Basilic Frais',
      description: 'Frittata cuite au four avec tomates San Marzano séchées, basilic doux et ricotta crémeuse sur ciabatta dorée.',
      chefTip: 'La cuisson douce au four préserve le moelleux des œufs sans aucune coloration excessive.',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'Huevos Rancheros Mexicains aux Haricots Noirs et Salsa',
      description: 'Œufs au plat sur tortillas de maïs tièdes, salsa de tomates et piments rôtis, haricots noirs mijotés et avocat.',
      chefTip: 'Les fibres solubles des haricots noirs stabilisent parfaitement la courbe glycémique du matin.',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'Tortilla Espagnole Fondante et Pan con Tomate',
      description: 'Véritable tortilla de pommes de terre confites à l\'huile d\'olive extra vierge accompagnée de pain frotté à la tomate mûre et ail.',
      chefTip: 'Le confisage lent des pommes de terre confère à la tortilla son cœur fondant légendaire.',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: 'Gyeran-jjim Coréen Vapeur et Riz aux Algues Nori',
      description: 'Œufs battus vaporeux cuits à la vapeur en marmite de terre avec ciboule, huile de sésame grillé et riz complet aux algues.',
      chefTip: 'La cuisson vapeur douce constitue la méthode la plus digeste pour préserver les protéines.',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'Bol Bánh Mì Vietnamien aux Œufs et Légumes Marinés',
      description: 'Brouillade d\'œufs parfumée à la coriandre fraîche, carottes et daikon marinés au vinaigre de riz et concombre croquant.',
      chefTip: 'Les légumes lactofermentés apportent des enzymes vivantes idéales pour stimuler la digestion.',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: 'Petit-Déjeuner Nordique : Saumon Fumé et Pain Croustillant de Seigle',
      description: 'Saumon sauvage de l\'Atlantique, fromage blanc maigre, concombre et aneth sur pain de seigle complet scandinave.',
      chefTip: 'Le seigle complet présente un indice glycémique très bas assurant une concentration mentale sans faille.',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: 'Kacha de Sarrasin Grillé, Champignons Poêlés et Œuf Mollet',
      description: 'Grains de sarrasin grillés aux champignons des bois à l\'ail, aneth frais et œuf mollet au jaune doré coulant.',
      chefTip: 'Le sarrasin est naturellement sans gluten et remarquablement riche en rutine protectrice des vaisseaux.',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'Omelette Parisienne aux Fines Herbes et Salade de Mesclun',
      description: 'Omelette française baveuse au cerfeuil, estragon, persil plat et ciboulette accompagnée d\'un mesclun assaisonné.',
      chefTip: 'Cuire à feu moyen en remuant constamment en huit pour obtenir un extérieur lisse et un cœur crémeux.',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: 'Coupe Antioxydante au Yaourt Grec et Myrtilles Sauvages',
      description: 'Yaourt égoutté 0% garni de myrtilles fraîches, cerneaux de noix concassés et soupçon de cannelle de Ceylan.',
      chefTip: 'Les protéines de caséine diffusent leurs acides aminés sur 3 heures, prévenant toute fringale.',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: 'Edamame Vapeur à la Fleur de Sel et Amandes Grillées',
      description: 'Gousses de soja tendre cuites à la vapeur avec fleur de sel marin et amandes entières torréfiées croquantes.',
      chefTip: 'Les isoflavones de soja associées à la vitamine E protègent les cellules contre le stress oxydatif.',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'Thé Vert Matcha Cérémonial et Gousses d\'Edamame Vapeur',
      description: 'Thé vert matcha riche en catéchines EGCG servi avec des edamame tièdes légèrement salés.',
      chefTip: 'La L-théanine du matcha procure une vivacité d\'esprit sereine sans aucune nervosité.',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'Bâtonnets de Concombre et Sauce Tahini au Citron et Ail',
      description: 'Concombres croquants avec dip de sésame tahini broyé sur meule de pierre, jus de citron frais et sumac.',
      chefTip: 'Le sésame est une source d\'exception de calcium végétal et d\'acides gras monoinsaturés.',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'Amandes de Valence Grillées et Clémentine Juteuse',
      description: 'Amandes légèrement dorées et salées dégustées avec une clémentine gorgée de vitamine C naturelle.',
      chefTip: 'Les flavonoïdes des agrumes optimisent l\'assimilation des minéraux apportés par les amandes.',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: 'Feuilles d\'Algue Nori Grillées et Infusion d\'Orge Mugicha',
      description: 'Fines feuilles d\'algue nori croustillantes à l\'huile de sésame accompagnées d\'une infusion d\'orge grillée.',
      chefTip: 'L\'algue nori offre un apport d\'iode naturel essentiel à la fonction thyroïdienne.',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: 'Salade Méditerranéenne de Poulet Grillé au Citron et Romarin',
      description: 'Blanc de poulet mariné au citron et herbes grillé à la perfection sur lit de mesclun, tomates cerises, concombre, olives et huile d\'olive.',
      chefTip: 'L\'association de vitamine C et d\'herbes fraîches décuple l\'absorption du fer et la vitalité.',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'Bol Mézé de Falafels Rôtis au Four et Quinoa',
      description: 'Falafels dorés au four sans friture avec quinoa tendre, houmous soyeux, tomates et sauce tahini parfumée.',
      chefTip: 'La cuisson au four élimine les graisses de friture tout en conservant le croquant des pois chiches.',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'Filet de Bar Poêlé aux Câpres et Tomates Méditerranéennes',
      description: 'Bar noble poêlé côté peau croustillante sur compotée de tomates cerises tièdes, câpres et basilic.',
      chefTip: 'Poser le poisson côté peau et appuyer légèrement avec la spatule pour une cuisson bien uniforme.',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'Bavette de Bœuf Pâturé, Asperges Rôties et Grenailles',
      description: 'Pièce de bœuf élevé à l\'herbe saisie au gril avec asperges vertes rôties et petites pommes de terre au romarin.',
      chefTip: 'Laisser reposer la viande 5 minutes sous papier aluminium pour détendre les sucs savoureux.',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'Pollo al Limone Italien avec Polenta et Légumes au Romarin',
      description: 'Suprême de poulet braisé au citron et vin blanc sec servi avec polenta crémeuse et blettes sautées.',
      chefTip: 'L\'acidité douce du citron attendrit les fibres sans nécessiter de crème grasse.',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: 'Bento Tokyo de Poulet Teriyaki et Riz Complet Vapeur',
      description: 'Émincé de poulet glacé à la sauce teriyaki maison sans sucre raffiné, brocoli vapeur et riz complet.',
      chefTip: 'Le mirin traditionnel et le tamari apportent une brillance umami sans rétention d\'eau excessive.',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'Bol Mexicain de Poulet au Chipotle et Riz à la Coriandre',
      description: 'Blanc de poulet relevé au piment chipotle sur riz complet à la lime, haricots noirs et avocat frais.',
      chefTip: 'La capsaïcine du chipotle stimule la thermogenèse et renforce le signal de satiété.',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'Blanc de Poulet Épicé Tandoori et Dal de Lentilles Jaunes',
      description: 'Poulet mariné au yaourt et garam masala grillé au four avec dal onctueux de lentilles jaunes et épinards.',
      chefTip: 'Le curcuma et le gingembre du tandoori fournissent de puissants antioxydants protecteurs.',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'Poulet à l\'Ail Pollo al Ajillo avec Riz au Safran et Piquillos',
      description: 'Morceaux de poulet dorés aux éclats d\'ail croustillants et persil avec riz safrané et poivrons piquillo rôtis.',
      chefTip: 'L\'allicine de l\'ail soutient la souplesse vasculaire et le système immunitaire.',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: 'Bol Coréen de Poulet Bulgogi et Kimchi Artisanal Fermenté',
      description: 'Poulet mariné à la poire coréenne, gingembre et soja avec ciboule et kimchi traditionnel riche en probiotiques.',
      chefTip: 'Les ferments vivants du kimchi participent à l\'équilibre du microbiote digestif.',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'Salade de Poulet Grillé à la Citronnelle et Vermicelles de Riz',
      description: 'Filet de poulet grillé aux arômes de citronnelle sur lit de vermicelles de riz, menthe fraîche et sauce nuoc-mâm allégée.',
      chefTip: 'La citronnelle tonifie l\'estomac et accélère la digestion des repas protéinés.',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'En-Cas d\'Amandes et Figue Séchée Moelleuse',
      description: 'Amandes brutes de première récolte associées à des figues séchées riches en fibres et potassium.',
      chefTip: 'L\'association fibres-lipides végétaux stabilise la glycémie tout au long de l\'après-midi.',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: 'Galettes de Riz Soufflé au Nori et Thé Vert Sencha',
      description: 'Mini galettes croustillantes de riz complet ceintes de nori avec une tasse de thé vert sencha fumant.',
      chefTip: 'Les polyphénols du sencha favorisent la concentration mentale au cours de la deuxième partie de journée.',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'Bâtonnets de Jícama et Concombre au Piment et Citron Vert',
      description: 'Tiges fraîches et très désaltérantes de jícama et concombre relevées d\'un filet de lime et poudre de piment doux.',
      chefTip: 'La jícama regorge d\'inuline, une fibre prébiotique qui nourrit directement les bonnes bactéries du côlon.',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'Pois Chiches Croustillants Rôtis au Citron et Zaatar',
      description: 'Pois chiches cuits puis dorés au four avec huile d\'olive vierge, jus de citron et mélange d\'herbes zaatar.',
      chefTip: 'Une collation végétale idéale pour combler les petites faims sans sucres rapides.',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'Jujubes Rouges Déshydratés et Cerneaux de Noix',
      description: 'Dattes jujubes craquantes associées à des cerneaux de noix gorgés d\'acides gras oméga-3 végétaux.',
      chefTip: 'Le jujube renferme des saponines qui préparent l\'apaisement du système nerveux en fin de journée.',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: 'Bol Énergétique de Saumon Sauvage Laqué et Quinoa Réel',
      description: 'Pavé de saumon sauvage laqué avec quinoa tricolore vapeur, fèves d\'edamame, avocat et sauce aux agrumes.',
      chefTip: 'Les oméga-3 EPA et DHA restaurent les tissus musculaires pendant le sommeil nocturne.',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: 'Tempeh Croûté au Sésame et Nouilles Soba au Brocoli',
      description: 'Tempeh fermenté doré aux graines de sésame avec nouilles japonaises de sarrasin pur et brocoli vapeur.',
      chefTip: 'Le tempeh fermenté est très léger à assimiler avant le coucher.',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: 'Pavé de Faux-Filet de Bœuf, Asperges Rôties et Mousseline de Chou-Fleur',
      description: 'Morceau de bœuf maigre poêlé avec asperges et mousseline légère de chou-fleur infusée à l\'ail et fines herbes.',
      chefTip: 'Remplacer la purée de pommes de terre par du chou-fleur allège les glucides du soir.',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: 'Saumon Sauvage Laqué au Miso et Bok Choy au Wok',
      description: 'Saumon tendre glacé au miso doux et gingembre sur lit de jeunes choux bok choy braisés au wok.',
      chefTip: 'La laque de miso blanc concentre les saveurs tout en maintenant une chair incroyablement juteuse.',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: 'Cabillaud au Four en Croûte d\'Herbes et Caponata Sicilienne',
      description: 'Dos de cabillaud frais parfumé aux herbes de Provence sur mijotée d\'aubergines et tomates avec polenta.',
      chefTip: 'Le cabillaud est une source de protéine d\'une digestibilité exceptionnelle pour la nuit.',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: 'Vivaneau Rouge Façon Veracruz à la Coriandre et Citron Vert',
      description: 'Poisson blanc délicat poché dans une sauce aux tomates compotées, olives vertes, câpres et jus de lime.',
      chefTip: 'La sauce Veracruz apporte des antioxydants protecteurs sans aucune matière grasse lourde.',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: 'Crevettes Pochées au Lait de Coco Léger et Feuilles Vertes',
      description: 'Crevettes royales pochées dans un bouillon léger de coco, citronnelle, lime et pousses d\'épinards.',
      chefTip: 'Le pochage préserve l\'astaxanthine, puissant antioxydant naturel des crustacés.',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: 'Poisson Blanc au Four, Escalivada et Fenouil Rôti',
      description: 'Merlu frais cuit au four avec poivrons et aubergines braisés et quartiers de fenouil croustillants.',
      chefTip: 'Le fenouil dissipe les tensions abdominales et prépare un sommeil réparateur.',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: 'Ragoût Coréen de Saumon au Doenjang et Légumes Mijotés',
      description: 'Bouillon mijoté à la pâte de soja fermentée doenjang, morceaux de saumon, tofu soyeux et courgettes.',
      chefTip: 'Le doenjang apporte des peptides bioactifs bénéfiques pour la régénération nocturne.',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'Poisson Façon Chả Cá au Curcuma et Aneth du Jardin',
      description: 'Filet de poisson mariné au curcuma doré et gingembre sauté avec une abondance d\'aneth frais et ciboulette.',
      chefTip: 'L\'aneth possède des vertus apaisantes facilitant l\'endormissement.',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: 'Camomille Biologique et Graines de Courge Riches en Magnésium',
      description: 'Fleurs entières de camomille infusées avec graines de courge et un carré de chocolat noir 85%.',
      chefTip: 'Les graines de courge constituent l\'une des meilleures sources de magnésium pour synthétiser le GABA.',
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: 'Élixir de Nuit au Kéfir Probiotique et Cerise Griotte',
      description: 'Kéfir artisanal onctueux marbré de pur jus concentré de cerise griotte Montmorency riche en mélatonine.',
      chefTip: 'La cerise griotte Montmorency raccourcit le délai d\'endormissement et prolonge les phases de sommeil profond.',
    },
  },

  // ========================= РУССКИЙ (RUSSIAN) =========================
  ru: {
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: 'Средиземноморский скрэмбл на оливковом масле с зеленью',
      description: 'Нежный скрэмбл из фермерских яиц на оливковом масле первого отжима со сладкими томатами черри, греческой фетой и диким орегано на ремесленном тартин-хлебе.',
      chefTip: 'Готовьте яйца на медленном огне, чтобы сберечь лютеин и предотвратить расслоение белка.',
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: 'Органический тофу-скрэмбл с куркумой и тостом с авокадо',
      description: 'Высокобелковый органический тофу с пищевыми дрожжами, молодым шпинатом, черри и спелым авокадо Хасс на цельнозерновом тосте.',
      chefTip: 'Пищевые дрожжи придают блюду насыщенный сырный вкус умами и обогащают витаминами группы B.',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: 'Скрэмбл с диким копченым лососем, укропом и тартин-хлебом',
      description: 'Кремовые яйца со слайсами дикого лосося холодного копчения, свежим укропом и каперсами на поджаренном ремесленном хлебе.',
      chefTip: 'Добавляйте копченый лосось в самом конце, сняв сковороду с огня, чтобы сохранить полиненасыщенные омега-3.',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: 'Энергетический боул с греческим йогуртом и лесными ягодами',
      description: 'Натуральный фильтрованный греческий йогурт 0% с дикой черникой, семенами чиа, дробленым грецким орехом и цейлонской корицей.',
      chefTip: 'Фильтрованный греческий йогурт содержит вдвое больше чистого протеина, гарантируя сытость на все утро.',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: 'Японский сет Васёку: тамагояки и лосось в бульоне даси',
      description: 'Традиционный японский слоеный омлет с бульоном даси, мисо-суп с водорослями вакаме, бурый рис и запеченный дикий лосось.',
      chefTip: 'Ферментированный мисо-суп стимулирует кишечный микробиом и улучшает усвоение питательных веществ.',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'Тосканская фриттата с вялеными томатами и свежим базиликом',
      description: 'Запеченная в духовке яичная фриттата со сладким базиликом, томатами Сан-Марцано и нежной рикоттой на поджаренной чиабатте.',
      chefTip: 'Запекание при мягкой температуре сохраняет воздушную текстуру яиц без пересушивания.',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'Уэвос ранчерос с черной фасолью и соусом сальса',
      description: 'Глазунья на теплых кукурузных тортильях с запеченной томатной сальсой, отварной черной фасолью и авокадо.',
      chefTip: 'Растворимая клетчатка черной фасоли мягко выравнивает постпрандиальный уровень глюкозы.',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'Испанская тортилья с сочным томатным хлебом',
      description: 'Классическая испанская картофельная тортилья на оливковом масле extra virgin с хрустящим тостом, натертым спелым томатом и чесноком.',
      chefTip: 'Томление картофеля на оливковом масле придает тортилье ту самую легендарную сочность.',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: 'Корейский паровой керан-чим с рисом и водорослями',
      description: 'Воздушный паровой омлет по-корейски в глиняном горшочке с зеленым луком, кунжутным маслом и бурым рисом с нори.',
      chefTip: 'Приготовление на пару обеспечивает максимальную биодоступность белка без лишнего жира.',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'Вьетнамский боул бань-ми с яйцом и маринованными овощами',
      description: 'Пряный яичный скрэмбл со свежей кинзой, маринованной морковью и дайконом на подушке из хрустящих огурцов.',
      chefTip: 'Ферментированные овощи обогащают организм полезными пробиотиками для хорошего пищеварения.',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: 'Скандинавский завтрак: копченый лосось на ржаных криспах',
      description: 'Слайсы атлантического лосося, нежирный кварк, свежий огурец и укроп на цельнозерновых скандинавских хлебцах.',
      chefTip: 'Цельная рожь обладает низким гликемическим индексом и обеспечивает стабильную умственную энергию.',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: 'Гречневая каша с жареными грибами и яйцом пашот',
      description: 'Ароматная рассыпчатая гречка с лесными грибами, чесноком, укропом и яйцом пашот с жидким желтком.',
      chefTip: 'Гречиха богата рутином, укрепляющим капилляры и сосудистую стенку.',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'Парижский омлет с прованскими травами и салатом месклан',
      description: 'Классический французский омлет с кервелем, эстрагоном, петрушкой и шнитт-луком с нежным листовым салатом.',
      chefTip: 'Быстрые круговые движения лопаткой позволяют добиться гладкой корочки и нежной середины.',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: 'Антиоксидантный стаканчик греческого йогурта с ягодами',
      description: 'Густой фильтрованный йогурт 0% с дикой черникой, рублеными грецкими орехами и щепоткой цейлонской корицы.',
      chefTip: 'Казеиновый белок медленно усваивается на протяжении 3 часов, предотвращая голод.',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: 'Эдамаме на пару с морской солью и жареным миндалем',
      description: 'Яркие молодые стручки сои на пару с кристаллами морской соли и хрустящим жареным миндалем.',
      chefTip: 'Изофлавоны сои в сочетании с витамином E миндаля надежно защищают клетки от оксидативного стресса.',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'Церемониальный чай матча и теплые стручки эдамаме',
      description: 'Зеленый чай матча с высоким содержанием катехинов EGCG и теплые стручки эдамаме с солью.',
      chefTip: 'L-теанин в матче способствует ясности ума и высокой концентрации без нервозности.',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'Хрустящие огурцы с лимонно-чесночным дипом тахини',
      description: 'Брусочки огурцов с кунжутной пастой тахини холодного отжима, лимонным соком и пряным сумахом.',
      chefTip: 'Кунжут богат легкоусвояемым кальцием и мононенасыщенными жирными кислотами.',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'Валенсийский жареный миндаль со сладким клементином',
      description: 'Слегка подсоленный жареный миндаль в сочетании с сочным клементином, богатым природным витамином C.',
      chefTip: 'Флавоноиды цитрусовых значительно усиливают биодоступность минералов из орехов.',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: 'Хрустящие снеки из водорослей нори и ячменный чай',
      description: 'Тончайшие хрустящие пластинки нори с каплей кунжутного масла и согревающий ячменный напиток.',
      chefTip: 'Нори обеспечивает организм биодоступным йодом, поддерживая здоровье щитовидной железы.',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: 'Средиземноморский салат с курицей гриль в лимонных травах',
      description: 'Сочная куриная грудка на гриле с розмарином и лимоном на подушке из зелени, томатов черри, огурцов, оливок и масла extra virgin.',
      chefTip: 'Витамин C из лимона активизирует всасывание растительного железа и стимулирует синтез коллагена.',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'Мезе-боул с запеченным фалафелем и киноа',
      description: 'Хрустящий запеченный нутовый фалафель без фритюра с отварным киноа, шелковистым хумусом и тахини.',
      chefTip: 'Запекание вместо жарки во фритюре исключает трансжиры, сохраняя растительный белок и клетчатку.',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'Филе сибаса с каперсами и средиземноморскими томатами',
      description: 'Обжаренный сибас с золотистой хрустящей кожицей под соусом из томатов черри, каперсов и базилика.',
      chefTip: 'Обжаривайте рыбу сначала кожей вниз, слегка прижимая лопаткой для идеальной корочки.',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'Стейк травяного откорма с запеченной спаржей и бэби-картофелем',
      description: 'Постный говяжий стейк травяного откорма с зеленой спаржей из печи и молодым картофелем с розмарином.',
      chefTip: 'Дайте мясу отдохнуть 5 минут перед нарезкой, чтобы сок равномерно распределился по волокнам.',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'Итальянский цыпленок полло аль лимоне с полентой и мангольдом',
      description: 'Филе цыпленка в деликатном соусе из лимона и белого вина с кукурузной полентой и тушеным мангольдом.',
      chefTip: 'Лимонный сок мягко размягчает мышечные волокна без тяжелых жирных соусов.',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: 'Токийский бенто: курица терияки с бурым рисом и брокколи',
      description: 'Куриное филе в соусе терияки без рафинированного сахара с брокколи на пару и бурым рисом.',
      chefTip: 'Мирин и соевый соус тамари с низким натрием создают аппетитный глянец без отеков.',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'Мексиканский боул с курицей чипотле и рисом с лаймом',
      description: 'Куриная грудка в маринаде чипотле на буром рисе с соком лайма, черной фасолью и спелым авокадо.',
      chefTip: 'Капсаицин чили чипотле ускоряет термогенез и усиливает чувство насыщения.',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'Куриная грудка тандури с далом из желтой чечевицы',
      description: 'Курица в пряном йогуртовом маринаде с гарам масалой, нежным далом из чечевицы и молодым шпинатом.',
      chefTip: 'Куркума и имбирь в маринаде тандури обладают доказанным мощным противовоспалительным действием.',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'Испанский цыпленок с чесноком аль ахильо с шафрановым рисом',
      description: 'Кусочки птицы с хрустящими чесночными чипсами, белым вином и петрушкой с рисом с шафраном и перцами пикильо.',
      chefTip: 'Аллицин чеснока способствует эластичности сосудистой стенки и иммунной защите.',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: 'Корейский боул с курицей пульгоги и ферментированным кимчи',
      description: 'Курица в маринаде с корейской грушей, имбирем и соей с зеленым луком и традиционным кимчи.',
      chefTip: 'Живые ферменты кимчи обогащают микробиоту полезными лактобактериями.',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'Вьетнамский салат с курицей лемонграсс и рисовой лапшой',
      description: 'Куриное филе с ароматом лемонграсса на тонкой рисовой лапше со свежей мятой и лаймовой заправкой.',
      chefTip: 'Эфирные масла лемонграсса облегчают расщепление тяжелого мясного белка.',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'Калифорнийский миндаль со сладким сушеным инжиром',
      description: 'Отборный сырой миндаль в сочетании со сладким инжиром, богатым клетчаткой и микроэлементами.',
      chefTip: 'Клетчатка инжира и полезные жиры миндаля плавно поддерживают сахар в крови.',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: 'Рисовые криспы с нори и свежий зеленый чай сэнтя',
      description: 'Легкие цельнозерновые рисовые вафли в водорослях нори с чашкой свежезаваренного чая сэнтя.',
      chefTip: 'Полифенолы сэнтя возвращают ясность мысли в разгар рабочего дня.',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'Хрустящая хикама и огурец с лаймом и чили тахин',
      description: 'Свежие брусочки хикамы и огурца со свежевыжатым соком лайма и пикантным порошком чили.',
      chefTip: 'Хикама богата инулином — ценным пребиотиком для полезных бактерий ЖКТ.',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'Хрустящий нут из печи с лимоном и пряностями заатар',
      description: 'Запеченный в духовке хрустящий нут с оливковым маслом, лимоном и смесью пряных трав заатар.',
      chefTip: 'Идеальный источник растительного белка без глютена для сытного перекуса.',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'Хрустящие сушеные финики унаби с половинками грецкого ореха',
      description: 'Сушеные китайские финики унаби в паре с грецкими орехами, богатыми растительными омега-3.',
      chefTip: 'Сапонины плодов унаби способствуют плавному расслаблению нервной системы к вечеру.',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: 'Энергетический боул с глазированным диким лососем и киноа',
      description: 'Филе дикого лосося с трехцветным киноа, бобами эдамаме, авокадо и легким цитрусовым дрессингом.',
      chefTip: 'Омега-3 жирные кислоты ускоряют ночное клеточное восстановление и улучшают сон.',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: 'Темпе в кунжуте с гречневой лапшой соба и брокколи',
      description: 'Ферментированный темпе в кунжутной корочке со 100% гречневой лапшой соба и хрустящей брокколи.',
      chefTip: 'Ферментированный темпе исключительно легко усваивается перед ночным сном.',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: 'Стейк из говяжьей вырезки со спаржей и пюре из цветной капусты',
      description: 'Нежный медальон из постной вырезки со спаржей и воздушным пюре из цветной капусты с чесноком и травами.',
      chefTip: 'Замена картофельного пюре на цветную капусту снижает вечерний уровень углеводов.',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: 'Дикий лосось в мисо-глазури с капустой бок-чой в воке',
      description: 'Лосось под белой мисо-глазурью с имбирем на подушке из сочных кочанчиков бок-чой из вока.',
      chefTip: 'Глазурь из мисо карамелизуется и сохраняет рыбу невероятно сочной внутри.',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: 'Запеченная треска в корочке из трав с сицилийской капонатой',
      description: 'Свежее филе трески под корочкой из прованских трав на овощной капонате из баклажанов с полентой.',
      chefTip: 'Треска — один из самых легких источников чистого белка для спокойного ночного отдыха.',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: 'Морской окунь по-верарусски с кинзой и соком лайма',
      description: 'Белая рыба, томленая в соусе из спелых томатов, зеленых оливок, каперсов и свежего сока лайма.',
      chefTip: 'Соус веракрус богат ликопином, защищающим сердечно-сосудистую систему.',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: 'Креветки в кокосово-лаймовом бульоне со свежей зеленью',
      description: 'Крупные креветки, томленые в легком кокосовом молоке с лемонграссом, соком лайма и шпинатом.',
      chefTip: 'Деликатное томление сохраняет астаксантин — ценнейший антиоксидант морепродуктов.',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: 'Белая рыба из печи с эскаливадой и запеченным фенхелем',
      description: 'Филе белой рыбы из духовки с запеченными перцами, баклажанами и ароматным хрустящим фенхелем.',
      chefTip: 'Запеченный фенхель снимает спазмы ЖКТ и настраивает организм на безмятежный сон.',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: 'Корейский суп твендян с лососем и тушеными овощами',
      description: 'Согревающий суп на пасте из ферментированной сои твендян с кусочками лосося, тофу и кабачком.',
      chefTip: 'Паста твендян поставляет пептиды, поддерживающие ночной липидный обмен.',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'Рыба по-вьетнамски с куркумой и свежим укропом Ча Ка',
      description: 'Кусочки белой рыбы в золотистом маринаде из куркумы и имбиря, обжаренные с обилием свежего укропа.',
      chefTip: 'Укроп действует как природный спазмолитик, расслабляя гладкую мускулатуру перед сном.',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: 'Органическая ромашка и семена тыквы с магнием',
      description: 'Цельные цветы египетской ромашки в умиротворяющем настое с тыквенными семечками и темным шоколадом 85%.',
      chefTip: 'Тыквенные семечки — рекордсмен по содержанию цинка и магния для синтеза нейромедиатора ГАМК.',
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: 'Снотворный эликсир: пробиотический кефир и вишня монморанси',
      description: 'Живой натуральный кефир с терпким соком вишни монморанси — природным источником экзогенного мелатонина.',
      chefTip: 'Вишня монморанси содержит природный мелатонин, сокращая время засыпания.',
    },
  },

  // ========================= ARABIC (العربية) =========================
  ar: {
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: 'طبق بيض مخفوق بزيت الزيتون البكر وأعشاب البحر المتوسط',
      description: 'بيض بلدي مخفوق ببطء بزيت الزيتون البكر الممتاز، مع طماطم كرزية وجبن فيتا يوناني أصلي وأوريغانو بري على خبز العجين المخمر.',
      chefTip: 'اطبخ البيض على حرارة هادئة للحفاظ على مضادات الأكسدة ومنع جفاف البروتين.',
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: 'توفو مخفوق بالكركم العضوي وتوست الأفوكادو',
      description: 'توفو عضوي عالي البروتين مع خميرة غذائية وسبانخ صغيرة وطماطم كرزية مع توست الأفوكادو الصحي.',
      chefTip: 'تمنح الخميرة الغذائية نكهة أومامي غنية وفيتامينات ب الضرورية لنشاط الصباح.',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: 'بيض مخفوق مع سلمون بري مدخن وشبت طازج',
      description: 'بيض بلدي ناعم مع شرائح السلمون البري المدخن، والشبت الأخضر والكبر على خبز الساوردو المحمص.',
      chefTip: 'أضف السلمون المدخن بعد إطفاء النار لحماية أحماض أوميغا 3 المفيدة للقلب.',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: 'وعاء طاقة الزبادي اليوناني والتوت البري',
      description: 'زبادي يوناني مصفى خالٍ من الدسم مع توت بري طازج وبذور الشيا والجوز والقرفة السيلانية.',
      chefTip: 'يحتوي الزبادي اليوناني المصفى على ضعف كمية البروتين مما يمنح شبعاً يدوم طوال الصباح.',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: 'وجبة واشوكو يابانية: أومليت تاماجوياكي وسلمون مشوي',
      description: 'أومليت ياباني ملفوف بمرق الداشي مع حساء ميسو بالواكامي وأرز بني وسلمون بري مشوي.',
      chefTip: 'حساء الميسو المخمر يدعم بكتيريا الأمعاء النافعة وينشط الهضم الصباحي.',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'فريتاتا توسكانية بالطماطم المجففة والريحان الطازج',
      description: 'فريتاتا بيض مخبوزة في الفرن مع ريحان حلو وطماطم مجففة وجبن ريكوتا خفيف على خبز الشاباتا.',
      chefTip: 'الخبز الهادئ في الفرن يحافظ على قوام البيض الطري دون احتراق.',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'هويفوس رانشيروس مع الفاصوليا السوداء والصلصة',
      description: 'بيض مقلي على تورتيلا ذرة دافئة مع صلصة رانشيرو طازجة وفاصوليا سوداء وأفوكادو.',
      chefTip: 'الألياف القابلة للذوبان في الفاصوليا السوداء توازن مستوى السكر في الدم.',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'تورتيلا إسبانية تقليدية مع خبز الطماطم والثوم',
      description: 'تورتيلا البطاطس والبيض الكلاسيكية المطهوة بزيت الزيتون البكر مع خبز مقرمش بالطماطم والثوم.',
      chefTip: 'طهي البطاطس ببطء بزيت الزيتون يكسب التورتيلا قواماً طرياً لا يُقاوم.',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: 'بيض كيران-جيم كوري على البخار مع أرز الأعشاب البحرية',
      description: 'بيض مخفوق ومطهو على البخار في وعاء فخاري مع بصل أخضر وزيت سمسم وأرز بني بنوري.',
      chefTip: 'الطهي بالبخار هو أفضل طريقة للحفاظ على جودة وسهولة هضم البروتين.',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'وعاء بيض فيتنامي بأسلوب بان مي والمخلل المنزلي',
      description: 'بيض مخفوق بأعشاب طازجة مع جزر وفجل مخلل وخيار مقرمش وكزبرة خضراء.',
      chefTip: 'الخضروات المخمرة توفر إنزيمات هاضمة وبروبيوتيك ممتاز للأمعاء.',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: 'إفطار نورديك: سلمون مدخن ومقرمشات خبز الشاودار',
      description: 'شرائح سلمون أطلسي مدخن مع جبن خالي الدسم وخيار وشبت على خبز الجاودار الكامل.',
      chefTip: 'حبوب الجاودار الكاملة تتميز بمؤشر جلايسيمي منخفض لتوفير طاقة ذهنية مستدامة.',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: 'حبة الحنطة السوداء مع فطر سوتيه وبيض مسلوق',
      description: 'حنطة سوداء محمصة مع فطر بري وثوم وشبت وبيض مسلوق بصفار سائل ذهبي.',
      chefTip: 'الحنطة السوداء خالية من الغلوتين وغنية بالروتين المقوي للشرايين والأوردة.',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'أومليت باريسي بالأعشاب الرفيعة وسلطة خضراء',
      description: 'أومليت فرنسي ناعم بالبقدونس والطرخون والثوم المعمر مع سلطة أوراق خضراء طازجة.',
      chefTip: 'التحريك المستمر للبيض أثناء الطهي يمنح الأومليت ملمساً حريرياً ناعماً.',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: 'كوب الزبادي اليوناني الغني بمضادات الأكسدة والتوت',
      description: 'زبادي يوناني مصفى خالٍ من الدسم مع توت أزرق وجوز مجروش وقرفة سيلانية.',
      chefTip: 'بروتين الكازين يتحلل ببطء على مدى 3 ساعات مانعاً الشعور بالجوع.',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: 'إدامامي بالبخار بملح البحر ولوز محمص',
      description: 'قرون فول صويا خضراء مطهوة بالبخار مع بلورات ملح البحر ولوز محمص مقرمش.',
      chefTip: 'مركبات الصويا مع فيتامين هـ في اللوز تحمي الخلايا من الإجهاد التأكسدي.',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'شاي ماتشا أخضر تقليدي مع قرون إدامامي',
      description: 'شاي ماتشا غني بمضادات الأكسدة مع حبوب إدامامي خضراء دافئة بملح البحر.',
      chefTip: 'حمض الثيانين في الماتشا يمنح تركيزاً ذهَنياً هادئاً بدون توتر أو قلق.',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'خيار طازج مع غموس الطحينة بالليمون والثوم',
      description: 'أصابع خيار مقرمشة مع طحينة سمسم طبيعية معصورة على البارد وعصير ليمون وسماق.',
      chefTip: 'السمسم مصدر استثنائي للكالسيوم النباتي والدهون الأحادية المفيدة للقلب.',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'لوز فالنسيا المحمص مع كلمنتينا حلوة',
      description: 'لوز محمص خفيف الملوحة مع حبة كلمنتينا طازجة غنية بفيتامين ج الطبيعي.',
      chefTip: 'فيتامين ج في الحمضيات يعزز امتصاص المعادن الثمينة الموجودة في اللوز.',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: 'رقائق أعشاب نوري المقرمشة مع شاي الشعير',
      description: 'رقائق نوري مقرمشة بزيت السمسم مع كوب شاي شعير دافئ خالٍ من الكافيين.',
      chefTip: 'أعشاب النوري تمد الجسم باليود الطبيعي الضروري لعمل الغدة الدرقية.',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: 'سلطة دجاج مشوي بالأعشاب والليمون على طريقة البحر المتوسط',
      description: 'صدر دجاج مشوي بالأعشاب والليمون مع خضار مشكلة وطماطم كرزية وخيار وزيتون وزيت زيتون بكر.',
      chefTip: 'عصير الليمون يعزز امتصاص الحديد ويساعد في إنتاج الكولاجين الطبيعي.',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'وعاء مقبلات الفلافل المخبوزة في الفرن والكينوا',
      description: 'فلافل حمص مخبوزة بدون قلي مع كينوا مطبوخة وحمص كريمي وطماطم وصلصة طحينة خفيفة.',
      chefTip: 'الخبز في الفرن يوفر الدهون المشبعة مع الحفاظ على الألياف المشبعة.',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'سمك قاروص مشوح بالكبر والطماطم الكرزية',
      description: 'شريحة سمك قاروص بجلد مقرمش مع صلصة طماطم كرزية دافئة وكبر وريحان طازج.',
      chefTip: 'اطبخ السمك أولاً على جهة الجلد مع الضغط الخفيف لقرمشة متساوية.',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'ستيك بقري مغذى على العشب مع هليون وبطاطس صغيرة',
      description: 'لحم بقري قليل الدهن مشوي مع هليون أخضر وبطاطس صغيرة محمرة بإكليل الجبل.',
      chefTip: 'اترك اللحم يرتاح 5 دقائق قبل التقطيع للحفاظ على العصارة والنكهة.',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'دجاج بالليمون الإيطالي مع بولينتا وخضار بإكليل الجبل',
      description: 'صدر دجاج مطهو في صلصة ليمون منعشة مع بولينتا ذرة ناعمة وخضار سوتيه.',
      chefTip: 'حموضة الليمون تطري أنسجة الدجاج دون الحاجة إلى كريمة دسمة.',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: 'بينتو الدجاج بصلصة الترياكي مع أرز بني وبروكلي',
      description: 'شرائح دجاج بصلصة الترياكي الطبيعية بدون سكر مكرر مع بروكلي على البخار وأرز بني.',
      chefTip: 'صلصة التاماري قليلة الصوديوم تمنح لمعاناً ونكهة لذيذة دون احتباس سوائل.',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'وعاء مكسيكي: دجاج تشيبوتلي مع أرز بالليمون والكزبرة',
      description: 'صدر دجاج متبل بصلصة التشيبوتلي المدخنة مع أرز بني وفاصوليا سوداء وأفوكادو.',
      chefTip: 'الكابسيسين في الفلفل ينشط عملية حرق السعرات ويزيد الشعور بالشبع.',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'صدر دجاج تندوري متبل مع دال العدس الأصفر',
      description: 'دجاج متبل بالزبادي وتوابل الجارام ماسالا مع شوربة دال العدس الأصفر والسبانخ.',
      chefTip: 'الكركم والزنجبيل في خلطة التندوري مضادات التهاب طبيعية قوية.',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'دجاج بالثوم بولو أل أخيلو مع أرز بالزعفران وفلفل بيكيلو',
      description: 'قطع دجاج محمرة مع رقائق ثوم مقرمشة وبقدونس وأرز بالزعفران وفلفل أحمر مشوي.',
      chefTip: 'مركب الأليسين في الثوم يدعم صحة الشرايين وجهاز المناعة.',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: 'وعاء دجاج بولجوجي كوري مع كيمتشي مخمر تقليدي',
      description: 'دجاج متبل بصلصة الصويا والزنجبيل مع بصل أخضر وكيمتشي مخمر غني بالبروبيوتيك.',
      chefTip: 'بكتيريا اللاكتوباسيلس في الكيمتشي تدعم صحة وتوازن الجهاز الهضمي.',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'سلطة دجاج مشوي بعشبة الليمون وشعيرية الأرز الفيتنامية',
      description: 'دجاج مشوي بنكهة عشبة الليمون فوق شعيرية أرز خفيفة ونعناع طازج وصلصة ليمون.',
      chefTip: 'عشبة الليمون العطرية تريح المعدة وتساعد في هضم الوجبات الغنية بالبروتين.',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'وجبة خفيفة: لوز طبيعي وتين مجفف حلو',
      description: 'حبات لوز نيء منتقاة مع تين مجفف غني بالألياف والمعادن الأساسية.',
      chefTip: 'مزيج الألياف والدهون الصحية يضمن ثبات مستوى السكر خلال المساء.',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: 'مقرمشات أرز بالأعشاب مع شاي سينشا أخضر',
      description: 'رقائق أرز كامل خفيفة مغلفة بأعشاب النوري مع كوب شاي أخضر سينشا دافئ.',
      chefTip: 'مضادات الأكسدة في الشاي الأخضر تنشط التركيز الذهني بعد الظهر.',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'شرائح خيار وهيكاما منعشة مع ليمون وبهارات تاجين',
      description: 'أصابع خيار وهيكاما مقرمشة مرشوشة بعصير ليمون طازج ومسحوق فلفل معتدل.',
      chefTip: 'تحتوي الهيكاما على الإينولين الذي يغذي البكتيريا الصديقة في الأمعاء.',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'حمص محمص ومقرمش في الفرن بالليمون والزعتر',
      description: 'حمص مسلوق ومحمص في الفرن بزيت زيتون وعصير ليمون وخلطة زعتر بلدي.',
      chefTip: 'وجبة بروتين نباتي مقرمشة ممتازة للتغلب على كسل المساء.',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'تمور العناب المجففة المقرمشة مع حبات الجوز',
      description: 'عناب مجفف مقرمش مع حبات جوز غنية بأحماض أوميغا 3 النباتية.',
      chefTip: 'العناب يحتوي على مركبات طبيعية تساعد في تهدئة الجهاز العصبي.',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: 'وعاء طاقة السلمون البري اللامع والكينوا',
      description: 'شريحة سلمون بري مشوية مع كينوا ثلاثية الألوان وفول إدامامي وأفوكادو وصلصة حمضيات.',
      chefTip: 'أوميغا 3 تسرع استشفاء العضلات أثناء النوم وتحسن عمق الراحة الليلية.',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: 'تيمبيه مقرمش بالسمسم مع نودلز سوبا وبروكلي',
      description: 'تيمبيه مخمر مغطى بالسمسم مع نودلز الحنطة السوداء وبروكلي على البخار.',
      chefTip: 'التيمبيه المخمر خفيف جداً على المعدة قبل النوم.',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: 'ستيك لحم بقري صافي مع هليون مشوي وبيوريه القرنبيط',
      description: 'شريحة لحم بقري قليلة الدهن مع هليون وبيوريه قرنبيط خفيف بالثوم والأعشاب.',
      chefTip: 'استبدال البطاطس بالقرنبيط يقلل الكربوهيدرات المسائية ويعزز الهضم.',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: 'سلمون بري بصلصة الميسو مع بوك تشوي في المقلاة',
      description: 'سلمون متبل بالميسو الأبيض والزنجبيل مع ملفوف بوك تشوي مشوح في المقلاة.',
      chefTip: 'تتبيلة الميسو تحبس العصارة داخل السلمون وتمنحه طراوة فائقة.',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: 'سمك قد مخبوز بالأعشاب مع كابوناتا صقلية وبولينتا',
      description: 'سمك قد طازج في الفرن بطبقة أعشاب مع يخنة باذنجان وطماطم وبولينتا ناعمة.',
      chefTip: 'سمك القد من أخف مصادر البروتين الصافي وأسهلها هضماً ليلاً.',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: 'سمك أحمر على طريقة فيراكروز بالكزبرة والليمون',
      description: 'سمك أبيض مطهو ببطء في صلصة طماطم وزيتون أخضر وكبر وعصير ليمون.',
      chefTip: 'صلصة الطماطم المطهوة غنية بالليكوبين المفيد لصحة القلب والأوعية.',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: 'روبيان مسلوق بهدوء بحليب جوز الهند والليمون',
      description: 'روبيان طازج مطهو في مرق حليب جوز هند خفيف مع عشبة ليمون وأوراق سبانخ.',
      chefTip: 'الطهي الهادئ يحافظ على مضادات الأكسدة الطبيعية في الروبيان.',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: 'سمك أبيض بالفرن مع إسكاليفادا وشمر محمر',
      description: 'سمك أبيض مخبوز مع فلفل وباذنجان مشوي في الفرن وشرائح شمر مقرمشة.',
      chefTip: 'الشمر المشوي يهدئ الجهاز الهضمي ويمنع الانتفاخ قبل النوم.',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: 'شوربة دوينجانج سلمون كورية مع خضار مطهوة',
      description: 'حساء دافئ بمعجون الصويا المخمر دوينجانج مع قطع سلمون وتوفو ناعم وكوسا.',
      chefTip: 'مركبات الصويا المخمرة تساعد في تنظيم عمليات الأيض أثناء الليل.',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'سمك فيتنامي بالكركم والشبت الأخضر أسلوب تشا كا',
      description: 'سمك أبيض متبل بالكركم والزنجبيل مشوح مع كمية وافرة من الشبت الطازج والبصل.',
      chefTip: 'الشبت الأخضر يساعد على استرخاء العضلات لنوم عميق ومريح.',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: 'بابونج عضوي دافئ مع بذور اليقطين الغنية بالمغنيسيوم',
      description: 'أزهار بابونج كاملة مهدئة مع بذور يقطين غنية بالمغنيسيوم ومكعب شوكولاتة داكنة 85%.',
      chefTip: 'بذور اليقطين والكاكاو تدعم إنتاج هرمون جابا المهدئ للمخ قبل النوم.',
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: 'إكسير النوم: كفير بروبيوتيك مع كرز مونتمورنسي الحامض',
      description: 'كفير طبيعي غني بالبكتيريا النافعة مع عصير كرز حامض طبيعي غني بهرمون الميلاتونين.',
      chefTip: 'الكرز الحامض يحتوي على تركيز طبيعي من الميلاتونين يساعد على سرعة النوم.',
    },
  },

  // ========================= JAPANESE (日本語) =========================
  ja: {
    'Mediterranean Olive Oil & Herb Scramble Bowl': {
      title: '地中海オリーブオイルとハーブの極上スクランブルエッグ',
      description: 'エキストラバージンオリーブオイルで低温調理した平飼い卵に、チェリートマト、羊乳フェタチーズ、野生オレガノを添え天然酵母サワードウといただく一皿。',
      chefTip: '弱火でじっくり火を通すことでルテインを守り、水分抜けを防いでふんわり仕上がります。',
    },
    'Organic Turmeric Tofu Scramble & Avocado Toast': {
      title: '有機ターメリック豆腐スクランブルとアボカドトースト',
      description: '高タンパクな有機木綿豆腐をニュートリショナルイーストとターメリックで炒め、ほうれん草とアボカドトーストを添えたヴィーガンプレート。',
      chefTip: 'ニュートリショナルイーストが深い旨味と朝の代謝に必要なビタミンB群を補給します。',
    },
    'Smoked Wild Salmon & Dill Scramble with Sourdough': {
      title: '天然スモークサーモンとディルのスクランブルエッグ',
      description: '柔らかな平飼い卵に天然スモークサーモンとフレッシュディル、ケッパーを合わせ香ばしいサワードウトーストにのせて。',
      chefTip: 'サーモンは火を止めてから加えることで、熱に弱いオメガ3脂肪酸を損なわずに美味しくいただけます。',
    },
    'Cultured Greek Yogurt & Wild Berry Power Bowl': {
      title: '濃厚ギリシャヨーグルトとワイルドベリーのパワーボウル',
      description: '無脂肪水切りギリシャヨーグルトに野生種ブルーベリー、チアシード、生くるみ、セイロンシナモンをトッピング。',
      chefTip: '水切りギリシャヨーグルトは通常の2倍のタンパク質を含み、午前中の満腹感を持続させます。',
    },
    'Washoku Tamagoyaki & Salmon Dashi Morning Set': {
      title: '伝統和食：出汁巻き玉子と天然鮭の朝定食',
      description: '一番出汁をたっぷり含んだふわふわの出汁巻き玉子、わかめと豆腐の味噌汁、玄米ご飯、香ばしい焼き鮭のバランス和朝食。',
      chefTip: '発酵味噌のプロバイオティクスが朝の腸内環境を整え、代謝酵素を活性化します。',
    },
    'Tuscan Frittata with Sun-Dried Tomatoes & Fresh Basil': {
      title: 'トスカーナ風フリッタータ：ドライトマトと生バジル',
      description: '甘酸っぱいドライトマト、フレッシュバジル、リコッタチーズを卵に混ぜオーブンでふっくら焼き上げたイタリア風オムレツ。',
      chefTip: 'オーブンで低温焼きすることで卵が固くならず、しっとりスフレのような食感になります。',
    },
    'Huevos Rancheros & Black Bean Power Plate': {
      title: 'メキシカン・ウエボス・ランチェロスと黒豆プレート',
      description: '温かいコーントルティーヤに目玉焼きをのせ、自家製トマトサルサ、煮込み黒豆、クリーミーなアボカドを添えた朝食。',
      chefTip: '黒豆の豊富な水溶性食物繊維が食後の血糖値急上昇をなだらかに抑えます。',
    },
    'Tortilla Española & Pan con Tomate': {
      title: 'スペイン風ポテトオムレツと完熟トマトパン',
      description: 'オリーブオイルでじっくりコンフィしたじゃがいものジューシーなトルティージャと、擦りおろしトマトとニンニクのパン。',
      chefTip: '良質なオリーブオイルでじゃがいもを煮るように加熱することが、本場のしっとり感の秘訣です。',
    },
    'Korean Steamed Gyeran-jjim & Seaweed Rice': {
      title: '韓国風ふわふわ茶碗蒸しケランチムと海苔玄米ご飯',
      description: '土鍋で蒸し上げたふわふわのスフレ状ケランチムに青ネギとごま油を効かせ、韓国海苔玄米ご飯を添えて。',
      chefTip: '蒸し調理は余分な油を使わず、タンパク質の消化吸収率が最も高い理想的な調理法です。',
    },
    'Vietnamese Bánh Mì Egg Scramble Bowl': {
      title: 'ベトナム風バインミー・エッグボウルと自家製なます',
      description: '香草が香るスクランブルエッグに、甘酢で漬けた大根と人参のなます、シャキシャキきゅうり、パクチーを添えて。',
      chefTip: '発酵なますの酸味が胃液の分泌を促し、朝一番の消化活動をサポートします。',
    },
    'Nordic Smoked Salmon & Rye Crisp Breakfast': {
      title: '北欧風スモークサーモンと全粒ライ麦クリスプブレッド',
      description: '上質なアトランティックサーモン、低脂肪クワルクチーズ、きゅうり、ディルを食物繊維豊富なライ麦クラッカーにのせて。',
      chefTip: 'ライ麦は低GI値で持続的なエネルギー供給を行い、午前の集中力を高めます。',
    },
    'Buckwheat Kasha with Sautéed Mushrooms & Soft Egg': {
      title: '香ばしい蕎麦の実カーシャと茸ソテーのポーチドエッグ添え',
      description: 'ローストした蕎麦の実とニンニク香るきのこソテーに、半熟とろけるポーチドエッグとディルを絡めて。',
      chefTip: '蕎麦の実に含まれるルチンは毛細血管を強化し血流を促進します。',
    },
    'Parisian Fine Herb Omelet with Petite Mesclun Salad': {
      title: 'パリ風フィーヌゼルブのオムレツとグリーンサラダ',
      description: 'チャービル、エストラゴン、パセリ、チャイブを混ぜ込んだ中身がとろりと半熟のフレンチオムレツ。',
      chefTip: 'フライパンを素早く円状に揺すりながら手早く巻くことで、表面はつるりと中は半熟に仕上がります。',
    },

    // Morning Snacks
    'Greek Yogurt & Wild Berry Antioxidant Cup': {
      title: '抗酸化ギリシャヨーグルトと野生ブルーベリーカップ',
      description: '0%水切りヨーグルトに完熟ブルーベリー、砕いた生くるみ、セイロンシナモンをふりかけて。',
      chefTip: 'カゼインプロテインは3時間かけてゆっくり吸収され、昼食前の空腹感をしっかり防ぎます。',
    },
    'Steamed Sea Salt Edamame & Roasted Almonds': {
      title: '海塩茹で枝豆と素焼きローストアーモンド',
      description: '天然海塩でさっと茹でた甘みのある枝豆と、香ばしい素焼き無塩アーモンドのヘルシーセット。',
      chefTip: '大豆イソフラボンとアーモンドのビタミンEが細胞の酸化ストレスを和らげます。',
    },
    'Matcha Green Tea & Steamed Edamame Pods': {
      title: 'お点前抹茶と温かい塩茹で枝豆のヘルシースナック',
      description: 'カテキンEGCGが豊富な本格点て出し抹茶と、ほくほく温かい枝豆。',
      chefTip: '抹茶に含まれるL-テアニンがカフェインの覚醒を落ち着かせ、穏やかでクリアな集中をもたらします。',
    },
    'Persian Cucumbers & Lemon Garlic Tahini Dip': {
      title: 'みずみずしいペルシャきゅうりとレモンタヒニディップ',
      description: '歯ごたえの良いきゅうりスティックに、石臼挽き白ごまタヒニ、搾りたてレモン果汁、スマックのディップ。',
      chefTip: '白ごまは良質な植物性カルシウムとセサミンが凝縮された栄養の宝庫です。',
    },
    'Almonds of Valencia & Sweet Clementine': {
      title: 'バレンシア産ローストアーモンドと甘いみかん',
      description: '軽く塩味を効かせた香ばしいアーモンドと、ビタミンCたっぷりのジューシーなみかん。',
      chefTip: '柑橘類のバイオフラボノイドがナッツ類の微量ミネラルの体内吸収を高めます。',
    },
    'Roasted Seaweed Crisps & Barley Tea': {
      title: '香ばしい焼き海苔クリスプと温かいノンカフェイン麦茶',
      description: 'ごま油をほんのり塗ってパリッと香ばしく焼き上げた海苔と、香ばしい焙煎麦茶。',
      chefTip: '海苔は低カロリーながら甲状腺ホルモンの材料となる天然ヨウ素を豊富に含みます。',
    },

    // Midday Dinners
    'Mediterranean Lemon-Herb Grilled Chicken Harvest Salad': {
      title: '地中海レモンハーブグリルチキンのごちそうサラダ',
      description: 'ローズマリーとレモンでマリネしたジューシーな鶏むね肉グリル、チェリートマト、きゅうり、オリーブの贅沢サラダボウル。',
      chefTip: 'レモンのビタミンCとクエン酸が鉄分の吸収とコラーゲン合成を後押しします。',
    },
    'Mediterranean Baked Falafel & Quinoa Mezze Bowl': {
      title: 'ノンフライ焼きファラフェルとキヌアのメッゼボウル',
      description: '揚げずにオーブンで香ばしく焼いたひよこ豆ファラフェル、炊きたてキヌア、なめらかフムスとタヒニソース。',
      chefTip: '揚げないことで余分な脂質をカットし、豆本来の食物繊維とタンパク質をヘルシーに摂取できます。',
    },
    'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes': {
      title: 'スズキの皮パリソテー：ケッパーと地中海トマトソース',
      description: '皮目を香ばしく焼き上げた白身魚スズキに、温かいチェリートマト、ケッパー、バジルのフレッシュソース。',
      chefTip: '皮目を下にしてフライパンに当て、軽くフライ返しで押さえることで反り返らず均一にパリッと焼き上がります。',
    },
    'Grilled Grass-Fed Flank Steak with Roasted Asparagus & Baby Potatoes': {
      title: 'グラスフェッド牛フランクステーキと焼きアスパラガス',
      description: '牧草牛の赤身肉ステーキをミディアムレアに焼き、グリルアスパラガスとローストポテトを添えて。',
      chefTip: '焼き上がり後に5分休ませることで、肉汁が全体に行き渡り柔らかくジューシーになります。',
    },
    'Italian Pollo al Limone with Polenta & Rosemary Greens': {
      title: 'イタリア風ポッロ・アル・リモーネととうもろこしポレンタ',
      description: '爽やかなレモンと白ワインで煮込んだ柔らかな鶏むね肉に、滑らかなポレンタと葉野菜のソテー。',
      chefTip: 'レモンの酸が肉の筋繊維を柔らかくするため、重いクリームなしで美味しく仕上がります。',
    },
    'Tokyo Teriyaki Glazed Chicken & Brown Rice Bento': {
      title: '東京照り焼きチキン弁当：玄米ご飯と蒸しブロッコリー',
      description: '本みりんと減塩醤油で照りを出したチキンソテーに、甘みのあるブロッコリーと香ばしい玄米ご飯。',
      chefTip: '砂糖を使わず本みりんの甘みと旨味を活かすことで、むくみを防ぎ上品な味に仕上がります。',
    },
    'Mexican Chipotle Chicken & Cilantro Lime Rice Bowl': {
      title: 'チポトレチキンボウル：ライムコリアンダー玄米ご飯',
      description: '燻製唐辛子チポトレでスパイシーに焼いた鶏むね肉、ライム玄米ご飯、黒豆、フレッシュアボカド。',
      chefTip: '唐辛子のカプサイシンが体温を適度に上げ、満腹中枢を心地よく刺激します。',
    },
    'Tandoori Spiced Chicken Breast with Yellow Lentil Dal': {
      title: 'タンドリーチキンとイエローレンズ豆のダルカレー',
      description: 'スパイスとヨーグルトに漬け込んだジューシーなタンドリーチキンと、消化に優しいレンズ豆のスープダル。',
      chefTip: 'ターメリックと生姜の抗炎症クルクミンが疲労回復を強力にサポートします。',
    },
    'Spanish Pollo al Ajillo with Saffron Rice & Piquillo Peppers': {
      title: 'スペイン風にんにくチキン「ポヨ・アル・アヒージョ」とサフランライス',
      description: '香ばしいにんにくチップスと白ワインで煮詰めた鶏肉、黄金色のサフランライス、ピキージョ赤ピーマン。',
      chefTip: '加熱したにんにくのアリシンが血管をしなやかに保ち免疫力を維持します。',
    },
    'Korean Bulgogi Chicken & Fermented Kimchi Bowl': {
      title: '韓国風プルコギチキンボウルと伝統熟成キムチ',
      description: 'すりおろし梨と生姜醤油に漬け込んだ柔らかな鶏肉と青ネギ、発酵キムチをのせた玄米ビビンボウル。',
      chefTip: '乳酸発酵した生キムチが腸内細菌叢を豊かに保ちます。',
    },
    'Saigon Lemongrass Grilled Chicken & Rice Noodle Salad': {
      title: 'サイゴン風レモングラスチキンと米粉麺ブンサラダ',
      description: '爽やかなレモングラス香る炭火風焼きチキン、つるりとした米粉麺、フレッシュミントとライムだれ。',
      chefTip: 'レモングラスのシトラールが胃腸の働きを整え、肉類の消化をスムーズにします。',
    },

    // Afternoon Snacks
    'Californian Almonds & Sweet Dried Fig Fuel Bite': {
      title: 'カリフォルニアアーモンドと完熟ドライイチジク',
      description: '香ばしい生アーモンドと、ミネラルと水溶性食物繊維が凝縮されたセミドライイチジク。',
      chefTip: 'イチジクの食物繊維とナッツの良質な脂質が午後の血糖値をしっかり安定させます。',
    },
    'Steamed Nori Rice Crisps & Sencha Green Tea': {
      title: '玄米海苔せんべいと淹れたて煎茶',
      description: '素朴な玄米せんべいに上質な有明産海苔を巻き、香り高い日本茶煎茶と一緒に。',
      chefTip: '煎茶のカテキンとテアニンが午後の眠気を払い、クリアな集中力を取り戻します。',
    },
    'Jicama & Cucumber with Chili-Lime Tajín': {
      title: 'シャキシャキきゅうりとヒカマのライムチリタヒンがけ',
      description: 'みずみずしいきゅうりとヒカマにライム果汁とマイルドなチリパウダーをふりかけて。',
      chefTip: 'ヒカマに豊富に含まれるイヌリンが腸内の善玉ビフィズス菌のエサになります。',
    },
    'Lemon Roasted Chickpeas with Za’atar Herbs': {
      title: 'オーブン焼きひよこ豆スナック：レモンとザアタルハーブ',
      description: '茹でひよこ豆にオリーブオイルとレモン、中東のザアタルハーブをまぶしてカリッと焼き上げました。',
      chefTip: 'タンパク質と食物繊維が豊富で、夕方の空腹感をすっきり解消します。',
    },
    'Crispy Dried Jujube Dates & Walnuts': {
      title: 'サクサク乾燥なつめと生くるみ',
      description: 'フリーズドライでサクサク食感の赤なつめと、オメガ3豊富な大粒くるみ。',
      chefTip: '漢方でも重宝されるなつめのサポニンが神経の高ぶりを鎮め、夜のリラックスへ導きます。',
    },

    // Suppers
    'Glazed Wild Salmon & Quinoa Power Bowl': {
      title: '天然鮭のグリルと3色キヌアのパワーボウル',
      description: '香ばしく焼き上げた天然鮭、蒸しキヌア、枝豆、アボカドを特製シトラスドレッシングで。',
      chefTip: 'オメガ3脂肪酸（EPA・DHA）が睡眠中の筋肉修復と深い睡眠の質を向上させます。',
    },
    'Sesame Crusted Tempeh & Roasted Broccoli Soba': {
      title: '胡麻衣テンペとブロッコリーの十割十文字蕎麦',
      description: 'タマリ醤油で下味をつけ胡麻をまぶして焼いた発酵テンペと、喉越しの良い十割蕎麦。',
      chefTip: '発酵テンペは胃もたれせず、夜遅くのタンパク質補給にも最適です。',
    },
    'Lean Beef Sirloin Steak with Roasted Asparagus & Garlic Herb Puree': {
      title: '牛ヒレ肉のソテー：焼きアスパラとガーリックカリフラワーピューレ',
      description: '脂肪分の少ない柔らかな牛ヒレ肉に、ポテトの代わりにカリフラワーで作った軽いハーブピューレを添えて。',
      chefTip: 'カリフラワーピューレを使うことで夜の糖質を賢く抑え、スルフォラファンを補給します。',
    },
    'Miso Glazed Wild Salmon & Roasted Bok Choy Bowl': {
      title: '白味噌仕立ての天然鮭グリルと青梗菜のソテー',
      description: '西京味噌風の優しい白味噌タレに漬け込んだ鮭と、オリーブオイルでさっと炒めた青梗菜。',
      chefTip: '味噌のコーティングが魚の水分蒸発を防ぎ、中までしっとり焼き上がります。',
    },
    'Herb-Crusted Baked Cod with Caponata & Polenta': {
      title: '真鱈の香草パン粉焼きとシチリア風カポナータ',
      description: '淡白で新鮮な真鱈にハーブをまぶしてオーブン焼きし、茄子とトマトのカポナータを添えて。',
      chefTip: 'タラは非常に脂質が少なく高タンパクで、就寝前の胃腸に最も優しい魚です。',
    },
    'Veracruz Style Red Snapper with Cilantro & Lime': {
      title: '真鯛のベラクルス風煮込み：オリーブとライム',
      description: 'トマト、グリーンオリーブ、ケッパー、ライム果汁でふっくら煮込んだ真鯛のメキシコ風ポワレ。',
      chefTip: '加熱濃縮されたトマトのリコピンが睡眠中の血管のメンテナンスを促します。',
    },
    'Bangkok Coconut Lime Poached Shrimp & Greens': {
      title: '海老のココナッツライムポシェとフレッシュグリーン',
      description: 'ライトココナッツミルクとレモングラスの優しいスープでふっくら火を通したプリプリ海老とほうれん草。',
      chefTip: '海老に含まれる天然色素アスタキサンチンが眼精疲労と筋疲労を癒やします。',
    },
    'Spanish Pescado al Horno with Escalivada & Roasted Fennel': {
      title: '白身魚のオーブン焼き：焼き野菜エスカリバダとフェンネル',
      description: '甘みのあるローストパプリカや茄子、消化を助けるフェンネルと一緒に焼き上げた白身魚。',
      chefTip: 'フェンネルの精油アネトールが胃腸のガスや張りを和らげ、安眠をサポートします。',
    },
    'Korean Doenjang Salmon Stew & Braised Greens': {
      title: '韓国風テンジャン鮭チゲとズッキーニの煮込み',
      description: '韓国の伝統豆味噌テンジャンをベースに、鮭、絹豆腐、ズッキーニを煮込んだ滋味深いチゲ。',
      chefTip: 'テンジャンの大豆ペプチドが夜間の血圧と脂質代謝のバランスを整えます。',
    },
    'Vietnamese Turmeric Poached Fish (Chả Cá Lã Vọng Style)': {
      title: 'ベトナム伝統魚料理チャーカー：ウコンとたっぷりディル',
      description: 'ターメリックと生姜でマリネした白身魚を、たっぷりのフレッシュディルとネギと一緒にソテー。',
      chefTip: 'ディルのハーブ成分が副交感神経を優位にし、スムーズな寝入りを促します。',
    },

    // Evening Snacks
    'Organic Chamomile & Magnesium Seed Crunch': {
      title: '有機カモミールティーとマグネシウムかぼちゃの種',
      description: '安らぐ香りのエジプト産有機カモミールホールティーに、マグネシウム豊富なかぼちゃの種と85%高カカオチョコ。',
      chefTip: 'かぼちゃの種に含まれる亜鉛とマグネシウムが、脳内の鎮静物質GABAの合成を強力に促します。',
    },
    'Probiotic Kefir & Tart Cherry Sleep Elixir': {
      title: '生プロバイオティクス・ケフィアとタートチェリー睡眠エリクサー',
      description: '濃厚な発酵ケフィアに、天然メラトニンを豊富に含むタートチェリー濃縮果汁をマーブル状に混ぜて。',
      chefTip: 'タートチェリーは自然界で最も高濃度の植物性メラトニンを含み、睡眠潜時を短縮します。',
    },
  },
};

export function getLocalizedCuisineDish(title: string, language: AppLanguage): LocalizedDish | null {
  if (language === 'en') return null;
  const langDict = DISH_TRANSLATIONS[language];
  if (!langDict) return null;

  // Direct match
  if (langDict[title]) {
    return langDict[title];
  }

  // Partial case-insensitive match
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(langDict)) {
    if (key.toLowerCase() === lower || lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return val;
    }
  }

  return null;
}
