import { AppLanguage, MealRecipe } from '../types/nutrition';
import { RECIPE_DATABASE } from './recipeDatabase';

interface RecipeLocalization {
  title: string;
  category?: 'breakfast' | 'dinner' | 'supper' | 'snack';
  dietTags: string[];
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  chefTip: string;
}

// Translations for all 13 core recipes
export const RECIPE_TRANSLATIONS: Record<
  Exclude<AppLanguage, 'en'>,
  Record<string, RecipeLocalization>
> = {
  // ===================== ESPAÑOL (SPANISH) =====================
  es: {
    recipe_salmon_quinoa: {
      title: 'Bol Energético de Salmón Glaseado y Quinoa',
      category: 'supper',
      dietTags: ['Alto en Proteína', 'Rico en Omega-3', 'Sin Gluten', 'Pescados y Mariscos', 'Mediterránea'],
      ingredients: [
        { name: 'Filete de Salmón del Atlántico Salvaje', amount: '150g' },
        { name: 'Quinoa Tricolor (cruda)', amount: '60g (~1 taza cocida)' },
        { name: 'Aguacate Hass en láminas', amount: '1/2 mediano (70g)' },
        { name: 'Edamame al vapor (desgranado)', amount: '1/3 taza (50g)' },
        { name: 'Aceite de Oliva Virgen Extra prensado en frío', amount: '1 cda (15ml)' },
        { name: 'Zumo de Limón Fresco y Salsa Tamari', amount: '1 cda de cada uno' },
        { name: 'Semillas de Sésamo Tostadas', amount: '1 cdta' },
        { name: 'Cilantro fresco y brotes tiernos', amount: 'Un puñado' },
      ],
      instructions: [
        'Paso 1: Preparación y Marinado — Seca el filete de salmón completamente con papel absorbente para asegurar un sellado crujiente. Condimenta ambos lados con 1/4 cdta de sal marina, pimienta negra, 1 cdta de aceite de oliva y la mitad del zumo de limón. Deja reposar 8 minutos.',
        'Paso 2: Cocinar la Quinoa — Enjuaga la quinoa tricolor en un colador fino con agua fría. Combina con 1 taza de caldo de verduras o agua en un cazo. Lleva a ebullición a fuego medio-alto, tapa, reduce a fuego bajo y cocina 15 minutos sin destapar hasta que absorba el líquido.',
        'Paso 3: Sellar el Salmón — Calienta 1 cdta de aceite en una sartén a fuego medio-alto. Coloca el salmón con la piel hacia abajo y cocina 4 minutos sin mover para crear costra dorada. Voltea con cuidado, reduce el fuego, añade 1 cda de salsa tamari y cocina 3 a 4 minutos más (centro rosado y jugoso).',
        'Paso 4: Cocer Vegetales — Cocina al vapor el edamame desgranado con 2 cdas de agua y una pizca de sal durante 2 a 3 minutos hasta que adquiera un verde esmeralda brillante.',
        'Paso 5: Condimentar Granos — Retira la quinoa del fuego y déjala reposar tapada 5 minutos. Ahueca con un tenedor e incorpora el resto de aceite de oliva, zumo de limón y cilantro picado.',
        'Paso 6: Emplatar el Bol — Coloca la quinoa esponjosa en la base de un bol hondo. Coloca el aguacate y el edamame a un lado. Añade en el centro el salmón templado, vierte los jugos de la sartén, esparce el sésamo tostado y decora con brotes frescos.',
      ],
      chefTip: 'Los ácidos grasos omega-3 EPA y DHA reducen la inflamación muscular post-entrenamiento y optimizan la sensibilidad a la insulina celular.',
    },
    recipe_greek_chicken_salad: {
      title: 'Ensalada Griega de Pollo a las Finas Hierbas',
      category: 'dinner',
      dietTags: ['Bajo en Carbohidratos', 'Mediterránea', 'Alto en Proteína', 'Sin Gluten', 'Aves y Carnes'],
      ingredients: [
        { name: 'Pechuga de Pollo limpia', amount: '150g' },
        { name: 'Corazones de Lechuga Romana y Espinacas Baby', amount: '3 tazas' },
        { name: 'Tomates Cherry en mitades', amount: '1 taza (150g)' },
        { name: 'Pepino cortado en medias lunas', amount: '1/2 taza' },
        { name: 'Queso Feta Griego tradicional desmenuzado', amount: '30g' },
        { name: 'Aceitunas Kalamata deshuesadas', amount: '6 piezas' },
        { name: 'Aceite de Oliva Virgen Extra y Vinagre de Vino Tinto', amount: '1 cda de cada uno' },
        { name: 'Orégano seco, ajo en polvo y ralladura de limón', amount: '1/2 cdta de cada uno' },
      ],
      instructions: [
        'Paso 1: Espalmar y Marinar el Pollo — Coloca la pechuga entre papel encerado y aplana suavemente hasta un grosor uniforme de 1,5 cm. Frota con orégano griego, ajo en polvo, ralladura de limón, sal marina y aceite de oliva. Marina 10 minutos.',
        'Paso 2: Asar a la Plancha — Calienta una sartén grill o parrilla a fuego medio-alto. Asa el pollo durante 5 a 6 minutos sin mover hasta marcar líneas doradas. Voltea y cocina 4 a 5 minutos más hasta que alcance 74°C en el interior.',
        'Paso 3: Reposo de la Proteína — Pasa el pollo a una tabla y cúbrelo ligeramente con papel aluminio. Deja reposar 5 minutos completos para que los jugos se redistribuyan y la carne quede tierna.',
        'Paso 4: Lavar y Secar Verduras — Lava y centrifuga las lechugas para evitar diluir el aliño. Corta los tomates cherry en mitades y el pepino en rodajas.',
        'Paso 5: Emulsionar el Aliño — En un frasco pequeño, bate el aceite de oliva virgen extra, el vinagre de vino tinto, zumo de limón, orégano, sal y pimienta negra molida.',
        'Paso 6: Montar la Ensalada — Mezcla las hojas verdes con pepino y tomates con la vinagreta. Corta el pollo en tiras al bies y colócalo encima. Corona con queso feta en trozos rústicos, aceitunas kalamata y orégano silvestre.',
      ],
      chefTip: 'Espalmar el pollo a un grosor uniforme garantiza una cocción rápida y pareja sin secar los extremos.',
    },
    recipe_power_berry_oatmeal: {
      title: 'Avena Cortada con Frutos del Bosque y Semillas de Cáñamo',
      category: 'breakfast',
      dietTags: ['Vegetariano', 'Desayuno Energético', 'Rico en Fibra', 'Salud Cardiovascular'],
      ingredients: [
        { name: 'Avena Integral (copos gruesos o cortada)', amount: '50g' },
        { name: 'Leche de Almendras sin azúcar o Agua Filtrada', amount: '240ml (1 taza)' },
        { name: 'Semillas de Cáñamo crudas peladas', amount: '1 cda (10g)' },
        { name: 'Arándanos y Frambuesas frescas', amount: '3/4 taza (100g)' },
        { name: 'Canela de Ceilán pura en polvo', amount: '1/2 cdta' },
        { name: 'Mantequilla de Almendras 100% natural', amount: '1 cdta (8g)' },
      ],
      instructions: [
        'Paso 1: Hervir el Líquido — Lleva 240ml de leche de almendras sin azúcar o agua a ebullición suave en un cazo con una pizca de sal.',
        'Paso 2: Cocción Lenta de la Avena — Añade la avena y reduce el fuego al mínimo. Remueve constantemente durante 5 a 6 minutos hasta que la avena libere sus betaglucanos y espese.',
        'Paso 3: Especiar con Canela — Apaga el fuego e incorpora la canela de Ceilán y las semillas de cáñamo para enriquecer con omega-3 y proteínas vegetales.',
        'Paso 4: Servir en Bol — Vierte la avena cremosa en un bol templado.',
        'Paso 5: Decorar con Frutos y Frutos Secos — Cubre con los frutos rojos frescos y añade una cucharadita de mantequilla de almendras pura en el centro.',
      ],
      chefTip: 'Los betaglucanos de la avena forman un gel soluble que retrasa el vaciado gástrico y estabiliza la glucosa.',
    },
    recipe_italian_pollo_limone: {
      title: 'Pollo al Limón a la Italiana con Polenta Cremosa',
      category: 'dinner',
      dietTags: ['Italiana', 'Alto en Proteína', 'Mediterránea', 'Sin Gluten'],
      ingredients: [
        { name: 'Escalopes de Pechuga de Pollo', amount: '160g' },
        { name: 'Polenta de Maíz de cocción rápida', amount: '1/2 taza' },
        { name: 'Col Toscana (Cavolo Nero) picada', amount: '2 tazas' },
        { name: 'Dientes de Ajo en láminas y Romero Fresco', amount: '2 dientes + 1 rama' },
        { name: 'Zumo de Limón Fresco y Caldo de Pollo', amount: '2 cdas + 1/4 taza' },
        { name: 'Aceite de Oliva Virgen Extra', amount: '1 cda' },
      ],
      instructions: [
        'Paso 1: Preparar Polenta — Hierve 2 tazas de caldo y vierte la polenta en forma de lluvia sin dejar de batir durante 4 minutos hasta que quede aterciopelada y densa.',
        'Paso 2: Sellar Escalopes — Dora los filetes de pollo sazonados con romero fresco en aceite de oliva durante 3 minutos por lado.',
        'Paso 3: Desglasar al Limón — Vierte el zumo de limón y caldo en la sartén hirviendo 90 segundos para ligar los jugos caramelizados.',
        'Paso 4: Saltear la Col — Retira el pollo y en los mismos jugos saltea el ajo y la col toscana durante 2 minutos hasta tierna.',
        'Paso 5: Emplatar — Sirve la polenta caliente, coloca la col salteada, los filetes dorados y salsea con la reducción de limón.',
      ],
      chefTip: 'El limón aporta ácido cítrico que ablanda las fibras de la pechuga y potencia la absorción del hierro vegetal.',
    },
    recipe_japanese_teriyaki_salmon: {
      title: 'Bento de Salmón Glaseado al Teriyaki estilo Tokio',
      category: 'supper',
      dietTags: ['Japonesa', 'Rico en Omega-3', 'Pescados y Mariscos', 'Alto en Proteína'],
      ingredients: [
        { name: 'Filete de Salmón Fresco con piel', amount: '160g' },
        { name: 'Arroz Integral al Vapor', amount: '3/4 taza' },
        { name: 'Floretes de Brócoli al vapor', amount: '1.5 tazas' },
        { name: 'Salsa Tamari baja en sodio, Mirin y Jengibre', amount: '1 cda cada uno' },
        { name: 'Semillas de Sésamo Tostadas y Cebolleta', amount: '1 cdta' },
      ],
      instructions: [
        'Paso 1: Mezclar Salsa Teriyaki — Bate la salsa tamari, mirin, jengibre rallado fresco y ajo picado fino.',
        'Paso 2: Dorar Salmón — Marca el salmón en sartén caliente 3.5 minutos por la piel hasta que quede crujiente, voltea 2 minutos.',
        'Paso 3: Glasear al Fuego — Vierte la salsa alrededor del salmón; deja que reduzca y burbujee durante 60 segundos mientras bañas el filete.',
        'Paso 4: Cocer Brócoli — Cocina el brócoli al vapor 3 minutos para mantener su textura crujiente y clorofila.',
        'Paso 5: Montar Bento — Sirve con arroz integral, brócoli fresco y corona el salmón con sésamo tostado y cebolleta fina.',
      ],
      chefTip: 'El jengibre fresco contiene gingeroles que favorecen el confort digestivo nocturno.',
    },
    recipe_greek_yogurt_parfait: {
      title: 'Bol de Yogur Griego y Frutos Rojos con Nueces',
      category: 'breakfast',
      dietTags: ['Vegetariano', 'Alto en Proteína', 'Rico en Calcio', 'Fácil y Rápido'],
      ingredients: [
        { name: 'Yogur Griego Auténtico 0% grasa', amount: '220g' },
        { name: 'Arándanos Silvestres frescos', amount: '3/4 taza' },
        { name: 'Nueces Crudas en mitades', amount: '15g' },
        { name: 'Semillas de Chía Negras', amount: '1 cda (10g)' },
        { name: 'Canela de Ceilán pura', amount: '1/4 cdta' },
      ],
      instructions: [
        'Paso 1: Porcionar Yogur — Coloca el yogur griego frío en un bol amplio creando un hueco suave en el centro.',
        'Paso 2: Semillas e Hidratación — Espolvorea las semillas de chía y las nueces troceadas con los dedos.',
        'Paso 3: Cubrir con Frutos — Coloca los arándanos frescos sobre la superficie.',
        'Paso 4: Especiar — Espolvorea con canela de Ceilán para apoyar la regulación glucémica.',
      ],
      chefTip: 'El yogur colado griego aporta el doble de proteína de caseína de liberación lenta que el yogur común.',
    },
    recipe_avocado_egg_toast: {
      title: 'Tostada de Masa Madre con Aguacate y Huevo Poché',
      category: 'breakfast',
      dietTags: ['Vegetariano', 'Grasas Saludables', 'Desayuno Completo'],
      ingredients: [
        { name: 'Huevo campero de gallina feliz', amount: '1 unidad grande' },
        { name: 'Rebanada de Pan de Masa Madre Artesanal', amount: '1 rebanada (45g)' },
        { name: 'Aguacate Hass maduro', amount: '1/2 unidad (70g)' },
        { name: 'Zumo de Limón y Escamas de Sal Marina', amount: '1 cdta + pizca' },
        { name: 'Semillas y copos de chile', amount: '1/2 cdta' },
      ],
      instructions: [
        'Paso 1: Tostar Pan — Tuesta la rebanada de masa madre hasta que esté bien crujiente por fuera.',
        'Paso 2: Majar Aguacate — Chafa el aguacate con tenedor junto con el zumo de limón y sal marina dejando textura rústica.',
        'Paso 3: Escalfar Huevo — En agua a punto de hervir con unas gotas de vinagre, crea un remolino suave y vierte el huevo. Cocina 3 minutos para yema líquida.',
        'Paso 4: Escurrir — Saca el huevo con espumadera y sécalo 5 segundos en papel para no humedecer la tostada.',
        'Paso 5: Montar — Unta el aguacate sobre la tostada caliente, coloca el huevo poché y sazona con copos de chile y brotes.',
      ],
      chefTip: 'Secar el huevo poché en papel absorbente evita que la humedad estropee la corteza del pan.',
    },
    recipe_vegan_falafel_bowl: {
      title: 'Bol Mezze Vegano de Falafel al Horno y Quinoa',
      category: 'dinner',
      dietTags: ['Algo Vegano', 'Vegetariano', 'Proteína Vegetal', 'Rico en Fibra'],
      ingredients: [
        { name: 'Falafels de Garbanzo horneados', amount: '4 unidades (120g)' },
        { name: 'Quinoa Tricolor cocida', amount: '3/4 taza' },
        { name: 'Berenjena asada en dados', amount: '1 taza' },
        { name: 'Rúcula fresca y Pepino Persa', amount: '2 tazas' },
        { name: 'Tahini de Sésamo y Limón', amount: '2 cdas' },
        { name: 'Especias Zaatar y Sumac', amount: '1/2 cdta' },
      ],
      instructions: [
        'Paso 1: Hornear Falafels y Berenjena — Hornea a 200°C durante 15 minutos hasta que los falafels estén crujientes y la berenjena tierna.',
        'Paso 2: Bater Salsa Tahini — Mezcla el tahini con 1.5 cdas de agua tibia, zumo de limón y pizca de sal hasta obtener una crema suave.',
        'Paso 3: Montar la Base — Coloca la rúcula y la quinoa en un bol hondo.',
        'Paso 4: Distribuir Vegetales — Coloca los dados de berenjena, pepino y los falafels calientes en secciones.',
        'Paso 5: Aliñar — Riega generosamente con la salsa de tahini y espolvorea sumac y zaatar.',
      ],
      chefTip: 'Los garbanzos y la quinoa juntos proporcionan un perfil completo de aminoácidos esenciales.',
    },
    recipe_sirloin_asparagus: {
      title: 'Solomillo de Ternera con Espárragos Asados y Patatas',
      category: 'supper',
      dietTags: ['Alto en Proteína', 'Aves y Carnes', 'Sin Gluten', 'Rico en Hierro'],
      ingredients: [
        { name: 'Filete de Solomillo de Ternera de pasto', amount: '170g' },
        { name: 'Espárragos Verdes frescos', amount: '10 unidades' },
        { name: 'Patatas pequeñas baby cortadas a la mitad', amount: '3 unidades (100g)' },
        { name: 'Romero Fresco y Ajo machacado', amount: '1 rama + 2 dientes' },
        { name: 'Aceite de Oliva y Sal en Escamas', amount: '1 cda + 1/2 cdta' },
      ],
      instructions: [
        'Paso 1: Aclimatar la Carne — Saca la carne de la nevera 20 minutos antes de cocinar. Seca con papel y sazona con sal y pimienta.',
        'Paso 2: Asar Patatas y Espárragos — Hornea las patatas a 200°C 15 minutos; añade los espárragos con ajo y hornea 8 minutos más.',
        'Paso 3: Sellar a Fuego Vivo — En sartén de hierro muy caliente con 1 cdta de aceite, sella la carne 3.5 minutos por lado con romero y ajo para punto medio.',
        'Paso 4: Reposo Crucial — Pasa la carne a una tabla y déjala reposar 5 minutos tapada para asentar los jugos.',
        'Paso 5: Cortar y Servir — Corta en láminas transversales a la fibra y sirve con los espárragos y patatas asadas.',
      ],
      chefTip: 'El reposo de 5 minutos permite que las fibras musculares retengan los jugos internos.',
    },
    recipe_thai_poached_shrimp: {
      title: 'Langostinos Pochados al Coco y Lima estilo Bangkok',
      category: 'supper',
      dietTags: ['Pescados y Mariscos', 'Tailandesa', 'Sin Gluten', 'Alto en Proteína'],
      ingredients: [
        { name: 'Langostinos Tigre pelados', amount: '180g (6-8 piezas)' },
        { name: 'Leche de Coco Ligera sin azúcar', amount: '120ml (1/2 taza)' },
        { name: 'Caldo de Verduras bajo en sal', amount: '120ml' },
        { name: 'Hierba Limón (Lemongrass) y Jengibre', amount: '1 tallo + 4 rodajas' },
        { name: 'Tirabeques y Maíz dulce baby', amount: '1 taza' },
        { name: 'Arroz Jazmín Integral al vapor', amount: '1/2 taza' },
        { name: 'Albahaca Tailandesa y Lima', amount: 'Un puñado + 1 lima' },
      ],
      instructions: [
        'Paso 1: Infusión Aromática — Machaca el tallo de lemongrass y hiérvelo a fuego lento con la leche de coco, caldo y jengibre durante 6 minutos.',
        'Paso 2: Escaldar Verduras — Añade los tirabeques y maíz baby al caldo 2 minutos hasta que estén tiernos.',
        'Paso 3: Pochar Langostinos — Añade los langostinos a fuego muy suave durante 3 a 4 minutos hasta que tomen color rosado en forma de C.',
        'Paso 4: Terminar con Albahaca — Apaga el fuego e incorpora el zumo de lima fresco y hojas de albahaca tailandesa.',
        'Paso 5: Servir — Vierte el caldo aromático y los langostinos sobre arroz jazmín caliente.',
      ],
      chefTip: 'Cocinar los langostinos a fuego suave evita que la proteína se contraiga y quede gomosa.',
    },
    recipe_seared_sea_bass: {
      title: 'Lubina a la Plancha con Alcaparras y Tomates Cherry',
      category: 'supper',
      dietTags: ['Pescados y Mariscos', 'Mediterránea', 'Bajo en Carbohidratos', 'Rico en Omega-3'],
      ingredients: [
        { name: 'Filete de Lubina Salvaje con piel', amount: '170g' },
        { name: 'Tomates Cherry en mitades', amount: '1 taza' },
        { name: 'Alcaparras escurridas', amount: '1 cda' },
        { name: 'Calabacín en cintas finas', amount: '1 mediano' },
        { name: 'Ajo laminado y Aceite de Oliva', amount: '2 dientes + 1 cda' },
        { name: 'Zumo de Limón y Albahaca fresca', amount: '1 cda + hojas' },
      ],
      instructions: [
        'Paso 1: Marcar la Piel — Realiza 3 cortes superficiales en la piel de la lubina para que no se arquee. Sazona con sal marina y pimienta.',
        'Paso 2: Saltear Calabacín — Pasa las cintas de calabacín 2 minutos por sartén tapada con una pizca de sal.',
        'Paso 3: Sellar Piel Crujiente — Cocina la lubina con la piel hacia abajo en sartén caliente 4 minutos presionando los primeros 15 segundos.',
        'Paso 4: Voltear y Rematar — Da la vuelta con cuidado y cocina 2 minutos por el lado de la carne.',
        'Paso 5: Saltear Tomates — Saltea en los jugos el ajo, tomates cherry y alcaparras hasta que los tomates revienten. Salsea el pescado.',
      ],
      chefTip: 'Presionar el filete durante los primeros 15 segundos asegura contacto total y piel ultra crujiente.',
    },
    recipe_edamame_tea_snack: {
      title: 'Edamame al Vapor con Sal Marina y Almendras',
      category: 'snack',
      dietTags: ['Algo Vegano', 'Vegetariano', 'Fácil y Rápido', 'Rico en Fibra'],
      ingredients: [
        { name: 'Vainas de Edamame frescas o congeladas', amount: '120g' },
        { name: 'Almendras Crudas enteras', amount: '15g' },
        { name: 'Sal Marina en escamas', amount: '1/4 cdta' },
        { name: 'Té Verde Japonés Sencha o Matcha', amount: '1 taza preparada' },
      ],
      instructions: [
        'Paso 1: Preparar Té — Infusiona el té verde con agua a 80°C durante 2 minutos.',
        'Paso 2: Cocer Edamame — Cuece las vainas de edamame al vapor durante 3 a 4 minutos hasta que queden verde brillante.',
        'Paso 3: Escurrir y Sazonar — Espolvorea con sal marina en escamas para que se adhiera al calor.',
        'Paso 4: Acompañar con Almendras — Sirve las vainas calientes junto a las almendras y la taza de té verde.',
      ],
      chefTip: 'El edamame aporta proteína vegetal completa y minerales como magnesio y potasio.',
    },
    recipe_chamomile_bedtime_elixir: {
      title: 'Infusión de Manzanilla con Semillas de Calabaza y Cacao',
      category: 'snack',
      dietTags: ['Vegetariano', 'Fácil y Rápido', 'Sin Gluten', 'Favorece el Sueño'],
      ingredients: [
        { name: 'Flores de Manzanilla Ecológica', amount: '2 cdta o 1 bolsita' },
        { name: 'Semillas de Calabaza crudas (pepitas)', amount: '15g' },
        { name: 'Chocolate Negro 85% cacao puro', amount: '10g (1 onza)' },
        { name: 'Agua Filtrada caliente a 95°C', amount: '250ml' },
      ],
      instructions: [
        'Paso 1: Calentar Agua — Calienta agua hasta 95°C evitando que hierva a borbotones.',
        'Paso 2: Infusionar Tapada — Vierte el agua sobre la manzanilla y tapa con un platito 5 a 7 minutos para retener aceites esenciales.',
        'Paso 3: Servir Semillas y Cacao — Coloca las semillas de calabaza y la onza de chocolate negro en un platito.',
        'Paso 4: Disfrutar Previo al Sueño — Toma la infusión tibia y mastica las semillas 45 minutos antes de dormir.',
      ],
      chefTip: 'Tapar la taza durante el reposo evita la evaporación de terpenos relajantes como el chamazuleno.',
    },
  },

  // ===================== DEUTSCH (GERMAN) =====================
  de: {
    recipe_salmon_quinoa: {
      title: 'Glasierte Lachs- & Quinoa-Power-Bowl',
      category: 'supper',
      dietTags: ['Viel Protein', 'Omega-3-reich', 'Glutenfrei', 'Fisch & Meeresfrüchte', 'Mediterran'],
      ingredients: [
        { name: 'Wildlachsfilet aus dem Atlantik', amount: '150g' },
        { name: 'Dreifarbige Quinoa (ungekocht)', amount: '60g (~1 Tasse gekocht)' },
        { name: 'Hass-Avocado in Scheiben', amount: '1/2 mittelgroß (70g)' },
        { name: 'Gedämpfte Edamame (ausgelöst)', amount: '1/3 Tasse (50g)' },
        { name: 'Kaltgepresstes natives Olivenöl extra', amount: '1 EL (15ml)' },
        { name: 'Frischer Zitronensaft & Tamari-Sojasauce', amount: 'je 1 EL' },
        { name: 'Geröstete weiße & schwarze Sesamsamen', amount: '1 TL' },
        { name: 'Frischer Koriander & Microgreens', amount: 'Kleine Handvoll' },
      ],
      instructions: [
        'Schritt 1: Vorbereitung & Marinieren — Lachsfilet gründlich trocken tupfen. Mit Meersalz, Pfeffer, etwas Olivenöl und Zitronensaft würzen und 8 Minuten ziehen lassen.',
        'Schritt 2: Quinoa kochen — Quinoa in heißer Gemüsebrühe aufkochen, abdecken und 15 Minuten bei milder Hitze quellen lassen.',
        'Schritt 3: Lachs braten — Lachs auf der Hautseite 4 Minuten kross anbraten, wenden, mit Tamari beträufeln und 3 Minuten sanft fertig garen.',
        'Schritt 4: Gemüse dämpfen — Edamame 2–3 Minuten dämpfen, bis sie knackig-grün sind.',
        'Schritt 5: Quinoa verfeinern — Quinoa mit Olivenöl, Zitronensaft und Koriander locker auflockern.',
        'Schritt 6: Bowl anrichten — Quinoa in eine Schale füllen, Avocado, Edamame und Lachs darauf arrangieren, mit Bratensaft und Sesam vollenden.',
      ],
      chefTip: 'Omega-3-Fettsäuren lindern muskuläre Entzündungen und unterstützen die Regeneration über Nacht.',
    },
    recipe_greek_chicken_salad: {
      title: 'Mediterraner Kräuter-Hähnchensalat',
      category: 'dinner',
      dietTags: ['Low-Carb', 'Mediterran', 'Viel Protein', 'Glutenfrei', 'Geflügel & Fleisch'],
      ingredients: [
        { name: 'Hähnchenbrustfilet', amount: '150g' },
        { name: 'Römersalat & Babyspinat', amount: '3 Tassen' },
        { name: 'Kirschtomaten (halbiert)', amount: '1 Tasse (150g)' },
        { name: 'Gurkenscheiben', amount: '1/2 Tasse' },
        { name: 'Griechischer Schafsfeta', amount: '30g' },
        { name: 'Kalamata-Oliven', amount: '6 Stück' },
        { name: 'Olivenöl extra vergine & Rotweinessig', amount: 'je 1 EL' },
        { name: 'Oregano, Knoblauchpulver, Zitronenabrieb', amount: 'je 1/2 TL' },
      ],
      instructions: [
        'Schritt 1: Hähnchen plattieren & würzen — Fleisch leicht flach klopfen, mit Oregano, Knoblauch, Zitrone und Olivenöl 10 Minuten marinieren.',
        'Schritt 2: Saftig grillen — In Grillpfanne 5–6 Minuten braten, wenden und weitere 4–5 Minuten durchgaren (74°C Kerntemperatur).',
        'Schritt 3: Fleisch ruhen lassen — Hähnchen 5 Minuten abgedeckt ruhen lassen, damit der Saft im Fleisch bleibt.',
        'Schritt 4: Salat waschen — Blattsalate trocken schleudern, Tomaten und Gurken schneiden.',
        'Schritt 5: Vinaigrette anrühren — Olivenöl mit Rotweinessig, Zitronensaft, Salz und Pfeffer verquirlen.',
        'Schritt 6: Anrichten — Salat mit Dressing marinieren, Hähnchenstreifen, Feta und Oliven darauf anrichten.',
      ],
      chefTip: 'Gleichmäßiges Klopfen verhindert das Austrocknen der Ränder.',
    },
    recipe_power_berry_oatmeal: {
      title: 'Haferflocken-Bowl mit Waldbeeren & Hanfsamen',
      category: 'breakfast',
      dietTags: ['Vegetarisch', 'Energiefrühstück', 'Ballaststoffreich'],
      ingredients: [
        { name: 'Vollkorn-Haferflocken', amount: '50g' },
        { name: 'Ungesüßte Mandelmilch', amount: '240ml' },
        { name: 'Geschälte Hanfsamen', amount: '1 EL' },
        { name: 'Frische Heidelbeeren & Himbeeren', amount: '3/4 Tasse' },
        { name: 'Ceylon-Zimt', amount: '1/2 TL' },
        { name: 'Mandelmus', amount: '1 TL' },
      ],
      instructions: [
        'Schritt 1: Milch erhitzen — Mandelmilch mit Prise Salz leicht aufkochen.',
        'Schritt 2: Haferflocken köcheln — Haferflocken 5 Minuten sanft einrühren.',
        'Schritt 3: Verfeinern — Zimt und Hanfsamen unterrühren.',
        'Schritt 4: Anrichten — Mit frischen Beeren und Mandelmus toppen.',
      ],
      chefTip: 'Hafer-Beta-Glucane sättigen langanhaltend und schonen den Blutzuckerspiegel.',
    },
    recipe_italian_pollo_limone: {
      title: 'Italienisches Zitronen-Hähnchen mit Polenta',
      category: 'dinner',
      dietTags: ['Italienisch', 'Viel Protein', 'Glutenfrei'],
      ingredients: [
        { name: 'Hähnchenschnitzel', amount: '160g' },
        { name: 'Maisgrieß (Polenta)', amount: '1/2 Tasse' },
        { name: 'Schwarzkohl (Cavolo Nero)', amount: '2 Tassen' },
        { name: 'Knoblauch & Rosmarin', amount: '2 Zehen + 1 Zweig' },
        { name: 'Zitronensaft & Brühe', amount: '2 EL + 1/4 Tasse' },
      ],
      instructions: [
        'Schritt 1: Cremige Polenta kochen — In heißer Brühe 4 Minuten rühren.',
        'Schritt 2: Hähnchen anbraten — 3 Minuten je Seite goldbraun braten.',
        'Schritt 3: Zitronenreduktion — Mit Zitronensaft ablöschen und einkochen.',
        'Schritt 4: Schwarzkohl dünsten — In Pfannensaft kurz anschwitzen.',
        'Schritt 5: Servieren — Auf Polenta mit Sauce anrichten.',
      ],
      chefTip: 'Zitronensäure macht das Fleisch butterweich.',
    },
    recipe_japanese_teriyaki_salmon: {
      title: 'Tokio Teriyaki Lachs Bento-Box',
      category: 'supper',
      dietTags: ['Japanisch', 'Omega-3', 'Viel Protein'],
      ingredients: [
        { name: 'Lachsfilet mit Haut', amount: '160g' },
        { name: 'Gedämpfter Naturreis', amount: '3/4 Tasse' },
        { name: 'Brokkoliröschen', amount: '1.5 Tassen' },
        { name: 'Tamari, Mirin, Ingwer', amount: 'je 1 EL' },
      ],
      instructions: [
        'Schritt 1: Sauce mischen — Tamari, Mirin und Ingwer verrühren.',
        'Schritt 2: Lachs braten — Hautseite kross braten, dann wenden.',
        'Schritt 3: Glasieren — Sauce zugeben und Lachs darin schwenken.',
        'Schritt 4: Brokkoli dämpfen — 3 Minuten bissfest garen.',
        'Schritt 5: Anrichten — Mit Naturreis und Sesam servieren.',
      ],
      chefTip: 'Frischer Ingwer fördert die abendliche Verdauung.',
    },
    recipe_greek_yogurt_parfait: {
      title: 'Griechischer Joghurt-Power-Bowl mit Waldbeeren',
      category: 'breakfast',
      dietTags: ['Vegetarisch', 'Proteinreich', 'Kalziumreich'],
      ingredients: [
        { name: 'Griechischer Joghurt 0%', amount: '220g' },
        { name: 'Wilde Heidelbeeren', amount: '3/4 Tasse' },
        { name: 'Walnüsse', amount: '15g' },
        { name: 'Chiasamen', amount: '1 EL' },
      ],
      instructions: [
        'Schritt 1: Joghurt portionieren — In Schale geben.',
        'Schritt 2: Toppings — Mit Chiasamen, Nüssen und Beeren garnieren.',
        'Schritt 3: Zimt — Mit Ceylon-Zimt bestäuben.',
      ],
      chefTip: 'Echter griechischer Joghurt liefert reichlich langsam verdauliches Casein-Protein.',
    },
    recipe_avocado_egg_toast: {
      title: 'Sauerteig-Avocadotoast mit pochiertem Ei',
      category: 'breakfast',
      dietTags: ['Vegetarisch', 'Gesunde Fette'],
      ingredients: [
        { name: 'Bio-Ei', amount: '1 großes' },
        { name: 'Sauerteigbrot', amount: '1 dicke Scheibe' },
        { name: 'Hass-Avocado', amount: '1/2 Stück' },
        { name: 'Zitronensaft & Chiligewürz', amount: 'nach Geschmack' },
      ],
      instructions: [
        'Schritt 1: Brot rösten — Sauerteigbrot kross toasten.',
        'Schritt 2: Avocado cremig zerdrücken — Mit Zitrone und Salz vermengen.',
        'Schritt 3: Ei pochieren — 3 Minuten in siedendem Essigwasser ziehen lassen.',
        'Schritt 4: Abtropfen & Belegen — Auf Toast setzen und würzen.',
      ],
      chefTip: 'Ei auf Küchenpapier abtropfen, damit das Brot knusprig bleibt.',
    },
    recipe_vegan_falafel_bowl: {
      title: 'Vegane Falafel- & Quinoa-Mezze-Bowl',
      category: 'dinner',
      dietTags: ['Vegan', 'Pflanzliches Protein', 'Ballaststoffreich'],
      ingredients: [
        { name: 'Ofen-Kichererbsen-Falafel', amount: '4 Stück' },
        { name: 'Gekochte Quinoa', amount: '3/4 Tasse' },
        { name: 'Geröstete Aubergine', amount: '1 Tasse' },
        { name: 'Sesam-Tahini-Sauce', amount: '2 EL' },
      ],
      instructions: [
        'Schritt 1: Backen — Falafel und Auberginen 15 Min bei 200°C rösten.',
        'Schritt 2: Tahini anrühren — Mit Zitrone und warmem Wasser cremig rühren.',
        'Schritt 3: Schale füllen — Quinoa, Rucola, Gemüse und Falafel schichten.',
        'Schritt 4: Beträufeln — Mit Tahini und Sumach verfeinern.',
      ],
      chefTip: 'Kichererbsen und Quinoa ergänzen sich zu einem vollständigen Aminosäurenprofil.',
    },
    recipe_sirloin_asparagus: {
      title: 'Rinderhüftsteak mit grünem Spargel & Kartoffeln',
      category: 'supper',
      dietTags: ['Viel Protein', 'Eisenreich', 'Glutenfrei'],
      ingredients: [
        { name: 'Rinderhüftsteak (mager)', amount: '170g' },
        { name: 'Grüner Spargel', amount: '10 Stangen' },
        { name: 'Drillinge-Kartoffeln', amount: '3 kleine' },
        { name: 'Rosmarin & Knoblauch', amount: 'nach Belieben' },
      ],
      instructions: [
        'Schritt 1: Fleisch temperieren — 20 Min vor dem Braten herauslegen.',
        'Schritt 2: Ofengemüse — Kartoffeln und Spargel bei 200°C rösten.',
        'Schritt 3: Scharf anbraten — Steak in heißer Gusseisenpfanne 3.5 Min je Seite braten.',
        'Schritt 4: Ruhen lassen — 5 Minuten ruhen lassen vor dem Anschneiden.',
      ],
      chefTip: 'Kurzes Ruhen sichert maximale Zartheit.',
    },
    recipe_thai_poached_shrimp: {
      title: 'Pochierte Tigergarnelen in Kokos-Limetten-Sud',
      category: 'supper',
      dietTags: ['Meeresfrüchte', 'Thailändisch', 'Glutenfrei'],
      ingredients: [
        { name: 'Tigergarnelen (geschält)', amount: '180g' },
        { name: 'Leichte Kokosmilch', amount: '120ml' },
        { name: 'Zitronengras & Kaffirlimette', amount: 'je 1 Stück' },
        { name: 'Zuckerschoten & Babymais', amount: '1 Tasse' },
      ],
      instructions: [
        'Schritt 1: Aromatensud — Kokosmilch und Zitronengras 6 Min köcheln.',
        'Schritt 2: Gemüse zugeben — 2 Minuten knackig garen.',
        'Schritt 3: Garnelen pochieren — 3–4 Min sanft garziehen lassen.',
        'Schritt 4: Vollenden — Mit Limette und Thai-Basilikum servieren.',
      ],
      chefTip: 'Sanftes Garen unter dem Siedepunkt verhindert zähe Garnelen.',
    },
    recipe_seared_sea_bass: {
      title: 'Gebratener Seebarsch mit Kapern & geschmorten Tomaten',
      category: 'supper',
      dietTags: ['Fisch', 'Mediterran', 'Omega-3'],
      ingredients: [
        { name: 'Seebarschfilet mit Haut', amount: '170g' },
        { name: 'Kirschtomaten & Kapern', amount: '1 Tasse + 1 EL' },
        { name: 'Zucchinistreifen', amount: '1 mittelgroße' },
      ],
      instructions: [
        'Schritt 1: Haut einschneiden — Verhindert Wölben in der Pfanne.',
        'Schritt 2: Haut kross braten — 4 Minuten bei mittlerer Hitze.',
        'Schritt 3: Tomatensud — Tomaten und Kapern kurz anschwitzen.',
      ],
      chefTip: 'Hautseite anfangs sanft andrücken für gleichmäßige Knusprigkeit.',
    },
    recipe_edamame_tea_snack: {
      title: 'Gedämpfte Edamame mit Meersalz & gerösteten Mandeln',
      category: 'snack',
      dietTags: ['Vegan', 'Schnell & Einfach'],
      ingredients: [
        { name: 'Edamame-Schoten', amount: '120g' },
        { name: 'Ganze Mandeln', amount: '15g' },
        { name: 'Maldon Meersalz & Grüner Tee', amount: 'nach Bedarf' },
      ],
      instructions: [
        'Schritt 1: Dämpfen — Edamame 3 Minuten dämpfen.',
        'Schritt 2: Salzen — Heiß mit Meersalzflocken bestreuen.',
        'Schritt 3: Genießen — Zusammen mit Mandeln und heißem Tee naschen.',
      ],
      chefTip: 'Liefert komplettes pflanzliches Eiweiß.',
    },
    recipe_chamomile_bedtime_elixir: {
      title: 'Bio-Kamillentee mit Magnesium-Kernen & Rohschokolade',
      category: 'snack',
      dietTags: ['Vegetarisch', 'Schlafunterstützung'],
      ingredients: [
        { name: 'Bio-Kamillenblüten', amount: '2 TL' },
        { name: 'Kürbiskerne', amount: '15g' },
        { name: 'Zartbitterschokolade 85%', amount: '1 Stück' },
      ],
      instructions: [
        'Schritt 1: Tee aufbrühen — Wasser auf 95°C erhitzen.',
        'Schritt 2: Abdecken — 6 Minuten abgedeckt ziehen lassen.',
        'Schritt 3: Abendritual — 45 Minuten vor dem Schlafen genießen.',
      ],
      chefTip: 'Tasse abdecken, damit ätherische Öle nicht verdampfen.',
    },
  },

  // ===================== FRANÇAIS (FRENCH) =====================
  fr: {
    recipe_salmon_quinoa: {
      title: 'Bol Énergie de Saumon Glacé et Quinoa',
      category: 'supper',
      dietTags: ['Riche en Protéines', 'Oméga-3', 'Sans Gluten', 'Poissons', 'Méditerranéen'],
      ingredients: [
        { name: 'Pavé de Saumon Sauvage de l\'Atlantique', amount: '150g' },
        { name: 'Quinoa Tricolore', amount: '60g' },
        { name: 'Avocat Hass en tranches', amount: '1/2' },
        { name: 'Fèves d\'Edamame vapeur', amount: '1/3 tasse' },
        { name: 'Huile d\'Olive Vierge Extra', amount: '1 c. à soupe' },
        { name: 'Jus de Citron & Sauce Tamari', amount: '1 c. à soupe de chaque' },
      ],
      instructions: [
        'Étape 1: Préparer & Assaisonner — Sécher le pavé de saumon. Assaisonner d\'huile d\'olive, jus de citron, sel et poivre.',
        'Étape 2: Cuire le Quinoa — Cuire 15 minutes dans un bouillon de légumes couvert.',
        'Étape 3: Poêler le Saumon — Saisir côté peau 4 minutes, retourner et arroser de sauce tamari 3 minutes.',
        'Étape 4: Cuire l\'Edamame — Cuire à la vapeur 3 minutes jusqu\'à vert éclatant.',
        'Étape 5: Dresser le Bol — Disposer le quinoa, l\'avocat, l\'edamame et le saumon doré.',
      ],
      chefTip: 'Les acides oméga-3 préservent l\'élasticité cellulaire et favorisent la récupération.',
    },
    recipe_greek_chicken_salad: {
      title: 'Salade Méditerranéenne de Poulet Grillé aux Herbes',
      category: 'dinner',
      dietTags: ['Faible en Glucides', 'Méditerranéen', 'Riche en Protéines', 'Sans Gluten'],
      ingredients: [
        { name: 'Blanc de Poulet fermier', amount: '150g' },
        { name: 'Cœurs de Romaine & Jeunes Pousses', amount: '3 tasses' },
        { name: 'Tomates Cerises coupées en deux', amount: '1 tasse' },
        { name: 'Concombre & Feta AOP émiettée', amount: '1/2 tasse + 30g' },
        { name: 'Olives Kalamata & Huile d\'Olive', amount: '6 pièces + 1 c. à soupe' },
      ],
      instructions: [
        'Étape 1: Aplatir & Mariner — Aplatir légèrement le filet. Mariner avec origan, citron, ail et huile d\'olive.',
        'Étape 2: Griller — Cuire 5 à 6 minutes par côté jusqu\'à belle coloration.',
        'Étape 3: Reposer la Viande — Laisser reposer 5 minutes sous papier d\'aluminium.',
        'Étape 4: Émulsionner la Vinaigrette — Fouetter huile d\'olive, vinaigre de vin rouge et origan.',
        'Étape 5: Assembler — Mélanger la salade, disposer le poulet émincé, la feta et les olives.',
      ],
      chefTip: 'Le repos de 5 minutes permet aux sucs de se diffuser dans toute la viande.',
    },
    recipe_power_berry_oatmeal: {
      title: 'Gruau d\'Avoine aux Baies Sauvages & Graines de Chanvre',
      category: 'breakfast',
      dietTags: ['Végétarien', 'Riche en Fibres', 'Énergie Matinale'],
      ingredients: [
        { name: 'Flocons d\'Avoine Complète', amount: '50g' },
        { name: 'Lait d\'Amande non sucré', amount: '240ml' },
        { name: 'Graines de Chanvre décortiquées', amount: '1 c. à soupe' },
        { name: 'Myrtilles & Framboises fraîches', amount: '3/4 tasse' },
      ],
      instructions: [
        'Étape 1: Chauffer le Lait — Porter à frémissement.',
        'Étape 2: Cuire l\'Avoine — Cuire 5 minutes à feu doux en remuant.',
        'Étape 3: Garnir — Servir avec les baies fraîches et les graines de chanvre.',
      ],
      chefTip: 'Les bêta-glucanes ralentissent l\'absorption des sucres et stabilisent l\'énergie.',
    },
    recipe_italian_pollo_limone: {
      title: 'Poulet au Citron à l\'Italienne avec Polenta',
      category: 'dinner',
      dietTags: ['Italien', 'Riche en Protéines', 'Sans Gluten'],
      ingredients: [
        { name: 'Escalopes de Poulet', amount: '160g' },
        { name: 'Polenta fine', amount: '1/2 tasse' },
        { name: 'Chou Toscan (Cavolo Nero)', amount: '2 tasses' },
        { name: 'Jus de Citron & Romarin', amount: '2 c. à soupe + 1 brin' },
      ],
      instructions: [
        'Étape 1: Cuire la Polenta — Fouetter 4 minutes dans un bouillon chaud.',
        'Étape 2: Dorer le Poulet — Saisir 3 minutes de chaque côté.',
        'Étape 3: Déglacer au Citron — Réduire les sucs avec le jus de citron.',
        'Étape 4: Dresser — Servir sur la polenta crémeuse.',
      ],
      chefTip: 'Le citron attendrit les fibres musculaires naturellement.',
    },
    recipe_japanese_teriyaki_salmon: {
      title: 'Bento de Saumon Glacé Teriyaki façon Tokyo',
      category: 'supper',
      dietTags: ['Japonais', 'Oméga-3', 'Riche en Protéines'],
      ingredients: [
        { name: 'Filet de Saumon frais', amount: '160g' },
        { name: 'Riz Brun vapeur', amount: '3/4 tasse' },
        { name: 'Fleurets de Brocoli', amount: '1.5 tasses' },
        { name: 'Sauce Tamari & Mirin', amount: '1 c. à soupe de chaque' },
      ],
      instructions: [
        'Étape 1: Saisir le Saumon — Dorer côté peau 4 minutes.',
        'Étape 2: Glacer au Teriyaki — Napper de sauce et faire caraméliser 1 minute.',
        'Étape 3: Servir en Bento — Accompagner de riz complet et brocolis vapeur.',
      ],
      chefTip: 'Le gingembre favorise le confort gastrique nocturne.',
    },
    recipe_greek_yogurt_parfait: {
      title: 'Bol Énergie de Yaourt Grec & Baies Sauvages',
      category: 'breakfast',
      dietTags: ['Végétarien', 'Riche en Protéines'],
      ingredients: [
        { name: 'Yaourt Grec Authentique 0%', amount: '220g' },
        { name: 'Myrtilles fraîches', amount: '3/4 tasse' },
        { name: 'Noix & Graines de Chia', amount: '15g + 1 c. à soupe' },
      ],
      instructions: [
        'Étape 1: Dresser le Yaourt — Verser dans un bol.',
        'Étape 2: Ajouter les fruits et graines.',
        'Étape 3: Saupoudrer de cannelle.',
      ],
      chefTip: 'Fournit de la caséine pour une satiété prolongée.',
    },
    recipe_avocado_egg_toast: {
      title: 'Toast de Pain au Levain à l\'Avocat et Œuf Poché',
      category: 'breakfast',
      dietTags: ['Végétarien', 'Graisses Saines'],
      ingredients: [
        { name: 'Œuf Bio', amount: '1 gros' },
        { name: 'Tranche de Pain au Levain', amount: '1 tranche' },
        { name: 'Avocat Hass', amount: '1/2' },
      ],
      instructions: [
        'Étape 1: Toaster le Pain — Dorer le levain.',
        'Étape 2: Écraser l\'Avocat avec citron et fleur de sel.',
        'Étape 3: Pocher l\'Œuf 3 minutes.',
        'Étape 4: Égoutter sur papier absorbant et disposer.',
      ],
      chefTip: 'Égoutter l\'œuf évite de détremper la croûte croustillante.',
    },
    recipe_vegan_falafel_bowl: {
      title: 'Bol Mezze Végétalien de Falafels au Four et Quinoa',
      category: 'dinner',
      dietTags: ['Végétalien', 'Protéines Végétales'],
      ingredients: [
        { name: 'Falafels aux herbes au four', amount: '4 pièces' },
        { name: 'Quinoa cuit', amount: '3/4 tasse' },
        { name: 'Aubergines rôties', amount: '1 tasse' },
        { name: 'Sauce Tahini au citron', amount: '2 c. à soupe' },
      ],
      instructions: [
        'Étape 1: Rôtir au Four à 200°C pendant 15 minutes.',
        'Étape 2: Préparer la Sauce Tahini onctueuse.',
        'Étape 3: Assembler et napper de sauce.',
      ],
      chefTip: 'Combinaison complète en acides aminés essentiels.',
    },
    recipe_sirloin_asparagus: {
      title: 'Steak de Surlonge avec Asperges Rôties et Pommes de Terre',
      category: 'supper',
      dietTags: ['Riche en Protéines', 'Riche en Fer'],
      ingredients: [
        { name: 'Pavé de Surlonge de bœuf', amount: '170g' },
        { name: 'Asperges Vertes', amount: '10 tiges' },
        { name: 'Petites Pommes de Terre', amount: '3' },
      ],
      instructions: [
        'Étape 1: Tempérer la viande 20 minutes.',
        'Étape 2: Rôtir les légumes à 200°C.',
        'Étape 3: Saisir le steak 3.5 minutes par face.',
        'Étape 4: Laisser reposer 5 minutes avant de découper.',
      ],
      chefTip: 'Le temps de repos permet aux jus de se fixer dans la viande.',
    },
    recipe_thai_poached_shrimp: {
      title: 'Crevettes Tigrées Pochées au Lait de Coco & Citron Vert',
      category: 'supper',
      dietTags: ['Fruits de Mer', 'Thaï'],
      ingredients: [
        { name: 'Crevettes Tigrées géantes', amount: '180g' },
        { name: 'Lait de Coco léger', amount: '120ml' },
        { name: 'Citronnelle & Pois gourmands', amount: '1 tige + 1 tasse' },
      ],
      instructions: [
        'Étape 1: Infuser la citronnelle dans le coco 6 minutes.',
        'Étape 2: Pocher doucement les crevettes 3 minutes.',
        'Étape 3: Finir avec basilic thaï et jus de lime.',
      ],
      chefTip: 'Le pochage doux préserve la tendreté des crustacés.',
    },
    recipe_seared_sea_bass: {
      title: 'Bar Poêlé aux Câpres et Tomates Rôties',
      category: 'supper',
      dietTags: ['Poissons', 'Méditerranéen'],
      ingredients: [
        { name: 'Filet de Bar avec peau', amount: '170g' },
        { name: 'Tomates Cerises & Câpres', amount: '1 tasse + 1 c. à soupe' },
        { name: 'Rubans de Courgette', amount: '1' },
      ],
      instructions: [
        'Étape 1: Inciser légèrement la peau.',
        'Étape 2: Poêler côté peau 4 minutes.',
        'Étape 3: Faire éclater les tomates avec les câpres.',
      ],
      chefTip: 'Inciser la peau évite au filet de se rétracter.',
    },
    recipe_edamame_tea_snack: {
      title: 'Edamame Vapeur à la Fleur de Sel & Amandes Grillées',
      category: 'snack',
      dietTags: ['Végétalien', 'Rapide'],
      ingredients: [
        { name: 'Gousses d\'Edamame', amount: '120g' },
        { name: 'Amandes brutes', amount: '15g' },
        { name: 'Fleur de Sel & Thé Vert', amount: 'selon goût' },
      ],
      instructions: [
        'Étape 1: Cuire l\'edamame 3 minutes à la vapeur.',
        'Étape 2: Parsemer de fleur de sel et servir avec thé chaud.',
      ],
      chefTip: 'Riche en magnésium et protéines végétales complètes.',
    },
    recipe_chamomile_bedtime_elixir: {
      title: 'Infusion de Camomille Bio et Graines de Courge',
      category: 'snack',
      dietTags: ['Végétarien', 'Sommeil'],
      ingredients: [
        { name: 'Fleurs de Camomille Bio', amount: '2 c. à café' },
        { name: 'Graines de Courge crues', amount: '15g' },
        { name: 'Chocolat Noir 85%', amount: '1 carré' },
      ],
      instructions: [
        'Étape 1: Infuser à 95°C couvert pendant 6 minutes.',
        'Étape 2: Déguster 45 minutes avant le coucher.',
      ],
      chefTip: 'Couvrir l\'infusion piège les composés aromatiques calmants.',
    },
  },

  // ===================== РУССКИЙ (RUSSIAN) =====================
  ru: {
    recipe_salmon_quinoa: {
      title: 'Пауэр-боул с глазированным диким лососем и киноа',
      category: 'supper',
      dietTags: ['Высокий белок', 'Омега-3', 'Без глютена', 'Рыба и морепродукты', 'Средиземноморская'],
      ingredients: [
        { name: 'Филе дикого атлантического лосося', amount: '150г' },
        { name: 'Трехцветное киноа', amount: '60г (~1 стакан готового)' },
        { name: 'Свежий авокадо Хасс дольками', amount: '1/2 шт. (70г)' },
        { name: 'Бобы эдамаме на пару', amount: '1/3 стакана (50г)' },
        { name: 'Оливковое масло первого отжима Extra Virgin', amount: '1 ст. л. (15мл)' },
        { name: 'Свежий лимонный сок и соус тамари', amount: 'по 1 ст. л.' },
        { name: 'Обжаренный кунжут', amount: '1 ч. л.' },
        { name: 'Свежая кинза и микрозелень', amount: 'Небольшая горсть' },
      ],
      instructions: [
        'Шаг 1: Подготовка и маринование — Обсушите филе лосося бумажным полотенцем. Посолите, поперчите, сбрызните лимонным соком и оливковым маслом. Оставьте на 8 минут.',
        'Шаг 2: Варка киноа — Промойте киноа, залейте 1 стаканом овощного бульона или воды, доведите до кипения, накройте крышкой и варите на слабом огне 15 минут.',
        'Шаг 3: Обжарка лосося — Разогрейте сковороду с 1 ч. л. масла. Выложите лосось кожей вниз и жарьте 4 минуты до хруста. Переверните, влейте 1 ст. л. соуса тамари и тушите еще 3–4 минуты.',
        'Шаг 4: Приготовление эдамаме — Отварите бобы на пару 2–3 минуты до яркого изумрудного цвета.',
        'Шаг 5: Заправка киноа — Снимите киноа с огня, дайте постоять 5 минут под крышкой, взрыхлите вилкой, добавьте оливковое масло и кинзу.',
        'Шаг 6: Подача боула — Выложите киноа в широкую тарелку, добавьте ломтики авокадо и эдамаме. По центру поместите теплое филе лосося, полейте соусом со сковороды и посыпьте кунжутом.',
      ],
      chefTip: 'Омега-3 жирные кислоты ускоряют восстановление мышц после нагрузок и улучшают метаболизм.',
    },
    recipe_greek_chicken_salad: {
      title: 'Средиземноморский салат с курицей на гриле',
      category: 'dinner',
      dietTags: ['Низкие углеводы', 'Средиземноморская', 'Высокий белок', 'Без глютена', 'Птица и мясо'],
      ingredients: [
        { name: 'Филе куриной грудки', amount: '150г' },
        { name: 'Листья романо и бэби-шпинат', amount: '3 стакана' },
        { name: 'Томаты черри половинками', amount: '1 стакан (150г)' },
        { name: 'Свежий огурец полукружиями', amount: '1/2 стакана' },
        { name: 'Традиционный греческий сыр фета', amount: '30г' },
        { name: 'Маслины Каламата без косточек', amount: '6 шт.' },
        { name: 'Оливковое масло и красный винный уксус', amount: 'по 1 ст. л.' },
        { name: 'Сушеный орегано, чеснок и цедра лимона', amount: 'по 1/2 ч. л.' },
      ],
      instructions: [
        'Шаг 1: Подготовка курицы — Слегка отбейте грудку до толщины 1,5 см. Натрите орегано, чесноком, цедрой, солью и оливковым маслом. Оставьте на 10 минут.',
        'Шаг 2: Жарка на гриле — Обжарьте на гриле или сковороде 5–6 минут до золотистых полосок, переверните и жарьте еще 4–5 минут до готовности (74°C внутри).',
        'Шаг 3: Отдых мяса — Переложите курицу на доску, прикройте фольгой и дайте отдохнуть 5 минут, чтобы сок остался внутри.',
        'Шаг 4: Подготовка зелени — Промойте и высушите листья салата, нарежьте огурцы и черри.',
        'Шаг 5: Заправка — Взбейте оливковое масло с винным уксусом, соком лимона и орегано.',
        'Шаг 6: Подача — Смешайте зелень с заправкой, нарежьте теплую курицу ломтиками, посыпьте кусочками феты и оливками.',
      ],
      chefTip: 'Отбивание грудки до одинаковой толщины сохраняет сочность и предотвращает пересушивание.',
    },
    recipe_power_berry_oatmeal: {
      title: 'Овсяная каша с лесными ягодами и семенами конопли',
      category: 'breakfast',
      dietTags: ['Вегетарианское', 'Энергетический завтрак', 'Богато клетчаткой'],
      ingredients: [
        { name: 'Цельнозерновые овсяные хлопья', amount: '50г' },
        { name: 'Миндальное молоко без сахара', amount: '240мл' },
        { name: 'Очищенные семена конопли', amount: '1 ст. л.' },
        { name: 'Свежая черника и малина', amount: '3/4 стакана' },
        { name: 'Цейлонская корица', amount: '1/2 ч. л.' },
      ],
      instructions: [
        'Шаг 1: Подогрев молока — Доведите миндальное молоко со щепоткой соли до кипения.',
        'Шаг 2: Варка хлопьев — Всыпьте овсянку и варите 5 минут на медленном огне.',
        'Шаг 3: Добавление пряностей — Вмешайте корицу и семена конопли.',
        'Шаг 4: Подача — Украсьте свежими лесными ягодами и миндальной пастой.',
      ],
      chefTip: 'Бета-глюканы овса мягко регулируют уровень сахара в крови.',
    },
    recipe_italian_pollo_limone: {
      title: 'Итальянское лимонное филе с кремовой полентой',
      category: 'dinner',
      dietTags: ['Итальянская', 'Высокий белок', 'Без глютена'],
      ingredients: [
        { name: 'Куриное филе эскалоп', amount: '160г' },
        { name: 'Кукурузная крупа (полента)', amount: '1/2 стакана' },
        { name: 'Тосканская капуста кейл', amount: '2 стакана' },
        { name: 'Лимонный сок, розмарин и чеснок', amount: 'по вкусу' },
      ],
      instructions: [
        'Шаг 1: Варка поленты — Варите кукурузную крупу в горячем бульоне 4 минуты до кремообразности.',
        'Шаг 2: Обжарка курицы — Обжарьте филе по 3 минуты с каждой стороны с розмарином.',
        'Шаг 3: Деглазирование — Влейте лимонный сок и выпарите ароматный соус за 1 минуту.',
        'Шаг 4: Подача — Подавайте курицу на подушке из нежной поленты и кейла.',
      ],
      chefTip: 'Натуральный лимонный сок размягчает мышечные волокна филе.',
    },
    recipe_japanese_teriyaki_salmon: {
      title: 'Токийское бенто с лососем в соусе терияки',
      category: 'supper',
      dietTags: ['Японская', 'Омега-3', 'Высокий белок'],
      ingredients: [
        { name: 'Свежее филе лосося с кожей', amount: '160г' },
        { name: 'Бурый рис на пару', amount: '3/4 стакана' },
        { name: 'Соцветия брокколи', amount: '1.5 стакана' },
        { name: 'Соус тамари, мирин и имбирь', amount: 'по 1 ст. л.' },
      ],
      instructions: [
        'Шаг 1: Соус терияки — Смешайте тамари, мирин и свежий тертый имбирь.',
        'Шаг 2: Обжарка лосося — Обжарьте кожей вниз 3.5 минуты до хруста, затем переверните.',
        'Шаг 3: Глазирование — Влейте соус и поливайте рыбу 60 секунд до карамелизации.',
        'Шаг 4: Подача бенто — Подавайте с бурым рисом и хрустящей брокколи.',
      ],
      chefTip: 'Свежий имбирь активирует пищеварительные ферменты перед сном.',
    },
    recipe_greek_yogurt_parfait: {
      title: 'Боул из греческого йогурта с лесными ягодами и орехами',
      category: 'breakfast',
      dietTags: ['Вегетарианское', 'Высокий белок'],
      ingredients: [
        { name: 'Греческий йогурт 0%', amount: '220г' },
        { name: 'Дикая черника', amount: '3/4 стакана' },
        { name: 'Грецкие орехи и семена чиа', amount: '15г + 1 ст. л.' },
      ],
      instructions: [
        'Шаг 1: Выложите йогурт в глубокую чашу.',
        'Шаг 2: Добавьте чернику, измельченные грецкие орехи и семена чиа.',
        'Шаг 3: Посыпьте ароматной цейлонской корицей.',
      ],
      chefTip: 'Густой греческий йогурт содержит в два раза больше белка казеина.',
    },
    recipe_avocado_egg_toast: {
      title: 'Тост на закваске с авокадо и яйцом пашот',
      category: 'breakfast',
      dietTags: ['Вегетарианское', 'Полезные жиры'],
      ingredients: [
        { name: 'Фермерское яйцо', amount: '1 крупное' },
        { name: 'Хлеб на закваске', amount: '1 ломоть' },
        { name: 'Авокадо Хасс', amount: '1/2 шт.' },
      ],
      instructions: [
        'Шаг 1: Подрумяньте ломтик хлеба в тостере.',
        'Шаг 2: Разомните авокадо с соком лимона и солью.',
        'Шаг 3: Сварите яйцо пашот 3 минуты в горячей воде.',
        'Шаг 4: Обсушите яйцо салфеткой и выложите на тост.',
      ],
      chefTip: 'Обсушивание яйца салфеткой сохраняет хруст тоста.',
    },
    recipe_vegan_falafel_bowl: {
      title: 'Веганский мезе-боул с запеченным фалафелем и киноа',
      category: 'dinner',
      dietTags: ['Веганское', 'Растительный белок'],
      ingredients: [
        { name: 'Запеченный фалафель', amount: '4 шт.' },
        { name: 'Готовое киноа', amount: '3/4 стакана' },
        { name: 'Запеченные баклажаны', amount: '1 стакан' },
        { name: 'Соус тахини с лимоном', amount: '2 ст. л.' },
      ],
      instructions: [
        'Шаг 1: Запеките фалафель и баклажаны при 200°C 15 минут.',
        'Шаг 2: Взбейте тахини с лимонным соком и теплой водой.',
        'Шаг 3: Соберите боул и полейте кунжутным соусом.',
      ],
      chefTip: 'Нут и киноа дают полный набор незаменимых аминокислот.',
    },
    recipe_sirloin_asparagus: {
      title: 'Стейк из нежирного сирлойна со спаржей и молодым картофелем',
      category: 'supper',
      dietTags: ['Высокий белок', 'Богато железом'],
      ingredients: [
        { name: 'Стейк сирлойн травяного откорма', amount: '170г' },
        { name: 'Зеленая спаржа', amount: '10 стеблей' },
        { name: 'Картофель бэби', amount: '3 шт.' },
      ],
      instructions: [
        'Шаг 1: Дайте стейку согреться до комнатной температуры 20 минут.',
        'Шаг 2: Запеките картофель и спаржу при 200°C.',
        'Шаг 3: Обжарьте стейк на раскаленной сковороде по 3.5 мин с каждой стороны.',
        'Шаг 4: Дайте отдохнуть 5 минут перед нарезкой.',
      ],
      chefTip: 'Отдых стейка удерживает сок внутри волокон.',
    },
    recipe_thai_poached_shrimp: {
      title: 'Тигровые креветки в кокосово-лаймовом бульоне по-бангкокски',
      category: 'supper',
      dietTags: ['Морепродукты', 'Тайская кухня'],
      ingredients: [
        { name: 'Тигровые креветки', amount: '180г' },
        { name: 'Легкое кокосовое молоко', amount: '120мл' },
        { name: 'Лемонграсс и стручковый горошек', amount: '1 стебель + 1 стакан' },
      ],
      instructions: [
        'Шаг 1: Проварите лемонграсс в кокосовом молоке 6 минут.',
        'Шаг 2: Добавьте овощи и варите 2 минуты.',
        'Шаг 3: Опустите креветки и готовьте на слабом огне 3–4 минуты.',
      ],
      chefTip: 'Медленное томление сохраняет нежность морепродуктов.',
    },
    recipe_seared_sea_bass: {
      title: 'Обжаренный сибас с каперсами и томатами черри',
      category: 'supper',
      dietTags: ['Рыба', 'Средиземноморская'],
      ingredients: [
        { name: 'Филе сибаса с кожей', amount: '170g' },
        { name: 'Черри и каперсы', amount: '1 стакан + 1 ст. л.' },
        { name: 'Ленты цукини', amount: '1 шт.' },
      ],
      instructions: [
        'Шаг 1: Надрежьте кожу рыбы, чтобы она не скручивалась.',
        'Шаг 2: Обжарьте кожей вниз 4 минуты, прижимая лопаткой.',
        'Шаг 3: Прогрейте томаты с каперсами и полейте рыбу.',
      ],
      chefTip: 'Прижимание рыбы первые 15 секунд дает хрустящую корочку.',
    },
    recipe_edamame_tea_snack: {
      title: 'Эдамаме на пару с морской солью и миндалем',
      category: 'snack',
      dietTags: ['Веганское', 'Быстро и полезно'],
      ingredients: [
        { name: 'Стручки эдамаме', amount: '120г' },
        { name: 'Цельный миндаль', amount: '15г' },
        { name: 'Морская соль и зеленый чай', amount: 'по вкусу' },
      ],
      instructions: [
        'Шаг 1: Приготовьте стручки на пару 3–4 минуты.',
        'Шаг 2: Посыпьте хлопьями морской соли и подавайте с миндалем.',
      ],
      chefTip: 'Отличный источник магния и растительного белка.',
    },
    recipe_chamomile_bedtime_elixir: {
      title: 'Органический ромашковый чай с семенами тыквы и темным какао',
      category: 'snack',
      dietTags: ['Вегетарианское', 'Для глубокого сна'],
      ingredients: [
        { name: 'Цветки органической ромашки', amount: '2 ч. л.' },
        { name: 'Тыквенные семечки', amount: '15г' },
        { name: 'Горький шоколад 85%', amount: '1 долька' },
      ],
      instructions: [
        'Шаг 1: Залейте ромашку водой 95°C и накройте блюдцем на 6 минут.',
        'Шаг 2: Медленно выпейте за 45 минут до сна с семечками.',
      ],
      chefTip: 'Крышка сохраняет успокаивающие эфирные масла.',
    },
  },

  // ===================== ARABIC (العربية) =====================
  ar: {
    recipe_salmon_quinoa: {
      title: 'وعاء الطاقة مع السلمون المشوي والكينوا',
      category: 'supper',
      dietTags: ['غني بالبروتين', 'أوميغا 3', 'خالٍ من الغلوتين', 'مأكولات بحرية', 'متوسطي'],
      ingredients: [
        { name: 'شريحة سمك سلمون أطلسي بري', amount: '150 غرام' },
        { name: 'كينوا ثلاثية الألوان', amount: '60 غرام (~1 كوب مطبوخ)' },
        { name: 'أفوكادو هاس شرائح', amount: '1/2 حبة (70 غرام)' },
        { name: 'فول إدامامي مطهو بالبخار', amount: '1/3 كوب (50 غرام)' },
        { name: 'زيت زيتون بكر ممتاز معصور على البارد', amount: '1 ملعقة كبيرة (15 مل)' },
        { name: 'عصير ليمون طازج وصلصة تاماري', amount: '1 ملعقة كبيرة من كل منهما' },
        { name: 'بذور سمسم محمصة', amount: '1 ملعقة صغيرة' },
        { name: 'كزبرة طازجة وخضار صغيرة', amount: 'حفنة صغيرة' },
      ],
      instructions: [
        'الخطوة 1: التحضير والتتبيل — جفف شريحة السلمون جيداً بمناديل ورقية للحصول على قشرة مقرمشة. تبّل بالملح البحري والفلفل الأسود وزيت الزيتون وعصير الليمون، واتركه يرتاح 8 دقائق.',
        'الخطوة 2: طهي الكينوا — اغسل الكينوا في مصفاة، وضعها في قدر مع كوب من مرق الخضار. دعها تغلي ثم غطها واطبخها على نار هادئة لمدة 15 دقيقة.',
        'الخطوة 3: طهي السلمون — سخن مقلاة مع ملعقة صغيرة زيت، ضع السلمون على جهة الجلد لـ 4 دقائق دون تحريك، ثم اقلبه وأضف صلصة التاماري واطبخه 3 إلى 4 دقائق إضافية.',
        'الخطوة 4: تبخير الخضار — اطبخ الإدامامي على البخار لمدة 2 إلى 3 دقائق حتى يصبح أخضر يانعاً.',
        'الخطوة 5: ترتيب الوعاء — ضع الكينوا في وعاء عريض، ورتب الأفوكادو والإدامامي والسلمون المشوي، واسكب عصارة المقلاة ورش بذور السمسم.',
      ],
      chefTip: 'أحماض أوميغا 3 تقلل الالتهابات العضلية وتحسن حساسية الأنسولين أثناء النوم.',
    },
    recipe_greek_chicken_salad: {
      title: 'سلطة الدجاج المشوي بالأعشاب المتوسطية',
      category: 'dinner',
      dietTags: ['قليل الكربوهيدرات', 'متوسطي', 'غني بالبروتين', 'خالٍ من الغلوتين'],
      ingredients: [
        { name: 'صدر دجاج منزوع الجلد', amount: '150 غرام' },
        { name: 'خس روماني وسبانخ صغيرة', amount: '3 أكواب' },
        { name: 'طماطم كرزية مقطعة نصفين', amount: '1 كوب (150 غرام)' },
        { name: 'خيار مقطع شرائح', amount: '1/2 كوب' },
        { name: 'جبن فيتا يوناني أصلي', amount: '30 غرام' },
        { name: 'زيتون كالاماتا', amount: '6 حبات' },
        { name: 'زيت زيتون بكر وخل أحمر', amount: '1 ملعقة كبيرة من كل منهما' },
      ],
      instructions: [
        'الخطوة 1: تتبيل الدجاج — افرد صدر الدجاج بالتساوي وتبله بالأوريغانو والثوم والليمون وزيت الزيتون لمدة 10 دقائق.',
        'الخطوة 2: الشواء — اشوِ الدجاج 5 إلى 6 دقائق لكل جانب حتى ينضج تماماً وتظهر علامات الشواء.',
        'الخطوة 3: الراحة — اترك الدجاج يرتاح 5 دقائق مغطى ليحتفظ بعصارته الطرية.',
        'الخطوة 4: التقديم — اخلط الخضار مع التتبيلة، ثم قطع الدجاج لشرائح وزينه بجبن الفيتا والزيتون.',
      ],
      chefTip: 'ترك الدجاج ليرتاح 5 دقائق يمنع تسرب العصارة ويحافظ على طراوته.',
    },
    recipe_power_berry_oatmeal: {
      title: 'شوفان مقطع مع التوت البري وبذور القنب',
      category: 'breakfast',
      dietTags: ['نباتي', 'فطور طاقة', 'غني بالألياف'],
      ingredients: [
        { name: 'شوفان حبوب كاملة', amount: '50 غرام' },
        { name: 'حليب لوز غير محلى', amount: '240 مل' },
        { name: 'بذور قنب مقشورة', amount: '1 ملعقة كبيرة' },
        { name: 'توت بري وفراولة طازجة', amount: '3/4 كوب' },
        { name: 'قرفة سيلانية', amount: '1/2 ملعقة صغيرة' },
      ],
      instructions: [
        'الخطوة 1: تسخين الحليب — اغلي حليب اللوز مع رشة ملح.',
        'الخطوة 2: طهي الشوفان — حرك الشوفان لمدة 5 دقائق حتى يصبح قواماً كريمياً.',
        'الخطوة 3: التقديم — أضف التوت الطازج وبذور القنب والقرفة.',
      ],
      chefTip: 'ألياف البيتا جلوكان تنظم مستوى السكر بالدم وتمنح طاقة مستقرة.',
    },
    recipe_italian_pollo_limone: {
      title: 'دجاج بالليمون على الطريقة الإيطالية مع البولينتا',
      category: 'dinner',
      dietTags: ['إيطالي', 'غني بالبروتين'],
      ingredients: [
        { name: 'شرائح صدور دجاج', amount: '160 غرام' },
        { name: 'بولينتا ذرة ناعمة', amount: '1/2 كوب' },
        { name: 'كرنب توسكاني (كيل)', amount: '2 كوب' },
        { name: 'عصير ليمون وثوم وإكليل الجبل', amount: 'حسب الرغبة' },
      ],
      instructions: [
        'الخطوة 1: طهي البولينتا — اطبخها 4 دقائق مع المرق حتى تصبح ناعمة.',
        'الخطوة 2: تحمير الدجاج — اطهِ الدجاج 3 دقائق لكل جهة.',
        'الخطوة 3: التتبيل بالليمون — أضف عصير الليمون واطهِ دقيقة حتى يثخن الصوص.',
      ],
      chefTip: 'عصير الليمون يطري لحم الدجاج ويعزز امتصاص الحديد.',
    },
    recipe_japanese_teriyaki_salmon: {
      title: 'بينتو السلمون المشوي بصلصة الترياكي',
      category: 'supper',
      dietTags: ['ياباني', 'أوميغا 3', 'غني بالبروتين'],
      ingredients: [
        { name: 'شريحة سلمون مع الجلد', amount: '160 غرام' },
        { name: 'أرز بني مطهو بالبخار', amount: '3/4 كوب' },
        { name: 'بروكلي طازج', amount: '1.5 كوب' },
        { name: 'صلصة تاماري، ميرين، زنجبيل', amount: '1 ملعقة كبيرة' },
      ],
      instructions: [
        'الخطوة 1: تجهيز السلمون — اقلِ جهة الجلد 3.5 دقيقة لتصبح مقرمشة.',
        'الخطوة 2: الكرملة — صب صوص الترياكي وقلّب السلمون لمدة دقيقة.',
        'الخطوة 3: التقديم — قدمه مع الأرز البني والبروكلي والسمسم.',
      ],
      chefTip: 'الزنجبيل يحفز الإنزيمات الهاضمة ويسهل الهضم ليلاً.',
    },
    recipe_greek_yogurt_parfait: {
      title: 'زبادي يوناني مع التوت البري والجوز',
      category: 'breakfast',
      dietTags: ['نباتي', 'بروتين عالي'],
      ingredients: [
        { name: 'زبادي يوناني 0%', amount: '220 غرام' },
        { name: 'توت بري طازج', amount: '3/4 كوب' },
        { name: 'جوز وبذور شيا', amount: '15 غرام + 1 ملعقة' },
      ],
      instructions: [
        'الخطوة 1: ضع الزبادي في وعاء التقديم.',
        'الخطوة 2: زين بالتوت والجوز وبذور الشيا ورشة قرفة.',
      ],
      chefTip: 'يوفر بروتين الكازين بطيء الامتصاص للشبع الطويل.',
    },
    recipe_avocado_egg_toast: {
      title: 'توست الأفوكادو على خبز الخميرة مع بيض مسلوق',
      category: 'breakfast',
      dietTags: ['نباتي', 'دهون صحية'],
      ingredients: [
        { name: 'بيضة طازجة', amount: '1 حبة كبيرة' },
        { name: 'شريحة خبز خميرة طبيعية', amount: '1 شريحة' },
        { name: 'أفوكادو هاس مهروس', amount: '1/2 حبة' },
      ],
      instructions: [
        'الخطوة 1: حمص الخبز حتى يصبح مقرمشاً.',
        'الخطوة 2: اهرس الأفوكادو مع الليمون والملح وضعها على التوست.',
        'الخطوة 3: اسلق البيضة 3 دقائق وضعها فوق التوست.',
      ],
      chefTip: 'تجفيف البيضة على منديل يحافظ على قرمشة التوست.',
    },
    recipe_vegan_falafel_bowl: {
      title: 'وعاء مزة نباتي مع الفلافل المشوية والكينوا',
      category: 'dinner',
      dietTags: ['نباتي تماماً', 'بروتين نباتي'],
      ingredients: [
        { name: 'فلافل حمص مشوية بالفرن', amount: '4 حبات' },
        { name: 'كينوا مطبوخة', amount: '3/4 كوب' },
        { name: 'باذنجان مشوي', amount: '1 كوب' },
        { name: 'صلصة طحينة بالليمون', amount: '2 ملعقة كبيرة' },
      ],
      instructions: [
        'الخطوة 1: اشوِ الفلافل والباذنجان بالفرن لـ 15 دقيقة.',
        'الخطوة 2: اخفق الطحينة مع الليمون والماء الدافئ.',
        'الخطوة 3: رتب المكونات في الوعاء واسكب صوص الطحينة.',
      ],
      chefTip: 'الحمص والكينوا يوفران جميع الأحماض الأمينية الأساسية.',
    },
    recipe_sirloin_asparagus: {
      title: 'ستيك سيرلوين بقري خفيف مع الهليون والبطاطا',
      category: 'supper',
      dietTags: ['غني بالبروتين', 'غني بالحديد'],
      ingredients: [
        { name: 'شريحة ستيك سيرلوين خالية من الدهون', amount: '170 غرام' },
        { name: 'هليون أخضر طازج', amount: '10 حبات' },
        { name: 'بطاطا صغيرة', amount: '3 حبات' },
      ],
      instructions: [
        'الخطوة 1: اترك اللحم يكتسب حرارة الغرفة 20 دقيقة قبل الطهي.',
        'الخطوة 2: اشوِ البطاطا والهليون بالفرن على 200 درجة مئوية.',
        'الخطوة 3: اطهِ الستيك على مقلاة ساخنة جداً لـ 3.5 دقيقة لكل وجه.',
        'الخطوة 4: دعه يرتاح 5 دقائق قبل التقطيع.',
      ],
      chefTip: 'راحة اللحم تحافظ على العصارة وتجعله طرياً وسهل المضغ.',
    },
    recipe_thai_poached_shrimp: {
      title: 'روبيان تايلاندي مسلوق بحليب جوز الهند والليمون',
      category: 'supper',
      dietTags: ['مأكولات بحرية', 'تايلاندي'],
      ingredients: [
        { name: 'روبيان نمر مقشر', amount: '180 غرام' },
        { name: 'حليب جوز هند خفيف', amount: '120 مل' },
        { name: 'عشبة الليمون وبازلاء سكرية', amount: 'حسب الرغبة' },
      ],
      instructions: [
        'الخطوة 1: اغلِ عشبة الليمون مع حليب جوز الهند 6 دقائق.',
        'الخطوة 2: أضف الروبيان واطهه بهدوء لـ 3 دقائق حتى يصبح وردياً.',
      ],
      chefTip: 'الطهي الهادئ يحافظ على طراوة الروبيان ويمنع قسوته.',
    },
    recipe_seared_sea_bass: {
      title: 'سمك القاروص المقلي مع الكبر والطماطم الكرزية',
      category: 'supper',
      dietTags: ['مأكولات بحرية', 'متوسطي'],
      ingredients: [
        { name: 'شريحة سمك قاروص مع الجلد', amount: '170 غرام' },
        { name: 'طماطم كرزية وكبر', amount: '1 كوب + 1 ملعقة' },
        { name: 'شرائح كوسة رقيقة', amount: '1 حبة' },
      ],
      instructions: [
        'الخطوة 1: اقطع خطوطاً خفيفة في الجلد لمنع انكماشه.',
        'الخطوة 2: اطهِ جهة الجلد 4 دقائق مع الضغط الخفيف في البداية.',
        'الخطوة 3: قلب الطماطم والكبر واسكب الصوص فوق السمك.',
      ],
      chefTip: 'الضغط الخفيف في البداية يضمن قشرة سمك مقرمشة للغاية.',
    },
    recipe_edamame_tea_snack: {
      title: 'إدامامي مطهو على البخار مع ملح البحر واللوز',
      category: 'snack',
      dietTags: ['نباتي', 'سريع وخفيف'],
      ingredients: [
        { name: 'قرون إدامامي كاملة', amount: '120 غرام' },
        { name: 'لوز نيء', amount: '15 غرام' },
        { name: 'ملح بحري وشاي أخضر', amount: 'حسب الذوق' },
      ],
      instructions: [
        'الخطوة 1: اطبخ الإدامامي على البخار لـ 3 دقائق.',
        'الخطوة 2: رش الملح وقدمه ساخناً مع حبات اللوز والشاي الأخضر.',
      ],
      chefTip: 'سناك غني بالماغنيسيوم والبروتين النباتي الخفيف.',
    },
    recipe_chamomile_bedtime_elixir: {
      title: 'شاي البابونج العضوي مع بذور اليقطين الغنية بالماغنيسيوم',
      category: 'snack',
      dietTags: ['نباتي', 'داعم للنوم'],
      ingredients: [
        { name: 'زهور بابونج عضوية', amount: '2 ملعقة صغيرة' },
        { name: 'بذور يقطين نيئة', amount: '15 غرام' },
        { name: 'شوكولاتة داكنة 85%', amount: 'مربع واحد' },
      ],
      instructions: [
        'الخطوة 1: انقع البابونج في ماء ساخن مغطى لـ 6 دقائق.',
        'الخطوة 2: تناوله بهدوء قبل النوم بـ 45 دقيقة.',
      ],
      chefTip: 'تغطية الكوب تمنع تطاير الزيوت العطرية المهدئة للأعصاب.',
    },
  },

  // ===================== 日本語 (JAPANESE) =====================
  ja: {
    recipe_salmon_quinoa: {
      title: 'サーモンの照り焼き＆キヌアのパワーボウル',
      category: 'supper',
      dietTags: ['高タンパク', 'オメガ3豊富', 'グルテンフリー', '魚介類', '地中海風'],
      ingredients: [
        { name: '天然アトランティックサーモン切り身', amount: '150g' },
        { name: '3色キヌア（炊き上がり）', amount: '60g（約1膳分）' },
        { name: '完熟アボカドスライス', amount: '1/2個（70g）' },
        { name: '蒸し枝豆（むき身）', amount: '1/3カップ（50g）' },
        { name: 'コールドプレス エキストラバージンオリーブオイル', amount: '大さじ1（15ml）' },
        { name: '生絞りレモン汁＆グルテンフリーたまり醤油', amount: '各大さじ1' },
        { name: '香ばしい白ごま＆黒ごま', amount: '小さじ1' },
        { name: 'フレッシュパクチー＆マイクログリーン', amount: '適量' },
      ],
      instructions: [
        'ステップ1: 下ごしらえと下味 — サーモン表面の水分をキッチンペーパーで拭き取ります。海塩、黒胡椒、オリーブオイル少々、レモン汁で下味をつけ、8分間なじませます。',
        'ステップ2: キヌアを炊く — キヌアを目の細かいザルで洗い、野菜だしまたは水1カップで沸騰させ、フタをして弱火で15分間蒸らし煮します。',
        'ステップ3: サーモンを香ばしく焼く — フライパンを中火で熱し、サーモンを皮目から入れて4分間動かさずにパリッと焼き上げます。裏返して弱火にし、たまり醤油タレを回しかけて3〜4分しっとり火を通します。',
        'ステップ4: 野菜をスチーム — むき枝豆を少量の水で2〜3分スチーム加熱し、鮮やかなエメラルドグリーンに仕上げます。',
        'ステップ5: キヌアをほぐす — キヌアのフタを取り、フォークで軽くほぐしてオリーブオイル、レモン汁、刻んだハーブを混ぜ合わせます。',
        'ステップ6: ボウルに盛り付け — 温かいキヌアを器に敷き、アボカド、枝豆、照り焼きサーモンを美しく配置。フライパンに残った旨味タレを回しかけ、炒りごまを散らします。',
      ],
      chefTip: 'オメガ3脂肪酸（EPA・DHA）が運動後の筋肉炎症を鎮め、夜間の細胞修復を促進します。',
    },
    recipe_greek_chicken_salad: {
      title: '地中海ハーブグリルチキンのフレッシュサラダ',
      category: 'dinner',
      dietTags: ['低糖質', '地中海風', '高タンパク', 'グルテンフリー', '肉類・鶏肉'],
      ingredients: [
        { name: '皮なし鶏むね肉', amount: '150g' },
        { name: 'ロメインレタス＆ベビーほうれん草', amount: '3カップ' },
        { name: 'チェリートマト（半分カット）', amount: '1カップ（150g）' },
        { name: 'きゅうり（半月切り）', amount: '1/2カップ' },
        { name: '本場ギリシャ産フェタチーズ', amount: '30g' },
        { name: 'カラマタオリーブ', amount: '6粒' },
        { name: 'エキストラバージンオリーブオイル＆赤ワインビネガー', amount: '各大さじ1' },
      ],
      instructions: [
        'ステップ1: チキンを均一に叩く — 鶏むね肉を均等な厚さ（約1.5cm）にならし、オレガノ、ガーリック、レモンピール、オリーブオイルで10分マリネします。',
        'ステップ2: 香ばしくグリル — グリルパンで片面5〜6分焼き、きれいな焼き色がついたら裏返して4〜5分中心温度が74℃になるまでふっくら焼き上げます。',
        'ステップ3: 肉汁を落ち着かせる — まな板に移してアルミホイルをふんわりかけ、5分間休ませて肉汁を閉じ込めます。',
        'ステップ4: 野菜を冷水で締める — レタスとほうれん草を冷水でシャキッとさせ、水気をしっかり切ってトマト・きゅうりと合わせます。',
        'ステップ5: ドレッシングを作る — オリーブオイル、赤ワインビネガー、レモン汁、オレガノをしっかり乳化させます。',
        'ステップ6: 盛り付け — ドレッシングで和えた野菜にスライスしたグリルチキンをのせ、フェタチーズとオリーブをトッピングします。',
      ],
      chefTip: '肉の厚みを均一に揃えてから焼くことで、パサつきを防ぎ驚くほどジューシーに仕上がります。',
    },
    recipe_power_berry_oatmeal: {
      title: 'ベリーとヘンプシードのオートミールボウル',
      category: 'breakfast',
      dietTags: ['ベジタリアン', 'モーニング活力', '食物繊維豊富'],
      ingredients: [
        { name: '全粒ロールドオーツ（オートミール）', amount: '50g' },
        { name: '無糖アーモンドミルク', amount: '240ml' },
        { name: '有機ヘンプシード', amount: '大さじ1' },
        { name: '完熟ブルーベリー＆ラズベリー', amount: '3/4カップ' },
        { name: 'セイロンシナモンパウダー', amount: '小さじ1/2' },
      ],
      instructions: [
        'ステップ1: ミルクを温める — 小鍋でアーモンドミルクを温めます。',
        'ステップ2: 弱火で煮る — オートミールを加え、弱火で5分間とろみがつくまで優しく混ぜます。',
        'ステップ3: 風味付け — セイロンシナモンとヘンプシードを混ぜ合わせます。',
        'ステップ4: トッピング — ボウルに移し、新鮮なベリーとアーモンドバターを添えて完成です。',
      ],
      chefTip: 'オーツ麦のβグルカンが糖の吸収を緩やかにし、午前中の集中力を保ちます。',
    },
    recipe_italian_pollo_limone: {
      title: 'イタリア風レモンチキンとクリーミーポレンタ',
      category: 'dinner',
      dietTags: ['イタリアン', '高タンパク', 'グルテンフリー'],
      ingredients: [
        { name: '鶏むね肉の薄切りエスカロップ', amount: '160g' },
        { name: '黄色いコーンポレンタ', amount: '1/2カップ' },
        { name: 'トスカーナケール（カーボロネロ）', amount: '2カップ' },
        { name: '生絞りレモン汁＆ローズマリー', amount: '大さじ2＋1枝' },
      ],
      instructions: [
        'ステップ1: ポレンタを煮る — 温かい野菜ブイヨンにポレンタを加え、4分間木べらで練り上げます。',
        'ステップ2: チキンをソテー — オリーブオイルでチキンを両面3分ずつ黄金色に焼き上げます。',
        'ステップ3: レモン果汁でデグラセ — レモン汁を一気に注ぎ、フライパンの旨味をこそぎ落としながら煮詰めます。',
        'ステップ4: ケールを炒める — チキンを取り出し、残りのオイルでケールをしんなりするまで炒めます。',
        'ステップ5: 盛り付け — 温かいポレンタにケールとチキンをのせ、レモンソースをたっぷり回しかけます。',
      ],
      chefTip: 'レモンのクエン酸が鶏肉の繊維をやわらげ、鉄分の吸収率を高めます。',
    },
    recipe_japanese_teriyaki_salmon: {
      title: '東京風照り焼きサーモン玄米弁当',
      category: 'supper',
      dietTags: ['和食', 'オメガ3豊富', '高タンパク'],
      ingredients: [
        { name: '皮付き生サーモン切り身', amount: '160g' },
        { name: '炊き立て玄米ご飯', amount: '3/4膳' },
        { name: 'ブロッコリー', amount: '1.5株' },
        { name: '減塩たまり醤油、みりん、おろし生姜', amount: '各大さじ1' },
      ],
      instructions: [
        'ステップ1: 照り焼きタレを作る — たまり醤油、みりん、生姜、酒を合わせます。',
        'ステップ2: 皮目をカリッと焼く — フライパンで皮目を3.5分こんがり焼き、裏返します。',
        'ステップ3: タレを絡める — タレを回し入れ、泡立って照りが出るまでサーモンにスプーンで回しかけます。',
        'ステップ4: ブロッコリーを蒸す — 3分蒸して鮮やかな緑と歯ごたえを残します。',
        'ステップ5: お弁当仕立て — 玄米ご飯、ブロッコリー、照り焼きサーモンを並べ、白ごまを振ります。',
      ],
      chefTip: '生姜に含まれるジンゲロールが胃腸を温め、消化を助けます。',
    },
    recipe_greek_yogurt_parfait: {
      title: '濃厚ギリシャヨーグルトとベリーのパワーボウル',
      category: 'breakfast',
      dietTags: ['ベジタリアン', '高タンパク', 'カルシウム豊富'],
      ingredients: [
        { name: '本場プレーン水切りギリシャヨーグルト', amount: '220g' },
        { name: '摘みたてワイルドブルーベリー', amount: '3/4カップ' },
        { name: '生くるみ＆チアシード', amount: '15g＋大さじ1' },
      ],
      instructions: [
        'ステップ1: ヨーグルトを器へ — 冷たいギリシャヨーグルトを器に盛ります。',
        'ステップ2: トッピング — チアシード、砕いたくるみ、ブルーベリーを散らします。',
        'ステップ3: シナモン — セイロンシナモンを軽く振って完成です。',
      ],
      chefTip: '水切り製法により通常の2倍以上の濃縮カゼインプロテインを含みます。',
    },
    recipe_avocado_egg_toast: {
      title: 'アボカドとポーチドエッグの天然酵母トースト',
      category: 'breakfast',
      dietTags: ['ベジタリアン', '良質な脂質'],
      ingredients: [
        { name: '新鮮な放し飼い卵', amount: '1個' },
        { name: 'サワードウ（天然酵母パン）', amount: '厚切り1枚' },
        { name: '完熟アボカド', amount: '1/2個' },
      ],
      instructions: [
        'ステップ1: トーストをカリッと焼く — 表面を香ばしくトーストします。',
        'ステップ2: アボカドをマッシュ — レモン汁と海塩で軽く潰します。',
        'ステップ3: ポーチドエッグを作る — 酢を入れた微沸騰のお湯で3分間茹でます。',
        'ステップ4: 水気を切ってのせる — ペーパーで水気を吸わせてトーストにのせます。',
      ],
      chefTip: 'ポーチドエッグの水気をしっかり切ることで、パンのサクサク感が保たれます。',
    },
    recipe_vegan_falafel_bowl: {
      title: '焼きハーブファラフェルと温かいキヌアのメッゼボウル',
      category: 'dinner',
      dietTags: ['ヴィーガン', '植物性タンパク質'],
      ingredients: [
        { name: '自家製ひよこ豆ファラフェル', amount: '4個' },
        { name: '温かいキヌア', amount: '3/4カップ' },
        { name: 'ロースト米ナス', amount: '1カップ' },
        { name: '白ごまタヒニソース', amount: '大さじ2' },
      ],
      instructions: [
        'ステップ1: オーブンで焼く — 200℃で15分間、外カリ中フワに焼き上げます。',
        'ステップ2: タヒニソースを練る — タヒニをぬるま湯とレモン汁でクリーミーにのばします。',
        'ステップ3: 盛り付け — ルッコラ、キヌア、ナス、ファラフェルを彩りよく盛り、タヒニをかけます。',
      ],
      chefTip: 'ひよこ豆とキヌアの組み合わせで、必須アミノ酸が完全に揃います。',
    },
    recipe_sirloin_asparagus: {
      title: '赤身サーロインステーキとアスパラガスのグリル',
      category: 'supper',
      dietTags: ['高タンパク', '鉄分豊富'],
      ingredients: [
        { name: '牧草牛（グラスフェッド）サーロイン', amount: '170g' },
        { name: 'グリーンアスパラガス', amount: '10本' },
        { name: '新じゃが', amount: '小3個' },
      ],
      instructions: [
        'ステップ1: 常温に戻す — 焼く20分前に冷蔵庫から出しておきます。',
        'ステップ2: 野菜をロースト — 200℃のオーブンで野菜を香ばしく焼きます。',
        'ステップ3: 強火で焼き付ける — 鉄フライパンで両面3.5分ずつミディアムレアに焼きます。',
        'ステップ4: 必ず5分休ませる — アルミホイルをかけ、肉汁を行き渡らせます。',
      ],
      chefTip: '焼き上がり後に5分休ませることで、切った時に肉汁が逃げず極上の柔らかさになります。',
    },
    recipe_thai_poached_shrimp: {
      title: 'バンコク風エビのココナッツライムポシェ',
      category: 'supper',
      dietTags: ['シーフード', 'タイ料理'],
      ingredients: [
        { name: 'ブラックタイガーエビ', amount: '180g' },
        { name: 'ライトココナッツミルク', amount: '120ml' },
        { name: 'レモングラス＆スナップえんどう', amount: '1本＋1カップ' },
      ],
      instructions: [
        'ステップ1: スープを煮出す — ココナッツミルクとレモングラスを6分弱火で煮出します。',
        'ステップ2: エビを優しく火入れ — 沸騰させずに3〜4分、プリッとするまでポシェします。',
      ],
      chefTip: '沸騰させずに静かに火を通すことで、エビが固くならずプリプリに仕上がります。',
    },
    recipe_seared_sea_bass: {
      title: 'スズキの香ばしいソテーとケッパー＆チェリートマト',
      category: 'supper',
      dietTags: ['白身魚', '地中海風'],
      ingredients: [
        { name: '天然スズキの切り身（皮付き）', amount: '170g' },
        { name: 'ミニトマト＆ケッパー', amount: '1カップ＋大さじ1' },
        { name: 'ズッキーニリボン', amount: '1本分' },
      ],
      instructions: [
        'ステップ1: 皮に切れ目を入れる — 反り返りを防ぐため浅く切り目を入れます。',
        'ステップ2: 皮目をパリッと焼く — 最初15秒ヘラで押さえ、4分間しっかり焼き付けます。',
        'ステップ3: トマトをソテー — ケッパーとトマトをさっと炒めて魚に添えます。',
      ],
      chefTip: '皮目に浅い切り目を入れ、焼き始めに軽く押さえることで極上のパリパリ皮になります。',
    },
    recipe_edamame_tea_snack: {
      title: '蒸し立て枝豆の天然塩添え＆香ばしいアーモンド',
      category: 'snack',
      dietTags: ['ヴィーガン', '簡単スナック'],
      ingredients: [
        { name: 'サヤ付き枝豆', amount: '120g' },
        { name: '無塩アーモンド', amount: '15g' },
        { name: '天然海塩＆緑茶', amount: '適量' },
      ],
      instructions: [
        'ステップ1: 枝豆を3分蒸す — 鮮やかな緑色に蒸し上げます。',
        'ステップ2: 塩を振る — 熱々のうちに海塩をまぶし、アーモンドと温かいお茶と一緒にどうぞ。',
      ],
      chefTip: '手軽にマグネシウムと良質な植物性タンパク質を補給できます。',
    },
    recipe_chamomile_bedtime_elixir: {
      title: '有機カモミールティーとマグネシウム豊富なパンプキンシード',
      category: 'snack',
      dietTags: ['ベジタリアン', '快眠サポート'],
      ingredients: [
        { name: '有機カモミールハーブ', amount: '小さじ2' },
        { name: '生かぼちゃの種', amount: '15g' },
        { name: 'ハイカカオ85%チョコ', amount: '1片' },
      ],
      instructions: [
        'ステップ1: 95℃のお湯で淹れる — 熱湯を注ぎます。',
        'ステップ2: フタをして蒸らす — 鎮静成分のアロマを逃さないよう小皿でフタをして6分蒸らします。',
        'ステップ3: 就寝45分前に — 香りを楽しみながらゆっくりお召し上がりください。',
      ],
      chefTip: 'フタをして蒸らすことで、揮発性のリラックス精油成分がカップ内に凝縮されます。',
    },
  },
};

/**
 * Returns the localized recipe list according to the active language.
 * Falls back gracefully to English defaults if specific fields aren't present.
 */
export function getLocalizedRecipes(language: AppLanguage): MealRecipe[] {
  if (language === 'en') {
    return RECIPE_DATABASE;
  }

  const langMap = RECIPE_TRANSLATIONS[language];
  if (!langMap) {
    return RECIPE_DATABASE;
  }

  return RECIPE_DATABASE.map((original) => {
    const loc = langMap[original.id];
    if (!loc) return original;

    return {
      ...original,
      title: loc.title || original.title,
      category: loc.category || original.category,
      dietTags: loc.dietTags || original.dietTags,
      ingredients: loc.ingredients || original.ingredients,
      instructions: loc.instructions || original.instructions,
      chefTip: loc.chefTip || original.chefTip,
    };
  });
}

/**
 * Returns a single localized recipe by ID or object.
 */
export function getLocalizedRecipe(
  recipeOrId: MealRecipe | string,
  language: AppLanguage
): MealRecipe {
  const recipeId = typeof recipeOrId === 'string' ? recipeOrId : recipeOrId.id;
  const original = RECIPE_DATABASE.find((r) => r.id === recipeId) || (typeof recipeOrId === 'object' ? recipeOrId : RECIPE_DATABASE[0]);

  if (language === 'en') {
    return original;
  }

  const langMap = RECIPE_TRANSLATIONS[language];
  if (!langMap) return original;

  const loc = langMap[recipeId];
  if (!loc) return original;

  return {
    ...original,
    title: loc.title || original.title,
    category: loc.category || original.category,
    dietTags: loc.dietTags || original.dietTags,
    ingredients: loc.ingredients || original.ingredients,
    instructions: loc.instructions || original.instructions,
    chefTip: loc.chefTip || original.chefTip,
  };
}

/**
 * Localized filter pills for RecipeView
 */
export function getLocalizedFilterTags(language: AppLanguage): { id: string; label: string }[] {
  switch (language) {
    case 'es':
      return [
        { id: 'All', label: 'Todas las Recetas' },
        { id: 'High-Protein', label: 'Alto en Proteína' },
        { id: 'Meat & Poultry', label: 'Aves y Carnes' },
        { id: 'Fish & Seafood', label: 'Pescados y Mariscos' },
        { id: 'Something Vegan', label: 'Vegano' },
        { id: 'Vegetarian', label: 'Vegetariano' },
        { id: 'Gluten-Free', label: 'Sin Gluten' },
        { id: 'Omega-3 Rich', label: 'Rico en Omega-3' },
      ];
    case 'de':
      return [
        { id: 'All', label: 'Alle Rezepte' },
        { id: 'High-Protein', label: 'Viel Protein' },
        { id: 'Meat & Poultry', label: 'Geflügel & Fleisch' },
        { id: 'Fish & Seafood', label: 'Fisch & Meeresfrüchte' },
        { id: 'Something Vegan', label: 'Vegan' },
        { id: 'Vegetarian', label: 'Vegetarisch' },
        { id: 'Gluten-Free', label: 'Glutenfrei' },
        { id: 'Omega-3 Rich', label: 'Omega-3-reich' },
      ];
    case 'fr':
      return [
        { id: 'All', label: 'Toutes les Recettes' },
        { id: 'High-Protein', label: 'Riche en Protéines' },
        { id: 'Meat & Poultry', label: 'Volaille & Viande' },
        { id: 'Fish & Seafood', label: 'Poissons & Fruits de Mer' },
        { id: 'Something Vegan', label: 'Végétalien' },
        { id: 'Vegetarian', label: 'Végétarien' },
        { id: 'Gluten-Free', label: 'Sans Gluten' },
        { id: 'Omega-3 Rich', label: 'Riche en Oméga-3' },
      ];
    case 'ru':
      return [
        { id: 'All', label: 'Все рецепты' },
        { id: 'High-Protein', label: 'Высокий белок' },
        { id: 'Meat & Poultry', label: 'Птица и мясо' },
        { id: 'Fish & Seafood', label: 'Рыба и морепродукты' },
        { id: 'Something Vegan', label: 'Веганское' },
        { id: 'Vegetarian', label: 'Вегетарианское' },
        { id: 'Gluten-Free', label: 'Без глютена' },
        { id: 'Omega-3 Rich', label: 'Омега-3' },
      ];
    case 'ar':
      return [
        { id: 'All', label: 'جميع الوصفات' },
        { id: 'High-Protein', label: 'عالي البروتين' },
        { id: 'Meat & Poultry', label: 'دواجن ولحوم' },
        { id: 'Fish & Seafood', label: 'أسماك ومأكولات بحرية' },
        { id: 'Something Vegan', label: 'نباتي تماماً' },
        { id: 'Vegetarian', label: 'نباتي' },
        { id: 'Gluten-Free', label: 'خالٍ من الغلوتين' },
        { id: 'Omega-3 Rich', label: 'غني بأوميغا 3' },
      ];
    case 'ja':
      return [
        { id: 'All', label: 'すべてのレシピ' },
        { id: 'High-Protein', label: '高タンパク' },
        { id: 'Meat & Poultry', label: '鶏肉・お肉' },
        { id: 'Fish & Seafood', label: '魚介類・シーフード' },
        { id: 'Something Vegan', label: 'ヴィーガン' },
        { id: 'Vegetarian', label: 'ベジタリアン' },
        { id: 'Gluten-Free', label: 'グルテンフリー' },
        { id: 'Omega-3 Rich', label: 'オメガ3豊富' },
      ];
    default:
      return [
        { id: 'All', label: 'All Recipes' },
        { id: 'High-Protein', label: 'High-Protein' },
        { id: 'Meat & Poultry', label: 'Poultry & Meat' },
        { id: 'Fish & Seafood', label: 'Fish & Seafood' },
        { id: 'Something Vegan', label: 'Vegan' },
        { id: 'Vegetarian', label: 'Vegetarian' },
        { id: 'Gluten-Free', label: 'Gluten-Free' },
        { id: 'Omega-3 Rich', label: 'Omega-3 Rich' },
      ];
  }
}
