import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { 
  RotateCw, 
  Info,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { exerciseDatabase, Exercise, getRelatedExercisesByMuscle } from '../utils/exerciseMuscleDatabase';
import exampleImage from 'figma:asset/a72ea76144d069fc56114a7b235b3879b3e8b2c2.png';
import benchPressImage from 'figma:asset/9d594596acf29cebe918f79a6f54d011a4733fae.png';
import squatsImage from 'figma:asset/d54784bf34f25c7157617145c68dcdf6d2d7b53e.png';
import deadliftImage from 'figma:asset/a40bc557e9d2b6876b6cea64d4e50d89108e2b58.png';

interface MuscleAnatomyViewerProps {
  selectedExerciseId?: string;
  onExerciseChange?: (exerciseId: string) => void;
}

export default function MuscleAnatomyViewer({ 
  selectedExerciseId = 'barbell-bench-press',
  onExerciseChange 
}: MuscleAnatomyViewerProps) {
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [rotationAngle, setRotationAngle] = useState(0); // 0-345 degrees (24 angles)
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Get current exercise
  const currentExercise = exerciseDatabase.find(ex => ex.id === selectedExerciseId) || exerciseDatabase[0];

  // Get anatomy image based on exercise
  const getAnatomyImage = () => {
    const exerciseId = currentExercise.id;
    const exerciseNameLower = currentExercise.name.toLowerCase();
    
    // Match by ID or name for specific exercises with anatomy images
    if (exerciseId === 'barbell-bench-press' || exerciseNameLower.includes('bench press')) {
      return benchPressImage;
    } else if (exerciseId === 'squat' || exerciseNameLower.includes('squat')) {
      return squatsImage;
    } else if (exerciseId === 'deadlift' || exerciseNameLower.includes('deadlift')) {
      return deadliftImage;
    }
    
    return exampleImage; // Default fallback image for other exercises
  };

  // Sync view mode with exercise default
  useEffect(() => {
    setViewMode(currentExercise.defaultView);
  }, [currentExercise.defaultView]);

  // Handle drag to rotate
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartAngle.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX.current;
    const rotationSpeed = 0.5; // degrees per pixel
    let newAngle = dragStartAngle.current + (deltaX * rotationSpeed);
    
    // Normalize to 0-360 range
    newAngle = ((newAngle % 360) + 360) % 360;
    
    // Snap to nearest 15-degree increment (24 angles)
    const snappedAngle = Math.round(newAngle / 15) * 15;
    setRotationAngle(snappedAngle % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Rotate buttons
  const rotateForward = () => {
    setRotationAngle((prev) => (prev + 15) % 360);
  };

  const rotateBackward = () => {
    setRotationAngle((prev) => (prev - 15 + 360) % 360);
  };

  // Get display angle based on view mode
  const getDisplayRotation = () => {
    if (viewMode === 'back') {
      return rotationAngle + 180;
    }
    return rotationAngle;
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[720px,1fr] gap-8">
        {/* Left: 3D Viewer Card */}
        <Card className="bg-white shadow-xl border-2 border-gray-100">
          <CardContent className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl mb-2" style={{ fontWeight: 700 }}>
                  <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                    Muscle Anatomy
                  </span>
                </h2>
                <p className="text-gray-600">Interactive 360° Rotation</p>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Information"
                    >
                      <Info className="w-5 h-5 text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Drag left/right to rotate • Click Front/Back to switch view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* 3D Viewer Container */}
            <div 
              ref={viewerRef}
              className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden mb-6"
              style={{ 
                height: '400px',
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D Model Display */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div 
                  className="relative transition-transform duration-300 ease-out"
                  style={{
                    transform: `rotateY(${getDisplayRotation()}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Base Model Image */}
                  <img 
                    src={getAnatomyImage()} 
                    alt={`${currentExercise.name} - Muscle Anatomy`}
                    className="w-auto h-[350px] object-contain pointer-events-none select-none"
                    draggable={false}
                    style={{
                      filter: 'contrast(1.1) brightness(1.05)',
                    }}
                  />
                  
                  {/* Muscle Highlight Overlays - Now positioned based on muscle type */}
                  {currentExercise.muscles.map((muscle, index) => {
                    // Position highlights based on muscle type for better visibility
                    const getHighlightPosition = () => {
                      const muscleLower = muscle.name.toLowerCase();
                      
                      // Front view positioning
                      if (viewMode === 'front') {
                        if (muscleLower.includes('chest') || muscleLower.includes('pectoral')) {
                          return { top: '30%', left: '50%', width: '40%', height: '25%' };
                        }
                        if (muscleLower.includes('bicep')) {
                          return { top: '35%', left: '25%', width: '15%', height: '20%' };
                        }
                        if (muscleLower.includes('shoulder') || muscleLower.includes('deltoid')) {
                          return { top: '25%', left: '50%', width: '50%', height: '20%' };
                        }
                        if (muscleLower.includes('abs') || muscleLower.includes('core') || muscleLower.includes('rectus')) {
                          return { top: '45%', left: '50%', width: '30%', height: '30%' };
                        }
                        if (muscleLower.includes('quad')) {
                          return { top: '60%', left: '50%', width: '35%', height: '30%' };
                        }
                        if (muscleLower.includes('oblique')) {
                          return { top: '45%', left: '50%', width: '40%', height: '25%' };
                        }
                      }
                      
                      // Back view positioning
                      if (viewMode === 'back') {
                        if (muscleLower.includes('lat') || muscleLower.includes('back')) {
                          return { top: '30%', left: '50%', width: '45%', height: '35%' };
                        }
                        if (muscleLower.includes('tricep')) {
                          return { top: '35%', left: '75%', width: '15%', height: '20%' };
                        }
                        if (muscleLower.includes('glute')) {
                          return { top: '50%', left: '50%', width: '35%', height: '20%' };
                        }
                        if (muscleLower.includes('hamstring')) {
                          return { top: '65%', left: '50%', width: '35%', height: '25%' };
                        }
                        if (muscleLower.includes('calf') || muscleLower.includes('gastrocnemius')) {
                          return { top: '75%', left: '50%', width: '25%', height: '15%' };
                        }
                        if (muscleLower.includes('trap') || muscleLower.includes('rhomboid')) {
                          return { top: '25%', left: '50%', width: '40%', height: '25%' };
                        }
                      }
                      
                      // Default center position
                      return { top: '40%', left: '50%', width: '45%', height: '40%' };
                    };
                    
                    const position = getHighlightPosition();
                    
                    return (
                      <div
                        key={`${currentExercise.id}-${muscle.name}-${index}`}
                        className="absolute pointer-events-auto transition-all duration-300"
                        onMouseEnter={() => setHoveredMuscle(muscle.name)}
                        onMouseLeave={() => setHoveredMuscle(null)}
                        style={{
                          top: position.top,
                          left: position.left,
                          width: position.width,
                          height: position.height,
                          transform: 'translate(-50%, -50%)',
                          background: `radial-gradient(ellipse at center, ${muscle.color}60 0%, ${muscle.color}30 40%, transparent 70%)`,
                          opacity: 0.7,
                          borderRadius: '50%',
                          pointerEvents: 'auto',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Rotation Angle Indicator */}
                <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-200">
                  <span className="text-xs text-gray-600" style={{ fontWeight: 600 }}>
                    {rotationAngle}°
                  </span>
                </div>

                {/* View Mode Badge */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant="secondary"
                    className="text-sm px-3 py-1.5 bg-white border border-gray-200 shadow-md"
                  >
                    {viewMode === 'front' ? '👤 Front' : '🔄 Back'}
                  </Badge>
                </div>

                {/* Hovered Muscle Tooltip */}
                {hoveredMuscle && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl max-w-xs text-center">
                    <p className="text-xs" style={{ fontWeight: 600 }}>{hoveredMuscle}</p>
                  </div>
                )}
              </div>

              {/* Rotation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 border border-gray-200"
                onClick={rotateBackward}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 shadow-md rounded-full w-10 h-10 border border-gray-200"
                onClick={rotateForward}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* View Toggle Buttons */}
              <div className="flex gap-3">
                <Button
                  variant={viewMode === 'front' ? 'default' : 'outline'}
                  className="flex-1 h-12"
                  onClick={() => setViewMode('front')}
                >
                  Front View
                </Button>
                <Button
                  variant={viewMode === 'back' ? 'default' : 'outline'}
                  className="flex-1 h-12"
                  onClick={() => setViewMode('back')}
                >
                  Back View
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setRotationAngle(0)}
                >
                  <RotateCw className="w-5 h-5" />
                </Button>
              </div>

              {/* Rotation Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600" style={{ fontWeight: 600 }}>
                    Rotation Angle
                  </span>
                  <span className="text-sm text-gray-500">{rotationAngle}°</span>
                </div>
                <Slider
                  value={[rotationAngle]}
                  onValueChange={(values) => setRotationAngle(values[0])}
                  max={345}
                  step={15}
                  className="w-full"
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    Primary Muscle
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                  <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    Secondary Muscle
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    Stabilizer
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: Exercise Information */}
        <div className="space-y-6">
          {/* Exercise Selector */}
          <Card className="bg-gradient-to-br from-blue-50 to-orange-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <label className="block text-sm mb-3 text-gray-700" style={{ fontWeight: 600 }}>
                Select Exercise
              </label>
              <Select 
                value={selectedExerciseId} 
                onValueChange={(value) => onExerciseChange?.(value)}
              >
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {exerciseDatabase.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name} ({exercise.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Current Exercise Details */}
          <Card className="shadow-lg border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {currentExercise.category}
                  </Badge>
                  <h3 className="text-2xl mb-2" style={{ fontWeight: 700 }}>
                    {currentExercise.name}
                  </h3>
                  <p className="text-gray-600">{currentExercise.description}</p>
                </div>
              </div>

              {/* Muscle Breakdown */}
              <div className="space-y-4 mt-6">
                <h4 className="text-lg" style={{ fontWeight: 700 }}>Targeted Muscles</h4>
                
                {/* Primary Muscles */}
                <div>
                  <p className="text-sm text-gray-600 mb-2" style={{ fontWeight: 600 }}>
                    🔴 Primary Muscles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.muscles
                      .filter(m => m.type === 'primary')
                      .map((muscle, index) => (
                        <Badge 
                          key={index}
                          className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1"
                        >
                          {muscle.name}
                        </Badge>
                      ))}
                  </div>
                </div>

                {/* Secondary Muscles */}
                {currentExercise.muscles.some(m => m.type === 'secondary') && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2" style={{ fontWeight: 600 }}>
                      🟠 Secondary Muscles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentExercise.muscles
                        .filter(m => m.type === 'secondary')
                        .map((muscle, index) => (
                          <Badge 
                            key={index}
                            className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1"
                          >
                            {muscle.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {/* Stabilizer Muscles */}
                {currentExercise.muscles.some(m => m.type === 'stabilizer') && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2" style={{ fontWeight: 600 }}>
                      🟡 Stabilizer Muscles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentExercise.muscles
                        .filter(m => m.type === 'stabilizer')
                        .map((muscle, index) => (
                          <Badge 
                            key={index}
                            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1"
                          >
                            {muscle.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-blue-600 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <h4 className="text-xl mb-3" style={{ fontWeight: 700 }}>
                💡 Quick Tips
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Drag</strong> the model left or right to rotate 360°</li>
                <li>• <strong>Toggle</strong> between Front and Back views</li>
                <li>• <strong>Hover</strong> over highlighted muscles for related exercises</li>
                <li>• <strong>Use slider</strong> for precise angle control</li>
              </ul>
            </CardContent>
          </Card>

          {/* Exercise Categories Quick Access */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-6">
              <h4 className="text-lg mb-4" style={{ fontWeight: 700 }}>
                Browse by Category
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {['Chest / Push', 'Arms', 'Legs / Lower Body', 'Back / Pull', 'Shoulders', 'Core'].map((category) => {
                  const count = exerciseDatabase.filter(ex => ex.category === category).length;
                  return (
                    <Button
                      key={category}
                      variant="outline"
                      className="h-auto py-3 text-left justify-start flex-col items-start"
                      onClick={() => {
                        const firstInCategory = exerciseDatabase.find(ex => ex.category === category);
                        if (firstInCategory) {
                          onExerciseChange?.(firstInCategory.id);
                        }
                      }}
                    >
                      <span className="text-sm" style={{ fontWeight: 700 }}>{category}</span>
                      <span className="text-xs text-gray-500">{count} exercises</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
