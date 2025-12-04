import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  Weight, 
  Ruler, 
  Calendar, 
  MapPin, 
  Target, 
  Leaf, 
  Drumstick, 
  Flame,
  Loader2,
  CheckCircle2,
  Mail,
  Lock as LockIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../utils/authContext';
import { toast } from 'sonner';

interface DietFormData {
  email: string;
  password: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
  country: string;
  state: string;
  goal: string;
  dietType: string;
  calorieTarget: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function NewDietPlanFlow() {
  const navigate = useNavigate();
  const { isAuthenticated, login, signup } = useAuth();
  const [currentStep, setCurrentStep] = useState(isAuthenticated ? 2 : 1);
  const [isLogin, setIsLogin] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState<DietFormData>({
    email: '',
    password: '',
    weight: '',
    height: '',
    age: '',
    gender: '',
    country: '',
    state: '',
    goal: '',
    dietType: '',
    calorieTarget: 2000,
  });

  const totalSteps = 6;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const updateFormData = (field: keyof DietFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(formData.email, formData.password);
      toast.success('Welcome back!');
    } else {
      signup(formData.email.split('@')[0], formData.email, formData.password);
      toast.success('Account created successfully!');
    }
    setCurrentStep(2);
  };

  const handleNextStep = () => {
    // Validation
    if (currentStep === 2) {
      if (!formData.weight || !formData.height || !formData.age || !formData.gender) {
        toast.error('Please fill in all personal information');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.country) {
        toast.error('Please select your country');
        return;
      }
      if (formData.country === 'India' && !formData.state) {
        toast.error('Please select your state');
        return;
      }
      if (!formData.goal) {
        toast.error('Please select your fitness goal');
        return;
      }
    }
    if (currentStep === 4) {
      if (!formData.dietType) {
        toast.error('Please select your diet preference');
        return;
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, isAuthenticated ? 2 : 1));
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    
    // Save user preferences
    localStorage.setItem('userCountry', formData.country);
    if (formData.country === 'India') {
      localStorage.setItem('userState', formData.state);
    }
    localStorage.setItem('userGoal', formData.goal);
    localStorage.setItem('dietPreference', formData.dietType);
    localStorage.setItem('calorieTarget', formData.calorieTarget.toString());
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('🎉 Your personalized diet plan is ready!');
      
      // Navigate based on country
      if (formData.country === 'India') {
        // Navigate to Indian state-specific plan
        const stateSlug = formData.state.toLowerCase().replace(/\s+/g, '-');
        navigate(`/diet/india/${stateSlug}`);
      } else {
        // Navigate to country-specific plan
        const countryCode = formData.country.toLowerCase();
        navigate(`/diet/country/${countryCode}`);
      }
    }, 2500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                {isLogin ? 'Welcome Back!' : 'Create Your Account'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to continue your fitness journey' : 'Start your personalized nutrition plan'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <LockIcon className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-green-600 hover:underline"
                >
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                </button>
              </div>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                Tell Us About Yourself
              </h2>
              <p className="text-gray-600">
                We need some basic information to personalize your plan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-2 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <Label className="flex items-center gap-2 mb-3">
                    <Weight className="w-5 h-5 text-blue-500" />
                    Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    placeholder="70"
                    value={formData.weight}
                    onChange={(e) => updateFormData('weight', e.target.value)}
                    className="h-12 text-base"
                  />
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <Label className="flex items-center gap-2 mb-3">
                    <Ruler className="w-5 h-5 text-blue-500" />
                    Height (cm)
                  </Label>
                  <Input
                    type="number"
                    placeholder="170"
                    value={formData.height}
                    onChange={(e) => updateFormData('height', e.target.value)}
                    className="h-12 text-base"
                  />
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <Label className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Age (years)
                  </Label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    className="h-12 text-base"
                  />
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-400 transition-colors">
                <CardContent className="p-6">
                  <Label className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-blue-500" />
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                Location & Fitness Goal
              </h2>
              <p className="text-gray-600">
                We'll match your diet to regional cuisine and goals
              </p>
            </div>

            {/* Country Selection */}
            <Card className="border-2 hover:border-purple-400 transition-colors">
              <CardContent className="p-6">
                <Label className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  Your Country
                </Label>
                <Select value={formData.country} onValueChange={(value) => {
                  updateFormData('country', value);
                  // Reset state when country changes
                  if (value !== 'India') {
                    updateFormData('state', '');
                  }
                }}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">🇮🇳 India</SelectItem>
                    <SelectItem value="USA">🇺🇸 United States</SelectItem>
                    <SelectItem value="UK">🇬🇧 United Kingdom</SelectItem>
                    <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                    <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                    <SelectItem value="Japan">🇯🇵 Japan</SelectItem>
                    <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                    <SelectItem value="France">🇫🇷 France</SelectItem>
                    <SelectItem value="Brazil">🇧🇷 Brazil</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* State Selection - Only for India */}
            {formData.country === 'India' && (
              <Card className="border-2 hover:border-purple-400 transition-colors">
                <CardContent className="p-6">
                  <Label className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    Your State
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Fitness Goal */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-500" />
                Fitness Goal
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'lose-weight', label: 'Lose Weight', icon: '🔥', color: 'orange' },
                  { value: 'stay-fit', label: 'Stay Fit', icon: '⚡', color: 'blue' },
                  { value: 'gain-muscle', label: 'Gain Muscle', icon: '💪', color: 'green' },
                ].map(goal => (
                  <Card
                    key={goal.value}
                    className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                      formData.goal === goal.value 
                        ? `border-${goal.color}-500 bg-${goal.color}-50` 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => updateFormData('goal', goal.value)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-2">{goal.icon}</div>
                      <p style={{ fontWeight: 600 }}>{goal.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                Diet Preference
              </h2>
              <p className="text-gray-600">
                Choose your dietary preference for meal recommendations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card
                className={`cursor-pointer border-2 transition-all hover:shadow-xl ${
                  formData.dietType === 'vegetarian' 
                    ? 'border-green-500 bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => updateFormData('dietType', 'vegetarian')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>Vegetarian</h3>
                  <p className="text-gray-600">Plant-based meals only</p>
                  {formData.dietType === 'vegetarian' && (
                    <div className="mt-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer border-2 transition-all hover:shadow-xl ${
                  formData.dietType === 'non-vegetarian' 
                    ? 'border-orange-500 bg-orange-50 shadow-lg' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => updateFormData('dietType', 'non-vegetarian')}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Drumstick className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl mb-2" style={{ fontWeight: 700 }}>Non-Vegetarian</h3>
                  <p className="text-gray-600">Includes meat & fish</p>
                  {formData.dietType === 'non-vegetarian' && (
                    <div className="mt-4">
                      <CheckCircle2 className="w-8 h-8 text-orange-600 mx-auto" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                Daily Calorie Target
              </h2>
              <p className="text-gray-600">
                How many calories do you want to consume daily?
              </p>
            </div>

            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4" style={{ fontWeight: 700, color: '#ea580c' }}>
                    {formData.calorieTarget}
                  </div>
                  <p className="text-xl text-gray-600">calories per day</p>
                </div>

                <div className="space-y-6">
                  <Slider
                    value={[formData.calorieTarget]}
                    onValueChange={(value) => updateFormData('calorieTarget', value[0])}
                    min={1200}
                    max={3500}
                    step={50}
                    className="w-full"
                  />

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1200 kcal</span>
                    <span>3500 kcal</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8">
                    {[
                      { value: 1500, label: 'Weight Loss' },
                      { value: 2000, label: 'Maintenance' },
                      { value: 2500, label: 'Muscle Gain' },
                    ].map(preset => (
                      <Button
                        key={preset.value}
                        variant="outline"
                        onClick={() => updateFormData('calorieTarget', preset.value)}
                        className="h-auto py-3"
                      >
                        <div className="text-center">
                          <div style={{ fontWeight: 700 }}>{preset.value}</div>
                          <div className="text-xs text-gray-600">{preset.label}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                Ready to Generate Your Plan!
              </h2>
              <p className="text-gray-600">
                We have all the information we need
              </p>
            </div>

            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-green-50">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Country:</span>
                    <span style={{ fontWeight: 600 }}>{formData.country}</span>
                  </div>
                  {formData.country === 'India' && formData.state && (
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-gray-600">State:</span>
                      <span style={{ fontWeight: 600 }}>{formData.state}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Goal:</span>
                    <span style={{ fontWeight: 600 }}>{formData.goal.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Diet Type:</span>
                    <span style={{ fontWeight: 600 }}>{formData.dietType}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Daily Calories:</span>
                    <span style={{ fontWeight: 600 }}>{formData.calorieTarget} kcal</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Weight / Height:</span>
                    <span style={{ fontWeight: 600 }}>{formData.weight}kg / {formData.height}cm</span>
                  </div>
                </div>

                <Button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="w-full h-14 mt-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Your Plan...
                    </>
                  ) : (
                    <>
                      Generate My Diet Plan
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {isGenerating && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Creating personalized meals...</p>
                    <Progress value={66} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg"></div>
            <span className="text-2xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
          </div>
          <h1 className="text-4xl mb-2" style={{ fontWeight: 700 }}>
            Personalized Diet Plan
          </h1>
          <p className="text-gray-600">Step-by-step nutrition planning</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm" style={{ fontWeight: 600, color: '#10b981' }}>
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step Content */}
        <Card className="shadow-2xl border-2 mb-6">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep > 1 && currentStep < 6 && (
          <div className="flex gap-4">
            <Button
              onClick={handlePrevStep}
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={isGenerating}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              size="lg"
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Next Step
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 text-sm hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
