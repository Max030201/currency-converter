import React from 'react';
import PageLayout from '../components/Layout/PageLayout';
import ConverterForm from '../components/Converter/ConverterForm';
import ConversionResult from '../components/Converter/ConversionResult';
import QuickActions from '../components/Converter/QuickActions';
import PopularRates from '../components/Converter/PopularRates';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useHomePageLogic } from '../../controller/hooks/useHomePageLogic';

const HomePage = () => {
  const {
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
  } = useHomePageLogic();

  return (
  <PageLayout title="Конвертер валют">
      <div className="space-y-6">
        {currenciesError || ratesError ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-500 text-lg">
            {currenciesError || ratesError}
          </div>
        ) : (
          <>
            {/* Форма конвертации - всегда видна */}
            <ConverterForm
              amount={amount}
              setAmount={setAmount}
              currencyFrom={currencyFrom}
              setCurrencyFrom={setCurrencyFrom}
              currencyTo={currencyTo}
              setCurrencyTo={setCurrencyTo}
              currencyList={currencies}
              onSwap={handleSwap}
              onConvert={handleConvert}
              loading={convertLoading || currenciesLoading}
              disabled={convertLoading || currenciesLoading || pageLoading}
            />

            {/* Результат конвертации - всегда видим */}
            {result && (
              <ConversionResult
                result={result.result}
                from={result.from}
                to={result.to}
                rate={result.rate}
                onAddToHistory={handleAddToHistory}
                showAddButton={false}
              />
            )}

            {/* Глобальный лоадер только при первой загрузке валют */}
            {pageLoading ? (
              <LoadingSpinner 
                message="Загрузка данных..."
                description="Получаем курсы валют и список валют"
                showText={true}
              />
            ) : (
              <>
                {/* Быстрые действия всегда видимы */}
            <QuickActions
              popularPairs={popularPairs.map(p => {
                if (p.pair) {
                  const [from, to] = p.pair.split('/');
                  return { from, to };
                }
                return p;
              })}
              onSelectPair={handleSelectPair}
              recentConversions={recent}
              onSelectHistory={handleSelectHistory}
            />

                {/* Лоадер только на таблице при смене базовой валюты */}
                {ratesLoading ? (
                  <LoadingSpinner
                    message="Загрузка курсов..."
                    description="Получаем актуальные курсы валют"
                    showText={true}
                  />
                ) : popularRates && popularRates.length > 0 ? (
            <PopularRates
              rates={popularRates}
              base={baseCurrency}
              title="Популярные курсы относительно"
              currencies={currencies}
            />
                ) : (
                  <div className="flex justify-center items-center min-h-[200px] text-gray-500 text-lg">
                    Нет данных для выбранной валюты
                  </div>
                )}
              </>
            )}
          </>
        )}
    </div>
  </PageLayout>
);
};

export default HomePage;