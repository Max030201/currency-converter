import React from 'react';
import PageLayout from '../components/Layout/PageLayout';
import RatesFilter from '../components/Rates/RatesFilter';
// import RatesSearch from '../components/Rates/RatesSearch'; // больше не нужен
import RatesTable from '../components/Rates/RatesTable';
import RatesStats from '../components/Rates/RatesStats';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorBoundary from '../components/Common/ErrorBoundary';
import { useRatesPageLogic } from '../../controller/hooks/useRatesPageLogic';

const RatesPage = () => {
  const {
    currencies,
    currenciesLoading,
    currenciesError,
    base,
    setBase,
    baseOptions,
    todayRates,
    ratesLoading,
    ratesError,
    search,
    sortField,
    sortOrder,
    sortedRates,
    handleSearch,
    handleSort,
    statsData,
    page,
    rows,
    first,
    handlePage,
    dataReady
  } = useRatesPageLogic();

  const isLoading = currenciesLoading || ratesLoading;

  return (
  <PageLayout title="Курсы валют">
      <ErrorBoundary>
    <div className="space-y-4">
          <div className="text-center text-base font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Курсы валют относительно {base}
          </div>
          <RatesFilter 
            base={base} 
            onBaseChange={setBase} 
            baseOptions={baseOptions} 
            search={search}
            onSearchChange={handleSearch}
            disabled={isLoading}
          />
          {/* <RatesSearch value={search} onChange={handleSearch} disabled={isLoading} /> */}
          {currenciesError || ratesError ? (
            <div className="flex justify-center items-center min-h-[200px] text-red-500 text-lg">
              {currenciesError || ratesError}
            </div>
          ) : base == null ? (
            <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
              Пожалуйста, выберите базовую валюту
            </div>
          ) :
          !dataReady ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <LoadingSpinner 
                message="Загрузка курсов валют..."
                description="Получаем актуальные курсы валют с изменениями"
                showText={true}
              />
            </div>
          ) : (
            <>
            <RatesTable
              rates={Array.isArray(sortedRates) ? sortedRates : []}
              loading={false}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              paginator={true}
              rows={rows}
              onPage={handlePage}
                first={first}
              totalRecords={Array.isArray(sortedRates) ? sortedRates.length : 0}
              currencies={currencies}
            />
          <RatesStats 
            strongest={statsData.strongest}
            weakest={statsData.weakest}
            total={statsData.total}
            base={base}
          />
            </>
          )}
    </div>
      </ErrorBoundary>
  </PageLayout>
);
};

export default RatesPage;
