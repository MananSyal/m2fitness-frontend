import { useNavigate, useLocation } from 'react-router-dom';
import { Utensils, Dumbbell, Heart, Calculator, Users, BookOpen } from 'lucide-react';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Utensils, label: 'Diet', path: '/diet/new-plan', activeColor: 'text-green-600' },
    { icon: Dumbbell, label: 'Workout', path: '/workouts', activeColor: 'text-orange-600' },
    { icon: Heart, label: 'Anatomy', path: '/muscle-anatomy', activeColor: 'text-red-600' },
    { icon: Calculator, label: 'Protein', path: '/protein-calculator', activeColor: 'text-purple-600' },
    { icon: Users, label: 'Community', path: '/community', activeColor: 'text-pink-600' },
    { icon: BookOpen, label: 'Blog', path: '/blog', activeColor: 'text-indigo-600' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center min-w-[56px] px-2 py-1.5 transition-all ${
                active ? item.activeColor : 'text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${active ? 'scale-110' : ''}`} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-[10px] ${active ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}