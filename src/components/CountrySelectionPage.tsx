import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Globe, MapPin, ChevronRight, Utensils } from 'lucide-react';
import { countries } from '../utils/countryDietData';

export default function CountrySelectionPage() {
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleCountrySelect = (countryCode: string) => {
    if (countryCode === 'india') {
      // Navigate to state selection for India
      navigate('/diet/india/states');
    } else {
      // Navigate to country-specific diet plan
      navigate(`/diet/country/${countryCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 px-6 py-3 rounded-full mb-6">
            <Globe className="w-8 h-8 text-green-600" />
            <span className="text-xl text-green-700" style={{ fontWeight: 700 }}>
              Step 1: Choose Your Country
            </span>
          </div>
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            Select Your Country
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized diet plans based on your region's local food culture and nutritional balance
          </p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <MapPin className="w-4 h-4" />
          <span style={{ fontWeight: 600 }}>Country Selection</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Diet Plan</span>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card
              key={country.code}
              className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-2xl hover:scale-105 ${
                hoveredCountry === country.code
                  ? 'border-green-500 shadow-xl shadow-green-200/50'
                  : 'border-gray-200 hover:border-green-400'
              }`}
              onMouseEnter={() => setHoveredCountry(country.code)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountrySelect(country.code)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Flag */}
                  <div className="text-5xl flex-shrink-0">
                    {country.flag}
                  </div>

                  {/* Country Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                      {country.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {country.description}
                    </p>

                    {/* Special indicator for India */}
                    {country.code === 'india' && (
                      <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mb-3">
                        <MapPin className="w-4 h-4" />
                        <span style={{ fontWeight: 600 }}>31 State-Specific Diets Available</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      className={`w-full ${
                        country.code === 'india'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                          : 'bg-gradient-to-r from-green-600 to-green-500'
                      } hover:shadow-lg transition-all`}
                      size="sm"
                    >
                      <Utensils className="w-4 h-4 mr-2" />
                      {country.code === 'india' ? 'Select State' : 'View Diet Plan'}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 border-2 border-green-200">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl">
              <Utensils className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                What You'll Get
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>4 Meal Categories:</strong> Breakfast, Lunch, Snacks, and Dinner</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>4 Options Per Meal:</strong> Variety to suit your preferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>Local Food Culture:</strong> Authentic regional dishes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span><strong>Nutritional Balance:</strong> Protein-rich, calorie-counted meals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
