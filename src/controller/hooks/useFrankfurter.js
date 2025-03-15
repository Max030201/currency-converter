import React, { useState, useEffect } from 'react';
import { fetchLatest, fetchHistorical } from '../../model/api/frankfurterApi';
import { preparePopularRates } from '../../model/ConversionModel';

export function useExchangeRates(base = 'USD') {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useExchangeRates: starting fetch for base:', base);
    setLoading(true);
    setError(null);
    fetchLatest(base)
      .then(data => {
        console.log('useExchangeRates: API response:', data);
        if (data && data.rates) {
          // Проверяем, что API вернул курсы для запрошенной базовой валюты
          if (data.base !== base) {
            console.log(`useExchangeRates: API returned base ${data.base}, but we requested ${base}. Recalculating...`);
            
            // Если API вернул курсы относительно другой валюты, нужно пересчитать
            // Например, если запросили BRL, а API вернул EUR, нужно конвертировать через EUR
            const requestedRate = data.rates[base];
            if (requestedRate) {
              // Пересчитываем все курсы относительно запрошенной валюты
              const ratesArr = Object.entries(data.rates).map(([code, rate]) => ({
                code,
                rate: rate / requestedRate
              }));
              // Добавляем базовую валюту с курсом 1
              if (!ratesArr.some(r => r.code === base)) {
                ratesArr.unshift({ code: base, rate: 1 });
              }
              console.log('useExchangeRates: recalculated rates:', ratesArr.length);
              setRates(ratesArr);
              setUpdatedAt(data.date || new Date().toISOString());
            } else {
              console.log('useExchangeRates: requested base currency not found in response');
              setRates([]);
            }
          } else {
            // API вернул правильную базовую валюту
          const ratesArr = [
            ...Object.entries(data.rates).map(([code, rate]) => ({ code, rate }))
          ];
          if (!ratesArr.some(r => r.code === base)) {
            ratesArr.unshift({ code: base, rate: 1 });
          }
            console.log('useExchangeRates: setting rates:', ratesArr.length);
          setRates(ratesArr);
          setUpdatedAt(data.date || new Date().toISOString());
          }
        } else {
          console.log('useExchangeRates: no data, setting empty rates');
          setRates([]);
        }
      })
      .catch(e => {
        console.log('useExchangeRates: error:', e.message);
        setError(e.message);
      })
      .finally(() => {
        console.log('useExchangeRates: setting loading to false');
        setLoading(false);
      });
  }, [base]);

  console.log('useExchangeRates: returning state:', { loading, rates: rates.length, error, base });
  return { rates, loading, updatedAt, error, base };
}

// Хук для получения курсов всех валют (для таблицы курсов)
export function useAllRates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchLatest('USD')
      .then(data => {
        if (data && data.rates) {
          // Добавляем USD с курсом 1
          const allRates = [
            { code: 'USD', rate: 1 },
            ...Object.entries(data.rates).map(([code, rate]) => ({
              code,
              rate,
            }))
          ];
          setRates(allRates);
          setUpdatedAt(data.date || new Date().toISOString());
        } else {
          setRates([]);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { rates, loading, updatedAt, error };
}

// Хук для получения исторических курсов за 24 часа
export function useHistoricalRates(base = 'USD', target = 'EUR', days = 1) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const formatDate = (date) => date.toISOString().split('T')[0];
    
    fetchHistorical(formatDate(startDate), base, target)
      .then(data => {
        if (data && data.rates) {
          const historicalRates = Object.entries(data.rates).map(([code, rate]) => ({
            date: data.date,
            code,
            rate,
          }));
          setRates(historicalRates);
        } else {
          setRates([]);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [base, target, days]);

  return { rates, loading, error };
}

export function useExchangeRatesWithChanges(base = 'USD') {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchRatesWithChanges = async () => {
      try {
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        let todayStr = today.toISOString().split('T')[0];
        let yesterdayStr = yesterday.toISOString().split('T')[0];

        let todayData = await fetchHistorical(todayStr, base);
        let yesterdayData = await fetchHistorical(yesterdayStr, base);

        while (todayData.date === yesterdayData.date) {
          today.setDate(today.getDate() - 1);
          todayStr = today.toISOString().split('T')[0];
          todayData = await fetchHistorical(todayStr, base);
          yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          yesterdayStr = yesterday.toISOString().split('T')[0];
          yesterdayData = await fetchHistorical(yesterdayStr, base);
        }

        if (todayData && todayData.rates && yesterdayData && yesterdayData.rates) {
          let ratesArr = Object.entries(todayData.rates).map(([code, todayRate]) => {
            const yesterdayRate = yesterdayData.rates[code];
            let change = 0;
            let changePercent = 0;
            if (yesterdayRate && yesterdayRate !== 0) {
              change = todayRate - yesterdayRate;
              changePercent = (change / yesterdayRate) * 100;
            }
            return {
              code,
              rate: todayRate,
              change,
              changePercent
            };
          });
          ratesArr = ratesArr.filter(rate => rate.code !== base);
          setRates(ratesArr);
          setUpdatedAt(todayData.date || new Date().toISOString());
        } else {
          setRates([]);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatesWithChanges();
  }, [base]);

  return { rates, loading, updatedAt, error, base };
}

// Хук для получения популярных курсов
export function usePopularRates(base = 'USD', currencies = []) {
  const { rates, loading, error, updatedAt } = useExchangeRates(base);
  
  const popularRates = React.useMemo(() => {
    return preparePopularRates(rates, currencies, base, 7);
  }, [rates, currencies, base]);
  
  return { popularRates, loading, error, updatedAt, base };
}
