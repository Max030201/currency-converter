import { useState, useCallback, useEffect } from 'react';
import {
  getHistory,
  addHistory,
  removeHistory,
  clearHistory,
  filterHistory,
  searchHistory,
  sortHistory,
  getHistoryStats,
  getRecentConversions,
  getPopularPairs,
  filterHistoryWithDates,
  getMostPopularPair
} from '../../model/HistoryModel';

export function useConversionHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Инициализация истории при маунте
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHistory(getHistory());
      setLoading(false);
    }, 300); // имитация асинхронной загрузки
  }, []);

  // Добавить запись
  const add = useCallback((record) => {
    try {
      setLoading(true);
      const newRecord = addHistory(record);
      setHistory(getHistory());
      setLoading(false);
      return newRecord;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  }, []);

  // Удалить запись
  const remove = useCallback((id) => {
    try {
      setLoading(true);
      removeHistory(id);
      setHistory(getHistory());
      setLoading(false);
      return true;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  }, []);

  // Очистить всю историю
  const clear = useCallback(() => {
    try {
      setLoading(true);
      clearHistory();
      setHistory([]);
      setLoading(false);
      return true;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return false;
    }
  }, []);

  // Фильтрация
  const filter = useCallback((filters) => {
    try {
      return filterHistory(filters);
    } catch (e) {
      setError(e.message);
      return [];
    }
  }, []);

  // Фильтрация с поддержкой дат
  const filterWithDates = useCallback((filters) => {
    try {
      return filterHistoryWithDates(filters);
    } catch (e) {
      setError(e.message);
      return [];
    }
  }, []);

  // Поиск
  const search = useCallback((query) => {
    try {
      return searchHistory(query);
    } catch (e) {
      setError(e.message);
      return [];
    }
  }, []);

  // Сортировка
  const sort = useCallback((hist, sortBy, sortOrder) => {
    try {
      return sortHistory(hist, sortBy, sortOrder);
    } catch (e) {
      setError(e.message);
      return hist;
    }
  }, []);

  // Статистика
  const stats = getHistoryStats(history);
  // Последние конвертации
  const recent = getRecentConversions();
  // Популярные пары
  const popularPairs = getPopularPairs();
  // Самая популярная пара
  const mostPopularPair = getMostPopularPair(history);

  return {
    history,
    loading,
    error,
    add,
    remove,
    clear,
    filter,
    filterWithDates,
    search,
    sort,
    stats,
    recent,
    popularPairs,
    mostPopularPair,
    setHistory,
    setError
  };
}

