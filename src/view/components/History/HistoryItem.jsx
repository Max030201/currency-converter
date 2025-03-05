import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const HistoryItem = ({ item, onRepeat, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };
  const formatNumber = (num) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(num);
  };
  return (
    <Card className="mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-gray-800 dark:text-white">
            {formatNumber(item.amount)} {item.from} → {formatNumber(item.result)} {item.to}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            Курс: {formatNumber(item.rate)} | {formatDate(item.date)}
          </div>
        </div>
        <div className="flex gap-2">
          <Button icon="pi pi-refresh" className="p-button-sm" onClick={() => onRepeat(item)} tooltip="Повторить" />
          <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => onDelete(item)} tooltip="Удалить" />
        </div>
      </div>
    </Card>
  );
};

export default HistoryItem;
