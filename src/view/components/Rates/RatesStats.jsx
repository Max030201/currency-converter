import React from 'react';
import { Card } from 'primereact/card';

const RatesStats = ({ strongest, weakest, updatedAt, total, base }) => {
  const formatChange = (change) => {
    if (change === undefined || change === null) return '—';
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    }).format(change);
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-green-600 dark:text-green-400';
    if (change < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
  <div className="flex flex-wrap gap-4 mt-4">
      <Card className="flex-1 min-w-[180px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-green-600 dark:text-green-400 text-sm">Наибольший рост относительно {base}</div>
        <div className="text-lg font-medium text-gray-800 dark:text-white">
          {strongest?.name} ({strongest?.code})
        </div>
        <div className={`text-sm font-mono ${getChangeColor(strongest?.change)}`}>
          {formatChange(strongest?.change)}%
        </div>
    </Card>
      <Card className="flex-1 min-w-[180px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-red-600 dark:text-red-400 text-sm">Наибольшее падение относительно {base}</div>
        <div className="text-lg font-medium text-gray-800 dark:text-white">
          {weakest?.name} ({weakest?.code})
        </div>
        <div className={`text-sm font-mono ${getChangeColor(weakest?.change)}`}>
          {formatChange(weakest?.change)}%
        </div>
    </Card>
      <Card className="flex-1 min-w-[180px] bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Всего валют</div>
        <div className="text-2xl font-bold text-gray-800 dark:text-white">{total || 0}</div>
    </Card>
  </div>
);
};

export default RatesStats;