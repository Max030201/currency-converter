import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import currencySymbols from '../../../utils/currencySymbols';

const PopularRates = ({ rates, base, title, currencies = [] }) => {
  const formatRate = (rate) => {
    if (Number.isInteger(rate)) {
      return rate.toString();
    }
    // Обрезаем до 4 знаков после запятой, убираем лишние нули
    return rate.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4
    });
  };

  const getCurrencyLabel = (code) => {
    const found = currencies.find(c => c.code === code);
    return found ? found.label : code;
  };

  const countryTemplate = (rowData) => (
    <span>{rowData.label || getCurrencyLabel(rowData.code)}</span>
  );

  const rateTemplate = (rowData) => (
    <span className="font-mono text-sm">
      {formatRate(rowData.rate)}{' '}
      <span className="text-gray-500">{currencySymbols[rowData.code] || rowData.code}</span>
    </span>
  );

  const [showCurrencyCol, setShowCurrencyCol] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowCurrencyCol(window.innerWidth > 420);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="mt-6">
      <div className="font-bold mb-3 text-xl md:text-2xl text-center drop-shadow-sm text-black dark:text-white">
        {title} <span className="text-black dark:text-white">{base}</span>:
      </div>
      {(!rates || rates.length === 0) ? (
        <div className="flex items-center gap-2 text-gray-400 italic py-8 justify-center">
          <span className="pi pi-info-circle text-xl" aria-hidden="true" /> Нет данных о курсах
        </div>
      ) : (
        <div className="w-full overflow-hidden md:rounded-xl rounded-lg border border-gray-200 dark:border-gray-700">
      <DataTable 
        value={rates} 
        size="small" 
        className="shadow-lg md:rounded-lg rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white md:text-base text-sm"
        emptyMessage="Нет данных о курсах"
        rowClassName={() => 'row-border'}
          aria-label="Таблица курсов валют"
      >
          <Column field="code" header="Код" className="font-medium md:text-base text-sm" />
          {showCurrencyCol && (
            <Column field="label" header="Валюта" body={countryTemplate} className="font-medium md:text-base text-sm" />
          )}
        <Column field="rate" header="Курс" body={rateTemplate} className="md:text-base text-sm" />
          <Column 
            header={base} 
            body={() => (
              <span className="font-mono md:text-sm text-xs">
                1 <span className="text-gray-500">{currencySymbols[base] || base}</span>
              </span>
            )}
            className="md:text-base text-sm"
          />
      </DataTable>
        </div>
      )}
    </div>
  );
};

export default PopularRates;
