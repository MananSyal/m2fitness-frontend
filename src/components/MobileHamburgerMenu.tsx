import { useNavigate, useLocation } from 'react-router-dom';
import { Utensils, Dumbbell, Heart, Calculator, Users, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileHamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileHamburgerMenu({ isOpen, onClose }: MobileHamburgerMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Utensils, label: 'Diet', path: '/diet/new-plan', activeColor: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Dumbbell, label: 'Workout', path: '/workouts', activeColor: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: Heart, label: 'Anatomy', path: '/muscle-anatomy', activeColor: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: Calculator, label: 'Protein', path: '/protein-calculator', activeColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: Users, label: 'Community', path: '/community', activeColor: 'text-pink-600', bgColor: 'bg-pink-50' },
    { icon: BookOpen, label: 'Blog', path: '/blog', activeColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            onClick={onClose}
          />

          {/* Slide-out Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl z-[70] md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
                <span className="text-lg" style={{ fontWeight: 700 }}>M2Fitnes</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                      active 
                        ? `${item.bgColor} ${item.activeColor} border-l-4 ${item.activeColor.replace('text-', 'border-')}` 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? item.activeColor : 'text-gray-500'}`} />
                    <span className={active ? 'font-semibold' : 'font-normal'}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                M2Fitnes &copy; 2025
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
