import { useState, useCallback, useMemo } from 'react';
import { useCurrencyList } from '../context/CurrencyContext';
import { useExchangeRatesWithChanges } from './useFrankfurter';
import { useRatesFilter } from './useRatesFilter';
import { useRatesStats } from './useRatesStats';

export function useRatesPageLogic() {
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencyList();
  const [base, setBase] = useState('USD');
  const baseOptions = useMemo(() => currencies.map(c => ({ code: c.code, label: c.label })), [currencies]);

  const { rates: todayRates, loading: ratesLoading, error: ratesError } = useExchangeRatesWithChanges(base);

  // Фильтрация, сортировка
  const {
    search,
    filter,
    sortField,
    sortOrder,
    sortedRates,
    handleSearch,
    handleFilter,
    handleSort
  } = useRatesFilter(todayRates, currencies);

  // Статистика
  const { stats: statsData } = useRatesStats(todayRates, currencies, base);

  // Пагинация
  const [page, setPage] = useState(1);
  const rows = 10;
  const first = (page - 1) * rows;
  const handlePage = useCallback((e) => {
    setPage(Math.floor(e.first / rows) + 1);
  }, [rows]);

  // Проверка готовности данных для текущей base
  const dataReady = useMemo(() => (
    !currenciesLoading &&
    !ratesLoading &&
    todayRates &&
    todayRates.length > 0
  ), [currenciesLoading, ratesLoading, todayRates]);

  return {
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
    filter,
    sortField,
    sortOrder,
    sortedRates,
    handleSearch,
    handleFilter,
    handleSort,
    statsData,
    page,
    setPage,
    rows,
    first,
    handlePage,
    dataReady
  };
} 