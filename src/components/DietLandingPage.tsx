import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Home, Dumbbell, TrendingUp, User, LogOut, Utensils, MapPin, Target, Users2, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../utils/authContext';

export default function DietLandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, setReturnPath, setPendingAction } = useAuth();

  const handleGetPlan = () => {
    if (!isAuthenticated) {
      setReturnPath(location.pathname);
      setPendingAction({
        type: 'get-plan',
        message: 'Create your personalized diet plan'
      });
      navigate('/login');
    } else {
      navigate('/diet/new-plan');
    }
  };
  const features = [
    {
      icon: MapPin,
      title: 'Regional Indian Meals',
      description: 'Automatically selects foods based on your state\'s cuisine and preferences',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: Utensils,
      title: 'High-Protein Balanced Plans',
      description: 'Each meal provides ≈25g protein with 4 balanced meals per day (100g total)',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Target,
      title: 'Goal-Oriented Nutrition',
      description: 'Customized for Lose Weight, Gain Muscle, or Stay Active goals',
      gradient: 'from-orange-400 to-orange-600',
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
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h1 className="text-5xl" style={{ fontWeight: 700, lineHeight: 1.2 }}>
                Personalized Diets for Every Lifestyle
              </h1>
              <p className="text-xl text-gray-600">
                Get meal plans crafted from your region's cuisine — balanced, protein-rich, and easy to follow.
              </p>
              <Button 
                onClick={handleGetPlan}
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
                Create My Diet Plan
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1711153419402-336ee48f2138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMGZvb2R8ZW58MXx8fHwxNzYxMjk5MTAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Indian thali"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <div className="text-center mb-12 py-12">
              <h2 className="text-5xl mb-6" style={{ fontWeight: 700 }}>
                Why Our Diet Plans Work
              </h2>
              <p className="text-xl text-gray-600">
                Nutrition that fits your culture and lifestyle
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="mb-3" style={{ fontWeight: 700 }}>{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Regional Showcase */}
          <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 border-2">
            <CardContent className="p-12">
              <div className="text-center mb-8 py-8">
                <h2 className="text-4xl mb-6" style={{ fontWeight: 700 }}>
                  Authentic Regional Cuisine
                </h2>
                <p className="text-xl text-gray-600">
                  We understand your local preferences
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { region: 'Punjab', foods: 'Paneer, Lentils, Roti' },
                  { region: 'Tamil Nadu', foods: 'Idli, Sambar, Fish' },
                  { region: 'Maharashtra', foods: 'Sprouted Moong, Chapati' },
                  { region: 'Kerala', foods: 'Fish Curry, Red Rice' },
                  { region: 'Gujarat', foods: 'Moong Dal, Curd, Dhokla' },
                  { region: 'Haryana', foods: 'Soya Chunks, Chapati' },
                  { region: 'West Bengal', foods: 'Fish, Rice, Lentils' },
                  { region: 'Rajasthan', foods: 'Dal Baati, Paneer' },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <p style={{ fontWeight: 700 }}>{item.region}</p>
                    </div>
                    <p className="text-sm text-gray-600">{item.foods}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-16 p-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-xl">
            <h2 className="text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
              Ready to Transform Your Nutrition?
            </h2>
            <p className="text-xl text-green-100 mb-6">
              Get started with a personalized meal plan in just 6 easy steps
            </p>
            <Button 
              onClick={handleGetPlan}
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              {!isAuthenticated && <Lock className="w-4 h-4 mr-2" />}
              Create My Diet Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
