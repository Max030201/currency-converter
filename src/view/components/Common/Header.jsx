import React from 'react';
import Navigation from './Navigation';
import ThemeToggle from './ThemeToggle';

const Header = ({ theme, onThemeToggle }) => (
  <header className="w-full shadow-md">
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">₿</span>
        </div>
        <span className="font-bold text-xl text-gray-800 dark:text-white">
          Currency Converter
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <Navigation />
        <ThemeToggle checked={theme === 'dark'} onChange={onThemeToggle} />
      </div>
    </div>
  </header>
);

export default Header;