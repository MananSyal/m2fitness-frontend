// Exercise and Muscle Database for 3D Anatomy Viewer

export interface MuscleGroup {
  name: string;
  type: 'primary' | 'secondary' | 'stabilizer';
  color: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscles: MuscleGroup[];
  description: string;
  defaultView: 'front' | 'back';
}

export const exerciseDatabase: Exercise[] = [
  // Chest / Push Movements
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Chest / Push',
    defaultView: 'front',
    description: 'Classic compound movement for building chest strength and mass',
    muscles: [
      { name: 'Chest (Pectoralis Major)', type: 'primary', color: '#ef4444' },
      { name: 'Triceps', type: 'secondary', color: '#f97316' },
      { name: 'Anterior Deltoids', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Chest / Push',
    defaultView: 'front',
    description: 'Targets upper chest with greater range of motion',
    muscles: [
      { name: 'Upper Chest', type: 'primary', color: '#ef4444' },
      { name: 'Shoulders', type: 'secondary', color: '#f97316' },
      { name: 'Triceps', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    category: 'Chest / Push',
    defaultView: 'front',
    description: 'Bodyweight exercise for chest and core strength',
    muscles: [
      { name: 'Chest', type: 'primary', color: '#ef4444' },
      { name: 'Triceps', type: 'secondary', color: '#f97316' },
      { name: 'Core', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'dumbbell-fly',
    name: 'Dumbbell Fly',
    category: 'Chest / Push',
    defaultView: 'front',
    description: 'Isolation exercise for chest stretch and definition',
    muscles: [
      { name: 'Chest', type: 'primary', color: '#ef4444' },
      { name: 'Front Deltoids', type: 'secondary', color: '#f97316' },
    ],
  },

  // Arms
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    category: 'Arms',
    defaultView: 'front',
    description: 'Essential bicep isolation exercise',
    muscles: [
      { name: 'Biceps', type: 'primary', color: '#ef4444' },
      { name: 'Forearms', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'Arms',
    defaultView: 'front',
    description: 'Targets brachialis and forearm muscles',
    muscles: [
      { name: 'Brachialis', type: 'primary', color: '#ef4444' },
      { name: 'Forearms', type: 'secondary', color: '#f97316' },
      { name: 'Biceps', type: 'stabilizer', color: '#eab308' },
    ],
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'Arms',
    defaultView: 'back',
    description: 'Compound movement for tricep development',
    muscles: [
      { name: 'Triceps', type: 'primary', color: '#ef4444' },
      { name: 'Chest', type: 'secondary', color: '#f97316' },
      { name: 'Shoulders', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'overhead-tricep-extension',
    name: 'Overhead Tricep Extension',
    category: 'Arms',
    defaultView: 'back',
    description: 'Isolation exercise for long head of triceps',
    muscles: [
      { name: 'Triceps', type: 'primary', color: '#ef4444' },
      { name: 'Core Stabilizers', type: 'secondary', color: '#f97316' },
    ],
  },

  // Legs / Lower Body
  {
    id: 'squat',
    name: 'Squat',
    category: 'Legs / Lower Body',
    defaultView: 'front',
    description: 'The king of leg exercises for overall lower body strength',
    muscles: [
      { name: 'Quadriceps', type: 'primary', color: '#ef4444' },
      { name: 'Glutes', type: 'primary', color: '#ef4444' },
      { name: 'Hamstrings', type: 'secondary', color: '#f97316' },
      { name: 'Core', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Legs / Lower Body',
    defaultView: 'back',
    description: 'Full body compound exercise focusing on posterior chain',
    muscles: [
      { name: 'Hamstrings', type: 'primary', color: '#ef4444' },
      { name: 'Glutes', type: 'primary', color: '#ef4444' },
      { name: 'Lower Back', type: 'primary', color: '#ef4444' },
      { name: 'Core', type: 'secondary', color: '#f97316' },
      { name: 'Forearms', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'lunge',
    name: 'Lunge',
    category: 'Legs / Lower Body',
    defaultView: 'front',
    description: 'Unilateral leg exercise for balance and strength',
    muscles: [
      { name: 'Quadriceps', type: 'primary', color: '#ef4444' },
      { name: 'Glutes', type: 'primary', color: '#ef4444' },
      { name: 'Calves', type: 'secondary', color: '#f97316' },
      { name: 'Core', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'Legs / Lower Body',
    defaultView: 'front',
    description: 'Machine-based leg exercise for quad development',
    muscles: [
      { name: 'Quadriceps', type: 'primary', color: '#ef4444' },
      { name: 'Hamstrings', type: 'secondary', color: '#f97316' },
      { name: 'Glutes', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'calf-raise',
    name: 'Calf Raise',
    category: 'Legs / Lower Body',
    defaultView: 'back',
    description: 'Isolation exercise for calf development',
    muscles: [
      { name: 'Calves (Gastrocnemius)', type: 'primary', color: '#ef4444' },
      { name: 'Tibialis Anterior', type: 'secondary', color: '#f97316' },
    ],
  },

  // Back / Pull Movements
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'Back / Pull',
    defaultView: 'back',
    description: 'Bodyweight exercise for back width and strength',
    muscles: [
      { name: 'Latissimus Dorsi', type: 'primary', color: '#ef4444' },
      { name: 'Biceps', type: 'secondary', color: '#f97316' },
      { name: 'Rear Deltoids', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Back / Pull',
    defaultView: 'back',
    description: 'Cable exercise for lat development',
    muscles: [
      { name: 'Latissimus Dorsi', type: 'primary', color: '#ef4444' },
      { name: 'Biceps', type: 'secondary', color: '#f97316' },
      { name: 'Rhomboids', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'Back / Pull',
    defaultView: 'back',
    description: 'Compound movement for back thickness',
    muscles: [
      { name: 'Latissimus Dorsi', type: 'primary', color: '#ef4444' },
      { name: 'Rhomboids', type: 'primary', color: '#ef4444' },
      { name: 'Rear Deltoids', type: 'secondary', color: '#f97316' },
      { name: 'Biceps', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'face-pull',
    name: 'Face Pull',
    category: 'Back / Pull',
    defaultView: 'back',
    description: 'Cable exercise for rear delts and upper back',
    muscles: [
      { name: 'Rear Deltoids', type: 'primary', color: '#ef4444' },
      { name: 'Trapezius', type: 'secondary', color: '#f97316' },
      { name: 'Rhomboids', type: 'secondary', color: '#f97316' },
    ],
  },

  // Shoulders
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'Shoulders',
    defaultView: 'front',
    description: 'Compound shoulder exercise for overall deltoid development',
    muscles: [
      { name: 'Deltoids', type: 'primary', color: '#ef4444' },
      { name: 'Triceps', type: 'secondary', color: '#f97316' },
      { name: 'Upper Chest', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    category: 'Shoulders',
    defaultView: 'front',
    description: 'Isolation exercise for shoulder width',
    muscles: [
      { name: 'Medial Deltoids', type: 'primary', color: '#ef4444' },
      { name: 'Upper Trapezius', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'front-raise',
    name: 'Front Raise',
    category: 'Shoulders',
    defaultView: 'front',
    description: 'Isolation exercise for front delts',
    muscles: [
      { name: 'Anterior Deltoids', type: 'primary', color: '#ef4444' },
      { name: 'Upper Chest', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'reverse-fly',
    name: 'Reverse Fly',
    category: 'Shoulders',
    defaultView: 'back',
    description: 'Isolation for rear deltoids',
    muscles: [
      { name: 'Rear Deltoids', type: 'primary', color: '#ef4444' },
      { name: 'Rhomboids', type: 'secondary', color: '#f97316' },
      { name: 'Trapezius', type: 'secondary', color: '#f97316' },
    ],
  },

  // Core
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'Core',
    defaultView: 'front',
    description: 'Classic ab exercise for rectus abdominis',
    muscles: [
      { name: 'Rectus Abdominis', type: 'primary', color: '#ef4444' },
      { name: 'Obliques', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    defaultView: 'front',
    description: 'Isometric exercise for core stability',
    muscles: [
      { name: 'Core (Full)', type: 'primary', color: '#ef4444' },
      { name: 'Shoulders', type: 'secondary', color: '#f97316' },
      { name: 'Glutes', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    category: 'Core',
    defaultView: 'front',
    description: 'Rotational exercise for obliques',
    muscles: [
      { name: 'Obliques', type: 'primary', color: '#ef4444' },
      { name: 'Core', type: 'secondary', color: '#f97316' },
    ],
  },
  {
    id: 'leg-raise',
    name: 'Leg Raise',
    category: 'Core',
    defaultView: 'front',
    description: 'Lower ab focused exercise',
    muscles: [
      { name: 'Lower Abs', type: 'primary', color: '#ef4444' },
      { name: 'Hip Flexors', type: 'secondary', color: '#f97316' },
    ],
  },
];

// Get exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  return exerciseDatabase.find(ex => ex.id === id);
}

// Get exercises by category
export function getExercisesByCategory(category: string): Exercise[] {
  return exerciseDatabase.filter(ex => ex.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  const categories = new Set(exerciseDatabase.map(ex => ex.category));
  return Array.from(categories);
}

// Get related exercises by muscle
export function getRelatedExercisesByMuscle(muscleName: string): Exercise[] {
  return exerciseDatabase.filter(ex =>
    ex.muscles.some(m => m.name.toLowerCase().includes(muscleName.toLowerCase()))
  ).slice(0, 3);
}
