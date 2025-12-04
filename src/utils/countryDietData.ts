// Country diet plans with local food culture

export interface CountryDietMeal {
  name: string;
  description: string;
  calories: number;
  protein: string;
  type: 'veg' | 'non-veg'; // Diet type for filtering
}

export interface CountryDiet {
  code: string;
  name: string;
  flag: string;
  description: string;
  breakfast: CountryDietMeal[];
  lunch: CountryDietMeal[];
  snacks: CountryDietMeal[];
  dinner: CountryDietMeal[];
}

// Helper function to filter meals by diet preference
export function filterMealsByDietType(
  meals: CountryDietMeal[],
  dietPreference: string
): CountryDietMeal[] {
  if (dietPreference === 'vegetarian' || dietPreference === 'veg') {
    return meals.filter(meal => meal.type === 'veg');
  }
  if (dietPreference === 'non-vegetarian' || dietPreference === 'non-veg') {
    return meals.filter(meal => meal.type === 'non-veg');
  }
  // 'both' or any other value returns all meals
  return meals;
}

export const countries: CountryDiet[] = [
  {
    code: 'india',
    name: 'India',
    flag: '🇮🇳',
    description: 'Explore state-specific regional diets from across India',
    breakfast: [], // Will use state-specific data
    lunch: [],
    snacks: [],
    dinner: []
  },
  {
    code: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    description: 'High-protein American diet targeting 120–150g protein daily with diverse options',
    breakfast: [
      { name: 'Scrambled Eggs & Turkey Bacon', description: 'Fluffy scrambled eggs with crispy turkey bacon and whole wheat toast', calories: 350, protein: '30g', type: 'non-veg' },
      { name: 'Greek Yogurt Parfait', description: 'Greek yogurt layered with granola, berries, and honey', calories: 280, protein: '26g', type: 'veg' },
      { name: 'Protein Smoothie', description: 'Banana, berries, protein powder, and almond milk blend', calories: 320, protein: '33g', type: 'veg' },
      { name: 'Oatmeal + Chia + Blueberries', description: 'Steel-cut oats with chia seeds and fresh blueberries', calories: 290, protein: '18g', type: 'veg' },
      { name: 'Egg-white Omelet (Spinach & Feta)', description: 'Fluffy egg-white omelet filled with spinach and feta cheese', calories: 260, protein: '28g', type: 'veg' },
      { name: 'Whole-wheat Pancakes', description: 'Stack of whole-wheat pancakes with maple syrup', calories: 340, protein: '17g', type: 'veg' },
      { name: 'Cottage Cheese + Peaches + Almonds', description: 'Cottage cheese topped with fresh peaches and sliced almonds', calories: 270, protein: '26g', type: 'veg' },
      { name: 'Avocado Toast + Poached Eggs', description: 'Whole grain toast with smashed avocado and poached eggs', calories: 350, protein: '21g', type: 'veg' },
      { name: 'Breakfast Burrito', description: 'Scrambled eggs, black beans, cheese, and salsa in a whole wheat tortilla', calories: 380, protein: '24g', type: 'veg' },
      { name: 'PB & Banana Sandwich', description: 'Peanut butter and banana on whole grain bread', calories: 320, protein: '17g', type: 'veg' }
    ],
    lunch: [
      { name: 'Grilled Chicken + Rice + Broccoli', description: 'Grilled chicken breast with brown rice and steamed broccoli', calories: 520, protein: '46g', type: 'non-veg' },
      { name: 'Turkey Sandwich', description: 'Whole grain bread with turkey, lettuce, tomato, and mustard', calories: 420, protein: '39g', type: 'non-veg' },
      { name: 'Tuna Salad + Crackers', description: 'Tuna salad with mixed greens and whole grain crackers', calories: 380, protein: '33g', type: 'non-veg' },
      { name: 'Chicken Caesar Salad', description: 'Romaine lettuce with grilled chicken, parmesan, and Caesar dressing', calories: 450, protein: '46g', type: 'non-veg' },
      { name: 'Quinoa & Shrimp Bowl', description: 'Quinoa with grilled shrimp, avocado, and lime dressing', calories: 420, protein: '31g', type: 'non-veg' },
      { name: 'Grilled Salmon Plate', description: 'Grilled salmon with quinoa and roasted vegetables', calories: 490, protein: '42g', type: 'non-veg' },
      { name: 'Beef Stir-Fry', description: 'Lean beef stir-fried with mixed vegetables over rice', calories: 480, protein: '36g', type: 'non-veg' },
      { name: 'Veggie Wrap + Hummus', description: 'Whole wheat wrap with veggies, hummus, and mixed greens', calories: 320, protein: '12g', type: 'veg' },
      { name: 'Burrito Bowl', description: 'Rice, black beans, chicken, salsa, and guacamole bowl', calories: 510, protein: '37g', type: 'non-veg' },
      { name: 'BBQ Chicken + Corn + Beans', description: 'BBQ chicken breast with corn on the cob and baked beans', calories: 520, protein: '43g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Protein Bar', description: 'High-protein energy bar with nuts and dark chocolate', calories: 220, protein: '20g', type: 'veg' },
      { name: 'Apple + Almond Butter', description: 'Fresh apple slices with almond butter', calories: 180, protein: '5g', type: 'veg' },
      { name: 'Mixed Nuts', description: 'Handful of almonds, cashews, and walnuts', calories: 170, protein: '6g', type: 'veg' },
      { name: 'Rice Cakes + PB', description: 'Rice cakes topped with peanut butter', calories: 190, protein: '7g', type: 'veg' },
      { name: 'String Cheese + Crackers', description: 'String cheese with whole grain crackers', calories: 180, protein: '8g', type: 'veg' },
      { name: 'Boiled Eggs (2)', description: 'Two hard-boiled eggs', calories: 140, protein: '12g', type: 'veg' },
      { name: 'Carrots + Hummus', description: 'Baby carrots with hummus dip', calories: 120, protein: '5g', type: 'veg' },
      { name: 'Greek Yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '15g', type: 'veg' },
      { name: 'Popcorn', description: 'Air-popped popcorn', calories: 100, protein: '4g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame with sea salt', calories: 150, protein: '12g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Steak + Mash + Beans', description: 'Grilled steak with mashed potatoes and green beans', calories: 620, protein: '52g', type: 'non-veg' },
      { name: 'Baked Chicken + Veg', description: 'Oven-baked chicken breast with roasted vegetables', calories: 480, protein: '40g', type: 'non-veg' },
      { name: 'Salmon + Quinoa + Spinach', description: 'Baked salmon with quinoa and sautéed spinach', calories: 510, protein: '42g', type: 'non-veg' },
      { name: 'Ground Turkey Chili', description: 'Hearty ground turkey chili with beans and spices', calories: 450, protein: '38g', type: 'non-veg' },
      { name: 'Chicken Fajitas', description: 'Chicken fajitas with peppers, onions, and whole wheat tortillas', calories: 490, protein: '40g', type: 'non-veg' },
      { name: 'Shrimp Pasta', description: 'Whole wheat pasta with garlic shrimp and marinara sauce', calories: 460, protein: '35g', type: 'non-veg' },
      { name: 'Veggie Burger', description: 'Plant-based veggie burger with sweet potato fries', calories: 420, protein: '20g', type: 'veg' },
      { name: 'Pulled Chicken Sandwich', description: 'Pulled chicken sandwich on whole grain bun with coleslaw', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Beef Tacos (2)', description: 'Two beef tacos with lettuce, tomato, and cheese', calories: 440, protein: '34g', type: 'non-veg' },
      { name: 'Baked Tofu Bowl', description: 'Baked tofu with brown rice, veggies, and teriyaki sauce', calories: 410, protein: '30g', type: 'veg' }
    ]
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'High-protein British diet targeting ~130g protein daily with traditional favorites',
    breakfast: [
      { name: 'Light English Breakfast', description: 'Poached egg, grilled tomato, mushrooms, and toast', calories: 340, protein: '29g', type: 'veg' },
      { name: 'Porridge + Milk + Whey', description: 'Creamy oat porridge with milk and whey protein powder', calories: 380, protein: '39g', type: 'veg' },
      { name: 'Greek Yogurt Bowl', description: 'Greek yogurt with granola and mixed berries', calories: 280, protein: '25g', type: 'veg' },
      { name: 'Protein Smoothie', description: 'Banana, berries, protein powder, and oat milk blend', calories: 310, protein: '32g', type: 'veg' },
      { name: 'Scrambled Eggs on Toast', description: 'Scrambled eggs on whole grain toast', calories: 320, protein: '26g', type: 'veg' },
      { name: 'Cottage Cheese & Berries', description: 'Cottage cheese topped with fresh berries', calories: 260, protein: '27g', type: 'veg' },
      { name: 'Avocado Toast + Poached Eggs', description: 'Smashed avocado on toast with poached eggs', calories: 350, protein: '25g', type: 'veg' },
      { name: 'Protein Pancakes', description: 'High-protein pancakes with Greek yogurt', calories: 340, protein: '29g', type: 'veg' },
      { name: 'Smoked Salmon & Egg Toast', description: 'Smoked salmon and scrambled eggs on toast', calories: 380, protein: '34g', type: 'non-veg' },
      { name: 'Overnight Oats + Whey', description: 'Overnight oats with whey protein and chia seeds', calories: 360, protein: '39g', type: 'veg' }
    ],
    lunch: [
      { name: 'Chicken & Rice Bowl', description: 'Grilled chicken with basmati rice and vegetables', calories: 480, protein: '40g', type: 'non-veg' },
      { name: 'Tuna Mayo Sandwich', description: 'Tuna mayo on wholemeal bread with cucumber', calories: 390, protein: '33g', type: 'non-veg' },
      { name: 'Chicken & Quinoa Salad', description: 'Grilled chicken with quinoa and mixed greens', calories: 420, protein: '34g', type: 'non-veg' },
      { name: 'Salmon + Sweet Potato', description: 'Baked salmon with roasted sweet potato and greens', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Beef Stir-Fry', description: 'Lean beef stir-fried with vegetables and rice', calories: 480, protein: '36g', type: 'non-veg' },
      { name: 'Turkey Wrap', description: 'Whole wheat wrap with turkey, salad, and hummus', calories: 420, protein: '37g', type: 'non-veg' },
      { name: 'Egg Fried Rice + Prawns', description: 'Egg fried rice with king prawns and vegetables', calories: 460, protein: '39g', type: 'non-veg' },
      { name: 'Cottage Pie (lean)', description: 'Lean beef cottage pie with mashed potato topping', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Chicken Pasta Salad', description: 'Whole wheat pasta with chicken and vegetables', calories: 430, protein: '35g', type: 'non-veg' },
      { name: 'Lentil Soup + Toast (with chicken)', description: 'Hearty lentil soup with chicken and wholemeal toast', calories: 410, protein: '36g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Protein Bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Greek Yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled Eggs (3)', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Cottage Cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'Apple + PB', description: 'Apple slices with peanut butter', calories: 180, protein: '7g', type: 'veg' },
      { name: 'Protein Smoothie', description: 'Quick protein shake with fruit', calories: 240, protein: '25g', type: 'veg' },
      { name: 'Tuna Pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '24g', type: 'non-veg' },
      { name: 'String Cheese', description: 'Two string cheese sticks', calories: 160, protein: '12g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame beans', calories: 150, protein: '12g', type: 'veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Steak + Veg', description: 'Grilled sirloin steak with seasonal vegetables', calories: 520, protein: '42g', type: 'non-veg' },
      { name: 'Baked Chicken + Mash', description: 'Oven-baked chicken with mashed potatoes', calories: 480, protein: '39g', type: 'non-veg' },
      { name: 'Fish & Veg', description: 'Baked cod with roasted vegetables', calories: 460, protein: '39g', type: 'non-veg' },
      { name: 'Turkey Mince Chili', description: 'Lean turkey mince chili with beans', calories: 470, protein: '41g', type: 'non-veg' },
      { name: 'Tofu Stir-Fry', description: 'Marinated tofu stir-fried with vegetables', calories: 380, protein: '25g', type: 'veg' },
      { name: 'Cottage Pie (evening)', description: 'Traditional cottage pie with lean mince', calories: 450, protein: '36g', type: 'non-veg' },
      { name: 'Chicken Fajitas', description: 'Chicken fajitas with peppers and onions', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon & Veg Stir-Fry', description: 'Salmon stir-fried with mixed vegetables', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Baked Tofu Bowl', description: 'Baked tofu with rice and vegetables', calories: 400, protein: '26g', type: 'veg' },
      { name: 'Beef Burger + Sweet Potato Fries', description: 'Lean beef burger with sweet potato fries', calories: 510, protein: '38g', type: 'non-veg' }
    ]
  },
  {
    code: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    description: 'High-protein Canadian diet targeting ~130–140g protein daily with multicultural influences',
    breakfast: [
      { name: 'Egg & Turkey Bacon Plate', description: 'Scrambled eggs with turkey bacon and whole grain toast', calories: 350, protein: '30g', type: 'non-veg' },
      { name: 'Greek Yogurt Parfait', description: 'Greek yogurt layered with granola and berries', calories: 280, protein: '26g', type: 'veg' },
      { name: 'Protein Smoothie (Canadian Style)', description: 'Maple-flavored protein smoothie with banana and oats', calories: 310, protein: '28g', type: 'veg' },
      { name: 'Oatmeal + PB (+ optional whey +25g)', description: 'Steel-cut oats with peanut butter', calories: 340, protein: '20g', type: 'veg' },
      { name: 'Egg-white Omelette (Spinach & Cheddar)', description: 'Fluffy egg-white omelette with spinach and cheddar', calories: 270, protein: '27g', type: 'veg' },
      { name: 'Cottage Cheese Bowl', description: 'Cottage cheese with fresh fruit and almonds', calories: 280, protein: '28g', type: 'veg' },
      { name: 'Smoked Salmon Toast + Eggs', description: 'Smoked salmon on toast with scrambled eggs', calories: 390, protein: '36g', type: 'non-veg' },
      { name: 'Protein Pancakes', description: 'Whole wheat protein pancakes with maple syrup', calories: 320, protein: '23g', type: 'veg' },
      { name: 'Bagel + Cream Cheese + Eggs', description: 'Whole grain bagel with cream cheese and poached eggs', calories: 380, protein: '25g', type: 'veg' },
      { name: 'Overnight Oats + Chia + Milk + Whey', description: 'Overnight oats with chia, milk, and whey protein', calories: 350, protein: '30g', type: 'veg' }
    ],
    lunch: [
      { name: 'Grilled Chicken & Rice Bowl', description: 'Grilled chicken with brown rice and vegetables', calories: 490, protein: '41g', type: 'non-veg' },
      { name: 'Turkey Wrap', description: 'Whole wheat turkey wrap with veggies and mustard', calories: 420, protein: '36g', type: 'non-veg' },
      { name: 'Tuna Salad Sandwich', description: 'Tuna salad on whole grain bread with lettuce', calories: 390, protein: '34g', type: 'non-veg' },
      { name: 'Chicken Quinoa Salad', description: 'Grilled chicken with quinoa and mixed greens', calories: 420, protein: '34g', type: 'non-veg' },
      { name: 'Salmon & Sweet Potato', description: 'Baked salmon with roasted sweet potato', calories: 460, protein: '37g', type: 'non-veg' },
      { name: 'Beef Burrito Bowl', description: 'Lean beef with rice, beans, and guacamole', calories: 480, protein: '35g', type: 'non-veg' },
      { name: 'Tofu Power Bowl', description: 'Marinated tofu with quinoa and roasted vegetables', calories: 410, protein: '30g', type: 'veg' },
      { name: 'Grilled Shrimp Wrap', description: 'Whole wheat wrap with grilled shrimp and veggies', calories: 380, protein: '29g', type: 'non-veg' },
      { name: 'Chicken Pasta (Whole Wheat)', description: 'Whole wheat pasta with grilled chicken and marinara', calories: 450, protein: '35g', type: 'non-veg' },
      { name: 'Baked Cod & Veggies', description: 'Oven-baked cod with seasonal vegetables', calories: 420, protein: '35g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Protein Bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Greek Yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled Eggs (3)', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Cottage Cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'PB on Rice Cakes', description: 'Peanut butter on rice cakes', calories: 200, protein: '10g', type: 'veg' },
      { name: 'Whey Shake', description: 'Whey protein shake with water or milk', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Tuna Pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' },
      { name: 'Almonds', description: 'Handful of roasted almonds', calories: 170, protein: '10g', type: 'veg' },
      { name: 'Cheese Sticks (2) + Apple', description: 'Two cheese sticks with an apple', calories: 200, protein: '12g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Steak & Veg', description: 'Grilled steak with roasted vegetables', calories: 540, protein: '44g', type: 'non-veg' },
      { name: 'Baked Chicken & Rice', description: 'Oven-baked chicken with brown rice', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon & Veg', description: 'Baked salmon with steamed vegetables', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Turkey Mince Stir-Fry', description: 'Lean turkey mince stir-fried with vegetables', calories: 460, protein: '39g', type: 'non-veg' },
      { name: 'Lentil Soup with Chicken', description: 'Hearty lentil soup with added chicken', calories: 420, protein: '36g', type: 'non-veg' },
      { name: 'Tofu Rice Bowl', description: 'Marinated tofu with brown rice and veggies', calories: 400, protein: '27g', type: 'veg' },
      { name: 'Beef Stir-Fry', description: 'Lean beef stir-fried with mixed vegetables', calories: 470, protein: '34g', type: 'non-veg' },
      { name: 'Shrimp Pasta', description: 'Whole wheat pasta with garlic shrimp', calories: 450, protein: '32g', type: 'non-veg' },
      { name: 'BBQ Chicken Sandwich', description: 'BBQ chicken on whole grain bun with coleslaw', calories: 460, protein: '34g', type: 'non-veg' },
      { name: 'Veg & Lentil Curry + Rice', description: 'Vegetable and lentil curry with basmati rice', calories: 410, protein: '29g', type: 'veg' }
    ]
  },
  {
    code: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    description: 'High-protein Australian diet targeting 120–150g protein daily with fresh, healthy options',
    breakfast: [
      { name: 'Vegemite Toast & Eggs', description: 'Whole grain toast with vegemite and scrambled eggs', calories: 300, protein: '22g', type: 'veg' },
      { name: 'Greek Yoghurt Bowl', description: 'Greek yoghurt with granola and mixed berries', calories: 280, protein: '25g', type: 'veg' },
      { name: 'Protein Smoothie', description: 'Banana, mango, protein powder, and coconut water', calories: 310, protein: '28g', type: 'veg' },
      { name: 'Oats & Chia + Milk + Whey', description: 'Oats with chia seeds, milk, and whey protein', calories: 340, protein: '29g', type: 'veg' },
      { name: 'Poached Eggs & Avo Toast', description: 'Poached eggs on avocado toast', calories: 340, protein: '21g', type: 'veg' },
      { name: 'Cottage Cheese & Berries', description: 'Cottage cheese topped with fresh berries', calories: 260, protein: '25g', type: 'veg' },
      { name: 'Protein Pancakes', description: 'High-protein pancakes with Greek yoghurt', calories: 370, protein: '36g', type: 'veg' },
      { name: 'Smoked Salmon Bagel', description: 'Smoked salmon on a whole grain bagel with cream cheese', calories: 360, protein: '30g', type: 'non-veg' },
      { name: 'Tofu Scramble on Toast', description: 'Scrambled tofu on wholegrain toast', calories: 300, protein: '22g', type: 'veg' },
      { name: 'Overnight Oats with Whey', description: 'Overnight oats with whey protein and berries', calories: 360, protein: '39g', type: 'veg' }
    ],
    lunch: [
      { name: 'Grilled Chicken & Rice Bowl', description: 'Grilled chicken with brown rice and vegetables', calories: 490, protein: '41g', type: 'non-veg' },
      { name: 'Tuna Sandwich', description: 'Tuna on whole grain bread with salad', calories: 390, protein: '34g', type: 'non-veg' },
      { name: 'Chicken Salad Wrap', description: 'Whole wheat wrap with chicken and mixed salad', calories: 420, protein: '34g', type: 'non-veg' },
      { name: 'Beef Stir-Fry', description: 'Lean beef stir-fried with vegetables and rice', calories: 480, protein: '35g', type: 'non-veg' },
      { name: 'Barramundi & Sweet Potato', description: 'Grilled barramundi with roasted sweet potato', calories: 460, protein: '37g', type: 'non-veg' },
      { name: 'Turkey Bowl + Quinoa', description: 'Lean turkey with quinoa and vegetables', calories: 430, protein: '34g', type: 'non-veg' },
      { name: 'Tofu & Veg Rice Bowl', description: 'Marinated tofu with brown rice and veggies', calories: 400, protein: '29g', type: 'veg' },
      { name: 'Prawn & Avocado Salad', description: 'Grilled prawns with avocado and mixed greens', calories: 360, protein: '26g', type: 'non-veg' },
      { name: 'Kangaroo Steak & Veg', description: 'Grilled kangaroo steak with roasted vegetables', calories: 450, protein: '39g', type: 'non-veg' },
      { name: 'Chicken Pasta', description: 'Whole wheat pasta with grilled chicken', calories: 450, protein: '35g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Protein Bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Greek Yoghurt', description: 'Plain Greek yoghurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled Eggs (3)', description: 'Three hard-boiled eggs', calories: 210, protein: '18-20g', type: 'veg' },
      { name: 'Cottage Cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'Whey Shake', description: 'Whey protein shake', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Tuna Pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame beans with sea salt', calories: 150, protein: '12g', type: 'veg' },
      { name: 'PB + Rice Cakes', description: 'Peanut butter on rice cakes', calories: 200, protein: '10g', type: 'veg' },
      { name: 'Low-fat Cheese Sticks (2) + Apple', description: 'Two cheese sticks with an apple', calories: 200, protein: '12g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Steak & Veggies', description: 'Grilled steak with seasonal roasted vegetables', calories: 520, protein: '42g', type: 'non-veg' },
      { name: 'Baked Chicken & Brown Rice', description: 'Oven-baked chicken with brown rice', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon Fillet & Greens', description: 'Baked salmon with steamed greens', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Turkey Chili', description: 'Lean turkey chili with beans', calories: 470, protein: '41g', type: 'non-veg' },
      { name: 'Lentil & Chicken Soup', description: 'Hearty lentil soup with chicken pieces', calories: 420, protein: '36g', type: 'non-veg' },
      { name: 'Tofu Rice Bowl (Veg)', description: 'Marinated tofu with brown rice and vegetables', calories: 400, protein: '27g', type: 'veg' },
      { name: 'Beef Stir-Fry', description: 'Lean beef stir-fried with mixed vegetables', calories: 470, protein: '34g', type: 'non-veg' },
      { name: 'Shrimp Pasta', description: 'Whole wheat pasta with garlic shrimp', calories: 450, protein: '32g', type: 'non-veg' },
      { name: 'BBQ Chicken Burger', description: 'BBQ chicken burger on whole grain bun', calories: 480, protein: '34g', type: 'non-veg' },
      { name: 'Veg & Lentil Curry + Rice', description: 'Vegetable and lentil curry with rice', calories: 410, protein: '29g', type: 'veg' }
    ]
  },
  {
    code: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    description: 'High-protein Japanese diet targeting 125–145g protein daily with traditional flavors',
    breakfast: [
      { name: 'Salmon + Tamago + Miso', description: 'Grilled salmon, Japanese omelet, and miso soup', calories: 380, protein: '34g', type: 'non-veg' },
      { name: 'Tofu + Rice Bowl (egg + edamame)', description: 'Tofu rice bowl with egg and edamame', calories: 350, protein: '28g', type: 'veg' },
      { name: 'Protein Smoothie (soy milk)', description: 'Japanese-style protein smoothie with soy milk', calories: 330, protein: '34g', type: 'veg' },
      { name: 'Omelet + Tofu + Spinach', description: 'Japanese omelet with tofu and spinach', calories: 320, protein: '28g', type: 'veg' },
      { name: 'Greek Yogurt + Matcha', description: 'Greek yogurt with matcha powder and berries', calories: 270, protein: '24g', type: 'veg' },
      { name: 'Rice + Tuna + Miso', description: 'Rice with tuna and miso soup', calories: 360, protein: '30g', type: 'non-veg' },
      { name: 'Soy Protein Pancakes', description: 'High-protein pancakes made with soy', calories: 340, protein: '29g', type: 'veg' },
      { name: 'Tuna Onigiri + Eggs', description: 'Tuna rice balls with boiled eggs', calories: 330, protein: '27g', type: 'non-veg' },
      { name: 'Tofu Miso Soup + Toast', description: 'Tofu miso soup with whole grain toast', calories: 290, protein: '24g', type: 'veg' },
      { name: 'Chicken & Egg Rice Bowl', description: 'Chicken and egg over rice (Oyakodon style)', calories: 410, protein: '35g', type: 'non-veg' }
    ],
    lunch: [
      { name: 'Chicken Teriyaki Bowl', description: 'Chicken teriyaki with rice and vegetables', calories: 480, protein: '40g', type: 'non-veg' },
      { name: 'Salmon Bento', description: 'Grilled salmon bento with rice and edamame', calories: 490, protein: '44g', type: 'non-veg' },
      { name: 'Tofu Stir Fry', description: 'Stir-fried tofu with vegetables and rice', calories: 370, protein: '26g', type: 'veg' },
      { name: 'Gyudon', description: 'Beef rice bowl with onions', calories: 460, protein: '37g', type: 'non-veg' },
      { name: 'Prawn Sushi Plate', description: 'Prawn sushi with miso soup', calories: 380, protein: '28g', type: 'non-veg' },
      { name: 'Chicken Ramen', description: 'Ramen with chicken, egg, and vegetables', calories: 450, protein: '36g', type: 'non-veg' },
      { name: 'Tuna Soba Bowl', description: 'Soba noodles with tuna and vegetables', calories: 410, protein: '31g', type: 'non-veg' },
      { name: 'Mackerel Bento', description: 'Grilled mackerel bento with rice', calories: 450, protein: '36g', type: 'non-veg' },
      { name: 'Chicken Sushi Rolls', description: 'Chicken teriyaki sushi rolls', calories: 400, protein: '31g', type: 'non-veg' },
      { name: 'Egg Fried Rice', description: 'Japanese-style egg fried rice with vegetables', calories: 380, protein: '27g', type: 'veg' }
    ],
    snacks: [
      { name: 'Protein bar', description: 'High-protein energy bar', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Soy milk + almonds', description: 'Soy milk with roasted almonds', calories: 200, protein: '16g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame with sea salt', calories: 190, protein: '18g', type: 'veg' },
      { name: 'Greek yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled eggs', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Tofu cubes', description: 'Marinated tofu cubes', calories: 160, protein: '15g', type: 'veg' },
      { name: 'Whey shake', description: 'Whey protein shake', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Tuna pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Rice crackers + PB', description: 'Rice crackers with peanut butter', calories: 180, protein: '8g', type: 'veg' },
      { name: 'Cottage cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Fish + Rice', description: 'Grilled fish with steamed rice and vegetables', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Chicken Katsu (light)', description: 'Light chicken katsu with cabbage', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Beef Teriyaki', description: 'Beef teriyaki with vegetables and rice', calories: 460, protein: '35g', type: 'non-veg' },
      { name: 'Tofu + Lentil Curry', description: 'Japanese-style tofu and lentil curry', calories: 410, protein: '30g', type: 'veg' },
      { name: 'Salmon Sashimi Bowl', description: 'Salmon sashimi over rice with edamame', calories: 420, protein: '32g', type: 'non-veg' },
      { name: 'Chicken Yakitori', description: 'Grilled chicken skewers with rice', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Prawn Noodle Soup', description: 'Udon soup with prawns and vegetables', calories: 410, protein: '31g', type: 'non-veg' },
      { name: 'Egg + Spinach Udon', description: 'Udon noodles with egg and spinach', calories: 370, protein: '26g', type: 'veg' },
      { name: 'Sukiyaki Hot Pot', description: 'Beef and vegetable hot pot', calories: 480, protein: '41g', type: 'non-veg' },
      { name: 'Tofu Rice Bowl + Egg', description: 'Tofu rice bowl topped with egg', calories: 350, protein: '24g', type: 'veg' }
    ]
  },
  {
    code: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    description: 'High-protein German diet targeting ≈130–145g protein daily with traditional favorites',
    breakfast: [
      { name: 'Scrambled Eggs & Bread', description: 'Scrambled eggs with whole grain German bread', calories: 350, protein: '30g', type: 'veg' },
      { name: 'Quark + Nuts & Berries', description: 'German quark with mixed nuts and fresh berries', calories: 310, protein: '29g', type: 'veg' },
      { name: 'Oats + Milk + Whey', description: 'Oatmeal with milk and whey protein powder', calories: 380, protein: '40g', type: 'veg' },
      { name: 'Smoked Salmon Toast', description: 'Smoked salmon on whole grain toast with cream cheese', calories: 340, protein: '28g', type: 'non-veg' },
      { name: 'Protein Smoothie (German Style)', description: 'Berry protein smoothie with quark and oats', calories: 320, protein: '33g', type: 'veg' },
      { name: 'Cheese Omelet', description: 'Three-egg omelet with German cheese', calories: 330, protein: '28g', type: 'veg' },
      { name: 'Cottage Cheese & Fruit', description: 'Cottage cheese with seasonal fruit', calories: 280, protein: '28g', type: 'veg' },
      { name: 'Protein Pancakes + Quark', description: 'High-protein pancakes topped with quark', calories: 370, protein: '39g', type: 'veg' },
      { name: 'Tofu Veggie Stir Fry', description: 'Morning tofu scramble with vegetables', calories: 300, protein: '23-28g', type: 'veg' },
      { name: 'Low-fat Quark + Oats', description: 'Low-fat quark with oats and honey', calories: 310, protein: '29g', type: 'veg' }
    ],
    lunch: [
      { name: 'Chicken Rice Bowl', description: 'Grilled chicken with rice and vegetables', calories: 490, protein: '41g', type: 'non-veg' },
      { name: 'Tuna Salad', description: 'Tuna salad with mixed greens and olive oil', calories: 420, protein: '38g', type: 'non-veg' },
      { name: 'Beef Strips & Potatoes', description: 'Lean beef strips with boiled potatoes', calories: 480, protein: '37g', type: 'non-veg' },
      { name: 'Salmon + Quinoa', description: 'Baked salmon with quinoa and vegetables', calories: 470, protein: '39g', type: 'non-veg' },
      { name: 'Chicken Wrap', description: 'Whole wheat wrap with chicken and salad', calories: 420, protein: '34g', type: 'non-veg' },
      { name: 'Chickpea Salad', description: 'Chickpea salad with vegetables and feta', calories: 410, protein: '32g', type: 'veg' },
      { name: 'Turkey Stir Fry', description: 'Turkey breast stir-fried with vegetables', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Trout & Potatoes', description: 'Pan-fried trout with herb potatoes', calories: 450, protein: '36g', type: 'non-veg' },
      { name: 'Tofu-Quinoa Bowl', description: 'Marinated tofu with quinoa and veggies', calories: 410, protein: '30g', type: 'veg' },
      { name: 'Egg & Spinach Toast', description: 'Poached eggs on toast with sautéed spinach', calories: 360, protein: '28g', type: 'veg' }
    ],
    snacks: [
      { name: 'Protein bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Greek yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled eggs', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Cottage cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'Quark', description: 'German low-fat quark', calories: 140, protein: '18g', type: 'veg' },
      { name: 'Whey shake', description: 'Whey protein shake', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Tuna pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' },
      { name: 'Mixed nuts', description: 'Handful of mixed nuts', calories: 180, protein: '8g', type: 'veg' },
      { name: 'Cheese sticks', description: 'Two cheese sticks', calories: 160, protein: '12g', type: 'veg' }
    ],
    dinner: [
      { name: 'Beef Steak & Veggies', description: 'Grilled beef steak with roasted vegetables', calories: 540, protein: '42g', type: 'non-veg' },
      { name: 'Chicken + Sweet Potato', description: 'Baked chicken with roasted sweet potato', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon + Broccoli', description: 'Baked salmon with steamed broccoli', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Turkey Mince Fry', description: 'Lean turkey mince stir-fried with vegetables', calories: 460, protein: '39g', type: 'non-veg' },
      { name: 'Lentil Soup + Chicken Sausage', description: 'Hearty lentil soup with chicken sausage', calories: 430, protein: '34g', type: 'non-veg' },
      { name: 'Tofu Rice Bowl', description: 'Marinated tofu with brown rice and veggies', calories: 400, protein: '27g', type: 'veg' },
      { name: 'Baked Cod', description: 'Oven-baked cod with vegetables', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Beef Rice Bowl', description: 'Lean beef with brown rice', calories: 460, protein: '33g', type: 'non-veg' },
      { name: 'BBQ Chicken Sandwich', description: 'BBQ chicken on whole grain bun', calories: 460, protein: '34g', type: 'non-veg' },
      { name: 'Veg Lentil Curry', description: 'Vegetable and lentil curry with rice', calories: 400, protein: '26g', type: 'veg' }
    ]
  },
  {
    code: 'france',
    name: 'France',
    flag: '🇫🇷',
    description: 'High-protein French diet targeting 125–145g protein daily with balanced cuisine',
    breakfast: [
      { name: 'Cheese Omelet', description: 'French-style cheese omelet with herbs', calories: 330, protein: '28g', type: 'veg' },
      { name: 'Greek Yogurt Parfait', description: 'Greek yogurt with granola and berries', calories: 280, protein: '25g', type: 'veg' },
      { name: 'Smoked Salmon Tartine', description: 'Smoked salmon on whole grain tartine with cream cheese', calories: 340, protein: '28g', type: 'non-veg' },
      { name: 'Protein Smoothie', description: 'French berry protein smoothie', calories: 320, protein: '33g', type: 'veg' },
      { name: 'Fromage Blanc Bowl', description: 'Fromage blanc with fruit and nuts', calories: 270, protein: '24g', type: 'veg' },
      { name: 'Oats + Milk + Whey', description: 'Oatmeal with milk and whey protein', calories: 350, protein: '33g', type: 'veg' },
      { name: 'Egg & Avocado Toast', description: 'Poached eggs on toast with avocado', calories: 340, protein: '25g', type: 'veg' },
      { name: 'Quark + Berries & Seeds', description: 'Quark with fresh berries and chia seeds', calories: 290, protein: '28g', type: 'veg' },
      { name: 'Protein Pancakes', description: 'High-protein pancakes with Greek yogurt', calories: 370, protein: '36g', type: 'veg' },
      { name: 'Scrambled Eggs + Turkey Ham', description: 'Scrambled eggs with turkey ham', calories: 350, protein: '30g', type: 'non-veg' }
    ],
    lunch: [
      { name: 'Poulet Provençal', description: 'Provençal-style chicken with herbs and vegetables', calories: 450, protein: '37g', type: 'non-veg' },
      { name: 'Salade Niçoise', description: 'Classic Niçoise salad with tuna and eggs', calories: 420, protein: '34g', type: 'non-veg' },
      { name: 'Beef Bourguignon (Lean)', description: 'Lean beef bourguignon with vegetables', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Salmon & Lentils', description: 'Grilled salmon with French lentils', calories: 490, protein: '44g', type: 'non-veg' },
      { name: 'Chicken + Ratatouille', description: 'Grilled chicken with ratatouille', calories: 410, protein: '31g', type: 'non-veg' },
      { name: 'Shrimp & Rice', description: 'Garlic shrimp with rice pilaf', calories: 380, protein: '28g', type: 'non-veg' },
      { name: 'Tofu & Quinoa Salad', description: 'Marinated tofu with quinoa salad', calories: 400, protein: '30g', type: 'veg' },
      { name: 'Turkey Wrap', description: 'Whole wheat wrap with turkey and vegetables', calories: 420, protein: '36g', type: 'non-veg' },
      { name: 'Fish + Green Beans', description: 'Pan-seared fish with haricots verts', calories: 410, protein: '32g', type: 'non-veg' },
      { name: 'Chicken & Couscous Bowl', description: 'Grilled chicken with couscous and vegetables', calories: 430, protein: '32g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Protein bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' },
      { name: 'Whey shake', description: 'Whey protein shake', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Boiled eggs', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Greek yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Tuna pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Cottage cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame beans', calories: 150, protein: '12g', type: 'veg' },
      { name: 'Quark', description: 'Low-fat quark', calories: 140, protein: '18g', type: 'veg' },
      { name: 'Almonds + cheese sticks', description: 'Almonds with cheese sticks', calories: 210, protein: '18g', type: 'veg' }
    ],
    dinner: [
      { name: 'Grilled Steak + Veg', description: 'Grilled steak with seasonal vegetables', calories: 530, protein: '43g', type: 'non-veg' },
      { name: 'Lemon Chicken', description: 'Lemon herb chicken with vegetables', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon + Spinach', description: 'Baked salmon with sautéed spinach', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Tofu Ratatouille Bowl', description: 'Tofu with ratatouille over quinoa', calories: 420, protein: '33g', type: 'veg' },
      { name: 'Turkey Steak + Mash', description: 'Turkey steak with mashed cauliflower', calories: 450, protein: '37g', type: 'non-veg' },
      { name: 'Beef & Lentil Stew', description: 'Lean beef and lentil stew', calories: 460, protein: '37g', type: 'non-veg' },
      { name: 'Cod + Ratatouille', description: 'Baked cod with ratatouille', calories: 450, protein: '37g', type: 'non-veg' },
      { name: 'Omelet + Chicken', description: 'Cheese omelet with grilled chicken strips', calories: 440, protein: '36g', type: 'non-veg' },
      { name: 'Shrimp Pasta', description: 'Whole wheat pasta with garlic shrimp', calories: 450, protein: '32g', type: 'non-veg' },
      { name: 'Veg Lentil Soup', description: 'Hearty vegetable and lentil soup', calories: 380, protein: '28g', type: 'veg' }
    ]
  },
  {
    code: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    description: 'High-protein Brazilian diet targeting 125–145g protein daily with vibrant flavors',
    breakfast: [
      { name: 'Eggs + Tapioca', description: 'Scrambled eggs with tapioca crepe', calories: 340, protein: '28g', type: 'veg' },
      { name: 'Açaí Bowl + Whey', description: 'Açaí bowl with whey protein and granola', calories: 360, protein: '30g', type: 'veg' },
      { name: 'Whole-grain Bread + White Cheese', description: 'Whole grain bread with Brazilian white cheese', calories: 340, protein: '30g', type: 'veg' },
      { name: 'Chicken Omelet', description: 'Omelet with shredded chicken', calories: 370, protein: '34g', type: 'non-veg' },
      { name: 'Banana Peanut Smoothie', description: 'Banana and peanut butter protein smoothie', calories: 340, protein: '31g', type: 'veg' },
      { name: 'Greek Yogurt + Brazil Nuts', description: 'Greek yogurt with Brazil nuts and honey', calories: 290, protein: '24g', type: 'veg' },
      { name: 'Tapioca + Eggs + Spinach', description: 'Tapioca filled with eggs and spinach', calories: 350, protein: '30g', type: 'veg' },
      { name: 'Cottage Cheese + Papaya', description: 'Cottage cheese with fresh papaya', calories: 270, protein: '25g', type: 'veg' },
      { name: 'Tuna Tapioca', description: 'Tapioca filled with tuna', calories: 320, protein: '25g', type: 'non-veg' },
      { name: 'Scrambled Eggs + Cheese', description: 'Scrambled eggs with cheese', calories: 330, protein: '26g', type: 'veg' }
    ],
    lunch: [
      { name: 'Chicken + Rice + Beans', description: 'Grilled chicken with rice and black beans', calories: 530, protein: '47g', type: 'non-veg' },
      { name: 'Picanha + Sweet Potato', description: 'Grilled picanha with sweet potato', calories: 480, protein: '36g', type: 'non-veg' },
      { name: 'Fish + Veggies', description: 'Grilled fish with vegetables', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Chicken Stroganoff (light)', description: 'Light chicken stroganoff with rice', calories: 460, protein: '37g', type: 'non-veg' },
      { name: 'Feijoada Fit', description: 'Lean feijoada with rice and greens', calories: 470, protein: '37g', type: 'non-veg' },
      { name: 'Tuna + Egg Salad', description: 'Tuna and egg salad with vegetables', calories: 430, protein: '38g', type: 'non-veg' },
      { name: 'Tofu + Brown Rice', description: 'Marinated tofu with brown rice and veggies', calories: 440, protein: '35g', type: 'veg' },
      { name: 'Lentils + Grilled Chicken', description: 'Lentils with grilled chicken breast', calories: 470, protein: '40g', type: 'non-veg' },
      { name: 'Tilapia + Mashed Potatoes', description: 'Grilled tilapia with mashed potatoes', calories: 450, protein: '36g', type: 'non-veg' },
      { name: 'Shrimp + Quinoa', description: 'Grilled shrimp with quinoa', calories: 400, protein: '29g', type: 'non-veg' }
    ],
    snacks: [
      { name: 'Whey shake', description: 'Whey protein shake', calories: 220, protein: '25g', type: 'veg' },
      { name: 'Greek yogurt', description: 'Plain Greek yogurt', calories: 150, protein: '20g', type: 'veg' },
      { name: 'Boiled eggs', description: 'Three hard-boiled eggs', calories: 210, protein: '18g', type: 'veg' },
      { name: 'Tuna pouch', description: 'Ready-to-eat tuna pouch', calories: 120, protein: '25g', type: 'non-veg' },
      { name: 'Protein bar', description: 'High-protein energy bar', calories: 220, protein: '20-25g', type: 'veg' },
      { name: 'Cheese + almonds', description: 'Cheese with roasted almonds', calories: 210, protein: '16g', type: 'veg' },
      { name: 'Skyr', description: 'Icelandic-style skyr yogurt', calories: 170, protein: '22g', type: 'veg' },
      { name: 'Edamame', description: 'Steamed edamame beans', calories: 190, protein: '18g', type: 'veg' },
      { name: 'Cottage cheese', description: 'Low-fat cottage cheese', calories: 160, protein: '18g', type: 'veg' },
      { name: 'Turkey slices', description: 'Sliced turkey breast', calories: 150, protein: '22g', type: 'non-veg' }
    ],
    dinner: [
      { name: 'Chicken + Veggies', description: 'Grilled chicken with roasted vegetables', calories: 470, protein: '38g', type: 'non-veg' },
      { name: 'Salmon + Rice', description: 'Baked salmon with rice and vegetables', calories: 480, protein: '38g', type: 'non-veg' },
      { name: 'Beef + Veggies', description: 'Lean beef with mixed vegetables', calories: 460, protein: '35g', type: 'non-veg' },
      { name: 'Fish Stew (Moqueca Fit)', description: 'Light moqueca fish stew', calories: 430, protein: '34g', type: 'non-veg' },
      { name: 'Tofu + Lentils', description: 'Tofu with lentils and vegetables', calories: 400, protein: '29g', type: 'veg' },
      { name: 'Omelet + Chicken + Cheese', description: 'Cheese omelet with shredded chicken', calories: 490, protein: '42g', type: 'non-veg' },
      { name: 'Baked Fish + Broccoli', description: 'Baked fish with steamed broccoli', calories: 440, protein: '35g', type: 'non-veg' },
      { name: 'Ground Beef + Quinoa', description: 'Lean ground beef with quinoa', calories: 450, protein: '32g', type: 'non-veg' },
      { name: 'Egg + White Cheese Salad', description: 'Egg and white cheese salad', calories: 350, protein: '25g', type: 'veg' },
      { name: 'Bean Soup + Chicken', description: 'Black bean soup with chicken', calories: 440, protein: '36g', type: 'non-veg' }
    ]
  }
];

export function getCountryByCode(code: string): CountryDiet | undefined {
  return countries.find(c => c.code === code);
}
