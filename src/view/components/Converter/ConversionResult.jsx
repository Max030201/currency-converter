import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const ConversionResult = ({
  result,
  from,
  to,
  rate,
  onAddToHistory,
  showAddButton = true
}) => {
  if (!result) return null;
  
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(num);
  };
  
  return (
    <Card className="mt-4 mx-auto max-w-md text-center shadow-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 md:rounded-2xl rounded-xl md:p-6 p-3 animate-fade-in transition-all duration-300">
      <div className="md:text-5xl text-3xl font-extrabold mb-3 text-blue-600 dark:text-blue-400 drop-shadow-sm animate-fade-in">
        {formatNumber(result)} {to}
      </div>
      <div className="text-gray-500 dark:text-gray-300 mb-3 md:text-lg text-base">
        Курс: <span className="font-semibold text-gray-700 dark:text-white">1 {from} = {formatNumber(rate)} {to}</span>
      </div>
      {showAddButton && (
        <Button
          label="Добавить в историю"
          icon="pi pi-clock"
          className="p-button-success mt-2 rounded-lg shadow-sm md:text-base text-sm md:py-3 py-2 md:px-6 px-3"
          onClick={onAddToHistory}
        />
      )}
    </Card>
  );
};

export default ConversionResult;