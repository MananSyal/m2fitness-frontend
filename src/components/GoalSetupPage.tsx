import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, Target, TrendingUp, TrendingDown, Activity, ArrowLeft, ArrowRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function GoalSetupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedGoal, setSelectedGoal] = useState('');
  const [userState, setUserState] = useState('');
  const isPreview = searchParams.get('preview') === 'true';

  useEffect(() => {
    const state = localStorage.getItem('userState') || 'Punjab';
    setUserState(state);
  }, []);

  const goals = [
    {
      id: 'weight-loss',
      title: 'Weight Loss',
      icon: TrendingDown,
      color: 'from-red-500 to-orange-500',
      description: 'Lose fat while preserving muscle',
      calories: 'Calorie deficit',
      protein: 'High protein (1.8g/kg)',
    },
    {
      id: 'muscle-gain',
      title: 'Muscle Gain',
      icon: TrendingUp,
      color: 'from-blue-500 to-purple-500',
      description: 'Build lean muscle mass',
      calories: 'Calorie surplus',
      protein: 'Very high protein (2g/kg)',
    },
    {
      id: 'stay-fit',
      title: 'Stay Fit',
      icon: Activity,
      color: 'from-green-500 to-teal-500',
      description: 'Maintain current physique',
      calories: 'Maintenance calories',
      protein: 'Moderate protein (1.5g/kg)',
    },
  ];

  const handleGoalSelection = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (!selectedGoal) {
      toast.error('Please select a goal first!');
      return;
    }

    localStorage.setItem('userGoal', selectedGoal);

    if (isPreview) {
      toast.info(`Great choice! Diet plans for ${userState} are coming soon. Meanwhile, check out our available plans.`);
      navigate('/diet/new-plan');
    } else {
      navigate('/plan-recommendation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              onClick={() => navigate('/state-selection')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to State Selection
            </Button>

            {/* Show selected state */}
            <div className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <span className="text-sm" style={{ fontWeight: 600 }}>Selected State: {userState}</span>
            </div>

            <h1 className="text-6xl mb-6" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Set Your Goal 🎯
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-4">
              What do you want to achieve?
            </p>
            <p className="text-lg text-gray-500">
              We'll customize your diet plan based on your goal
            </p>
          </div>

          {/* Goals Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {goals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;

              return (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    isSelected 
                      ? 'border-4 border-blue-500 shadow-2xl scale-105' 
                      : 'border-2 border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleGoalSelection(goal.id)}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br ${goal.color} transform transition-transform ${
                      isSelected ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>{goal.title}</h3>
                    <p className="text-gray-600 mb-4">{goal.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{goal.calories}</p>
                      </div>
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{goal.protein}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full">
                        ✓ Selected
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedGoal}
              className={`px-12 py-6 text-xl ${
                selectedGoal 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                  : 'bg-gray-300'
              }`}
            >
              Continue to Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
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
