import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User } from 'lucide-react';
import { Input } from './ui/input';
import MobileHamburgerMenu from './MobileHamburgerMenu';

interface MobileHeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export default function MobileHeader({ onSearch, showSearch = true }: MobileHeaderProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <>
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b shadow-sm">
          {/* Top Bar with Hamburger, Logo, and Login */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Left: Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors -ml-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>

            {/* Center: Logo */}
            <div className="flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg"></div>
              <span className="text-xl" style={{ fontWeight: 700 }}>M2Fitnes</span>
            </div>

            {/* Right: Login/Profile */}
            <button
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors -mr-2"
              aria-label="Login or Profile"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="px-4 pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search workouts, diets, blogs..."
                  className="pl-10 pr-4 h-11 text-sm bg-gray-50 border border-gray-300 focus:border-blue-400 rounded-lg w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleSearch();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Menu */}
      <MobileHamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}