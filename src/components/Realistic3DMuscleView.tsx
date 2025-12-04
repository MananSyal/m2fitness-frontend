import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Realistic3DMuscleViewProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  exerciseName: string;
  equipment: string;
  description: string;
}

// Muscle mapping for highlighting
const muscleMapping: { [key: string]: { view: 'front' | 'back' | 'both', region: string } } = {
  'Pectoralis Major': { view: 'front', region: 'chest' },
  'Upper Chest': { view: 'front', region: 'upper-chest' },
  'Chest': { view: 'front', region: 'chest' },
  'Anterior Deltoids': { view: 'front', region: 'front-delts' },
  'Anterior Deltoid': { view: 'front', region: 'front-delts' },
  'Lateral Deltoids': { view: 'both', region: 'side-delts' },
  'Lateral Deltoid': { view: 'both', region: 'side-delts' },
  'Rear Deltoids': { view: 'back', region: 'rear-delts' },
  'Rear Deltoid': { view: 'back', region: 'rear-delts' },
  'Shoulders': { view: 'both', region: 'shoulders' },
  'Biceps Brachii': { view: 'front', region: 'biceps' },
  'Biceps': { view: 'front', region: 'biceps' },
  'Brachialis': { view: 'front', region: 'biceps' },
  'Forearms': { view: 'both', region: 'forearms' },
  'Triceps Brachii': { view: 'back', region: 'triceps' },
  'Triceps': { view: 'back', region: 'triceps' },
  'Rectus Abdominis': { view: 'front', region: 'abs' },
  'Transverse Abdominis': { view: 'front', region: 'abs' },
  'Obliques': { view: 'both', region: 'obliques' },
  'Core': { view: 'both', region: 'core' },
  'Abs': { view: 'front', region: 'abs' },
  'Quadriceps': { view: 'front', region: 'quads' },
  'Adductors': { view: 'front', region: 'adductors' },
  'Hamstrings': { view: 'back', region: 'hamstrings' },
  'Gluteus Maximus': { view: 'back', region: 'glutes' },
  'Glutes': { view: 'back', region: 'glutes' },
  'Calves': { view: 'back', region: 'calves' },
  'Latissimus Dorsi': { view: 'back', region: 'lats' },
  'Lats': { view: 'back', region: 'lats' },
  'Rhomboids': { view: 'back', region: 'upper-back' },
  'Trapezius': { view: 'back', region: 'traps' },
  'Erector Spinae': { view: 'back', region: 'lower-back' },
  'Lower Back': { view: 'back', region: 'lower-back' },
  'Serratus Anterior': { view: 'front', region: 'serratus' },
};

export default function Realistic3DMuscleView({
  primaryMuscles,
  secondaryMuscles,
  exerciseName,
  equipment,
  description,
}: Realistic3DMuscleViewProps) {
  const [selectedView, setSelectedView] = useState<'both' | 'front' | 'back'>('both');

  // Check if muscle is active
  const isMuscleActive = (muscleName: string, view: 'front' | 'back') => {
    const allActiveMuscles = [...primaryMuscles, ...secondaryMuscles];
    return allActiveMuscles.some(muscle => {
      const mapping = muscleMapping[muscle];
      return mapping && 
             mapping.region === muscleName && 
             (mapping.view === view || mapping.view === 'both');
    });
  };

  const isPrimaryMuscle = (muscleName: string, view: 'front' | 'back') => {
    return primaryMuscles.some(muscle => {
      const mapping = muscleMapping[muscle];
      return mapping && 
             mapping.region === muscleName && 
             (mapping.view === view || mapping.view === 'both');
    });
  };

  // Render 3D muscular figure
  const render3DFigure = (view: 'front' | 'back') => {
    return (
      <svg viewBox="0 0 300 600" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Primary muscle gradient - vibrant red */}
          <radialGradient id={`primaryMuscle-${view}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          {/* Secondary muscle gradient - orange-red */}
          <radialGradient id={`secondaryMuscle-${view}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="40%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </radialGradient>

          {/* Inactive muscle gradient - metallic gray/silver */}
          <radialGradient id={`inactiveMuscle-${view}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="40%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </radialGradient>

          {/* Skin tone for non-muscle areas */}
          <linearGradient id={`skinTone-${view}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>

          {/* 3D shading effect */}
          <filter id="depth3D">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="-2" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Highlight for 3D effect */}
          <filter id="highlight3D">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1" dy="-2" result="offsetblur"/>
            <feFlood floodColor="white" floodOpacity="0.3"/>
            <feComposite in2="offsetblur" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {view === 'front' ? (
          // FRONT VIEW
          <g filter="url(#depth3D)">
            {/* Head */}
            <ellipse cx="150" cy="50" rx="28" ry="35" fill="url(#skinTone-front)" opacity="0.9" />
            <circle cx="150" cy="48" r="24" fill="#e5e7eb" opacity="0.8" />

            {/* Neck */}
            <rect x="138" y="80" width="24" height="30" rx="6" fill="url(#skinTone-front)" opacity="0.85" />

            {/* Shoulders - Anterior Deltoids */}
            <ellipse 
              cx="115" 
              cy="125" 
              rx="28" 
              ry="35" 
              fill={isMuscleActive('front-delts', 'front') || isMuscleActive('shoulders', 'front') 
                ? (isPrimaryMuscle('front-delts', 'front') || isPrimaryMuscle('shoulders', 'front') 
                  ? 'url(#primaryMuscle-front)' 
                  : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="185" 
              cy="125" 
              rx="28" 
              ry="35" 
              fill={isMuscleActive('front-delts', 'front') || isMuscleActive('shoulders', 'front')
                ? (isPrimaryMuscle('front-delts', 'front') || isPrimaryMuscle('shoulders', 'front')
                  ? 'url(#primaryMuscle-front)' 
                  : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />

            {/* Chest - Pectoralis Major */}
            <ellipse 
              cx="130" 
              cy="155" 
              rx="32" 
              ry="42" 
              fill={isMuscleActive('chest', 'front') || isMuscleActive('upper-chest', 'front')
                ? (isPrimaryMuscle('chest', 'front') || isPrimaryMuscle('upper-chest', 'front')
                  ? 'url(#primaryMuscle-front)' 
                  : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="170" 
              cy="155" 
              rx="32" 
              ry="42" 
              fill={isMuscleActive('chest', 'front') || isMuscleActive('upper-chest', 'front')
                ? (isPrimaryMuscle('chest', 'front') || isPrimaryMuscle('upper-chest', 'front')
                  ? 'url(#primaryMuscle-front)' 
                  : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />
            {/* Chest separation line */}
            <line x1="150" y1="125" x2="150" y2="190" stroke="#4b5563" strokeWidth="2" opacity="0.3" />

            {/* Serratus Anterior */}
            <g opacity="0.8">
              <path 
                d="M 110 175 Q 105 185 108 195 L 112 200" 
                stroke={isMuscleActive('serratus', 'front') ? '#dc2626' : '#9ca3af'} 
                strokeWidth="4" 
                fill="none"
              />
              <path 
                d="M 190 175 Q 195 185 192 195 L 188 200" 
                stroke={isMuscleActive('serratus', 'front') ? '#dc2626' : '#9ca3af'} 
                strokeWidth="4" 
                fill="none"
              />
            </g>

            {/* Biceps */}
            <ellipse 
              cx="105" 
              cy="185" 
              rx="16" 
              ry="38" 
              fill={isMuscleActive('biceps', 'front')
                ? (isPrimaryMuscle('biceps', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="195" 
              cy="185" 
              rx="16" 
              ry="38" 
              fill={isMuscleActive('biceps', 'front')
                ? (isPrimaryMuscle('biceps', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />

            {/* Abs - Rectus Abdominis (6-pack) */}
            <g>
              {/* Left column */}
              <rect 
                x="130" 
                y="205" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              <rect 
                x="130" 
                y="235" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              <rect 
                x="130" 
                y="265" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              
              {/* Right column */}
              <rect 
                x="152" 
                y="205" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              <rect 
                x="152" 
                y="235" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              <rect 
                x="152" 
                y="265" 
                width="18" 
                height="24" 
                rx="4" 
                fill={isMuscleActive('abs', 'front') || isMuscleActive('core', 'front')
                  ? (isPrimaryMuscle('abs', 'front') || isPrimaryMuscle('core', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
            </g>

            {/* Obliques */}
            <path 
              d="M 118 215 Q 108 240 112 270" 
              stroke={isMuscleActive('obliques', 'front') ? '#dc2626' : '#9ca3af'} 
              strokeWidth="14" 
              fill="none"
              opacity="0.7"
              filter="url(#highlight3D)"
            />
            <path 
              d="M 182 215 Q 192 240 188 270" 
              stroke={isMuscleActive('obliques', 'front') ? '#dc2626' : '#9ca3af'} 
              strokeWidth="14" 
              fill="none"
              opacity="0.7"
              filter="url(#highlight3D)"
            />

            {/* Forearms */}
            <ellipse 
              cx="100" 
              cy="245" 
              rx="12" 
              ry="35" 
              fill={isMuscleActive('forearms', 'front')
                ? (isPrimaryMuscle('forearms', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="200" 
              cy="245" 
              rx="12" 
              ry="35" 
              fill={isMuscleActive('forearms', 'front')
                ? (isPrimaryMuscle('forearms', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              filter="url(#highlight3D)"
            />

            {/* Quadriceps (4 heads visible) */}
            <g>
              {/* Left leg */}
              <ellipse 
                cx="135" 
                cy="380" 
                rx="22" 
                ry="70" 
                fill={isMuscleActive('quads', 'front')
                  ? (isPrimaryMuscle('quads', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              {/* Quad separation lines */}
              <line x1="135" y1="320" x2="135" y2="440" stroke="#4b5563" strokeWidth="2" opacity="0.3" />
              <line x1="125" y1="330" x2="125" y2="430" stroke="#4b5563" strokeWidth="1.5" opacity="0.25" />
              
              {/* Right leg */}
              <ellipse 
                cx="165" 
                cy="380" 
                rx="22" 
                ry="70" 
                fill={isMuscleActive('quads', 'front')
                  ? (isPrimaryMuscle('quads', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                  : 'url(#inactiveMuscle-front)'}
                filter="url(#highlight3D)"
              />
              <line x1="165" y1="320" x2="165" y2="440" stroke="#4b5563" strokeWidth="2" opacity="0.3" />
              <line x1="175" y1="330" x2="175" y2="430" stroke="#4b5563" strokeWidth="1.5" opacity="0.25" />
            </g>

            {/* Adductors (inner thigh) */}
            <ellipse 
              cx="150" 
              cy="340" 
              rx="10" 
              ry="35" 
              fill={isMuscleActive('adductors', 'front')
                ? (isPrimaryMuscle('adductors', 'front') ? 'url(#primaryMuscle-front)' : 'url(#secondaryMuscle-front)') 
                : 'url(#inactiveMuscle-front)'}
              opacity="0.6"
              filter="url(#highlight3D)"
            />

            {/* Tibialis Anterior (shin) */}
            <ellipse cx="135" cy="500" rx="10" ry="45" fill="url(#inactiveMuscle-front)" opacity="0.7" filter="url(#highlight3D)" />
            <ellipse cx="165" cy="500" rx="10" ry="45" fill="url(#inactiveMuscle-front)" opacity="0.7" filter="url(#highlight3D)" />
          </g>
        ) : (
          // BACK VIEW
          <g filter="url(#depth3D)">
            {/* Head */}
            <ellipse cx="150" cy="50" rx="28" ry="35" fill="url(#skinTone-back)" opacity="0.9" />
            <circle cx="150" cy="48" r="24" fill="#e5e7eb" opacity="0.8" />

            {/* Neck */}
            <rect x="138" y="80" width="24" height="30" rx="6" fill="url(#skinTone-back)" opacity="0.85" />

            {/* Trapezius (upper back) */}
            <path 
              d="M 115 110 Q 125 100 150 105 Q 175 100 185 110 L 180 140 Q 150 135 120 140 Z" 
              fill={isMuscleActive('traps', 'back')
                ? (isPrimaryMuscle('traps', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Rear Deltoids */}
            <ellipse 
              cx="115" 
              cy="130" 
              rx="26" 
              ry="32" 
              fill={isMuscleActive('rear-delts', 'back') || isMuscleActive('shoulders', 'back')
                ? (isPrimaryMuscle('rear-delts', 'back') || isPrimaryMuscle('shoulders', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="185" 
              cy="130" 
              rx="26" 
              ry="32" 
              fill={isMuscleActive('rear-delts', 'back') || isMuscleActive('shoulders', 'back')
                ? (isPrimaryMuscle('rear-delts', 'back') || isPrimaryMuscle('shoulders', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Latissimus Dorsi (lats) */}
            <path 
              d="M 120 155 Q 105 165 100 190 L 105 230 Q 115 245 130 250 L 135 200 Z" 
              fill={isMuscleActive('lats', 'back')
                ? (isPrimaryMuscle('lats', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <path 
              d="M 180 155 Q 195 165 200 190 L 195 230 Q 185 245 170 250 L 165 200 Z" 
              fill={isMuscleActive('lats', 'back')
                ? (isPrimaryMuscle('lats', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Rhomboids / Mid back */}
            <rect 
              x="130" 
              y="145" 
              width="40" 
              height="50" 
              rx="8" 
              fill={isMuscleActive('upper-back', 'back')
                ? (isPrimaryMuscle('upper-back', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            {/* Spine line */}
            <line x1="150" y1="110" x2="150" y2="290" stroke="#4b5563" strokeWidth="2.5" opacity="0.3" />

            {/* Triceps */}
            <ellipse 
              cx="105" 
              cy="175" 
              rx="14" 
              ry="35" 
              fill={isMuscleActive('triceps', 'back')
                ? (isPrimaryMuscle('triceps', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="195" 
              cy="175" 
              rx="14" 
              ry="35" 
              fill={isMuscleActive('triceps', 'back')
                ? (isPrimaryMuscle('triceps', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Lower Back - Erector Spinae */}
            <ellipse 
              cx="150" 
              cy="240" 
              rx="35" 
              ry="45" 
              fill={isMuscleActive('lower-back', 'back')
                ? (isPrimaryMuscle('lower-back', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Forearms (back view) */}
            <ellipse 
              cx="100" 
              cy="230" 
              rx="11" 
              ry="32" 
              fill={isMuscleActive('forearms', 'back')
                ? (isPrimaryMuscle('forearms', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="200" 
              cy="230" 
              rx="11" 
              ry="32" 
              fill={isMuscleActive('forearms', 'back')
                ? (isPrimaryMuscle('forearms', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Gluteus Maximus */}
            <ellipse 
              cx="135" 
              cy="310" 
              rx="24" 
              ry="32" 
              fill={isMuscleActive('glutes', 'back')
                ? (isPrimaryMuscle('glutes', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="165" 
              cy="310" 
              rx="24" 
              ry="32" 
              fill={isMuscleActive('glutes', 'back')
                ? (isPrimaryMuscle('glutes', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />

            {/* Hamstrings */}
            <ellipse 
              cx="135" 
              cy="395" 
              rx="20" 
              ry="65" 
              fill={isMuscleActive('hamstrings', 'back')
                ? (isPrimaryMuscle('hamstrings', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="165" 
              cy="395" 
              rx="20" 
              ry="65" 
              fill={isMuscleActive('hamstrings', 'back')
                ? (isPrimaryMuscle('hamstrings', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            {/* Hamstring separation */}
            <line x1="135" y1="345" x2="135" y2="450" stroke="#4b5563" strokeWidth="1.5" opacity="0.3" />
            <line x1="165" y1="345" x2="165" y2="450" stroke="#4b5563" strokeWidth="1.5" opacity="0.3" />

            {/* Calves - Gastrocnemius */}
            <ellipse 
              cx="135" 
              cy="505" 
              rx="18" 
              ry="50" 
              fill={isMuscleActive('calves', 'back')
                ? (isPrimaryMuscle('calves', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
            <ellipse 
              cx="165" 
              cy="505" 
              rx="18" 
              ry="50" 
              fill={isMuscleActive('calves', 'back')
                ? (isPrimaryMuscle('calves', 'back') ? 'url(#primaryMuscle-back)' : 'url(#secondaryMuscle-back)') 
                : 'url(#inactiveMuscle-back)'}
              filter="url(#highlight3D)"
            />
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl" style={{ fontWeight: 700 }}>
          Muscle Anatomy
        </h3>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'both' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('both')}
            className={selectedView === 'both' ? 'bg-blue-600' : ''}
          >
            Both Views
          </Button>
          <Button
            variant={selectedView === 'front' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('front')}
            className={selectedView === 'front' ? 'bg-blue-600' : ''}
          >
            Front
          </Button>
          <Button
            variant={selectedView === 'back' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('back')}
            className={selectedView === 'back' ? 'bg-blue-600' : ''}
          >
            Back
          </Button>
        </div>
      </div>

      {/* 3D Muscle Diagrams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {(selectedView === 'both' || selectedView === 'front') && (
          <div className="space-y-3">
            <h4 className="text-center text-sm text-gray-600" style={{ fontWeight: 600 }}>
              FRONT VIEW
            </h4>
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-300">
              {render3DFigure('front')}
            </div>
          </div>
        )}
        
        {(selectedView === 'both' || selectedView === 'back') && (
          <div className="space-y-3">
            <h4 className="text-center text-sm text-gray-600" style={{ fontWeight: 600 }}>
              BACK VIEW
            </h4>
            <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-300">
              {render3DFigure('back')}
            </div>
          </div>
        )}
      </div>

      {/* Exercise Info */}
      <div className="space-y-4 border-t-2 border-gray-200 pt-6">
        <div>
          <h4 className="text-xl mb-2" style={{ fontWeight: 700 }}>
            {exerciseName}
          </h4>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Equipment */}
        <div>
          <span className="text-sm text-gray-500" style={{ fontWeight: 600 }}>Equipment:</span>
          <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 px-3 py-1">
            {equipment}
          </Badge>
        </div>

        {/* Target Muscles */}
        <div>
          <span className="text-sm text-gray-500 mb-2 block" style={{ fontWeight: 600 }}>
            Target Muscles:
          </span>
          <div className="flex flex-wrap gap-2">
            {primaryMuscles.map((muscle, idx) => (
              <Badge 
                key={idx}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white border-0 px-3 py-1 shadow-lg shadow-red-500/30"
              >
                {muscle}
              </Badge>
            ))}
            {secondaryMuscles.map((muscle, idx) => (
              <Badge 
                key={idx}
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-0 px-3 py-1 shadow-lg shadow-orange-500/30"
              >
                {muscle}
              </Badge>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-sm pt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/50"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Secondary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
            <span className="text-gray-700" style={{ fontWeight: 600 }}>Inactive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
