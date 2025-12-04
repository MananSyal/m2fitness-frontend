import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Home, User, ArrowLeft, Dumbbell, TrendingUp, Clock, Target, Flame, Calendar, Download, Zap, Award, Activity } from 'lucide-react';
import { getWorkoutsForGoal, type Workout } from '../utils/workoutDatabase';
import { toast } from 'sonner@2.0.3';

export default function PersonalizedWorkoutPlanPage() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState('Punjab');
  const [userGoal, setUserGoal] = useState('stay-fit');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<number>(8);
  const [totalWorkouts] = useState<number>(20);
  const [weeklyConsistency] = useState<number>(85);
  const [caloriesBurned] = useState<number>(3450);
  const [streak] = useState<number>(5);

  useEffect(() => {
    const state = localStorage.getItem('userState') || 'Punjab';
    const goal = localStorage.getItem('userGoal') || 'stay-fit';
    setUserState(state);
    setUserGoal(goal);

    // Get workouts for the selected goal
    const recommendedWorkouts = getWorkoutsForGoal(goal as any);
    setWorkouts(recommendedWorkouts.slice(0, 6)); // Show top 6 workouts
  }, []);

  const goalLabels: { [key: string]: string } = {
    'weight-loss': 'Weight Loss',
    'muscle-gain': 'Muscle Gain',
    'stay-fit': 'Stay Fit',
  };

  const goalColors: { [key: string]: string } = {
    'weight-loss': 'from-red-500 to-orange-500',
    'muscle-gain': 'from-blue-500 to-purple-500',
    'stay-fit': 'from-green-500 to-teal-500',
  };

  const handleDownloadPlan = () => {
    toast.success('Downloading your workout plan PDF! 📄');
  };

  const progressPercentage = Math.round((completedWorkouts / totalWorkouts) * 100);

  // Mock data for weekly progress chart
  const weeklyData = [
    { day: 'Mon', duration: 45 },
    { day: 'Tue', duration: 60 },
    { day: 'Wed', duration: 0 },
    { day: 'Thu', duration: 50 },
    { day: 'Fri', duration: 40 },
    { day: 'Sat', duration: 55 },
    { day: 'Sun', duration: 30 },
  ];

  const maxDuration = Math.max(...weeklyData.map(d => d.duration));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/plan-recommendation')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plan Overview
            </Button>

            {/* Plan Header Card */}
            <Card className={`mb-6 border-2 bg-gradient-to-r ${goalColors[userGoal]} text-white`}>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-5xl mb-2" style={{ fontWeight: 700 }}>
                      Your Personalized Workout Plan 🏋️‍♂️
                    </h1>
                    <p className="text-xl opacity-90">
                      Tailored for {userState} • Goal: {goalLabels[userGoal] || 'Stay Fit'}
                    </p>
                  </div>
                  <Dumbbell className="w-20 h-20 opacity-20" />
                </div>
                <p className="text-lg opacity-90 mb-6">
                  Your plan includes a mix of compound and isolation exercises, designed for steady progress.
                </p>
                <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <Flame className="w-8 h-8" />
                  <div>
                    <p className="text-2xl" style={{ fontWeight: 700 }}>{streak}-Day Streak Active — Keep Going!</p>
                    <p className="opacity-90">You're on fire! Don't break the chain 🔥</p>
                  </div>
                </div>
                <Button 
                  variant="secondary"
                  onClick={handleDownloadPlan}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Workout Plan (PDF)
                </Button>
              </CardContent>
            </Card>

            {/* Stats Dashboard */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Workout Consistency */}
              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl" style={{ fontWeight: 700 }}>{weeklyConsistency}%</p>
                      <p className="text-sm text-gray-600">Weekly Consistency</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    You've trained 5 out of 6 scheduled days this week. Amazing effort! 💪
                  </p>
                </CardContent>
              </Card>

              {/* Calories Burned */}
              <Card className="border-2 border-orange-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl" style={{ fontWeight: 700 }}>{caloriesBurned}</p>
                      <p className="text-sm text-gray-600">Calories This Week</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Keep pushing — {Math.round(caloriesBurned / 7)} kcal average per session 🔥
                  </p>
                </CardContent>
              </Card>

              {/* Next Session */}
              <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg" style={{ fontWeight: 700 }}>Tomorrow</p>
                      <p className="text-sm text-gray-600">Next Session</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Full Body Blast (45 min) — Don't forget to hydrate! 💧
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Progress */}
            <Card className="mb-8 border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl mb-1" style={{ fontWeight: 700 }}>Monthly Progress 📊</h3>
                    <p className="text-sm text-gray-600">{completedWorkouts} of {totalWorkouts} workouts completed this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-blue-600" style={{ fontWeight: 700 }}>{progressPercentage}%</p>
                    <p className="text-sm text-gray-500">Complete</p>
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">You're doing great! Keep up the momentum 🚀</p>
              </CardContent>
            </Card>
          </div>

          {/* Your Training Progress Chart */}
          <Card className="mb-8 border-2">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Your Training Progress 📈</h2>
              <div className="space-y-3">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 text-sm text-gray-600" style={{ fontWeight: 600 }}>{day.day}</div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                        <div 
                          className={`h-full rounded-lg transition-all ${
                            day.duration > 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                          }`}
                          style={{ width: `${(day.duration / maxDuration) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-gray-600">
                      {day.duration > 0 ? `${day.duration} min` : 'Rest'}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4 bg-blue-50 p-3 rounded-lg">
                You've maintained a consistent routine — amazing effort! 💪
              </p>
            </CardContent>
          </Card>

          {/* Weekly Summary Table */}
          <Card className="mb-8 border-2">
            <CardContent className="p-6">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Weekly Summary 📊</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-3 px-2">Metric</th>
                      <th className="text-center py-3 px-2">This Week</th>
                      <th className="text-center py-3 px-2">Last Week</th>
                      <th className="text-center py-3 px-2">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-2" style={{ fontWeight: 600 }}>Workouts Completed</td>
                      <td className="text-center py-3 px-2">5</td>
                      <td className="text-center py-3 px-2">4</td>
                      <td className="text-center py-3 px-2 text-green-600">+1 ↑</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2" style={{ fontWeight: 600 }}>Total Duration</td>
                      <td className="text-center py-3 px-2">220 min</td>
                      <td className="text-center py-3 px-2">200 min</td>
                      <td className="text-center py-3 px-2 text-green-600">+20 min ↑</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-2" style={{ fontWeight: 600 }}>Calories Burned</td>
                      <td className="text-center py-3 px-2">3,450 kcal</td>
                      <td className="text-center py-3 px-2">3,200 kcal</td>
                      <td className="text-center py-3 px-2 text-green-600">+250 kcal ↑</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Workout Plan Grid */}
          <h2 className="text-3xl mb-6" style={{ fontWeight: 700 }}>Your Personalized Workouts 💪</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {workouts.map((workout, index) => (
              <Card 
                key={workout.id}
                className="border-2 hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
                onClick={() => navigate(`/workout/${workout.slug}`)}
              >
                <CardContent className="p-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${
                      workout.level === 'beginner' ? 'bg-blue-500' :
                      workout.level === 'intermediate' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} style={{ fontWeight: 600 }}>
                      {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      index < 3 ? 'bg-green-100 text-green-700' :
                      index < 5 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`} style={{ fontWeight: 600 }}>
                      {index < 3 ? '✅ Completed' : index < 5 ? '🔁 In Progress' : '⏳ Not Started'}
                    </span>
                  </div>

                  {/* Workout Icon */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    workout.level === 'beginner' ? 'bg-blue-100' :
                    workout.level === 'intermediate' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <Dumbbell className={`w-8 h-8 ${
                      workout.level === 'beginner' ? 'text-blue-600' :
                      workout.level === 'intermediate' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>

                  <h3 className="text-xl mb-2 text-center" style={{ fontWeight: 700 }}>{workout.name}</h3>
                  
                  <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {workout.caloriesBurned}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 text-center line-clamp-2">{workout.description}</p>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/workout/${workout.slug}`);
                    }}
                  >
                    {index < 3 ? 'View Workout' : index < 5 ? 'Continue' : 'Start Workout'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Routine Summary */}
          <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>🧾 7-Day Training Plan</h3>
              <p className="text-gray-700 mb-4">
                This plan alternates upper & lower body routines with strategic rest days for optimal muscle recovery.
                Focus on progressive overload each week.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>💬 Pro Tip:</p>
                  <p className="text-sm text-gray-700">Always maintain form over reps. Quality beats quantity!</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>⚠️ Remember:</p>
                  <p className="text-sm text-gray-700">Avoid skipping meals while on a muscle gain program.</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>💧 Hydration:</p>
                  <p className="text-sm text-gray-700">Stay hydrated — 3L/day minimum for optimal performance.</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="mb-2" style={{ fontWeight: 600 }}>😴 Recovery:</p>
                  <p className="text-sm text-gray-700">Get 7-8 hours of sleep for muscle recovery and growth.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Card */}
          <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 text-white">
            <CardContent className="p-12 text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <p className="text-3xl mb-4 italic" style={{ fontWeight: 600 }}>
                "Every rep brings you closer to your goal. Keep the fire alive 🔥"
              </p>
              <p className="text-xl mb-6">
                You're {progressPercentage}% there. Don't stop now!
              </p>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/progress')}
                className="text-lg px-8 py-6"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Full Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
          </div>
          <p className="text-gray-400">&copy; 2025 M2Fitnes — Version 15.4. All rights reserved.</p>
          <p className="text-gray-500 mt-2">Train smart. Eat desi. Stay consistent. #M2FitnesCommunity</p>
        </div>
      </footer>
    </div>
  );
}
