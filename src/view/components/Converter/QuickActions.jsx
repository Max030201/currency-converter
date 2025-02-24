import React from 'react';
import { Button } from 'primereact/button';
import { PiStarDuotone, PiClockDuotone } from 'react-icons/pi';

const QuickActions = ({ 
  popularPairs = [], 
  onSelectPair = () => {}, 
  recentConversions = [], 
  onSelectHistory = () => {},
  onConvert = null
 }) => (
  <div className="flex flex-col md:flex-row gap-4 mt-4">
    <div className="flex-1 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 mb-2 md:mb-0 transition-all">
      <div className="font-semibold mb-2 text-gray-800 dark:text-white text-base md:text-lg">Популярные пары:</div>
      <div className="flex flex-wrap gap-2">
        {popularPairs.length > 0 ? (
          popularPairs.map(pair => (
            <Button
              key={pair.from + pair.to}
              label={`${pair.from} → ${pair.to}`}
              className="pair-btn p-button-outlined p-button-sm bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 hover:bg-blue-100 hover:dark:bg-blue-900 transition rounded-md px-2"
              onClick={() => {
                onSelectPair(pair);
                if (onConvert) onConvert();
              }}
              aria-label={`Быстрая конвертация: ${pair.from} в ${pair.to}`}
            />
          ))
        ) : (
          <span className="flex items-center gap-2 text-gray-400 italic">
            <PiStarDuotone className="text-xl" /> Нет популярных пар
          </span>
        )}
      </div>
    </div>
    <div className="flex-1 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-4 transition-all">
      <div className="font-semibold mb-2 text-gray-800 dark:text-white text-base md:text-lg">Последние конвертации:</div>
      <div className="flex flex-wrap gap-2">
        {recentConversions.length > 0 ? (
          recentConversions.map((item, idx) => (
            <Button
              key={idx}
              label={`${item.amount} ${item.from} → ${item.to}`}
              className="pair-btn p-button-text p-button-sm opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-md px-2"
              disabled
              aria-label={`Повторить конвертацию: ${item.amount} ${item.from} в ${item.to}`}
            />
          ))
        ) : (
          <span className="flex items-center gap-2 text-gray-400 italic">
            <PiClockDuotone className="text-xl" /> Нет недавних конвертаций
          </span>
        )}
      </div>
    </div>
  </div>
);

export default QuickActions;
