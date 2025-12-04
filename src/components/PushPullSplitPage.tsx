import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, Dumbbell, Calendar, Target, Flame, Home, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

// Helper function to convert exercise name to slug
const createSlug = (name: string): string => {
  return name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');
};

export default function PushPullSplitPage() {
  const navigate = useNavigate();
  
  const weekPlan = [
    {
      day: 1,
      title: 'Push Day',
      subtitle: 'Chest, Shoulders, Triceps',
      color: 'from-blue-500 to-blue-600',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Overhead Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Lateral Raises', sets: '3', reps: '12-15', rest: '45s' },
        { name: 'Tricep Dips', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Overhead Tricep Extension', sets: '3', reps: '12-15', rest: '45s' },
      ],
    },
    {
      day: 2,
      title: 'Pull Day',
      subtitle: 'Back, Biceps',
      color: 'from-purple-500 to-purple-600',
      exercises: [
        { name: 'Deadlift', sets: '4', reps: '6-8', rest: '120s' },
        { name: 'Pull-ups', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Bent-over Row', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Lat Pulldown', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Barbell Curls', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Hammer Curls', sets: '3', reps: '12-15', rest: '45s' },
      ],
    },
    {
      day: 3,
      title: 'Rest or Cardio',
      subtitle: 'Active Recovery',
      color: 'from-green-500 to-green-600',
      exercises: [
        { name: 'Light Jogging', sets: '1', reps: '20-30 min', rest: '-' },
        { name: 'Stretching Routine', sets: '1', reps: '15 min', rest: '-' },
        { name: 'Foam Rolling', sets: '1', reps: '10 min', rest: '-' },
      ],
    },
    {
      day: 4,
      title: 'Push Day',
      subtitle: 'Chest, Shoulders, Triceps',
      color: 'from-blue-500 to-blue-600',
      exercises: [
        { name: 'Incline Bench Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Dumbbell Shoulder Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Cable Chest Fly', sets: '3', reps: '12-15', rest: '60s' },
        { name: 'Front Raises', sets: '3', reps: '12-15', rest: '45s' },
        { name: 'Tricep Pushdown', sets: '3', reps: '12-15', rest: '45s' },
        { name: 'Skull Crushers', sets: '3', reps: '10-12', rest: '60s' },
      ],
    },
    {
      day: 5,
      title: 'Pull Day',
      subtitle: 'Back, Biceps',
      color: 'from-purple-500 to-purple-600',
      exercises: [
        { name: 'T-Bar Row', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Chin-ups', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Seated Cable Row', sets: '4', reps: '10-12', rest: '60s' },
        { name: 'Face Pulls', sets: '3', reps: '12-15', rest: '45s' },
        { name: 'Preacher Curls', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Cable Curls', sets: '3', reps: '12-15', rest: '45s' },
      ],
    },
    {
      day: 6,
      title: 'Legs Day',
      subtitle: 'Quads, Hamstrings, Calves',
      color: 'from-orange-500 to-orange-600',
      exercises: [
        { name: 'Barbell Squat', sets: '4', reps: '8-10', rest: '120s' },
        { name: 'Romanian Deadlift', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Leg Press', sets: '3', reps: '12-15', rest: '60s' },
        { name: 'Leg Curl', sets: '3', reps: '12-15', rest: '60s' },
        { name: 'Leg Extension', sets: '3', reps: '12-15', rest: '60s' },
        { name: 'Calf Raises', sets: '4', reps: '15-20', rest: '45s' },
      ],
    },
    {
      day: 7,
      title: 'Rest Day',
      subtitle: 'Complete Recovery',
      color: 'from-gray-500 to-gray-600',
      exercises: [
        { name: 'Full Rest', sets: '-', reps: 'Sleep 8+ hours', rest: '-' },
        { name: 'Light Stretching (Optional)', sets: '1', reps: '10 min', rest: '-' },
        { name: 'Meal Planning', sets: '-', reps: 'Prep for next week', rest: '-' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white py-12">
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
              Push-Pull Split Program
            </h1>
            <p className="text-2xl text-blue-100 mb-6">
              Train complementary upper body movements for balanced strength and growth
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>6 Training Days + 1 Rest</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span>Intermediate Level</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6" />
                <span>Muscle Building Focus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Plan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Your 7-Day Training Plan</h2>
          <p className="text-xl text-gray-600">
            Follow this structured plan to maximize your gains with the Push-Pull method
          </p>
        </div>

        <div className="space-y-8">
          {weekPlan.map((day) => (
            <Card key={day.day} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2">
              <CardHeader className={`bg-gradient-to-r ${day.color} text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">
                      Day {day.day}: {day.title}
                    </CardTitle>
                    <p className="text-lg opacity-90">{day.subtitle}</p>
                  </div>
                  <Dumbbell className="w-12 h-12 opacity-75" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Exercise</TableHead>
                        <TableHead className="text-center">Sets</TableHead>
                        <TableHead className="text-center">Reps</TableHead>
                        <TableHead className="text-center">Rest</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {day.exercises.map((exercise, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-50">
                          <TableCell style={{ fontWeight: 600 }}>{exercise.name}</TableCell>
                          <TableCell className="text-center">{exercise.sets}</TableCell>
                          <TableCell className="text-center">{exercise.reps}</TableCell>
                          <TableCell className="text-center">{exercise.rest}</TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs border-blue-300 hover:bg-blue-50 hover:border-blue-500"
                              onClick={() => navigate(`/exercise/${createSlug(exercise.name)}`)}
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>💡 Pro Tips for Success</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Warm up for 5-10 minutes before each session with dynamic stretches</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Focus on progressive overload - increase weight when you can complete all reps with good form</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Stay hydrated and consume adequate protein (1.6-2.2g per kg bodyweight)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600" style={{ fontWeight: 700 }}>✓</span>
                <span>Rest is crucial - don't skip rest days as that's when your muscles grow</span>
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
