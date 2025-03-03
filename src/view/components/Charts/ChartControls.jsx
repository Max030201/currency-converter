import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const periodOptions = [
  { label: '1 неделя', value: 7 },
  { label: '1 месяц', value: 30 },
  { label: '3 месяца', value: 90 },
  { label: '1 год', value: 365 },
];

const ChartControls = ({
  base,
  setBase,
  target,
  setTarget,
  currencyList,
  period,
  setPeriod,
  onRefresh,
  loading,
  disabled = false
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
    <div className="flex flex-col flex-wrap items-start md:items-end md:flex-row gap-4">
      <div className="flex flex-col space-y-1 w-full md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Базовая валюта</label>
        <Dropdown
          value={base}
          options={currencyList}
          onChange={e => setBase(e.value)}
          optionLabel="label"
          optionValue="code"
          placeholder="Выберите базовую валюту"
          className="w-full md:w-auto md:h-12 h-10 md:text-lg text-base flex-shrink-0 min-w-[100%] bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
          filter
          showClear
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col space-y-1 w-full md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Целевая валюта</label>
        <Dropdown
          value={target}
          options={currencyList}
          onChange={e => setTarget(e.value)}
          optionLabel="label"
          optionValue="code"
          placeholder="Выберите валюту"
          className="w-full md:w-auto md:h-12 h-10 md:text-lg text-base flex-shrink-0 min-w-[100%] bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
          filter
          showClear
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col space-y-1 w-full md:w-auto">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Период</label>
        <Dropdown
          value={period}
          options={periodOptions}
          onChange={e => setPeriod(e.value)}
          placeholder="Выберите период"
          className="w-full md:w-auto md:h-12 h-10 md:text-lg text-base flex-shrink-0 min-w-[100%] bg-white dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 md:px-3 px-2 text-left"
          disabled={disabled}
        />
      </div>
      <Button
        icon="pi pi-refresh"
        label="Обновить"
        className="bg-blue-600 dark:bg-blue-700 text-white border border-blue-600 dark:border-blue-700 rounded-lg px-4 font-semibold shadow-sm hover:bg-blue-700 dark:hover:bg-blue-800 hover:border-blue-700 dark:hover:border-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 md:h-12 h-10 md:text-lg text-base w-full md:w-auto"
        onClick={onRefresh}
        loading={loading}
        disabled={loading || disabled}
      />
    </div>
  </div>
);

export default ChartControls;
