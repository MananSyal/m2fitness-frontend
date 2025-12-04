import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { MapPin, Target, Leaf, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function DietSetupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedState, setSelectedState] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedDietType, setSelectedDietType] = useState('');

  const indianStates = [
    { name: 'Punjab', foods: 'Paneer, Lentils, Chole' },
    { name: 'Haryana', foods: 'Soya Chunks, Chapati, Lassi' },
    { name: 'Maharashtra', foods: 'Sprouted Moong, Bhakri' },
    { name: 'Gujarat', foods: 'Moong Dal, Dhokla, Thepla' },
    { name: 'Tamil Nadu', foods: 'Idli, Sambar, Pongal' },
    { name: 'Kerala', foods: 'Fish Curry, Appam, Rice' },
    { name: 'West Bengal', foods: 'Fish, Rice, Mishti Doi' },
    { name: 'Rajasthan', foods: 'Dal Baati, Paneer, Bajra' },
    { name: 'Karnataka', foods: 'Ragi, Dosa, Sambar' },
    { name: 'Andhra Pradesh', foods: 'Rice, Fish, Spicy Curry' },
    { name: 'Telangana', foods: 'Rice, Chicken, Biryani' },
    { name: 'Uttar Pradesh', foods: 'Paneer, Lentils, Roti' },
    { name: 'Delhi', foods: 'Chole Bhature, Paneer' },
  ];

  const goals = [
    { id: 'lose-weight', name: 'Lose Weight', icon: '🔥', description: 'Calorie-controlled, high-protein meals' },
    { id: 'gain-muscle', name: 'Gain Muscle', icon: '💪', description: 'Protein-rich meals for muscle growth' },
    { id: 'stay-fit', name: 'Stay Fit', icon: '❤️', description: 'Balanced nutrition for maintenance' },
  ];

  const dietTypes = [
    { id: 'veg', name: 'Vegetarian', icon: '🥗', description: 'Plant-based protein sources' },
    { id: 'non-veg', name: 'Non-Vegetarian', icon: '🍗', description: 'Includes meat, fish, and eggs' },
    { id: 'both', name: 'Both', icon: '🍽️', description: 'Mix of veg and non-veg options' },
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Pass all selections to the personalized diet page
      navigate('/diet/plan', {
        state: {
          region: selectedState,
          goal: selectedGoal,
          dietType: selectedDietType,
        },
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/diet');
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedState !== '';
    if (step === 2) return selectedGoal !== '';
    if (step === 3) return selectedDietType !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        {/* Step 1: Select Region */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8 py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
                Select Your Region
              </h1>
              <p className="text-xl text-gray-600">
                We'll curate meals from your local cuisine
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {indianStates.map((state) => (
                    <div
                      key={state.name}
                      onClick={() => setSelectedState(state.name)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedState === state.name
                          ? 'border-green-500 bg-green-50 shadow-md'
                          : 'border-gray-200 hover:border-green-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className={`w-4 h-4 ${selectedState === state.name ? 'text-green-600' : 'text-gray-400'}`} />
                        <p style={{ fontWeight: 600 }}>{state.name}</p>
                      </div>
                      <p className="text-sm text-gray-600">{state.foods}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Choose Fitness Goal */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8 py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
                Choose Your Fitness Goal
              </h1>
              <p className="text-xl text-gray-600">
                We'll adjust calories and macros accordingly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <Card
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`cursor-pointer transition-all ${
                    selectedGoal === goal.id
                      ? 'ring-4 ring-blue-500 shadow-xl scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{goal.icon}</div>
                    <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
                      {goal.name}
                    </h3>
                    <p className="text-gray-600">{goal.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Diet Type */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8 py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>
                Select Diet Type
              </h1>
              <p className="text-xl text-gray-600">
                Choose your dietary preference
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {dietTypes.map((diet) => (
                <Card
                  key={diet.id}
                  onClick={() => setSelectedDietType(diet.id)}
                  className={`cursor-pointer transition-all ${
                    selectedDietType === diet.id
                      ? 'ring-4 ring-orange-500 shadow-xl scale-105'
                      : 'hover:scale-105'
                  }`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{diet.icon}</div>
                    <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
                      {diet.name}
                    </h3>
                    <p className="text-gray-600">{diet.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button onClick={handleBack} variant="outline" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            {step === 3 ? 'Generate Plan' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
