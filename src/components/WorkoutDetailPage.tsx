import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, ArrowLeft, Clock, Heart, Play, Target, Zap, CheckCircle2, Info, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { getWorkoutBySlug, getWorkoutsByLevel, type Workout, type Exercise } from '../utils/workoutDatabase';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../utils/authContext';
import { GatedAction } from './GatedAction';

export default function WorkoutDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [suggestedWorkouts, setSuggestedWorkouts] = useState<Workout[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundWorkout = getWorkoutBySlug(slug);
      if (foundWorkout) {
        setWorkout(foundWorkout);
        // Get suggested workouts from the same level
        const sameLevelWorkouts = getWorkoutsByLevel(foundWorkout.level)
          .filter(w => w.id !== foundWorkout.id)
          .slice(0, 3);
        setSuggestedWorkouts(sameLevelWorkouts);
      } else {
        navigate('/');
      }
    }
  }, [slug, navigate]);

  const toggleExercise = (id: number) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(exerciseId => exerciseId !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const handleSaveWorkout = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success('Workout saved to your plan! 💪');
    } else {
      toast('Workout removed from favorites');
    }
  };

  const handleMarkComplete = () => {
    if (completedExercises.length === workout?.exercises.length) {
      setWorkoutCompleted(true);
      toast.success('🎉 Workout completed! Amazing job! 💪', {
        description: 'Your progress has been tracked automatically',
        duration: 5000,
      });
    } else {
      toast.error('Please complete all exercises first', {
        description: `${completedExercises.length} of ${workout?.exercises.length} exercises completed`,
      });
    }
  };

  // Convert exercise name to slug for navigation
  const getExerciseSlug = (exerciseName: string): string => {
    // Map common exercise names to existing slugs
    const nameToSlug: { [key: string]: string } = {
      'squats': 'barbell-squat',
      'barbell squat': 'barbell-squat',
      'barbell back squat': 'barbell-squat',
      'back squat': 'barbell-squat',
      'bench press': 'bench-press',
      'barbell bench press': 'bench-press',
      'deadlift': 'deadlift',
      'barbell deadlift': 'deadlift',
      'conventional deadlift': 'deadlift',
      'overhead press': 'overhead-press',
      'military press': 'overhead-press',
      'shoulder press': 'overhead-press',
      'barbell row': 'barbell-row',
      'bent over row': 'barbell-row',
      'bent-over row': 'barbell-row',
      'pull up': 'pull-up',
      'pull-up': 'pull-up',
      'pullup': 'pull-up',
      'chin up': 'pull-up',
      'lunge': 'lunge',
      'lunges': 'lunge',
      'walking lunge': 'lunge',
    };

    const lowerName = exerciseName.toLowerCase();
    
    // Check if we have a direct mapping
    if (nameToSlug[lowerName]) {
      return nameToSlug[lowerName];
    }

    // Check if the name contains a known exercise
    for (const [key, value] of Object.entries(nameToSlug)) {
      if (lowerName.includes(key)) {
        return value;
      }
    }

    // Default: create a slug from the name
    return exerciseName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const navigateToExercise = (exercise: Exercise) => {
    const slug = getExerciseSlug(exercise.name);
    navigate(`/exercise/${slug}`);
  };

  // Exercise thumbnail images mapping
  const getExerciseThumbnail = (exerciseName: string) => {
    // Return placeholder images based on exercise type
    if (exerciseName.toLowerCase().includes('squat')) {
      return 'https://images.unsplash.com/photo-1675910518330-1843b4d03de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzcXVhdHMlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwMTY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (exerciseName.toLowerCase().includes('push')) {
      return 'https://images.unsplash.com/photo-1686247166156-0bca3e8b55d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNoJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwMTY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080';
    } else if (exerciseName.toLowerCase().includes('plank')) {
      return 'https://images.unsplash.com/photo-1758599878868-52cced2f8154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGNvcmUlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwMTY3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080';
    }
    return 'https://images.unsplash.com/photo-1733747660804-5a02541ba8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXhlcmNpc2UlMjBneW0lMjB3b3Jrb3V0fGVufDF8fHx8MTc2MjAxNjczN3ww&ixlib=rb-4.1.0&q=80&w=1080';
  };

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading workout...</p>
      </div>
    );
  }

  const progress = Math.round((completedExercises.length / workout.exercises.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
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
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Back Button */}
        <Link to="/workouts">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workouts
          </Button>
        </Link>

        <div className="max-w-4xl">
          {/* Hero Image/Video Section */}
          <Card className="mb-8 overflow-hidden border-2 border-gray-200 shadow-lg">
            <div className="aspect-video relative bg-gradient-to-br from-gray-900 to-gray-700">
              <ImageWithFallback
                src={workout.video || 'https://images.unsplash.com/photo-1733747660804-5a02541ba8dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZXhlcmNpc2UlMjBneW0lMjB3b3Jrb3V0fGVufDF8fHx8MTc2MjAxNjczN3ww&ixlib=rb-4.1.0&q=80&w=1080'}
                alt={workout.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Button size="lg" className="rounded-full w-20 h-20 p-0 bg-white/95 hover:bg-white text-blue-600 shadow-xl hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 ml-1" />
                  </Button>
                  <p className="text-white mt-4 text-sm" style={{ fontWeight: 600 }}>Watch Workout Preview</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Workout Info */}
          <div className="mb-8">
            {/* Top Info Bar */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className={`px-4 py-1 rounded-full text-sm text-white ${
                workout.level === 'beginner' ? 'bg-blue-500' :
                workout.level === 'intermediate' ? 'bg-purple-500' :
                'bg-orange-500'
              }`} style={{ fontWeight: 600 }}>
                {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Clock className="w-4 h-4" />
                {workout.duration}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Target className="w-4 h-4" />
                {workout.caloriesBurned}
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Dumbbell className="w-4 h-4" />
                {workout.equipment}
              </span>
            </div>

            <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>{workout.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{workout.description}</p>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Target Areas</p>
                <p style={{ fontWeight: 600 }}>{workout.targetAreas}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Trainer</p>
                <p style={{ fontWeight: 600 }}>{workout.trainer}</p>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              <GatedAction
                actionType="start-workout"
                actionMessage="Start your guided workout"
                onAuthenticated={() => {
                  toast.success('🎯 Starting your workout!');
                  // In a real app, this would start the workout tracker
                }}
                showLockIcon={true}
                tooltipText="Login to start guided workouts"
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                  {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
                  <Play className="w-5 h-5 mr-2" />
                  Start Guided Workout
                </Button>
              </GatedAction>
              
              <GatedAction
                actionType="save"
                actionMessage="Save this workout to your favorites"
                onAuthenticated={handleSaveWorkout}
                showLockIcon={true}
                tooltipText="Login to save workouts"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`border-2 ${isFavorited ? 'border-red-500 text-red-600 hover:bg-red-50' : ''}`}
                >
                  {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
                  <Heart className={`w-5 h-5 mr-2 ${isFavorited ? 'fill-red-500' : ''}`} />
                  {isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}
                </Button>
              </GatedAction>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontWeight: 600 }}>Progress</span>
                <span className="text-sm text-gray-600">
                  {completedExercises.length} of {workout.exercises.length} exercises
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Workout Breakdown Section - Enhanced Table */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Workout Breakdown</h2>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>✓</th>
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>Exercise</th>
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>Sets</th>
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>Reps</th>
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>Rest</th>
                      <th className="text-left py-3 px-2" style={{ fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workout.exercises.map((exercise) => (
                      <tr
                        key={exercise.id}
                        className={`border-b border-gray-100 transition-all ${
                          completedExercises.includes(exercise.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-4 px-2">
                          <Checkbox
                            checked={completedExercises.includes(exercise.id)}
                            onCheckedChange={() => toggleExercise(exercise.id)}
                          />
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                              <ImageWithFallback
                                src={getExerciseThumbnail(exercise.name)}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p style={{ fontWeight: 600 }}>{exercise.name}</p>
                              <p className="text-sm text-gray-500">{exercise.target}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2">{exercise.sets}</td>
                        <td className="py-4 px-2">{exercise.reps}</td>
                        <td className="py-4 px-2">{exercise.rest}</td>
                        <td className="py-4 px-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => navigateToExercise(exercise)}
                          >
                            <Info className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {workout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      completedExercises.includes(exercise.id)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Checkbox
                        checked={completedExercises.includes(exercise.id)}
                        onCheckedChange={() => toggleExercise(exercise.id)}
                        className="mt-1"
                      />
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        <ImageWithFallback
                          src={getExerciseThumbnail(exercise.name)}
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1" style={{ fontWeight: 600 }}>{exercise.name}</h3>
                        <p className="text-sm text-gray-500">{exercise.target}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                      <div className="bg-white p-2 rounded text-center border">
                        <p className="text-gray-500">Sets</p>
                        <p style={{ fontWeight: 600 }}>{exercise.sets}</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center border">
                        <p className="text-gray-500">Reps</p>
                        <p style={{ fontWeight: 600 }}>{exercise.reps}</p>
                      </div>
                      <div className="bg-white p-2 rounded text-center border">
                        <p className="text-gray-500">Rest</p>
                        <p style={{ fontWeight: 600 }}>{exercise.rest}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => navigateToExercise(exercise)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                ))}
              </div>

              {/* Mark Complete Button */}
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                {!workoutCompleted ? (
                  <Button
                    size="lg"
                    className={`w-full ${
                      completedExercises.length === workout.exercises.length
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    onClick={handleMarkComplete}
                    disabled={completedExercises.length !== workout.exercises.length}
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    {completedExercises.length === workout.exercises.length 
                      ? 'Mark as Completed' 
                      : `Complete all exercises (${completedExercises.length}/${workout.exercises.length})`
                    }
                  </Button>
                ) : (
                  <div className="text-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-3" />
                    <p className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                      Workout Completed! Great Job! 💪
                    </p>
                    <p className="mb-4 opacity-90">
                      📅 Added to your progress tracker automatically
                    </p>
                    <Link to="/progress">
                      <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        View Your Progress
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips & Notes Section */}
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>💬 Tips & Notes</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="mb-3 text-blue-600" style={{ fontWeight: 600 }}>💡 How to Perform</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Setup:</strong> Position yourself with feet shoulder-width apart, chest up, and core engaged.</p>
                    <p><strong>Movement:</strong> Execute each exercise with controlled form, focusing on the target muscle group.</p>
                    <p><strong>Breathing:</strong> Exhale during exertion (lifting), inhale during the easier phase (lowering).</p>
                    <p><strong>Tempo:</strong> Maintain a 2-1-2 tempo (2 seconds down, 1 second pause, 2 seconds up).</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="mb-3 text-purple-600" style={{ fontWeight: 600 }}>📅 Recommended Routine</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>Frequency:</strong> 3-4 times per week with at least one rest day between sessions</p>
                    <p><strong>Sets & Reps:</strong> Follow the prescribed sets and reps for each exercise</p>
                    <p><strong>Rest Periods:</strong> Adhere to rest times to optimize recovery and performance</p>
                    <p><strong>Progressive Overload:</strong> Increase weight by 2.5-5% when you can complete all sets with good form</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  <strong>💬 Pro Tip:</strong> Focus on controlled movements and breathing. Perform this routine 3× a week for best results and always warm up for 5-10 minutes before starting.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mistakes to Avoid */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Common Mistakes to Avoid</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <p className="text-gray-700"><strong>Poor Form:</strong> Sacrificing form for heavier weights leads to injury</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <p className="text-gray-700"><strong>Skipping Warm-up:</strong> Always warm up for 5-10 minutes before starting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <p className="text-gray-700"><strong>Ego Lifting:</strong> Start with manageable weights and progress gradually</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <p className="text-gray-700"><strong>Inadequate Rest:</strong> Don't skip rest days — muscles grow during recovery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Muscles Worked */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>Muscles Worked</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>Primary Muscles:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Quadriceps</li>
                    <li>• Chest (Pectorals)</li>
                    <li>• Back (Lats & Traps)</li>
                    <li>• Shoulders (Deltoids)</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>Secondary Muscles:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Core (Abs & Obliques)</li>
                    <li>• Glutes</li>
                    <li>• Hamstrings</li>
                    <li>• Triceps & Biceps</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-500 italic">Detailed muscle diagram coming soon</p>
              </div>
            </CardContent>
          </Card>

          {/* Video & 3D Preview Section */}
          <Card className="mb-6 border-2 border-purple-200">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Video Tutorial & 3D Model</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Video Container */}
                <div>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center border-2 border-blue-300 relative overflow-hidden group cursor-pointer">
                    <div className="text-center z-10">
                      <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-lg" style={{ fontWeight: 600 }}>▶️ Workout Tutorial Video</p>
                      <p className="text-sm text-gray-600 mt-1">Watch the form carefully</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 italic">Watch complete form guide with expert trainer</p>
                </div>

                {/* 3D Model Container */}
                <div>
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-6xl mb-3">🧍</div>
                      <p className="text-lg text-gray-600" style={{ fontWeight: 600 }}>3D Pose Model</p>
                      <p className="text-sm text-gray-500 mt-1">(Available in later versions)</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 italic">Visualize movements in 3D space (coming soon)</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 bg-blue-50 p-3 rounded-lg">
                💡 <strong>Tip:</strong> Watch the form carefully or visualize movements in 3D (available in later versions).
              </p>
            </CardContent>
          </Card>

          {/* Pro Tips & Form Section */}
          <Card className="mb-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>💡 Pro Tips & Safety</h2>
              <div className="space-y-4">
                {workout.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Workouts Section */}
          {suggestedWorkouts.length > 0 && (
            <Card className="mb-6 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl mb-2" style={{ fontWeight: 700 }}>Other Workouts You Might Like 💪</h2>
                  <p className="text-gray-600">Check out these similar workouts at your level</p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {suggestedWorkouts.map((suggestedWorkout) => (
                    <Link key={suggestedWorkout.id} to={`/workout/${suggestedWorkout.slug}`}>
                      <Card className="cursor-pointer hover:shadow-xl transition-all border-2 hover:border-blue-400 hover:-translate-y-1 bg-white h-full">
                        <CardContent className="p-0">
                          <div className={`aspect-video rounded-t-lg mb-3 flex items-center justify-center relative overflow-hidden ${
                            suggestedWorkout.level === 'beginner' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                            suggestedWorkout.level === 'intermediate' ? 'bg-gradient-to-br from-purple-100 to-purple-200' :
                            'bg-gradient-to-br from-orange-100 to-orange-200'
                          }`}>
                            <Dumbbell className={`w-16 h-16 ${
                              suggestedWorkout.level === 'beginner' ? 'text-blue-600' :
                              suggestedWorkout.level === 'intermediate' ? 'text-purple-600' :
                              'text-orange-600'
                            }`} />
                            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs text-white ${
                              suggestedWorkout.level === 'beginner' ? 'bg-blue-500' :
                              suggestedWorkout.level === 'intermediate' ? 'bg-purple-500' :
                              'bg-orange-500'
                            }`} style={{ fontWeight: 600 }}>
                              {suggestedWorkout.level.charAt(0).toUpperCase() + suggestedWorkout.level.slice(1)}
                            </span>
                          </div>
                          <div className="p-4">
                            <h3 className="mb-2" style={{ fontWeight: 700 }}>{suggestedWorkout.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {suggestedWorkout.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Zap className="w-4 h-4" />
                                {suggestedWorkout.caloriesBurned}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{suggestedWorkout.description}</p>
                            <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                              View Workout
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Motivational Footer */}
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white">
            <CardContent className="p-8 text-center">
              <p className="text-2xl mb-2 italic" style={{ fontWeight: 600 }}>
                "Train smart, eat desi, and grow stronger every day 💪"
              </p>
              <p className="text-lg opacity-90">#M2FitnessCommunity</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
