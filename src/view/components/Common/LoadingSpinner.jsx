import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingSpinner = ({ 
  message = "Загрузка...", 
  description = "",
  showText = false 
}) => {
  if (showText) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <i className="pi pi-spinner animate-spin text-4xl text-blue-500"></i>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {message}
          </p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
    </div>
  );
};

export default LoadingSpinner;