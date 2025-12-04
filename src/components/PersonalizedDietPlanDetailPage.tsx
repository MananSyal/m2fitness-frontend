import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Home, User, ArrowLeft, Utensils, Download, Share2, Check, Plus, Minus, ChefHat, Eye } from 'lucide-react';
import { regionalMealDatabase, type RegionalMeals, type Meal } from '../utils/regionalMealData';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function PersonalizedDietPlanDetailPage() {
  const navigate = useNavigate();
  const { state: stateParam } = useParams<{ state?: string }>();
  const [userState, setUserState] = useState('Punjab');
  const [userGoal, setUserGoal] = useState('stay-fit');
  const [meals, setMeals] = useState<RegionalMeals | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<{
    breakfast: string[];
    lunch: string[];
    snacks: string[];
    dinner: string[];
  }>({
    breakfast: [],
    lunch: [],
    snacks: [],
    dinner: [],
  });
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('breakfast');
  const [isViewDietOpen, setIsViewDietOpen] = useState(false);

  useEffect(() => {
    // Determine state: first check URL param, then localStorage, then default to Punjab
    let selectedState = 'Punjab';
    
    if (stateParam) {
      // Convert URL-friendly state name to proper case
      const stateMap: { [key: string]: string } = {
        'punjab': 'Punjab',
        'haryana': 'Haryana',
        'delhi': 'Delhi',
        'gujarat': 'Gujarat',
        'maharashtra': 'Maharashtra',
        'mumbai': 'Mumbai',
        'tamil-nadu': 'Tamil Nadu',
        'karnataka': 'Karnataka',
        'kerala': 'Kerala',
        'rajasthan': 'Rajasthan',
        'uttar-pradesh': 'Uttar Pradesh',
        'bihar': 'Bihar',
        'west-bengal': 'West Bengal',
        'madhya-pradesh': 'Madhya Pradesh',
        'andhra-pradesh': 'Andhra Pradesh',
        'telangana': 'Telangana',
        'odisha': 'Odisha',
        'assam': 'Assam',
        'jharkhand': 'Jharkhand',
        'chhattisgarh': 'Chhattisgarh',
        'uttarakhand': 'Uttarakhand',
        'himachal-pradesh': 'Himachal Pradesh',
        'goa': 'Goa',
        'jammu-and-kashmir': 'Jammu and Kashmir',
        'ladakh': 'Ladakh',
        'sikkim': 'Sikkim',
        'meghalaya': 'Meghalaya',
        'manipur': 'Manipur',
        'mizoram': 'Mizoram',
        'nagaland': 'Nagaland',
        'tripura': 'Tripura',
        'arunachal-pradesh': 'Arunachal Pradesh',
      };
      selectedState = stateMap[stateParam.toLowerCase()] || 'Punjab';
      // Save to localStorage for future use
      localStorage.setItem('userState', selectedState);
    } else {
      // Fallback to localStorage
      selectedState = localStorage.getItem('userState') || 'Punjab';
    }
    
    const goal = localStorage.getItem('userGoal') || 'stay-fit';
    setUserState(selectedState);
    setUserGoal(goal);

    // Get meals for the selected state
    const stateMeals = regionalMealDatabase[selectedState] || regionalMealDatabase['Default'];
    setMeals(stateMeals);

    // Load saved selections from localStorage
    const savedSelections = localStorage.getItem('selectedMeals');
    if (savedSelections) {
      setSelectedMeals(JSON.parse(savedSelections));
    }
  }, [stateParam]);

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

  const goalDescriptions: { [key: string]: string } = {
    'weight-loss': 'Focus on high-protein, lower calorie meals to preserve muscle while losing fat',
    'muscle-gain': 'Protein-rich meals with adequate calories to support muscle growth',
    'stay-fit': 'Balanced nutrition to maintain your current physique and energy levels',
  };

  const toggleMealSelection = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner', mealName: string) => {
    setSelectedMeals(prev => {
      const currentSelected = prev[mealType];
      const newSelected = currentSelected.includes(mealName)
        ? currentSelected.filter(name => name !== mealName)
        : [...currentSelected, mealName];
      
      const updated = {
        ...prev,
        [mealType]: newSelected,
      };
      
      // Save to localStorage
      localStorage.setItem('selectedMeals', JSON.stringify(updated));
      
      return updated;
    });
  };

  const handleDownloadPlan = () => {
    toast.success('Downloading your personalized diet plan! 📄');
  };

  const handleSharePlan = () => {
    toast.success('Plan shared! 🔗');
  };

  const calculateTotals = () => {
    if (!meals) return { protein: 0, calories: 0 };
    
    let totalProtein = 0;
    let totalCalories = 0;
    
    Object.entries(selectedMeals).forEach(([mealType, mealNames]) => {
      const mealList = meals[mealType as keyof RegionalMeals];
      mealNames.forEach(name => {
        const meal = mealList.find(m => m.name === name);
        if (meal) {
          totalProtein += parseInt(meal.protein);
          totalCalories += parseInt(meal.calories);
        }
      });
    });
    
    return { protein: totalProtein, calories: totalCalories };
  };

  const getMealImage = (mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    const images = {
      breakfast: 'https://images.unsplash.com/photo-1589786741892-824d46e61d61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBicmVha2Zhc3QlMjBoZWFsdGh5JTIwcHJvdGVpbnxlbnwxfHx8fDE3NjIwMTgzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lunch: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBsdW5jaCUyMHRoYWxpfGVufDF8fHx8MTc2MTk4ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      snacks: 'https://images.unsplash.com/photo-1677735299500-83bfbbadf830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwcHJvdGVpbnxlbnwxfHx8fDE3NjIwMTgzMzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      dinner: 'https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBkaW5uZXIlMjBtZWFsfGVufDF8fHx8MTc2MjAxODM0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    };
    return images[mealType];
  };

  const MealSelectionCard = ({ meal, mealType, isSelected }: { meal: Meal; mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner'; isSelected: boolean }) => {
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 border-2 overflow-hidden ${
          isSelected 
            ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]' 
            : 'border-gray-200 hover:border-green-300 hover:shadow-md'
        }`}
        onClick={() => toggleMealSelection(mealType, meal.name)}
      >
        {/* Meal Image */}
        <div className="relative h-40 overflow-hidden">
          <ImageWithFallback
            src={getMealImage(mealType)}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {isSelected && (
            <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs ${meal.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {meal.type === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
            </span>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="mb-3">
            <h4 className="text-lg mb-1" style={{ fontWeight: 700 }}>{meal.name}</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white p-2 rounded-lg text-center border border-green-200">
              <p className="text-xs text-gray-600">Protein</p>
              <p className="text-lg text-green-600" style={{ fontWeight: 700 }}>{meal.protein}</p>
            </div>
            <div className="bg-white p-2 rounded-lg text-center border border-orange-200">
              <p className="text-xs text-gray-600">Calories</p>
              <p className="text-lg text-orange-600" style={{ fontWeight: 700 }}>{meal.calories}</p>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 600 }}>Ingredients:</p>
            <p className="text-xs text-gray-700 line-clamp-2">{meal.ingredients}</p>
          </div>

          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-xs text-blue-900">
              <span style={{ fontWeight: 600 }}>Tip:</span> {meal.servingTip}
            </p>
          </div>
          
          <Button 
            className={`w-full mt-3 ${isSelected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            size="sm"
          >
            {isSelected ? (
              <>
                <Minus className="w-4 h-4 mr-2" />
                Remove from Plan
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  if (!meals) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl" style={{ fontWeight: 600 }}>Loading your meal options...</p>
        </div>
      </div>
    );
  }

  const totals = calculateTotals();
  const tabConfig = {
    breakfast: { icon: '🌅', label: 'Breakfast', color: 'from-yellow-400 to-orange-400' },
    lunch: { icon: '☀️', label: 'Lunch', color: 'from-green-400 to-teal-400' },
    snacks: { icon: '🍪', label: 'Snacks', color: 'from-purple-400 to-pink-400' },
    dinner: { icon: '🌙', label: 'Dinner', color: 'from-blue-400 to-indigo-400' },
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
              {stateParam && (
                <Link to="/diet/india/states">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to States
                  </Button>
                </Link>
              )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>

            {/* Hero Banner */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761095596599-dd7b3bee6287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm90ZWluJTIwbWVhbCUyMHByZXB8ZW58MXx8fHwxNzYyMDE4MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Healthy meal prep"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
                <div className="max-w-2xl px-8">
                  <h1 className="text-5xl text-white mb-3" style={{ fontWeight: 700 }}>
                    High-Protein {userState} Diet Plan
                  </h1>
                  <p className="text-xl text-white/90">
                    {userState} • {goalLabels[userGoal] || 'Stay Fit'}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Summary Card */}
              <Card className="mb-6 border-0 rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-500 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                      Your Personalized Nutrition Plan
                    </h2>
                    <p className="text-lg opacity-90">
                      Build your perfect meal plan
                    </p>
                  </div>
                  <ChefHat className="w-20 h-20 opacity-20" />
                </div>
                <p className="text-lg opacity-90 mb-6">
                  {goalDescriptions[userGoal]}
                </p>
                <p className="text-sm opacity-80 mb-6">
                  ✨ Select your favorite meals from each category to build your personalized daily diet plan
                </p>
                
                {/* Totals Display */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm opacity-80">Selected Meals</p>
                    <p className="text-3xl" style={{ fontWeight: 700 }}>
                      {Object.values(selectedMeals).flat().length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Total Protein</p>
                    <p className="text-3xl" style={{ fontWeight: 700 }}>
                      {totals.protein}g
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Total Calories</p>
                    <p className="text-3xl" style={{ fontWeight: 700 }}>
                      {totals.calories}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Region</p>
                    <p className="text-xl" style={{ fontWeight: 700 }}>
                      {userState}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 flex-wrap">
                  <Button 
                    variant="secondary"
                    onClick={() => {
                      if (Object.values(selectedMeals).flat().length === 0) {
                        toast.error('Please select at least one meal to view your diet plan');
                      } else {
                        setIsViewDietOpen(true);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Diet
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={handleDownloadPlan}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Plan
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={handleSharePlan}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Plan
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/diet/new-plan')}
                  >
                    Change Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Meal Tabs */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Object.entries(tabConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                    activeTab === key
                      ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2'
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  <span className="mr-2">{config.icon}</span>
                  {config.label}
                  {selectedMeals[key as keyof typeof selectedMeals].length > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === key ? 'bg-white/30' : 'bg-green-100 text-green-700'
                    }`}>
                      {selectedMeals[key as keyof typeof selectedMeals].length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Selection Grid */}
          <div>
            {/* Category Banner */}
            <div className="relative h-32 rounded-xl overflow-hidden mb-6">
              <ImageWithFallback
                src={getMealImage(activeTab)}
                alt={tabConfig[activeTab].label}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${tabConfig[activeTab].color} opacity-80`}></div>
              <div className="absolute inset-0 flex items-center justify-between px-8">
                <div>
                  <h2 className="text-4xl text-white mb-1" style={{ fontWeight: 700 }}>
                    <span className="mr-3">{tabConfig[activeTab].icon}</span>
                    {tabConfig[activeTab].label} Options
                  </h2>
                  <p className="text-white/90">Select your favorite {tabConfig[activeTab].label.toLowerCase()} meals</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <p className="text-white text-sm">Selected</p>
                  <p className="text-white text-3xl" style={{ fontWeight: 700 }}>
                    {selectedMeals[activeTab].length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {meals[activeTab].map((meal, idx) => (
                <MealSelectionCard
                  key={idx}
                  meal={meal}
                  mealType={activeTab}
                  isSelected={selectedMeals[activeTab].includes(meal.name)}
                />
              ))}
            </div>
          </div>

          {/* Selected Meals Summary */}
          {Object.values(selectedMeals).flat().length > 0 && (
            <Card className="mt-8 border-2 border-green-500">
              <CardContent className="p-6">
                <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                  Your Selected Diet Plan
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(selectedMeals).map(([mealType, mealNames]) => (
                    mealNames.length > 0 && (
                      <div key={mealType}>
                        <h4 className="mb-2 text-sm text-gray-600" style={{ fontWeight: 600 }}>
                          {tabConfig[mealType as keyof typeof tabConfig].icon} {tabConfig[mealType as keyof typeof tabConfig].label}
                        </h4>
                        <ul className="space-y-1">
                          {mealNames.map((name, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* View Diet Dialog */}
      <Dialog open={isViewDietOpen} onOpenChange={setIsViewDietOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Your Complete Diet Plan
              </span>
            </DialogTitle>
            <DialogDescription className="text-base">
              {userState} Cuisine • {goalLabels[userGoal]} • {Object.values(selectedMeals).flat().length} Meals Selected
            </DialogDescription>
          </DialogHeader>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 my-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Protein</p>
                <p className="text-3xl text-green-600" style={{ fontWeight: 700 }}>{totals.protein}g</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total Calories</p>
                <p className="text-3xl text-orange-600" style={{ fontWeight: 700 }}>{totals.calories}</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Meals Per Day</p>
                <p className="text-3xl text-blue-600" style={{ fontWeight: 700 }}>
                  {Object.entries(selectedMeals).filter(([_, meals]) => meals.length > 0).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Meal Details */}
          <div className="space-y-6">
            {Object.entries(selectedMeals).map(([mealType, mealNames]) => {
              if (mealNames.length === 0) return null;
              
              const mealTypeKey = mealType as keyof typeof tabConfig;
              const config = tabConfig[mealTypeKey];
              
              return (
                <div key={mealType} className="space-y-3">
                  <div className={`flex items-center gap-3 py-2 px-4 rounded-lg bg-gradient-to-r ${config.color} text-white`}>
                    <span className="text-2xl">{config.icon}</span>
                    <h3 className="text-xl" style={{ fontWeight: 700 }}>{config.label}</h3>
                    <span className="ml-auto bg-white/30 px-3 py-1 rounded-full text-sm">
                      {mealNames.length} option{mealNames.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="grid gap-3">
                    {mealNames.map((mealName, idx) => {
                      const meal = meals[mealTypeKey].find(m => m.name === mealName);
                      if (!meal) return null;
                      
                      return (
                        <Card key={idx} className="border-2 hover:border-green-300 transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-start gap-3 mb-2">
                                  <h4 className="text-lg" style={{ fontWeight: 700 }}>{meal.name}</h4>
                                  <span className={`px-2 py-0.5 rounded-full text-xs ${meal.type === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {meal.type === 'veg' ? '🌱 Veg' : '🍗 Non-Veg'}
                                  </span>
                                </div>
                                
                                <div className="mb-2">
                                  <p className="text-xs text-gray-600 mb-1" style={{ fontWeight: 600 }}>Ingredients:</p>
                                  <p className="text-sm text-gray-700">{meal.ingredients}</p>
                                </div>
                                
                                <div className="bg-blue-50 p-2 rounded text-xs text-blue-900 mb-2">
                                  <span style={{ fontWeight: 600 }}>Serving Tip:</span> {meal.servingTip}
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2">
                                <div className="bg-green-50 border border-green-200 px-3 py-2 rounded-lg text-center min-w-[80px]">
                                  <p className="text-xs text-gray-600">Protein</p>
                                  <p className="text-lg text-green-600" style={{ fontWeight: 700 }}>{meal.protein}</p>
                                </div>
                                <div className="bg-orange-50 border border-orange-200 px-3 py-2 rounded-lg text-center min-w-[80px]">
                                  <p className="text-xs text-gray-600">Calories</p>
                                  <p className="text-lg text-orange-600" style={{ fontWeight: 700 }}>{meal.calories}</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleDownloadPlan}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Diet Plan
            </Button>
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSharePlan}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
