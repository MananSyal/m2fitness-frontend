import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Home, User, Search, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export default function StateSelectionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const allStates = [
    'Punjab', 'Haryana', 'Delhi', 'Gujarat', 'Maharashtra', 'Mumbai', 'Tamil Nadu', 
    'Karnataka', 'Kerala', 'Rajasthan', 'Uttar Pradesh', 'Bihar', 'West Bengal',
    'Madhya Pradesh', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Assam', 
    'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Goa',
    'Jammu and Kashmir', 'Ladakh', 'Sikkim', 'Meghalaya', 'Manipur', 
    'Mizoram', 'Nagaland', 'Tripura', 'Arunachal Pradesh'
  ];

  const statesWithData = [
    'Punjab', 'Haryana', 'Delhi', 'Gujarat', 'Maharashtra', 'Mumbai', 'Tamil Nadu', 'Karnataka', 'Kerala',
    'Rajasthan', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Andhra Pradesh', 'Goa', 'Odisha', 
    'Assam', 'Jammu and Kashmir', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Tripura', 
    'Arunachal Pradesh', 'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 
    'Ladakh', 'Sikkim', 'Madhya Pradesh', 'Telangana'
  ];

  const filteredStates = allStates.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateSelection = (state: string) => {
    if (statesWithData.includes(state)) {
      localStorage.setItem('userState', state);
      navigate('/goal-setup');
    } else {
      localStorage.setItem('userState', state);
      navigate('/goal-setup?preview=true');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
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
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-6xl mb-6" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Choose Your State 🗺️
              </span>
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Every state has unique flavors. Let's personalize your diet!
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search your state..."
                className="pl-12 pr-4 h-14 bg-white border-2 border-blue-200 focus:border-blue-400 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* States Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredStates.map((state) => {
              const hasData = statesWithData.includes(state);
              return (
                <Card
                  key={state}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    hasData 
                      ? 'border-2 border-green-200 hover:border-green-400' 
                      : 'border-2 border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => handleStateSelection(state)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      hasData 
                        ? 'bg-gradient-to-br from-green-400 to-green-600' 
                        : 'bg-gradient-to-br from-gray-300 to-gray-500'
                    }`}>
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>{state}</h3>
                    {hasData ? (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        ✓ Diet Available
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No states found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
          </div>
          <p className="text-gray-400">&copy; 2025 M2Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
