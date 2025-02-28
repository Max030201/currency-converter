import React from 'react';
import { InputText } from 'primereact/inputtext';

const RatesSearch = ({ value, onChange, disabled = false }) => (
  <span className="p-input-icon-left w-full md:w-80">
    <InputText
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Поиск по коду или названию"
      className="w-full max-w-full md:text-lg text-base md:h-12 h-10 md:px-3 px-2 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
      disabled={disabled}
    />
  </span>
);

export default RatesSearch;