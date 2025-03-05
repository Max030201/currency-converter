import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';

const HistoryList = ({
  history,
  onRepeat,
  onDelete,
  loading,
  paginator = true,
  rows = 10,
  onPage,
  first = 0,
  totalRecords = 0,
  loadingIcon,
}) => {
  const [showCurrencyCol, setShowCurrencyCol] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowCurrencyCol(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(num);
  };

  // Только CurrentPageReport, без PageLinks
  const totalPages = Math.ceil(totalRecords / rows);
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
      value={history}
      loading={loading}
      paginator={paginator && totalPages > 1}
      rows={rows}
      onPage={onPage}
      first={first}
      totalRecords={totalRecords}
      paginatorTemplate={paginatorTemplate}
      paginatorClassName="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      className="shadow-lg rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs md:text-base"
      dataKey="id"
      emptyMessage={<span className="text-gray-500 dark:text-gray-400 text-xs md:text-base">История пуста</span>}
      loadingIcon={loadingIcon}
      rowClassName={() => 'bg-white dark:bg-gray-800'}
    >
      <Column field="timestamp" header="Дата" body={rowData => (
        <span className="font-medium text-xs md:text-base">{formatDate(rowData.timestamp || rowData.date).split(',')[0]}</span>
      )} sortable style={{ minWidth: 90 }} />
      {showCurrencyCol && (
        <Column field="time" header="Время" body={rowData => {
            const date = new Date(rowData.timestamp || rowData.date);
            return (
              <span className="font-medium text-xs md:text-base">{
                !isNaN(date) ? date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''
              }</span>
            );
          }} style={{ minWidth: 60 }} 
        />
      )}
      <Column field="from" header="Из" style={{ minWidth: 60 }} />
      <Column field="to" header="В" style={{ minWidth: 60 }} />
      {showCurrencyCol && (
        <Column field="amount" header="Сумма" body={rowData => formatNumber(rowData.amount)} style={{ minWidth: 60 }} />
      )}
      <Column field="result" header="Результат" body={rowData => formatNumber(rowData.result)} style={{ minWidth: 80 }} />
      {showCurrencyCol && (
        <Column field="rate" header="Курс" body={rowData => formatNumber(rowData.rate)} style={{ minWidth: 80 }} />
      )}
      {showCurrencyCol && (
        <Column
          header="Действия"
          body={rowData => (
            <div className="flex gap-2">
              <Button icon="pi pi-refresh" className="p-button-sm" onClick={() => onRepeat(rowData)} tooltip="Повторить" />
              <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => onDelete(rowData)} tooltip="Удалить" />
            </div>
          )}
          style={{ minWidth: 80 }}
        />
      )}
    </DataTable>
    </div>
  );
};

export default HistoryList;
