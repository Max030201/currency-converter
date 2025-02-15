import React from 'react';
import PageLayout from '../components/Layout/PageLayout';
import ChartControls from '../components/Charts/ChartControls';
import CurrencyChart from '../components/Charts/CurrencyChart';
import ChartInfo from '../components/Charts/ChartInfo';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useChartPageLogic } from '../../controller/hooks/useChartPageLogic';

const ChartPage = () => {
  const {
    currencies,
    currenciesLoading,
    currenciesError,
    base,
    setBase,
    target,
    setTarget,
    period,
    setPeriod,
    chartData,
    chartLoading,
    chartError,
    chartStats,
    handleRefresh,
    isPairValid,
    hasData,
    loading
  } = useChartPageLogic();

  return (
  <PageLayout title="График динамики курсов">
    <div className="space-y-4">
        <ChartControls
          base={base}
          setBase={setBase}
          target={target}
          setTarget={setTarget}
          currencyList={currencies}
          period={period}
          setPeriod={setPeriod}
          onRefresh={handleRefresh}
          loading={loading}
          disabled={loading}
        />
        {loading ? (
          <LoadingSpinner message="Загрузка графика..." description="Получаем данные для графика" showText={true} />
        ) : (
          <>
        {currenciesError || chartError ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-500 text-lg">
            {currenciesError || chartError}
          </div>
        ) : !isPairValid ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
            Пожалуйста, выберите разные базовую и целевую валюты
          </div>
        ) : !hasData && !chartLoading ? (
          <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
            Нет данных для выбранной валютной пары или периода
          </div>
        ) : (
          <>
            <CurrencyChart
              data={chartData || []}
              base={base}
              target={target}
              loading={chartLoading}
            />
            <ChartInfo
              min={chartStats.min}
              max={chartStats.max}
              avg={chartStats.average}
              volatility={chartStats.changePercent}
            />
              </>
            )}
          </>
        )}
    </div>
  </PageLayout>
);
};

export default ChartPage;
