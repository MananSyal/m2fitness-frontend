import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCw } from 'lucide-react';

interface MuscleProjectionViewProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  stabilizers: string[];
  equipment: string;
}

// Map muscle names to their positions and which view they belong to
const muscleMapping: { [key: string]: { view: 'front' | 'back' | 'both', region: string } } = {
  // Chest
  'Pectoralis Major': { view: 'front', region: 'chest' },
  'Upper Chest': { view: 'front', region: 'upper-chest' },
  'Chest': { view: 'front', region: 'chest' },
  'Pectoralis Major (Clavicular Head)': { view: 'front', region: 'upper-chest' },
  'Serratus Anterior': { view: 'front', region: 'serratus' },
  
  // Shoulders
  'Anterior Deltoids': { view: 'front', region: 'front-delts' },
  'Anterior Deltoid': { view: 'front', region: 'front-delts' },
  'Lateral Deltoids': { view: 'both', region: 'side-delts' },
  'Lateral Deltoid': { view: 'both', region: 'side-delts' },
  'Rear Deltoids': { view: 'back', region: 'rear-delts' },
  'Rear Deltoid': { view: 'back', region: 'rear-delts' },
  'Shoulders': { view: 'both', region: 'shoulders' },
  
  // Arms (Front)
  'Biceps Brachii': { view: 'front', region: 'biceps' },
  'Biceps': { view: 'front', region: 'biceps' },
  'Brachialis': { view: 'front', region: 'biceps' },
  'Forearms': { view: 'both', region: 'forearms' },
  
  // Arms (Back)
  'Triceps Brachii': { view: 'back', region: 'triceps' },
  'Triceps': { view: 'back', region: 'triceps' },
  'Triceps Lateral Head': { view: 'back', region: 'triceps' },
  'Triceps Medial Head': { view: 'back', region: 'triceps' },
  'Triceps Brachii (Long Head)': { view: 'back', region: 'triceps' },
  
  // Core (Front)
  'Rectus Abdominis': { view: 'front', region: 'abs' },
  'Transverse Abdominis': { view: 'front', region: 'abs' },
  'Obliques': { view: 'both', region: 'obliques' },
  'Core (Rectus Abdominis)': { view: 'front', region: 'abs' },
  'Core (Full)': { view: 'both', region: 'core' },
  'Core': { view: 'both', region: 'core' },
  'Abs': { view: 'front', region: 'abs' },
  
  // Legs (Front)
  'Quadriceps': { view: 'front', region: 'quads' },
  'Adductors': { view: 'front', region: 'adductors' },
  'Hip Flexors': { view: 'front', region: 'hip-flexors' },
  'Hip Stabilizers': { view: 'both', region: 'hips' },
  'Calves': { view: 'back', region: 'calves' },
  
  // Legs (Back)
  'Hamstrings': { view: 'back', region: 'hamstrings' },
  'Gluteus Maximus': { view: 'back', region: 'glutes' },
  'Glutes': { view: 'back', region: 'glutes' },
  
  // Back
  'Latissimus Dorsi': { view: 'back', region: 'lats' },
  'Lats': { view: 'back', region: 'lats' },
  'Teres Major': { view: 'back', region: 'lats' },
  'Rhomboids': { view: 'back', region: 'upper-back' },
  'Middle Trapezius': { view: 'back', region: 'traps' },
  'Trapezius': { view: 'back', region: 'traps' },
  'Upper Trapezius': { view: 'back', region: 'traps' },
  'Lower Traps': { view: 'back', region: 'lower-traps' },
  'Erector Spinae': { view: 'back', region: 'lower-back' },
  'Lower Back': { view: 'back', region: 'lower-back' },
  
  // Other
  'Rotator Cuff': { view: 'back', region: 'rotator-cuff' },
  'Grip': { view: 'front', region: 'forearms' },
  'Grip Strength': { view: 'front', region: 'forearms' },
  'Full Body': { view: 'both', region: 'full-body' },
  'Cardiovascular System': { view: 'both', region: 'cardio' },
  'Ankle Stabilizers': { view: 'both', region: 'ankles' },
};

export default function MuscleProjectionView({ 
  primaryMuscles, 
  secondaryMuscles, 
  stabilizers,
  equipment 
}: MuscleProjectionViewProps) {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [view, setView] = useState<'front' | 'back'>('front');

  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 1) % 360;
        // Determine view based on rotation angle
        if (newAngle >= 45 && newAngle < 225) {
          setView('back');
        } else {
          setView('front');
        }
        return newAngle;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isRotating]);

  // Determine which muscles are visible in current view
  const getVisibleMuscles = (muscles: string[], type: 'primary' | 'secondary' | 'stabilizer') => {
    return muscles.filter(muscle => {
      const mapping = muscleMapping[muscle];
      return mapping && (mapping.view === view || mapping.view === 'both');
    });
  };

  const visiblePrimary = getVisibleMuscles(primaryMuscles, 'primary');
  const visibleSecondary = getVisibleMuscles(secondaryMuscles, 'secondary');
  const visibleStabilizers = getVisibleMuscles(stabilizers, 'stabilizer');

  const handleRotateManual = () => {
    setView(view === 'front' ? 'back' : 'front');
    setRotationAngle(view === 'front' ? 180 : 0);
  };

  // Get muscle labels for current view
  const getMuscleLabels = () => {
    const labels: Array<{ name: string, x: number, y: number, labelX: number, labelY: number, type: 'primary' | 'secondary' }> = [];
    
    if (view === 'front') {
      // Front view labels
      if (visiblePrimary.some(m => muscleMapping[m]?.region.includes('chest'))) {
        labels.push({ 
          name: 'PECTORALIS MAJOR', 
          x: 150, y: 135, 
          labelX: 280, labelY: 100,
          type: 'primary' 
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'front-delts' || muscleMapping[m]?.region === 'shoulders') ||
          visibleSecondary.some(m => muscleMapping[m]?.region === 'front-delts')) {
        labels.push({ 
          name: 'ANTERIOR DELTOID', 
          x: 110, y: 120, 
          labelX: 20, labelY: 80,
          type: visiblePrimary.some(m => muscleMapping[m]?.region === 'front-delts') ? 'primary' : 'secondary'
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'biceps')) {
        labels.push({ 
          name: 'BICEPS BRACHII', 
          x: 105, y: 165, 
          labelX: 20, labelY: 180,
          type: 'primary' 
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'abs' || muscleMapping[m]?.region === 'core')) {
        labels.push({ 
          name: 'RECTUS ABDOMINIS', 
          x: 150, y: 195, 
          labelX: 280, labelY: 210,
          type: 'primary' 
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'quads')) {
        labels.push({ 
          name: 'QUADRICEPS', 
          x: 120, y: 310, 
          labelX: 20, labelY: 330,
          type: 'primary' 
        });
      }
    } else {
      // Back view labels
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'traps') ||
          visibleSecondary.some(m => muscleMapping[m]?.region === 'traps')) {
        labels.push({ 
          name: 'TRAPEZIUS', 
          x: 150, y: 85, 
          labelX: 280, labelY: 70,
          type: visiblePrimary.some(m => muscleMapping[m]?.region === 'traps') ? 'primary' : 'secondary'
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'lats')) {
        labels.push({ 
          name: 'LATISSIMUS DORSI', 
          x: 120, y: 160, 
          labelX: 20, labelY: 150,
          type: 'primary' 
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'triceps') ||
          visibleSecondary.some(m => muscleMapping[m]?.region === 'triceps')) {
        labels.push({ 
          name: 'TRICEPS BRACHII', 
          x: 105, y: 160, 
          labelX: 280, labelY: 180,
          type: visiblePrimary.some(m => muscleMapping[m]?.region === 'triceps') ? 'primary' : 'secondary'
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'glutes')) {
        labels.push({ 
          name: 'GLUTEUS MAXIMUS', 
          x: 150, y: 240, 
          labelX: 280, labelY: 250,
          type: 'primary' 
        });
      }
      if (visiblePrimary.some(m => muscleMapping[m]?.region === 'hamstrings')) {
        labels.push({ 
          name: 'HAMSTRINGS', 
          x: 120, y: 315, 
          labelX: 20, labelY: 340,
          type: 'primary' 
        });
      }
    }
    
    return labels;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: 3D Rotating Body Projection */}
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => setIsRotating(!isRotating)}
            className="border-2"
          >
            {isRotating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isRotating ? 'Pause' : 'Play'} Rotation
          </Button>
          <Button
            variant="outline"
            onClick={handleRotateManual}
            className="border-2"
            disabled={isRotating}
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Flip View
          </Button>
        </div>

        {/* 3D Rotating Body with Gym Background */}
        <motion.div
          className="relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-gray-800 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          }}
        >
          {/* Gym-style background with depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/30 to-black/70"></div>
          
          {/* Equipment silhouettes in background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-10 w-20 h-32 bg-gradient-to-t from-gray-600 to-transparent rounded-t-lg"></div>
            <div className="absolute bottom-0 right-10 w-20 h-32 bg-gradient-to-t from-gray-600 to-transparent rounded-t-lg"></div>
          </div>

          {/* Animated rotating figure */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: isRotating ? rotationAngle : 0,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                rotateY: { duration: 0 }
              }}
              className="absolute inset-0"
            >
              {/* Body Silhouette with Muscle Highlights */}
              <svg
                viewBox="0 0 400 600"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Define realistic gradients */}
                <defs>
                  {/* Primary muscle gradient - bright red */}
                  <radialGradient id="primaryGlow">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.7" />
                  </radialGradient>
                  
                  {/* Secondary muscle gradient - orange */}
                  <radialGradient id="secondaryGlow">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#c2410c" stopOpacity="0.5" />
                  </radialGradient>
                  
                  {/* Stabilizer gradient - amber */}
                  <radialGradient id="stabilizerGlow">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
                  </radialGradient>

                  {/* Skin tone base */}
                  <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e5c7b5" />
                    <stop offset="100%" stopColor="#d4ae99" />
                  </linearGradient>

                  {/* Shadow effects */}
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                  
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {view === 'front' ? (
                  <>
                    {/* Front Body Base - Realistic mannequin style */}
                    <g filter="url(#shadow)">
                      {/* Head */}
                      <ellipse cx="200" cy="60" rx="28" ry="35" fill="url(#skinTone)" opacity="0.4" />
                      <rect x="185" y="55" width="30" height="15" fill="url(#skinTone)" opacity="0.3" />
                      
                      {/* Neck */}
                      <rect x="190" y="90" width="20" height="20" rx="3" fill="rgba(139, 125, 115, 0.3)" />
                      
                      {/* Torso outline */}
                      <path
                        d="M 200 110
                           Q 170 115 160 140
                           L 150 170
                           Q 145 185 140 200
                           L 135 240
                           L 130 300
                           L 128 360
                           L 125 420
                           L 123 480
                           L 135 490
                           L 145 485
                           L 145 420
                           L 150 360
                           L 155 310
                           L 165 270
                           L 175 250
                           L 185 240
                           L 195 235
                           L 200 240
                           L 205 235
                           L 215 240
                           L 225 250
                           L 235 270
                           L 245 310
                           L 250 360
                           L 255 420
                           L 255 485
                           L 265 490
                           L 277 480
                           L 275 420
                           L 272 360
                           L 270 300
                           L 265 240
                           Q 260 185 255 170
                           L 250 140
                           Q 230 115 200 110 Z"
                        fill="rgba(100, 116, 139, 0.25)"
                        stroke="rgba(148, 163, 184, 0.4)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* FRONT MUSCLES */}
                    <g filter="url(#glow)">
                      {/* Chest - Pectoralis Major */}
                      {visiblePrimary.some(m => muscleMapping[m]?.region.includes('chest')) && (
                        <>
                          <ellipse cx="175" cy="165" rx="30" ry="42" fill="url(#primaryGlow)" opacity="0.9" />
                          <ellipse cx="225" cy="165" rx="30" ry="42" fill="url(#primaryGlow)" opacity="0.9" />
                          {/* Muscle fiber details */}
                          <path d="M 160 155 Q 170 165 165 185" stroke="#991b1b" strokeWidth="2" opacity="0.6" fill="none"/>
                          <path d="M 240 155 Q 230 165 235 185" stroke="#991b1b" strokeWidth="2" opacity="0.6" fill="none"/>
                        </>
                      )}

                      {/* Shoulders (Front Delts) */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'front-delts' || muscleMapping[m]?.region === 'shoulders') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'front-delts' || muscleMapping[m]?.region === 'shoulders')) && (
                        <>
                          <ellipse cx="145" cy="145" rx="24" ry="28" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'front-delts') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.85" />
                          <ellipse cx="255" cy="145" rx="24" ry="28" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'front-delts') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.85" />
                        </>
                      )}

                      {/* Biceps */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'biceps') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'biceps')) && (
                        <>
                          <ellipse cx="140" cy="200" rx="15" ry="35" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'biceps') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          <ellipse cx="260" cy="200" rx="15" ry="35" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'biceps') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                        </>
                      )}

                      {/* Forearms */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'forearms') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'forearms') ||
                        visibleStabilizers.some(m => muscleMapping[m]?.region === 'forearms')) && (
                        <>
                          <ellipse cx="135" cy="255" rx="10" ry="32" fill="url(#stabilizerGlow)" opacity="0.7" />
                          <ellipse cx="265" cy="255" rx="10" ry="32" fill="url(#stabilizerGlow)" opacity="0.7" />
                        </>
                      )}

                      {/* Abs - Rectus Abdominis */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'abs' || muscleMapping[m]?.region === 'core') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'abs' || muscleMapping[m]?.region === 'core') ||
                        visibleStabilizers.some(m => muscleMapping[m]?.region === 'abs' || muscleMapping[m]?.region === 'core')) && (
                        <>
                          <rect x="175" y="210" width="50" height="70" rx="10" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'abs') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          {/* Six-pack definition */}
                          <line x1="200" y1="220" x2="200" y2="270" stroke="#7c2d12" strokeWidth="2" opacity="0.5"/>
                          <line x1="177" y1="235" x2="223" y2="235" stroke="#7c2d12" strokeWidth="1.5" opacity="0.4"/>
                          <line x1="177" y1="250" x2="223" y2="250" stroke="#7c2d12" strokeWidth="1.5" opacity="0.4"/>
                          <line x1="177" y1="265" x2="223" y2="265" stroke="#7c2d12" strokeWidth="1.5" opacity="0.4"/>
                        </>
                      )}

                      {/* Obliques */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'obliques') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'obliques') ||
                        visibleStabilizers.some(m => muscleMapping[m]?.region === 'obliques')) && (
                        <>
                          <path d="M 165 220 Q 155 240 160 270" fill="none" stroke="url(#secondaryGlow)" strokeWidth="16" opacity="0.7" />
                          <path d="M 235 220 Q 245 240 240 270" fill="none" stroke="url(#secondaryGlow)" strokeWidth="16" opacity="0.7" />
                        </>
                      )}

                      {/* Quadriceps */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'quads') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'quads')) && (
                        <>
                          <ellipse cx="160" cy="380" rx="22" ry="68" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'quads') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          <ellipse cx="240" cy="380" rx="22" ry="68" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'quads') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          {/* Quad separation lines */}
                          <line x1="160" y1="330" x2="160" y2="420" stroke="#7c2d12" strokeWidth="2" opacity="0.4"/>
                          <line x1="240" y1="330" x2="240" y2="420" stroke="#7c2d12" strokeWidth="2" opacity="0.4"/>
                        </>
                      )}

                      {/* Hip Flexors / Adductors */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'hip-flexors' || muscleMapping[m]?.region === 'adductors') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'hip-flexors' || muscleMapping[m]?.region === 'adductors')) && (
                        <>
                          <ellipse cx="180" cy="310" rx="12" ry="28" fill="url(#secondaryGlow)" opacity="0.7" />
                          <ellipse cx="220" cy="310" rx="12" ry="28" fill="url(#secondaryGlow)" opacity="0.7" />
                        </>
                      )}
                    </g>

                    {/* Labels for Front View */}
                    {getMuscleLabels().map((label, idx) => (
                      <g key={idx}>
                        {/* Line connecting to muscle */}
                        <line
                          x1={label.x}
                          y1={label.y}
                          x2={label.labelX}
                          y2={label.labelY}
                          stroke={label.type === 'primary' ? '#dc2626' : '#ea580c'}
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        {/* Label background */}
                        <rect
                          x={label.labelX - 5}
                          y={label.labelY - 15}
                          width={label.name.length * 7 + 10}
                          height="20"
                          fill="rgba(0,0,0,0.8)"
                          rx="3"
                        />
                        {/* Label text */}
                        <text
                          x={label.labelX}
                          y={label.labelY}
                          fill="white"
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          letterSpacing="0.5"
                        >
                          {label.name}
                        </text>
                      </g>
                    ))}
                  </>
                ) : (
                  <>
                    {/* Back Body Base */}
                    <g filter="url(#shadow)">
                      {/* Head */}
                      <ellipse cx="200" cy="60" rx="28" ry="35" fill="url(#skinTone)" opacity="0.4" />
                      
                      {/* Neck */}
                      <rect x="190" y="90" width="20" height="20" rx="3" fill="rgba(139, 125, 115, 0.3)" />
                      
                      {/* Torso outline */}
                      <path
                        d="M 200 110
                           Q 170 115 160 140
                           L 150 170
                           Q 145 185 140 200
                           L 135 240
                           L 130 300
                           L 128 360
                           L 125 420
                           L 123 480
                           L 135 490
                           L 145 485
                           L 145 420
                           L 150 360
                           L 155 310
                           L 165 270
                           L 175 250
                           L 185 240
                           L 195 235
                           L 200 240
                           L 205 235
                           L 215 240
                           L 225 250
                           L 235 270
                           L 245 310
                           L 250 360
                           L 255 420
                           L 255 485
                           L 265 490
                           L 277 480
                           L 275 420
                           L 272 360
                           L 270 300
                           L 265 240
                           Q 260 185 255 170
                           L 250 140
                           Q 230 115 200 110 Z"
                        fill="rgba(100, 116, 139, 0.25)"
                        stroke="rgba(148, 163, 184, 0.4)"
                        strokeWidth="2"
                      />
                    </g>

                    {/* BACK MUSCLES */}
                    <g filter="url(#glow)">
                      {/* Trapezius / Upper Back */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'traps' || muscleMapping[m]?.region === 'shoulders') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'traps' || muscleMapping[m]?.region === 'shoulders')) && (
                        <>
                          <ellipse cx="200" cy="120" rx="48" ry="26" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'traps') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          <path d="M 170 115 L 200 130 L 230 115" stroke="#7c2d12" strokeWidth="2" opacity="0.5" fill="none"/>
                        </>
                      )}

                      {/* Rear Delts */}
                      {(visibleSecondary.some(m => muscleMapping[m]?.region === 'rear-delts') ||
                        visibleStabilizers.some(m => muscleMapping[m]?.region === 'rear-delts')) && (
                        <>
                          <ellipse cx="145" cy="145" rx="24" ry="26" fill="url(#secondaryGlow)" opacity="0.8" />
                          <ellipse cx="255" cy="145" rx="24" ry="26" fill="url(#secondaryGlow)" opacity="0.8" />
                        </>
                      )}

                      {/* Latissimus Dorsi (Lats) */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'lats') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'lats')) && (
                        <>
                          <path d="M 160 165 Q 140 185 142 220 L 155 255 L 168 270 L 175 240 L 170 200 Z" fill="url(#primaryGlow)" opacity="0.9" />
                          <path d="M 240 165 Q 260 185 258 220 L 245 255 L 232 270 L 225 240 L 230 200 Z" fill="url(#primaryGlow)" opacity="0.9" />
                        </>
                      )}

                      {/* Upper/Mid Back (Rhomboids) */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'upper-back') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'upper-back')) && (
                        <rect x="175" y="140" width="50" height="55" rx="10" fill="url(#primaryGlow)" opacity="0.85" />
                      )}

                      {/* Triceps */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'triceps') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'triceps')) && (
                        <>
                          <ellipse cx="140" cy="195" rx="13" ry="32" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'triceps') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          <ellipse cx="260" cy="195" rx="13" ry="32" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'triceps') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                        </>
                      )}

                      {/* Lower Back (Erector Spinae) */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'lower-back') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'lower-back') ||
                        visibleStabilizers.some(m => muscleMapping[m]?.region === 'lower-back')) && (
                        <>
                          <ellipse cx="200" cy="245" rx="35" ry="42" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'lower-back') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.85" />
                          <line x1="200" y1="210" x2="200" y2="280" stroke="#7c2d12" strokeWidth="2" opacity="0.4"/>
                        </>
                      )}

                      {/* Glutes */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'glutes') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'glutes')) && (
                        <>
                          <ellipse cx="172" cy="300" rx="25" ry="32" fill="url(#primaryGlow)" opacity="0.9" />
                          <ellipse cx="228" cy="300" rx="25" ry="32" fill="url(#primaryGlow)" opacity="0.9" />
                        </>
                      )}

                      {/* Hamstrings */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'hamstrings') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'hamstrings')) && (
                        <>
                          <ellipse cx="160" cy="390" rx="20" ry="62" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'hamstrings') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          <ellipse cx="240" cy="390" rx="20" ry="62" fill={visiblePrimary.some(m => muscleMapping[m]?.region === 'hamstrings') ? "url(#primaryGlow)" : "url(#secondaryGlow)"} opacity="0.9" />
                          {/* Muscle separation */}
                          <line x1="160" y1="340" x2="160" y2="440" stroke="#7c2d12" strokeWidth="2" opacity="0.4"/>
                          <line x1="240" y1="340" x2="240" y2="440" stroke="#7c2d12" strokeWidth="2" opacity="0.4"/>
                        </>
                      )}

                      {/* Calves */}
                      {(visiblePrimary.some(m => muscleMapping[m]?.region === 'calves') ||
                        visibleSecondary.some(m => muscleMapping[m]?.region === 'calves')) && (
                        <>
                          <ellipse cx="155" cy="500" rx="15" ry="48" fill="url(#secondaryGlow)" opacity="0.8" />
                          <ellipse cx="245" cy="500" rx="15" ry="48" fill="url(#secondaryGlow)" opacity="0.8" />
                        </>
                      )}
                    </g>

                    {/* Labels for Back View */}
                    {getMuscleLabels().map((label, idx) => (
                      <g key={idx}>
                        {/* Line connecting to muscle */}
                        <line
                          x1={label.x}
                          y1={label.y}
                          x2={label.labelX}
                          y2={label.labelY}
                          stroke={label.type === 'primary' ? '#dc2626' : '#ea580c'}
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        {/* Label background */}
                        <rect
                          x={label.labelX - 5}
                          y={label.labelY - 15}
                          width={label.name.length * 7 + 10}
                          height="20"
                          fill="rgba(0,0,0,0.8)"
                          rx="3"
                        />
                        {/* Label text */}
                        <text
                          x={label.labelX}
                          y={label.labelY}
                          fill="white"
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="system-ui, -apple-system, sans-serif"
                          letterSpacing="0.5"
                        >
                          {label.name}
                        </text>
                      </g>
                    ))}
                  </>
                )}
              </svg>
            </motion.div>
          </AnimatePresence>

          {/* Floor shadow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/50"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Secondary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/50"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Stabilizers</span>
          </div>
        </div>

        {/* Current View Indicator */}
        <div className="text-center">
          <Badge variant="outline" className="px-4 py-2 text-base border-2">
            Current View: <span style={{ fontWeight: 700 }} className="ml-1">{view === 'front' ? 'FRONT' : 'BACK'}</span>
          </Badge>
        </div>
      </div>

      {/* Right: Muscle Details */}
      <div className="space-y-6">
        {/* Equipment */}
        <div>
          <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
            Primary Equipment
          </h3>
          <Badge variant="secondary" className="px-4 py-2 text-base bg-blue-100 text-blue-700">
            {equipment}
          </Badge>
        </div>

        {/* Primary Muscles */}
        {primaryMuscles.length > 0 && (
          <div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              Primary Muscles
            </h3>
            <div className="flex flex-wrap gap-2">
              {primaryMuscles.map((muscle, idx) => (
                <Badge 
                  key={idx}
                  className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white border-0 shadow-lg shadow-red-500/30"
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Muscles */}
        {secondaryMuscles.length > 0 && (
          <div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              Secondary Muscles
            </h3>
            <div className="flex flex-wrap gap-2">
              {secondaryMuscles.map((muscle, idx) => (
                <Badge 
                  key={idx}
                  className="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-400 text-white border-0 shadow-lg shadow-orange-500/30"
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Stabilizers */}
        {stabilizers.length > 0 && (
          <div>
            <h3 className="text-xl mb-3" style={{ fontWeight: 700 }}>
              Stabilizer Muscles
            </h3>
            <div className="flex flex-wrap gap-2">
              {stabilizers.map((muscle, idx) => (
                <Badge 
                  key={idx}
                  className="px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 border-0 shadow-lg shadow-amber-500/30"
                >
                  {muscle}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tip */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border-2 border-blue-200">
          <p className="text-sm text-gray-700 mb-2">
            <span style={{ fontWeight: 700 }}>💡 Pro Tip:</span> The 3D model automatically rotates to show all muscle groups.
          </p>
          <p className="text-sm text-gray-600">
            Click "Pause Rotation" to examine a specific view, or use "Flip View" to manually switch between front and back. Primary muscles (red) receive maximum activation, secondary muscles (orange) provide support, and stabilizers (yellow) ensure balance and control.
          </p>
        </div>
      </div>
    </div>
  );
}
