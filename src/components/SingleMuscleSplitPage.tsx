import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Dumbbell, Calendar, Target, Flame, Trophy, Home, ExternalLink } from 'lucide-react';

// Helper function to convert exercise name to slug
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');
};

export default function SingleMuscleSplitPage() {
  const navigate = useNavigate();
  
  const weekPlan = [
    {
      day: 1,
      title: 'Chest Day',
      subtitle: 'Complete Chest Domination',
      color: 'from-green-500 to-green-600',
      icon: '💪',
      exercises: [
        { name: 'Flat Bench Press', sets: '4', reps: '6-8', rest: '120s', notes: 'Heavy compound' },
        { name: 'Incline Bench Press', sets: '4', reps: '8-10', rest: '90s', notes: 'Upper chest focus' },
        { name: 'Decline Dumbbell Press', sets: '3', reps: '10-12', rest: '60s', notes: 'Lower chest' },
        { name: 'Cable Flyes', sets: '3', reps: '12-15', rest: '60s', notes: 'Chest stretch' },
        { name: 'Dumbbell Flyes', sets: '3', reps: '12-15', rest: '60s', notes: 'Isolation' },
        { name: 'Push-ups (Burnout)', sets: '3', reps: 'To failure', rest: '45s', notes: 'Finish strong' },
      ],
    },
    {
      day: 2,
      title: 'Back Day',
      subtitle: 'Build a Massive Back',
      color: 'from-blue-500 to-blue-600',
      icon: '🦅',
      exercises: [
        { name: 'Deadlift', sets: '4', reps: '5-6', rest: '180s', notes: 'King of back' },
        { name: 'Pull-ups (Weighted)', sets: '4', reps: '8-10', rest: '90s', notes: 'Lat builder' },
        { name: 'Bent-over Barbell Row', sets: '4', reps: '8-10', rest: '90s', notes: 'Thick back' },
        { name: 'T-Bar Row', sets: '3', reps: '10-12', rest: '60s', notes: 'Mid back' },
        { name: 'Lat Pulldown', sets: '3', reps: '12-15', rest: '60s', notes: 'Width focus' },
        { name: 'Face Pulls', sets: '3', reps: '15-20', rest: '45s', notes: 'Rear delts' },
      ],
    },
    {
      day: 3,
      title: 'Shoulders Day',
      subtitle: 'Boulder Shoulders Workout',
      color: 'from-purple-500 to-purple-600',
      icon: '🏔️',
      exercises: [
        { name: 'Overhead Press', sets: '4', reps: '6-8', rest: '120s', notes: 'Mass builder' },
        { name: 'Arnold Press', sets: '4', reps: '8-10', rest: '90s', notes: 'Full rotation' },
        { name: 'Lateral Raises', sets: '4', reps: '12-15', rest: '45s', notes: 'Side delts' },
        { name: 'Front Raises', sets: '3', reps: '12-15', rest: '45s', notes: 'Front delts' },
        { name: 'Rear Delt Flyes', sets: '4', reps: '12-15', rest: '45s', notes: 'Rear delts' },
        { name: 'Upright Row', sets: '3', reps: '10-12', rest: '60s', notes: 'Overall mass' },
      ],
    },
    {
      day: 4,
      title: 'Arms Day',
      subtitle: 'Biceps & Triceps Blowout',
      color: 'from-red-500 to-red-600',
      icon: '💥',
      exercises: [
        { name: 'Barbell Curls', sets: '4', reps: '8-10', rest: '60s', notes: 'Bicep mass' },
        { name: 'Close-grip Bench Press', sets: '4', reps: '8-10', rest: '90s', notes: 'Tricep mass' },
        { name: 'Hammer Curls', sets: '3', reps: '10-12', rest: '60s', notes: 'Brachialis' },
        { name: 'Tricep Dips', sets: '3', reps: '10-12', rest: '60s', notes: 'Tricep mass' },
        { name: 'Preacher Curls', sets: '3', reps: '12-15', rest: '45s', notes: 'Bicep peak' },
        { name: 'Overhead Tricep Extension', sets: '3', reps: '12-15', rest: '45s', notes: 'Long head' },
        { name: 'Cable Curls', sets: '3', reps: '15-20', rest: '30s', notes: 'Pump' },
        { name: 'Tricep Pushdown', sets: '3', reps: '15-20', rest: '30s', notes: 'Pump' },
      ],
    },
    {
      day: 5,
      title: 'Legs Day',
      subtitle: 'Never Skip Leg Day',
      color: 'from-orange-500 to-orange-600',
      icon: '🦵',
      exercises: [
        { name: 'Barbell Squat', sets: '5', reps: '6-8', rest: '180s', notes: 'Quad king' },
        { name: 'Romanian Deadlift', sets: '4', reps: '8-10', rest: '90s', notes: 'Hamstring focus' },
        { name: 'Leg Press', sets: '4', reps: '12-15', rest: '60s', notes: 'Overall legs' },
        { name: 'Leg Curl', sets: '4', reps: '12-15', rest: '60s', notes: 'Hamstrings' },
        { name: 'Leg Extension', sets: '4', reps: '12-15', rest: '60s', notes: 'Quad isolation' },
        { name: 'Walking Lunges', sets: '3', reps: '12/leg', rest: '60s', notes: 'Functional' },
        { name: 'Calf Raises', sets: '5', reps: '15-20', rest: '45s', notes: 'Calves' },
      ],
    },
    {
      day: 6,
      title: 'Core + Cardio',
      subtitle: 'Conditioning & Definition',
      color: 'from-teal-500 to-teal-600',
      icon: '🔥',
      exercises: [
        { name: 'Plank', sets: '4', reps: '60-90s', rest: '45s', notes: 'Core stability' },
        { name: 'Russian Twists', sets: '4', reps: '20 reps', rest: '45s', notes: 'Obliques' },
        { name: 'Hanging Leg Raises', sets: '3', reps: '12-15', rest: '60s', notes: 'Lower abs' },
        { name: 'Cable Crunches', sets: '4', reps: '15-20', rest: '45s', notes: 'Upper abs' },
        { name: 'Mountain Climbers', sets: '3', reps: '30 reps', rest: '30s', notes: 'Cardio core' },
        { name: 'HIIT Cardio', sets: '1', reps: '20 min', rest: '-', notes: 'Fat burn' },
      ],
    },
    {
      day: 7,
      title: 'Rest Day',
      subtitle: 'Recovery & Growth',
      color: 'from-gray-500 to-gray-600',
      icon: '😴',
      exercises: [
        { name: 'Full Rest', sets: '-', reps: 'Sleep 8+ hours', rest: '-', notes: 'Recovery priority' },
        { name: 'Light Stretching', sets: '1', reps: '15 min', rest: '-', notes: 'Optional mobility' },
        { name: 'Foam Rolling', sets: '1', reps: '10 min', rest: '-', notes: 'Muscle recovery' },
        { name: 'Meal Planning', sets: '-', reps: 'Prep meals', rest: '-', notes: 'Nutrition prep' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Motivational Header */}
      <div className="bg-gradient-to-r from-green-500 via-green-600 to-teal-600 text-white py-16">
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
            <div className="flex justify-center mb-4">
              <Trophy className="w-20 h-20" />
            </div>
            <h1 className="text-5xl md:text-6xl mb-4" style={{ fontWeight: 700 }}>
              Single Muscle Split Program
            </h1>
            <p className="text-2xl text-green-100 mb-2">
              Isolated workouts for detailed muscle definition and recovery optimization
            </p>
            <p className="text-xl text-green-200 mb-6 italic">
              "One muscle, one day, maximum intensity"
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>6 Training Days + 1 Rest</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span>Advanced Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6" />
                <span>Maximum Volume</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>🏆 Your Elite 7-Day Schedule</h2>
          <p className="text-xl text-gray-600">
            Dedicated focus on one muscle group per day for maximum growth and definition
          </p>
        </div>

        <div className="grid gap-8">
          {weekPlan.map((day) => (
            <Card key={day.day} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-green-400">
              <CardHeader className={`bg-gradient-to-r ${day.color} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 text-9xl opacity-10" style={{ fontWeight: 700 }}>
                  {day.icon}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg opacity-90">Day {day.day} of 7</span>
                    <Dumbbell className="w-10 h-10" />
                  </div>
                  <CardTitle className="text-4xl mb-2">
                    {day.title}
                  </CardTitle>
                  <p className="text-xl opacity-90">{day.subtitle}</p>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2">
                      <tr>
                        <th className="px-6 py-4 text-left" style={{ fontWeight: 700 }}>#</th>
                        <th className="px-6 py-4 text-left" style={{ fontWeight: 700 }}>Exercise</th>
                        <th className="px-6 py-4 text-center" style={{ fontWeight: 700 }}>Sets</th>
                        <th className="px-6 py-4 text-center" style={{ fontWeight: 700 }}>Reps</th>
                        <th className="px-6 py-4 text-center" style={{ fontWeight: 700 }}>Rest</th>
                        <th className="px-6 py-4 text-left" style={{ fontWeight: 700 }}>Notes</th>
                        <th className="px-6 py-4 text-center" style={{ fontWeight: 700 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {day.exercises.map((exercise, idx) => (
                        <tr
                          key={idx}
                          className="border-b hover:bg-green-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center text-white" style={{ fontWeight: 700 }}>
                              {idx + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-lg" style={{ fontWeight: 600 }}>{exercise.name}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg" style={{ fontWeight: 600 }}>{exercise.sets}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg" style={{ fontWeight: 600 }}>{exercise.reps}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-lg" style={{ fontWeight: 600 }}>{exercise.rest}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600 italic">{exercise.notes}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-green-300 hover:bg-green-50 hover:border-green-500 whitespace-nowrap"
                              onClick={() => navigate(`/exercise/${createSlug(exercise.name)}`)}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advanced Tips */}
        <Card className="mt-12 bg-gradient-to-br from-green-50 via-teal-50 to-green-50 border-2 border-green-300">
          <CardContent className="p-8">
            <h3 className="text-3xl mb-6 text-center" style={{ fontWeight: 700 }}>
              🎯 Advanced Training Principles
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl mb-3 text-green-700" style={{ fontWeight: 700 }}>Nutrition Requirements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Protein: 1.8-2.2g per kg bodyweight daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Carbs: 4-6g per kg on training days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Hydration: 3-4 liters of water daily</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl mb-3 text-green-700" style={{ fontWeight: 700 }}>Recovery Essentials</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Sleep: Minimum 7-9 hours per night</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Each muscle gets 6 days rest between sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" style={{ fontWeight: 700 }}>•</span>
                    <span>Active recovery on rest day accelerates healing</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-200">
              <p className="text-center text-lg text-gray-700">
                <span style={{ fontWeight: 700 }}>Pro Tip:</span> This split allows for maximum volume per muscle group. 
                Track your progressive overload weekly and aim to beat your previous performance!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/workouts">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Explore Other Splits
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
