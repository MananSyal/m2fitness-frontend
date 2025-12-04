import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Dumbbell, Calendar, Target, Flame, Home, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Helper function to convert exercise name to slug
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');
};

export default function DoubleMuscleSplitPage() {
  const navigate = useNavigate();
  
  const weekPlan = [
    {
      day: 1,
      title: 'Chest + Triceps',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8-10', rest: '90s', type: 'Chest' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', rest: '60s', type: 'Chest' },
        { name: 'Cable Chest Fly', sets: '3', reps: '12-15', rest: '60s', type: 'Chest' },
        { name: 'Dips', sets: '3', reps: '10-12', rest: '60s', type: 'Triceps' },
        { name: 'Tricep Pushdown', sets: '3', reps: '12-15', rest: '45s', type: 'Triceps' },
        { name: 'Overhead Tricep Extension', sets: '3', reps: '12-15', rest: '45s', type: 'Triceps' },
      ],
    },
    {
      day: 2,
      title: 'Back + Biceps',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      exercises: [
        { name: 'Deadlift', sets: '4', reps: '6-8', rest: '120s', type: 'Back' },
        { name: 'Pull-ups', sets: '4', reps: '8-10', rest: '90s', type: 'Back' },
        { name: 'Bent-over Row', sets: '3', reps: '10-12', rest: '60s', type: 'Back' },
        { name: 'Lat Pulldown', sets: '3', reps: '10-12', rest: '60s', type: 'Back' },
        { name: 'Barbell Curls', sets: '3', reps: '10-12', rest: '60s', type: 'Biceps' },
        { name: 'Hammer Curls', sets: '3', reps: '12-15', rest: '45s', type: 'Biceps' },
      ],
    },
    {
      day: 3,
      title: 'Legs + Core',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      exercises: [
        { name: 'Barbell Squat', sets: '4', reps: '8-10', rest: '120s', type: 'Legs' },
        { name: 'Romanian Deadlift', sets: '4', reps: '8-10', rest: '90s', type: 'Legs' },
        { name: 'Leg Press', sets: '3', reps: '12-15', rest: '60s', type: 'Legs' },
        { name: 'Leg Curl', sets: '3', reps: '12-15', rest: '60s', type: 'Legs' },
        { name: 'Plank', sets: '3', reps: '60s hold', rest: '45s', type: 'Core' },
        { name: 'Russian Twists', sets: '3', reps: '20 reps', rest: '45s', type: 'Core' },
      ],
    },
    {
      day: 4,
      title: 'Shoulders + Arms',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      exercises: [
        { name: 'Overhead Press', sets: '4', reps: '8-10', rest: '90s', type: 'Shoulders' },
        { name: 'Lateral Raises', sets: '3', reps: '12-15', rest: '45s', type: 'Shoulders' },
        { name: 'Front Raises', sets: '3', reps: '12-15', rest: '45s', type: 'Shoulders' },
        { name: 'Face Pulls', sets: '3', reps: '12-15', rest: '45s', type: 'Shoulders' },
        { name: 'Bicep Curls', sets: '3', reps: '10-12', rest: '60s', type: 'Arms' },
        { name: 'Tricep Dips', sets: '3', reps: '10-12', rest: '60s', type: 'Arms' },
      ],
    },
    {
      day: 5,
      title: 'Full Body or Active Rest',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      exercises: [
        { name: 'Light Compound Lifts', sets: '2-3', reps: '12-15', rest: '60s', type: 'Full Body' },
        { name: 'Bodyweight Circuit', sets: '3', reps: '10 min', rest: '60s', type: 'Full Body' },
        { name: 'Swimming or Cycling', sets: '1', reps: '20-30 min', rest: '-', type: 'Cardio' },
      ],
    },
    {
      day: 6,
      title: 'Cardio or Mobility',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      exercises: [
        { name: 'Running or Cycling', sets: '1', reps: '30-45 min', rest: '-', type: 'Cardio' },
        { name: 'Yoga Flow', sets: '1', reps: '20 min', rest: '-', type: 'Mobility' },
        { name: 'Stretching Routine', sets: '1', reps: '15 min', rest: '-', type: 'Mobility' },
      ],
    },
    {
      day: 7,
      title: 'Rest Day',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      exercises: [
        { name: 'Complete Rest', sets: '-', reps: 'Sleep 8+ hours', rest: '-', type: 'Recovery' },
        { name: 'Light Walk (Optional)', sets: '1', reps: '15-20 min', rest: '-', type: 'Recovery' },
        { name: 'Meal Prep', sets: '-', reps: 'Plan next week', rest: '-', type: 'Recovery' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link to="/workouts">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Workout Splits
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/20 border border-white/30">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl mb-4" style={{ fontWeight: 700 }}>
              Double Muscle Split Program
            </h1>
            <p className="text-2xl text-orange-100 mb-6">
              Efficient sessions combining two related muscle groups for maximum activation
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>4 Training Days + 3 Active Rest</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span>Beginner-Intermediate</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6" />
                <span>Balanced Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Plan - Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Your 7-Day Training Plan</h2>
          <p className="text-xl text-gray-600">
            Color-coded workout days for easy tracking and optimal muscle pairing
          </p>
        </div>

        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            {weekPlan.map((day) => (
              <TabsTrigger key={day.day} value={`day${day.day}`} className="text-xs sm:text-sm">
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {weekPlan.map((day) => (
            <TabsContent key={day.day} value={`day${day.day}`}>
              <Card className={`overflow-hidden border-2 ${day.borderColor} ${day.bgColor}`}>
                <CardHeader className={`bg-gradient-to-r ${day.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-4xl mb-2">
                        Day {day.day}: {day.title}
                      </CardTitle>
                      <p className="text-lg opacity-90">
                        {day.exercises.length} exercises • {day.day === 7 ? 'Rest' : '45-60 min session'}
                      </p>
                    </div>
                    <Dumbbell className="w-16 h-16 opacity-75" />
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {day.exercises.map((exercise, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border-2 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-xl" style={{ fontWeight: 700 }}>{exercise.name}</h4>
                            <p className="text-sm text-gray-600">{exercise.type}</p>
                          </div>
                        </div>
                        <div className="flex gap-6 text-center items-center">
                          <div>
                            <p className="text-sm text-gray-600">Sets</p>
                            <p className="text-lg" style={{ fontWeight: 700 }}>{exercise.sets}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Reps</p>
                            <p className="text-lg" style={{ fontWeight: 700 }}>{exercise.reps}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Rest</p>
                            <p className="text-lg" style={{ fontWeight: 700 }}>{exercise.rest}</p>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-orange-300 hover:bg-orange-50 hover:border-orange-500 whitespace-nowrap"
                              onClick={() => navigate(`/exercise/${createSlug(exercise.name)}`)}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>💪 Training Guidelines</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-orange-600" style={{ fontWeight: 700 }}>✓</span>
                <span>This split is perfect for 3-5 days per week - adjust based on your schedule</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Training muscle groups together saves time and increases workout efficiency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Ensure proper nutrition with 0.8-1g protein per pound of bodyweight</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Track your weights and aim to increase load or reps every 2-3 weeks</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/workouts">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explore Other Splits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
