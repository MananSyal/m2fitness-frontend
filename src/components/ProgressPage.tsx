import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, Trophy, Flame, Calendar, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressPage() {
  const weeklyData = [
    { day: 'Mon', completed: 1 },
    { day: 'Tue', completed: 1 },
    { day: 'Wed', completed: 1 },
    { day: 'Thu', completed: 0 },
    { day: 'Fri', completed: 1 },
    { day: 'Sat', completed: 0 },
    { day: 'Sun', completed: 1 },
  ];

  const monthlyProgress = [
    { week: 'Week 1', workouts: 3 },
    { week: 'Week 2', workouts: 4 },
    { week: 'Week 3', workouts: 5 },
    { week: 'Week 4', workouts: 3 },
  ];

  const badges = [
    {
      icon: Flame,
      title: '3-Day Streak!',
      description: 'Keep the momentum going',
      color: 'from-orange-400 to-red-500',
      earned: true,
    },
    {
      icon: Trophy,
      title: 'Goal Crusher',
      description: 'Completed 10 workouts',
      color: 'from-yellow-400 to-orange-500',
      earned: true,
    },
    {
      icon: Award,
      title: 'Early Bird',
      description: '5 morning workouts',
      color: 'from-blue-400 to-blue-600',
      earned: true,
    },
    {
      icon: Calendar,
      title: '7-Day Warrior',
      description: '7 consecutive workout days',
      color: 'from-purple-400 to-purple-600',
      earned: false,
    },
  ];

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
              <Button variant="ghost" className="w-full justify-start">
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
              <Button variant="secondary" className="w-full justify-start">
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
          <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>Your Progress</h1>
          <p className="text-xl text-gray-600">Track your fitness journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Dumbbell className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>12</p>
              <p className="text-blue-100">Total Workouts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>8.5</p>
              <p className="text-orange-100">Total Hours</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>3</p>
              <p className="text-green-100">Day Streak</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>1,240</p>
              <p className="text-purple-100">Calories Burned</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle>This Week's Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-around py-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        day.completed
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {day.completed ? '✓' : ''}
                    </div>
                    <p className="text-sm text-gray-600">{day.day}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-blue-900">
                  <span style={{ fontWeight: 700 }}>5 of 7</span> days completed this week
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Progress Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="workouts"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Achievements/Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements & Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl text-center ${
                    badge.earned ? 'bg-white border-2 border-gray-200' : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <badge.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-1" style={{ fontWeight: 700 }}>{badge.title}</h3>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  {badge.earned && (
                    <div className="mt-3 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs" style={{ fontWeight: 600 }}>
                      Earned
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
