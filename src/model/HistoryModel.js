const STORAGE_KEY = 'conversion_history';
const MAX_HISTORY_SIZE = 100;

// Получает всю историю конвертаций
export function getHistory() {
  try {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error('Ошибка чтения истории:', error);
    return [];
  }
}

// Добававляет запись в историю
export function addHistory(record) {
  try {
    const history = getHistory();
    
    const newRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...record
    };
    
    history.unshift(newRecord);
    
    const limitedHistory = history.slice(0, MAX_HISTORY_SIZE);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
    
    return newRecord;
  } catch (error) {
    console.error('Ошибка сохранения в историю:', error);
    throw new Error('Не удалось сохранить в историю');
  }
}

// Удаляет запись из истории
export function removeHistory(id) {
  try {
  const history = getHistory();
    const filteredHistory = history.filter(record => record.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error('Ошибка удаления из истории:', error);
    return false;
  }
}

// Очищает всю историю
export function clearHistory() {
  try {
  localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Ошибка очистки истории:', error);
    return false;
  }
}

// Фильтрация истории
export function filterHistory(filters = {}) {
  let history = getHistory();
  
  // Фильтр по валютам
  if (filters.fromCurrency) {
    history = history.filter(record => record.from === filters.fromCurrency);
  }
  
  if (filters.toCurrency) {
    history = history.filter(record => record.to === filters.toCurrency);
  }
  
  // Фильтр по дате
  if (filters.startDate) {
    history = history.filter(record => record.timestamp >= filters.startDate);
  }
  
  if (filters.endDate) {
    history = history.filter(record => record.timestamp <= filters.endDate);
  }
  
  // Фильтр по сумме
  if (filters.minAmount) {
    history = history.filter(record => record.amount >= filters.minAmount);
  }
  
  if (filters.maxAmount) {
    history = history.filter(record => record.amount <= filters.maxAmount);
  }
  
  return history;
}

// Поиск в истории
export function searchHistory(query) {
  if (!query || query.trim() === '') {
    return getHistory();
  }
  
  const history = getHistory();
  const searchTerm = query.toLowerCase().trim();
  
  return history.filter(record => 
    record.from.toLowerCase().includes(searchTerm) ||
    record.to.toLowerCase().includes(searchTerm) ||
    record.amount.toString().includes(searchTerm) ||
    record.result.toString().includes(searchTerm)
  );
}

// Сортировка истории
export function sortHistory(history, sortBy = 'timestamp', sortOrder = 'desc') {
  return [...history].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

// Статистика истории
export function getHistoryStats(history = null) {
  const records = history || getHistory();
  
  if (records.length === 0) {
    return {
      totalConversions: 0,
      totalAmount: 0,
      averageAmount: 0,
      mostUsedFromCurrency: null,
      mostUsedToCurrency: null,
      totalVolume: 0
    };
  }
  
  // Подсчет статистики
  const totalConversions = records.length;
  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
  const averageAmount = totalAmount / totalConversions;
  
  // Самые популярные валюты
  const fromCurrencies = {};
  const toCurrencies = {};
  
  records.forEach(record => {
    fromCurrencies[record.from] = (fromCurrencies[record.from] || 0) + 1;
    toCurrencies[record.to] = (toCurrencies[record.to] || 0) + 1;
  });
  
  const mostUsedFromCurrency = Object.entries(fromCurrencies)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || null;
    
  const mostUsedToCurrency = Object.entries(toCurrencies)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || null;
  
  // Общий объем конвертаций
  const totalVolume = records.reduce((sum, record) => sum + record.result, 0);
  
  return {
    totalConversions,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    averageAmount: parseFloat(averageAmount.toFixed(2)),
    mostUsedFromCurrency,
    mostUsedToCurrency,
    totalVolume: parseFloat(totalVolume.toFixed(2))
  };
}

// Получает последние конвертации
export function getRecentConversions(limit = 5) {
  const history = getHistory();
  return history.slice(0, limit);
}

// Получает популярные валютные пары
export function getPopularPairs(limit = 5) {
  const history = getHistory();
  const pairs = {};
  
  history.forEach(record => {
    const pair = `${record.from}/${record.to}`;
    pairs[pair] = (pairs[pair] || 0) + 1;
  });
  
  return Object.entries(pairs)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([pair, count]) => ({ pair, count }));
}

// Фильтрация истории с поддержкой дат
export function filterHistoryWithDates(filters = {}) {
  let history = getHistory();
  
  // Фильтр по валютам
  if (filters.fromCurrency) {
    history = history.filter(record => record.from === filters.fromCurrency);
  }
  
  if (filters.toCurrency) {
    history = history.filter(record => record.to === filters.toCurrency);
  }
  
  // Фильтр по валюте
  if (filters.currency) {
    history = history.filter(record => record.from === filters.currency || record.to === filters.currency);
  }
  
  // Фильтр по дате
  if (filters.startDate) {
    history = history.filter(record => record.timestamp >= filters.startDate);
  }
  
  if (filters.endDate) {
    history = history.filter(record => record.timestamp <= filters.endDate);
  }
  
  // Фильтр по диапазону дат
  if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
    const start = filters.dateRange[0].toISOString();
    const end = filters.dateRange[1].toISOString();
    history = history.filter(record => record.timestamp >= start && record.timestamp <= end);
  }
  
  // Фильтр по пресету дат
  if (filters.datePreset) {
    const now = new Date();
    let start = null;
    if (filters.datePreset === 'today') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (filters.datePreset === 'week') {
      start = new Date(now);
      start.setDate(now.getDate() - 7);
    } else if (filters.datePreset === 'month') {
      start = new Date(now);
      start.setMonth(now.getMonth() - 1);
    }
    if (start) {
      history = history.filter(record => new Date(record.timestamp) >= start);
    }
  }
  
  // Фильтр по сумме
  if (filters.minAmount) {
    history = history.filter(record => record.amount >= filters.minAmount);
  }
  
  if (filters.maxAmount) {
    history = history.filter(record => record.amount <= filters.maxAmount);
  }
  
  return history;
}

// Получаает самую популярную пару
export function getMostPopularPair(history = null) {
  const records = history || getHistory();
  
  if (!records.length) return '-';
  
  const pairs = {};
  records.forEach(r => {
    const pair = `${r.from}/${r.to}`;
    pairs[pair] = (pairs[pair] || 0) + 1;
  });
  
  return Object.entries(pairs).sort(([,a],[,b]) => b-a)[0]?.[0] || '-';
}