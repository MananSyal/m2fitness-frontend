import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, Download, RefreshCw, MapPin, Save, CheckCircle, Lock, Eye, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { getRegionalMeals } from '../utils/regionalMealData';
import { useAuth } from '../utils/authContext';

export default function PersonalizedDietPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setReturnPath, setPendingAction } = useAuth();
  const region = location.state?.region || localStorage.getItem('userState') || 'Punjab';
  const goal = location.state?.goal || 'Build Muscle';
  const dietType = location.state?.dietType || 'both';

  const regionalMeals = getRegionalMeals(region, dietType);
  
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0,
  });

  const [isViewSummaryOpen, setIsViewSummaryOpen] = useState(false);

  const mealImages: Record<string, string> = {
    breakfast: 'https://images.unsplash.com/photo-1543352632-5a4b24e4d2a6?w=400',
    lunch: 'https://images.unsplash.com/photo-1711153419402-336ee48f2138?w=400',
    snacks: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
    dinner: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
  };

  const totalProtein = () => {
    const breakfast = regionalMeals.breakfast[selectedMeals.breakfast];
    const lunch = regionalMeals.lunch[selectedMeals.lunch];
    const snacks = regionalMeals.snacks[selectedMeals.snacks];
    const dinner = regionalMeals.dinner[selectedMeals.dinner];
    
    return [breakfast, lunch, snacks, dinner]
      .reduce((acc, meal) => acc + parseInt(meal?.protein || '0'), 0);
  };

  const totalCalories = () => {
    const breakfast = regionalMeals.breakfast[selectedMeals.breakfast];
    const lunch = regionalMeals.lunch[selectedMeals.lunch];
    const snacks = regionalMeals.snacks[selectedMeals.snacks];
    const dinner = regionalMeals.dinner[selectedMeals.dinner];
    
    return [breakfast, lunch, snacks, dinner]
      .reduce((acc, meal) => acc + parseInt(meal?.calories || '0'), 0);
  };

  const totalCarbs = () => {
    const breakfast = regionalMeals.breakfast[selectedMeals.breakfast];
    const lunch = regionalMeals.lunch[selectedMeals.lunch];
    const snacks = regionalMeals.snacks[selectedMeals.snacks];
    const dinner = regionalMeals.dinner[selectedMeals.dinner];
    
    return [breakfast, lunch, snacks, dinner]
      .reduce((acc, meal) => acc + parseInt(meal?.carbs || '0'), 0);
  };

  const totalFats = () => {
    const breakfast = regionalMeals.breakfast[selectedMeals.breakfast];
    const lunch = regionalMeals.lunch[selectedMeals.lunch];
    const snacks = regionalMeals.snacks[selectedMeals.snacks];
    const dinner = regionalMeals.dinner[selectedMeals.dinner];
    
    return [breakfast, lunch, snacks, dinner]
      .reduce((acc, meal) => acc + parseInt(meal?.fats || '0'), 0);
  };

  const handleSelectMeal = (type: keyof typeof selectedMeals, index: number) => {
    setSelectedMeals(prev => ({ ...prev, [type]: index }));
    toast.success('Meal updated!', {
      description: `Your ${type} has been changed`,
    });
  };

  const handleRegenerate = () => {
    navigate('/diet/new-plan');
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setReturnPath(location.pathname);
      setPendingAction({
        type: 'save',
        message: 'Save your diet plan'
      });
      navigate('/login');
    } else {
      localStorage.setItem('savedDietPlan', JSON.stringify({
        region,
        goal,
        dietType,
        selectedMeals,
        timestamp: new Date().toISOString(),
      }));
      toast.success('✅ Diet plan saved!', {
        description: 'You can view it anytime from your dashboard',
      });
    }
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      setReturnPath(location.pathname);
      setPendingAction({
        type: 'download',
        message: 'Download your personalized plan (PDF)'
      });
      navigate('/login');
    } else {
      toast.success('📥 Downloading PDF...', {
        description: 'Your meal plan will be downloaded shortly',
      });
    }
  };

  const getCurrentMeal = (type: keyof typeof regionalMeals, index: number) => {
    return regionalMeals[type][index];
  };

  const goalLabels: Record<string, string> = {
    'lose-weight': 'Weight Loss',
    'gain-muscle': 'Muscle Gain',
    'stay-fit': 'Stay Fit',
  };

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
              <Button variant="secondary" className="w-full justify-start">
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-green-600" />
              <span className="text-lg text-gray-600">{region} Cuisine</span>
              <span className="text-gray-400">•</span>
              <span className="text-lg text-gray-600">{goalLabels[goal] || goal}</span>
            </div>
            <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>
              High-Protein {region} Diet Plan
            </h1>
            <p className="text-xl text-gray-600">
              Customize your daily meals with 10 options per meal time
            </p>
          </div>

          {/* Summary Card */}
          <Card className="mb-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalProtein()}g</div>
                  <p className="text-gray-600">Total Protein</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalCalories()}</div>
                  <p className="text-gray-600">Total Calories</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>4</div>
                  <p className="text-gray-600">Meals Per Day</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>10+</div>
                  <p className="text-gray-600">Options Each</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save to Dashboard
            </Button>
            <Button onClick={handleDownload} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
              onClick={() => setIsViewSummaryOpen(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Diet Summary
            </Button>
            <Button onClick={handleRegenerate} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Change Preferences
            </Button>
          </div>

          {/* Meals Tabs */}
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>

            <TabsContent value="breakfast">
              <div className="mb-6">
                <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                  Choose Your Breakfast ({regionalMeals.breakfast.length} Options)
                </h2>
                <p className="text-gray-600 mb-6">Select one meal for your breakfast</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionalMeals.breakfast.map((meal, idx) => (
                  <Card 
                    key={idx} 
                    className={`cursor-pointer transition-all ${
                      selectedMeals.breakfast === idx 
                        ? 'ring-4 ring-green-500 shadow-xl' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleSelectMeal('breakfast', idx)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={mealImages.breakfast}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedMeals.breakfast === idx && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2" style={{ fontWeight: 600 }}>{meal.name}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                          {meal.protein} protein
                        </span>
                        <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meal.ingredients}</p>
                      <p className="text-xs text-gray-500 italic">💡 {meal.servingTip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="lunch">
              <div className="mb-6">
                <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                  Choose Your Lunch ({regionalMeals.lunch.length} Options)
                </h2>
                <p className="text-gray-600 mb-6">Select one meal for your lunch</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionalMeals.lunch.map((meal, idx) => (
                  <Card 
                    key={idx} 
                    className={`cursor-pointer transition-all ${
                      selectedMeals.lunch === idx 
                        ? 'ring-4 ring-blue-500 shadow-xl' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleSelectMeal('lunch', idx)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={mealImages.lunch}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedMeals.lunch === idx && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2" style={{ fontWeight: 600 }}>{meal.name}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                          {meal.protein} protein
                        </span>
                        <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meal.ingredients}</p>
                      <p className="text-xs text-gray-500 italic">💡 {meal.servingTip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="snacks">
              <div className="mb-6">
                <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                  Choose Your Snacks ({regionalMeals.snacks.length} Options)
                </h2>
                <p className="text-gray-600 mb-6">Select one snack to keep you energized</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionalMeals.snacks.map((meal, idx) => (
                  <Card 
                    key={idx} 
                    className={`cursor-pointer transition-all ${
                      selectedMeals.snacks === idx 
                        ? 'ring-4 ring-orange-500 shadow-xl' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleSelectMeal('snacks', idx)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={mealImages.snacks}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedMeals.snacks === idx && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2" style={{ fontWeight: 600 }}>{meal.name}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                          {meal.protein} protein
                        </span>
                        <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meal.ingredients}</p>
                      <p className="text-xs text-gray-500 italic">💡 {meal.servingTip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dinner">
              <div className="mb-6">
                <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                  Choose Your Dinner ({regionalMeals.dinner.length} Options)
                </h2>
                <p className="text-gray-600 mb-6">Select one meal for your dinner</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regionalMeals.dinner.map((meal, idx) => (
                  <Card 
                    key={idx} 
                    className={`cursor-pointer transition-all ${
                      selectedMeals.dinner === idx 
                        ? 'ring-4 ring-purple-500 shadow-xl' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleSelectMeal('dinner', idx)}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={mealImages.dinner}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedMeals.dinner === idx && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="mb-2" style={{ fontWeight: 600 }}>{meal.name}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                          {meal.protein} protein
                        </span>
                        <span className="text-sm text-gray-600">{meal.calories} kcal</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{meal.ingredients}</p>
                      <p className="text-xs text-gray-500 italic">💡 {meal.servingTip}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Final Summary */}
          <Card className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
                Your Daily Meal Plan is Ready!
              </h2>
              <p className="text-lg mb-6 opacity-90">
                {region} cuisine • {totalProtein()}g protein • {totalCalories()} calories
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleSave} 
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save My Plan
                </Button>
                <Button 
                  onClick={handleDownload} 
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diet Summary Dialog */}
      <Dialog open={isViewSummaryOpen} onOpenChange={setIsViewSummaryOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl" style={{ fontWeight: 700 }}>
              Your Daily Diet Summary
            </DialogTitle>
            <DialogDescription>
              Complete breakdown of your personalized {region} meal plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Total Nutrients Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalProtein()}g</div>
                  <p className="text-sm text-gray-600">Protein</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalCarbs()}g</div>
                  <p className="text-sm text-gray-600">Carbs</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalFats()}g</div>
                  <p className="text-sm text-gray-600">Fats</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{totalCalories()}</div>
                  <p className="text-sm text-gray-600">Calories</p>
                </CardContent>
              </Card>
            </div>

            {/* Macro Breakdown Chart */}
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl mb-4" style={{ fontWeight: 700 }}>
                  Macronutrient Distribution
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontWeight: 600 }}>Protein</span>
                      <span className="text-gray-600">{Math.round((totalProtein() * 4 / totalCalories()) * 100)}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                        style={{ width: `${Math.round((totalProtein() * 4 / totalCalories()) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontWeight: 600 }}>Carbohydrates</span>
                      <span className="text-gray-600">{Math.round((totalCarbs() * 4 / totalCalories()) * 100)}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: `${Math.round((totalCarbs() * 4 / totalCalories()) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontWeight: 600 }}>Fats</span>
                      <span className="text-gray-600">{Math.round((totalFats() * 9 / totalCalories()) * 100)}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                        style={{ width: `${Math.round((totalFats() * 9 / totalCalories()) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal-by-Meal Breakdown */}
            <div className="space-y-4">
              <h3 className="text-2xl" style={{ fontWeight: 700 }}>
                Meal Breakdown
              </h3>

              {/* Breakfast */}
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl mb-1" style={{ fontWeight: 700 }}>
                        🌅 Breakfast
                      </h4>
                      <p className="text-lg" style={{ fontWeight: 600 }}>
                        {getCurrentMeal('breakfast', selectedMeals.breakfast)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl" style={{ fontWeight: 700 }}>
                        {getCurrentMeal('breakfast', selectedMeals.breakfast)?.calories} kcal
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('breakfast', selectedMeals.breakfast)?.protein} Protein
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('breakfast', selectedMeals.breakfast)?.carbs} Carbs
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('breakfast', selectedMeals.breakfast)?.fats} Fats
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getCurrentMeal('breakfast', selectedMeals.breakfast)?.ingredients}
                  </p>
                </CardContent>
              </Card>

              {/* Lunch */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl mb-1" style={{ fontWeight: 700 }}>
                        🍽️ Lunch
                      </h4>
                      <p className="text-lg" style={{ fontWeight: 600 }}>
                        {getCurrentMeal('lunch', selectedMeals.lunch)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl" style={{ fontWeight: 700 }}>
                        {getCurrentMeal('lunch', selectedMeals.lunch)?.calories} kcal
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('lunch', selectedMeals.lunch)?.protein} Protein
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('lunch', selectedMeals.lunch)?.carbs} Carbs
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('lunch', selectedMeals.lunch)?.fats} Fats
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getCurrentMeal('lunch', selectedMeals.lunch)?.ingredients}
                  </p>
                </CardContent>
              </Card>

              {/* Snacks */}
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl mb-1" style={{ fontWeight: 700 }}>
                        🥤 Snacks
                      </h4>
                      <p className="text-lg" style={{ fontWeight: 600 }}>
                        {getCurrentMeal('snacks', selectedMeals.snacks)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl" style={{ fontWeight: 700 }}>
                        {getCurrentMeal('snacks', selectedMeals.snacks)?.calories} kcal
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('snacks', selectedMeals.snacks)?.protein} Protein
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('snacks', selectedMeals.snacks)?.carbs} Carbs
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('snacks', selectedMeals.snacks)?.fats} Fats
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getCurrentMeal('snacks', selectedMeals.snacks)?.ingredients}
                  </p>
                </CardContent>
              </Card>

              {/* Dinner */}
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl mb-1" style={{ fontWeight: 700 }}>
                        🌙 Dinner
                      </h4>
                      <p className="text-lg" style={{ fontWeight: 600 }}>
                        {getCurrentMeal('dinner', selectedMeals.dinner)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl" style={{ fontWeight: 700 }}>
                        {getCurrentMeal('dinner', selectedMeals.dinner)?.calories} kcal
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('dinner', selectedMeals.dinner)?.protein} Protein
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('dinner', selectedMeals.dinner)?.carbs} Carbs
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                      {getCurrentMeal('dinner', selectedMeals.dinner)?.fats} Fats
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getCurrentMeal('dinner', selectedMeals.dinner)?.ingredients}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Goal Information */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
                  💪 Your Fitness Goal
                </h3>
                <p className="text-lg mb-2" style={{ fontWeight: 600 }}>{goalLabels[goal] || goal}</p>
                <p className="text-gray-600">
                  This meal plan is optimized for {region} cuisine with high-protein content to support your fitness journey.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsViewSummaryOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  handleSave();
                  setIsViewSummaryOpen(false);
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Plan
              </Button>
              <Button
                onClick={() => {
                  handleDownload();
                  setIsViewSummaryOpen(false);
                }}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
