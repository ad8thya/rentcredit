import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import rentCreditLogo from '/logos/rentcredit-transparent.png';
import { useTheme } from './ThemeContext';

const AuthHeader = () => {
  const { theme, toggleTheme } = useTheme();

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
      </div>
    </header>
  );
};

export default AuthHeader; 