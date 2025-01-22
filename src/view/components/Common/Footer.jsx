import React from 'react';

const Footer = () => (
  <footer className="w-full p-4 bg-gray-100 dark:bg-gray-800 text-center text-xs text-gray-500 dark:text-gray-400 mt-8 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-center space-x-2">
      <span>Powered by</span>
      <a 
        href="https://frankfurter.dev" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
      >
        Frankfurter API
      </a>
      <span>| &copy; {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;