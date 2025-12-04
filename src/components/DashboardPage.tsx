import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, Play, Flame, Calendar, Award, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function DashboardPage() {
  const userName = 'Alex';
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good Morning' : currentTime < 18 ? 'Good Afternoon' : 'Good Evening';

  const todayMeals = [
    { name: 'Paneer Bhurji + Roti', time: 'Breakfast', protein: '25g', completed: true },
    { name: 'Grilled Chicken + Rice', time: 'Lunch', protein: '25g', completed: true },
    { name: 'Moong Dal Chilla', time: 'Snack', protein: '25g', completed: false },
    { name: 'Fish Curry + Chapati', time: 'Dinner', protein: '25g', completed: false },
  ];

  const proteinConsumed = 50;
  const proteinGoal = 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full justify-start">
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="ghost" className="w-full justify-start">
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>
            {greeting}, {userName}!
          </h1>
          <p className="text-xl text-gray-600">Ready to crush your goals today?</p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-1">Current Streak</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>3 Days</p>
                </div>
                <Flame className="w-12 h-12 text-orange-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">Calories Burned</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>1,240</p>
                </div>
                <Calendar className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 mb-1">Workouts Done</p>
                  <p className="text-3xl" style={{ fontWeight: 700 }}>12</p>
                </div>
                <Award className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Workout */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Workout</CardTitle>
                <CardDescription>Full Body Strength Training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-xl overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1669807164466-10a6584a067e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwZ3ltfGVufDF8fHx8MTc2MTI2ODYzM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Workout"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          45 min
                        </span>
                        <span>Intermediate</span>
                        <span>8 Exercises</span>
                      </div>
                      <p className="text-gray-700">
                        A comprehensive full-body workout focusing on compound movements for maximum strength gains.
                      </p>
                      <Link to="/workout/1">
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Workout
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today's Diet Widget */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Diet</CardTitle>
                    <CardDescription>High-Protein Meal Plan</CardDescription>
                  </div>
                  <Link to="/diet/plan">
                    <Button variant="outline" size="sm">View Full Plan</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Protein Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Daily Protein</span>
                      <span className="text-sm" style={{ fontWeight: 600 }}>
                        {proteinConsumed}g / {proteinGoal}g
                      </span>
                    </div>
                    <Progress value={(proteinConsumed / proteinGoal) * 100} className="h-3" />
                  </div>

                  {/* Meal List */}
                  <div className="grid grid-cols-2 gap-3">
                    {todayMeals.map((meal, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-2 ${
                          meal.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="text-sm" style={{ fontWeight: 600 }}>{meal.time}</p>
                            <p className="text-xs text-gray-600">{meal.name}</p>
                          </div>
                          {meal.completed && (
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{meal.protein} protein</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/workouts">
                  <Button variant="outline" className="w-full justify-start">
                    <Dumbbell className="w-5 h-5 mr-3" />
                    Explore Workouts
                  </Button>
                </Link>
                <Link to="/progress">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-5 h-5 mr-3" />
                    View Progress
                  </Button>
                </Link>
                <Link to="/diet/new-plan">
                  <Button variant="outline" className="w-full justify-start">
                    <Utensils className="w-5 h-5 mr-3" />
                    Diet Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>3-Day Streak!</p>
                    <p className="text-sm text-gray-600">Keep it up!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>Goal Crusher</p>
                    <p className="text-sm text-gray-600">Completed 10 workouts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
