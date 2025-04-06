import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './controller/context/ThemeContext';
import { ToastProvider } from './controller/context/ToastContext';
import { CurrencyProvider } from './controller/context/CurrencyContext';
import { RepeatConversionProvider } from './controller/context/RepeatConversionContext';
import MainLayout from './view/components/Layout/MainLayout';
import HomePage from './view/pages/HomePage';
import RatesPage from './view/pages/RatesPage';
import ChartPage from './view/pages/ChartPage';
import HistoryPage from './view/pages/HistoryPage';

const App = () => (
  <ThemeProvider>
    <ToastProvider>
      <CurrencyProvider>
        <RepeatConversionProvider>
        <Router basename={process.env.NODE_ENV === 'production' ? '/currency-converter' : ''}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="rates" element={<RatesPage />} />
              <Route path="chart" element={<ChartPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </Router>
        </RepeatConversionProvider>
      </CurrencyProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default App;