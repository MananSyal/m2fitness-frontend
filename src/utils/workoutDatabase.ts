// Comprehensive workout database for M2Fitness

export interface Exercise {
  id: number;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  target: string;
}

export interface Workout {
  id: string;
  name: string;
  slug: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  caloriesBurned: string;
  equipment: string;
  targetAreas: string;
  trainer: string;
  description: string;
  exercises: Exercise[];
  tips: string[];
  focuses: string[];
  video?: string;
}

export const workoutDatabase: Workout[] = [
  // BEGINNER WORKOUTS
  {
    id: 'beginner-1',
    name: 'Yoga Flow',
    slug: 'yoga-flow',
    level: 'beginner',
    duration: '60 min',
    caloriesBurned: '180 kcal',
    equipment: 'Yoga Mat',
    targetAreas: 'Full Body, Flexibility',
    trainer: '@YogaPreeti',
    description: 'A gentle yoga flow perfect for beginners. Focus on flexibility, balance, and mindfulness.',
    video: 'https://images.unsplash.com/photo-1554885730-e5d7a39e0d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc2MTkwOTgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    exercises: [
      { id: 1, name: 'Mountain Pose (Tadasana)', sets: '1 set', reps: '2 min hold', rest: '30s', target: 'Posture' },
      { id: 2, name: 'Downward Dog', sets: '3 sets', reps: '1 min hold', rest: '45s', target: 'Full Body' },
      { id: 3, name: 'Warrior I', sets: '2 sets', reps: '1 min each side', rest: '30s', target: 'Legs, Core' },
      { id: 4, name: 'Child\'s Pose', sets: '3 sets', reps: '2 min hold', rest: '20s', target: 'Stretching' },
      { id: 5, name: 'Cat-Cow Stretch', sets: '3 sets', reps: '10 reps', rest: '30s', target: 'Spine' },
      { id: 6, name: 'Cobra Pose', sets: '2 sets', reps: '1 min hold', rest: '45s', target: 'Back' },
    ],
    tips: [
      'Focus on breathing deeply throughout each pose',
      'Don\'t force your body into uncomfortable positions',
      'Use props like blocks or straps if needed',
      'Practice on an empty stomach for best results',
    ],
    focuses: ['Flexibility', 'Balance', 'Mindfulness'],
  },
  {
    id: 'beginner-2',
    name: 'Bodyweight Basics',
    slug: 'bodyweight-basics',
    level: 'beginner',
    duration: '40 min',
    caloriesBurned: '220 kcal',
    equipment: 'No Equipment',
    targetAreas: 'Full Body',
    trainer: '@FitRahul',
    description: 'Master the fundamentals with bodyweight exercises. Perfect for building strength without equipment.',
    video: 'https://images.unsplash.com/photo-1662381906696-bcad03513531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYxOTI0Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    exercises: [
      { id: 1, name: 'Push-ups (Knee)', sets: '3 sets', reps: '10 reps', rest: '60s', target: 'Chest, Arms' },
      { id: 2, name: 'Squats', sets: '3 sets', reps: '15 reps', rest: '45s', target: 'Legs' },
      { id: 3, name: 'Plank', sets: '3 sets', reps: '30s hold', rest: '45s', target: 'Core' },
      { id: 4, name: 'Lunges', sets: '3 sets', reps: '10 each leg', rest: '60s', target: 'Legs' },
      { id: 5, name: 'Wall Sit', sets: '3 sets', reps: '45s hold', rest: '60s', target: 'Legs' },
      { id: 6, name: 'Bird Dog', sets: '3 sets', reps: '8 each side', rest: '45s', target: 'Core, Balance' },
    ],
    tips: [
      'Master form before increasing repetitions',
      'Keep core engaged throughout exercises',
      'Rest adequately between sets',
      'Progress gradually to full push-ups',
    ],
    focuses: ['Foundation', 'Bodyweight Control', 'Form'],
  },
  {
    id: 'beginner-3',
    name: 'Core Starter',
    slug: 'core-starter',
    level: 'beginner',
    duration: '30 min',
    caloriesBurned: '160 kcal',
    equipment: 'Yoga Mat',
    targetAreas: 'Core, Abs',
    trainer: '@CoreCoachAnita',
    description: 'Build a strong foundation with beginner-friendly core exercises. Perfect for abs and stability.',
    exercises: [
      { id: 1, name: 'Dead Bug', sets: '3 sets', reps: '10 reps', rest: '45s', target: 'Lower Abs' },
      { id: 2, name: 'Bicycle Crunches', sets: '3 sets', reps: '15 reps', rest: '45s', target: 'Obliques' },
      { id: 3, name: 'Plank Hold', sets: '3 sets', reps: '30s hold', rest: '60s', target: 'Full Core' },
      { id: 4, name: 'Side Plank', sets: '2 sets', reps: '20s each side', rest: '45s', target: 'Obliques' },
      { id: 5, name: 'Leg Raises', sets: '3 sets', reps: '10 reps', rest: '60s', target: 'Lower Abs' },
      { id: 6, name: 'Mountain Climbers', sets: '3 sets', reps: '15 reps', rest: '45s', target: 'Full Core' },
    ],
    tips: [
      'Keep lower back pressed to the floor',
      'Breathe steadily - don\'t hold your breath',
      'Quality over quantity - perfect your form',
      'Engage core throughout the day, not just during workouts',
    ],
    focuses: ['Core Strength', 'Stability', 'Posture'],
  },

  // INTERMEDIATE WORKOUTS
  {
    id: 'intermediate-1',
    name: 'Full Body Blast',
    slug: 'full-body-blast',
    level: 'intermediate',
    duration: '45 min',
    caloriesBurned: '320 kcal',
    equipment: 'Dumbbells, Bench',
    targetAreas: 'Chest, Legs, Core',
    trainer: '@RajeshKumar',
    description: 'A comprehensive full-body workout focusing on compound movements for maximum strength gains.',
    video: 'https://images.unsplash.com/photo-1662381906696-bcad03513531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYxOTI0Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    exercises: [
      { id: 1, name: 'Barbell Squat', sets: '4 sets', reps: '10 reps', rest: '90s', target: 'Legs' },
      { id: 2, name: 'Bench Press', sets: '4 sets', reps: '8 reps', rest: '90s', target: 'Chest' },
      { id: 3, name: 'Deadlift', sets: '3 sets', reps: '8 reps', rest: '2 min', target: 'Back, Legs' },
      { id: 4, name: 'Pull-ups', sets: '3 sets', reps: '10 reps', rest: '60s', target: 'Back' },
      { id: 5, name: 'Overhead Press', sets: '3 sets', reps: '10 reps', rest: '90s', target: 'Shoulders' },
      { id: 6, name: 'Plank', sets: '3 sets', reps: '60s hold', rest: '45s', target: 'Core' },
    ],
    tips: [
      'Keep your back straight during squats',
      'Control the weight on the way down',
      'Stay hydrated between sets',
      'Focus on controlled breathing',
    ],
    focuses: ['Strength', 'Endurance', 'Muscle Building'],
  },
  {
    id: 'intermediate-2',
    name: 'HIIT Power',
    slug: 'hiit-power',
    level: 'intermediate',
    duration: '35 min',
    caloriesBurned: '380 kcal',
    equipment: 'Dumbbells, Timer',
    targetAreas: 'Full Body, Cardio',
    trainer: '@HIITCoachVijay',
    description: 'High-intensity interval training to boost metabolism and burn fat while building lean muscle.',
    video: 'https://images.unsplash.com/photo-1567974775951-4a1759f26045?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWl0JTIwY2FyZGlvJTIwaW50ZW5zZXxlbnwxfHx8fDE3NjIwMTY4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    exercises: [
      { id: 1, name: 'Burpees', sets: '4 sets', reps: '15 reps', rest: '30s', target: 'Full Body' },
      { id: 2, name: 'Kettlebell Swings', sets: '4 sets', reps: '20 reps', rest: '45s', target: 'Legs, Core' },
      { id: 3, name: 'Box Jumps', sets: '3 sets', reps: '12 reps', rest: '60s', target: 'Legs, Power' },
      { id: 4, name: 'Medicine Ball Slams', sets: '4 sets', reps: '15 reps', rest: '45s', target: 'Full Body' },
      { id: 5, name: 'Battle Ropes', sets: '3 sets', reps: '30s work', rest: '30s', target: 'Arms, Cardio' },
      { id: 6, name: 'Jump Squats', sets: '3 sets', reps: '15 reps', rest: '60s', target: 'Legs' },
    ],
    tips: [
      'Push hard during work intervals',
      'Use rest periods to catch your breath',
      'Maintain form even when tired',
      'Scale intensity based on fitness level',
    ],
    focuses: ['Fat Burning', 'Cardiovascular Health', 'Metabolism'],
  },
  {
    id: 'intermediate-3',
    name: 'Lean Builder',
    slug: 'lean-builder',
    level: 'intermediate',
    duration: '50 min',
    caloriesBurned: '300 kcal',
    equipment: 'Dumbbells, Resistance Bands',
    targetAreas: 'Full Body, Toning',
    trainer: '@LeanMuscleNeha',
    description: 'Build lean muscle with controlled movements and higher reps. Perfect for toning and conditioning.',
    exercises: [
      { id: 1, name: 'Goblet Squats', sets: '4 sets', reps: '15 reps', rest: '60s', target: 'Legs' },
      { id: 2, name: 'Dumbbell Chest Fly', sets: '3 sets', reps: '12 reps', rest: '60s', target: 'Chest' },
      { id: 3, name: 'Romanian Deadlift', sets: '4 sets', reps: '12 reps', rest: '75s', target: 'Hamstrings' },
      { id: 4, name: 'Lat Pulldown', sets: '3 sets', reps: '12 reps', rest: '60s', target: 'Back' },
      { id: 5, name: 'Lateral Raises', sets: '3 sets', reps: '15 reps', rest: '45s', target: 'Shoulders' },
      { id: 6, name: 'Cable Crunches', sets: '3 sets', reps: '20 reps', rest: '45s', target: 'Abs' },
    ],
    tips: [
      'Focus on time under tension',
      'Squeeze muscles at peak contraction',
      'Use moderate weights with perfect form',
      'Keep rest periods consistent',
    ],
    focuses: ['Muscle Definition', 'Toning', 'Conditioning'],
  },

  // ADVANCED WORKOUTS
  {
    id: 'advanced-1',
    name: 'Athlete Mode',
    slug: 'athlete-mode',
    level: 'advanced',
    duration: '60 min',
    caloriesBurned: '450 kcal',
    equipment: 'Full Gym Access',
    targetAreas: 'Full Body, Explosive Power',
    trainer: '@AthleteAkash',
    description: 'Elite-level training with explosive movements and heavy compounds. For serious athletes only.',
    exercises: [
      { id: 1, name: 'Power Cleans', sets: '5 sets', reps: '5 reps', rest: '2 min', target: 'Full Body' },
      { id: 2, name: 'Back Squat', sets: '5 sets', reps: '5 reps', rest: '2.5 min', target: 'Legs' },
      { id: 3, name: 'Weighted Pull-ups', sets: '4 sets', reps: '8 reps', rest: '90s', target: 'Back' },
      { id: 4, name: 'Barbell Bench Press', sets: '5 sets', reps: '5 reps', rest: '2 min', target: 'Chest' },
      { id: 5, name: 'Box Jumps (High)', sets: '4 sets', reps: '10 reps', rest: '90s', target: 'Legs, Power' },
      { id: 6, name: 'Hanging Leg Raises', sets: '4 sets', reps: '15 reps', rest: '60s', target: 'Core' },
    ],
    tips: [
      'Warm up thoroughly for 15+ minutes',
      'Use proper lifting technique always',
      'Don\'t sacrifice form for weight',
      'Have a spotter for heavy lifts',
    ],
    focuses: ['Power', 'Strength', 'Athletic Performance'],
  },
  {
    id: 'advanced-2',
    name: 'Beast Circuit',
    slug: 'beast-circuit',
    level: 'advanced',
    duration: '55 min',
    caloriesBurned: '420 kcal',
    equipment: 'Barbell, Dumbbells, Kettlebells',
    targetAreas: 'Full Body, Strength',
    trainer: '@BeastModeRavi',
    description: 'High-load strength circuit designed to push your limits. Build raw strength and muscle mass.',
    exercises: [
      { id: 1, name: 'Deadlift', sets: '5 sets', reps: '5 reps', rest: '2.5 min', target: 'Back, Legs' },
      { id: 2, name: 'Front Squat', sets: '4 sets', reps: '8 reps', rest: '2 min', target: 'Legs' },
      { id: 3, name: 'Weighted Dips', sets: '4 sets', reps: '10 reps', rest: '90s', target: 'Chest, Triceps' },
      { id: 4, name: 'Barbell Row', sets: '4 sets', reps: '8 reps', rest: '90s', target: 'Back' },
      { id: 5, name: 'Farmer\'s Walk', sets: '4 sets', reps: '40m walk', rest: '90s', target: 'Full Body' },
      { id: 6, name: 'Ab Wheel Rollouts', sets: '3 sets', reps: '12 reps', rest: '60s', target: 'Core' },
    ],
    tips: [
      'Focus on progressive overload each week',
      'Eat in a caloric surplus for muscle gain',
      'Get 8+ hours of sleep for recovery',
      'Track your lifts and aim to beat them',
    ],
    focuses: ['Mass Building', 'Raw Strength', 'Power'],
  },
  {
    id: 'advanced-3',
    name: 'Power Surge',
    slug: 'power-surge',
    level: 'advanced',
    duration: '50 min',
    caloriesBurned: '400 kcal',
    equipment: 'Olympic Barbell, Bumper Plates',
    targetAreas: 'Full Body, Endurance',
    trainer: '@PowerSuryaCoach',
    description: 'Advanced endurance and control training. Master your body through challenging compound movements.',
    exercises: [
      { id: 1, name: 'Snatch', sets: '5 sets', reps: '3 reps', rest: '2 min', target: 'Full Body' },
      { id: 2, name: 'Clean & Jerk', sets: '4 sets', reps: '3 reps', rest: '2.5 min', target: 'Full Body' },
      { id: 3, name: 'Overhead Squat', sets: '4 sets', reps: '6 reps', rest: '2 min', target: 'Legs, Shoulders' },
      { id: 4, name: 'Muscle-ups', sets: '3 sets', reps: '6 reps', rest: '2 min', target: 'Back, Arms' },
      { id: 5, name: 'Pistol Squats', sets: '3 sets', reps: '8 each leg', rest: '90s', target: 'Legs, Balance' },
      { id: 6, name: 'L-Sit Hold', sets: '3 sets', reps: '30s hold', rest: '60s', target: 'Core' },
    ],
    tips: [
      'Olympic lifts require perfect technique',
      'Work with a coach for form corrections',
      'Start light and build up gradually',
      'Film yourself to check form',
    ],
    focuses: ['Olympic Lifting', 'Control', 'Full Body Power'],
  },
];

// Helper functions
export const getWorkoutBySlug = (slug: string): Workout | undefined => {
  return workoutDatabase.find(workout => workout.slug === slug);
};

export const getWorkoutsByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): Workout[] => {
  return workoutDatabase.filter(workout => workout.level === level);
};

export const getWorkoutsForGoal = (goal: 'weight-loss' | 'muscle-gain' | 'stay-fit', level?: string): Workout[] => {
  // Goal-based workout recommendations
  const goalMapping = {
    'weight-loss': ['hiit-power', 'bodyweight-basics', 'yoga-flow', 'full-body-blast'],
    'muscle-gain': ['beast-circuit', 'athlete-mode', 'full-body-blast', 'lean-builder'],
    'stay-fit': ['yoga-flow', 'bodyweight-basics', 'full-body-blast', 'lean-builder'],
  };

  const recommendedSlugs = goalMapping[goal] || [];
  let workouts = workoutDatabase.filter(w => recommendedSlugs.includes(w.slug));

  if (level) {
    workouts = workouts.filter(w => w.level === level);
  }

  return workouts;
};

export const getRandomWorkouts = (count: number = 3): Workout[] => {
  const shuffled = [...workoutDatabase].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
