import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Dumbbell, Activity } from 'lucide-react';
import MuscleAnatomyViewer from './MuscleAnatomyViewer';

export default function MuscleAnatomyDemoPage() {
  const navigate = useNavigate();
  const [selectedExerciseId, setSelectedExerciseId] = useState('barbell-bench-press');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-orange-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl" style={{ fontWeight: 700 }}>
                    3D Muscle Anatomy
                  </h1>
                  <p className="text-xs text-gray-600">Interactive Exercise Guide</p>
                </div>
              </div>
            </div>
            <Button className="gap-2">
              <Dumbbell className="w-4 h-4" />
              Start Workout
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4" style={{ fontWeight: 700 }}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Interactive 3D Muscle Anatomy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore every muscle group with our realistic 3D rotating anatomy viewer. 
            Select any exercise to see exactly which muscles you're targeting.
          </p>
        </div>

        {/* Main Viewer */}
        <MuscleAnatomyViewer 
          selectedExerciseId={selectedExerciseId}
          onExerciseChange={setSelectedExerciseId}
        />

        {/* Educational Content */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              Targeted Training
            </h3>
            <p className="text-gray-600">
              Understand exactly which muscles each exercise works to optimize your training program and achieve better results.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-orange-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              360° Rotation
            </h3>
            <p className="text-gray-600">
              View the human anatomy from every angle with smooth drag-to-rotate interaction and precise angle control.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-100">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              Exercise Database
            </h3>
            <p className="text-gray-600">
              Access our comprehensive database of 30+ exercises across all major muscle groups with detailed muscle mapping.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-10 text-white">
          <h3 className="text-3xl mb-6 text-center" style={{ fontWeight: 700 }}>
            Technical Specifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl mb-2" style={{ fontWeight: 700 }}>24</p>
              <p className="text-gray-400">Rotation Angles</p>
              <p className="text-xs text-gray-500 mt-1">15° increments</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2" style={{ fontWeight: 700 }}>30+</p>
              <p className="text-gray-400">Exercises</p>
              <p className="text-xs text-gray-500 mt-1">All major groups</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2" style={{ fontWeight: 700 }}>2</p>
              <p className="text-gray-400">View Modes</p>
              <p className="text-xs text-gray-500 mt-1">Front & Back</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2" style={{ fontWeight: 700 }}>3</p>
              <p className="text-gray-400">Muscle Types</p>
              <p className="text-xs text-gray-500 mt-1">Primary, Secondary, Stabilizer</p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="mt-16 bg-white rounded-2xl p-10 shadow-xl border-2 border-gray-100">
          <h3 className="text-3xl mb-8 text-center" style={{ fontWeight: 700 }}>
            How to Use the Viewer
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  1
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Select an Exercise</h4>
                  <p className="text-gray-600">Choose from our comprehensive exercise database or browse by muscle group category.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  2
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Rotate the Model</h4>
                  <p className="text-gray-600">Click and drag left or right to rotate 360°, or use the slider for precise angle control.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  3
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Toggle Views</h4>
                  <p className="text-gray-600">Switch between Front and Back views to see all targeted muscle groups from every angle.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  4
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Hover Over Muscles</h4>
                  <p className="text-gray-600">Hover over highlighted muscle areas to see related exercises that target the same muscles.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  5
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Study Muscle Groups</h4>
                  <p className="text-gray-600">Review the color-coded muscle breakdown: Red (Primary), Orange (Secondary), Yellow (Stabilizer).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0" style={{ fontWeight: 700 }}>
                  6
                </div>
                <div>
                  <h4 className="text-lg mb-2" style={{ fontWeight: 700 }}>Plan Your Workout</h4>
                  <p className="text-gray-600">Use the muscle knowledge to create balanced workout programs that target all desired areas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl mb-4 text-white" style={{ fontWeight: 700 }}>
            Ready to Start Training?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Use your new anatomy knowledge to build the perfect workout plan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/workout-plans')}
            >
              <Dumbbell className="w-5 h-5 mr-2" />
              Browse Workout Plans
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
