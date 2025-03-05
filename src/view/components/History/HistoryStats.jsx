import React from 'react';
import { Card } from 'primereact/card';

const HistoryStats = ({ total, mostPopularPair, totalAmount }) => {

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Всего конвертаций</div>
        <div className="text-lg font-bold text-gray-800 dark:text-white">{total}</div>
      </Card>
      <Card className="flex-1 min-w-[150px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
        <div className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Популярная пара</div>
        <div className="text-lg font-mono text-gray-800 dark:text-white">{mostPopularPair}</div>
      </Card>
    </div>
  );
};

export default HistoryStats;
