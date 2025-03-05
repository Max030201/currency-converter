import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const dateOptions = [
  { label: 'Все', value: null },
  { label: 'Сегодня', value: 'today' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
];

const HistoryFilter = ({
  search,
  onSearchChange,
  datePreset,
  onDatePresetChange,
  currencyList,
  currency,
  onCurrencyChange,
  disabled = false,
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 pb-[16px] md:pb-[16px] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <div className="flex flex-col flex-wrap items-start md:items-end md:flex-row gap-3">
      <div className="flex w-full flex-col space-y-1 md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Поиск</label>
        <InputText
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Поиск по валютам"
          className="w-full md:w-56 md:h-12 h-10 md:text-lg text-base md:px-3 px-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          disabled={disabled}
        />
      </div>
      <div className="flex w-full flex-col space-y-1 md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Валюта</label>
        <Dropdown
          value={currency}
          options={currencyList}
          onChange={e => onCurrencyChange(e.value)}
          optionLabel="label"
          optionValue="value"
          placeholder="Выберите валюту"
          className="w-full md:h-12 h-10 md:text-lg text-base flex-shrink-0 md:w-52 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
          filter
          showClear
          disabled={disabled}
        />
      </div>
      <div className="flex w-full flex-col space-y-1 md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Период</label>
        <Dropdown
          value={datePreset}
          options={dateOptions}
          onChange={e => onDatePresetChange(e.value)}
          placeholder="Период"
          className="w-full md:h-12 h-10 md:text-lg text-base flex-shrink-0 md:w-40 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
          disabled={disabled}
        />
      </div>
    </div>
  </div>
);

export default HistoryFilter;
