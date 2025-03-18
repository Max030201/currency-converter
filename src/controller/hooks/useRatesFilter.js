import { useState, useMemo, useCallback } from 'react';

export function useRatesFilter(rates, currencies) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('code');
  const [sortOrder, setSortOrder] = useState(1); // 1 - asc, -1 - desc

  // Фильтрация по поиску и валюте
  const filteredRates = useMemo(() => {
    if (!rates) return [];
    let result = rates;
    if (search) {
      result = result.filter(r =>
        r.code.toLowerCase().includes(search.toLowerCase()) ||
        (currencies.find(c => c.code === r.code)?.label.toLowerCase().includes(search.toLowerCase()) ?? false)
      );
    }
    if (filter) {
      result = result.filter(r => r.code === filter);
    }
    return result;
  }, [rates, search, filter, currencies]);

  // Сортировка
  const sortedRates = useMemo(() => {
    if (!filteredRates) return [];
    
    // Добавляем виртуальное поле name для сортировки
    const ratesWithName = filteredRates.map(rate => ({
      ...rate,
      name: currencies.find(c => c.code === rate.code)?.label || rate.code
    }));
    
    return [...ratesWithName].sort((a, b) => {
      // Проверяем, что объекты существуют
      if (!a || !b) return 0;
      
      let aValue, bValue;
      
      // Получаем значение для сортировки
      aValue = a[sortField];
      bValue = b[sortField];
      
      // Проверяем, что значения существуют
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      
      if (aValue > bValue) return sortOrder === 1 ? 1 : -1;
      if (aValue < bValue) return sortOrder === 1 ? -1 : 1;
      return 0;
    });
  }, [filteredRates, sortField, sortOrder, currencies]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
  }, []);
  const handleFilter = useCallback((value) => {
    setFilter(value);
  }, []);
  const handleSort = useCallback((e) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
  }, []);

  return {
    search,
    filter,
    sortField,
    sortOrder,
    filteredRates,
    sortedRates,
    handleSearch,
    handleFilter,
    handleSort,
    setSearch,
    setFilter,
    setSortField,
    setSortOrder
  };
} 