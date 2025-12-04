/**
 * WorkoutExerciseDetailPage
 * 
 * Comprehensive exercise detail pages with 3D muscle maps and video placeholders.
 * Replaces the old modal/popout system with full-page navigation.
 * 
 * Features:
 * - Hero section with video placeholder (16:9) and summary card
 * - 3D Muscle Map with color-coded legends: Primary (red), Secondary (orange), Stabilizers (yellow)
 * - Step-by-step instructions with accordion UI
 * - Common mistakes and coaching cues
 * - Programming guide by level (Beginner/Intermediate/Advanced)
 * - Safety & mobility tips with contraindications
 * - Related exercises with navigation
 * - Breadcrumb navigation: Workouts › {Muscle} › {Exercise}
 * 
 * Routes: /exercise/[exercise-slug]
 * Examples: /exercise/barbell-squat, /exercise/bench-press, /exercise/deadlift
 * 
 * Version: M2Fitness v16.4 (All Exercises → Full Detail Pages + Linked Related Exercises, No ComingSoon)
 */

import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Home, 
  Dumbbell, 
  TrendingUp, 
  User, 
  LogOut, 
  Utensils,  
  ArrowLeft, 
  Play, 
  Heart, 
  Share2,
  RotateCw,
  Users,
  AlertCircle,
  CheckCircle2,
  Target,
  Activity
} from 'lucide-react';
import benchVideo from '../assets/bench-press.mp4';
import cableFlyesVideo from '../assets/Cable-flyes.mp4';
import dipsVideo from '../assets/Dips.mp4';
import dumbbellPressVideo from '../assets/Dumbbell_press.mp4';
import dumbbellFlyesVideo from '../assets/Dumbell-flyes.mp4';
import inclineBenchVideo from '../assets/Incline-bench-press.mp4';
import inclineDumbbellVideo from '../assets/Incline-dumbbell-press.mp4';
import pushupsVideo from '../assets/Push-ups.mp4';
import arnoldPressVideo from '../assets/Arnold-Press.mp4';
import barbellBackSquatVideo from '../assets/Barbell-Back-Squat.mp4';
import barbellRowVideo from '../assets/Barbell-Row.mp4';
import bicepCurlsVideo from '../assets/Bicep-Curls.mp4';
import burpeesVideo from '../assets/Burpees.mp4';
import calfRaisesVideo from '../assets/Calf-Raises.mp4';
import crunchesVideo from '../assets/Crunches.mp4';
import facePullsVideo from '../assets/Face-Pulls.mp4';
import frontRaisesVideo from '../assets/Front-Raises.mp4';
import hammerCurlVideo from '../assets/Hammer-Curl.mp4';
import hangingLegRaisesVideo from '../assets/Hanging-Leg-Raises.mp4';
import latPulldownVideo from '../assets/Lat-Pulldown.mp4';
import lateralRaiseVideo from '../assets/Lateral-Raise.mp4';
import legCurlVideo from '../assets/Leg-Curl.mp4';
import legExtensionVideo from '../assets/Leg-Extension.mp4';
import legPressVideo from '../assets/Leg-Press.mp4';
import lungesVideo from '../assets/Lunges.mp4';
import overheadPressVideo from '../assets/Overhead-Press.mp4';
import overheadTricepExtensionVideo from '../assets/Overhead-Tricep-Extension.mp4';
import plankVideo from '../assets/Plank.mp4';
import pullUpsVideo from '../assets/Pull-Ups.mp4';
import romanianDeadliftVideo from '../assets/Romanian-Deadlift.mp4';
import russianTwistsVideo from '../assets/Russian-Twists.mp4';
import skullCrushersVideo from '../assets/Skull-Crushers.mp4';
import tricepPushdownVideo from '../assets/Tricep-Pushdown.mp4';
import uprightRowVideo from '../assets/Upright-Row.mp4';
import seatedCableRowVideo from '../assets/Seated-cabel-Row.mp4';
import tBarRowVideo from '../assets/T-Bar-Rrow.mp4';
import singleArmDumbbellRowVideo from '../assets/Single-Arm-Dumbbell-Row.mp4';
import bulgarianSplitSquatVideo from '../assets/bulgarian-split-squat.mp4';
import preacherCurlsVideo from '../assets/preacher-curls.mp4';
import pendlayRowVideo from '../assets/pendlay-row.mp4';
import chinUpsVideo from '../assets/Chin-Ups.mp4';
import assistedPullUpVideo from '../assets/assisted-pull-up.mp4';
import reverseLungeVideo from '../assets/reverse-lunge.mp4';
import stepUpsVideo from '../assets/step-ups.mp4';
import mountainClimbersVideo from '../assets/mountain-climbers.mp4';
import cableCrunchesVideo from '../assets/cable-crunches.mp4';
import abWheelRolloutVideo from '../assets/ab-wheel-rollout.mp4';
import kettlebellSwingsVideo from '../assets/kettlebell-swings.mp4';


import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import MuscleProjectionView from './MuscleProjectionView';
import AnimatedExerciseDemo from './AnimatedExerciseDemo';
import Realistic3DMuscleView from './Realistic3DMuscleView';
import MuscleAnatomyViewer from './MuscleAnatomyViewer';

// Exercise data interface
interface ExerciseDetail {
  id: string;
  name: string;
  slug: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  equipment: string;
  mechanics: 'Compound' | 'Isolation';
  targetAreas: string[];
  sets: number;
  reps: string;
  rest: string;
  videoUrl: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  stabilizers: string[];
  howToPerform: string[];
  commonMistakes: string[];
  coachingCues: string[];
  programmingGuide: {
    beginner: { sets: number; reps: string; rest: string };
    intermediate: { sets: number; reps: string; rest: string };
    advanced: { sets: number; reps: string; rest: string };
  };
  warmupTips: string[];
  contraindications: string[];
  relatedExercises: { name: string; slug: string; image: string }[];
}

// Exercise database - comprehensive data for each exercise
const exerciseDatabase: { [key: string]: ExerciseDetail } = {
  'barbell-squat': {
    id: 'ex-1',
    name: 'Barbell Back Squat',
    slug: 'barbell-squat',
    level: 'intermediate',
    equipment: 'Barbell, Rack',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes', 'Core'],
    sets: 4,
    reps: '10',
    rest: '90s',
    videoUrl: barbellBackSquatVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Erector Spinae', 'Adductors'],
    stabilizers: ['Core (Rectus Abdominis)', 'Obliques', 'Calves'],
    howToPerform: [
      'Rack bar just below shoulder height; step under, bar on upper traps (not neck)',
      'Unrack, step back 2-3 steps, feet shoulder-width apart, toes slightly out (15-30°)',
      'Take a deep breath, brace your core tight, and sit your hips back and down',
      'Keep knees tracking over toes; descend to parallel or below as mobility allows',
      'Drive through mid-foot, push knees out, stand tall without locking knees at top',
      'Exhale at top, re-brace for next rep; maintain neutral spine throughout'
    ],
    commonMistakes: [
      'Knee cave (valgus collapse) - keep knees pushed out',
      'Heel lift - weight should be mid-foot, not on toes',
      'Lumbar rounding (butt wink) - stop descent where back stays neutral',
      'Bouncing at bottom - control the movement',
      'Looking up or down - maintain neutral neck position'
    ],
    coachingCues: [
      '"Spread the floor with your feet"',
      '"Chest up, elbows under the bar"',
      '"Sit back into a chair"',
      '"Drive through your heels"',
      '"Squeeze glutes at the top"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 5, reps: '5', rest: '150s' }
    },
    warmupTips: [
      'Start with bodyweight squats for 2 sets of 10 reps',
      'Hip flexor stretches and ankle mobility drills',
      'Warm up with empty bar, then gradually add weight',
      'Dynamic leg swings and glute activation exercises'
    ],
    contraindications: [
      'Lower back injuries - consult trainer for modifications',
      'Knee pain - reduce depth or use box squats',
      'Mobility limitations - work on flexibility first'
    ],
    relatedExercises: [
      { name: 'Front Squat', slug: 'front-squat', image: 'https://images.unsplash.com/photo-1657289244708-a4d379018991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBmb3JtJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Romanian Deadlift', slug: 'romanian-deadlift', image: 'https://images.unsplash.com/photo-1545612036-2872840642dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bulgarian Split Squat', slug: 'bulgarian-split-squat', image: 'https://images.unsplash.com/photo-1657289244708-a4d379018991?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBmb3JtJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'bench-press': {
    id: 'ex-2',
    name: 'Barbell Bench Press',
    slug: 'bench-press',
    level: 'intermediate',
    equipment: 'Barbell, Bench',
    mechanics: 'Compound',
    targetAreas: ['Chest', 'Shoulders', 'Triceps'],
    sets: 4,
    reps: '8-10',
    rest: '120s',
    videoUrl: benchVideo,
    primaryMuscles: ['Pectoralis Major', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Serratus Anterior'],
    stabilizers: ['Core (Rectus Abdominis)', 'Lats', 'Rotator Cuff'],
    howToPerform: [
      'Lie flat on bench, eyes under the bar, feet flat on floor',
      'Grip bar slightly wider than shoulder-width, thumbs around bar (not false grip)',
      'Unrack bar with straight arms, position over mid-chest',
      'Lower bar with control to lower chest, elbows at 45-75° from body',
      'Touch chest lightly (don\'t bounce), then press bar back to starting position',
      'Keep shoulder blades retracted, slight arch in lower back, glutes on bench'
    ],
    commonMistakes: [
      'Flaring elbows too wide (increases shoulder strain)',
      'Bouncing bar off chest',
      'Lifting hips off bench',
      'Not using full range of motion',
      'Uneven bar path or uneven press'
    ],
    coachingCues: [
      '"Retract and depress shoulder blades"',
      '"Bend the bar" (creates lat tension)',
      '"Drive through the floor with your legs"',
      '"Bar path should be slightly diagonal"',
      '"Squeeze the bar tight"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 5, reps: '5', rest: '180s' }
    },
    warmupTips: [
      'Shoulder dislocations with band or PVC pipe',
      'Light dumbbell presses for 2 sets of 15',
      'Empty bar warm-up for technique',
      'Band pull-aparts for rear delts'
    ],
    contraindications: [
      'Shoulder impingement - use dumbbells instead',
      'Rotator cuff injuries - reduce weight and range',
      'Wrist pain - use wrist wraps and proper grip'
    ],
    relatedExercises: [
      { name: 'Incline Bench Press', slug: 'incline-bench-press', image: 'https://images.unsplash.com/photo-1651346847980-ab1c883e8cc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwZ3ltJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dumbbell Chest Press', slug: 'dumbbell-chest-press', image: 'https://images.unsplash.com/photo-1651346847980-ab1c883e8cc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwZ3ltJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Cable Chest Fly', slug: 'cable-chest-fly', image: 'https://images.unsplash.com/photo-1651346847980-ab1c883e8cc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwZ3ltJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY1OTc5fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'deadlift': {
    id: 'ex-3',
    name: 'Conventional Deadlift',
    slug: 'deadlift',
    level: 'intermediate',
    equipment: 'Barbell, Plates',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Glutes', 'Hamstrings'],
    sets: 4,
    reps: '6-8',
    rest: '150s',
    videoUrl: romanianDeadliftVideo,
    primaryMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Hamstrings'],
    secondaryMuscles: ['Quadriceps', 'Lats', 'Trapezius'],
    stabilizers: ['Core (full)', 'Forearms', 'Grip'],
    howToPerform: [
      'Stand with feet hip-width, bar over mid-foot (shoelaces)',
      'Hinge at hips, grip bar just outside legs, shoulders over bar',
      'Drop hips slightly, chest up, neutral spine, take slack out of bar',
      'Take deep breath, brace core hard, pull bar straight up close to shins',
      'Drive through floor with legs, extend hips and knees simultaneously',
      'Stand tall at top (don\'t lean back), then reverse movement with control'
    ],
    commonMistakes: [
      'Rounding lower back - maintain neutral spine',
      'Bar drifting away from body',
      'Squatting the deadlift (hips too low)',
      'Jerking or yanking the bar',
      'Hyperextending at lockout'
    ],
    coachingCues: [
      '"Push the floor away"',
      '"Drag the bar up your shins"',
      '"Hips and shoulders rise together"',
      '"Lock it out with glutes, not lower back"',
      '"Pull the slack out first"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-10', rest: '120s' },
      intermediate: { sets: 4, reps: '6-8', rest: '150s' },
      advanced: { sets: 5, reps: '3-5', rest: '180s' }
    },
    warmupTips: [
      'Cat-cow stretches for spinal mobility',
      'Hip hinges with PVC pipe to practice form',
      'Light RDLs to activate hamstrings',
      'Gradually build up weight with multiple warm-up sets'
    ],
    contraindications: [
      'Lower back issues - use trap bar or sumo stance',
      'Grip weakness - use straps or mixed grip temporarily',
      'Hamstring flexibility issues - elevate bar on blocks'
    ],
    relatedExercises: [
      { name: 'Romanian Deadlift', slug: 'romanian-deadlift', image: 'https://images.unsplash.com/photo-1545612036-2872840642dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Trap Bar Deadlift', slug: 'trap-bar-deadlift', image: 'https://images.unsplash.com/photo-1545612036-2872840642dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Sumo Deadlift', slug: 'sumo-deadlift', image: 'https://images.unsplash.com/photo-1545612036-2872840642dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjU5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'overhead-press': {
    id: 'ex-4',
    name: 'Overhead Press (Military Press)',
    slug: 'overhead-press',
    level: 'intermediate',
    equipment: 'Barbell, Rack',
    mechanics: 'Compound',
    targetAreas: ['Shoulders', 'Triceps', 'Core'],
    sets: 4,
    reps: '8-10',
    rest: '120s',
    videoUrl: overheadPressVideo,
    primaryMuscles: ['Anterior Deltoids', 'Lateral Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Upper Chest', 'Trapezius'],
    stabilizers: ['Core (Full)', 'Serratus Anterior', 'Rotator Cuff'],
    howToPerform: [
      'Stand with feet shoulder-width apart, bar racked at upper chest height',
      'Grip bar just outside shoulders, elbows slightly forward of bar',
      'Unrack and step back, bar resting on front delts/upper chest',
      'Take a breath, brace core, press bar straight overhead in line with ears',
      'Lock out arms fully at top without hyperextending back',
      'Lower bar with control back to upper chest, maintaining tension'
    ],
    commonMistakes: [
      'Excessive back arch (lean back) - keep core tight and ribs down',
      'Pressing in front of head instead of straight up',
      'Not achieving full lockout at top',
      'Lack of leg drive or stability',
      'Flaring elbows out too wide on descent'
    ],
    coachingCues: [
      '"Squeeze your glutes and brace your core"',
      '"Push your head through at the top"',
      '"Bar path should be straight up"',
      '"Active shoulders - push up into the bar"',
      '"Think: push the ceiling away"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 5, reps: '5', rest: '150s' }
    },
    warmupTips: [
      'Shoulder dislocations with band for 2 sets of 15',
      'Face pulls to activate rear delts',
      'Empty bar overhead presses for 2 sets of 10',
      'Thoracic spine mobility exercises'
    ],
    contraindications: [
      'Shoulder impingement - use dumbbells or reduce range',
      'Lower back pain - check core bracing technique',
      'Wrist discomfort - adjust grip width'
    ],
    relatedExercises: [
      { name: 'Dumbbell Shoulder Press', slug: 'dumbbell-shoulder-press', image: 'https://images.unsplash.com/photo-1597452329152-52f9eee96576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Push Press', slug: 'push-press', image: 'https://images.unsplash.com/photo-1597452329152-52f9eee96576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lateral Raises', slug: 'lateral-raises', image: 'https://images.unsplash.com/photo-1597452329152-52f9eee96576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'barbell-row': {
    id: 'ex-5',
    name: 'Barbell Row (Bent-Over Row)',
    slug: 'barbell-row',
    level: 'intermediate',
    equipment: 'Barbell',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Lats', 'Biceps'],
    sets: 4,
    reps: '8-10',
    rest: '120s',
    videoUrl: barbellRowVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoids', 'Erector Spinae'],
    stabilizers: ['Core (Full)', 'Forearms', 'Lower Back'],
    howToPerform: [
      'Stand with feet hip-width, hinge at hips until torso ~45° angle',
      'Grip bar slightly wider than shoulder-width, arms hanging straight',
      'Keep neutral spine, chest up, core braced throughout',
      'Pull bar to lower chest/upper abs, driving elbows back and up',
      'Squeeze shoulder blades together at top of movement',
      'Lower bar with control, maintaining torso angle and tension'
    ],
    commonMistakes: [
      'Standing too upright (reduces lat engagement)',
      'Using momentum or "humping" the weight up',
      'Rounding lower back',
      'Pulling with arms only, not engaging back',
      'Not achieving full scapular retraction'
    ],
    coachingCues: [
      '"Pull to your belly button"',
      '"Lead with your elbows, not your hands"',
      '"Squeeze your shoulder blades together"',
      '"Keep your back flat like a table"',
      '"Think: row the bar into your hips"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 5, reps: '6-8', rest: '150s' }
    },
    warmupTips: [
      'Band pull-aparts for 2 sets of 20',
      'Scapular retraction drills (no weight)',
      'Light dumbbell rows for 2 sets of 12',
      'Cat-cow stretches for spine mobility'
    ],
    contraindications: [
      'Lower back pain - use chest-supported row machine',
      'Shoulder issues - adjust grip width or use dumbbells',
      'Grip fatigue - use straps for heavier sets'
    ],
    relatedExercises: [
      { name: 'Pendlay Row', slug: 'pendlay-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'T-Bar Row', slug: 't-bar-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Seated Cable Row', slug: 'seated-cable-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'pull-up': {
    id: 'ex-6',
    name: 'Pull-Up',
    slug: 'pull-up',
    level: 'intermediate',
    equipment: 'Pull-Up Bar',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Lats', 'Biceps'],
    sets: 4,
    reps: '8-12',
    rest: '120s',
    videoUrl: pullUpsVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['Biceps Brachii', 'Rhomboids', 'Trapezius', 'Rear Deltoids'],
    stabilizers: ['Core (Full)', 'Forearms', 'Grip'],
    howToPerform: [
      'Hang from bar with overhand grip, hands slightly wider than shoulders',
      'Start from dead hang with arms fully extended, shoulders engaged (not relaxed)',
      'Take a breath, brace core, pull yourself up by driving elbows down',
      'Pull until chin clears bar, chest towards bar',
      'Lower with control back to dead hang, maintaining shoulder engagement',
      'Avoid swinging or kipping unless training specifically for that'
    ],
    commonMistakes: [
      'Using momentum or swinging (kipping inappropriately)',
      'Not achieving full range of motion (partial reps)',
      'Shrugging shoulders at bottom (losing shoulder engagement)',
      'Looking up excessively (neck strain)',
      'Not controlling the descent'
    ],
    coachingCues: [
      '"Pull your elbows to your hips"',
      '"Chest to bar, not chin to bar"',
      '"Depress and retract shoulder blades"',
      '"Imagine crushing a can in your armpits"',
      '"Control the negative (lowering)"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '5-8 (or assisted)', rest: '120s' },
      intermediate: { sets: 4, reps: '8-12', rest: '120s' },
      advanced: { sets: 5, reps: '12-15 (or weighted)', rest: '150s' }
    },
    warmupTips: [
      'Scapular pull-ups (just shoulder blade movement)',
      'Dead hangs for 20-30 seconds',
      'Lat pulldowns for 2 sets of 12',
      'Band-assisted pull-ups to groove pattern'
    ],
    contraindications: [
      'Shoulder impingement - use neutral grip or reduce range',
      'Elbow pain - check grip width and wrist position',
      'Insufficient strength - use assistance bands or machine'
    ],
    relatedExercises: [
      { name: 'Chin-Up', slug: 'chin-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lat Pulldown', slug: 'lat-pulldown', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Assisted Pull-Up', slug: 'assisted-pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  'lunge': {
    id: 'ex-7',
    name: 'Walking Lunge',
    slug: 'lunge',
    level: 'beginner',
    equipment: 'Dumbbells (optional)',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes', 'Core'],
    sets: 3,
    reps: '10 each leg',
    rest: '90s',
    videoUrl: lungesVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Hip Flexors'],
    stabilizers: ['Core (Full)', 'Hip Stabilizers', 'Adductors'],
    howToPerform: [
      'Stand tall with feet hip-width, dumbbells at sides (or bodyweight)',
      'Step forward with right leg, landing heel-first',
      'Lower hips until both knees are bent at ~90°, back knee hovering above ground',
      'Front knee should track over toes, not collapse inward',
      'Drive through front heel to stand, bring back leg forward into next lunge',
      'Alternate legs, maintaining upright torso and core engagement'
    ],
    commonMistakes: [
      'Knee caving inward (valgus collapse)',
      'Front knee going too far past toes',
      'Leaning forward excessively',
      'Taking too short of a step',
      'Not going deep enough (partial range)'
    ],
    coachingCues: [
      '"Step out like you mean it"',
      '"Keep your torso tall and proud"',
      '"Drive through your front heel"',
      '"Knees track over your toes"',
      '"Control the descent, power the ascent"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10 each leg', rest: '90s' },
      intermediate: { sets: 4, reps: '12 each leg', rest: '90s' },
      advanced: { sets: 4, reps: '15 each leg (with weight)', rest: '120s' }
    },
    warmupTips: [
      'Leg swings (forward/back and side-to-side)',
      'Bodyweight lunges for 2 sets of 8',
      'Hip flexor stretches',
      'Glute activation with bands'
    ],
    contraindications: [
      'Knee pain - reduce depth or use static lunges',
      'Balance issues - hold onto support initially',
      'Hip mobility restrictions - work on flexibility first'
    ],
    relatedExercises: [
      { name: 'Reverse Lunge', slug: 'reverse-lunge', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bulgarian Split Squat', slug: 'bulgarian-split-squat', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Step-Ups', slug: 'step-ups', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== CHEST EXERCISES =====
  'push-up': {
    id: 'ex-8',
    name: 'Push-Up',
    slug: 'push-up',
    level: 'beginner',
    equipment: 'Bodyweight',
    mechanics: 'Compound',
    targetAreas: ['Chest', 'Triceps', 'Shoulders'],
    sets: 3,
    reps: '10-15',
    rest: '60s',
    videoUrl: pushupsVideo,
    primaryMuscles: ['Pectoralis Major', 'Anterior Deltoid', 'Triceps Brachii'],
    secondaryMuscles: ['Serratus Anterior', 'Core'],
    stabilizers: ['Rotator Cuff', 'Core (Full)', 'Glutes'],
    howToPerform: [
      'Start in high plank position, hands shoulder-width apart',
      'Body forms straight line from head to heels, core engaged',
      'Lower chest toward ground by bending elbows at 45° angle',
      'Descend until chest is 1-2 inches from floor',
      'Push through palms to return to starting position',
      'Maintain neutral spine throughout entire movement'
    ],
    commonMistakes: [
      'Hips sagging or piking up',
      'Elbows flaring out too wide (>45°)',
      'Not going deep enough',
      'Head dropping or looking up',
      'Not engaging core'
    ],
    coachingCues: [
      '"Screw hands into floor"',
      '"Squeeze glutes to keep hips level"',
      '"Touch chest to floor"',
      '"Create one straight plank"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-12 (knees down if needed)', rest: '60s' },
      intermediate: { sets: 4, reps: '15-20', rest: '60s' },
      advanced: { sets: 5, reps: '25-30 (or add weight)', rest: '90s' }
    },
    warmupTips: [
      'Arm circles forward and backward',
      'Scapular push-ups (shoulder blade movement only)',
      'Incline push-ups on bench or wall',
      'Thoracic spine mobility exercises'
    ],
    contraindications: [
      'Wrist pain - use push-up bars or fist position',
      'Shoulder impingement - elevate hands or reduce range',
      'Lower back pain - regress to incline push-ups'
    ],
    relatedExercises: [
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dips', slug: 'dips', image: 'https://images.unsplash.com/photo-1758521959221-605fe3c6a22a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBzJTIwdHJpY2VwcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Incline Dumbbell Press', slug: 'incline-dumbbell-press', image: 'https://images.unsplash.com/photo-1745764338561-eef19b47526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsaW5lJTIwYmVuY2glMjBwcmVzc3xlbnwxfHx8fDE3NjIwNjczNTV8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'incline-dumbbell-press': {
    id: 'ex-9',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    level: 'intermediate',
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Upper Chest', 'Shoulders', 'Triceps'],
    sets: 4,
    reps: '8-12',
    rest: '90s',
    videoUrl: inclineDumbbellVideo,
    primaryMuscles: ['Upper Pectoralis Major (Clavicular Head)', 'Anterior Deltoid'],
    secondaryMuscles: ['Triceps Brachii', 'Middle Pectoralis'],
    stabilizers: ['Rotator Cuff', 'Serratus Anterior', 'Core'],
    howToPerform: [
      'Set bench to 30-45° incline (30° targets upper chest best)',
      'Sit with dumbbells resting on thighs, feet flat',
      'Kick dumbbells up to shoulder height as you lean back',
      'Start with dumbbells at chest level, palms forward',
      'Press dumbbells up and slightly inward until arms are extended',
      'Lower with control back to chest level, elbows at ~45° angle'
    ],
    commonMistakes: [
      'Bench angle too steep (>45° = shoulder dominant)',
      'Arching back excessively',
      'Pressing straight up instead of slight arc',
      'Elbows flaring too wide',
      'Not touching dumbbells at top'
    ],
    coachingCues: [
      '"Drive through your shoulder blades"',
      '"Touch the dumbbells at the top"',
      '"Control the descent"',
      '"Keep chest proud"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-12', rest: '90s' },
      advanced: { sets: 4, reps: '6-10 (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Shoulder dislocations with band',
      'Empty bar or light dumbbell presses for 2 sets',
      'Chest and shoulder stretches',
      'Scapular wall slides'
    ],
    contraindications: [
      'Shoulder impingement - reduce angle or use neutral grip',
      'Rotator cuff issues - lighten load and focus on form',
      'Lower back pain - ensure feet flat and core engaged'
    ],
    relatedExercises: [
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Cable Flyes', slug: 'cable-flyes', image: 'https://images.unsplash.com/photo-1623742077938-0ec2e5c34a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJsZSUyMGZseSUyMGNoZXN0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY3MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dumbbell Flyes', slug: 'dumbbell-flyes', image: 'https://images.unsplash.com/photo-1696165223999-9c64094f6950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW1iYmVsbCUyMGZseWVzJTIwY2hlc3R8ZW58MXx8fHwxNzYyMDY3MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'cable-flyes': {
    id: 'ex-10',
    name: 'Cable Flyes',
    slug: 'cable-flyes',
    level: 'intermediate',
    equipment: 'Cable Machine',
    mechanics: 'Isolation',
    targetAreas: ['Chest'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: cableFlyesVideo,
    primaryMuscles: ['Pectoralis Major (Sternal Head)'],
    secondaryMuscles: ['Anterior Deltoid'],
    stabilizers: ['Core', 'Rotator Cuff', 'Serratus Anterior'],
    howToPerform: [
      'Set cable pulleys to chest height or slightly higher',
      'Grab handles, step forward into split stance for stability',
      'Start with arms extended out to sides, slight bend in elbows',
      'Bring handles together in front of chest in hugging motion',
      'Squeeze chest at peak contraction for 1 second',
      'Slowly return to starting position with control'
    ],
    commonMistakes: [
      'Using too much weight and bending elbows excessively',
      'Not maintaining constant elbow angle',
      'Shrugging shoulders up',
      'Leaning forward too much',
      'Not controlling the eccentric (return)'
    ],
    coachingCues: [
      '"Hug a tree"',
      '"Lead with your elbows"',
      '"Squeeze like crushing a can"',
      '"Constant tension on chest"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20 (with dropsets)', rest: '75s' }
    },
    warmupTips: [
      'Chest openers and doorway stretches',
      'Light cable flyes with minimal weight',
      'Band pull-aparts',
      'Shoulder circles'
    ],
    contraindications: [
      'Shoulder pain - reduce range of motion',
      'Pec strain - use lighter weight and focus on control',
      'Balance issues - use bench support'
    ],
    relatedExercises: [
      { name: 'Dumbbell Flyes', slug: 'dumbbell-flyes', image: 'https://images.unsplash.com/photo-1696165223999-9c64094f6950?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW1iYmVsbCUyMGZseWVzJTIwY2hlc3R8ZW58MXx8fHwxNzYyMDY3MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'dumbbell-flyes': {
    id: 'ex-11',
    name: 'Dumbbell Flyes',
    slug: 'dumbbell-flyes',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Chest'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: dumbbellFlyesVideo,
    primaryMuscles: ['Pectoralis Major'],
    secondaryMuscles: ['Anterior Deltoid'],
    stabilizers: ['Rotator Cuff', 'Core', 'Serratus Anterior'],
    howToPerform: [
      'Lie flat on bench holding dumbbells above chest',
      'Palms facing each other, slight bend in elbows',
      'Lower dumbbells out to sides in wide arc',
      'Go until you feel stretch in chest (not below shoulder level)',
      'Reverse motion, bringing dumbbells back together above chest',
      'Maintain constant elbow angle throughout'
    ],
    commonMistakes: [
      'Straightening arms completely (puts stress on elbows)',
      'Going too deep and risking shoulder injury',
      'Using momentum instead of controlled movement',
      'Changing elbow angle during movement',
      'Using weight that\'s too heavy'
    ],
    coachingCues: [
      '"Imagine hugging a barrel"',
      '"Keep elbows locked at same angle"',
      '"Feel the stretch, not pain"',
      '"Squeeze at the top"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20', rest: '75s' }
    },
    warmupTips: [
      'Light band pull-aparts',
      'Arm circles and shoulder mobility',
      'Very light dumbbell flyes to groove pattern',
      'Chest stretches'
    ],
    contraindications: [
      'Shoulder pain - reduce range or switch to cables',
      'Pec strain - avoid entirely until healed',
      'Elbow issues - ensure proper bend maintained'
    ],
    relatedExercises: [
      { name: 'Cable Flyes', slug: 'cable-flyes', image: 'https://images.unsplash.com/photo-1623742077938-0ec2e5c34a5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJsZSUyMGZseSUyMGNoZXN0JTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY3MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Incline Dumbbell Press', slug: 'incline-dumbbell-press', image: 'https://images.unsplash.com/photo-1745764338561-eef19b47526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsaW5lJTIwYmVuY2glMjBwcmVzc3xlbnwxfHx8fDE3NjIwNjczNTV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'dips': {
    id: 'ex-12',
    name: 'Dips',
    slug: 'dips',
    level: 'advanced',
    equipment: 'Parallel Bars',
    mechanics: 'Compound',
    targetAreas: ['Chest', 'Triceps', 'Shoulders'],
    sets: 4,
    reps: '8-12',
    rest: '120s',
    videoUrl: dipsVideo,
    primaryMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoid'],
    secondaryMuscles: ['Serratus Anterior', 'Latissimus Dorsi'],
    stabilizers: ['Core', 'Rotator Cuff', 'Rhomboids'],
    howToPerform: [
      'Grip parallel bars and jump/press up to support position',
      'Lean forward slightly for chest emphasis (upright for triceps)',
      'Lower body by bending elbows until upper arms are parallel to ground',
      'Keep elbows at ~45° angle to body',
      'Press through palms to return to starting position',
      'Maintain core tension and avoid swinging'
    ],
    commonMistakes: [
      'Not going deep enough (partial range)',
      'Elbows flaring out too wide',
      'Shrugging shoulders up to ears',
      'Using momentum/swinging',
      'Leaning too far forward (shoulder stress)'
    ],
    coachingCues: [
      '"Depress your shoulder blades"',
      '"Think: slow down, explosive up"',
      '"Chest to hands"',
      '"Control every inch"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '5-8 (assisted)', rest: '120s' },
      intermediate: { sets: 4, reps: '8-12', rest: '120s' },
      advanced: { sets: 4, reps: '12-15 (or add weight)', rest: '150s' }
    },
    warmupTips: [
      'Shoulder dislocations with band',
      'Scapular depressions on bars',
      'Assisted dips or bench dips',
      'Dynamic chest and shoulder stretches'
    ],
    contraindications: [
      'Shoulder impingement - avoid or use limited range',
      'Elbow pain - reduce depth and check form',
      'Insufficient strength - use assistance or build up with push-ups'
    ],
    relatedExercises: [
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Tricep Pushdown', slug: 'tricep-pushdown', image: 'https://images.unsplash.com/photo-1741666998073-7df07563d4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmljZXAlMjBwdXNoZG93biUyMGNhYmxlfGVufDF8fHx8MTc2MjA2NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== BACK EXERCISES =====
  'lat-pulldown': {
    id: 'ex-13',
    name: 'Lat Pulldown',
    slug: 'lat-pulldown',
    level: 'beginner',
    equipment: 'Cable Machine',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Biceps'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: latPulldownVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major'],
    secondaryMuscles: ['Biceps Brachii', 'Rhomboids', 'Rear Deltoid'],
    stabilizers: ['Core', 'Lower Traps', 'Forearms'],
    howToPerform: [
      'Sit at lat pulldown machine, adjust thigh pad to secure legs',
      'Grab bar with wide overhand grip (wider than shoulders)',
      'Start with arms fully extended overhead, slight lean back',
      'Pull bar down to upper chest by driving elbows down and back',
      'Squeeze shoulder blades together at bottom',
      'Slowly return to starting position with control'
    ],
    commonMistakes: [
      'Leaning back too far (using momentum)',
      'Pulling bar behind neck (shoulder stress)',
      'Not achieving full range of motion',
      'Using biceps instead of back',
      'Rounding shoulders forward'
    ],
    coachingCues: [
      '"Drive your elbows to your hips"',
      '"Think: pull with your lats, not arms"',
      '"Chest to bar"',
      '"Slow and controlled"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-10 (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Hanging dead hangs for 20-30 seconds',
      'Band pull-aparts',
      'Light lat pulldowns to groove pattern',
      'Scapular retractions'
    ],
    contraindications: [
      'Shoulder impingement - use neutral grip attachment',
      'Elbow pain - reduce weight and check grip',
      'Lower back pain - ensure core is braced'
    ],
    relatedExercises: [
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Seated Cable Row', slug: 'seated-cable-row', image: 'https://images.unsplash.com/photo-1660772919175-c3ea340ff932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF0ZWQlMjBjYWJsZSUyMHJvd3xlbnwxfHx8fDE3NjIwNjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'seated-cable-row': {
    id: 'ex-14',
    name: 'Seated Cable Row',
    slug: 'seated-cable-row',
    level: 'beginner',
    equipment: 'Cable Machine',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Biceps'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: seatedCableRowVideo,
    primaryMuscles: ['Middle Trapezius', 'Rhomboids', 'Latissimus Dorsi'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoid', 'Erector Spinae'],
    stabilizers: ['Core', 'Lower Traps', 'Forearms'],
    howToPerform: [
      'Sit at cable row station, feet on platform, knees slightly bent',
      'Grab V-bar or straight bar attachment with neutral or overhand grip',
      'Start with arms extended, torso upright (slight forward lean)',
      'Pull handle to lower abdomen, driving elbows back',
      'Squeeze shoulder blades together at peak contraction',
      'Extend arms back to start with control, maintaining torso position'
    ],
    commonMistakes: [
      'Excessive torso rocking (using momentum)',
      'Rounding back at start or end position',
      'Shrugging shoulders up',
      'Not achieving full scapular retraction',
      'Pulling with arms instead of back'
    ],
    coachingCues: [
      '"Row to your belly button"',
      '"Pinch a pencil between shoulder blades"',
      '"Torso stays stable"',
      '"Pull elbows past your body"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '10-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-12 (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Band pull-aparts',
      'Scapular wall slides',
      'Light rows to establish mind-muscle connection',
      'Thoracic spine rotations'
    ],
    contraindications: [
      'Lower back pain - focus on core bracing',
      'Shoulder pain - adjust grip or handle attachment',
      'Bicep tendonitis - use lifting straps'
    ],
    relatedExercises: [
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'T-Bar Row', slug: 't-bar-row', image: 'https://images.unsplash.com/photo-1593640852822-a44850096f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0LWJhciUyMHJvdyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Single-Arm Dumbbell Row', slug: 'single-arm-dumbbell-row', image: 'https://images.unsplash.com/photo-1561541262-f4da9a22181d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBhcm0lMjBkdW1iYmVsbCUyMHJvd3xlbnwxfHx8fDE3NjIwNjczNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  't-bar-row': {
    id: 'ex-15',
    name: 'T-Bar Row',
    slug: 't-bar-row',
    level: 'intermediate',
    equipment: 'T-Bar Machine or Barbell',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Biceps'],
    sets: 4,
    reps: '8-10',
    rest: '120s',
    videoUrl: tBarRowVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoid', 'Erector Spinae'],
    stabilizers: ['Core', 'Lower Back', 'Forearms'],
    howToPerform: [
      'Straddle T-bar with feet shoulder-width apart',
      'Hinge at hips, grab handles with neutral or overhand grip',
      'Start with back flat, chest up, arms extended',
      'Pull handles toward chest, squeezing shoulder blades together',
      'Drive elbows back and slightly outward',
      'Lower with control to full arm extension'
    ],
    commonMistakes: [
      'Rounding lower back',
      'Using too much momentum/body English',
      'Not achieving full range of motion',
      'Shrugging shoulders instead of retracting scapulae',
      'Standing too upright (reduces lat engagement)'
    ],
    coachingCues: [
      '"Hinge from the hips"',
      '"Pull to your sternum"',
      '"Back flat like a table"',
      '"Squeeze your shoulder blades"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 4, reps: '6-8 (heavy)', rest: '150s' }
    },
    warmupTips: [
      'Cat-cow stretches',
      'Light dumbbell rows',
      'Hip hinge pattern practice',
      'Band pull-aparts'
    ],
    contraindications: [
      'Lower back issues - use chest-supported variation',
      'Shoulder impingement - adjust grip width',
      'Hip mobility limitations - elevate front foot'
    ],
    relatedExercises: [
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Seated Cable Row', slug: 'seated-cable-row', image: 'https://images.unsplash.com/photo-1660772919175-c3ea340ff932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF0ZWQlMjBjYWJsZSUyMHJvd3xlbnwxfHx8fDE3NjIwNjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Deadlift', slug: 'deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'single-arm-dumbbell-row': {
    id: 'ex-16',
    name: 'Single-Arm Dumbbell Row',
    slug: 'single-arm-dumbbell-row',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Biceps'],
    sets: 3,
    reps: '10-12 each arm',
    rest: '90s',
    videoUrl: singleArmDumbbellRowVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoid', 'Erector Spinae'],
    stabilizers: ['Core (Anti-Rotation)', 'Obliques', 'Forearms'],
    howToPerform: [
      'Place one knee and same-side hand on bench for support',
      'Other foot flat on floor, torso parallel to ground',
      'Grab dumbbell with free hand, arm hanging straight down',
      'Pull dumbbell up toward hip, driving elbow back',
      'Squeeze shoulder blade toward spine at top',
      'Lower with control to full extension, repeat for reps, then switch sides'
    ],
    commonMistakes: [
      'Rotating torso excessively',
      'Pulling with bicep instead of back',
      'Rounding lower back',
      'Not achieving full range of motion',
      'Using momentum/swinging'
    ],
    coachingCues: [
      '"Row to your hip pocket"',
      '"Keep hips square to ground"',
      '"Lead with your elbow"',
      '"Feel your lat working"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12 each', rest: '90s' },
      intermediate: { sets: 4, reps: '10-12 each', rest: '90s' },
      advanced: { sets: 4, reps: '8-12 each (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Light dumbbell rows to establish pattern',
      'Cat-cow stretches',
      'Scapular retractions',
      'Shoulder mobility work'
    ],
    contraindications: [
      'Lower back pain - ensure proper hip hinge',
      'Shoulder pain - adjust grip or reduce range',
      'Balance issues - use two-point stance instead'
    ],
    relatedExercises: [
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Seated Cable Row', slug: 'seated-cable-row', image: 'https://images.unsplash.com/photo-1660772919175-c3ea340ff932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF0ZWQlMjBjYWJsZSUyMHJvd3xlbnwxfHx8fDE3NjIwNjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'T-Bar Row', slug: 't-bar-row', image: 'https://images.unsplash.com/photo-1593640852822-a44850096f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0LWJhciUyMHJvdyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== LEG EXERCISES (Additional) =====
  'leg-press': {
    id: 'ex-17',
    name: 'Leg Press',
    slug: 'leg-press',
    level: 'beginner',
    equipment: 'Leg Press Machine',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: legPressVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Adductors'],
    stabilizers: ['Core', 'Hip Stabilizers'],
    howToPerform: [
      'Sit in leg press machine, back and head against pad',
      'Place feet shoulder-width apart on platform, mid-foot position',
      'Release safety handles, lower platform by bending knees',
      'Descend until knees are at ~90° (or just before lower back rounds)',
      'Push through heels to extend legs, don\'t lock out completely',
      'Maintain neutral spine and core engagement throughout'
    ],
    commonMistakes: [
      'Lower back rounding off pad (going too deep)',
      'Locking knees at top (joint stress)',
      'Feet too high or too low on platform',
      'Knees caving inward',
      'Partial range of motion'
    ],
    coachingCues: [
      '"Push through your heels"',
      '"Keep lower back glued to pad"',
      '"Control the descent"',
      '"Knees track over toes"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '10-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-12 (heavy)', rest: '120s' }
    },
    warmupTips: [
      'Bodyweight squats',
      'Leg swings',
      'Light sets on leg press',
      'Hip and ankle mobility work'
    ],
    contraindications: [
      'Lower back pain - limit depth to avoid rounding',
      'Knee pain - adjust foot position or reduce load',
      'Hip mobility issues - work on flexibility first'
    ],
    relatedExercises: [
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lunges', slug: 'lunge', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bulgarian Split Squat', slug: 'bulgarian-split-squat', image: 'https://images.unsplash.com/photo-1734668487493-e33c2f561f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxnYXJpYW4lMjBzcGxpdCUyMHNxdWF0fGVufDF8fHx8MTc2MjA2NzM0OXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'romanian-deadlift': {
    id: 'ex-18',
    name: 'Romanian Deadlift',
    slug: 'romanian-deadlift',
    level: 'intermediate',
    equipment: 'Barbell',
    mechanics: 'Compound',
    targetAreas: ['Hamstrings', 'Glutes', 'Back'],
    sets: 4,
    reps: '8-10',
    rest: '120s',
    videoUrl: romanianDeadliftVideo,
    primaryMuscles: ['Hamstrings', 'Gluteus Maximus', 'Erector Spinae'],
    secondaryMuscles: ['Adductors', 'Lats', 'Traps'],
    stabilizers: ['Core', 'Forearms', 'Rhomboids'],
    howToPerform: [
      'Stand with feet hip-width apart, holding barbell at thigh level',
      'Start with slight knee bend (maintain throughout)',
      'Hinge at hips, push hips back while lowering bar down thighs',
      'Keep bar close to legs, back flat, chest up',
      'Lower until you feel hamstring stretch (bar around mid-shin)',
      'Drive through heels and thrust hips forward to return to start'
    ],
    commonMistakes: [
      'Rounding lower back',
      'Squatting instead of hinging',
      'Bar drifting away from legs',
      'Not feeling hamstrings working',
      'Going too deep (beyond flexibility)'
    ],
    coachingCues: [
      '"Push your hips back"',
      '"Drag the bar up your legs"',
      '"Feel the hamstring stretch"',
      '"Chest proud, back flat"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12 (lighter)', rest: '90s' },
      intermediate: { sets: 4, reps: '8-10', rest: '120s' },
      advanced: { sets: 4, reps: '6-8 (heavy)', rest: '150s' }
    },
    warmupTips: [
      'Hip hinge practice with PVC pipe',
      'Leg curls or glute bridges',
      'Dynamic hamstring stretches',
      'Light RDLs with bar only'
    ],
    contraindications: [
      'Lower back issues - use very light weight or skip',
      'Hamstring strain - avoid until healed',
      'Poor hip hinge pattern - work on mobility first'
    ],
    relatedExercises: [
      { name: 'Deadlift', slug: 'deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Curl', slug: 'leg-curl', image: 'https://images.unsplash.com/photo-1619458085129-2e8dc50604bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBjdXJsJTIwbWFjaGluZXxlbnwxfHx8fDE3NjIwNjczNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'leg-curl': {
    id: 'ex-19',
    name: 'Leg Curl',
    slug: 'leg-curl',
    level: 'beginner',
    equipment: 'Leg Curl Machine',
    mechanics: 'Isolation',
    targetAreas: ['Hamstrings'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: legCurlVideo,
    primaryMuscles: ['Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus)'],
    secondaryMuscles: ['Gastrocnemius (Calves)'],
    stabilizers: ['Core', 'Hip Flexors'],
    howToPerform: [
      'Lie face down on leg curl machine, pad adjusted to sit on lower calves',
      'Grip handles to stabilize upper body',
      'Curl legs up toward glutes by bending knees',
      'Squeeze hamstrings at top for 1 second',
      'Lower with control back to starting position',
      'Keep hips pressed into pad throughout movement'
    ],
    commonMistakes: [
      'Hips lifting off pad',
      'Using momentum/swinging weight',
      'Not achieving full range of motion',
      'Partial reps at top',
      'Going too fast on the eccentric'
    ],
    coachingCues: [
      '"Heels to glutes"',
      '"Hips stay glued down"',
      '"Squeeze at the top"',
      '"Slow and controlled"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '10-15 (heavier)', rest: '75s' }
    },
    warmupTips: [
      'Light leg swings',
      'Hamstring stretches',
      'Very light leg curls to activate',
      'Glute bridges'
    ],
    contraindications: [
      'Hamstring strain - avoid or use very light weight',
      'Knee pain - check machine adjustment',
      'Lower back pain - ensure hips stay down'
    ],
    relatedExercises: [
      { name: 'Romanian Deadlift', slug: 'romanian-deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Deadlift', slug: 'deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Extension', slug: 'leg-extension', image: 'https://images.unsplash.com/photo-1669316714681-5fe047de58b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBleHRlbnNpb24lMjBtYWNoaW5lfGVufDF8fHx8MTc2MjA2NzM0OXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'leg-extension': {
    id: 'ex-20',
    name: 'Leg Extension',
    slug: 'leg-extension',
    level: 'beginner',
    equipment: 'Leg Extension Machine',
    mechanics: 'Isolation',
    targetAreas: ['Quadriceps'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: legExtensionVideo,
    primaryMuscles: ['Quadriceps (Rectus Femoris, Vastus Lateralis, Vastus Medialis, Vastus Intermedius)'],
    secondaryMuscles: [],
    stabilizers: ['Core', 'Hip Flexors'],
    howToPerform: [
      'Sit in leg extension machine, adjust back pad and leg pad',
      'Pad should rest on top of ankles/lower shins',
      'Grip handles beside seat for stability',
      'Extend legs until knees are fully straight',
      'Squeeze quadriceps at top for 1 second',
      'Lower with control back to starting position (90° knee bend)'
    ],
    commonMistakes: [
      'Using too much weight and jerking',
      'Not achieving full extension',
      'Lifting hips off seat',
      'Going too fast (no control)',
      'Partial range of motion'
    ],
    coachingCues: [
      '"Straighten completely"',
      '"Squeeze your quads hard"',
      '"Stay seated"',
      '"Control the descent"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '10-15 (heavier or dropsets)', rest: '75s' }
    },
    warmupTips: [
      'Bodyweight squats',
      'Quad stretches',
      'Light leg extensions',
      'Knee circles'
    ],
    contraindications: [
      'Knee pain - may aggravate patellofemoral issues',
      'ACL/MCL issues - consult doctor first',
      'Use with caution - can stress knee joint'
    ],
    relatedExercises: [
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Press', slug: 'leg-press', image: 'https://images.unsplash.com/photo-1758271613743-748b409c196b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBwcmVzcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyMDY3MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Curl', slug: 'leg-curl', image: 'https://images.unsplash.com/photo-1619458085129-2e8dc50604bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBjdXJsJTIwbWFjaGluZXxlbnwxfHx8fDE3NjIwNjczNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'bulgarian-split-squat': {
    id: 'ex-21',
    name: 'Bulgarian Split Squat',
    slug: 'bulgarian-split-squat',
    level: 'intermediate',
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes'],
    sets: 3,
    reps: '10 each leg',
    rest: '90s',
    videoUrl: bulgarianSplitSquatVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Hip Flexors'],
    stabilizers: ['Core', 'Hip Stabilizers', 'Ankle Stabilizers'],
    howToPerform: [
      'Stand 2-3 feet in front of bench, holding dumbbells at sides',
      'Place top of rear foot on bench behind you',
      'Lower body by bending front knee until thigh is parallel',
      'Front knee should stay over ankle, not past toes',
      'Drive through front heel to return to start',
      'Complete all reps one leg, then switch'
    ],
    commonMistakes: [
      'Front knee caving inward',
      'Leaning too far forward',
      'Not going deep enough',
      'Rear foot position too close',
      'Losing balance'
    ],
    coachingCues: [
      '"Drive through your front heel"',
      '"Torso stays upright"',
      '"Control the descent"',
      '"Back foot is just for balance"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-10 each (bodyweight)', rest: '90s' },
      intermediate: { sets: 3, reps: '10-12 each', rest: '90s' },
      advanced: { sets: 4, reps: '12-15 each (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Bodyweight split squats',
      'Hip flexor stretches',
      'Ankle mobility drills',
      'Balance work'
    ],
    contraindications: [
      'Knee pain - reduce depth or use different exercise',
      'Balance issues - hold onto support',
      'Hip mobility restrictions - work on flexibility'
    ],
    relatedExercises: [
      { name: 'Lunges', slug: 'lunge', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Press', slug: 'leg-press', image: 'https://images.unsplash.com/photo-1758271613743-748b409c196b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBwcmVzcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyMDY3MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'calf-raises': {
    id: 'ex-22',
    name: 'Calf Raises',
    slug: 'calf-raises',
    level: 'beginner',
    equipment: 'Bodyweight or Machine',
    mechanics: 'Isolation',
    targetAreas: ['Calves'],
    sets: 4,
    reps: '15-20',
    rest: '60s',
    videoUrl: calfRaisesVideo,
    primaryMuscles: ['Gastrocnemius', 'Soleus'],
    secondaryMuscles: [],
    stabilizers: ['Core', 'Ankle Stabilizers'],
    howToPerform: [
      'Stand with balls of feet on elevated surface (step or platform)',
      'Heels hanging off edge, toes pointed forward',
      'Rise up onto toes as high as possible',
      'Squeeze calves hard at top for 1 second',
      'Lower heels below platform level for full stretch',
      'Repeat for high reps with controlled tempo'
    ],
    commonMistakes: [
      'Bouncing at bottom (using momentum)',
      'Not achieving full range (short reps)',
      'Bending knees excessively',
      'Going too fast',
      'Not pausing at top'
    ],
    coachingCues: [
      '"Rise as high as you can"',
      '"Deep stretch at bottom"',
      '"Pause and squeeze"',
      '"Controlled movement"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '15-20', rest: '60s' },
      intermediate: { sets: 4, reps: '15-20', rest: '60s' },
      advanced: { sets: 4, reps: '20-25 (add weight)', rest: '75s' }
    },
    warmupTips: [
      'Ankle circles',
      'Light calf stretches',
      'Bodyweight raises to activate',
      'Ankle mobility drills'
    ],
    contraindications: [
      'Achilles tendonitis - avoid or use very light weight',
      'Ankle instability - use support',
      'Calf strain - rest until healed'
    ],
    relatedExercises: [
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Leg Press', slug: 'leg-press', image: 'https://images.unsplash.com/photo-1758271613743-748b409c196b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjBwcmVzcyUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyMDY3MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Romanian Deadlift', slug: 'romanian-deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== SHOULDER EXERCISES =====
  'lateral-raises': {
    id: 'ex-23',
    name: 'Lateral Raises',
    slug: 'lateral-raises',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Shoulders'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl:lateralRaiseVideo,
    primaryMuscles: ['Lateral Deltoid (Middle)'],
    secondaryMuscles: ['Anterior Deltoid', 'Supraspinatus'],
    stabilizers: ['Core', 'Upper Traps', 'Serratus Anterior'],
    howToPerform: [
      'Stand with feet hip-width apart, dumbbell in each hand at sides',
      'Slight bend in elbows (maintain throughout)',
      'Raise arms out to sides until parallel to floor',
      'Lead with elbows, not hands',
      'Pause briefly at top',
      'Lower with control back to starting position'
    ],
    commonMistakes: [
      'Using too much weight and swinging',
      'Shrugging shoulders up',
      'Raising arms too high (above shoulder level)',
      'Not maintaining elbow bend',
      'Using momentum'
    ],
    coachingCues: [
      '"Pour water from a pitcher"',
      '"Lead with your elbows"',
      '"Stop at shoulder height"',
      '"Control the descent"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20 (with dropsets)', rest: '75s' }
    },
    warmupTips: [
      'Arm circles forward and backward',
      'Band pull-aparts',
      'Very light lateral raises',
      'Shoulder dislocations with band'
    ],
    contraindications: [
      'Shoulder impingement - reduce range or skip',
      'Rotator cuff issues - use lighter weight',
      'Neck tension - avoid shrugging'
    ],
    relatedExercises: [
      { name: 'Overhead Press', slug: 'overhead-press', image: 'https://images.unsplash.com/photo-1748546043579-2680b74f2e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Front Raises', slug: 'front-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Arnold Press', slug: 'arnold-press', image: 'https://images.unsplash.com/photo-1638459472356-3fffeb8fc78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcm5vbGQlMjBwcmVzcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1MXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'front-raises': {
    id: 'ex-24',
    name: 'Front Raises',
    slug: 'front-raises',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Shoulders'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: frontRaisesVideo,
    primaryMuscles: ['Anterior Deltoid (Front)'],
    secondaryMuscles: ['Lateral Deltoid', 'Upper Pectoralis'],
    stabilizers: ['Core', 'Serratus Anterior'],
    howToPerform: [
      'Stand with feet hip-width, dumbbells at thighs (palms facing body)',
      'Slight bend in elbows',
      'Raise dumbbells in front to shoulder height',
      'Keep core engaged and avoid leaning back',
      'Pause briefly at top',
      'Lower with control to starting position'
    ],
    commonMistakes: [
      'Using momentum/swinging',
      'Raising above shoulder level',
      'Arching lower back',
      'Using too much weight',
      'Shrugging shoulders'
    ],
    coachingCues: [
      '"Stop at eye level"',
      '"Core stays tight"',
      '"Smooth and controlled"',
      '"Don\'t lean back"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20', rest: '75s' }
    },
    warmupTips: [
      'Arm circles',
      'Light band work',
      'Very light front raises',
      'Shoulder mobility drills'
    ],
    contraindications: [
      'Shoulder impingement - use lighter weight or skip',
      'Neck strain - avoid shrugging',
      'Lower back pain - ensure core is braced'
    ],
    relatedExercises: [
      { name: 'Lateral Raises', slug: 'lateral-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Overhead Press', slug: 'overhead-press', image: 'https://images.unsplash.com/photo-1748546043579-2680b74f2e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Face Pulls', slug: 'face-pulls', image: 'https://images.unsplash.com/photo-1727721924929-57bed3d1ffdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcHVsbHMlMjBjYWJsZXxlbnwxfHx8fDE3NjIwNjczNTF8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'arnold-press': {
    id: 'ex-25',
    name: 'Arnold Press',
    slug: 'arnold-press',
    level: 'intermediate',
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Shoulders'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: arnoldPressVideo,
    primaryMuscles: ['Anterior Deltoid', 'Lateral Deltoid', 'Posterior Deltoid'],
    secondaryMuscles: ['Triceps Brachii', 'Upper Traps'],
    stabilizers: ['Core', 'Rotator Cuff', 'Serratus Anterior'],
    howToPerform: [
      'Sit on bench with back support, dumbbells at shoulder height',
      'Start with palms facing you (like end of bicep curl)',
      'Press dumbbells up while rotating palms outward',
      'End with arms extended, palms facing forward',
      'Reverse the motion on the way down',
      'Return to starting position with palms facing you'
    ],
    commonMistakes: [
      'Using too much weight',
      'Not rotating fully',
      'Arching back excessively',
      'Rushing the movement',
      'Not controlling descent'
    ],
    coachingCues: [
      '"Rotate as you press"',
      '"Smooth transition"',
      '"Control the twist"',
      '"Full range rotation"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 3, reps: '10-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-12', rest: '120s' }
    },
    warmupTips: [
      'Shoulder circles and rotations',
      'Light dumbbell presses',
      'Band pull-aparts',
      'Very light Arnold presses to groove pattern'
    ],
    contraindications: [
      'Shoulder impingement - use standard press instead',
      'Rotator cuff issues - avoid rotation',
      'Limited mobility - work on flexibility first'
    ],
    relatedExercises: [
      { name: 'Overhead Press', slug: 'overhead-press', image: 'https://images.unsplash.com/photo-1748546043579-2680b74f2e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lateral Raises', slug: 'lateral-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Front Raises', slug: 'front-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'face-pulls': {
    id: 'ex-26',
    name: 'Face Pulls',
    slug: 'face-pulls',
    level: 'beginner',
    equipment: 'Cable Machine',
    mechanics: 'Isolation',
    targetAreas: ['Shoulders', 'Upper Back'],
    sets: 3,
    reps: '15-20',
    rest: '60s',
    videoUrl: facePullsVideo,
    primaryMuscles: ['Posterior Deltoid (Rear Delts)', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Rotator Cuff', 'Lateral Deltoid'],
    stabilizers: ['Core', 'Lower Traps'],
    howToPerform: [
      'Set cable at upper chest height, attach rope',
      'Grab rope with overhand grip, step back to create tension',
      'Pull rope toward face, separating hands as you pull',
      'Elbows stay high, pulling past ears',
      'Squeeze shoulder blades together',
      'Slowly return to starting position'
    ],
    commonMistakes: [
      'Pulling too low (to chest instead of face)',
      'Elbows dropping',
      'Using too much weight',
      'Not separating handles',
      'Leaning back excessively'
    ],
    coachingCues: [
      '"Pull to your nose"',
      '"Elbows high"',
      '"Pinch shoulder blades"',
      '"Split the rope"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '15-20', rest: '60s' },
      intermediate: { sets: 4, reps: '15-20', rest: '60s' },
      advanced: { sets: 4, reps: '20-25', rest: '75s' }
    },
    warmupTips: [
      'Band pull-aparts',
      'Scapular retractions',
      'Arm circles',
      'Very light face pulls'
    ],
    contraindications: [
      'Shoulder pain - reduce weight or adjust angle',
      'Neck tension - ensure elbows stay high',
      'Elbow issues - check grip and form'
    ],
    relatedExercises: [
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lateral Raises', slug: 'lateral-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Seated Cable Row', slug: 'seated-cable-row', image: 'https://images.unsplash.com/photo-1660772919175-c3ea340ff932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWF0ZWQlMjBjYWJsZSUyMHJvd3xlbnwxfHx8fDE3NjIwNjczNDV8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'upright-row': {
    id: 'ex-27',
    name: 'Upright Row',
    slug: 'upright-row',
    level: 'intermediate',
    equipment: 'Barbell',
    mechanics: 'Compound',
    targetAreas: ['Shoulders', 'Traps'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: uprightRowVideo,
    primaryMuscles: ['Lateral Deltoid', 'Upper Trapezius'],
    secondaryMuscles: ['Anterior Deltoid', 'Biceps Brachii'],
    stabilizers: ['Core', 'Forearms', 'Rotator Cuff'],
    howToPerform: [
      'Stand holding barbell at thighs with overhand grip (shoulder-width)',
      'Pull barbell straight up along body to chest height',
      'Lead with elbows, keeping them higher than wrists',
      'Bar should stay close to body throughout',
      'Pause briefly at top',
      'Lower with control to starting position'
    ],
    commonMistakes: [
      'Grip too narrow (shoulder stress)',
      'Pulling too high (past chest level)',
      'Using momentum/swinging',
      'Bar drifting away from body',
      'Shrugging excessively'
    ],
    coachingCues: [
      '"Drive elbows to ceiling"',
      '"Bar hugs your body"',
      '"Stop at chest height"',
      '"Controlled movement"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 3, reps: '10-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-12', rest: '120s' }
    },
    warmupTips: [
      'Shoulder circles',
      'Band pull-aparts',
      'Very light upright rows with bar',
      'Scapular shrugs'
    ],
    contraindications: [
      'Shoulder impingement - AVOID or use wide grip',
      'Rotator cuff issues - skip this exercise',
      'Use cautiously - can stress shoulder joint'
    ],
    relatedExercises: [
      { name: 'Lateral Raises', slug: 'lateral-raises', image: 'https://images.unsplash.com/photo-1715532176296-b46557fc7231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRlcmFsJTIwcmFpc2VzJTIwc2hvdWxkZXJ8ZW58MXx8fHwxNzYyMDY3MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Face Pulls', slug: 'face-pulls', image: 'https://images.unsplash.com/photo-1727721924929-57bed3d1ffdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWNlJTIwcHVsbHMlMjBjYWJsZXxlbnwxfHx8fDE3NjIwNjczNTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Overhead Press', slug: 'overhead-press', image: 'https://images.unsplash.com/photo-1748546043579-2680b74f2e53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyaGVhZCUyMHByZXNzJTIwc2hvdWxkZXIlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== ARM EXERCISES =====
  'bicep-curls': {
    id: 'ex-28',
    name: 'Bicep Curls',
    slug: 'bicep-curls',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Arms (Biceps)'],
    sets: 3,
    reps: '10-12',
    rest: '60s',
    videoUrl: bicepCurlsVideo,
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    stabilizers: ['Core', 'Forearms', 'Front Deltoid'],
    howToPerform: [
      'Stand with feet hip-width, dumbbell in each hand, arms at sides',
      'Palms facing forward (supinated grip)',
      'Curl dumbbells up by bending elbows',
      'Keep elbows stationary at sides (don\'t swing forward)',
      'Squeeze biceps at top',
      'Lower with control to full arm extension'
    ],
    commonMistakes: [
      'Swinging/using momentum',
      'Moving elbows forward',
      'Not achieving full range',
      'Partial reps',
      'Arching back'
    ],
    coachingCues: [
      '"Elbows stay glued to sides"',
      '"Squeeze at the top"',
      '"Control the negative"',
      '"Full extension at bottom"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '60s' },
      intermediate: { sets: 4, reps: '10-12', rest: '60s' },
      advanced: { sets: 4, reps: '8-12 (heavier)', rest: '90s' }
    },
    warmupTips: [
      'Arm circles',
      'Light curls with minimal weight',
      'Wrist mobility work',
      'Band curls'
    ],
    contraindications: [
      'Elbow tendonitis - reduce weight or skip',
      'Wrist pain - use neutral grip (hammer curls)',
      'Bicep tendon issues - consult doctor'
    ],
    relatedExercises: [
      { name: 'Hammer Curls', slug: 'hammer-curls', image: 'https://images.unsplash.com/photo-1687585612229-354db277c661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBjdXJscyUyMGFybXN8ZW58MXx8fHwxNzYyMDY3MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Preacher Curls', slug: 'preacher-curls', image: 'https://images.unsplash.com/photo-1605809149707-bc31fb8008bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVhY2hlciUyMGN1cmxzJTIwYmljZXB8ZW58MXx8fHwxNzYyMDY3MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'hammer-curls': {
    id: 'ex-29',
    name: 'Hammer Curls',
    slug: 'hammer-curls',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Arms (Biceps)'],
    sets: 3,
    reps: '10-12',
    rest: '60s',
    videoUrl: hammerCurlVideo,
    primaryMuscles: ['Brachialis', 'Brachioradialis', 'Biceps Brachii'],
    secondaryMuscles: ['Forearm Flexors'],
    stabilizers: ['Core', 'Front Deltoid'],
    howToPerform: [
      'Stand with dumbbells at sides, palms facing body (neutral grip)',
      'Curl dumbbells up while keeping palms facing each other',
      'Elbows stay stationary at sides',
      'Lift until dumbbells reach shoulder height',
      'Squeeze at top',
      'Lower with control'
    ],
    commonMistakes: [
      'Rotating wrists during movement',
      'Swinging dumbbells',
      'Not keeping elbows still',
      'Partial range of motion',
      'Using too much weight'
    ],
    coachingCues: [
      '"Palms face each other always"',
      '"Hammer motion"',
      '"Elbows pinned"',
      '"Slow and controlled"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '60s' },
      intermediate: { sets: 4, reps: '10-12', rest: '60s' },
      advanced: { sets: 4, reps: '8-12', rest: '90s' }
    },
    warmupTips: [
      'Wrist rotations',
      'Light hammer curls',
      'Forearm stretches',
      'Elbow mobility'
    ],
    contraindications: [
      'Elbow tendonitis - use lighter weight',
      'Wrist pain - this grip is usually easier',
      'Forearm strain - reduce volume'
    ],
    relatedExercises: [
      { name: 'Bicep Curls', slug: 'bicep-curls', image: 'https://images.unsplash.com/photo-1687184145689-4ca08a4806d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWNlcCUyMGN1cmxzJTIwZHVtYmJlbGx8ZW58MXx8fHwxNzYyMDY3MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Preacher Curls', slug: 'preacher-curls', image: 'https://images.unsplash.com/photo-1605809149707-bc31fb8008bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVhY2hlciUyMGN1cmxzJTIwYmljZXB8ZW58MXx8fHwxNzYyMDY3MzU1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'preacher-curls': {
    id: 'ex-30',
    name: 'Preacher Curls',
    slug: 'preacher-curls',
    level: 'intermediate',
    equipment: 'EZ Bar or Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Arms (Biceps)'],
    sets: 3,
    reps: '10-12',
    rest: '60s',
    videoUrl: preacherCurlsVideo,
    primaryMuscles: ['Biceps Brachii (especially lower biceps)'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    stabilizers: ['Forearms'],
    howToPerform: [
      'Sit at preacher curl bench, upper arms resting on pad',
      'Grab EZ bar or dumbbells with underhand grip',
      'Start with arms fully extended',
      'Curl weight up by bending elbows',
      'Squeeze biceps at top',
      'Lower with strict control to full extension'
    ],
    commonMistakes: [
      'Not going to full extension',
      'Lifting shoulders/upper arms off pad',
      'Using momentum',
      'Going too heavy',
      'Partial reps'
    ],
    coachingCues: [
      '"Arms stay glued to pad"',
      '"Full stretch at bottom"',
      '"Peak contraction at top"',
      '"Slow eccentric"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '60s' },
      intermediate: { sets: 3, reps: '10-12', rest: '60s' },
      advanced: { sets: 4, reps: '8-12', rest: '90s' }
    },
    warmupTips: [
      'Light arm swings',
      'Very light preacher curls',
      'Bicep stretches',
      'Wrist mobility'
    ],
    contraindications: [
      'Bicep tendonitis - avoid or use very light weight',
      'Elbow pain - can stress tendon insertion',
      'Recent bicep strain - skip until healed'
    ],
    relatedExercises: [
      { name: 'Bicep Curls', slug: 'bicep-curls', image: 'https://images.unsplash.com/photo-1687184145689-4ca08a4806d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWNlcCUyMGN1cmxzJTIwZHVtYmJlbGx8ZW58MXx8fHwxNzYyMDY3MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Hammer Curls', slug: 'hammer-curls', image: 'https://images.unsplash.com/photo-1687585612229-354db277c661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1tZXIlMjBjdXJscyUyMGFybXN8ZW58MXx8fHwxNzYyMDY3MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'tricep-pushdown': {
    id: 'ex-31',
    name: 'Tricep Pushdown',
    slug: 'tricep-pushdown',
    level: 'beginner',
    equipment: 'Cable Machine',
    mechanics: 'Isolation',
    targetAreas: ['Arms (Triceps)'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: tricepPushdownVideo,
    primaryMuscles: ['Triceps Brachii (Lateral Head, Long Head, Medial Head)'],
    secondaryMuscles: [],
    stabilizers: ['Core', 'Shoulders'],
    howToPerform: [
      'Stand facing cable machine, grab bar/rope attachment',
      'Elbows at sides, bent at 90° to start',
      'Press down by extending elbows fully',
      'Keep elbows stationary (pinned to sides)',
      'Squeeze triceps at bottom for 1 second',
      'Return to starting position with control'
    ],
    commonMistakes: [
      'Elbows moving forward',
      'Using too much weight and leaning',
      'Not achieving full extension',
      'Partial range of motion',
      'Shoulders shrugging'
    ],
    coachingCues: [
      '"Elbows stay glued to ribs"',
      '"Lock out at bottom"',
      '"Squeeze hard"',
      '"Control the return"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '10-15 (heavier)', rest: '75s' }
    },
    warmupTips: [
      'Arm circles',
      'Light pushdowns',
      'Elbow mobility',
      'Shoulder warm-up'
    ],
    contraindications: [
      'Elbow tendonitis - use light weight',
      'Tricep tendon issues - avoid or modify',
      'Shoulder pain - check elbow position'
    ],
    relatedExercises: [
      { name: 'Dips', slug: 'dips', image: 'https://images.unsplash.com/photo-1758521959221-605fe3c6a22a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBzJTIwdHJpY2VwcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Skull Crushers', slug: 'skull-crushers', image: 'https://images.unsplash.com/photo-1742145867110-14a07245a99d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3VsbCUyMGNydXNoZXJzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjczNTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'skull-crushers': {
    id: 'ex-32',
    name: 'Skull Crushers',
    slug: 'skull-crushers',
    level: 'intermediate',
    equipment: 'EZ Bar or Dumbbells',
    mechanics: 'Isolation',
    targetAreas: ['Arms (Triceps)'],
    sets: 3,
    reps: '10-12',
    rest: '90s',
    videoUrl: skullCrushersVideo,
    primaryMuscles: ['Triceps Brachii (especially Long Head)'],
    secondaryMuscles: [],
    stabilizers: ['Core', 'Shoulder Stabilizers'],
    howToPerform: [
      'Lie on bench holding EZ bar above chest, arms extended',
      'Upper arms should stay perpendicular to floor',
      'Lower bar toward forehead by bending elbows only',
      'Keep upper arms stationary (don\'t let them drift back)',
      'Stop bar just above forehead or behind head',
      'Extend arms back to starting position'
    ],
    commonMistakes: [
      'Upper arms moving backward',
      'Not controlling the descent (dangerous)',
      'Flaring elbows out too wide',
      'Using too much weight',
      'Not achieving full extension'
    ],
    coachingCues: [
      '"Upper arms stay vertical"',
      '"Lower slowly - control it!"',
      '"Stretch the triceps"',
      '"Lock out at top"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 3, reps: '10-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-12', rest: '120s' }
    },
    warmupTips: [
      'Arm circles and mobility',
      'Light tricep pushdowns',
      'Very light skull crushers',
      'Elbow and shoulder warm-up'
    ],
    contraindications: [
      'Elbow tendonitis - AVOID',
      'Shoulder pain - check form or skip',
      'Tricep tendon issues - use light weight or avoid'
    ],
    relatedExercises: [
      { name: 'Tricep Pushdown', slug: 'tricep-pushdown', image: 'https://images.unsplash.com/photo-1741666998073-7df07563d4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmljZXAlMjBwdXNoZG93biUyMGNhYmxlfGVufDF8fHx8MTc2MjA2NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dips', slug: 'dips', image: 'https://images.unsplash.com/photo-1758521959221-605fe3c6a22a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBzJTIwdHJpY2VwcyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1731842766456-f90b5e4bdb84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5jaCUyMHByZXNzJTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== ADDITIONAL EXERCISES (Previously Missing) =====
  'pendlay-row': {
    id: 'ex-33',
    name: 'Pendlay Row',
    slug: 'pendlay-row',
    level: 'advanced',
    equipment: 'Barbell',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Power'],
    sets: 4,
    reps: '5-8',
    rest: '120s',
    videoUrl: pendlayRowVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Biceps Brachii', 'Rear Deltoid', 'Erector Spinae'],
    stabilizers: ['Core', 'Lower Back', 'Forearms'],
    howToPerform: [
      'Set barbell on floor, stand with feet shoulder-width apart',
      'Hinge at hips to 90°, back flat parallel to ground',
      'Grab bar with overhand grip slightly wider than shoulders',
      'Explosively pull bar to lower chest/upper abdomen',
      'Bar must touch torso - squeeze shoulder blades together',
      'Lower bar completely to floor between each rep (dead stop)'
    ],
    commonMistakes: [
      'Not returning bar to floor (defeats the purpose)',
      'Rounding lower back',
      'Using legs/momentum to start the pull',
      'Not achieving full scapular retraction',
      'Standing up between reps'
    ],
    coachingCues: [
      '"Explode off the floor"',
      '"Touch your chest"',
      '"Dead stop every rep"',
      '"Back stays flat like a table"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '5-8 (light)', rest: '120s' },
      intermediate: { sets: 4, reps: '5-8', rest: '120s' },
      advanced: { sets: 5, reps: '5 (heavy)', rest: '150s' }
    },
    warmupTips: [
      'Hip hinge drills',
      'Light barbell rows',
      'Core activation',
      'Thoracic spine mobility'
    ],
    contraindications: [
      'Lower back issues - AVOID (high stress)',
      'Poor hip hinge pattern - master form first',
      'Hamstring tightness - work on flexibility'
    ],
    relatedExercises: [
      { name: 'Barbell Row', slug: 'barbell-row', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'T-Bar Row', slug: 't-bar-row', image: 'https://images.unsplash.com/photo-1593640852822-a44850096f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0LWJhciUyMHJvdyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM0Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Deadlift', slug: 'deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'chin-up': {
    id: 'ex-34',
    name: 'Chin-Up',
    slug: 'chin-up',
    level: 'intermediate',
    equipment: 'Pull-Up Bar',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Biceps'],
    sets: 3,
    reps: '6-10',
    rest: '120s',
    videoUrl: chinUpsVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Teres Major', 'Rear Deltoid'],
    stabilizers: ['Core', 'Forearms', 'Lower Traps'],
    howToPerform: [
      'Hang from pull-up bar with underhand (supinated) grip, hands shoulder-width',
      'Start with arms fully extended, shoulders engaged',
      'Pull yourself up by driving elbows down',
      'Bring chin above bar (or chest to bar for full range)',
      'Squeeze shoulder blades together at top',
      'Lower with control to full arm extension'
    ],
    commonMistakes: [
      'Using momentum/kipping',
      'Not achieving full range (chin above bar)',
      'Not fully extending arms at bottom',
      'Shrugging shoulders at bottom',
      'Swinging legs'
    ],
    coachingCues: [
      '"Chin over bar"',
      '"Pull your elbows to your hips"',
      '"Control the descent"',
      '"Dead hang at bottom"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '3-6 (or assisted)', rest: '120s' },
      intermediate: { sets: 3, reps: '6-10', rest: '120s' },
      advanced: { sets: 4, reps: '10-15 (or weighted)', rest: '150s' }
    },
    warmupTips: [
      'Dead hangs for grip strength',
      'Scapular pull-ups',
      'Resistance band chin-ups',
      'Lat activation drills'
    ],
    contraindications: [
      'Shoulder impingement - use neutral grip or assisted version',
      'Elbow pain - check grip width',
      'Insufficient strength - use band assistance'
    ],
    relatedExercises: [
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lat Pulldown', slug: 'lat-pulldown', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bicep Curls', slug: 'bicep-curls', image: 'https://images.unsplash.com/photo-1687184145689-4ca08a4806d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWNlcCUyMGN1cmxzJTIwZHVtYmJlbGx8ZW58MXx8fHwxNzYyMDY3MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'assisted-pull-up': {
    id: 'ex-35',
    name: 'Assisted Pull-Up',
    slug: 'assisted-pull-up',
    level: 'beginner',
    equipment: 'Assisted Pull-Up Machine or Resistance Band',
    mechanics: 'Compound',
    targetAreas: ['Back', 'Arms'],
    sets: 3,
    reps: '8-12',
    rest: '90s',
    videoUrl: assistedPullUpVideo,
    primaryMuscles: ['Latissimus Dorsi', 'Biceps Brachii'],
    secondaryMuscles: ['Teres Major', 'Rhomboids', 'Rear Deltoid'],
    stabilizers: ['Core', 'Forearms', 'Rotator Cuff'],
    howToPerform: [
      'Set machine weight (more assistance = easier) or use resistance band',
      'Grip pull-up bar with overhand grip, slightly wider than shoulders',
      'Place knees on pad (machine) or foot in band (band-assisted)',
      'Pull yourself up until chin is above bar',
      'Squeeze shoulder blades together at top',
      'Lower with control to full arm extension'
    ],
    commonMistakes: [
      'Using too much assistance (not challenging enough)',
      'Not achieving full range of motion',
      'Relying only on arms instead of back',
      'Kipping or swinging',
      'Not progressing to less assistance over time'
    ],
    coachingCues: [
      '"Pull with your elbows"',
      '"Chest to bar"',
      '"Squeeze your lats"',
      '"Gradually reduce assistance"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-12', rest: '90s' },
      intermediate: { sets: 4, reps: '10-12 (less assistance)', rest: '90s' },
      advanced: { sets: 4, reps: '12-15 (minimal assistance)', rest: '120s' }
    },
    warmupTips: [
      'Scapular pulls',
      'Dead hangs',
      'Light lat pulldowns',
      'Shoulder mobility work'
    ],
    contraindications: [
      'Shoulder pain - adjust grip or reduce ROM',
      'Elbow issues - use neutral grip',
      'Work towards unassisted pull-ups progressively'
    ],
    relatedExercises: [
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Chin-Up', slug: 'chin-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Lat Pulldown', slug: 'lat-pulldown', image: 'https://images.unsplash.com/photo-1693707963745-297f4e5dd2a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwcm93JTIwYmFjayUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'reverse-lunge': {
    id: 'ex-36',
    name: 'Reverse Lunge',
    slug: 'reverse-lunge',
    level: 'beginner',
    equipment: 'Bodyweight or Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes'],
    sets: 3,
    reps: '10 each leg',
    rest: '60s',
    videoUrl: reverseLungeVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Hip Flexors'],
    stabilizers: ['Core', 'Hip Stabilizers', 'Adductors'],
    howToPerform: [
      'Stand tall with feet hip-width, dumbbells at sides (optional)',
      'Step backward with right leg, landing on ball of foot',
      'Lower hips until both knees bent at ~90°',
      'Front knee stays over ankle, back knee hovers above ground',
      'Push through front heel to return to standing',
      'Alternate legs or complete all reps one side first'
    ],
    commonMistakes: [
      'Front knee going past toes excessively',
      'Not stepping back far enough',
      'Leaning forward too much',
      'Knee caving inward',
      'Incomplete range of motion'
    ],
    coachingCues: [
      '"Step back, then down"',
      '"Front knee stays over ankle"',
      '"Torso stays upright"',
      '"Drive through front heel"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10 each leg', rest: '60s' },
      intermediate: { sets: 4, reps: '12 each leg (add weight)', rest: '75s' },
      advanced: { sets: 4, reps: '15 each leg (heavier weight)', rest: '90s' }
    },
    warmupTips: [
      'Leg swings',
      'Hip flexor stretches',
      'Bodyweight reverse lunges',
      'Ankle mobility drills'
    ],
    contraindications: [
      'Knee pain - reduce depth or use static lunge',
      'Balance issues - hold onto support',
      'Hip mobility restrictions - work on flexibility'
    ],
    relatedExercises: [
      { name: 'Lunges', slug: 'lunge', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bulgarian Split Squat', slug: 'bulgarian-split-squat', image: 'https://images.unsplash.com/photo-1734668487493-e33c2f561f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxnYXJpYW4lMjBzcGxpdCUyMHNxdWF0fGVufDF8fHx8MTc2MjA2NzM0OXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Step-Ups', slug: 'step-ups', image: 'https://images.unsplash.com/photo-1745103598675-85df75773d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVwJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjgwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'step-ups': {
    id: 'ex-37',
    name: 'Step-Ups',
    slug: 'step-ups',
    level: 'beginner',
    equipment: 'Box or Bench',
    mechanics: 'Compound',
    targetAreas: ['Legs', 'Glutes'],
    sets: 3,
    reps: '12 each leg',
    rest: '60s',
    videoUrl: stepUpsVideo,
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Hip Flexors'],
    stabilizers: ['Core', 'Hip Stabilizers', 'Ankle Stabilizers'],
    howToPerform: [
      'Stand facing box or bench (knee height is ideal)',
      'Place entire right foot on box',
      'Push through right heel to step up, bringing left foot up',
      'Stand fully upright on box',
      'Step down with left foot first, then right',
      'Repeat for reps, then switch leading leg'
    ],
    commonMistakes: [
      'Pushing off back leg instead of front',
      'Box too high (compromises form)',
      'Not standing fully upright at top',
      'Knee caving inward',
      'Using momentum/jumping'
    ],
    coachingCues: [
      '"Drive through the heel on the box"',
      '"Stand tall at the top"',
      '"Control the descent"',
      '"Back leg is just for balance"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12 each leg', rest: '60s' },
      intermediate: { sets: 4, reps: '12-15 each (add dumbbells)', rest: '75s' },
      advanced: { sets: 4, reps: '15-20 each (heavier)', rest: '90s' }
    },
    warmupTips: [
      'Bodyweight step-ups',
      'Leg swings',
      'Hip mobility work',
      'Ankle circles'
    ],
    contraindications: [
      'Knee pain - lower box height',
      'Balance issues - use support rail',
      'Hip mobility restrictions - start with lower box'
    ],
    relatedExercises: [
      { name: 'Lunges', slug: 'lunge', image: 'https://images.unsplash.com/photo-1650116385006-2a82a7b9941b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdW5nZSUyMGxlZyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NjE5MXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bulgarian Split Squat', slug: 'bulgarian-split-squat', image: 'https://images.unsplash.com/photo-1734668487493-e33c2f561f13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxnYXJpYW4lMjBzcGxpdCUyMHNxdWF0fGVufDF8fHx8MTc2MjA2NzM0OXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== CORE EXERCISES =====
  'plank': {
    id: 'ex-38',
    name: 'Plank',
    slug: 'plank',
    level: 'beginner',
    equipment: 'Bodyweight',
    mechanics: 'Isolation',
    targetAreas: ['Core', 'Abs'],
    sets: 3,
    reps: '30-60s hold',
    rest: '60s',
    videoUrl:plankVideo,
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Obliques', 'Erector Spinae', 'Shoulders'],
    stabilizers: ['Glutes', 'Quadriceps', 'Serratus Anterior'],
    howToPerform: [
      'Start in push-up position on forearms instead of hands',
      'Elbows directly under shoulders, forearms parallel',
      'Body forms straight line from head to heels',
      'Engage core by pulling belly button toward spine',
      'Squeeze glutes to prevent hips from sagging',
      'Hold position without letting hips drop or pike up'
    ],
    commonMistakes: [
      'Hips sagging toward floor',
      'Hips piking up too high',
      'Head dropping or looking up',
      'Not engaging core properly',
      'Holding breath'
    ],
    coachingCues: [
      '"Create one straight plank"',
      '"Squeeze your glutes hard"',
      '"Pull belly button to spine"',
      '"Breathe steadily"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '20-30s hold', rest: '60s' },
      intermediate: { sets: 3, reps: '45-60s hold', rest: '60s' },
      advanced: { sets: 4, reps: '60-90s hold', rest: '75s' }
    },
    warmupTips: [
      'Cat-cow stretches',
      'Bird dogs',
      'Dead bugs',
      'Gentle core activation'
    ],
    contraindications: [
      'Lower back pain - modify to knees or shorten duration',
      'Shoulder impingement - elevate hands',
      'Wrist pain - use forearms (which is standard)'
    ],
    relatedExercises: [
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Mountain Climbers', slug: 'mountain-climbers', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Crunches', slug: 'crunches', image: 'https://images.unsplash.com/photo-1758521960576-626603dfd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVuY2hlcyUyMGFicyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2ODE4NHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'crunches': {
    id: 'ex-39',
    name: 'Crunches',
    slug: 'crunches',
    level: 'beginner',
    equipment: 'Bodyweight',
    mechanics: 'Isolation',
    targetAreas: ['Core', 'Abs'],
    sets: 3,
    reps: '15-20',
    rest: '45s',
    videoUrl:crunchesVideo,
    primaryMuscles: ['Rectus Abdominis (Upper Abs)'],
    secondaryMuscles: ['Obliques'],
    stabilizers: ['Hip Flexors', 'Neck Flexors'],
    howToPerform: [
      'Lie on back with knees bent, feet flat on floor',
      'Place hands behind head or crossed on chest',
      'Engage core and lift shoulder blades off ground',
      'Curl upper body toward knees (not a sit-up)',
      'Squeeze abs at top for 1 second',
      'Lower with control, keeping tension on abs'
    ],
    commonMistakes: [
      'Pulling on neck with hands',
      'Using momentum instead of abs',
      'Doing full sit-ups instead of crunches',
      'Not keeping lower back pressed to floor',
      'Going too fast'
    ],
    coachingCues: [
      '"Lift with your abs, not neck"',
      '"Shoulders off the ground"',
      '"Squeeze at the top"',
      '"Slow and controlled"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '45s' },
      intermediate: { sets: 4, reps: '15-20', rest: '45s' },
      advanced: { sets: 4, reps: '20-25 (add weight)', rest: '60s' }
    },
    warmupTips: [
      'Cat-cow stretches',
      'Dead bugs',
      'Light core activation',
      'Hip flexor stretches'
    ],
    contraindications: [
      'Neck pain - use hands on chest, not behind head',
      'Lower back issues - ensure back stays flat',
      'Hip flexor tightness - stretch before exercising'
    ],
    relatedExercises: [
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Russian Twists', slug: 'russian-twists', image: 'https://images.unsplash.com/photo-1676286155904-b0800262ed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXNzaWFuJTIwdHdpc3QlMjBjb3JlfGVufDF8fHx8MTc2MjA2ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Hanging Leg Raises', slug: 'hanging-leg-raises', image: 'https://images.unsplash.com/photo-1599519688490-99e859e7b516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwbGVnJTIwcmFpc2VzfGVufDF8fHx8MTc2MjA2ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'russian-twists': {
    id: 'ex-40',
    name: 'Russian Twists',
    slug: 'russian-twists',
    level: 'intermediate',
    equipment: 'Bodyweight or Medicine Ball',
    mechanics: 'Isolation',
    targetAreas: ['Core', 'Obliques'],
    sets: 3,
    reps: '20 total (10 each side)',
    rest: '45s',
    videoUrl: russianTwistsVideo,
    primaryMuscles: ['Obliques (External and Internal)'],
    secondaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    stabilizers: ['Hip Flexors', 'Erector Spinae'],
    howToPerform: [
      'Sit on floor with knees bent, feet elevated off ground',
      'Lean back slightly to engage core (V-sit position)',
      'Hold weight or clasp hands in front of chest',
      'Rotate torso to right, touching weight/hands to floor',
      'Rotate to left side, touching floor',
      'Keep core engaged and feet off ground throughout'
    ],
    commonMistakes: [
      'Rounding back excessively',
      'Feet touching ground (reduces difficulty)',
      'Moving arms instead of torso',
      'Going too fast/using momentum',
      'Not rotating fully'
    ],
    coachingCues: [
      '"Rotate from your core"',
      '"Feet stay up"',
      '"Touch the floor each side"',
      '"Control the movement"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '20 total (feet down)', rest: '45s' },
      intermediate: { sets: 3, reps: '30 total (feet up)', rest: '45s' },
      advanced: { sets: 4, reps: '40 total (add weight)', rest: '60s' }
    },
    warmupTips: [
      'Torso rotations',
      'Seated twists',
      'Core activation drills',
      'Hip flexor stretches'
    ],
    contraindications: [
      'Lower back pain - keep feet on ground or skip',
      'Hip flexor tightness - modify position',
      'Disc issues - avoid rotation exercises'
    ],
    relatedExercises: [
      { name: 'Crunches', slug: 'crunches', image: 'https://images.unsplash.com/photo-1758521960576-626603dfd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVuY2hlcyUyMGFicyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2ODE4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Mountain Climbers', slug: 'mountain-climbers', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'hanging-leg-raises': {
    id: 'ex-41',
    name: 'Hanging Leg Raises',
    slug: 'hanging-leg-raises',
    level: 'advanced',
    equipment: 'Pull-Up Bar',
    mechanics: 'Isolation',
    targetAreas: ['Core', 'Lower Abs'],
    sets: 3,
    reps: '10-15',
    rest: '90s',
    videoUrl: hangingLegRaisesVideo,
    primaryMuscles: ['Rectus Abdominis (especially lower abs)', 'Hip Flexors'],
    secondaryMuscles: ['Obliques', 'Transverse Abdominis'],
    stabilizers: ['Forearms', 'Lats', 'Shoulders'],
    howToPerform: [
      'Hang from pull-up bar with overhand grip',
      'Engage core and keep shoulders pulled down',
      'Raise legs up by bending at hips',
      'Lift until thighs are parallel to ground (or higher)',
      'Hold briefly at top',
      'Lower with control back to starting position'
    ],
    commonMistakes: [
      'Swinging/using momentum',
      'Not controlling the descent',
      'Shrugging shoulders up',
      'Partial range of motion',
      'Bending knees excessively (if doing straight leg)'
    ],
    coachingCues: [
      '"No swinging"',
      '"Control up and down"',
      '"Pull legs to parallel"',
      '"Engage your core"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-10 (bent knees)', rest: '90s' },
      intermediate: { sets: 3, reps: '10-15', rest: '90s' },
      advanced: { sets: 4, reps: '15-20 (straight legs)', rest: '120s' }
    },
    warmupTips: [
      'Dead hangs',
      'Knee raises',
      'Core activation',
      'Hip flexor stretches'
    ],
    contraindications: [
      'Lower back pain - avoid or modify to knee raises',
      'Grip strength issues - use straps',
      'Shoulder impingement - check form or skip'
    ],
    relatedExercises: [
      { name: 'Pull-Up', slug: 'pull-up', image: 'https://images.unsplash.com/photo-1677165733273-dcc3724c00e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxsJTIwdXAlMjBjaGluJTIwdXAlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Crunches', slug: 'crunches', image: 'https://images.unsplash.com/photo-1758521960576-626603dfd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVuY2hlcyUyMGFicyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2ODE4NHww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'mountain-climbers': {
    id: 'ex-42',
    name: 'Mountain Climbers',
    slug: 'mountain-climbers',
    level: 'intermediate',
    equipment: 'Bodyweight',
    mechanics: 'Compound',
    targetAreas: ['Core', 'Cardio'],
    sets: 3,
    reps: '20-30',
    rest: '45s',
    videoUrl: mountainClimbersVideo,
    primaryMuscles: ['Rectus Abdominis', 'Hip Flexors'],
    secondaryMuscles: ['Obliques', 'Shoulders', 'Quadriceps'],
    stabilizers: ['Core (Full)', 'Glutes', 'Triceps'],
    howToPerform: [
      'Start in high plank position, hands under shoulders',
      'Bring right knee toward chest',
      'Quickly switch legs, bringing left knee to chest',
      'Continue alternating in a "running" motion',
      'Keep hips level, core engaged',
      'Maintain plank position throughout'
    ],
    commonMistakes: [
      'Hips bouncing up and down',
      'Going too slowly (defeats cardio purpose)',
      'Rounding back',
      'Not bringing knees far enough forward',
      'Holding breath'
    ],
    coachingCues: [
      '"Run in place"',
      '"Keep hips level"',
      '"Drive knees to chest"',
      '"Breathe steadily"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '15-20 (slower pace)', rest: '60s' },
      intermediate: { sets: 3, reps: '20-30', rest: '45s' },
      advanced: { sets: 4, reps: '30-40 (fast pace)', rest: '60s' }
    },
    warmupTips: [
      'High knees',
      'Plank holds',
      'Leg swings',
      'Dynamic stretching'
    ],
    contraindications: [
      'Wrist pain - use push-up bars or fists',
      'Shoulder issues - modify or skip',
      'Lower back pain - slow down and check form'
    ],
    relatedExercises: [
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Burpees', slug: 'burpees', image: 'https://images.unsplash.com/photo-1743767587687-9ebaac2b55e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJwZWVzJTIwY2FyZGlvJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY4MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== CARDIO/FULL BODY =====
  'burpees': {
    id: 'ex-43',
    name: 'Burpees',
    slug: 'burpees',
    level: 'intermediate',
    equipment: 'Bodyweight',
    mechanics: 'Compound',
    targetAreas: ['Full Body', 'Cardio'],
    sets: 3,
    reps: '10-15',
    rest: '60s',
    videoUrl:burpeesVideo,
    primaryMuscles: ['Quadriceps', 'Chest', 'Shoulders', 'Triceps'],
    secondaryMuscles: ['Core', 'Glutes', 'Hamstrings', 'Calves'],
    stabilizers: ['Full Body', 'Cardiovascular System'],
    howToPerform: [
      'Start standing, feet shoulder-width apart',
      'Drop into squat position, place hands on ground',
      'Jump feet back into plank position',
      'Perform push-up (optional but recommended)',
      'Jump feet forward back to squat position',
      'Explosively jump up, reaching arms overhead'
    ],
    commonMistakes: [
      'Not doing full push-up',
      'Landing too hard on feet',
      'Arching back in plank',
      'Not jumping high enough',
      'Going too fast and losing form'
    ],
    coachingCues: [
      '"Smooth transitions"',
      '"Chest to ground"',
      '"Explosive jump"',
      '"Control your landings"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-10 (no push-up)', rest: '90s' },
      intermediate: { sets: 3, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20 (fast pace)', rest: '75s' }
    },
    warmupTips: [
      'Jumping jacks',
      'High knees',
      'Dynamic stretching',
      'Light cardio'
    ],
    contraindications: [
      'Wrist pain - modify hand position',
      'Knee issues - step instead of jump',
      'Shoulder problems - skip push-up portion'
    ],
    relatedExercises: [
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Mountain Climbers', slug: 'mountain-climbers', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Barbell Squat', slug: 'barbell-squat', image: 'https://images.unsplash.com/photo-1703071078311-e18baf7c4ff7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZWxsJTIwc3F1YXQlMjBsZWclMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  // ===== ADDITIONAL POPULAR EXERCISES =====
  'cable-crunches': {
    id: 'ex-44',
    name: 'Cable Crunches',
    slug: 'cable-crunches',
    level: 'intermediate',
    equipment: 'Cable Machine',
    mechanics: 'Isolation',
    targetAreas: ['Core', 'Abs'],
    sets: 3,
    reps: '15-20',
    rest: '45s',
    videoUrl: cableCrunchesVideo ,
    primaryMuscles: ['Rectus Abdominis'],
    secondaryMuscles: ['Obliques', 'Transverse Abdominis'],
    stabilizers: ['Hip Flexors', 'Serratus Anterior'],
    howToPerform: [
      'Attach rope to high cable pulley',
      'Kneel below pulley, holding rope with both hands by ears',
      'Keep hips stationary throughout movement',
      'Crunch down by contracting abs, bringing elbows toward knees',
      'Hold contraction for 1 second at bottom',
      'Return to starting position with control'
    ],
    commonMistakes: [
      'Using hip flexors instead of abs',
      'Pulling with arms instead of crunching',
      'Not keeping hips stationary',
      'Using too much weight',
      'Incomplete range of motion'
    ],
    coachingCues: [
      '"Crunch your abs, not your arms"',
      '"Hips stay locked"',
      '"Squeeze at the bottom"',
      '"Control both directions"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15', rest: '45s' },
      intermediate: { sets: 3, reps: '15-20', rest: '45s' },
      advanced: { sets: 4, reps: '20-25', rest: '60s' }
    },
    warmupTips: [
      'Light core activation',
      'Cat-cow stretches',
      'Kneeling holds',
      'Start with light weight'
    ],
    contraindications: [
      'Lower back pain - reduce weight or skip',
      'Knee issues - use padding under knees',
      'Neck strain - don\'t pull rope down'
    ],
    relatedExercises: [
      { name: 'Crunches', slug: 'crunches', image: 'https://images.unsplash.com/photo-1758521960576-626603dfd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVuY2hlcyUyMGFicyUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2ODE4NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Hanging Leg Raises', slug: 'hanging-leg-raises', image: 'https://images.unsplash.com/photo-1599519688490-99e859e7b516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwbGVnJTIwcmFpc2VzfGVufDF8fHx8MTc2MjA2ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'ab-wheel-rollout': {
    id: 'ex-45',
    name: 'Ab Wheel Rollout',
    slug: 'ab-wheel-rollout',
    level: 'advanced',
    equipment: 'Ab Wheel',
    mechanics: 'Compound',
    targetAreas: ['Core', 'Abs'],
    sets: 3,
    reps: '8-12',
    rest: '90s',
    videoUrl: abWheelRolloutVideo,
    primaryMuscles: ['Rectus Abdominis', 'Transverse Abdominis'],
    secondaryMuscles: ['Obliques', 'Erector Spinae', 'Lats'],
    stabilizers: ['Shoulders', 'Hip Flexors', 'Serratus Anterior'],
    howToPerform: [
      'Start on knees with ab wheel in front, hands on handles',
      'Brace core tight, keeping back neutral',
      'Roll wheel forward slowly, extending body',
      'Go as far as you can without arching lower back',
      'Contract abs powerfully to roll back to start',
      'Keep arms relatively straight throughout'
    ],
    commonMistakes: [
      'Arching lower back (major injury risk)',
      'Going too far without proper strength',
      'Using arms to pull back instead of abs',
      'Not bracing core before rolling out',
      'Holding breath'
    ],
    coachingCues: [
      '"Tight core before you roll"',
      '"Don\'t let your back arch"',
      '"Pull back with your abs"',
      '"Control the rollout"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '5-8 (partial range)', rest: '90s' },
      intermediate: { sets: 3, reps: '8-12', rest: '90s' },
      advanced: { sets: 4, reps: '12-15 (full extension)', rest: '120s' }
    },
    warmupTips: [
      'Plank holds',
      'Cat-cow stretches',
      'Shoulder warm-up',
      'Start with wall rollouts if new'
    ],
    contraindications: [
      'Lower back pain - AVOID or use wall version',
      'Shoulder issues - may aggravate',
      'Weak core - build strength first with planks'
    ],
    relatedExercises: [
      { name: 'Plank', slug: 'plank', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Mountain Climbers', slug: 'mountain-climbers', image: 'https://images.unsplash.com/photo-1758599878908-596c2042f563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFuayUyMGV4ZXJjaXNlJTIwY29yZXxlbnwxfHx8fDE3NjIwNDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Hanging Leg Raises', slug: 'hanging-leg-raises', image: 'https://images.unsplash.com/photo-1599519688490-99e859e7b516?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5naW5nJTIwbGVnJTIwcmFpc2VzfGVufDF8fHx8MTc2MjA2ODE4NXww&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'overhead-tricep-extension': {
    id: 'ex-46',
    name: 'Overhead Tricep Extension',
    slug: 'overhead-tricep-extension',
    level: 'beginner',
    equipment: 'Dumbbell or Cable',
    mechanics: 'Isolation',
    targetAreas: ['Arms', 'Triceps'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl:overheadTricepExtensionVideo,
    primaryMuscles: ['Triceps Brachii (Long Head)'],
    secondaryMuscles: ['Triceps Lateral Head', 'Triceps Medial Head'],
    stabilizers: ['Core', 'Shoulders', 'Forearms'],
    howToPerform: [
      'Stand or sit with dumbbell held with both hands overhead',
      'Elbows should point forward, upper arms close to head',
      'Lower dumbbell behind head by bending elbows',
      'Keep upper arms stationary throughout',
      'Extend elbows to press weight back to start position',
      'Squeeze triceps at top'
    ],
    commonMistakes: [
      'Flaring elbows out to sides',
      'Moving upper arms during the exercise',
      'Using too much weight',
      'Arching lower back',
      'Incomplete range of motion'
    ],
    coachingCues: [
      '"Elbows stay forward"',
      '"Full stretch at bottom"',
      '"Squeeze at the top"',
      '"Upper arms don\'t move"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '60s' },
      intermediate: { sets: 3, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20', rest: '75s' }
    },
    warmupTips: [
      'Arm circles',
      'Light tricep pushdowns',
      'Shoulder mobility work',
      'Start with very light weight'
    ],
    contraindications: [
      'Shoulder issues - avoid or use cable version',
      'Elbow pain - reduce weight or ROM',
      'Limited shoulder mobility - work on flexibility first'
    ],
    relatedExercises: [
      { name: 'Skull Crushers', slug: 'skull-crushers', image: 'https://images.unsplash.com/photo-1723233536322-588ceaaab013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmljZXAlMjBleHRlbnNpb24lMjBvdmVyaGVhZHxlbnwxfHx8fDE3NjIwODU1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Tricep Pushdown', slug: 'tricep-pushdown', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmljZXAlMjBwdXNoZG93biUyMGNhYmxlfGVufDF8fHx8MTc2MjA2NzM1NHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dips', slug: 'dips', image: 'https://images.unsplash.com/photo-1599753983068-1e4d569d20b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBzJTIwdHJpY2VwJTIwY2hlc3R8ZW58MXx8fHwxNzYyMDY3MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'incline-bench-press': {
    id: 'ex-47',
    name: 'Incline Bench Press',
    slug: 'incline-bench-press',
    level: 'intermediate',
    equipment: 'Barbell',
    mechanics: 'Compound',
    targetAreas: ['Chest', 'Upper Chest'],
    sets: 4,
    reps: '6-10',
    rest: '120s',
    videoUrl: inclineBenchVideo,
    primaryMuscles: ['Pectoralis Major (Clavicular Head)', 'Upper Chest'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    stabilizers: ['Core', 'Rotator Cuff', 'Serratus Anterior'],
    howToPerform: [
      'Set bench to 30-45 degree incline',
      'Lie back, feet flat on floor, slight arch in lower back',
      'Grip barbell slightly wider than shoulder-width',
      'Unrack bar and position over upper chest',
      'Lower bar to upper chest in controlled motion',
      'Press back up explosively, driving through chest'
    ],
    commonMistakes: [
      'Bench angle too steep (targets shoulders more)',
      'Bench angle too shallow (becomes flat bench)',
      'Bouncing bar off chest',
      'Flaring elbows too wide',
      'Not touching chest'
    ],
    coachingCues: [
      '"Upper chest dominates"',
      '"Bar to collarbone area"',
      '"Drive through your chest"',
      '"Keep shoulder blades retracted"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '8-10', rest: '120s' },
      intermediate: { sets: 4, reps: '6-10', rest: '120s' },
      advanced: { sets: 4, reps: '5-8', rest: '150s' }
    },
    warmupTips: [
      'Rotator cuff activation',
      'Chest stretches',
      'Light pressing sets',
      'Shoulder mobility work'
    ],
    contraindications: [
      'Shoulder impingement - reduce angle or skip',
      'Shoulder instability - use dumbbells instead',
      'Lower back pain - ensure proper arch, not excessive'
    ],
    relatedExercises: [
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Incline Dumbbell Press', slug: 'incline-dumbbell-press', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsaW5lJTIwZHVtYmJlbGwlMjBwcmVzc3xlbnwxfHx8fDE3NjIwNjczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dips', slug: 'dips', image: 'https://images.unsplash.com/photo-1599753983068-1e4d569d20b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBzJTIwdHJpY2VwJTIwY2hlc3R8ZW58MXx8fHwxNzYyMDY3MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'dumbbell-chest-press': {
    id: 'ex-48',
    name: 'Dumbbell Chest Press',
    slug: 'dumbbell-chest-press',
    level: 'beginner',
    equipment: 'Dumbbells',
    mechanics: 'Compound',
    targetAreas: ['Chest', 'Pectorals'],
    sets: 4,
    reps: '8-12',
    rest: '90s',
    videoUrl: dumbbellPressVideo,
    primaryMuscles: ['Pectoralis Major', 'Chest'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    stabilizers: ['Rotator Cuff', 'Core', 'Serratus Anterior'],
    howToPerform: [
      'Lie on flat bench with feet flat on floor',
      'Hold dumbbells at chest level, palms forward',
      'Retract shoulder blades, create slight arch',
      'Press dumbbells up until arms fully extended',
      'Dumbbells should come together at top (not touch)',
      'Lower with control to starting position'
    ],
    commonMistakes: [
      'Dumbbells clashing at top',
      'Not going deep enough at bottom',
      'Excessive arching of back',
      'Elbows flaring too wide',
      'Feet not planted firmly'
    ],
    coachingCues: [
      '"Squeeze chest at top"',
      '"Deep stretch at bottom"',
      '"Control both directions"',
      '"Shoulder blades stay back"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '90s' },
      intermediate: { sets: 4, reps: '8-12', rest: '90s' },
      advanced: { sets: 4, reps: '8-10 (heavier)', rest: '120s' }
    },
    warmupTips: [
      'Chest stretches',
      'Rotator cuff activation',
      'Light pressing with small dumbbells',
      'Shoulder warm-up'
    ],
    contraindications: [
      'Shoulder pain - reduce ROM or weight',
      'Wrist issues - use neutral grip',
      'Unstable shoulder - use machine press instead'
    ],
    relatedExercises: [
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Push-Up', slug: 'push-up', image: 'https://images.unsplash.com/photo-1760084081757-6f918c08403b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNodXBzJTIwYm9keXdlaWdodCUyMGV4ZXJjaXNlfGVufDF8fHx8MTc2MjA2NzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dumbbell Flyes', slug: 'dumbbell-flyes', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsaW5lJTIwZHVtYmJlbGwlMjBwcmVzc3xlbnwxfHx8fDE3NjIwNjczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'cable-chest-fly': {
    id: 'ex-49',
    name: 'Cable Chest Fly',
    slug: 'cable-chest-fly',
    level: 'intermediate',
    equipment: 'Cable Machine',
    mechanics: 'Isolation',
    targetAreas: ['Chest', 'Pectorals'],
    sets: 3,
    reps: '12-15',
    rest: '60s',
    videoUrl: cableFlyesVideo ,
    primaryMuscles: ['Pectoralis Major', 'Chest'],
    secondaryMuscles: ['Anterior Deltoids'],
    stabilizers: ['Core', 'Rotator Cuff', 'Biceps'],
    howToPerform: [
      'Set cable pulleys to chest height or slightly above',
      'Stand in center, grab handles with palms facing forward',
      'Step forward slightly, arms extended to sides',
      'Slight bend in elbows, maintain throughout',
      'Bring hands together in front of chest in hugging motion',
      'Squeeze chest at peak contraction, return with control'
    ],
    commonMistakes: [
      'Bending elbows too much (becomes a press)',
      'Going too heavy and losing form',
      'Not maintaining constant tension',
      'Rushing the movement',
      'Letting shoulders round forward'
    ],
    coachingCues: [
      '"Hug a tree"',
      '"Squeeze at the center"',
      '"Feel the stretch"',
      '"Constant tension on chest"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '10-12', rest: '60s' },
      intermediate: { sets: 3, reps: '12-15', rest: '60s' },
      advanced: { sets: 4, reps: '15-20', rest: '75s' }
    },
    warmupTips: [
      'Chest stretches',
      'Arm circles',
      'Light cable work',
      'Shoulder warm-up'
    ],
    contraindications: [
      'Shoulder impingement - adjust cable height',
      'Rotator cuff injury - avoid or use very light weight',
      'Pec tear history - consult physician first'
    ],
    relatedExercises: [
      { name: 'Cable Flyes', slug: 'cable-flyes', image: 'https://images.unsplash.com/photo-1761330933482-f10e44b3a9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWJsZSUyMGZseSUyMGNoZXN0fGVufDF8fHx8MTc2MjA2NzM1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dumbbell Flyes', slug: 'dumbbell-flyes', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNsaW5lJTIwZHVtYmJlbGwlMjBwcmVzc3xlbnwxfHx8fDE3NjIwNjczNTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Bench Press', slug: 'bench-press', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  },
  
  'kettlebell-swings': {
    id: 'ex-50',
    name: 'Kettlebell Swings',
    slug: 'kettlebell-swings',
    level: 'intermediate',
    equipment: 'Kettlebell',
    mechanics: 'Compound',
    targetAreas: ['Full Body', 'Glutes', 'Hamstrings'],
    sets: 3,
    reps: '15-20',
    rest: '75s',
    videoUrl: kettlebellSwingsVideo,
    primaryMuscles: ['Gluteus Maximus', 'Hamstrings', 'Erector Spinae'],
    secondaryMuscles: ['Quadriceps', 'Core', 'Shoulders', 'Lats'],
    stabilizers: ['Full Body', 'Grip Strength', 'Cardiovascular System'],
    howToPerform: [
      'Stand with feet shoulder-width, kettlebell on floor between feet',
      'Hinge at hips, grab kettlebell with both hands',
      'Hike kettlebell back between legs',
      'Explosively drive hips forward to swing kettlebell up',
      'Swing to shoulder height (Russian) or overhead (American)',
      'Let momentum carry kettlebell back down, hinge and repeat'
    ],
    commonMistakes: [
      'Squatting instead of hip hinging',
      'Using arms to lift instead of hips',
      'Rounding lower back',
      'Not driving hips explosively',
      'Going too heavy too soon'
    ],
    coachingCues: [
      '"Power from the hips"',
      '"Pop your hips"',
      '"Arms are ropes"',
      '"Tight core throughout"'
    ],
    programmingGuide: {
      beginner: { sets: 3, reps: '12-15 (light)', rest: '90s' },
      intermediate: { sets: 3, reps: '15-20', rest: '75s' },
      advanced: { sets: 4, reps: '20-25 (heavier)', rest: '90s' }
    },
    warmupTips: [
      'Hip hinge practice',
      'Glute activation',
      'Light swings with no weight',
      'Hip mobility drills'
    ],
    contraindications: [
      'Lower back issues - master hip hinge first or skip',
      'Shoulder problems - stick to Russian swings (shoulder height)',
      'Grip strength - use chalk or straps if needed'
    ],
    relatedExercises: [
      { name: 'Romanian Deadlift', slug: 'romanian-deadlift', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmlhbiUyMGRlYWRsaWZ0JTIwYmFyYmVsbHxlbnwxfHx8fDE3NjIwNjcxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Deadlift', slug: 'deadlift', image: 'https://images.unsplash.com/photo-1748548402067-d8271db67849?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWFkbGlmdCUyMGJhcmJlbGwlMjBleGVyY2lzZXxlbnwxfHx8fDE3NjIwNjYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Burpees', slug: 'burpees', image: 'https://images.unsplash.com/photo-1743767587687-9ebaac2b55e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJwZWVzJTIwY2FyZGlvJTIwZXhlcmNpc2V8ZW58MXx8fHwxNzYyMDY4MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ]
  }
};

export default function WorkoutExerciseDetailPage() {
  const { exerciseSlug } = useParams<{ exerciseSlug: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [muscleView, setMuscleView] = useState<'front' | 'back'>('front');
  const [showAnimatedDemo, setShowAnimatedDemo] = useState(false);

  const exercise = exerciseSlug ? exerciseDatabase[exerciseSlug] : null;

  // Handle Escape key to go back
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [navigate]);

  // If exercise not found, show a "Coming Soon" page
  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
            </div>
            <nav className="space-y-2">
              <Link to="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Button>
              </Link>
              <Link to="/workouts">
                <Button variant="secondary" className="w-full justify-start">
                  <Dumbbell className="w-5 h-5 mr-3" />
                  Workouts
                </Button>
              </Link>
              <Link to="/diet/new-plan">
                <Button variant="ghost" className="w-full justify-start">
                  <Utensils className="w-5 h-5 mr-3" />
                  Diet Plans
                </Button>
              </Link>
              <Link to="/progress">
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Progress
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>

            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <Activity className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h1 className="text-3xl mb-4" style={{ fontWeight: 700 }}>
                  Exercise Details — Coming Soon
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  We're working on adding detailed information for <span style={{ fontWeight: 600 }}>{exerciseSlug?.replace(/-/g, ' ')}</span>.
                </p>
                <p className="text-gray-500 mb-8">
                  Check back soon for comprehensive exercise guides including proper form, muscle activation, and programming recommendations.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Results
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => navigate('/workouts')}
                  >
                    Browse All Exercises
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      toast.success('Exercise saved to your favorites! 💪');
    } else {
      toast('Exercise removed from favorites');
    }
  };

  const handleShare = () => {
    toast.success('Share link copied to clipboard!');
  };

  const handleStartWorkout = () => {
    setShowAnimatedDemo(true);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-500';
      case 'intermediate': return 'bg-purple-500';
      case 'advanced': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  // Get muscle category from target areas
  const getMuscleCategory = () => {
    const firstTarget = exercise.targetAreas[0]?.toLowerCase() || '';
    if (firstTarget.includes('chest')) return 'Chest';
    if (firstTarget.includes('back')) return 'Back';
    if (firstTarget.includes('leg')) return 'Legs';
    if (firstTarget.includes('shoulder')) return 'Shoulders';
    if (firstTarget.includes('arm')) return 'Arms';
    if (firstTarget.includes('core')) return 'Core';
    return 'All';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Animated Exercise Demo Modal */}
      {showAnimatedDemo && (
        <AnimatedExerciseDemo
          exerciseName={exercise.name}
          primaryMuscles={exercise.primaryMuscles}
          onClose={() => setShowAnimatedDemo(false)}
        />
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
            <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitness</span>
          </div>
          <nav className="space-y-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="w-5 h-5 mr-3" />
                Home
              </Button>
            </Link>
            <Link to="/workouts">
              <Button variant="secondary" className="w-full justify-start">
                <Dumbbell className="w-5 h-5 mr-3" />
                Workouts
              </Button>
            </Link>
            <Link to="/diet">
              <Button variant="ghost" className="w-full justify-start">
                <Utensils className="w-5 h-5 mr-3" />
                Diet Plans
              </Button>
            </Link>
            <Link to="/progress">
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="w-5 h-5 mr-3" />
                Progress
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="w-5 h-5 mr-3" />
                Profile
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/workouts" className="text-gray-600 hover:text-gray-900">
                  Workouts
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/workouts" className="text-gray-600 hover:text-gray-900">
                  {getMuscleCategory()}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900" style={{ fontWeight: 600 }}>
                {exercise.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button with keyboard hint */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span className="text-xs text-gray-400">
            Press <kbd className="px-2 py-1 bg-gray-100 border rounded text-gray-600">Esc</kbd> to go back
          </span>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Hero Section - 2 Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Video Placeholder */}
            {/* Left: Video Player */}
<Card className="overflow-hidden border-2 border-gray-200 shadow-lg">
  <div className="aspect-video relative bg-black">
    <video
      src={exercise.videoUrl}
      controls
      className="w-full h-full object-cover"
    />
  </div>
</Card>


            {/* Right: Summary Card */}
            <Card className="border-2 border-gray-200 shadow-lg">
              <CardContent className="p-8">
                <h1 className="text-4xl mb-4" style={{ fontWeight: 700 }}>{exercise.name}</h1>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm text-white ${getLevelColor(exercise.level)}`} style={{ fontWeight: 600 }}>
                      {exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Equipment:</span>
                    <span style={{ fontWeight: 600 }}>{exercise.equipment}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Mechanics:</span>
                    <span style={{ fontWeight: 600 }}>{exercise.mechanics}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-24">Target Areas:</span>
                    <div className="flex flex-wrap gap-2">
                      {exercise.targetAreas.map((area, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm" style={{ fontWeight: 600 }}>
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border-2 border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">Recommended</p>
                  <p className="text-2xl" style={{ fontWeight: 700 }}>
                    {exercise.sets} sets × {exercise.reps} reps
                  </p>
                  <p className="text-gray-600 mt-1">Rest: {exercise.rest}</p>
                </div>

                <div className="flex gap-3 flex-wrap">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
                    onClick={handleStartWorkout}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Guided Workout
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className={`border-2 ${isFavorited ? 'border-red-500 text-red-600 hover:bg-red-50' : ''}`}
                    onClick={handleSave}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : ''}`} />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2"
                    onClick={handleShare}
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3D Interactive Muscle Anatomy Viewer */}
          <Card className="mb-8 border-2 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-10 h-10 text-blue-600" />
                <div>
                  <h2 className="text-3xl" style={{ fontWeight: 700 }}>
                    <span className="bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                      3D Interactive Muscle Anatomy
                    </span>
                  </h2>
                  <p className="text-gray-600">Drag to rotate • Hover for muscle details</p>
                </div>
              </div>
              
              <MuscleAnatomyViewer
                selectedExerciseId={(() => {
                  // Map exercise slugs to our exercise database IDs
                  const slugToId: { [key: string]: string } = {
                    'barbell-squat': 'squat',
                    'deadlift': 'deadlift',
                    'bench-press': 'barbell-bench-press',
                    'barbell-row': 'barbell-row',
                    'overhead-press': 'overhead-press',
                    'pull-up': 'pull-ups',
                    'dips': 'tricep-dips',
                    'bicep-curls': 'bicep-curl',
                    'tricep-pushdown': 'overhead-tricep-extension',
                    'lateral-raises': 'lateral-raise',
                    'lunge': 'lunge',
                    'leg-press': 'leg-press',
                    'leg-curl': 'leg-curl',
                    'leg-extension': 'leg-press',
                    'calf-raises': 'calf-raise',
                    'plank': 'plank',
                    'crunches': 'crunch',
                    'hanging-leg-raises': 'leg-raise',
                    'push-up': 'push-ups',
                    'dumbbell-flyes': 'dumbbell-fly',
                    'incline-dumbbell-press': 'incline-dumbbell-press',
                    'hammer-curls': 'hammer-curl',
                    'face-pulls': 'face-pull',
                    'romanian-deadlift': 'deadlift',
                    'lat-pulldown': 'lat-pulldown',
                    'front-raises': 'front-raise',
                    'russian-twist': 'russian-twist',
                  };
                  return slugToId[exercise.slug] || 'barbell-bench-press';
                })()}
              />
            </CardContent>
          </Card>

          {/* How-To & Form Guide */}
          <Card className="mb-8 border-2 border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6" style={{ fontWeight: 700 }}>
                📖 How-To & Form Guide
              </h2>

              <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl" style={{ fontWeight: 700 }}>
                    <CheckCircle2 className="w-6 h-6 mr-3 text-green-600" />
                    How to Perform
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-4 mt-4">
                      {exercise.howToPerform.map((step, idx) => (
                        <li key={idx} className="flex gap-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ fontWeight: 700 }}>
                            {idx + 1}
                          </div>
                          <p className="text-gray-700 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl" style={{ fontWeight: 700 }}>
                    <AlertCircle className="w-6 h-6 mr-3 text-red-600" />
                    Common Mistakes to Avoid
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3 mt-4">
                      {exercise.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          <span className="text-red-600 text-xl">✗</span>
                          <p className="text-gray-700">{mistake}</p>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl" style={{ fontWeight: 700 }}>
                    💬 Coaching Cues
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {exercise.coachingCues.map((cue, idx) => (
                        <div key={idx} className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                          <p className="text-blue-900 italic" style={{ fontWeight: 600 }}>{cue}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Programming Guide */}
          <Card className="mb-8 border-2 border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6" style={{ fontWeight: 700 }}>
                📊 Programming Guide (By Level)
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Beginner */}
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full" style={{ fontWeight: 700 }}>
                      Beginner
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.beginner.sets}
                      </p>
                      <p className="text-gray-600">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.beginner.reps}
                      </p>
                      <p className="text-gray-600">Reps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.beginner.rest}
                      </p>
                      <p className="text-gray-600">Rest</p>
                    </div>
                  </div>
                </div>

                {/* Intermediate */}
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-2 bg-purple-500 text-white rounded-full" style={{ fontWeight: 700 }}>
                      Intermediate
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.intermediate.sets}
                      </p>
                      <p className="text-gray-600">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.intermediate.reps}
                      </p>
                      <p className="text-gray-600">Reps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.intermediate.rest}
                      </p>
                      <p className="text-gray-600">Rest</p>
                    </div>
                  </div>
                </div>

                {/* Advanced */}
                <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                  <div className="text-center mb-4">
                    <span className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full" style={{ fontWeight: 700 }}>
                      Advanced
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.advanced.sets}
                      </p>
                      <p className="text-gray-600">Sets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.advanced.reps}
                      </p>
                      <p className="text-gray-600">Reps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl mb-1" style={{ fontWeight: 700 }}>
                        {exercise.programmingGuide.advanced.rest}
                      </p>
                      <p className="text-gray-600">Rest</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety & Mobility */}
          <Card className="mb-8 border-2 border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6" style={{ fontWeight: 700 }}>
                🛡️ Safety & Mobility
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Warm-up Tips */}
                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-xl mb-4 text-green-700" style={{ fontWeight: 700 }}>
                    ✓ Warm-up Tips
                  </h3>
                  <ul className="space-y-3">
                    {exercise.warmupTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contraindications */}
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                  <h3 className="text-xl mb-4 text-red-700" style={{ fontWeight: 700 }}>
                    ⚠️ Contraindications
                  </h3>
                  <ul className="space-y-3">
                    {exercise.contraindications.map((item, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Exercises */}
          <Card className="mb-8 border-2 border-gray-200 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-6" style={{ fontWeight: 700 }}>
                💡 Related Exercises
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {exercise.relatedExercises.map((related, idx) => (
                  <Card 
                    key={idx} 
                    className="group hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-blue-400"
                    onClick={() => navigate(`/exercise/${related.slug}`)}
                  >
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white" style={{ fontWeight: 700 }}>{related.name}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        View Exercise →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
