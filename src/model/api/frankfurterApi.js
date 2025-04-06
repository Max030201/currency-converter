const isProduction = process.env.NODE_ENV === 'production';
const API_BASE = isProduction 
  ? 'https://api.frankfurter.dev/v1' 
  : 'http://localhost:3001/api/frankfurter.dev/v1';

// Получает список всех валют
export async function fetchCurrencies() {
  try {
    const response = await fetch(`${API_BASE}/currencies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}

// Получает актуальные курсы (по умолчанию USD)
export async function fetchLatest(base = 'USD', symbols = '') {
  try {
    const params = new URLSearchParams();
    if (base !== 'USD') params.append('base', base);
    if (symbols) params.append('symbols', symbols);
    
    const url = `${API_BASE}/latest${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw error;
  }
}

// Получает курс обмена между двумя валютами
export async function fetchExchangeRate(from, to) {
  try {
    const response = await fetch(`${API_BASE}/latest?base=${from}&symbols=${to}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rates[to];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
}

// Получает курсы для нескольких валют
export async function fetchLatestRates(baseCurrency, targetCurrencies) {
  try {
    const symbols = targetCurrencies.join(',');
    const response = await fetch(`${API_BASE}/latest?base=${baseCurrency}&symbols=${symbols}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw error;
  }
}

// Получает курсы за конкретную дату
export async function fetchHistorical(date, base = 'USD', symbols = '') {
  try {
    const params = new URLSearchParams();
    if (base !== 'USD') params.append('base', base);
    if (symbols) params.append('symbols', symbols);
    
    const url = `${API_BASE}/${date}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    throw error;
  }
}

// Получает исторические курсы для периода
export async function fetchTimeSeries(startDate, endDate, base = 'USD', symbols = '') {
  try {
    const params = new URLSearchParams();
    if (base !== 'USD') params.append('base', base);
    if (symbols) params.append('symbols', symbols);
    
    const url = `${API_BASE}/${startDate}..${endDate}${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(20000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching time series:', error);
    throw error;
  }
}

// Локальная конвертация без запроса к API
export function convertLocally(amount, fromCurrency, toCurrency, rates) {
  if (!rates || !rates[toCurrency]) {
    throw new Error(`Курс валюты ${toCurrency} не найден`);
  }
  
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Сумма должна быть положительным числом');
  }
  
  const rate = rates[toCurrency];
  return amount * rate;
}

// Получает курс для конвертации
export async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const data = await fetchLatest(fromCurrency, toCurrency);
    
    if (!data || !data.rates) {
      throw new Error(`API вернул неверный формат данных`);
    }
    
    const rate = data.rates[toCurrency];
    
    if (rate === undefined) {
      throw new Error(`Курс для ${toCurrency} не найден в ответе API`);
    }
    
    return rate;
  } catch (error) {
    throw new Error(`Ошибка получения курса ${fromCurrency}/${toCurrency}: ${error.message}`);
  }
}