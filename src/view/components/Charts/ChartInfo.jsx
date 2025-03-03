import React from 'react';
import { Card } from 'primereact/card';

const ChartInfo = ({ min, max, avg, volatility }) => {
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0.000000';
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(num);
  };

  const formatVolatility = (vol) => {
    if (vol === null || vol === undefined) return '0.00';
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(vol);
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Минимум</div>
        <div className="text-lg font-mono text-gray-800 dark:text-white">
          {formatNumber(min)}
        </div>
      </Card>
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Максимум</div>
        <div className="text-lg font-mono text-gray-800 dark:text-white">
          {formatNumber(max)}
        </div>
      </Card>
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Средний курс</div>
        <div className="text-lg font-mono text-gray-800 dark:text-white">
          {formatNumber(avg)}
        </div>
      </Card>
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Волатильность</div>
        <div className="text-lg font-mono text-gray-800 dark:text-white">
          {formatVolatility(volatility)}%
        </div>
      </Card>
    </div>
  );
};

export default ChartInfo;