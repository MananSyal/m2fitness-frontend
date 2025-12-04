import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ArrowLeft, ChevronRight, MapPin, Search, CheckCircle2, Clock, Globe } from 'lucide-react';
import { regionalMealDatabase } from '../utils/regionalMealData';

export default function IndianStateSelectionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // All Indian states and UTs
  const allIndianStates = [
    'Punjab', 'Haryana', 'Delhi', 'Gujarat', 'Maharashtra', 'Mumbai', 'Tamil Nadu', 
    'Karnataka', 'Kerala', 'Rajasthan', 'Uttar Pradesh', 'Bihar', 'West Bengal',
    'Madhya Pradesh', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Assam', 
    'Jharkhand', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Goa',
    'Jammu and Kashmir', 'Ladakh', 'Sikkim', 'Meghalaya', 'Manipur', 
    'Mizoram', 'Nagaland', 'Tripura', 'Arunachal Pradesh'
  ];

  // States with available diet data
  const statesWithData = Object.keys(regionalMealDatabase);

  const filteredStates = allIndianStates.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateSelection = (state: string) => {
    const stateSlug = state.toLowerCase().replace(/\s+/g, '-');
    navigate(`/diet/india/${stateSlug}`);
  };

  const hasData = (state: string) => statesWithData.includes(state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/diet/countries')}
              className="gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Countries
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-2xl" style={{ fontWeight: 700 }}>M2Fitness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 rounded-full mb-6">
            <span className="text-6xl">🇮🇳</span>
            <span className="text-xl text-blue-700" style={{ fontWeight: 700 }}>
              Step 2: Choose Your State
            </span>
          </div>
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            Select Your Indian State
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized diet plans based on your state's authentic regional cuisine and local ingredients
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Globe className="w-4 h-4" />
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/diet/countries')}>
            Country Selection
          </span>
          <ChevronRight className="w-4 h-4" />
          <span style={{ fontWeight: 600 }}>India</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Diet Plan</span>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for your state..."
              className="pl-12 pr-4 h-14 text-lg bg-white border-2 border-gray-200 focus:border-green-400 rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="border-2 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>31</div>
              <p className="text-sm text-gray-600">Total States & UTs</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>{statesWithData.length}</div>
              <p className="text-sm text-gray-600">Diets Available</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-1" style={{ fontWeight: 700 }}>16</div>
              <p className="text-sm text-gray-600">Meals per State</p>
            </CardContent>
          </Card>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((state) => {
            const available = hasData(state);
            return (
              <Card
                key={state}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  available
                    ? hoveredState === state
                      ? 'border-green-500 shadow-2xl shadow-green-200/50 scale-105'
                      : 'border-green-200 hover:border-green-400 hover:shadow-xl'
                    : 'border-gray-200 bg-gray-50'
                }`}
                onMouseEnter={() => available && setHoveredState(state)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => available && handleStateSelection(state)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-6 h-6 ${available ? 'text-green-600' : 'text-gray-400'}`} />
                      <h3 className="text-xl" style={{ fontWeight: 700 }}>
                        {state}
                      </h3>
                    </div>
                    {available ? (
                      <Badge className="bg-green-100 text-green-700 border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-gray-200 text-gray-600 border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                  </div>

                  {available && (
                    <>
                      <p className="text-sm text-gray-600 mb-4">
                        Explore traditional {state} cuisine with high-protein meals
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                      >
                        View Diet Plan
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </>
                  )}

                  {!available && (
                    <p className="text-sm text-gray-500">
                      We're working on adding diet plans for this state. Check back soon!
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredStates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No states found matching "{searchQuery}"</p>
            <Button
              variant="ghost"
              onClick={() => setSearchQuery('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                Why Regional Diets?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>Authentic Local Cuisine:</strong> Traditional dishes from your region</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>Easily Available Ingredients:</strong> Foods common in your local markets</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>Cultural Connection:</strong> Stay fit while enjoying familiar flavors</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>High Protein Focus:</strong> Each meal optimized for fitness goals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
