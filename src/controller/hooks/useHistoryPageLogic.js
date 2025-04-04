import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConversionHistory } from './useConversionHistory';
import { useToast } from './useToast';

export function useHistoryPageLogic() {
  const {
    history,
    loading,
    add,
    remove,
    clear,
    filter,
    filterWithDates,
    search,
    sort,
    stats,
    mostPopularPair,
    error,
    setHistory,
    setError
  } = useConversionHistory();
  const { show } = useToast();
  const navigate = useNavigate();

  // UI state
  const [searchValue, setSearchValue] = useState('');
  const [currency, setCurrency] = useState(null);
  const [datePreset, setDatePreset] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [first, setFirst] = useState(0);
  const rows = 10;

  // Фильтрация и поиск
  const filteredHistory = useMemo(() => {
    let result = filterWithDates({
      currency,
      dateRange,
      datePreset
    });
    if (searchValue) {
      result = search(searchValue);
    }
    result = sort(result, sortBy, sortOrder);
    return result;
  }, [history, currency, dateRange, searchValue, datePreset, sortBy, sortOrder, search, sort, filterWithDates]);

  // Валюты для фильтра
  const currencyList = useMemo(() => {
    const set = new Set();
    history.forEach(r => { set.add(r.from); set.add(r.to); });
    return Array.from(set).map(code => ({ label: code, value: code }));
  }, [history]);

  // Повторить конвертацию
  const handleRepeat = useCallback((record) => {
    navigate('/', { state: { from: record.from, to: record.to } });
  }, [navigate]);

  // Удалить запись
  const handleDelete = useCallback((record) => {
    remove(record.id);
    show({
      severity: 'success',
      summary: 'Удалено',
      detail: 'Запись удалена из истории',
      life: 2000
    });
  }, [remove, show]);

  // Обработка ошибок
  if (error) {
    show({
      severity: 'error',
      summary: 'Ошибка',
      detail: error,
      life: 3000
    });
    setError(null);
  }

  // Лоадер: если история не загружена
  const isLoading = !history || history.length === 0;

  return {
    history,
    loading,
    add,
    remove,
    clear,
    stats,
    mostPopularPair,
    setHistory,
    setError,
    searchValue,
    setSearchValue,
    currency,
    setCurrency,
    datePreset,
    setDatePreset,
    dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    first,
    setFirst,
    rows,
    filteredHistory,
    currencyList,
    handleRepeat,
    handleDelete,
    isLoading
  };
} 