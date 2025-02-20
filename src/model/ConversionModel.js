import { fetchLatest, getExchangeRate, convertLocally } from './api/frankfurterApi';

// Валидация входных данных
function validateConversionInput(from, to, amount) {
  if (!from || !to) {
    throw new Error('Необходимо указать валюты для конвертации');
  }
  
  if (from === to) {
    throw new Error('Валюты должны быть разными');
  }
  
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Сумма должна быть положительным числом');
  }
  
  if (amount > 999999999) {
    throw new Error('Сумма слишком большая');
  }
}

// Конвертация с получением курса через API
export async function convertCurrency(from, to, amount) {
  validateConversionInput(from, to, amount);
  
  try {
    const rate = await getExchangeRate(from, to);
    const result = convertLocally(amount, from, to, { [to]: rate });
    
    const conversionResult = {
      from,
      to,
      amount: parseFloat(amount),
      rate,
      result: parseFloat(result.toFixed(6)),
      timestamp: new Date().toISOString()
    };
    
    return conversionResult;
  } catch (error) {
    throw new Error(`Ошибка конвертации: ${error.message}`);
  }
}

// Конвертация с использованием уже полученных курсов
export function convertWithRates(from, to, amount, rates) {
  validateConversionInput(from, to, amount);
  
  try {
    const result = convertLocally(amount, from, to, rates);
    
    return {
      from,
      to,
      amount: parseFloat(amount),
      rate: rates[to],
      result: parseFloat(result.toFixed(6)),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Ошибка конвертации: ${error.message}`);
  }
}

// Получает курсы для нескольких валют
export async function getRatesForCurrencies(baseCurrency, targetCurrencies) {
  if (!baseCurrency || !targetCurrencies || targetCurrencies.length === 0) {
    throw new Error('Необходимо указать базовую валюту и целевые валюты');
  }
  
  try {
    const symbols = targetCurrencies.join(',');
    const data = await fetchLatest(baseCurrency, symbols);
    return data.rates;
  } catch (error) {
    throw new Error(`Ошибка получения курсов: ${error.message}`);
  }
}

// Форматирует результат конвертации
export function formatConversionResult(conversion) {
  return {
    ...conversion,
    formattedAmount: conversion.amount.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }),
    formattedResult: conversion.result.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }),
    formattedRate: conversion.rate.toLocaleString('ru-RU', {
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    })
  };
}

// Локальная конвертация
export function convertLocalWithAllRates(from, to, amount, allRates) {
  if (!from || !to) {
    throw new Error('Необходимо указать валюты для конвертации');
  }
  if (isNaN(amount) || amount <= 0) {
    throw new Error('Сумма должна быть положительным числом');
  }
  if (from.toUpperCase() === to.toUpperCase()) {
    return {
      from,
      to,
      amount: parseFloat(amount),
      result: parseFloat(amount),
      rate: 1,
      formattedResult: `${parseFloat(amount).toFixed(2)} ${to}`,
      formattedRate: `1 ${from} = 1 ${to}`
    };
  }
  const toCode = to.toUpperCase();
  const rateData = allRates.find(r => r.code.toUpperCase() === toCode);
  if (!rateData) {
    throw new Error('Курс не найден в загруженных данных');
  }
  const result = amount * rateData.rate;
  return {
    from,
    to,
    amount: parseFloat(amount),
    result: parseFloat(result.toFixed(2)),
    rate: parseFloat(rateData.rate.toFixed(6)),
    formattedResult: `${result.toFixed(2)} ${to}`,
    formattedRate: `1 ${from} = ${rateData.rate.toFixed(6)} ${to}`
  };
}

// Подготавливает популярные курсы для отображения
export function preparePopularRates(rates, currencies, baseCurrency, limit = 7) {
  if (!rates || !currencies) return [];
  
  return rates
    .filter(rate => rate.code !== baseCurrency)
    .sort((a, b) => b.rate - a.rate)
    .map(rate => ({
      ...rate,
      label: currencies.find(c => c.code === rate.code)?.label || rate.code
    }))
    .slice(0, limit);
}