import React from 'react';

const PageLayout = ({ title, children, className = '' }) => (
  <div className={`my-4 md:my-6 flex justify-center ${className}`}>
    <div className="w-full max-w-screen-xl bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-gray-300 dark:border-gray-600 p-4 md:p-6 pb-[12px] md:pb-[12px]">
      {title && (
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {title}
        </h1>
      )}
      {children}
    </div>
  </div>
);

export default PageLayout;