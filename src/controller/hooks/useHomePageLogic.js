import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrencyList } from '../context/CurrencyContext';
import { useCurrencyConverter } from './useCurrencyConverter';
import { useConversionHistory } from './useConversionHistory';
import { usePopularRates } from './useFrankfurter';
import { useToast } from './useToast';

export function useHomePageLogic() {
  const { currencies, loading: currenciesLoading, error: currenciesError } = useCurrencyList();
  const { convertWithValidation, result, loading: convertLoading } = useCurrencyConverter();
  const { add, recent, popularPairs } = useConversionHistory();
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const { popularRates, loading: ratesLoading, error: ratesError, updatedAt } = usePopularRates(baseCurrency, currencies);
  const { show } = useToast();

  // Локальное состояние для формы
  const [amount, setAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState(null);
  const [currencyTo, setCurrencyTo] = useState(null);

  // pageLoading только при первой загрузке валют
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    if (!currenciesLoading && currencies && currencies.length > 0) {
      setPageLoading(false);
    } else {
      setPageLoading(true);
    }
  }, [currenciesLoading, currencies]);

  const location = useLocation();
  const navigate = useNavigate();

  // Подстановка валют из location.state при переходе с истории
  useEffect(() => {
    if (location.state && location.state.from && location.state.to && currencies && currencies.length > 0) {
      const fromCurrency = currencies.find(c => c.code === location.state.from);
      const toCurrency = currencies.find(c => c.code === location.state.to);
      if (fromCurrency && toCurrency) {
        setCurrencyFrom(fromCurrency);
        setCurrencyTo(toCurrency);
        // Очищаем state, чтобы не было повторной подстановки
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, currencies, navigate]);

  // Обработчики событий
  const handleConvert = useCallback(async () => {
    try {
      await convertWithValidation(currencyFrom, currencyTo, amount, add, show);
    } catch (error) {
      // Ошибка уже обработана в convertWithValidation
    }
  }, [currencyFrom, currencyTo, amount, convertWithValidation, add, show]);

  const handleSwap = useCallback(() => {
    if (currencyFrom && currencyTo) {
      setCurrencyFrom(currencyTo);
      setCurrencyTo(currencyFrom);
    }
  }, [currencyFrom, currencyTo]);

  const handleSelectPair = useCallback((pair) => {
    const fromCurrency = currencies.find(c => c.code === pair.from);
    const toCurrency = currencies.find(c => c.code === pair.to);
    if (fromCurrency && toCurrency) {
      setCurrencyFrom(fromCurrency);
      setCurrencyTo(toCurrency);
    }
  }, [currencies]);

  const handleSelectHistory = useCallback((historyItem) => {
    const fromCurrency = currencies.find(c => c.code === historyItem.from);
    const toCurrency = currencies.find(c => c.code === historyItem.to);
    if (fromCurrency && toCurrency) {
      setCurrencyFrom(fromCurrency);
      setCurrencyTo(toCurrency);
      setAmount(historyItem.amount);
    }
  }, [currencies]);

  const handleAddToHistory = useCallback(() => {
    if (result) {
      add(result);
      show({
        severity: 'success',
        summary: 'Добавлено в историю',
        detail: 'Конвертация сохранена в истории',
        life: 2000
      });
    }
  }, [result, add, show]);

  // Обработка ошибок
  useEffect(() => {
    if (currenciesError) {
      show({
        severity: 'error',
        summary: 'Ошибка загрузки валют',
        detail: currenciesError,
        life: 5000
      });
    }
  }, [currenciesError, show]);

  useEffect(() => {
    if (currencyFrom) {
      setBaseCurrency(currencyFrom.code);
    }
  }, [currencyFrom]);

  useEffect(() => {
    if (ratesError) {
      show({
        severity: 'warn',
        summary: 'Ошибка загрузки курсов',
        detail: ratesError,
        life: 3000
      });
    }
  }, [ratesError, show]);

  return {
    currencies,
    currenciesLoading,
    currenciesError,
    convertWithValidation,
    result,
    convertLoading,
    add,
    recent,
    popularPairs,
    baseCurrency,
    setBaseCurrency,
    popularRates,
    ratesLoading,
    ratesError,
    updatedAt,
    show,
    amount,
    setAmount,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    pageLoading,
    handleConvert,
    handleSwap,
    handleSelectPair,
    handleSelectHistory,
    handleAddToHistory
  };
} 