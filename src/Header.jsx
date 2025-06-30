import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import rentCreditLogo from '/logos/rentcredit-transparent.png';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';

const Header = ({ userType = 'tenant', userName = 'User' }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, role, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <header className="w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 md:px-8 py-2 flex items-center justify-between z-20 relative">
      {/* Left: Logo & Brand */}
      <Link to="/" className="flex items-center gap-2 group">
        <img src={rentCreditLogo} alt="RentCredit Logo" className="h-8 w-auto invert-0 dark:invert" />
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">RentCredit</span>
      </Link>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline text-sm font-medium text-gray-900 dark:text-white">{user?.displayName || userName}</span>
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-30 transition-all duration-200 origin-top-right ${dropdownOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}
            role="menu"
          >
            <button
              onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-800 transition-colors text-sm"
              role="menuitem"
            >
              <Settings className="w-4 h-4" /> Personal Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-sm"
              role="menuitem"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 