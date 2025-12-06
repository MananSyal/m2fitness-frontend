/**
 * WorkoutPlanPage (OpenArea Flow)
 *
 * Version: M2Fitness v16.5
 */

import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

import {
  Home,
  Dumbbell,
  TrendingUp,
  User,
  LogOut,
  Utensils,
  Search,
  Clock,
  Play,
  X,
  Zap,
  GitPullRequest,
  Repeat,
  Target,
} from 'lucide-react';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { workoutDatabase, type Workout } from '../utils/workoutDatabase';

export default function WorkoutPlanPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Desktop sidebar open/close (desktop only)
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----------------- Exercise Data -----------------
  const exercises = [
    // Chest
    { name: 'Bench Press', category: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Incline Bench Press', category: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Dumbbell Chest Press', category: 'Chest', difficulty: 'Beginner', equipment: 'Dumbbells' },
    { name: 'Push-ups', category: 'Chest', difficulty: 'Beginner', equipment: 'Bodyweight' },
    { name: 'Incline Dumbbell Press', category: 'Chest', difficulty: 'Intermediate', equipment: 'Dumbbells' },
    { name: 'Cable Chest Fly', category: 'Chest', difficulty: 'Intermediate', equipment: 'Cable' },
    { name: 'Cable Flyes', category: 'Chest', difficulty: 'Intermediate', equipment: 'Cable' },
    { name: 'Dips', category: 'Chest', difficulty: 'Advanced', equipment: 'Bodyweight' },
    { name: 'Dumbbell Flyes', category: 'Chest', difficulty: 'Beginner', equipment: 'Dumbbells' },

    // Back
    { name: 'Deadlift', category: 'Back', difficulty: 'Advanced', equipment: 'Barbell' },
    { name: 'Pull-ups', category: 'Back', difficulty: 'Intermediate', equipment: 'Bodyweight' },
    { name: 'Bent-over Row', category: 'Back', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Lat Pulldown', category: 'Back', difficulty: 'Beginner', equipment: 'Cable' },
    { name: 'Seated Cable Row', category: 'Back', difficulty: 'Beginner', equipment: 'Cable' },
    { name: 'T-Bar Row', category: 'Back', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Single-Arm Dumbbell Row', category: 'Back', difficulty: 'Beginner', equipment: 'Dumbbells' },

    // Legs
    { name: 'Barbell Squat', category: 'Legs', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Lunges', category: 'Legs', difficulty: 'Beginner', equipment: 'Bodyweight' },
    { name: 'Leg Press', category: 'Legs', difficulty: 'Beginner', equipment: 'Machine' },
    { name: 'Romanian Deadlift', category: 'Legs', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Leg Curl', category: 'Legs', difficulty: 'Beginner', equipment: 'Machine' },
    { name: 'Leg Extension', category: 'Legs', difficulty: 'Beginner', equipment: 'Machine' },
    { name: 'Bulgarian Split Squat', category: 'Legs', difficulty: 'Intermediate', equipment: 'Dumbbells' },
    { name: 'Calf Raises', category: 'Legs', difficulty: 'Beginner', equipment: 'Bodyweight' },

    // Shoulders
    { name: 'Overhead Press', category: 'Shoulders', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Lateral Raises', category: 'Shoulders', difficulty: 'Beginner', equipment: 'Dumbbells' },
    { name: 'Front Raises', category: 'Shoulders', difficulty: 'Beginner', equipment: 'Dumbbells' },
    { name: 'Arnold Press', category: 'Shoulders', difficulty: 'Intermediate', equipment: 'Dumbbells' },
    { name: 'Face Pulls', category: 'Shoulders', difficulty: 'Beginner', equipment: 'Cable' },
    { name: 'Upright Row', category: 'Shoulders', difficulty: 'Intermediate', equipment: 'Barbell' },

    // Arms
    { name: 'Bicep Curls', category: 'Arms', difficulty: 'Beginner', equipment: 'Dumbbells' },
    { name: 'Tricep Dips', category: 'Arms', difficulty: 'Intermediate', equipment: 'Bodyweight' },
    { name: 'Hammer Curls', category: 'Arms', difficulty: 'Beginner', equipment: 'Dumbbells' },
    { name: 'Tricep Pushdown', category: 'Arms', difficulty: 'Beginner', equipment: 'Cable' },
    { name: 'Skull Crushers', category: 'Arms', difficulty: 'Intermediate', equipment: 'Barbell' },
    { name: 'Preacher Curls', category: 'Arms', difficulty: 'Intermediate', equipment: 'Dumbbells' },
    { name: 'Overhead Tricep Extension', category: 'Arms', difficulty: 'Beginner', equipment: 'Dumbbells' },

    // Core
    { name: 'Plank', category: 'Core', difficulty: 'Beginner', equipment: 'Bodyweight' },
    { name: 'Crunches', category: 'Core', difficulty: 'Beginner', equipment: 'Bodyweight' },
    { name: 'Russian Twists', category: 'Core', difficulty: 'Intermediate', equipment: 'Bodyweight' },
    { name: 'Hanging Leg Raises', category: 'Core', difficulty: 'Advanced', equipment: 'Bodyweight' },
    { name: 'Cable Crunches', category: 'Core', difficulty: 'Intermediate', equipment: 'Cable' },
    { name: 'Mountain Climbers', category: 'Core', difficulty: 'Intermediate', equipment: 'Bodyweight' },
    { name: 'Ab Wheel Rollout', category: 'Core', difficulty: 'Advanced', equipment: 'Ab Wheel' },

    // Cardio
    { name: 'Running', category: 'Cardio', difficulty: 'Beginner', equipment: 'None' },
    { name: 'Jump Rope', category: 'Cardio', difficulty: 'Beginner', equipment: 'Jump Rope' },
    { name: 'Burpees', category: 'Cardio', difficulty: 'Intermediate', equipment: 'Bodyweight' },
    { name: 'Cycling', category: 'Cardio', difficulty: 'Beginner', equipment: 'Bike' },
    { name: 'Rowing', category: 'Cardio', difficulty: 'Intermediate', equipment: 'Rowing Machine' },
    { name: 'Battle Ropes', category: 'Cardio', difficulty: 'Advanced', equipment: 'Battle Ropes' },

    // Full Body
    { name: 'Clean and Press', category: 'Full Body', difficulty: 'Advanced', equipment: 'Barbell' },
    { name: 'Kettlebell Swings', category: 'Full Body', difficulty: 'Intermediate', equipment: 'Kettlebell' },
    { name: 'Thrusters', category: 'Full Body', difficulty: 'Advanced', equipment: 'Barbell' },
    { name: 'Medicine Ball Slams', category: 'Full Body', difficulty: 'Intermediate', equipment: 'Medicine Ball' },
  ];

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Full Body'];

  // ----------------- Filtering -----------------
  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter((ex) => ex.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.category.toLowerCase().includes(q) ||
          ex.equipment.toLowerCase().includes(q) ||
          ex.difficulty.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // ----------------- Workout Plans (tabs) -----------------
  const workouts = {
    beginner: workoutDatabase.filter((w) => w.level === 'beginner'),
    intermediate: workoutDatabase.filter((w) => w.level === 'intermediate'),
    advanced: workoutDatabase.filter((w) => w.level === 'advanced'),
  };

  const renderWorkoutCard = (workout: Workout) => (
    <Card
      key={workout.id}
      className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2 hover:border-blue-400"
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100">
        <ImageWithFallback
          src={
            workout.video ||
            'https://images.unsplash.com/photo-1733747660804-5a02541ba8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
          }
          alt={workout.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 text-white text-sm rounded-full backdrop-blur-sm ${
              workout.level === 'beginner'
                ? 'bg-blue-500'
                : workout.level === 'intermediate'
                ? 'bg-purple-500'
                : 'bg-orange-500'
            }`}
            style={{ fontWeight: 600 }}
          >
            {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2" style={{ fontWeight: 700 }}>
          {workout.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{workout.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {workout.duration}
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            {workout.caloriesBurned}
          </span>
        </div>
        <Link to={`/workout/${workout.slug}`}>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Play className="w-4 h-4 mr-2" />
            View Workout
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // --------------- Exercise Slugs + Detail Pages ---------------
  const getExerciseSlug = (exerciseName: string): string => {
    const nameToSlug: { [key: string]: string } = {
      // Core 7
      'barbell squat': 'barbell-squat',
      'bench press': 'bench-press',
      deadlift: 'deadlift',
      'overhead press': 'overhead-press',
      'bent-over row': 'barbell-row',
      'barbell row': 'barbell-row',
      'pull-ups': 'pull-up',
      'pull up': 'pull-up',
      lunges: 'lunge',

      // Chest
      'incline bench press': 'incline-bench-press',
      'dumbbell chest press': 'dumbbell-chest-press',
      'dumbbell press': 'dumbbell-chest-press',
      'push-ups': 'push-up',
      'push ups': 'push-up',
      'incline dumbbell press': 'incline-dumbbell-press',
      'cable chest fly': 'cable-chest-fly',
      'cable flyes': 'cable-flyes',
      'cable fly': 'cable-flyes',
      'dumbbell flyes': 'dumbbell-flyes',
      'dumbbell fly': 'dumbbell-flyes',
      dips: 'dips',

      // Back
      'lat pulldown': 'lat-pulldown',
      'seated cable row': 'seated-cable-row',
      't-bar row': 't-bar-row',
      'single-arm dumbbell row': 'single-arm-dumbbell-row',

      // Legs
      'leg press': 'leg-press',
      'romanian deadlift': 'romanian-deadlift',
      'leg curl': 'leg-curl',
      'leg extension': 'leg-extension',
      'bulgarian split squat': 'bulgarian-split-squat',
      'calf raises': 'calf-raises',
      'calf raise': 'calf-raises',

      // Shoulders
      'lateral raises': 'lateral-raises',
      'lateral raise': 'lateral-raises',
      'front raises': 'front-raises',
      'front raise': 'front-raises',
      'arnold press': 'arnold-press',
      'face pulls': 'face-pulls',
      'face pull': 'face-pulls',
      'upright row': 'upright-row',

      // Arms
      'bicep curls': 'bicep-curls',
      'bicep curl': 'bicep-curls',
      'hammer curls': 'hammer-curls',
      'hammer curl': 'hammer-curls',
      'preacher curls': 'preacher-curls',
      'preacher curl': 'preacher-curls',
      'tricep pushdown': 'tricep-pushdown',
      'skull crushers': 'skull-crushers',
      'skull crusher': 'skull-crushers',
      'tricep dips': 'dips',
      'overhead tricep extension': 'overhead-tricep-extension',

      // Core
      plank: 'plank',
      crunches: 'crunches',
      'russian twists': 'russian-twists',
      'russian twist': 'russian-twists',
      'hanging leg raises': 'hanging-leg-raises',
      'hanging leg raise': 'hanging-leg-raises',
      'cable crunches': 'cable-crunches',
      'cable crunch': 'cable-crunches',
      'mountain climbers': 'mountain-climbers',
      'mountain climber': 'mountain-climbers',
      'ab wheel rollout': 'ab-wheel-rollout',
      'ab wheel': 'ab-wheel-rollout',

      // Cardio / Full body mapping
      burpees: 'burpees',
      running: 'burpees',
      'jump rope': 'burpees',
      cycling: 'leg-press',
      rowing: 'seated-cable-row',
      'battle ropes': 'mountain-climbers',

      // Full Body
      'clean and press': 'overhead-press',
      'kettlebell swings': 'kettlebell-swings',
      'kettlebell swing': 'kettlebell-swings',
      thrusters: 'overhead-press',
      'medicine ball slams': 'overhead-press',

      // Extra
      'pendlay row': 'pendlay-row',
      'chin-up': 'chin-up',
      'chin up': 'chin-up',
      'assisted pull-up': 'assisted-pull-up',
      'assisted pull up': 'assisted-pull-up',
      'reverse lunge': 'reverse-lunge',
      'step-ups': 'step-ups',
      'step-up': 'step-ups',
      'step ups': 'step-ups',
    };

    const lower = exerciseName.toLowerCase();
    if (nameToSlug[lower]) return nameToSlug[lower];

    for (const [key, value] of Object.entries(nameToSlug)) {
      if (lower.includes(key)) return value;
    }

    return lower.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleViewExercise = (exerciseName: string) => {
    const slug = getExerciseSlug(exerciseName);
    navigate(`/exercise/${slug}`);
  };

  const handleHeaderSearch = (q: string) => {
    setSearchQuery(q);
  };

  // ----------------- RENDER -----------------
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Mobile Header with global search hooked into this page */}
      <MobileHeader showSearch onSearch={handleHeaderSearch} />

      {/* Desktop sidebar (fixed) */}
      {sidebarOpen && (
        <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r shadow-lg z-30">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg" />
              <span className="text-xl" style={{ fontWeight: 700 }}>
                M2Fitness
              </span>
            </div>
            <nav className="space-y-2">
              <Link to="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Button>
              </Link>
              <Link to="/workouts">
                <Button variant="secondary" className="w-full justify-start">
                  <Dumbbell className="w-5 h-5 mr-3" />
                  Workouts
                </Button>
              </Link>
              <Link to="/diet/new-plan">
                <Button variant="ghost" className="w-full justify-start">
                  <Utensils className="w-5 h-5 mr-3" />
                  Diet Plans
                </Button>
              </Link>
              <Link to="/progress">
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Progress
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Button>
              </Link>
              <Link to="/">
                <Button className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" variant="ghost">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </Link>
            </nav>
          </div>
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="w-full md:ml-64 px-4 md:px-8 pt-4 md:pt-8 max-w-5xl mx-auto">
        {/* Page heading (visible on mobile & desktop) */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl mb-1" style={{ fontWeight: 700 }}>
            Workout Plans & Exercises
          </h1>
          <p className="text-base md:text-xl text-gray-600">
            Find the perfect workout or search for specific exercises
          </p>
        </div>

        {/* Enhanced Search Section */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50 to-orange-50 border-2">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search exercises (e.g., bench press, squats, deadlift...)"
                  className="pl-10 pr-10 h-12 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive =
                    (category === 'All' && !selectedCategory) || selectedCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border hover:border-blue-300'
                      }`}
                      style={isActive ? { fontWeight: 600 } : {}}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontWeight: 700 }}>
                  {selectedCategory ? `${selectedCategory} Exercises` : 'Exercise Search Results'}
                </h2>
                <p className="text-sm text-gray-500">
                  Click any exercise to view detailed form guides and muscle activation
                </p>
              </div>
              <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
                {filteredExercises.length} exercise
                {filteredExercises.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {filteredExercises.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredExercises.map((exercise, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2 hover:border-blue-400"
                    onClick={() => handleViewExercise(exercise.name)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className="group-hover:text-blue-600 transition-colors"
                              style={{ fontWeight: 600 }}
                            >
                              {exercise.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">{exercise.category}</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Dumbbell className="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(
                            exercise.difficulty
                          )}`}
                        >
                          {exercise.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{exercise.equipment}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full bg-white group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-300 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewExercise(exercise.name);
                        }}
                      >
                        View Details →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>
                    No exercises found
                  </h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Workout Splits Section (only when not searching) */}
        {!searchQuery && !selectedCategory && (
          <div className="mb-12">
            <div className="mb-8 text-center">
              <h2 className="text-4xl mb-3" style={{ fontWeight: 700 }}>
                Choose Your Training Split
              </h2>
              <p className="text-xl text-gray-600">
                Select a workout split that fits your schedule and goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Push-Pull Split */}
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 group cursor-pointer"
                onClick={() => navigate('/workouts/push-pull-split')}
              >
                <div className="relative h-56 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                  <GitPullRequest className="w-24 h-24 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                      POPULAR
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-2xl mb-3 group-hover:text-blue-600 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    Push-Pull Split
                  </h3>
                  <p className="text-gray-700 mb-4" style={{ fontWeight: 500 }}>
                    Train complementary upper body movements for balanced strength and growth.
                  </p>

                  <div className="mb-4">
                    <div className="mb-3">
                      <span
                        className="text-sm text-blue-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Push Exercises:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Bench Press, Overhead Press, Dips, Tricep Extensions
                      </p>
                    </div>
                    <div>
                      <span
                        className="text-sm text-purple-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Pull Exercises:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Pull-Ups, Rows, Deadlifts, Bicep Curls
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      4-6 Days/Week
                    </span>
                    <span
                      className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      Intermediate
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/workouts/push-pull-split');
                    }}
                  >
                    Start Push-Pull
                  </Button>
                </CardContent>
              </Card>

              {/* Double Muscle Split */}
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-500 group cursor-pointer"
                onClick={() => navigate('/workouts/double-muscle-split')}
              >
                <div className="relative h-56 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center overflow-hidden">
                  <Repeat className="w-24 h-24 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                      EFFICIENT
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-2xl mb-3 group-hover:text-orange-600 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    Double Muscle Split
                  </h3>
                  <p className="text-gray-700 mb-4" style={{ fontWeight: 500 }}>
                    Efficient sessions combining two related muscle groups for maximum activation.
                  </p>

                  <div className="mb-4">
                    <div className="mb-3">
                      <span
                        className="text-sm text-orange-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Example Pairings:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Chest + Triceps, Back + Biceps</p>
                    </div>
                    <div>
                      <span
                        className="text-sm text-red-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Sample Day:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Bench Press, Flyes, Dips, Tricep Pushdowns
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      3-5 Days/Week
                    </span>
                    <span
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      Beginner-Int
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/workouts/double-muscle-split');
                    }}
                  >
                    Start Double Split
                  </Button>
                </CardContent>
              </Card>

              {/* Single Muscle Split */}
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-500 group cursor-pointer"
                onClick={() => navigate('/workouts/single-muscle-split')}
              >
                <div className="relative h-56 bg-gradient-to-br from-green-500 via-green-600 to-teal-600 flex items-center justify-center overflow-hidden">
                  <Target className="w-24 h-24 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                      INTENSE
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3
                    className="text-2xl mb-3 group-hover:text-green-600 transition-colors"
                    style={{ fontWeight: 700 }}
                  >
                    Single Muscle Split
                  </h3>
                  <p className="text-gray-700 mb-4" style={{ fontWeight: 500 }}>
                    Isolated workouts for detailed muscle definition and recovery optimization.
                  </p>

                  <div className="mb-4">
                    <div className="mb-3">
                      <span
                        className="text-sm text-green-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Weekly Schedule:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">Chest Day, Leg Day, Arm Day, etc.</p>
                    </div>
                    <div>
                      <span
                        className="text-sm text-teal-600 uppercase tracking-wide"
                        style={{ fontWeight: 700 }}
                      >
                        Chest Day Example:
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        5+ exercises focusing solely on chest muscles
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      5-6 Days/Week
                    </span>
                    <span
                      className="px-3 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm"
                      style={{ fontWeight: 600 }}
                    >
                      Advanced
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/workouts/single-muscle-split');
                    }}
                  >
                    Start Single Split
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Workout Plans Tabs */}
        <div className="pb-4">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>
            {searchQuery || selectedCategory ? 'Featured Workout Plans' : 'Workout Plans'}
          </h2>

          <Tabs defaultValue="intermediate" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="beginner">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.beginner.map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="intermediate">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.intermediate.map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.advanced.map(renderWorkoutCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
}
