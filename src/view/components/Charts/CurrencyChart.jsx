import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from 'primereact/card';

const CurrencyChart = ({ data, base, target, loading }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatRate = (rate) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(rate);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(label)}
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white">
            {formatRate(payload[0].value)} {target}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl">
      <div className="font-semibold mb-4 text-gray-800 dark:text-white text-lg">
        Динамика курса {base} → {target}
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
            />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              className="dark:text-gray-400"
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tickFormatter={formatRate}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              className="dark:text-gray-400"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CurrencyChart;
