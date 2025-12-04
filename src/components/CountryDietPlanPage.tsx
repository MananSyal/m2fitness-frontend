import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Home, LayoutDashboard, Eye, Download, Share2, Settings, Coffee, Salad, Cookie, UtensilsCrossed, Flame, Drumstick, Plus, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getCountryByCode, CountryDietMeal, filterMealsByDietType } from '../utils/countryDietData';
import { toast } from 'sonner@2.0.3';

interface SelectedMeal {
  category: string;
  meal: CountryDietMeal;
}

export default function CountryDietPlanPage() {
  const { countryCode } = useParams<{ countryCode: string }>();
  const navigate = useNavigate();
  const country = countryCode ? getCountryByCode(countryCode) : null;
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  
  // Get diet preference from localStorage
  const dietPreference = localStorage.getItem('dietPreference') || 'both';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!country) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4" style={{ fontWeight: 700 }}>Country Not Found</h2>
          <Button onClick={() => navigate('/diet/countries')}>
            Back to Country Selection
          </Button>
        </div>
      </div>
    );
  }

  // Don't show this page for India (should go to state selection instead)
  if (country.code === 'india') {
    navigate('/diet/india/states');
    return null;
  }

  const mealCategories = [
    {
      id: 'breakfast',
      title: 'Breakfast',
      icon: Coffee,
      emoji: '🍳',
      color: 'from-orange-500 to-yellow-500',
      meals: filterMealsByDietType(country.breakfast, dietPreference),
      image: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NjI2MTYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'lunch',
      title: 'Lunch',
      icon: Salad,
      emoji: '🍗',
      color: 'from-green-500 to-emerald-500',
      meals: filterMealsByDietType(country.lunch, dietPreference),
      image: 'https://images.unsplash.com/photo-1578679664605-80268ff31300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbHVuY2glMjBzYWxhZHxlbnwxfHx8fDE3NjI2NDUyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'snacks',
      title: 'Snacks',
      icon: Cookie,
      emoji: '🥜',
      color: 'from-purple-500 to-pink-500',
      meals: filterMealsByDietType(country.snacks, dietPreference),
      image: 'https://images.unsplash.com/photo-1671981200629-014c03829abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc25hY2tzJTIwbnV0c3xlbnwxfHx8fDE3NjI2NzQyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 'dinner',
      title: 'Dinner',
      icon: UtensilsCrossed,
      emoji: '🍽',
      color: 'from-blue-500 to-indigo-500',
      meals: filterMealsByDietType(country.dinner, dietPreference),
      image: 'https://images.unsplash.com/photo-1753775290395-09e3cb0b6f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZGlubmVyJTIwZ3JpbGxlZHxlbnwxfHx8fDE3NjI2NzQyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  // Calculate total stats from selected meals
  const totalProtein = selectedMeals.reduce((sum, item) => {
    const proteinValue = parseInt(item.meal.protein.replace('g', '')) || 0;
    return sum + proteinValue;
  }, 0);

  const totalCalories = selectedMeals.reduce((sum, item) => sum + item.meal.calories, 0);

  const handleAddMeal = (category: string, meal: CountryDietMeal) => {
    // Check if meal is already selected
    const isSelected = selectedMeals.some(
      item => item.category === category && item.meal.name === meal.name
    );

    if (isSelected) {
      // Remove meal
      setSelectedMeals(selectedMeals.filter(
        item => !(item.category === category && item.meal.name === meal.name)
      ));
      toast.success(`Removed ${meal.name} from plan`);
    } else {
      // Add meal
      setSelectedMeals([...selectedMeals, { category, meal }]);
      toast.success(`Added ${meal.name} to plan`);
    }
  };

  const isMealSelected = (category: string, mealName: string) => {
    return selectedMeals.some(
      item => item.category === category && item.meal.name === mealName
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/diet/countries')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to States
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner - Green Gradient */}
      <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="text-7xl">
              {country.flag}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>
                Your Personalized Nutrition Plan
              </h1>
              <p className="text-xl text-white/90">Build your perfect meal plan</p>
              <p className="text-lg text-white/80 mt-2">{country.description}</p>
            </div>
            <div className="text-6xl opacity-20">
              👨‍🍳
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-white/80 mb-1">Selected Meals</p>
                <p className="text-3xl" style={{ fontWeight: 700 }}>{selectedMeals.length}</p>
              </div>
              <div>
                <p className="text-white/80 mb-1">Total Protein</p>
                <p className="text-3xl" style={{ fontWeight: 700 }}>{totalProtein}g</p>
              </div>
              <div>
                <p className="text-white/80 mb-1">Total Calories</p>
                <p className="text-3xl" style={{ fontWeight: 700 }}>{totalCalories}</p>
              </div>
              <div>
                <p className="text-white/80 mb-1">Region</p>
                <p className="text-3xl" style={{ fontWeight: 700 }}>{country.name}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button className="bg-white text-green-600 hover:bg-green-50 gap-2">
              <Eye className="w-4 h-4" />
              View Diet
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 gap-2">
              <Download className="w-4 h-4" />
              Download Plan
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 gap-2">
              <Share2 className="w-4 h-4" />
              Share Plan
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 gap-2">
              <Settings className="w-4 h-4" />
              Change Preferences
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Meal Category Tabs */}
        <Tabs defaultValue="lunch" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-auto">
            {mealCategories.map((category) => {
              const Icon = category.icon;
              const categoryMealsSelected = selectedMeals.filter(m => m.category === category.id).length;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.title}</span>
                  {categoryMealsSelected > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-[20px] px-1">
                      {categoryMealsSelected}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {mealCategories.map((category) => {
            const Icon = category.icon;
            const categoryMealsSelected = selectedMeals.filter(m => m.category === category.id).length;
            
            return (
              <TabsContent key={category.id} value={category.id}>
                {/* Category Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 mb-8 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">
                        <Icon className="w-12 h-12" />
                      </div>
                      <div>
                        <h2 className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                          {category.emoji} {category.title} Options
                        </h2>
                        <p className="text-green-100">
                          Select your favorite {category.title.toLowerCase()} meals
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-5xl" style={{ fontWeight: 700 }}>Selected</p>
                      <p className="text-6xl" style={{ fontWeight: 700 }}>{categoryMealsSelected}</p>
                    </div>
                  </div>
                </div>

                {/* Meal Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.meals.map((meal, idx) => {
                    const isSelected = isMealSelected(category.id, meal.name);
                    
                    return (
                      <Card
                        key={idx}
                        className={`overflow-hidden hover:shadow-xl transition-all cursor-pointer group ${
                          isSelected ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-200'
                        }`}
                        onClick={() => handleAddMeal(category.id, meal)}
                      >
                        <CardContent className="p-0">
                          {/* Meal Image */}
                          <div className="relative h-40 overflow-hidden">
                            <ImageWithFallback
                              src={category.image}
                              alt={meal.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {isSelected && (
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-green-500 text-white border-0">
                                  <Check className="w-3 h-3 mr-1" />
                                  Added
                                </Badge>
                              </div>
                            )}
                            <div className="absolute bottom-2 right-2 flex gap-1">
                              <Badge className="bg-white/95 text-gray-800 border-0 text-xs">
                                <Flame className="w-3 h-3 mr-1 text-orange-600" />
                                {meal.calories}
                              </Badge>
                            </div>
                          </div>

                          {/* Meal Info */}
                          <div className="p-4">
                            <h3 className="text-lg mb-2 line-clamp-1" style={{ fontWeight: 700 }}>
                              {meal.name}
                            </h3>
                            
                            {/* Stats */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1 text-sm">
                                <Drumstick className="w-4 h-4 text-purple-600" />
                                <span style={{ fontWeight: 600 }}>Protein</span>
                              </div>
                              <span className="text-lg text-green-600" style={{ fontWeight: 700 }}>
                                {meal.protein}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1 text-sm">
                                <Flame className="w-4 h-4 text-orange-600" />
                                <span style={{ fontWeight: 600 }}>Calories</span>
                              </div>
                              <span className="text-sm text-gray-600" style={{ fontWeight: 600 }}>
                                {meal.calories}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                              {meal.description}
                            </p>

                            {/* Add to Plan Button */}
                            <Button
                              className={`w-full ${
                                isSelected
                                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddMeal(category.id, meal);
                              }}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Remove from Plan
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add to Plan
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Selected Meals Summary */}
        {selectedMeals.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl mb-4" style={{ fontWeight: 700 }}>
              📋 Your Selected Meals ({selectedMeals.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedMeals.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-green-200">
                  <Badge className="mb-2 bg-green-100 text-green-700 border-0">
                    {item.category}
                  </Badge>
                  <p style={{ fontWeight: 700 }}>{item.meal.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.meal.protein} • {item.meal.calories} cal
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
