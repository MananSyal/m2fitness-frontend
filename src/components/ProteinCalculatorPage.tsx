import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Home, User, Plus, RotateCcw, Save, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FoodEntry {
  id: number;
  name: string;
  quantity: number;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

interface FoodDatabase {
  [key: string]: {
    protein: number; // per 100g
    carbs: number;
    fats: number;
    calories: number;
  };
}

export default function ProteinCalculatorPage() {
  const navigate = useNavigate();
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  // Food database (per 100g)
  const foodDatabase: FoodDatabase = {
    'Paneer': { protein: 18, carbs: 4, fats: 20, calories: 265 },
    'Chicken Breast': { protein: 31, carbs: 0, fats: 2, calories: 165 },
    'Eggs (whole)': { protein: 13, carbs: 1, fats: 11, calories: 155 },
    'Dal (Toor)': { protein: 22, carbs: 60, fats: 1, calories: 335 },
    'Moong Dal': { protein: 24, carbs: 59, fats: 1, calories: 347 },
    'Chickpeas (Chole)': { protein: 19, carbs: 61, fats: 6, calories: 364 },
    'Rajma (Kidney Beans)': { protein: 22, carbs: 60, fats: 1, calories: 333 },
    'White Rice': { protein: 2, carbs: 28, fats: 0, calories: 130 },
    'Brown Rice': { protein: 3, carbs: 23, fats: 1, calories: 111 },
    'Roti (Wheat)': { protein: 9, carbs: 71, fats: 4, calories: 297 },
    'Oats': { protein: 13, carbs: 67, fats: 7, calories: 389 },
    'Fish': { protein: 22, carbs: 0, fats: 3, calories: 120 },
    'Mutton': { protein: 25, carbs: 0, fats: 21, calories: 294 },
    'Soya Chunks': { protein: 52, carbs: 33, fats: 0, calories: 345 },
    'Tofu': { protein: 8, carbs: 2, fats: 5, calories: 76 },
    'Milk (full cream)': { protein: 3, carbs: 5, fats: 4, calories: 61 },
    'Curd (yogurt)': { protein: 3, carbs: 4, fats: 4, calories: 60 },
    'Peanuts': { protein: 26, carbs: 16, fats: 49, calories: 567 },
    'Almonds': { protein: 21, carbs: 22, fats: 50, calories: 579 },
    'Banana': { protein: 1, carbs: 23, fats: 0, calories: 89 },
    'Apple': { protein: 0, carbs: 14, fats: 0, calories: 52 },
    'Potato': { protein: 2, carbs: 17, fats: 0, calories: 77 },
    'Spinach (Palak)': { protein: 3, carbs: 4, fats: 0, calories: 23 },
    'Broccoli': { protein: 3, carbs: 7, fats: 0, calories: 34 },
    'Sweet Potato': { protein: 2, carbs: 20, fats: 0, calories: 86 },
    'Quinoa': { protein: 14, carbs: 64, fats: 6, calories: 368 },
    'Bread (white)': { protein: 9, carbs: 49, fats: 3, calories: 265 },
    'Butter': { protein: 1, carbs: 0, fats: 81, calories: 717 },
    'Ghee': { protein: 0, carbs: 0, fats: 100, calories: 900 },
    'Olive Oil': { protein: 0, carbs: 0, fats: 100, calories: 884 },
  };

  const addEntry = () => {
    if (!selectedFood || !quantity || parseFloat(quantity) <= 0) {
      toast.error('Please select a food item and enter a valid quantity');
      return;
    }

    const foodData = foodDatabase[selectedFood];
    const quantityNum = parseFloat(quantity);
    const multiplier = quantityNum / 100;

    const newEntry: FoodEntry = {
      id: Date.now(),
      name: selectedFood,
      quantity: quantityNum,
      protein: Math.round(foodData.protein * multiplier * 10) / 10,
      carbs: Math.round(foodData.carbs * multiplier * 10) / 10,
      fats: Math.round(foodData.fats * multiplier * 10) / 10,
      calories: Math.round(foodData.calories * multiplier),
    };

    setEntries([...entries, newEntry]);
    setSelectedFood('');
    setQuantity('');
    toast.success(`Added ${selectedFood} to your meal tracker!`);
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Item removed');
  };

  const resetTable = () => {
    setEntries([]);
    toast.success('Table reset');
  };

  const saveDiet = () => {
    if (entries.length === 0) {
      toast.error('Add some items first!');
      return;
    }
    toast.success('Daily diet saved! 💾');
  };

  // Calculate totals
  const totals = entries.reduce(
    (acc, entry) => ({
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fats: acc.fats + entry.fats,
      calories: acc.calories + entry.calories,
    }),
    { protein: 0, carbs: 0, fats: 0, calories: 0 }
  );

  // Calculate percentages for visual summary
  const totalMacros = totals.protein * 4 + totals.carbs * 4 + totals.fats * 9;
  const proteinPercent = totalMacros > 0 ? Math.round((totals.protein * 4 / totalMacros) * 100) : 0;
  const carbsPercent = totalMacros > 0 ? Math.round((totals.carbs * 4 / totalMacros) * 100) : 0;
  const fatsPercent = totalMacros > 0 ? Math.round((totals.fats * 9 / totalMacros) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
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
              <Link to="/diet/new-plan">
                <Button variant="ghost" size="sm" className="bg-green-50 text-green-700 hover:bg-green-100">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  View Diet Plans
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
              <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Calculate Your Protein & Nutrition Intake 🍛
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Track your meals, calculate macros, and own your desi diet — your way.
            </p>
          </div>

          {/* Input Form Section */}
          <Card className="mb-8 border-2 border-green-200">
            <CardContent className="p-8">
              <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Add Your Food Items</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Food Item Dropdown */}
                <div>
                  <label className="block mb-2 text-sm" style={{ fontWeight: 600 }}>Food Item</label>
                  <Select value={selectedFood} onValueChange={setSelectedFood}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue placeholder="Select food..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(foodDatabase).sort().map((food) => (
                        <SelectItem key={food} value={food}>
                          {food}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity Input */}
                <div>
                  <label className="block mb-2 text-sm" style={{ fontWeight: 600 }}>Quantity (grams)</label>
                  <Input
                    type="number"
                    placeholder="e.g., 100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="h-12 border-2"
                    min="1"
                  />
                </div>

                {/* Add Button */}
                <div className="flex items-end">
                  <Button
                    onClick={addEntry}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Table */}
          {entries.length > 0 && (
            <>
              <Card className="mb-8">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl" style={{ fontWeight: 700 }}>Your Daily Intake</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={resetTable}
                        className="hover:bg-red-50 hover:border-red-300"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                      <Button
                        onClick={saveDiet}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Diet
                      </Button>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b-2">
                          <th className="text-left p-4" style={{ fontWeight: 600 }}>Food Item</th>
                          <th className="text-right p-4" style={{ fontWeight: 600 }}>Quantity (g)</th>
                          <th className="text-right p-4" style={{ fontWeight: 600 }}>Protein (g)</th>
                          <th className="text-right p-4" style={{ fontWeight: 600 }}>Carbs (g)</th>
                          <th className="text-right p-4" style={{ fontWeight: 600 }}>Fats (g)</th>
                          <th className="text-right p-4" style={{ fontWeight: 600 }}>Calories</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((entry) => (
                          <tr key={entry.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-4" style={{ fontWeight: 600 }}>{entry.name}</td>
                            <td className="text-right p-4 text-gray-600">{entry.quantity}</td>
                            <td className="text-right p-4 text-green-600" style={{ fontWeight: 600 }}>{entry.protein}</td>
                            <td className="text-right p-4 text-blue-600" style={{ fontWeight: 600 }}>{entry.carbs}</td>
                            <td className="text-right p-4 text-orange-600" style={{ fontWeight: 600 }}>{entry.fats}</td>
                            <td className="text-right p-4 text-purple-600" style={{ fontWeight: 600 }}>{entry.calories}</td>
                            <td className="p-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEntry(entry.id)}
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                        {/* Totals Row */}
                        <tr className="bg-gradient-to-r from-green-50 to-orange-50 border-t-2">
                          <td className="p-4 text-lg" style={{ fontWeight: 700 }}>TOTALS</td>
                          <td className="text-right p-4"></td>
                          <td className="text-right p-4 text-green-700 text-lg" style={{ fontWeight: 700 }}>
                            {Math.round(totals.protein * 10) / 10} g
                          </td>
                          <td className="text-right p-4 text-blue-700 text-lg" style={{ fontWeight: 700 }}>
                            {Math.round(totals.carbs * 10) / 10} g
                          </td>
                          <td className="text-right p-4 text-orange-700 text-lg" style={{ fontWeight: 700 }}>
                            {Math.round(totals.fats * 10) / 10} g
                          </td>
                          <td className="text-right p-4 text-purple-700 text-lg" style={{ fontWeight: 700 }}>
                            {totals.calories} kcal
                          </td>
                          <td className="p-4"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Visual Summary */}
              <Card className="mb-8 bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="p-8">
                  <h2 className="text-2xl mb-6 text-center" style={{ fontWeight: 700 }}>
                    Your Day's Macro Split 📊
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Protein */}
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white">
                        <div>
                          <div className="text-3xl" style={{ fontWeight: 700 }}>{proteinPercent}%</div>
                          <div className="text-sm">Protein</div>
                        </div>
                      </div>
                      <p className="text-gray-600">{Math.round(totals.protein * 10) / 10}g</p>
                    </div>

                    {/* Carbs */}
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <div>
                          <div className="text-3xl" style={{ fontWeight: 700 }}>{carbsPercent}%</div>
                          <div className="text-sm">Carbs</div>
                        </div>
                      </div>
                      <p className="text-gray-600">{Math.round(totals.carbs * 10) / 10}g</p>
                    </div>

                    {/* Fats */}
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white">
                        <div>
                          <div className="text-3xl" style={{ fontWeight: 700 }}>{fatsPercent}%</div>
                          <div className="text-sm">Fats</div>
                        </div>
                      </div>
                      <p className="text-gray-600">{Math.round(totals.fats * 10) / 10}g</p>
                    </div>
                  </div>

                  {/* Bar Chart Visual */}
                  <div className="max-w-2xl mx-auto">
                    <div className="h-16 flex rounded-lg overflow-hidden shadow-lg">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white transition-all duration-500"
                        style={{ width: `${proteinPercent}%` }}
                      >
                        {proteinPercent > 10 && <span className="text-sm" style={{ fontWeight: 600 }}>Protein</span>}
                      </div>
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white transition-all duration-500"
                        style={{ width: `${carbsPercent}%` }}
                      >
                        {carbsPercent > 10 && <span className="text-sm" style={{ fontWeight: 600 }}>Carbs</span>}
                      </div>
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white transition-all duration-500"
                        style={{ width: `${fatsPercent}%` }}
                      >
                        {fatsPercent > 10 && <span className="text-sm" style={{ fontWeight: 600 }}>Fats</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Motivational Section */}
          <Card className="bg-gradient-to-r from-green-500 via-blue-500 to-orange-500 text-white">
            <CardContent className="p-12 text-center">
              <p className="text-3xl mb-2 italic" style={{ fontWeight: 600 }}>
                "Desi food. Global gains."
              </p>
              <p className="text-2xl" style={{ fontWeight: 600 }}>
                Ghar ka khana, gym ke results. 💪
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
          </div>
          <p className="text-gray-400">&copy; 2025 M2Fitness — Version 14.1. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
