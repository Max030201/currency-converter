import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCurrencyList } from '../context/CurrencyContext';
import { useCurrencyChart } from './useCurrencyChart';

export function useChartPageLogic() {
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencyList();
  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('EUR');
  const [period, setPeriod] = useState(30); // дней
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const {
    data: chartData,
    loading: chartLoading,
    error: chartError,
    stats,
    fetchData
  } = useCurrencyChart();

  // Инициализация данных при первом маунте
  useEffect(() => {
    if (
      base && target && base !== target &&
      currencies && currencies.length > 0
    ) {
      fetchData(base, target, period);
      setIsFirstLoad(false);
    }
    // eslint-disable-next-line
  }, []);

  // Обработчик обновления графика
  const handleRefresh = useCallback(() => {
    if (base && target && base !== target) {
      fetchData(base, target, period);
    }
  }, [base, target, period, fetchData]);

  // Статистика для ChartInfo
  const chartStats = useMemo(() => stats.main || {}, [stats]);

  const isPairValid = useMemo(() => base && target && base !== target, [base, target]);
  const hasData = useMemo(() => chartData && chartData.length > 0, [chartData]);
  const loading = currenciesLoading || chartLoading;

  return {
    currencies,
    currenciesLoading,
    currenciesError,
    base,
    setBase,
    target,
    setTarget,
    period,
    setPeriod,
    isFirstLoad,
    chartData,
    chartLoading,
    chartError,
    chartStats,
    handleRefresh,
    isPairValid,
    hasData,
    loading
  };
} 