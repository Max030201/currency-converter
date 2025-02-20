import { fetchCurrencies } from './api/frankfurterApi';

let symbolsCache = null;

export async function getCurrencyList() {
  if (symbolsCache) return symbolsCache;
  
  try {
    const data = await fetchCurrencies();
    symbolsCache = data;
    return symbolsCache;
  } catch (error) {
    throw error;
  }
}

export function getPopularCurrencies() {
  return ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];
}