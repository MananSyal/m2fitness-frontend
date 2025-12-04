import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface AnimatedExerciseDemoProps {
  exerciseName: string;
  primaryMuscles: string[];
  onClose: () => void;
}

// Map exercises to their animation types
const getExerciseAnimation = (exerciseName: string) => {
  const name = exerciseName.toLowerCase();
  
  if (name.includes('bench press') || name.includes('chest press')) return 'benchPress';
  if (name.includes('squat')) return 'squat';
  if (name.includes('deadlift')) return 'deadlift';
  if (name.includes('overhead press') || name.includes('shoulder press')) return 'overheadPress';
  if (name.includes('bicep curl')) return 'bicepCurl';
  if (name.includes('row')) return 'row';
  if (name.includes('pull-up') || name.includes('chin-up')) return 'pullUp';
  if (name.includes('lunge')) return 'lunge';
  if (name.includes('push-up')) return 'pushUp';
  if (name.includes('plank')) return 'plank';
  
  return 'benchPress'; // default
};

// Map muscles to their regions for highlighting
const getMuscleRegions = (muscles: string[]) => {
  const regions = {
    chest: false,
    shoulders: false,
    triceps: false,
    biceps: false,
    back: false,
    lats: false,
    abs: false,
    quads: false,
    glutes: false,
    hamstrings: false,
    calves: false,
  };

  muscles.forEach(muscle => {
    const m = muscle.toLowerCase();
    if (m.includes('pectoral') || m.includes('chest')) regions.chest = true;
    if (m.includes('deltoid') || m.includes('shoulder')) regions.shoulders = true;
    if (m.includes('tricep')) regions.triceps = true;
    if (m.includes('bicep')) regions.biceps = true;
    if (m.includes('trapezius') || m.includes('rhomboid')) regions.back = true;
    if (m.includes('latissimus') || m.includes('lats')) regions.lats = true;
    if (m.includes('abdominis') || m.includes('abs') || m.includes('core')) regions.abs = true;
    if (m.includes('quadriceps') || m.includes('quads')) regions.quads = true;
    if (m.includes('gluteus') || m.includes('glutes')) regions.glutes = true;
    if (m.includes('hamstring')) regions.hamstrings = true;
    if (m.includes('calves') || m.includes('gastrocnemius')) regions.calves = true;
  });

  return regions;
};

export default function AnimatedExerciseDemo({ 
  exerciseName, 
  primaryMuscles,
  onClose 
}: AnimatedExerciseDemoProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [phase, setPhase] = useState<'eccentric' | 'concentric'>('eccentric');
  const [progress, setProgress] = useState(0);
  
  const animationType = getExerciseAnimation(exerciseName);
  const activeRegions = getMuscleRegions(primaryMuscles);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5;
        
        if (newProgress >= 100) {
          setPhase(p => p === 'eccentric' ? 'concentric' : 'eccentric');
          return 0;
        }
        
        return newProgress;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setProgress(0);
    setPhase('eccentric');
    setIsPlaying(false);
  };

  // Calculate muscle activation intensity based on movement phase
  const getMuscleIntensity = () => {
    const t = progress / 100;
    // Higher intensity during concentric (lifting) phase with smooth transitions
    if (phase === 'concentric') {
      return 0.7 + (Math.sin(t * Math.PI) * 0.3); // 70% to 100%
    } else {
      return 0.5 + (Math.sin(t * Math.PI) * 0.2); // 50% to 70%
    }
  };

  const intensity = getMuscleIntensity();

  // Animation configurations for different exercises
  const getAnimationConfig = () => {
    const t = progress / 100;
    const easeInOut = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    switch (animationType) {
      case 'benchPress':
        return {
          // Barbell position
          barY: phase === 'eccentric' ? 170 + easeInOut * 50 : 220 - easeInOut * 50,
          // Elbow angle
          elbowAngle: phase === 'eccentric' ? 160 - easeInOut * 70 : 90 + easeInOut * 70,
          // Shoulder position
          shoulderY: 170,
          hipY: 280,
          kneeAngle: 180,
          spineAngle: 0,
          viewType: 'side',
        };
      
      case 'squat':
        return {
          barY: 100,
          elbowAngle: 90,
          shoulderY: 120,
          // Hip drops during squat
          hipY: phase === 'eccentric' ? 280 + easeInOut * 80 : 360 - easeInOut * 80,
          // Knee angle changes during squat
          kneeAngle: phase === 'eccentric' ? 180 - easeInOut * 90 : 90 + easeInOut * 90,
          spineAngle: phase === 'eccentric' ? easeInOut * 15 : 15 - easeInOut * 15,
          viewType: 'side',
        };
      
      case 'deadlift':
        return {
          barY: phase === 'eccentric' ? 480 - easeInOut * 180 : 300 + easeInOut * 180,
          elbowAngle: 180,
          shoulderY: phase === 'eccentric' ? 120 + easeInOut * 100 : 220 - easeInOut * 100,
          hipY: phase === 'eccentric' ? 280 + easeInOut * 100 : 380 - easeInOut * 100,
          kneeAngle: phase === 'eccentric' ? 180 - easeInOut * 40 : 140 + easeInOut * 40,
          spineAngle: phase === 'eccentric' ? 45 - easeInOut * 45 : 0 + easeInOut * 45,
          viewType: 'side',
        };
      
      default:
        return {
          barY: 200,
          elbowAngle: 90,
          shoulderY: 170,
          hipY: 280,
          kneeAngle: 180,
          spineAngle: 0,
          viewType: 'side',
        };
    }
  };

  const config = getAnimationConfig();

  // Render realistic human body
  const renderHumanBody = () => {
    const headCenterX = 250;
    const headCenterY = 90;
    const neckY = 110;
    const shoulderY = config.shoulderY;
    const hipY = config.hipY;
    const shoulderWidth = 80;
    
    // Calculate limb positions based on angles
    const kneeY = hipY + 100;
    const ankleY = kneeY + 110;
    
    // For bench press - lying down position
    if (animationType === 'benchPress') {
      const elbowX = 250 - 60;
      const elbowY = shoulderY + 40;
      const handY = config.barY;
      
      return (
        <g>
          {/* Head */}
          <ellipse cx={headCenterX} cy={headCenterY} rx="32" ry="38" fill="#8B7355" opacity="0.85" />
          <ellipse cx={headCenterX} cy={headCenterY - 5} rx="28" ry="32" fill="#A0826D" opacity="0.7" />
          
          {/* Neck */}
          <rect x={headCenterX - 15} y={neckY} width="30" height="35" rx="8" fill="#8B7355" opacity="0.8" />
          
          {/* Torso */}
          <ellipse cx={headCenterX} cy={shoulderY + 60} rx="70" ry="85" fill="#7D6E5D" opacity="0.6" />
          
          {/* CHEST MUSCLES */}
          {activeRegions.chest && (
            <g filter="url(#muscleGlow)">
              <ellipse cx={220} cy={shoulderY + 40} rx="38" ry="48" fill="url(#activeMuscle)" opacity={intensity} />
              <ellipse cx={280} cy={shoulderY + 40} rx="38" ry="48" fill="url(#activeMuscle)" opacity={intensity} />
              {/* Muscle definition lines */}
              <path d={`M 210 ${shoulderY + 20} Q 220 ${shoulderY + 45} 215 ${shoulderY + 70}`} stroke="#991b1b" strokeWidth="2.5" opacity={intensity * 0.7} fill="none"/>
              <path d={`M 290 ${shoulderY + 20} Q 280 ${shoulderY + 45} 285 ${shoulderY + 70}`} stroke="#991b1b" strokeWidth="2.5" opacity={intensity * 0.7} fill="none"/>
              <line x1="250" y1={shoulderY + 25} x2="250" y2={shoulderY + 75} stroke="#991b1b" strokeWidth="2" opacity={intensity * 0.6} />
            </g>
          )}
          
          {/* ABS */}
          {activeRegions.abs && (
            <g filter="url(#muscleGlow)">
              <rect x="215" y={shoulderY + 85} width="70" height="90" rx="15" fill="url(#activeMuscle)" opacity={intensity * 0.8} />
              {/* Six pack lines */}
              <line x1="250" y1={shoulderY + 90} x2="250" y2={shoulderY + 165} stroke="#7f1d1d" strokeWidth="2.5" opacity={intensity * 0.7} />
              <line x1="218" y1={shoulderY + 110} x2="282" y2={shoulderY + 110} stroke="#7f1d1d" strokeWidth="2" opacity={intensity * 0.6} />
              <line x1="218" y1={shoulderY + 130} x2="282" y2={shoulderY + 130} stroke="#7f1d1d" strokeWidth="2" opacity={intensity * 0.6} />
              <line x1="218" y1={shoulderY + 150} x2="282" y2={shoulderY + 150} stroke="#7f1d1d" strokeWidth="2" opacity={intensity * 0.6} />
            </g>
          )}
          
          {/* SHOULDERS */}
          {activeRegions.shoulders && (
            <g filter="url(#muscleGlow)">
              <ellipse cx={185} cy={shoulderY + 20} rx="28" ry="35" fill="url(#activeMuscle)" opacity={intensity * 0.9} />
              <ellipse cx={315} cy={shoulderY + 20} rx="28" ry="35" fill="url(#activeMuscle)" opacity={intensity * 0.9} />
            </g>
          )}
          
          {/* Left Arm */}
          <g>
            {/* Upper arm */}
            <ellipse cx={180} cy={(shoulderY + 30 + elbowY) / 2} rx="20" ry="50" fill="#8B7355" opacity="0.8" />
            
            {/* Forearm */}
            <ellipse cx={elbowX + 5} cy={(elbowY + handY) / 2} rx="16" ry="48" fill="#8B7355" opacity="0.8" />
            
            {/* TRICEPS */}
            {activeRegions.triceps && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={175} cy={(shoulderY + 30 + elbowY) / 2 - 10} rx="18" ry="42" fill="url(#activeMuscle)" opacity={intensity * 0.85} />
              </g>
            )}
            
            {/* Elbow joint */}
            <circle cx={elbowX} cy={elbowY} r="14" fill="#6B5D4F" />
            
            {/* Hand */}
            <ellipse cx={elbowX} cy={handY} rx="12" ry="16" fill="#8B7355" opacity="0.9" />
          </g>
          
          {/* Right Arm - mirrored */}
          <g>
            {/* Upper arm */}
            <ellipse cx={320} cy={(shoulderY + 30 + elbowY) / 2} rx="20" ry="50" fill="#8B7355" opacity="0.8" />
            
            {/* Forearm */}
            <ellipse cx={250 + 60 - 5} cy={(elbowY + handY) / 2} rx="16" ry="48" fill="#8B7355" opacity="0.8" />
            
            {/* TRICEPS */}
            {activeRegions.triceps && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={325} cy={(shoulderY + 30 + elbowY) / 2 - 10} rx="18" ry="42" fill="url(#activeMuscle)" opacity={intensity * 0.85} />
              </g>
            )}
            
            {/* Elbow joint */}
            <circle cx={250 + 60} cy={elbowY} r="14" fill="#6B5D4F" />
            
            {/* Hand */}
            <ellipse cx={250 + 60} cy={handY} rx="12" ry="16" fill="#8B7355" opacity="0.9" />
          </g>
          
          {/* Hips/Pelvis */}
          <ellipse cx={headCenterX} cy={hipY} rx="65" ry="50" fill="#7D6E5D" opacity="0.6" />
          
          {/* Legs */}
          <g>
            {/* Left Thigh */}
            <ellipse cx={230} cy={hipY + 60} rx="26" ry="65" fill="#8B7355" opacity="0.7" />
            
            {/* Left Calf */}
            <ellipse cx={225} cy={hipY + 165} rx="22" ry="58" fill="#8B7355" opacity="0.7" />
            
            {/* Right Thigh */}
            <ellipse cx={270} cy={hipY + 60} rx="26" ry="65" fill="#8B7355" opacity="0.7" />
            
            {/* Right Calf */}
            <ellipse cx={275} cy={hipY + 165} rx="22" ry="58" fill="#8B7355" opacity="0.7" />
            
            {/* Knee joints */}
            <circle cx={230} cy={hipY + 120} r="16" fill="#6B5D4F" />
            <circle cx={270} cy={hipY + 120} r="16" fill="#6B5D4F" />
            
            {/* Feet */}
            <ellipse cx={225} cy={hipY + 225} rx="18" ry="12" fill="#8B7355" opacity="0.9" />
            <ellipse cx={275} cy={hipY + 225} rx="18" ry="12" fill="#8B7355" opacity="0.9" />
          </g>
        </g>
      );
    }
    
    // For squat and other standing exercises
    if (animationType === 'squat' || animationType === 'deadlift') {
      const kneeAngleRad = (config.kneeAngle * Math.PI) / 180;
      const spineAngleRad = (config.spineAngle * Math.PI) / 180;
      
      // Adjust torso based on spine angle
      const torsoX = headCenterX + Math.sin(spineAngleRad) * 60;
      const torsoEndY = shoulderY + 140;
      
      // Calculate knee position
      const thighLength = 100;
      const calfLength = 110;
      
      return (
        <g>
          {/* Head */}
          <ellipse 
            cx={headCenterX + Math.sin(spineAngleRad) * 20} 
            cy={headCenterY} 
            rx="32" 
            ry="38" 
            fill="#8B7355" 
            opacity="0.85" 
          />
          <ellipse 
            cx={headCenterX + Math.sin(spineAngleRad) * 20} 
            cy={headCenterY - 5} 
            rx="28" 
            ry="32" 
            fill="#A0826D" 
            opacity="0.7" 
          />
          
          {/* Neck */}
          <rect 
            x={headCenterX - 15 + Math.sin(spineAngleRad) * 15} 
            y={neckY} 
            width="30" 
            height="35" 
            rx="8" 
            fill="#8B7355" 
            opacity="0.8"
            transform={`rotate(${config.spineAngle} ${headCenterX} ${neckY})`}
          />
          
          {/* Torso with spine angle */}
          <g transform={`rotate(${config.spineAngle} ${headCenterX} ${shoulderY})`}>
            <ellipse cx={headCenterX} cy={shoulderY + 60} rx="70" ry="90" fill="#7D6E5D" opacity="0.6" />
            
            {/* BACK MUSCLES (for deadlift) */}
            {activeRegions.back && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX} cy={shoulderY + 40} rx="60" ry="75" fill="url(#activeMuscle)" opacity={intensity * 0.85} />
                <line x1={headCenterX} y1={shoulderY + 10} x2={headCenterX} y2={shoulderY + 110} stroke="#7f1d1d" strokeWidth="3" opacity={intensity * 0.7} />
              </g>
            )}
            
            {/* ABS */}
            {activeRegions.abs && (
              <g filter="url(#muscleGlow)">
                <rect x={headCenterX - 35} y={shoulderY + 85} width="70" height="50" rx="12" fill="url(#activeMuscle)" opacity={intensity * 0.75} />
                <line x1={headCenterX} y1={shoulderY + 90} x2={headCenterX} y2={shoulderY + 130} stroke="#7f1d1d" strokeWidth="2.5" opacity={intensity * 0.6} />
              </g>
            )}
          </g>
          
          {/* Shoulders with spine angle */}
          <g transform={`rotate(${config.spineAngle} ${headCenterX} ${shoulderY})`}>
            {activeRegions.shoulders && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX - 60} cy={shoulderY + 10} rx="30" ry="38" fill="url(#activeMuscle)" opacity={intensity * 0.9} />
                <ellipse cx={headCenterX + 60} cy={shoulderY + 10} rx="30" ry="38" fill="url(#activeMuscle)" opacity={intensity * 0.9} />
              </g>
            )}
            <ellipse cx={headCenterX - 60} cy={shoulderY + 10} rx="26" ry="32" fill="#8B7355" opacity="0.7" />
            <ellipse cx={headCenterX + 60} cy={shoulderY + 10} rx="26" ry="32" fill="#8B7355" opacity="0.7" />
          </g>
          
          {/* Arms */}
          <g transform={`rotate(${config.spineAngle} ${headCenterX} ${shoulderY})`}>
            {/* Left arm */}
            <ellipse cx={headCenterX - 65} cy={shoulderY + 70} rx="18" ry="55" fill="#8B7355" opacity="0.8" />
            <ellipse cx={headCenterX - 70} cy={shoulderY + 155} rx="15" ry="50" fill="#8B7355" opacity="0.8" />
            
            {/* Right arm */}
            <ellipse cx={headCenterX + 65} cy={shoulderY + 70} rx="18" ry="55" fill="#8B7355" opacity="0.8" />
            <ellipse cx={headCenterX + 70} cy={shoulderY + 155} rx="15" ry="50" fill="#8B7355" opacity="0.8" />
          </g>
          
          {/* Hips/Glutes */}
          <ellipse cx={headCenterX} cy={hipY} rx="68" ry="55" fill="#7D6E5D" opacity="0.6" />
          
          {/* GLUTES */}
          {activeRegions.glutes && (
            <g filter="url(#muscleGlow)">
              <ellipse cx={headCenterX - 18} cy={hipY} rx="32" ry="48" fill="url(#activeMuscle)" opacity={intensity * 0.95} />
              <ellipse cx={headCenterX + 18} cy={hipY} rx="32" ry="48" fill="url(#activeMuscle)" opacity={intensity * 0.95} />
            </g>
          )}
          
          {/* Left Leg */}
          <g>
            {/* Thigh */}
            <ellipse cx={headCenterX - 25} cy={hipY + 55} rx="30" ry="68" fill="#8B7355" opacity="0.75" />
            
            {/* QUADRICEPS */}
            {activeRegions.quads && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX - 22} cy={hipY + 50} rx="28" ry="62" fill="url(#activeMuscle)" opacity={intensity * 0.95} />
                {/* Quad separation */}
                <line x1={headCenterX - 22} y1={hipY + 20} x2={headCenterX - 22} y2={hipY + 105} stroke="#7f1d1d" strokeWidth="2.5" opacity={intensity * 0.7} />
                <line x1={headCenterX - 35} y1={hipY + 30} x2={headCenterX - 35} y2={hipY + 100} stroke="#7f1d1d" strokeWidth="2" opacity={intensity * 0.6} />
              </g>
            )}
            
            {/* HAMSTRINGS */}
            {activeRegions.hamstrings && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX - 28} cy={hipY + 55} rx="24" ry="58" fill="url(#activeMuscle)" opacity={intensity * 0.85} />
              </g>
            )}
            
            {/* Knee */}
            <circle cx={headCenterX - 25} cy={kneeY} r="18" fill="#6B5D4F" />
            
            {/* Calf */}
            <ellipse cx={headCenterX - 25} cy={kneeY + 60} rx="24" ry="62" fill="#8B7355" opacity="0.75" />
            
            {/* CALVES */}
            {activeRegions.calves && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX - 25} cy={kneeY + 55} rx="22" ry="55" fill="url(#activeMuscle)" opacity={intensity * 0.8} />
              </g>
            )}
            
            {/* Ankle */}
            <circle cx={headCenterX - 25} cy={ankleY} r="12" fill="#6B5D4F" />
            
            {/* Foot */}
            <ellipse cx={headCenterX - 15} cy={ankleY + 12} rx="24" ry="14" fill="#8B7355" opacity="0.9" />
          </g>
          
          {/* Right Leg - mirror of left */}
          <g>
            {/* Thigh */}
            <ellipse cx={headCenterX + 25} cy={hipY + 55} rx="30" ry="68" fill="#8B7355" opacity="0.75" />
            
            {/* QUADRICEPS */}
            {activeRegions.quads && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX + 22} cy={hipY + 50} rx="28" ry="62" fill="url(#activeMuscle)" opacity={intensity * 0.95} />
                {/* Quad separation */}
                <line x1={headCenterX + 22} y1={hipY + 20} x2={headCenterX + 22} y2={hipY + 105} stroke="#7f1d1d" strokeWidth="2.5" opacity={intensity * 0.7} />
                <line x1={headCenterX + 35} y1={hipY + 30} x2={headCenterX + 35} y2={hipY + 100} stroke="#7f1d1d" strokeWidth="2" opacity={intensity * 0.6} />
              </g>
            )}
            
            {/* HAMSTRINGS */}
            {activeRegions.hamstrings && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX + 28} cy={hipY + 55} rx="24" ry="58" fill="url(#activeMuscle)" opacity={intensity * 0.85} />
              </g>
            )}
            
            {/* Knee */}
            <circle cx={headCenterX + 25} cy={kneeY} r="18" fill="#6B5D4F" />
            
            {/* Calf */}
            <ellipse cx={headCenterX + 25} cy={kneeY + 60} rx="24" ry="62" fill="#8B7355" opacity="0.75" />
            
            {/* CALVES */}
            {activeRegions.calves && (
              <g filter="url(#muscleGlow)">
                <ellipse cx={headCenterX + 25} cy={kneeY + 55} rx="22" ry="55" fill="url(#activeMuscle)" opacity={intensity * 0.8} />
              </g>
            )}
            
            {/* Ankle */}
            <circle cx={headCenterX + 25} cy={ankleY} r="12" fill="#6B5D4F" />
            
            {/* Foot */}
            <ellipse cx={headCenterX + 15} cy={ankleY + 12} rx="24" ry="14" fill="#8B7355" opacity="0.9" />
          </g>
        </g>
      );
    }
    
    // Default standing position
    return <g></g>;
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden border-4 border-blue-500 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>
                Guided Exercise Demo
              </h2>
              <p className="text-blue-100">{exerciseName}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Animated Exercise View */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 relative">
              {/* Phase Indicator */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-black/90 px-4 py-2 rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/30">
                  <p className="text-xs text-gray-400 mb-1">Movement Phase</p>
                  <p className="text-lg text-white" style={{ fontWeight: 700 }}>
                    {phase === 'eccentric' ? '⬇️ LOWERING' : '⬆️ LIFTING'}
                  </p>
                </div>
              </div>

              {/* Rep Counter */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/90 px-4 py-2 rounded-lg border-2 border-orange-500 shadow-lg shadow-orange-500/30">
                  <p className="text-xs text-gray-400 mb-1">Progress</p>
                  <p className="text-lg text-white" style={{ fontWeight: 700 }}>
                    {Math.round(progress)}%
                  </p>
                </div>
              </div>

              {/* Exercise Animation */}
              <div className="aspect-square relative flex items-center justify-center">
                {/* Grid overlay for depth */}
                <div className="absolute inset-0 opacity-5">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <svg
                  viewBox="0 0 500 600"
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Gradient for active muscles - bright red/orange */}
                    <radialGradient id="activeMuscle">
                      <stop offset="0%" stopColor="#dc2626" stopOpacity="1" />
                      <stop offset="40%" stopColor="#ef4444" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.85" />
                    </radialGradient>

                    {/* Intense glow effect */}
                    <filter id="muscleGlow">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>

                    {/* Shadow */}
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5"/>
                    </filter>
                  </defs>

                  {/* Floor/Platform */}
                  <rect x="0" y="550" width="500" height="50" fill="url(#floorGradient)" />
                  <defs>
                    <linearGradient id="floorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1f2937" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>

                  {/* Equipment (Bench for bench press) */}
                  {animationType === 'benchPress' && (
                    <g filter="url(#shadow)">
                      <rect x="150" y="320" width="200" height="25" rx="6" fill="#374151" />
                      <rect x="155" y="323" width="190" height="8" rx="4" fill="#4b5563" />
                      <rect x="165" y="345" width="12" height="90" rx="4" fill="#1f2937" />
                      <rect x="323" y="345" width="12" height="90" rx="4" fill="#1f2937" />
                    </g>
                  )}

                  {/* Barbell */}
                  {(animationType === 'benchPress' || animationType === 'squat') && (
                    <motion.g
                      animate={{ y: config.barY - 200 }}
                      transition={{ duration: 0 }}
                      filter="url(#shadow)"
                    >
                      {/* Bar */}
                      <rect x="100" y="200" width="300" height="14" rx="7" fill="#2d3748" />
                      <rect x="105" y="202" width="290" height="6" rx="3" fill="#4a5568" />
                      
                      {/* Weight plates - left */}
                      <circle cx="120" cy="207" r="32" fill="#1a202c" />
                      <circle cx="120" cy="207" r="26" fill="#2d3748" />
                      <circle cx="120" cy="207" r="16" fill="#4a5568" />
                      <text x="120" y="212" fill="#cbd5e0" fontSize="14" textAnchor="middle" style={{ fontWeight: 700 }}>45</text>
                      
                      {/* Weight plates - right */}
                      <circle cx="380" cy="207" r="32" fill="#1a202c" />
                      <circle cx="380" cy="207" r="26" fill="#2d3748" />
                      <circle cx="380" cy="207" r="16" fill="#4a5568" />
                      <text x="380" y="212" fill="#cbd5e0" fontSize="14" textAnchor="middle" style={{ fontWeight: 700 }}>45</text>
                      
                      {/* Collars */}
                      <rect x="150" y="200" width="8" height="14" rx="2" fill="#e53e3e" />
                      <rect x="342" y="200" width="8" height="14" rx="2" fill="#e53e3e" />
                    </motion.g>
                  )}

                  {/* Human Body */}
                  {renderHumanBody()}
                </svg>
              </div>

              {/* Movement Tips */}
              <div className="mt-4 bg-black/80 p-4 rounded-lg border-2 border-blue-500/50 shadow-lg">
                <p className="text-sm text-gray-300">
                  <span className="text-blue-400" style={{ fontWeight: 700 }}>💡 Form Tip:</span>{' '}
                  {phase === 'eccentric' 
                    ? 'Control the descent - feel the stretch in your muscles'
                    : 'Drive powerfully upward - squeeze the target muscles at the top'}
                </p>
              </div>
            </div>

            {/* Right: Muscle Activation Details */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 overflow-y-auto max-h-[90vh]">
              <div className="space-y-6">
                {/* Muscle Activation Indicator */}
                <div>
                  <h3 className="text-xl mb-4" style={{ fontWeight: 700 }}>
                    Muscle Activation
                  </h3>
                  
                  <div className="space-y-3">
                    {primaryMuscles.map((muscle, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span style={{ fontWeight: 600 }}>{muscle}</span>
                          <span className="text-sm px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full" style={{ fontWeight: 700 }}>
                            {Math.round(intensity * 100)}%
                          </span>
                        </div>
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-full shadow-lg"
                            animate={{ width: `${intensity * 100}%` }}
                            transition={{ duration: 0.3 }}
                            style={{
                              boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rep Breakdown */}
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-gray-200">
                  <h4 className="mb-3" style={{ fontWeight: 700 }}>
                    Rep Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eccentric (Lowering):</span>
                      <span style={{ fontWeight: 600 }}>2-3 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pause at bottom:</span>
                      <span style={{ fontWeight: 600 }}>1 second</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Concentric (Lifting):</span>
                      <span style={{ fontWeight: 600 }}>1-2 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Squeeze at top:</span>
                      <span style={{ fontWeight: 600 }}>1 second</span>
                    </div>
                  </div>
                </div>

                {/* Key Form Points */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border-2 border-blue-200">
                  <h4 className="mb-3 text-blue-900" style={{ fontWeight: 700 }}>
                    ✓ Key Form Points
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Keep core engaged throughout the movement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Control the eccentric (lowering) phase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Breathe out during exertion (lifting)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Focus on muscle contraction, not just weight</span>
                    </li>
                  </ul>
                </div>

                {/* Breathing Pattern */}
                <div className="bg-white p-5 rounded-lg shadow-md border-2 border-gray-200">
                  <h4 className="mb-3" style={{ fontWeight: 700 }}>
                    🫁 Breathing Pattern
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full transition-all ${phase === 'eccentric' ? 'bg-blue-500 animate-pulse shadow-lg shadow-blue-500/50 scale-110' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">
                        <span style={{ fontWeight: 600 }}>Inhale</span> as you lower the weight
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full transition-all ${phase === 'concentric' ? 'bg-orange-500 animate-pulse shadow-lg shadow-orange-500/50 scale-110' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">
                        <span style={{ fontWeight: 600 }}>Exhale</span> as you lift the weight
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-gray-900 p-4 flex items-center justify-center gap-4 border-t-4 border-gray-800">
            <Button
              size="lg"
              variant={isPlaying ? "default" : "outline"}
              onClick={() => setIsPlaying(!isPlaying)}
              className={isPlaying ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30" : ""}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Demo
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Play Demo
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="border-2 hover:bg-gray-800 hover:text-white"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>

            <div className="flex-1" />

            <div className="text-white text-sm bg-gray-800 px-4 py-2 rounded-lg border-2 border-gray-700">
              <span className="text-gray-400">Phase:</span>{' '}
              <span style={{ fontWeight: 700 }} className={phase === 'eccentric' ? 'text-blue-400' : 'text-orange-400'}>
                {phase === 'eccentric' ? 'Eccentric' : 'Concentric'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
