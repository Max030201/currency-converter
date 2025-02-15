import React from 'react';
import PageLayout from '../components/Layout/PageLayout';
import HistoryFilter from '../components/History/HistoryFilter';
import HistoryList from '../components/History/HistoryList';
import HistoryStats from '../components/History/HistoryStats';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { useHistoryPageLogic } from '../../controller/hooks/useHistoryPageLogic';

const HistoryPage = () => {
  const {
    history,
    loading,
    stats,
    mostPopularPair,
    searchValue,
    setSearchValue,
      currency,
    setCurrency,
    datePreset,
    setDatePreset,
      dateRange,
    setDateRange,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    first,
    setFirst,
    rows,
    filteredHistory,
    currencyList,
    handleRepeat,
    handleDelete,
    isLoading
  } = useHistoryPageLogic();

  return (
  <PageLayout title="История конвертаций">
    <div className="space-y-4">
        <HistoryFilter
          search={searchValue}
          onSearchChange={setSearchValue}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          datePreset={datePreset}
          onDatePresetChange={setDatePreset}
          currencyList={currencyList}
          currency={currency}
          onCurrencyChange={setCurrency}
          disabled={loading}
        />
        {loading ? (
          <LoadingSpinner message="Загрузка истории..." description="Получаем историю конвертаций" showText={true} />
        ) : history.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">История пуста</div>
        ) : (
          <HistoryList
            history={filteredHistory}
            onRepeat={handleRepeat}
            onDelete={handleDelete}
            loading={loading}
            paginator={true}
            rows={rows}
            onPage={e => {
              setFirst(e.first);
              setPage(Math.floor(e.first / rows) + 1);
            }}
            first={first}
            totalRecords={filteredHistory.length}
          />
        )}
        <HistoryStats
          total={history.length}
          mostPopularPair={mostPopularPair}
          totalAmount={stats.totalAmount}
        />
    </div>
  </PageLayout>
);
};

export default HistoryPage;
