import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import RatesSearch from './RatesSearch';

const RatesFilter = ({ base, onBaseChange, baseOptions, search, onSearchChange, disabled = false }) => (
  <div className="flex flex-col md:flex-row gap-4 items-center mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="flex flex-col space-y-1 w-full md:w-72">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Базовая валюта</label>
    <Dropdown
      value={base}
      options={baseOptions}
      onChange={e => onBaseChange(e.value)}
      optionLabel="label"
      optionValue="code"
      placeholder="Выберите валюту"
      className="w-full md:h-12 h-10 md:text-lg text-base flex-shrink-0 bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
      filter
      showClear
      disabled={disabled}
    />
    </div>
    <div className="flex flex-col space-y-1 w-full md:w-72">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Поиск валюты</label>
      <RatesSearch value={search} onChange={onSearchChange} disabled={disabled} />
    </div>
  </div>
);

export default RatesFilter;
