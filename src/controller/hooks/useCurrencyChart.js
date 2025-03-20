import { useState, useCallback, useEffect } from 'react';
import { fetchTimeSeries } from '../../model/api/frankfurterApi';
import { getPeriodDates, prepareChartStats } from '../../model/ChartModel';
import { getDefaultChartTestData } from '../../utils/defaultChartData';

export function useCurrencyChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  // Получить данные для графика
  const fetchData = useCallback(async (base, target, period) => {
    setLoading(true);
    setError(null);

    try {
      let periodString;
      if (period <= 7) periodString = '1w';
      else if (period <= 30) periodString = '1m';
      else if (period <= 90) periodString = '3m';
      else if (period <= 180) periodString = '6m';
      else periodString = '1y';

      const { startDate, endDate } = getPeriodDates(periodString);
      const result = await fetchTimeSeries(startDate, endDate, base, target);

      // Fallback на тестовые данные
      let dataToUse = result;
      if (!result || !result.rates || Object.keys(result.rates).length === 0) {
        dataToUse = getDefaultChartTestData();
      }

      // Формируем данные для графика
      const chartData = Object.entries(dataToUse.rates).map(([date, rates]) => ({
        date,
        rate: (
          rates[target] ||
          rates[target?.toUpperCase?.()] ||
          rates[target?.toLowerCase?.()] ||
          Object.values(rates)[0]
        )
      }));
      setData(chartData);

      // Считаем статистику по chartData
      const ratesArr = chartData.map(d => d.rate).filter(v => typeof v === 'number' && !isNaN(v));
      if (ratesArr.length > 0) {
        const min = Math.min(...ratesArr);
        const max = Math.max(...ratesArr);
        const avg = ratesArr.reduce((a, b) => a + b, 0) / ratesArr.length;
        const firstRate = ratesArr[0];
        const lastRate = ratesArr[ratesArr.length - 1];
        const change = lastRate - firstRate;
        const changePercent = (change / firstRate) * 100;
        setStats({
          main: {
            min,
            max,
            average: avg,
            change,
            changePercent
          }
        });
      } else {
        setStats({});
      }
    } catch (e) {
      setError(e.message);
      setData([]);
      setStats({});
    } finally {
      setLoading(false);
    }
  }, []);

  // Получить даты для периода
  const getDates = useCallback((period) => {
    // Преобразуем число дней в строковый период
    let periodString;
    if (period <= 7) periodString = '1w';
    else if (period <= 30) periodString = '1m';
    else if (period <= 90) periodString = '3m';
    else if (period <= 180) periodString = '6m';
    else periodString = '1y';

    return getPeriodDates(periodString);
  }, []);

  // Подготовить статистику для компонента
  const getChartStats = useCallback((target) => {
    return prepareChartStats(stats, target);
  }, [stats]);

  return {
    data,
    loading,
    error,
    stats,
    fetchData,
    getDates,
    getChartStats,
    setData,
    setError
  };
}

