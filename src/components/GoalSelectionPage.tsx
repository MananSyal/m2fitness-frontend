import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingDown, Dumbbell, Heart } from 'lucide-react';
import { useState } from 'react';

export default function GoalSelectionPage() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    {
      id: 'lose-weight',
      icon: TrendingDown,
      title: 'Lose Weight',
      description: 'Burn fat and achieve your target weight with cardio-focused workouts',
      gradient: 'from-orange-400 to-red-500',
    },
    {
      id: 'build-muscle',
      icon: Dumbbell,
      title: 'Build Muscle',
      description: 'Gain strength and muscle mass with resistance training plans',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      id: 'stay-active',
      icon: Heart,
      title: 'Stay Active',
      description: 'Maintain fitness and health with balanced workout routines',
      gradient: 'from-green-400 to-emerald-600',
    },
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step 2 of 4</span>
            <span className="text-sm text-gray-600">50%</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-12 py-12">
          <h1 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
            What's your fitness goal?
          </h1>
          <p className="text-xl text-gray-600">
            We'll personalize your experience based on your goal
          </p>
        </div>

        {/* Goal Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedGoal === goal.id
                  ? 'ring-4 ring-blue-500 shadow-xl scale-105'
                  : 'hover:scale-105'
              }`}
              onClick={() => setSelectedGoal(goal.id)}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${goal.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <goal.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="mb-3 text-xl" style={{ fontWeight: 700 }}>
                  {goal.title}
                </h3>
                <p className="text-gray-600">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedGoal}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-12"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
