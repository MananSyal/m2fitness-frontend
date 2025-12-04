import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StateSelectionHomePage from './components/StateSelectionHomePage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import GoalSelectionPage from './components/GoalSelectionPage';
import DashboardPage from './components/DashboardPage';
import WorkoutPlanPage from './components/WorkoutPlanPage';
import WorkoutDetailPage from './components/WorkoutDetailPage';
import ProgressPage from './components/ProgressPage';
import CommunityPage from './components/CommunityPage';
import ProfilePage from './components/ProfilePage';
import DietLandingPage from './components/DietLandingPage';
import DietSetupPage from './components/DietSetupPage';
import PersonalizedDietPage from './components/PersonalizedDietPage';
import BlogListPage from './components/BlogListPage';
import BlogDetailPage from './components/BlogDetailPage';
import ProteinCalculatorPage from './components/ProteinCalculatorPage';
import StateSelectionPage from './components/StateSelectionPage';
import GoalSetupPage from './components/GoalSetupPage';
import PlanRecommendationPage from './components/PlanRecommendationPage';
import PersonalizedDietPlanDetailPage from './components/PersonalizedDietPlanDetailPage';
import PersonalizedWorkoutPlanPage from './components/PersonalizedWorkoutPlanPage';
import CommunityPostDetailPage from './components/CommunityPostDetailPage';
import WorkoutExerciseDetailPage from './components/WorkoutExerciseDetailPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AuthSuccessRouter from './components/AuthSuccessRouter';
import NewDietPlanFlow from './components/NewDietPlanFlow';
import CreatePostPage from './components/CreatePostPage';
import PostSuccessPage from './components/PostSuccessPage';
import PushPullSplitPage from './components/PushPullSplitPage';
import DoubleMuscleSplitPage from './components/DoubleMuscleSplitPage';
import SingleMuscleSplitPage from './components/SingleMuscleSplitPage';
import MuscleAnatomyDemoPage from './components/MuscleAnatomyDemoPage';
import CountrySelectionPage from './components/CountrySelectionPage';
import CountryDietPlanPage from './components/CountryDietPlanPage';
import IndianStateSelectionPage from './components/IndianStateSelectionPage';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './utils/authContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Routes>
          <Route path="/" element={<StateSelectionHomePage />} />
          <Route path="/home-old" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth-success" element={<AuthSuccessRouter />} />
          <Route path="/goal-selection" element={<GoalSelectionPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workouts" element={<WorkoutPlanPage />} />
          <Route path="/workouts/push-pull-split" element={<PushPullSplitPage />} />
          <Route path="/workouts/double-muscle-split" element={<DoubleMuscleSplitPage />} />
          <Route path="/workouts/single-muscle-split" element={<SingleMuscleSplitPage />} />
          <Route path="/muscle-anatomy" element={<MuscleAnatomyDemoPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/create-post" element={<CreatePostPage />} />
          <Route path="/community/post-success" element={<PostSuccessPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/diet" element={<DietLandingPage />} />
          <Route path="/diet/setup" element={<DietSetupPage />} />
          <Route path="/diet/new-plan" element={<NewDietPlanFlow />} />
          <Route path="/diet/countries" element={<CountrySelectionPage />} />
          <Route path="/diet/country/:countryCode" element={<CountryDietPlanPage />} />
          <Route path="/diet/india/states" element={<IndianStateSelectionPage />} />
          <Route path="/diet/india/:state" element={<PersonalizedDietPlanDetailPage />} />
          <Route path="/diet/plan" element={<PersonalizedDietPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/protein-calculator" element={<ProteinCalculatorPage />} />
          <Route path="/state-selection" element={<StateSelectionPage />} />
          <Route path="/goal-setup" element={<GoalSetupPage />} />
          <Route path="/plan-recommendation" element={<PlanRecommendationPage />} />
          <Route path="/diet/personalized-plan" element={<PersonalizedDietPlanDetailPage />} />
          <Route path="/diet-plan/:state" element={<PersonalizedDietPlanDetailPage />} />
          <Route path="/workout/personalized-plan" element={<PersonalizedWorkoutPlanPage />} />
          <Route path="/workout/:slug" element={<WorkoutDetailPage />} />
          <Route path="/exercise/:exerciseSlug" element={<WorkoutExerciseDetailPage />} />
          <Route path="/community/post/:postId" element={<CommunityPostDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
      </AuthProvider>
    </Router>
  );
}
