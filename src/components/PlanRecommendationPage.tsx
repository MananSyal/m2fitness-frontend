import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, CheckCircle, ArrowLeft, ArrowRight, Utensils, Dumbbell, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function PlanRecommendationPage() {
  const navigate = useNavigate();
  const [userState, setUserState] = useState('');
  const [userGoal, setUserGoal] = useState('');

  useEffect(() => {
    const state = localStorage.getItem('userState') || 'Punjab';
    const goal = localStorage.getItem('userGoal') || 'stay-fit';
    setUserState(state);
    setUserGoal(goal);
  }, []);

  const goalLabels: { [key: string]: string } = {
    'weight-loss': 'Weight Loss',
    'muscle-gain': 'Muscle Gain',
    'stay-fit': 'Stay Fit',
  };

  const handleViewDietPlan = () => {
    navigate('/diet/personalized-plan');
  };

  const handleViewWorkoutPlan = () => {
    navigate('/workout/personalized-plan');
  };

  const handleDownloadPlan = () => {
    toast.success('Your personalized plan is being prepared! 📄');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 py-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/goal-setup')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Goal Selection
            </Button>

            {/* Success Animation */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="text-6xl mb-6" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Your Plan is Ready! 🎉
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-4">
              Personalized for {userState} • Goal: {goalLabels[userGoal] || 'Stay Fit'}
            </p>
          </div>

          {/* Plan Summary */}
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6 text-center" style={{ fontWeight: 700 }}>
                Your Personalized Fitness Plan
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Diet Plan Card */}
                <Card className="border-2 border-orange-200 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-center mb-4" style={{ fontWeight: 700 }}>Diet Plan</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>State-specific high-protein meals from {userState}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>100g+ daily protein from desi foods</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Breakfast, lunch, snacks & dinner options</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Optimized for {goalLabels[userGoal]?.toLowerCase()}</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      onClick={handleViewDietPlan}
                    >
                      View Diet Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Workout Plan Card */}
                <Card className="border-2 border-blue-200 hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl text-center mb-4" style={{ fontWeight: 700 }}>Workout Plan</h3>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>60+ exercises with detailed instructions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Beginner to advanced routines</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Sets, reps, rest times included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Track progress and stay motivated</span>
                      </li>
                    </ul>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      onClick={handleViewWorkoutPlan}
                    >
                      View Workouts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Download Plan Button */}
              <div className="text-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleDownloadPlan}
                  className="border-2 border-green-500 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Complete Plan (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl mb-6 text-center" style={{ fontWeight: 700 }}>
                Tips for Success 💪
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-5xl mb-2">🥗</div>
                  <p className="text-lg" style={{ fontWeight: 600 }}>Eat Consistent</p>
                  <p className="text-sm opacity-90">Follow your meal plan daily</p>
                </div>
                <div>
                  <div className="text-5xl mb-2">🏋️</div>
                  <p className="text-lg" style={{ fontWeight: 600 }}>Train Smart</p>
                  <p className="text-sm opacity-90">Quality over quantity</p>
                </div>
                <div>
                  <div className="text-5xl mb-2">📊</div>
                  <p className="text-lg" style={{ fontWeight: 600 }}>Track Progress</p>
                  <p className="text-sm opacity-90">Measure and celebrate wins</p>
                </div>
              </div>
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
          <p className="text-gray-400">&copy; 2025 M2Fitnes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
