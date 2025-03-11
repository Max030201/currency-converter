import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrencyList, getPopularCurrencies } from '../../model/CurrencyModel';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getCurrencyList()
      .then(data => {
        // data: { USD: 'US Dollar', EUR: 'Euro', ... }
        const currencyList = Object.entries(data).map(([code, label]) => ({ code: code.trim().toUpperCase(), label }));
        setCurrencies(currencyList);
      })
      .catch(e => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const popular = getPopularCurrencies();

  return (
    <CurrencyContext.Provider value={{ 
      currencies, 
      loading, 
      error, 
      popular
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyList = () => useContext(CurrencyContext);
