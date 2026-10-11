import { MealRecipe } from '../types/nutrition';

export const RECIPE_DATABASE: MealRecipe[] = [
  {
    id: 'recipe_salmon_quinoa',
    title: 'Glazed Salmon & Quinoa Power Bowl',
    category: 'supper',
    cuisine: 'mediterranean',
    calories: 520,
    protein: 38,
    carbs: 46,
    fats: 20,
    fiber: 7.2,
    prepTimeMinutes: 25,
    difficulty: 'Easy',
    dietTags: ['High-Protein', 'Omega-3 Rich', 'Gluten-Free', 'Fish & Seafood', 'Mediterranean'],
    image: '/src/assets/images/nutrition_salmon_bowl_1791285437839.jpg',
    ingredients: [
      { name: 'Wild Atlantic Salmon Fillet', amount: '150g' },
      { name: 'Tri-color Quinoa (uncooked)', amount: '60g (~1 cup cooked)' },
      { name: 'Hass Avocado (freshly sliced)', amount: '1/2 medium (70g)' },
      { name: 'Steamed Edamame beans (shelled)', amount: '1/3 cup (50g)' },
      { name: 'Cold-Pressed Extra Virgin Olive Oil', amount: '1 tbsp (15ml)' },
      { name: 'Fresh Lemon Juice & Tamari Soy', amount: '1 tbsp each' },
      { name: 'Toasted White & Black Sesame Seeds', amount: '1 tsp garnish' },
      { name: 'Fresh Cilantro & Microgreens', amount: 'Small handful' },
    ],
    instructions: [
      'Step 1: Prep & Marinade — Pat salmon fillet completely dry with paper towels to ensure a crisp sear. Season both sides with 1/4 tsp sea salt, cracked black pepper, 1 tsp cold-pressed olive oil, and half of the fresh lemon juice. Let rest at room temperature for 8 minutes.',
      'Step 2: Cook Whole Quinoa — Rinse tri-color quinoa in a fine-mesh sieve under cold water. Combine with 1 cup low-sodium vegetable stock or water in a small saucepan. Bring to a rolling boil over medium-high heat, cover with a tight-fitting lid, reduce heat to low, and simmer undisturbed for 15 minutes until liquid is absorbed and germ spirals uncoil.',
      'Step 3: Sear the Salmon Fillet — Heat 1 tsp olive oil in a heavy stainless steel or cast-iron skillet over medium-high heat until shimmering. Place salmon fillet skin-side down (or presentation-side down) and sear without moving for 4 minutes until a golden crust develops. Gently flip with a fish spatula, reduce heat to medium-low, spoon 1 tbsp tamari glaze over the fillet, and cook for another 3 to 4 minutes until the center turns pale pink and flakes easily with a fork (internal temperature 52–54°C / 125–130°F for medium).',
      'Step 4: Steam Vegetables — In a small microwave-safe bowl or steamer basket, steam shelled edamame beans with 2 tbsp water and a pinch of salt for 2 to 3 minutes until tender and vibrant emerald green.',
      'Step 5: Fluff & Season Grains — Remove quinoa from heat and let sit covered for 5 minutes. Remove lid, fluff gently with a fork, and fold in remaining 1 tsp extra virgin olive oil, a squeeze of fresh lemon juice, and chopped cilantro.',
      'Step 6: Assemble & Finish Power Bowl — Spoon the warm fluffy quinoa into the base of a wide shallow ceramic bowl. Arrange sliced Hass avocado fans and steamed edamame along one side. Carefully nestle the warm pan-seared salmon fillet in the center. Spoon remaining pan juices over the salmon, sprinkle with toasted sesame seeds, and garnish with fresh microgreens.',
    ],
    chefTip: 'Omega-3 fatty acids EPA & DHA reduce post-exercise muscular soreness and optimize cellular insulin sensitivity. Cooking the salmon to medium preserves delicate polyunsaturated lipids.',
  },
  {
    id: 'recipe_greek_chicken_salad',
    title: 'Mediterranean Herb Grilled Chicken Salad',
    category: 'dinner',
    cuisine: 'mediterranean',
    calories: 430,
    protein: 36,
    carbs: 18,
    fats: 24,
    fiber: 5.5,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['Low-Carb', 'Mediterranean', 'High-Protein', 'Gluten-Free', 'Meat & Poultry'],
    image: '/src/assets/images/nutrition_greek_salad_1791285451456.jpg',
    ingredients: [
      { name: 'Skinless Chicken Breast Cutlet', amount: '150g' },
      { name: 'Crisp Romaine Hearts & Baby Spinach', amount: '3 cups packed' },
      { name: 'Vine Cherry Tomatoes (halved)', amount: '1 cup (150g)' },
      { name: 'English Cucumber (sliced into half-moons)', amount: '1/2 cup' },
      { name: 'Authentic Greek Sheep Feta (crumbled)', amount: '30g (1 oz)' },
      { name: 'Kalamata Olives (pitted & halved)', amount: '6 pieces' },
      { name: 'Extra Virgin Olive Oil & Red Wine Vinegar', amount: '1 tbsp each' },
      { name: 'Dried Oregano, Garlic Powder & Lemon Zest', amount: '1/2 tsp each' },
    ],
    instructions: [
      'Step 1: Pound & Marinate Chicken — Place chicken breast between two sheets of parchment paper and gently pound the thicker end with a meat mallet or heavy rolling pin to an even 1.5cm (1/2-inch) thickness. Rub with dried Greek oregano, garlic powder, lemon zest, 1/2 tsp sea salt, and 1 tsp olive oil. Allow to marinate for 10 minutes at room temperature.',
      'Step 2: Grill to Juicy Perfection — Preheat a ridged cast-iron grill pan or outdoor grill over medium-high heat until smoking lightly. Lightly brush grates with olive oil. Place chicken on the grill and sear undisturbed for 5 to 6 minutes until distinct charred grill marks appear. Flip and grill for 4 to 5 minutes more until internal temperature registers 74°C (165°F).',
      'Step 3: Rest the Protein — Transfer cooked chicken breast to a cutting board and tent loosely with foil. Let rest for 5 full minutes. This allows muscle fibers to relax and reabsorb moisture, preventing the juices from leaking out when sliced.',
      'Step 4: Wash & Crisp the Greens — Wash romaine hearts and baby spinach in cold water, spin thoroughly dry in a salad spinner to prevent watery dressing, and tear into bite-sized leaves. Halve cherry tomatoes and slice English cucumber into half-moons.',
      'Step 5: Whisk Dressing — In a small glass jar, vigorously whisk 2 tsp extra virgin olive oil, 1 tsp aged red wine vinegar, a squeeze of fresh lemon juice, dried oregano, salt, and freshly cracked black pepper until emulsified.',
      'Step 6: Plate & Garnish — In a wide wooden or ceramic salad bowl, toss crisp greens, cucumber, and cherry tomatoes with the emulsion. Slice warm rested chicken on a bias into 1/2-inch strips and arrange atop the salad. Scatter kalamata olives, crumble sheep feta in rustic chunks over the top, and finish with a dusting of wild Greek oregano.',
    ],
    chefTip: 'Pounding the chicken cutlet to uniform thickness ensures rapid, even cooking without drying out the edges while waiting for the center to cook through.',
  },
  {
    id: 'recipe_power_berry_oatmeal',
    title: 'High-Protein Berry Chia Power Bowl',
    category: 'breakfast',
    cuisine: 'mediterranean',
    calories: 370,
    protein: 26,
    carbs: 48,
    fats: 8.5,
    fiber: 9.0,
    prepTimeMinutes: 10,
    difficulty: 'Quick',
    dietTags: ['Vegetarian', 'High-Fiber', 'Quick & Easy', 'Antioxidants', 'Dairy Products'],
    image: '/src/assets/images/nutrition_oatmeal_berries_1791285463333.jpg',
    ingredients: [
      { name: 'Whole Rolled Oats (old-fashioned)', amount: '50g (1/2 cup)' },
      { name: 'Unsweetened Almond Milk or Skim Milk', amount: '240ml (1 cup)' },
      { name: 'Vanilla Whey Isolate or Plant Protein', amount: '15g (1/2 scoop)' },
      { name: 'Fresh Blueberries & Raspberries', amount: '3/4 cup (100g)' },
      { name: 'Black Chia Seeds', amount: '1 tbsp (12g)' },
      { name: 'Raw Sliced Almonds (toasted)', amount: '10g (1 tbsp)' },
      { name: 'Ceylon Cinnamon & Pure Vanilla Extract', amount: '1/4 tsp each' },
    ],
    instructions: [
      'Step 1: Simmer Whole Oats — In a small heavy-bottomed saucepan, bring 1 cup unsweetened almond milk to a gentle simmer over medium heat. Stir in rolled oats, a pinch of sea salt, and 1/4 tsp Ceylon cinnamon. Reduce heat to medium-low and simmer for 4 to 5 minutes, stirring frequently with a wooden spoon until oats are creamy and thick.',
      'Step 2: Hydrate Chia Seeds — Stir 1 tbsp black chia seeds directly into the hot simmering oatmeal during the last minute of cooking. The chia seeds will immediately begin absorbing liquid and swelling, yielding a luxurious pudding-like texture.',
      'Step 3: Cool Slightly before Protein — Remove saucepan from heat and allow to cool for 90 seconds. (Critical: Adding whey protein directly to boiling liquid will cause the protein to denature and curdle into grainy lumps).',
      'Step 4: Whisk in Protein Isolate — Sift or sprinkle vanilla protein isolate and vanilla extract into the warm oatmeal. Whisk vigorously for 30 seconds until completely dissolved, smooth, and velvety.',
      'Step 5: Toast Almond Slices — In a dry skillet over medium heat, toss raw sliced almonds for 2 minutes until fragrant and pale golden brown. Remove immediately to prevent burning.',
      'Step 6: Assemble Power Bowl — Pour warm creamy oatmeal into a stoneware breakfast bowl. Layer fresh blueberries and raspberries across one half, scatter toasted almonds and remaining chia seeds across the other half, and finish with a delicate dusting of Ceylon cinnamon.',
    ],
    chefTip: 'Beta-glucan soluble fiber in whole oats regulates gut microbiome and blunts postprandial glucose spikes. Never boil whey protein directly; fold it into warm oats off the heat.',
  },
  {
    id: 'recipe_italian_pollo_limone',
    title: 'Italian Pollo al Limone & Soft Polenta',
    category: 'dinner',
    cuisine: 'italian',
    calories: 460,
    protein: 38,
    carbs: 34,
    fats: 16,
    fiber: 4.8,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['Italian', 'High-Protein', 'Gluten-Free', 'Meat & Poultry'],
    image: '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg',
    ingredients: [
      { name: 'Lean Chicken Breast Cutlets', amount: '160g' },
      { name: 'Quick-Cooking Yellow Corn Polenta', amount: '45g (~1/2 cup cooked)' },
      { name: 'Chopped Tuscan Lacinato Kale', amount: '2 cups packed' },
      { name: 'Fresh Organic Lemon (zested & juiced)', amount: '1 whole' },
      { name: 'Garlic Cloves (thinly sliced)', amount: '2 cloves' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tbsp (15ml)' },
      { name: 'Fresh Rosemary Sprig & White Pepper', amount: '1 sprig' },
    ],
    instructions: [
      'Step 1: Prep Chicken Cutlets — Slice chicken breast horizontally into thin cutlets (paillards). Season both sides with 1/2 tsp sea salt, freshly cracked white pepper, and finely grated lemon zest. Let stand at room temperature for 5 minutes.',
      'Step 2: Cook Soft Creamy Polenta — In a small pot, bring 1.5 cups water or low-sodium chicken broth with 1/4 tsp salt to a boil. Slowly rain in quick-cooking polenta while whisking continuously to prevent lumps. Reduce heat to low and cook, stirring with a wooden spoon for 4 to 5 minutes until thick, creamy, and pulling away from the sides. Cover and keep warm.',
      'Step 3: Sear Chicken Golden — Heat 1 tbsp cold-pressed olive oil in a wide stainless steel sauté pan over medium-high heat. Add sliced chicken cutlets and the fresh rosemary sprig. Sear without moving for 3 minutes until deep golden brown on bottom. Flip and sear the second side for 2 minutes.',
      'Step 4: Deglaze Pan with Lemon Reduction — Pour freshly squeezed lemon juice (about 2 tbsp) directly into the hot pan around the chicken. The acidic liquid will vigorously sizzle and lift the flavorful caramelized fond from the pan bottom. Swirl pan for 60 seconds until pan juices form a glossy golden reduction.',
      'Step 5: Sauté Tuscan Kale — Transfer chicken to a warm plate. In the same hot skillet with the residual lemon pan drippings, add sliced garlic and chopped Tuscan kale. Sauté over medium heat for 2 to 3 minutes until kale wilts and turns deep vibrant green.',
      'Step 6: Plate Rustic Italian Style — Spoon soft warm polenta onto the center of a wide plate. Spread tender garlic kale over the polenta. Top with the golden chicken cutlets and spoon the aromatic lemon-rosemary pan reduction generously over the top.',
    ],
    chefTip: 'Deglazing the skillet with fresh lemon juice lifts caramelized pan drippings into a rich pan sauce without requiring butter or high-calorie cream.',
  },
  {
    id: 'recipe_japanese_teriyaki_salmon',
    title: 'Tokyo Teriyaki Glazed Wild Salmon Bento',
    category: 'supper',
    cuisine: 'japanese',
    calories: 490,
    protein: 36,
    carbs: 42,
    fats: 18,
    fiber: 5.2,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['Japanese', 'Omega-3 Rich', 'Fish & Seafood', 'High-Protein'],
    image: '/src/assets/images/japanese_salmon_bento_1791387313317.jpg',
    ingredients: [
      { name: 'Wild Sockeye or Atlantic Salmon Fillet', amount: '160g' },
      { name: 'Low-Sodium Tamari & Mirin Glaze', amount: '1 tbsp each' },
      { name: 'Fresh Grated Ginger & Garlic', amount: '1 tsp each' },
      { name: 'Steamed Short-Grain Brown Rice', amount: '1/2 cup cooked (90g)' },
      { name: 'Baby Bok Choy (quartered lengthwise)', amount: '2 heads' },
      { name: 'Fresh Shiitake Mushrooms (sliced)', amount: '1/2 cup (50g)' },
      { name: 'Toasted White Sesame Seeds & Scallions', amount: '1 tsp garnish' },
    ],
    instructions: [
      'Step 1: Mix Teriyaki Reduction — In a small bowl, whisk 1 tbsp low-sodium tamari soy sauce, 1 tbsp Japanese mirin, 1 tsp freshly grated ginger root, and 1/2 tsp minced garlic until well blended.',
      'Step 2: Score & Sear the Salmon — Pat salmon fillet thoroughly dry. Heat a non-stick skillet or seasoned wok over medium-high heat with 1/2 tsp neutral sesame oil. Place salmon skin-side down and press gently with a spatula for 10 seconds to ensure full contact. Sear undisturbed for 3.5 minutes until skin is crispy and edges become opaque.',
      'Step 3: Glaze & Caramelize — Flip salmon fillet over. Immediately pour the prepared ginger-tamari glaze around the fish. As the sauce bubbles and rapidly thickens into a glossy lacquer (about 60 to 90 seconds), spoon the bubbling glaze continuously over the top of the salmon until evenly coated. Remove salmon to rest.',
      'Step 4: Braise Bok Choy & Shiitakes — In the same pan with residual glaze, add quartered baby bok choy and sliced shiitake mushrooms along with 2 tbsp water or dashi broth. Cover pan with lid and steam over medium heat for 2 minutes until bok choy stems are tender-crisp and mushroom slices are succulent.',
      'Step 5: Prepare Steamed Brown Rice — Warm pre-cooked short-grain brown rice. Sprinkle with a pinch of sea salt and thinly sliced green scallions.',
      'Step 6: Plate Bento Style — In a divided bento container or dark ceramic bowl, place warm brown rice on one side. Lay braised bok choy and glossy shiitake mushrooms alongside. Rest the teriyaki glazed salmon fillet on top, spoon any remaining ginger glaze over, and finish with toasted sesame seeds.',
    ],
    chefTip: 'Pouring the mirin-tamari glaze in during the final 90 seconds allows it to bubble and reduce into an authentic sticky shine without scorching the sugars.',
  },
  {
    id: 'recipe_mexican_chipotle_bowl',
    title: 'Mexican Chipotle Chicken & Cilantro Bowl',
    category: 'dinner',
    cuisine: 'mexican',
    calories: 480,
    protein: 37,
    carbs: 45,
    fats: 16,
    fiber: 8.5,
    prepTimeMinutes: 22,
    difficulty: 'Easy',
    dietTags: ['Mexican', 'High-Protein', 'High-Fiber', 'Meat & Poultry'],
    image: '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg',
    ingredients: [
      { name: 'Lean Chicken Breast (marinated in chipotle)', amount: '150g' },
      { name: 'Simmered Pinto or Black Beans', amount: '1/2 cup (120g)' },
      { name: 'Steamed Brown Rice (with cilantro & lime)', amount: '1/2 cup (90g)' },
      { name: 'Charred Bell Peppers & Red Onion', amount: '1 cup strips' },
      { name: 'Fresh Hass Avocado / Guacamole', amount: '2 tbsp (35g)' },
      { name: 'Ground Cumin, Smoked Paprika & Lime', amount: '1/2 tsp each' },
      { name: 'Fresh Cilantro Leaves', amount: '2 tbsp chopped' },
    ],
    instructions: [
      'Step 1: Marinate Chipotle Chicken — In a shallow dish, coat chicken breast with 1 tsp adobo chipotle sauce, 1/2 tsp ground cumin, 1/2 tsp smoked paprika, 1 clove minced garlic, 1 tsp olive oil, and the juice of half a fresh lime. Marinate for at least 10 minutes.',
      'Step 2: Char Fajita Vegetables — Heat a dry cast-iron skillet over high heat until smoking hot. Add sliced bell peppers and red onion without crowding. Let sit undisturbed for 2 minutes to develop deep sweet black char marks, then toss and sear for 2 more minutes. Transfer to a bowl.',
      'Step 3: Sear the Chipotle Chicken — In the same screaming-hot cast-iron pan, add 1 tsp olive oil. Lay marinated chicken breast in pan and cook for 5 to 6 minutes per side over medium-high heat until deeply caramelized and internal temperature reaches 74°C (165°F).',
      'Step 4: Rest & Slice — Remove chicken to a clean board and rest for 5 minutes. Slice into bite-sized strips across the grain.',
      'Step 5: Warm Beans & Season Rice — In a small pot, warm drained pinto beans with a pinch of cumin and sea salt. Toss warm brown rice with freshly squeezed lime juice, lime zest, and finely chopped cilantro.',
      'Step 6: Assemble Cantina Bowl — Spread cilantro-lime rice across the bowl base. Arrange warm pinto beans, charred fajita peppers and onions, and sliced chipotle chicken in neat vibrant sections. Top with fresh guacamole, lime wedges, and cilantro sprigs.',
    ],
    chefTip: 'Charring peppers in a dry screaming-hot skillet caramelizes natural plant sugars rapidly without softening them into mush, retaining texture and vitamin C.',
  },
  {
    id: 'recipe_spanish_pollo_ajillo',
    title: 'Spanish Pollo al Ajillo with Saffron Rice',
    category: 'dinner',
    cuisine: 'spanish',
    calories: 470,
    protein: 36,
    carbs: 38,
    fats: 17,
    fiber: 4.2,
    prepTimeMinutes: 25,
    difficulty: 'Easy',
    dietTags: ['Spanish', 'Mediterranean', 'High-Protein', 'Meat & Poultry'],
    image: '/src/assets/images/grilled_chicken_bowl_1791375510334.jpg',
    ingredients: [
      { name: 'Chicken Breast Cutlets (cubed)', amount: '160g' },
      { name: 'Whole Garlic Cloves (sliced thick)', amount: '5 cloves' },
      { name: 'Brown Rice Simmered with Saffron', amount: '1/2 cup cooked' },
      { name: 'Roasted Piquillo Peppers (drained)', amount: '3 pieces' },
      { name: 'Sweet Spanish Smoked Pimentón', amount: '1 tsp' },
      { name: 'Dry Spanish White Wine or Chicken Broth', amount: '3 tbsp (45ml)' },
      { name: 'Cold-Pressed Spanish Olive Oil', amount: '1 tbsp' },
      { name: 'Fresh Flat-Leaf Parsley (chopped)', amount: '2 tbsp' },
    ],
    instructions: [
      'Step 1: Prep Ingredients & Saffron Infusion — Dissolve a pinch of crushed Spanish saffron threads in 2 tbsp warm broth or water for 5 minutes. Slice garlic cloves into thick chips. Cut chicken breast into bite-sized 1-inch nuggets and season with sea salt and black pepper.',
      'Step 2: Infuse Garlic in Cold Oil — In a wide heavy sauté pan, place sliced garlic chips in 1 tbsp cold extra virgin olive oil over medium-low heat. Cook slowly for 3 to 4 minutes until golden and fragrant, swirling pan constantly so garlic never browns too dark. Remove half of the crisp garlic chips and reserve for garnish.',
      'Step 3: Sear Chicken Cubes — Increase heat to medium-high. Add seasoned chicken pieces to the aromatic garlic-infused oil. Sear without moving for 3 minutes until golden on bottom, then turn and sear all sides for another 3 minutes until lightly browned.',
      'Step 4: Deglaze with Wine & Smoked Pimentón — Pull pan slightly off heat, dust with 1 tsp sweet Spanish smoked pimentón, and immediately pour in dry white wine. Return to heat and simmer vigorously for 2 to 3 minutes until wine reduces by half into a savory golden garlic broth.',
      'Step 5: Warm Saffron Rice & Piquillos — Fluff pre-cooked brown rice with the saffron infusion. Slice roasted piquillo peppers into wide ribbons and warm gently in the skillet juices.',
      'Step 6: Plate Traditional Tapas Style — Place vibrant yellow saffron rice on one side of a warm ceramic plate. Spoon garlic chicken cubes alongside with tender piquillo pepper ribbons. Pour the rich pan garlic reduction over everything, scatter reserved crispy garlic chips, and finish with fresh parsley.',
    ],
    chefTip: 'Starting garlic in cool oil allows allicin and aromatic sulfur compounds to gently infuse into the oil base without becoming bitter.',
  },
  {
    id: 'recipe_greek_yogurt_parfait',
    title: 'Probiotic Greek Yogurt Crunch Parfait',
    category: 'snack',
    cuisine: 'mediterranean',
    calories: 230,
    protein: 20,
    carbs: 22,
    fats: 5.5,
    fiber: 4.2,
    prepTimeMinutes: 5,
    difficulty: 'Quick',
    dietTags: ['High-Protein', 'Probiotics', 'Vegetarian', 'Quick & Easy', 'Dairy Products'],
    image: '/src/assets/images/greek_yogurt_berries_1791375536456.jpg',
    ingredients: [
      { name: 'Authentic 0% Strained Greek Yogurt', amount: '170g (3/4 cup)' },
      { name: 'Fresh Blueberries, Blackberries & Raspberries', amount: '1/2 cup (75g)' },
      { name: 'Raw Walnuts (roughly crushed)', amount: '15g' },
      { name: 'Ceylon Cinnamon', amount: '1/4 tsp' },
      { name: 'Raw Unfiltered Honey (optional)', amount: '1 tsp (7g)' },
      { name: 'Chia Seeds or Hemp Hearts', amount: '1 tsp' },
    ],
    instructions: [
      'Step 1: Chill Glassware — For the best textural contrast, place a glass tumbler or small ceramic bowl in the refrigerator for 5 minutes before assembling.',
      'Step 2: Base Layer — Spoon half of the thick strained Greek yogurt (about 85g) into the base of the glass, smoothing with the back of a spoon.',
      'Step 3: Berry & Crunch Center — Add a layer of freshly rinsed blueberries and raspberries, followed by half of the crushed raw walnuts and a sprinkle of chia seeds.',
      'Step 4: Top Yogurt Crown — Spoon the remaining Greek yogurt over the berry layer, creating an even top tier.',
      'Step 5: Garnish & Finish — Crown the top with remaining fresh berries, the rest of the walnut pieces, and a drizzle of raw unfiltered honey if desired.',
      'Step 6: Dust with Ceylon Cinnamon — Generously dust with Ceylon cinnamon from a fine shaker. Enjoy immediately while nuts are crisp and fruit is chilled.',
    ],
    chefTip: 'Strained Greek yogurt delivers 20g of pure casein and whey protein. Using Ceylon cinnamon helps blunt any blood sugar response and adds natural sweet warmth.',
  },
  {
    id: 'recipe_avocado_egg_toast',
    title: 'Sourdough Avocado & Poached Egg Toast',
    category: 'breakfast',
    cuisine: 'mediterranean',
    calories: 340,
    protein: 15,
    carbs: 26,
    fats: 19,
    fiber: 6.0,
    prepTimeMinutes: 12,
    difficulty: 'Easy',
    dietTags: ['Vegetarian', 'Clean-Fats', 'Whole-Food', 'Dairy-Free'],
    image: '/src/assets/images/breakfast_egg_toast_1791375494924.jpg',
    ingredients: [
      { name: 'Artisan Sourdough Bread (thick slice)', amount: '1 slice (50g)' },
      { name: 'Ripe Hass Avocado', amount: '1/2 medium (70g)' },
      { name: 'Pasture-Raised Whole Egg', amount: '1 large' },
      { name: 'Fresh Lemon Juice', amount: '1 tsp' },
      { name: 'Flaky Sea Salt & Cracked Black Pepper', amount: 'Pinch each' },
      { name: 'Everything Bagel Seasoning & Red Pepper Flakes', amount: '1/2 tsp' },
      { name: 'Fresh Microgreens or Arugula', amount: 'Small handful' },
    ],
    instructions: [
      'Step 1: Simmer Water for Poaching — Bring 3 inches of water in a small deep saucepan to a gentle sub-boil (about 88°C / 190°F, where small bubbles rise but water does not roll). Stir in 1 tsp white vinegar to help egg whites coagulate cleanly.',
      'Step 2: Toast Sourdough Crisp — Toast thick artisanal sourdough slice in a toaster or griddle until deep golden brown and crunchy on the outside while chewy in the center.',
      'Step 3: Season & Mash Avocado — Scoop ripe Hass avocado flesh into a shallow bowl. Add 1 tsp fresh lemon juice, a pinch of flaky sea salt, and cracked black pepper. Mash with the back of a fork until spreadable but retaining rustic chunky texture.',
      'Step 4: Poach the Egg — Crack fresh pasture-raised egg into a small ramekin. Use a spoon to create a gentle circular whirlpool in the simmering water. Slide the egg gently into the center of the vortex. Cook undisturbed for 3 minutes for a warm liquid yolk and fully set velvety white.',
      'Step 5: Lift & Drain Egg — Use a slotted spoon to carefully lift the poached egg from the water. Rest for 10 seconds on a folded paper towel to blot excess water away so it does not make the toast soggy.',
      'Step 6: Assemble & Season — Spread the seasoned avocado generously edge-to-edge over the warm sourdough toast. Lay the poached egg on top. Sprinkle with everything bagel seasoning, crushed red pepper flakes, and crown with fresh microgreens.',
    ],
    chefTip: 'Blotting the poached egg on a paper towel before placing it on toast prevents water from dampening your crisp sourdough crust.',
  },
  {
    id: 'recipe_vegan_falafel_bowl',
    title: 'Baked Herb Falafel & Warm Quinoa Mezze Bowl',
    category: 'dinner',
    cuisine: 'middle_eastern',
    calories: 450,
    protein: 21,
    carbs: 58,
    fats: 16,
    fiber: 11.5,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['Something Vegan', 'Vegetarian', 'Plant-Protein', 'High-Fiber', 'Middle Eastern'],
    image: '/src/assets/images/vegan_harvest_bowl_1791375550373.jpg',
    ingredients: [
      { name: 'Herb Chickpea Falafels (baked)', amount: '4 pieces (120g)' },
      { name: 'Tri-color Quinoa (cooked)', amount: '3/4 cup (140g)' },
      { name: 'Roasted Eggplant & Bell Pepper Cubes', amount: '1 cup (150g)' },
      { name: 'Baby Wild Arugula & Persian Cucumber', amount: '2 cups' },
      { name: 'Raw Sesame Tahini & Lemon Dressing', amount: '2 tbsp (30g)' },
      { name: 'Za’atar Herbs & Sumac', amount: '1/2 tsp each' },
      { name: 'Toasted Pine Nuts or Pumpkin Seeds', amount: '1 tbsp' },
    ],
    instructions: [
      'Step 1: Preheat & Bake Falafels — Preheat oven or air fryer to 200°C (400°F). Lightly mist chickpea falafels with olive oil spray. Bake on a parchment-lined baking sheet for 14 minutes, turning halfway through, until exterior is crisp and deeply golden while interior stays tender.',
      'Step 2: Roast Eggplant & Peppers — Toss cubed eggplant and bell peppers with 1 tsp olive oil, ground cumin, and sea salt. Roast alongside falafels at 200°C for 16 minutes until caramelized and tender.',
      'Step 3: Whisk Garlic Tahini Dressing — In a small bowl, whisk 2 tbsp raw sesame tahini with 1.5 tbsp warm water, 1 tbsp fresh lemon juice, 1/2 clove minced garlic, and a pinch of salt. Whisk vigorously; the tahini will seize at first, then transform into a pale, velvety, pourable cream.',
      'Step 4: Prepare Greens & Grains — Wash and dry baby arugula. Dice crisp Persian cucumber. Fluff warm pre-cooked tri-color quinoa with a pinch of za’atar spice.',
      'Step 5: Toast Pine Nuts — In a dry skillet over medium heat, toast pine nuts for 2 minutes until fragrant and golden brown.',
      'Step 6: Assemble Mezze Bowl — Layer arugula and warm quinoa in a wide shallow bowl. Arrange diced cucumbers, roasted eggplant, and hot crispy baked falafels in sections across the surface. Drizzle garlic tahini generously in ribbons across the bowl, scatter toasted pine nuts, and finish with bright ruby-red sumac.',
    ],
    chefTip: 'Adding a tablespoon of warm water while whisking tahini allows the natural sesame lipids to emulsify into a silky restaurant-quality dressing.',
  },
  {
    id: 'recipe_sirloin_asparagus',
    title: 'Lean Sirloin Steak with Roasted Asparagus & Baby Potatoes',
    category: 'supper',
    cuisine: 'mediterranean',
    calories: 490,
    protein: 42,
    carbs: 26,
    fats: 22,
    fiber: 5.0,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['High-Protein', 'Meat & Poultry', 'Gluten-Free', 'Iron-Rich'],
    image: '/src/assets/images/grilled_sirloin_steak_1791387288438.jpg',
    ingredients: [
      { name: 'Grass-Fed Beef Sirloin Steak (trimmed)', amount: '170g (6 oz)' },
      { name: 'Fresh Asparagus Spears (woody ends snapped)', amount: '10 spears (150g)' },
      { name: 'Fingerling or Baby Gold Potatoes (halved)', amount: '3 small (100g)' },
      { name: 'Fresh Rosemary Sprig & Garlic Cloves', amount: '1 sprig + 2 cloves' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tbsp (15ml)' },
      { name: 'Coarse Flaky Sea Salt & Coarse Black Pepper', amount: '1/2 tsp each' },
    ],
    instructions: [
      'Step 1: Temper & Season Steak — Remove sirloin steak from refrigerator 20 minutes prior to cooking to bring to room temperature (ensures even cooking without a cold center). Pat completely dry with paper towels. Season generously on all sides with coarse sea salt and cracked black pepper.',
      'Step 2: Roast Baby Potatoes & Asparagus — Preheat oven to 205°C (400°F). Toss halved baby potatoes with 1 tsp olive oil, salt, and pepper; place cut-side down on a baking sheet and roast for 12 minutes. Add trimmed asparagus spears tossed with remaining garlic to the sheet and roast for an additional 8 minutes until potatoes are golden and asparagus is tender-crisp.',
      'Step 3: Heat Cast-Iron to Smoking Point — Place a heavy cast-iron skillet over high heat for 4 minutes until smoking hot. Add 1 tsp high-heat olive oil and swirl to coat.',
      'Step 4: Sear the Sirloin Steak — Lay steak in pan with tongs. Sear undisturbed for 3.5 minutes to build a rich deep mahogany crust. Flip steak over; immediately add 2 smashed garlic cloves and the fresh rosemary sprig to the hot skillet. Cook for 3 minutes for medium-rare (internal temperature 54°C / 130°F) or 4 minutes for medium (57°C / 135°F), basting meat with the pan juices.',
      'Step 5: Rest the Steak (Crucial) — Transfer steak to a warm plate or cutting board. Rest undisturbed for 5 full minutes. Muscle fibers will reabsorb intra-cellular juices, ensuring every slice remains juicy and fork-tender.',
      'Step 6: Carve & Plate — Slice rested sirloin across the grain into 1/2-inch thick slices. Arrange alongside crispy roasted baby potatoes and blistered asparagus spears. Drizzle any accumulated cutting board juices over the steak and finish with flaky sea salt.',
    ],
    chefTip: 'Resting the steak for 5 minutes allows internal muscle tension to release so juices redistribute rather than pooling onto the cutting board.',
  },
  {
    id: 'recipe_thai_poached_shrimp',
    title: 'Bangkok Coconut Lime Poached Shrimp & Greens',
    category: 'supper',
    cuisine: 'thai',
    calories: 440,
    protein: 34,
    carbs: 38,
    fats: 16,
    fiber: 5.8,
    prepTimeMinutes: 18,
    difficulty: 'Easy',
    dietTags: ['Fish & Seafood', 'Thai', 'Gluten-Free', 'High-Protein'],
    image: '/src/assets/images/thai_poached_shrimp_1791387408173.jpg',
    ingredients: [
      { name: 'Jumbo Tiger Shrimp (peeled & deveined)', amount: '180g (6–8 pieces)' },
      { name: 'Light Coconut Milk (unsweetened)', amount: '120ml (1/2 cup)' },
      { name: 'Low-Sodium Vegetable or Fish Broth', amount: '120ml (1/2 cup)' },
      { name: 'Fresh Lemongrass Stalk (bruised) & Kaffir Leaves', amount: '1 stalk + 2 leaves' },
      { name: 'Fresh Ginger or Galangal (sliced)', amount: '4 thin coins' },
      { name: 'Crisp Snow Peas & Baby Sweet Corn', amount: '1 cup mixed' },
      { name: 'Steamed Brown Jasmine Rice', amount: '1/2 cup cooked (90g)' },
      { name: 'Fresh Thai Holy Basil & Fresh Lime', amount: 'Handful + 1 lime' },
    ],
    instructions: [
      'Step 1: Prep Aromatic Broth — Peel outer husk of lemongrass stalk and bruise with the back of a chef knife to release fragrant oils. Cut into 3-inch batons. Slice ginger into thin coins.',
      'Step 2: Simmer Lemongrass-Coconut Base — In a medium saucepan, combine light coconut milk, broth, bruised lemongrass, ginger slices, and torn kaffir lime leaves. Bring to a gentle boil over medium heat, then reduce to low and simmer covered for 6 minutes to extract intense aromatic botanical essences.',
      'Step 3: Blanch Vegetables — Drop crisp snow peas and baby sweet corn into the fragrant simmering broth. Cook for 2 minutes until bright green and tender-crisp. Transfer vegetables with a slotted spoon to warm serving bowls.',
      'Step 4: Gently Poach Tiger Shrimp — Keep the coconut broth at a gentle sub-simmer (do not boil vigorously, which toughens seafood). Add deveined tiger shrimp and poach gently for 3 to 4 minutes, turning once, until shrimp curl into a loose "C" shape and turn opaque pink throughout.',
      'Step 5: Finish with Fresh Lime & Basil — Turn off the heat completely. Discard tough lemongrass and ginger coins. Stir in 1 tbsp freshly squeezed lime juice and a generous handful of fresh Thai holy basil leaves, allowing them to wilt in the residual heat.',
      'Step 6: Plate in Ceramic Bowl — Ladle the fragrant coconut broth and succulent poached shrimp over warm steamed brown jasmine rice and tender vegetables. Garnish with additional fresh Thai basil and lime wedges.',
    ],
    chefTip: 'Poaching shrimp at sub-simmering temperatures preserves delicate marine glycogen sugars, preventing the rubbery texture caused by rapid boiling.',
  },
  {
    id: 'recipe_seared_sea_bass',
    title: 'Pan-Seared Sea Bass with Mediterranean Capers & Tomatoes',
    category: 'supper',
    cuisine: 'mediterranean',
    calories: 420,
    protein: 36,
    carbs: 14,
    fats: 22,
    fiber: 4.2,
    prepTimeMinutes: 18,
    difficulty: 'Easy',
    dietTags: ['Fish & Seafood', 'Mediterranean', 'Low-Carb', 'Omega-3 Rich'],
    image: '/src/assets/images/seared_fish_dinner_1791375522971.jpg',
    ingredients: [
      { name: 'Wild Sea Bass Fillet (scaled & skin-on)', amount: '170g' },
      { name: 'Vine Cherry Tomatoes (halved)', amount: '1 cup (150g)' },
      { name: 'Capers in Brine (drained)', amount: '1 tbsp' },
      { name: 'Medium Zucchini (peeled into ribbons)', amount: '1 medium (150g)' },
      { name: 'Garlic Cloves (thinly sliced)', amount: '2 cloves' },
      { name: 'Extra Virgin Olive Oil', amount: '1 tbsp (15ml)' },
      { name: 'Fresh Lemon Juice & Fresh Basil', amount: '1 tbsp + leaves' },
    ],
    instructions: [
      'Step 1: Score & Dry Skin — Pat sea bass fillet completely dry with paper towels. Using a sharp knife, score the skin with 3 shallow diagonal slashes (just through the skin, not into flesh). This prevents the fillet from curling up in the hot skillet. Season both sides with 1/2 tsp sea salt and white pepper.',
      'Step 2: Steam Zucchini Ribbons — Using a Y-peeler, shave zucchini lengthwise into wide ribbons. Steam in a covered skillet with 2 tbsp water and a pinch of salt for 2 minutes until tender but still holding shape. Drain and arrange on serving plate.',
      'Step 3: Sear Crispy Skin — Heat 1 tbsp cold-pressed olive oil in a non-stick or cast-iron skillet over medium-high heat until shimmering. Place sea bass skin-side down. Press gently with a fish spatula for 15 seconds to ensure the entire skin contacts the pan. Cook undisturbed for 4 minutes until skin is golden, crisp, and releases easily.',
      'Step 4: Finish Flesh Side — Gently flip the fillet. Reduce heat to medium and cook flesh side for 2 minutes more until opaque and tender (internal temp 55°C / 130°F). Transfer fish carefully to rest over the zucchini ribbons.',
      'Step 5: Blister Tomatoes & Capers — In the same pan with residual pan drippings, toss sliced garlic, halved cherry tomatoes, and drained capers over medium heat for 2 minutes until tomato skins blister and release sweet juices.',
      'Step 6: Plate & Garnish — Deglaze the pan with 1 tbsp fresh lemon juice and swirl. Spoon blistered tomatoes, capers, and aromatic pan reduction over and around the crispy sea bass fillet. Garnish with torn fresh basil leaves.',
    ],
    chefTip: 'Scoring the skin and pressing down with a spatula for the first 15 seconds ensures flat contact with the hot oil, resulting in paper-thin shatteringly crisp fish skin.',
  },
  {
    id: 'recipe_edamame_tea_snack',
    title: 'Steamed Sea Salt Edamame & Roasted Almonds',
    category: 'snack',
    cuisine: 'japanese',
    calories: 210,
    protein: 15,
    carbs: 14,
    fats: 11,
    fiber: 6.5,
    prepTimeMinutes: 5,
    difficulty: 'Quick',
    dietTags: ['Something Vegan', 'Vegetarian', 'Quick & Easy', 'High-Fiber'],
    image: '/src/assets/images/edamame_tea_snack_1791387301304.jpg',
    ingredients: [
      { name: 'Whole Edamame Pods (fresh or frozen)', amount: '120g (3/4 cup)' },
      { name: 'Raw Whole Almonds', amount: '15g (~12 nuts)' },
      { name: 'Flaky Maldon Sea Salt', amount: '1/4 tsp' },
      { name: 'Japanese Sencha or Ceremonial Matcha', amount: '1 cup brewed' },
    ],
    instructions: [
      'Step 1: Brew Green Tea — Heat fresh filtered water to 80°C (175°F, not boiling, to prevent bitterness). Steep 1 tsp Japanese green tea leaves or whisk 1/2 tsp ceremonial matcha in a ceramic cup for 2 minutes.',
      'Step 2: Steam Edamame Pods — Bring 2 inches of water to a boil in a small pot with a pinch of salt. Add whole edamame pods to a steamer basket (or simmer directly) for 3 to 4 minutes until vibrant green and tender.',
      'Step 3: Drain & Season — Drain edamame thoroughly in a colander. While still piping hot and steaming, toss with 1/4 tsp flaky Maldon sea salt so crystals cling to the textured pods.',
      'Step 4: Portion Raw Almonds — Count out 15g raw almonds into a small ceramic dish.',
      'Step 5: Mindful Pairing — Serve hot salted edamame pods alongside crunchy almonds and hot green tea. Squeeze beans from pods directly with teeth and discard fibrous shells.',
    ],
    chefTip: 'Whole edamame provides complete plant protein with all 9 essential amino acids plus dietary isoflavones.',
  },
  {
    id: 'recipe_chamomile_bedtime_elixir',
    title: 'Organic Chamomile & Magnesium Seed Crunch',
    category: 'snack',
    cuisine: 'mediterranean',
    calories: 140,
    protein: 6,
    carbs: 7,
    fats: 10,
    fiber: 2.5,
    prepTimeMinutes: 5,
    difficulty: 'Quick',
    dietTags: ['Vegetarian', 'Quick & Easy', 'Gluten-Free', 'Sleep-Support'],
    image: '/src/assets/images/herbal_tea_night_snack_1791387323890.jpg',
    ingredients: [
      { name: 'Organic Whole Egyptian Chamomile Blossoms', amount: '2 tsp or 1 bag' },
      { name: 'Raw Organic Pumpkin Seeds (Pepitas)', amount: '15g (1.5 tbsp)' },
      { name: '85% Single-Origin Dark Chocolate', amount: '10g (1 square)' },
      { name: 'Fresh Spring Water (heated to 95°C)', amount: '250ml (1 cup)' },
    ],
    instructions: [
      'Step 1: Heat Spring Water — Heat fresh water to 95°C (203°F, just under boiling) to avoid scalding delicate chamomile terpenes.',
      'Step 2: Steep Covered for Full Extraction — Place chamomile blossoms into a ceramic mug or infuser. Pour hot water and cover mug immediately with a small saucer. Steep covered for 5 to 7 minutes to trap volatile calming oils like bisabolol and chamazulene.',
      'Step 3: Portion Magnesium Seeds — Place 15g raw pumpkin seeds (pepitas) and 1 square of 85% dark chocolate into a small tasting bowl.',
      'Step 4: Uncover & Inhale Aromatics — Remove saucer and let steam condense back into the mug. Inhale the warm honey-apple floral aroma to trigger olfactory vagus nerve relaxation.',
      'Step 5: Enjoy 45 Minutes Before Sleep — Sip the warm golden infusion slowly while savoring the crunchy zinc and magnesium-packed pumpkin seeds and bitter cacao, supporting nighttime melatonin synthesis.',
    ],
    chefTip: 'Covering the mug while chamomile steeps traps volatile essential oils that would otherwise evaporate into the air.',
  },
  {
    id: 'recipe_italian_pesto_pasta',
    title: 'Italian High-Protein Basil Pesto & Grilled Chicken Penne',
    category: 'dinner',
    cuisine: 'italian',
    dishType: 'pasta',
    calories: 480,
    protein: 38,
    carbs: 48,
    fats: 15,
    fiber: 6.5,
    prepTimeMinutes: 18,
    difficulty: 'Easy',
    dietTags: ['Italian', 'Pasta', 'High-Protein', 'Meat & Poultry'],
    image: '/src/assets/images/italian_pesto_pasta_1791456276176.jpg',
    ingredients: [
      { name: 'Whole Grain or Protein Penne (dry)', amount: '65g (~1.5 cups cooked)' },
      { name: 'Grilled Chicken Breast (sliced strips)', amount: '140g' },
      { name: 'Fresh Genovese Basil Pesto', amount: '1.5 tbsp (25g)' },
      { name: 'Vine Sweet Cherry Tomatoes (halved)', amount: '1/2 cup (80g)' },
      { name: 'Toasted Italian Pine Nuts', amount: '1 tbsp (10g)' },
      { name: 'Shaved Parmigiano-Reggiano', amount: '15g' },
      { name: 'Fresh Garlic & Crushed Red Pepper', amount: '1 clove + pinch' },
    ],
    instructions: [
      'Step 1: Boil Pasta Al Dente — Bring a pot of salted water to a rolling boil. Cook penne pasta for 9 minutes until perfectly al dente. Reserve 3 tbsp starchy pasta cooking water before draining.',
      'Step 2: Sear & Slice Chicken — Season chicken breast with sea salt and black pepper; sear in a skillet with 1/2 tsp olive oil for 5 minutes per side until golden. Slice into strips.',
      'Step 3: Blister Tomatoes & Garlic — In the skillet, quickly toss sliced garlic and cherry tomatoes for 90 seconds until slightly blistered and fragrant.',
      'Step 4: Toss Pasta & Emulsify Pesto — Add warm drained penne to the pan along with fresh basil pesto and the reserved pasta water. Toss gently over low heat for 1 minute until a silky, glossy coating clings to every ridge of the penne.',
      'Step 5: Assemble & Garnish — Transfer pasta to a warm pasta bowl. Top with warm grilled chicken strips, scatter toasted pine nuts, sprinkle shaved Parmigiano-Reggiano, and garnish with fresh basil sprigs.',
    ],
    chefTip: 'Reserving starchy pasta water emulsifies the pesto into a luxurious sauce that clings to pasta instead of pooling oil at the bottom.',
  },
  {
    id: 'recipe_mediterranean_garlic_shrimp_linguine',
    title: 'Mediterranean Lemon Garlic Shrimp Linguine',
    category: 'supper',
    cuisine: 'mediterranean',
    dishType: 'pasta',
    calories: 440,
    protein: 34,
    carbs: 50,
    fats: 11.5,
    fiber: 5.2,
    prepTimeMinutes: 18,
    difficulty: 'Easy',
    dietTags: ['Mediterranean', 'Pasta', 'Fish & Seafood', 'High-Protein'],
    image: '/src/assets/images/italian_pesto_pasta_1791456276176.jpg',
    ingredients: [
      { name: 'Artisan Bronze-Die Linguine', amount: '60g dry' },
      { name: 'Wild Jumbo Shrimp (peeled & deveined)', amount: '160g' },
      { name: 'Fresh Baby Spinach', amount: '2 cups packed' },
      { name: 'Garlic Cloves (thinly sliced)', amount: '3 cloves' },
      { name: 'Cold-Pressed Extra Virgin Olive Oil', amount: '1 tbsp (15ml)' },
      { name: 'Fresh Lemon Juice & Zest', amount: '1 tbsp + 1/2 tsp' },
      { name: 'Dry White Wine or Seafood Stock', amount: '2 tbsp' },
      { name: 'Fresh Parsley & Crushed Chili Flakes', amount: '2 tbsp + pinch' },
    ],
    instructions: [
      'Step 1: Cook Linguine Al Dente — Simmer linguine in generously salted boiling water for 8 minutes until tender with a firm bite. Save 1/4 cup pasta water.',
      'Step 2: Sizzle Garlic & Sauté Shrimp — Heat olive oil in a wide skillet over medium-high. Add sliced garlic and red pepper flakes; sizzle for 30 seconds until aromatic. Add shrimp in a single layer and sear for 2 minutes per side until pink and curled.',
      'Step 3: Deglaze with Lemon & Wine — Pour white wine and lemon juice into pan, simmering for 1 minute to build an aromatic scampi reduction.',
      'Step 4: Wilt Spinach & Fold Pasta — Add fresh baby spinach and drained linguine directly into the pan with a splash of reserved pasta water. Toss vigorously for 1 minute until spinach wilts and glossy sauce coats the strands.',
      'Step 5: Finish & Plate — Twirl linguine into a pasta nest. Top with succulent seared shrimp, grate fresh lemon zest over the top, and finish with chopped flat-leaf parsley.',
    ],
    chefTip: 'Cooking shrimp quickly over high heat keeps them tender and juicy without releasing excess water into the pasta sauce.',
  },
  {
    id: 'recipe_tuscan_white_bean_soup',
    title: 'Hearty Tuscan Kale & Cannellini Bean Minestrone Soup',
    category: 'dinner',
    cuisine: 'italian',
    dishType: 'soup',
    calories: 360,
    protein: 19,
    carbs: 52,
    fats: 8.5,
    fiber: 13,
    prepTimeMinutes: 22,
    difficulty: 'Easy',
    dietTags: ['Italian', 'Soup', 'Vegetarian', 'High-Fiber', 'Something Vegan'],
    image: '/src/assets/images/tuscan_bean_soup_1791456292296.jpg',
    ingredients: [
      { name: 'Organic Cannellini White Beans (rinsed)', amount: '1 cup (180g)' },
      { name: 'Tuscan Lacinato Kale (chopped)', amount: '2 cups packed' },
      { name: 'San Marzano Crushed Tomatoes', amount: '1/2 cup (120ml)' },
      { name: 'Diced Mirepoix (Carrot, Celery, Sweet Onion)', amount: '1 cup mixed' },
      { name: 'Low-Sodium Vegetable Broth', amount: '2 cups (480ml)' },
      { name: 'Fresh Rosemary & Thyme Sprigs', amount: '1 sprig each' },
      { name: 'Extra Virgin Olive Oil & Lemon', amount: '1 tsp + squeeze' },
    ],
    instructions: [
      'Step 1: Sauté Aromatic Base — Warm 1 tsp olive oil in a heavy soup pot over medium heat. Add diced onion, carrot, and celery with a pinch of sea salt. Sauté for 5 minutes until vegetables soften and turn sweet.',
      'Step 2: Simmer Broth with Herbs — Add crushed San Marzano tomatoes, vegetable broth, fresh rosemary, and thyme. Bring to a boil, then reduce heat to medium-low.',
      'Step 3: Add Cannellini Beans & Mash Half — Add rinsed cannellini beans. Take a potato masher or back of a ladle and lightly crush about one-third of the beans against the bottom of the pot; this thickens the broth naturally into a creamy texture without heavy cream.',
      'Step 4: Simmer Tuscan Kale — Stir in chopped Tuscan kale. Simmer gently for 8 to 10 minutes until kale is tender and flavors meld together.',
      'Step 5: Season & Ladle — Remove herb sprigs. Stir in a squeeze of fresh lemon juice, black pepper, and ladle piping hot into rustic soup bowls. Finish with a delicate swirl of extra virgin olive oil.',
    ],
    chefTip: 'Mashing a small portion of the cannellini beans creates a naturally thick and velvety soup broth without needing cornstarch or flour.',
  },
  {
    id: 'recipe_lemon_chicken_orzo_soup',
    title: 'Greek Lemon Chicken & Dill Avgolemono Soup',
    category: 'lunch',
    cuisine: 'mediterranean',
    dishType: 'soup',
    calories: 390,
    protein: 35,
    carbs: 38,
    fats: 10.5,
    fiber: 4.5,
    prepTimeMinutes: 20,
    difficulty: 'Easy',
    dietTags: ['Mediterranean', 'Soup', 'High-Protein', 'Comfort-Food'],
    image: '/src/assets/images/tuscan_bean_soup_1791456292296.jpg',
    ingredients: [
      { name: 'Poached Shredded Chicken Breast', amount: '150g' },
      { name: 'Whole Grain Orzo Pasta', amount: '45g (~1/2 cup cooked)' },
      { name: 'Low-Sodium Golden Chicken Bone Broth', amount: '2 cups (480ml)' },
      { name: 'Fresh Whole Egg & Egg White', amount: '1 egg + 1 white' },
      { name: 'Fresh Lemon Juice & Lemon Zest', amount: '2 tbsp + 1/2 tsp' },
      { name: 'Fresh Dill (chopped)', amount: '2 tbsp' },
      { name: 'Diced Carrots & Celery', amount: '1/2 cup' },
    ],
    instructions: [
      'Step 1: Simmer Broth & Veggies — Bring chicken bone broth to a boil with finely diced carrots and celery. Cook for 5 minutes until tender.',
      'Step 2: Cook Orzo — Add whole grain orzo directly into simmering broth and cook for 7 minutes until tender.',
      'Step 3: Whisk Egg-Lemon Mixture (Avgolemono) — In a medium heat-proof bowl, vigorously whisk the egg, egg white, and fresh lemon juice until frothy and pale yellow.',
      'Step 4: Temper the Eggs — Slowly ladle 1/2 cup of hot simmering broth into the egg mixture in a steady stream while whisking continuously. This gradually warms the eggs so they do not scramble when added to the pot.',
      'Step 5: Fold into Soup & Add Chicken — Turn pot heat to low. Pour tempered egg-lemon mixture back into the soup, stirring constantly for 1 minute until broth transforms into a creamy, golden velvet. Fold in shredded poached chicken and fresh dill.',
      'Step 6: Serve Warm — Ladle into deep bowls, finish with fresh cracked black pepper and a sprig of dill.',
    ],
    chefTip: 'Tempering the egg-lemon mixture with a ladle of hot broth before pouring it in guarantees a silky restaurant-quality soup without curdling.',
  },
];

export const SAMPLE_COMMUNITY_RECIPES: MealRecipe[] = [
  {
    id: 'community_recipe_avocado_toast',
    title: 'Protein Power Sourdough & Poached Egg Stack',
    category: 'breakfast',
    cuisine: 'californian',
    calories: 380,
    protein: 24,
    carbs: 32,
    fats: 16,
    fiber: 7,
    prepTimeMinutes: 12,
    difficulty: 'Easy',
    dietTags: ['Community Recipe', 'High-Protein', 'Vegetarian'],
    image: '/src/assets/images/breakfast_egg_toast_1791375494924.jpg',
    ingredients: [
      { name: 'Toasted Spelt Sourdough Slice', amount: '1 thick slice (50g)' },
      { name: 'Organic Pasture-Raised Eggs', amount: '2 large' },
      { name: 'Hass Avocado', amount: '1/2 medium (65g)' },
      { name: 'Microgreens & Hemp Hearts', amount: '1 tbsp' },
      { name: 'Crushed Red Pepper Flakes', amount: '1 pinch' },
    ],
    instructions: [
      'Step 1: Toast sourdough slice until deeply golden.',
      'Step 2: Mash avocado with lemon juice, sea salt, and black pepper; spread generously over toast.',
      'Step 3: Poach eggs in simmering water with 1 tbsp vinegar for 3 minutes until whites are set and yolks are runny.',
      'Step 4: Top toast with eggs, sprinkle hemp hearts and microgreens.',
    ],
    chefTip: 'Sprinkling hemp seeds adds 3g of complete plant protein plus omega-3 ALA fatty acids.',
    isUserCustom: true,
    visibility: 'community',
    authorId: 'community_chef_elena',
    authorName: 'Chef Elena M.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'community_recipe_turmeric_lentils',
    title: 'Golden Coconut Turmeric Dal with Baby Spinach',
    category: 'dinner',
    cuisine: 'indian',
    calories: 420,
    protein: 22,
    carbs: 58,
    fats: 12,
    fiber: 14,
    prepTimeMinutes: 25,
    difficulty: 'Moderate',
    dietTags: ['Community Recipe', 'Vegan', 'Anti-Inflammatory', 'High-Fiber'],
    image: '/src/assets/images/vegan_harvest_bowl_1791375550373.jpg',
    ingredients: [
      { name: 'Red Split Lentils (rinsed)', amount: '100g dry' },
      { name: 'Light Coconut Milk', amount: '100ml' },
      { name: 'Fresh Baby Spinach', amount: '2 cups' },
      { name: 'Ground Turmeric & Ginger Root', amount: '1 tsp each' },
      { name: 'Cumin Seeds & Mustard Seeds', amount: '1/2 tsp each' },
    ],
    instructions: [
      'Step 1: Simmer lentils in 300ml vegetable broth with turmeric and ginger for 15 minutes until creamy.',
      'Step 2: Bloom cumin and mustard seeds in 1 tsp avocado oil in a small pan until fragrant.',
      'Step 3: Stir light coconut milk and fresh spinach into the lentils until wilted.',
      'Step 4: Pour bloomed spices over dal and serve warm.',
    ],
    chefTip: 'Curcumin in turmeric absorbs up to 2000% better when paired with black pepper and gentle healthy fats.',
    isUserCustom: true,
    visibility: 'community',
    authorId: 'community_chef_marcus',
    authorName: 'Dr. Marcus Vance',
    createdAt: Date.now() - 86400000 * 4,
  },
];

export function getSavedCustomRecipes(): MealRecipe[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('nutritrack_custom_recipes');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function getCachedCommunityRecipes(): MealRecipe[] {
  if (typeof window === 'undefined') return SAMPLE_COMMUNITY_RECIPES;
  try {
    const saved = localStorage.getItem('nutritrack_community_recipes');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return SAMPLE_COMMUNITY_RECIPES;
}

export function setCachedCommunityRecipes(recipes: MealRecipe[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('nutritrack_community_recipes', JSON.stringify(recipes));
  } catch (e) {}
}

export function saveCustomRecipeToDatabase(recipe: MealRecipe): void {
  const current = getSavedCustomRecipes();
  const filtered = current.filter((r) => r.id !== recipe.id);
  const updated = [recipe, ...filtered];
  localStorage.setItem('nutritrack_custom_recipes', JSON.stringify(updated));

  // If marked community, also update community cache so it appears immediately
  if (recipe.visibility === 'community') {
    const currentCommunity = getCachedCommunityRecipes();
    const filteredComm = currentCommunity.filter((r) => r.id !== recipe.id);
    setCachedCommunityRecipes([recipe, ...filteredComm]);
  }
}

export function deleteCustomRecipeFromDatabase(recipeId: string): void {
  const current = getSavedCustomRecipes();
  const updated = current.filter((r) => r.id !== recipeId);
  localStorage.setItem('nutritrack_custom_recipes', JSON.stringify(updated));

  const currentCommunity = getCachedCommunityRecipes();
  const updatedComm = currentCommunity.filter((r) => r.id !== recipeId);
  setCachedCommunityRecipes(updatedComm);
}

export function getAllRecipes(extraCommunityRecipes?: MealRecipe[]): MealRecipe[] {
  const custom = getSavedCustomRecipes();
  const community = extraCommunityRecipes && extraCommunityRecipes.length > 0 
    ? extraCommunityRecipes 
    : getCachedCommunityRecipes();

  // Combine and deduplicate by id
  const map = new Map<string, MealRecipe>();
  
  // Custom user recipes take highest precedence
  custom.forEach((r) => map.set(r.id, r));
  // Community recipes next
  community.forEach((r) => {
    if (!map.has(r.id)) map.set(r.id, r);
  });
  // Master chef database
  RECIPE_DATABASE.forEach((r) => {
    if (!map.has(r.id)) map.set(r.id, r);
  });

  return Array.from(map.values());
}

export interface CuisineOption {
  id: string;
  label: string;
  flag: string;
}

export interface DishTypeOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const CUISINE_OPTIONS: CuisineOption[] = [
  { id: 'all', label: 'All Cuisines', flag: '🌍' },
  { id: 'mediterranean', label: 'Mediterranean', flag: '🫒' },
  { id: 'italian', label: 'Italian', flag: '🇮🇹' },
  { id: 'japanese', label: 'Japanese', flag: '🇯🇵' },
  { id: 'mexican', label: 'Mexican', flag: '🇲🇽' },
  { id: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { id: 'thai', label: 'Thai', flag: '🇹🇭' },
  { id: 'middle_eastern', label: 'Middle Eastern', flag: '🧆' },
  { id: 'indian', label: 'Indian', flag: '🍛' },
  { id: 'californian', label: 'American / Cali', flag: '🇺🇸' },
];

export const DISH_TYPE_OPTIONS: DishTypeOption[] = [
  { id: 'all', label: 'All Types', icon: '🍽️', description: 'All meal choices' },
  { id: 'pasta', label: 'Pasta & Noodles', icon: '🍝', description: 'Penne, linguine, orzo & noodles' },
  { id: 'soup', label: 'Soups & Stews', icon: '🍲', description: 'Minestrone, broth, avgolemono & dal' },
  { id: 'salad', label: 'Salads & Greens', icon: '🥗', description: 'Fresh greens, bowls & slaws' },
  { id: 'bowl', label: 'Bowls & Grains', icon: '🥣', description: 'Quinoa, bento & grain power bowls' },
  { id: 'sandwich', label: 'Toast & Wraps', icon: '🥪', description: 'Sourdough, toasts & wraps' },
  { id: 'grill', label: 'Grills & Roasts', icon: '🥩', description: 'Steak, chicken cutlets & roasted meat' },
  { id: 'seafood', label: 'Seafood & Fish', icon: '🐟', description: 'Salmon, sea bass & prawns' },
  { id: 'breakfast', label: 'Breakfast & Oats', icon: '🥞', description: 'Oatmeal, power bowls & parfaits' },
  { id: 'snack', label: 'Snacks & Elixirs', icon: '🍵', description: 'Edamame, nuts & soothing teas' },
];

export function resolveDishType(recipe: MealRecipe): string {
  if (recipe.dishType) return recipe.dishType.toLowerCase();

  const title = (recipe.title || '').toLowerCase();
  const tags = (recipe.dietTags || []).map((t) => t.toLowerCase()).join(' ');
  const ing = (recipe.ingredients || []).map((i) => i.name.toLowerCase()).join(' ');
  const text = `${title} ${tags} ${ing}`;

  if (
    text.includes('pasta') ||
    text.includes('penne') ||
    text.includes('linguine') ||
    text.includes('spaghetti') ||
    text.includes('noodle') ||
    text.includes('orzo') ||
    text.includes('macaroni') ||
    text.includes('soba')
  ) {
    return 'pasta';
  }
  if (
    text.includes('soup') ||
    text.includes('minestrone') ||
    text.includes('stew') ||
    text.includes('broth') ||
    text.includes('dal') ||
    text.includes('avgolemono') ||
    text.includes('chowder')
  ) {
    return 'soup';
  }
  if (
    text.includes('salad') ||
    text.includes('greens') ||
    text.includes('slaw') ||
    text.includes('caesar') ||
    text.includes('caprese')
  ) {
    return 'salad';
  }
  if (
    text.includes('toast') ||
    text.includes('sandwich') ||
    text.includes('wrap') ||
    text.includes('burger') ||
    text.includes('panini')
  ) {
    return 'sandwich';
  }
  if (
    recipe.category === 'breakfast' ||
    text.includes('oat') ||
    text.includes('oatmeal') ||
    text.includes('parfait') ||
    text.includes('chia power')
  ) {
    return 'breakfast';
  }
  if (
    text.includes('bowl') ||
    text.includes('bento') ||
    text.includes('mezze') ||
    text.includes('quinoa')
  ) {
    return 'bowl';
  }
  if (
    text.includes('salmon') ||
    text.includes('shrimp') ||
    text.includes('sea bass') ||
    text.includes('fish') ||
    text.includes('seafood')
  ) {
    return 'seafood';
  }
  if (
    text.includes('steak') ||
    text.includes('sirloin') ||
    text.includes('pollo') ||
    text.includes('chicken') ||
    text.includes('grill')
  ) {
    return 'grill';
  }
  if (
    recipe.category === 'snack' ||
    text.includes('snack') ||
    text.includes('tea') ||
    text.includes('elixir') ||
    text.includes('edamame')
  ) {
    return 'snack';
  }

  return 'bowl';
}


