import { useState, useCallback } from 'react';
import { convertCurrency, convertWithRates, getRatesForCurrencies } from '../../model/ConversionModel';

export function useCurrencyConverter() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ratesCache, setRatesCache] = useState({});

  // Валидация формы конвертации
  const validateForm = useCallback((currencyFrom, currencyTo, amount) => {
    if (!currencyFrom || !currencyTo || !amount) {
      throw new Error('Заполните все поля для конвертации');
    }
    
    if (currencyFrom.code === currencyTo.code) {
      throw new Error('Выберите разные валюты для конвертации');
    }
  }, []);

  // Основная функция конвертации (с API)
  const convert = useCallback(async (from, to, amount) => {
    setLoading(true);
    setError(null);
    try {
      const conversion = await convertCurrency(from, to, amount);
      setResult(conversion);
      // Кешируем курс
      setRatesCache(prev => ({ ...prev, [from]: { ...(prev[from] || {}), [to]: conversion.rate } }));
      return conversion;
    } catch (e) {
      setError(e.message);
      setResult(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Конвертация с валидацией и добавлением в историю
  const convertWithValidation = useCallback(async (currencyFrom, currencyTo, amount, addToHistory, showToast) => {
    try {
      // Валидация
      validateForm(currencyFrom, currencyTo, amount);
      
      // Конвертация
      const conversion = await convert(currencyFrom.code, currencyTo.code, amount);
      
      if (conversion && addToHistory) {
        addToHistory(conversion);
        if (showToast) {
          showToast({
            severity: 'success',
            summary: 'Успешно',
            detail: `Конвертация ${amount} ${currencyFrom.code} → ${conversion.result} ${currencyTo.code}`,
            life: 3000
          });
        }
      }
      
      return conversion;
    } catch (error) {
      if (showToast) {
        showToast({
          severity: 'error',
          summary: 'Ошибка',
          detail: error.message,
          life: 5000
        });
      }
      throw error;
    }
  }, [convert, validateForm]);

  // Быстрая конвертация с уже полученными курсами
  const convertLocal = useCallback((from, to, amount) => {
    if (!ratesCache[from] || !ratesCache[from][to]) {
      setError('Нет сохранённого курса для локальной конвертации');
      return null;
    }
    try {
      const conversion = convertWithRates(from, to, amount, { [to]: ratesCache[from][to] });
      setResult(conversion);
      return conversion;
    } catch (e) {
      setError(e.message);
    setResult(null);
      return null;
    }
  }, [ratesCache]);

  // Получить курсы для нескольких валют (например, для популярных пар)
  const fetchRates = useCallback(async (base, targets) => {
    setLoading(true);
    setError(null);
    try {
      const rates = await getRatesForCurrencies(base, targets);
      setRatesCache(prev => ({ ...prev, [base]: { ...(prev[base] || {}), ...rates } }));
      return rates;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    result,
    loading,
    error,
    convert,
    convertWithValidation,
    convertLocal,
    fetchRates,
    ratesCache,
    setResult,
    setError
  };
}

