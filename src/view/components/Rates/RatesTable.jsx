import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useState, useEffect } from 'react';

const RatesTable = ({
  rates,
  loading,
  onRowClick,
  sortField,
  sortOrder,
  onSort,
  paginator = true,
  rows = 10,
  currencies = [],
  loadingIcon = <LoadingSpinner />,
  first = 0,
  totalRecords = 0,
  onPage
}) => {
  const [showCurrencyCol, setShowCurrencyCol] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowCurrencyCol(window.innerWidth > 420);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const safeRates = Array.isArray(rates) ? rates : [];
  
  const totalPages = Math.ceil(safeRates.length / rows);

  const formatRate = (rate) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(rate);
  };

  const formatChange = (change) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
      signDisplay: 'always'
    }).format(change);
  };

  const formatChangePercent = (changePercent) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    }).format(changePercent);
  };

  const rateTemplate = (rowData) => (
    <span className="font-mono text-sm">
      {formatRate(rowData.rate)}
    </span>
  );

  const nameTemplate = (rowData) => {
    return rowData.name || rowData.code;
  };

  const changeTemplate = (rowData) => {
    if (rowData.change === undefined || rowData.changePercent === undefined) {
      return <span className="text-gray-400">—</span>;
    }
    
    const isPositive = rowData.change > 0;
    const isNegative = rowData.change < 0;
    const isZero = rowData.change === 0;
    
    const changeClass = isPositive 
      ? 'text-green-600 dark:text-green-400' 
      : isNegative 
        ? 'text-red-600 dark:text-red-400' 
        : 'text-gray-500 dark:text-gray-400';
    
    const changeIcon = isPositive 
      ? '↗' 
      : isNegative 
        ? '↘' 
        : '→';
    
    return (
      <div className="flex flex-col items-end space-y-1">
        <div className={`font-mono text-xs md:text-sm ${changeClass} flex items-center gap-1`}>
          <span>{changeIcon}</span>
          <span>{formatChange(rowData.change)}</span>
        </div>
        <div className={`text-xs ${changeClass}`}>
          {formatChangePercent(rowData.changePercent)}%
        </div>
      </div>
    );
  };

  const paginatorTemplate = {
    layout: 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
    FirstPageLink: (options) => (
      <button type="button" onClick={options.onClick} disabled={options.disabled}
        className={`mx-1 px-2 py-1 rounded-lg text-base font-bold bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition ${options.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Первая страница">
        «
      </button>
    ),
    PrevPageLink: (options) => (
      <button type="button" onClick={options.onClick} disabled={options.disabled}
        className={`mx-1 px-2 py-1 rounded-lg text-base font-bold bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition ${options.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Предыдущая страница">
        ‹
      </button>
    ),
    NextPageLink: (options) => (
      <button type="button" onClick={options.onClick} disabled={options.disabled}
        className={`mx-1 px-2 py-1 rounded-lg text-base font-bold bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition ${options.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Следующая страница">
        ›
      </button>
    ),
    LastPageLink: (options) => (
      <button type="button" onClick={options.onClick} disabled={options.disabled}
        className={`mx-1 px-2 py-1 rounded-lg text-base font-bold bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition ${options.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Последняя страница">
        »
      </button>
    ),
    CurrentPageReport: (options) => {
      const currentPage = Math.floor(options.first / options.rows) + 1;
      return (
        <span className="mx-2 px-3 py-0 text-lg font-semibold rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">{currentPage}</span>
      );
    },
  };

  return (
    <div className="w-full overflow-hidden md:rounded-xl rounded-lg border border-gray-200 dark:border-gray-700">
      <DataTable
        value={safeRates}
        loading={loading}
        paginator={paginator && totalPages > 1}
        rows={rows}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort}
        onRowClick={onRowClick}
        className="shadow-lg rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs md:text-base"
        dataKey="code"
        emptyMessage={<span className="text-gray-500 dark:text-gray-400 text-xs md:text-base">Нет данных о курсах</span>}
        loadingIcon={loadingIcon}
        rowClassName={() => 'bg-white dark:bg-gray-800'}
        first={first}
        totalRecords={safeRates.length}
        onPage={onPage}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <Column
          field="code"
          header={<span className="font-medium text-xs md:text-base">Код</span>}
          sortable
          style={{ width: '10%' }}
          className="font-medium text-xs md:text-base"
        />
        {showCurrencyCol && (
          <Column
            field="name"
            header={<span className="font-medium text-xs md:text-base">Валюта</span>}
            sortable
            style={{ width: '40%' }}
            body={rowData => <span className="text-xs md:text-base">{nameTemplate(rowData)}</span>}
            className="font-medium text-xs md:text-base"
          />
        )}
        <Column
          field="rate"
          header={<span className="text-xs md:text-base">Курс</span>}
          sortable
          style={{ width: '30%' }}
          body={rowData => <span className="font-mono text-xs md:text-base">{formatRate(rowData.rate)}</span>}
          className="text-xs md:text-base"
        />
        <Column
          field="change"
          header={<span className="text-xs md:text-base">Итог</span>}
          sortable
          style={{ width: '20%' }}
          body={rowData => <div className="text-xs md:text-base">{changeTemplate(rowData)}</div>}
          className="text-xs md:text-base"
        />
      </DataTable>
    </div>
  );
};

export default RatesTable;