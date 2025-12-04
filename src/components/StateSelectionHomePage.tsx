import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Search, Utensils, Dumbbell, Users, BookOpen, ArrowRight, Zap, Heart, TrendingUp, MapPin, Play, Filter, MessageCircle, Clock, Target } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { workoutDatabase, getWorkoutsByLevel, type Workout } from '../utils/workoutDatabase';
import heroImage from 'figma:asset/2187b0063c69775fee81df986b7fd4d50267f579.png';
import indiaLandmarksBg from 'figma:asset/56785eb625af8e5f38f71ef958e29a95fff40533.png';

export default function StateSelectionHomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [workoutFilter, setWorkoutFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [loadingState, setLoadingState] = useState<string | null>(null);

  // State-wise food data - Direct links to personalized diet plans
  const stateFood = [
    {
      state: 'Punjab',
      meal: 'Paneer Bhurji + Roti',
      protein: '25g',
      image: 'https://images.unsplash.com/photo-1586981114766-708f09a71e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW5qYWIlMjBmb29kJTIwc2Ftb3NhfGVufDF8fHx8MTc2MTc2MTUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Train. Track. Transform.',
      route: '/diet-plan/punjab',
    },
    {
      state: 'Haryana',
      meal: 'Soya Chilla + Curd',
      protein: '24g',
      image: 'https://images.unsplash.com/photo-1672477179695-7276b0602fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMG1lYWx8ZW58MXx8fHwxNzYxNzMzNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Strength in Every Rep',
      route: '/diet-plan/haryana',
    },
    {
      state: 'Gujarat',
      meal: 'Moong Dal + Thepla',
      protein: '23g',
      image: 'https://images.unsplash.com/photo-1714799263291-272975db795a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWphcmF0JTIwZm9vZHxlbnwxfHx8fDE3NjE3NjE1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Wellness, Our Way',
      route: '/diet-plan/gujarat',
    },
    {
      state: 'Maharashtra',
      meal: 'Tofu Curry + Brown Rice',
      protein: '25g',
      image: 'https://images.unsplash.com/photo-1657186618738-9dfbcee196b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjBjdXJyeXxlbnwxfHx8fDE3NjE2ODU2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Move More, Achieve More',
      route: '/diet-plan/maharashtra',
    },
    {
      state: 'Tamil Nadu',
      meal: 'Sambar + Idli + Curd',
      protein: '23g',
      image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoZWFsdGh5JTIwbWVhbCUyMGJvd2x8ZW58MXx8fHwxNzYxNzYxNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Excellence in Motion',
      route: '/diet-plan/tamil-nadu',
    },
    {
      state: 'Kerala',
      meal: 'Fish Curry + Red Rice',
      protein: '26g',
      image: 'https://images.unsplash.com/photo-1620894580123-466ad3a0ca06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmaXNoJTIwY3Vycnl8ZW58MXx8fHwxNzYxNzYxNTEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      caption: 'Fitness, Naturally',
      route: '/diet-plan/kerala',
    },
  ];

  // Filter states based on search
  const filteredStates = stateFood.filter(state =>
    state.state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  // Workout suggestions
  const workoutSuggestions = [
    'Bench Press',
    'Squats',
    'Deadlift',
    'Push-ups',
    'Lunges',
    'Plank',
  ];

  // Get workouts from database based on filter
  const getFilteredWorkouts = (): Workout[] => {
    if (workoutFilter === 'all') {
      // Show one from each level for "All"
      const beginner = getWorkoutsByLevel('beginner')[0];
      const intermediate = getWorkoutsByLevel('intermediate')[0];
      const advanced = getWorkoutsByLevel('advanced')[0];
      return [beginner, intermediate, advanced];
    } else {
      return getWorkoutsByLevel(workoutFilter);
    }
  };

  const filteredWorkouts = getFilteredWorkouts();

  // Community highlights
  const communityHighlights = [
    {
      title: '30-day transformation complete!',
      author: '@fitharyana',
      image: 'https://images.unsplash.com/photo-1734191979156-57972139dfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNjdWxhciUyMGZpdG5lc3MlMjBtb2RlbCUyMHBoeXNpcXVlfGVufDF8fHx8MTc2MjAxOTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 245,
      comments: 32,
    },
    {
      title: 'New PR on deadlifts 💪',
      author: '@punjabgains',
      image: 'https://images.unsplash.com/photo-1756699495345-6877309eb20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdvbWFuJTIwbXVzY2xlc3xlbnwxfHx8fDE3NjIwMTk0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 189,
      comments: 24,
    },
    {
      title: 'Meal prep Sunday done right 🥗',
      author: '@delhifit',
      image: 'https://images.unsplash.com/photo-1587996580981-bd03dde74843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbWVhbCUyMHByZXAlMjBib2R5YnVpbGRpbmd8ZW58MXx8fHwxNzYyMDE4ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 312,
      comments: 45,
    },
  ];

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Check if it's a workout search
    const isWorkout = workoutSuggestions.some(w => w.toLowerCase().includes(lowerQuery)) ||
                      lowerQuery.includes('workout') || 
                      lowerQuery.includes('exercise');
    
    // Check if it's a state search
    const isState = stateFood.some(s => s.state.toLowerCase().includes(lowerQuery));
    
    if (isWorkout) {
      navigate('/workouts');
    } else if (isState) {
      // Find matching state and navigate to diet setup
      const matchedState = stateFood.find(s => s.state.toLowerCase().includes(lowerQuery));
      if (matchedState) {
        navigate(matchedState.route);
      }
    } else {
      navigate('/workouts');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 Tier 1 — Navigation Bar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-[1600px] mx-auto pl-4 pr-8 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-2xl whitespace-nowrap" style={{ fontWeight: 700 }}>M2Fitnes</span>
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
              <Input
                placeholder="Search workouts, states, diet plans, or anything fitness..."
                className="pl-14 pr-6 h-16 text-lg bg-gray-50 border-2 border-gray-200 focus:border-blue-400 transition-all rounded-2xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearch(searchQuery);
                  }
                }}
              />
              {isSearchFocused && searchQuery.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-blue-300 p-6 z-[100] min-w-[600px]">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Workout Suggestions */}
                    {workoutSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-3 uppercase tracking-wide" style={{ fontWeight: 700 }}>
                          🏋️ Workouts & Exercises
                        </p>
                        <div className="space-y-2">
                          {workoutSuggestions
                            .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, 5)
                            .map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSearchQuery(suggestion);
                                  handleSearch(suggestion);
                                }}
                                className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-200"
                              >
                                <span className="text-blue-600 mr-2">🏋️</span>
                                <span style={{ fontWeight: 600 }}>{suggestion}</span>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                    
                    {/* State/Diet Suggestions */}
                    {stateFood.filter(s => s.state.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-3 uppercase tracking-wide" style={{ fontWeight: 700 }}>
                          🍛 Regional Diet Plans
                        </p>
                        <div className="space-y-2">
                          {stateFood
                            .filter(s => s.state.toLowerCase().includes(searchQuery.toLowerCase()))
                            .slice(0, 5)
                            .map((state, idx) => (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSearchQuery(state.state);
                                  navigate(state.route);
                                }}
                                className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors border border-transparent hover:border-green-200"
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="text-green-600 mr-2">🍛</span>
                                    <span style={{ fontWeight: 600 }}>{state.state}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{state.protein}</span>
                                </div>
                                <p className="text-xs text-gray-500 ml-6">{state.meal}</p>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* No results message */}
                  {workoutSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && 
                   stateFood.filter(s => s.state.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No suggestions found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-400 mt-1">Try searching for workouts, states, or diet plans</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-green-50 hover:text-green-600 transition-all px-3 text-sm"
                onClick={() => navigate('/diet/new-plan')}
              >
                🥗 Diet
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-blue-50 hover:text-blue-600 transition-all px-3 text-sm"
                onClick={() => navigate('/workouts')}
              >
                🏋️ Workouts
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-gradient-to-r hover:from-red-50 hover:to-blue-50 hover:text-red-600 transition-all group px-3 text-sm"
                onClick={() => navigate('/muscle-anatomy')}
              >
                <span className="relative">
                  🎯 Anatomy
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50 hover:text-green-600 transition-all group px-3 text-sm"
                onClick={() => navigate('/protein-calculator')}
              >
                <span className="relative">
                  ⚖️ Protein
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-purple-50 hover:text-purple-600 transition-all px-3 text-sm"
                onClick={() => navigate('/community')}
              >
                💬 Community
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-orange-50 hover:text-orange-600 transition-all px-3 text-sm"
                onClick={() => navigate('/blog')}
              >
                📰 Blog
              </Button>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 whitespace-nowrap" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Tier 2 — Moving Hashtag Strip */}
      <div className="relative bg-gradient-to-r from-orange-500 via-blue-500 to-green-500 text-white py-3 overflow-hidden">
        <div className="animate-scroll-hashtag whitespace-nowrap">
          <span className="inline-block px-8">#GharKiDiet</span>
          <span className="inline-block px-8">#YourStateYourStrength</span>
          <span className="inline-block px-8">#DesiGains</span>
          <span className="inline-block px-8">#M2Fitnes</span>
          <span className="inline-block px-8">#MadeInIndia</span>
          <span className="inline-block px-8">#NoExcuses</span>
          <span className="inline-block px-8">#GharKiDiet</span>
          <span className="inline-block px-8">#YourStateYourStrength</span>
          <span className="inline-block px-8">#DesiGains</span>
          <span className="inline-block px-8">#M2Fitnes</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-16">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Fitness motivation"
              className="w-full h-full object-cover object-[center_20%]"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6 text-center py-20">
            <div className="mb-6">
              <span className="text-6xl">💪</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight" style={{ fontWeight: 700 }}>
              <span className="text-blue-500">Your State. </span>
              <span className="text-purple-500">Your Food. </span>
              <span className="text-red-500">Your Protein.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 italic max-w-5xl mx-auto" style={{ fontWeight: 400 }}>
              "Kya aapki maa bhi diet karne nahi deti? Toh le aayiye — Ghar Ki Diet! 100g Protein."
            </p>
            <div className="flex items-center justify-center gap-8 text-base text-gray-300">
              <span className="flex items-center gap-2" style={{ fontWeight: 500 }}>
                🎯 State-Personalized
              </span>
              <span className="text-gray-500">•</span>
              <span className="flex items-center gap-2" style={{ fontWeight: 500 }}>
                ❤️ Community-First
              </span>
            </div>
          </div>
        </section>

        {/* Ghar Ki Diet Section */}
        <section className="relative py-16 pb-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1736680056361-6a2f6e35fa50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMGN1cnJ5JTIwcmljZXxlbnwxfHx8fDE3NjIwNjIzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ghar Ki Diet background"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 py-12">
              <h2 className="text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
                Ghar Ki Diet 🏡
              </h2>
              <p className="text-2xl text-white">
                100g Protein. Zero Compromise. Pure Desi Power.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <Card className="group hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex-1 max-w-sm border-2 hover:border-green-400" onClick={() => navigate('/state-selection')}>
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1742281257687-092746ad6021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwaW5kaWFuJTIwcmVnaW9uYWwlMjBmb29kfGVufDF8fHx8MTc2MjAyMzMzMXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Diverse Indian regional cuisine"
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-green-500/40 group-hover:to-green-500/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-transparent to-transparent group-hover:from-green-400/30 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-500">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center group-hover:bg-green-50 transition-all duration-500">
                  <h3 className="text-2xl mb-3 group-hover:text-green-600 transition-colors duration-500" style={{ fontWeight: 700 }}>Choose Your State</h3>
                  <p className="text-gray-600 group-hover:text-gray-700">Every state has its own flavors and proteins. Find yours!</p>
                </CardContent>
              </Card>
              
              {/* Arrow 1 */}
              <div className="hidden md:flex items-center justify-center group">
                <ArrowRight className="w-12 h-12 text-green-400 animate-pulse" strokeWidth={3} />
              </div>
              
              <Card className="group hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex-1 max-w-sm border-2 hover:border-blue-400" onClick={() => navigate('/goal-setup')}>
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600803925569-97669ca70efd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRlciUyMGNoZXN0JTIwbXVzY2xlc3xlbnwxfHx8fDE3NjIwMjM0NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Bodybuilder chest"
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent px-[10px] py-[0px] group-hover:from-blue-500/40 group-hover:to-blue-500/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-transparent to-transparent group-hover:from-blue-400/30 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center group-hover:bg-blue-50 transition-all duration-500">
                  <h3 className="text-2xl mb-3 group-hover:text-blue-600 transition-colors duration-500" style={{ fontWeight: 700 }}>Set Your Goal</h3>
                  <p className="text-gray-600 group-hover:text-gray-700">Weight loss, muscle gain, or stay fit — we got you!</p>
                </CardContent>
              </Card>
              
              {/* Arrow 2 */}
              <div className="hidden md:flex items-center justify-center group">
                <ArrowRight className="w-12 h-12 text-green-400 animate-pulse" strokeWidth={3} />
              </div>
              
              <Card className="group hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex-1 max-w-sm border-2 hover:border-orange-400" onClick={() => navigate('/diet/new-plan')}>
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1587996580981-bd03dde74843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMHByZXAlMjBwcm90ZWlufGVufDF8fHx8MTc2MjA1OTQ1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Healthy meal prep"
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-orange-500/40 group-hover:to-orange-500/10 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 via-transparent to-transparent group-hover:from-orange-400/30 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all duration-500">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center group-hover:bg-orange-50 transition-all duration-500">
                  <h3 className="text-2xl mb-3 group-hover:text-orange-600 transition-colors duration-500" style={{ fontWeight: 700 }}>Get Your Plan</h3>
                  <p className="text-gray-600 group-hover:text-gray-700">Personalized meal plans based on regional foods you love!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 🌍 State-Wise Food Section (VERTICAL + SEARCHABLE) */}
        <section className="relative py-16 pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={indiaLandmarksBg}
              alt="Taj Mahal through ornate archway"
              className="w-full h-full object-cover object-center"
            />
            {/* Light gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-8 py-12">
              <h2 className="text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
                Taste Your State — Local Meals, Real Protein 🍛
              </h2>
              <p className="text-2xl text-white mb-8">
                Discover how every Indian state fuels strength in its own flavor.
              </p>

              {/* State Search Bar */}
              <div className="max-w-md mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search your state…"
                    className="pl-12 pr-4 h-14 bg-gray-50 border-2 border-green-200 focus:border-green-400 transition-all"
                    value={stateSearchQuery}
                    onChange={(e) => setStateSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Six Vertical State Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-16">
              {filteredStates.map((state, idx) => (
                <Card
                  key={idx}
                  className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-200 hover:border-green-400 overflow-hidden"
                  onClick={() => {
                    setLoadingState(state.state);
                    // Save selected state to localStorage for pre-filling the form
                    localStorage.setItem('preselectedState', state.state);
                    // Navigate to the 6-step diet plan flow
                    setTimeout(() => navigate('/diet/new-plan'), 300);
                  }}
                >
                  <CardContent className="p-0">
                    {/* State Background Image */}
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={state.image}
                        alt={state.state}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* State Name */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5" />
                          <h3 className="text-3xl" style={{ fontWeight: 700 }}>{state.state}</h3>
                        </div>
                        <p className="text-lg opacity-90">{state.caption}</p>
                      </div>
                    </div>

                    {/* Meal Info */}
                    <div className="p-6 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Featured Meal</p>
                          <p className="text-xl" style={{ fontWeight: 600 }}>{state.meal}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Protein</p>
                          <p className="text-2xl text-green-600" style={{ fontWeight: 700 }}>{state.protein}</p>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 group-hover:scale-105 transition-transform">
                        View Meal Plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 💬 Community Highlights */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1734668484998-c943d1fcb48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2R5YnVpbGRlciUyMGNvbW11bml0eSUyMGd5bXxlbnwxfHx8fDE3NjIwMjM4Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Bodybuilder community background"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12 py-12">
              <div>
                <h2 className="text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
                  Your Space. Your Strength. Your People.
                </h2>
                <p className="text-2xl text-white">
                  See what others are achieving
                </p>
              </div>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/community')}
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                View Feed
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {communityHighlights.map((post, idx) => (
                <Card 
                  key={idx}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => navigate(`/community/post/${idx + 1}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p style={{ fontWeight: 600 }} className="mb-2 line-clamp-2">{post.title}</p>
                      <p className="text-sm text-blue-600 mb-3">{post.author}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 🏋️ Trending Workouts */}
        <section className="relative py-16 pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1662381906696-bcad03513531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB3b3Jrb3V0JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYxOTI0Njg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Gym workout background"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8 py-12">
              <div>
                <h2 className="text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
                  Trending Workouts
                </h2>
                <p className="text-xl text-white">
                  Popular this week across India
                </p>
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/workouts')}
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                View All
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-3 mb-8">
              <Button
                variant={workoutFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setWorkoutFilter('all')}
              >
                All
              </Button>
              <Button
                variant={workoutFilter === 'beginner' ? 'default' : 'outline'}
                onClick={() => setWorkoutFilter('beginner')}
                className={workoutFilter === 'beginner' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Beginner
              </Button>
              <Button
                variant={workoutFilter === 'intermediate' ? 'default' : 'outline'}
                onClick={() => setWorkoutFilter('intermediate')}
                className={workoutFilter === 'intermediate' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Intermediate
              </Button>
              <Button
                variant={workoutFilter === 'advanced' ? 'default' : 'outline'}
                onClick={() => setWorkoutFilter('advanced')}
                className={workoutFilter === 'advanced' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              >
                Advanced
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {filteredWorkouts.map((workout) => (
                <Card 
                  key={workout.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-400"
                  onClick={() => navigate(`/workout/${workout.slug}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      {workout.video ? (
                        <ImageWithFallback
                          src={workout.video}
                          alt={workout.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 flex items-center justify-center">
                          <Dumbbell className={`w-20 h-20 ${
                            workout.level === 'beginner' ? 'text-blue-500' :
                            workout.level === 'intermediate' ? 'text-purple-500' :
                            'text-orange-500'
                          }`} />
                        </div>
                      )}
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs text-white shadow-lg ${
                        workout.level === 'beginner' ? 'bg-blue-500' :
                        workout.level === 'intermediate' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`} style={{ fontWeight: 600 }}>
                        {workout.level.charAt(0).toUpperCase() + workout.level.slice(1)}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>{workout.name}</h3>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {workout.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {workout.caloriesBurned}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{workout.description}</p>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 group-hover:shadow-lg transition-all">
                        <Play className="w-4 h-4 mr-2" />
                        Start Workout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 📰 Blog Section */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1740560052706-fd75ee856b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwbnV0cml0aW9uJTIwa25vd2xlZGdlfGVufDF8fHx8MTc2MjAyMzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Fitness knowledge background"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12 py-12">
              <div>
                <h2 className="text-6xl mb-6 text-white" style={{ fontWeight: 700 }}>
                  Latest from Our Blog 📰
                </h2>
                <p className="text-2xl text-white">
                  Real advice. Real results. 100% Desi fitness wisdom.
                </p>
              </div>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/blog')}
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  id: 1,
                  title: 'No More Excuses — Desi Style Fitness at Home',
                  snippet: 'Build muscle and lose fat using simple, home-based workouts.',
                  image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
                },
                {
                  id: 2,
                  title: 'Why Paneer is the Best Protein You\'re Ignoring',
                  snippet: 'Learn why this Indian cottage cheese should be your #1 protein source.',
                  image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600',
                },
                {
                  id: 3,
                  title: 'Top 5 Workouts for Indian Beginners',
                  snippet: 'Perfect exercises for beginners who want to build strength.',
                  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
                },
              ].map((article) => (
                <Card 
                  key={article.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  onClick={() => navigate(`/blog/${article.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl mb-2 group-hover:text-orange-600 transition-colors" style={{ fontWeight: 700 }}>
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.snippet}</p>
                      <Button 
                        variant="outline"
                        className="w-full border-orange-300 hover:bg-orange-50"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
                <span className="text-2xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
              </div>
              <p className="text-gray-400">Your personalized fitness journey starts here</p>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/workouts')} className="block text-gray-400 hover:text-white transition-colors">Workouts</button>
                <button onClick={() => navigate('/diet/new-plan')} className="block text-gray-400 hover:text-white transition-colors">Diet Plans</button>
                <button onClick={() => navigate('/community')} className="block text-gray-400 hover:text-white transition-colors">Community</button>
                <button onClick={() => navigate('/blog')} className="block text-gray-400 hover:text-white transition-colors">Blog</button>
              </div>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4" style={{ fontWeight: 600 }}>Account</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/login')} className="block text-gray-400 hover:text-white transition-colors">Login</button>
                <button onClick={() => navigate('/signup')} className="block text-gray-400 hover:text-white transition-colors">Sign Up</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 M2Fitnes — Version 12.1 (Final State & Navbar Fix). All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Loading Overlay */}
      {loadingState && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
              Preparing Your Plan
            </h3>
            <p className="text-gray-600 mb-4">
              Fetching your personalized <span style={{ fontWeight: 600 }}>{loadingState}</span> meal plan...
            </p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scroll-hashtag {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll-hashtag {
          animation: scroll-hashtag 25s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
