import React from 'react';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import dayjs from 'dayjs';

const ChartComponent = () => {
  const { bills } = useSelector((state) => state.bills);

  // Group by date
  const dataMap = {};
  bills.forEach((bill) => {
    const dateKey = dayjs(bill.date).format('DD-MM');
    if (!dataMap[dateKey]) {
      dataMap[dateKey] = 0;
    }
    dataMap[dateKey] += Number(bill.amount);
  });

  // Convert to array, sort by date
  const chartData = Object.keys(dataMap)
    .map((dateKey) => ({
      date: dateKey,
      amount: dataMap[dateKey],
    }))
    .sort((a, b) => {
      const [dayA, monthA] = a.date.split('-');
      const [dayB, monthB] = b.date.split('-');
      return new Date(2025, monthA - 1, dayA) - new Date(2025, monthB - 1, dayB);
    });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--text-muted)', fontSize: 11, fontWeight: 500 }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip 
          cursor={{ fill: 'var(--bg-main)' }}
          contentStyle={{ 
            borderRadius: '0.75rem', 
            border: 'none', 
            boxShadow: 'var(--shadow)',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-card)'
          }}
          itemStyle={{ color: 'var(--primary)', fontWeight: 700 }}
          labelStyle={{ marginBottom: '0.25rem', fontWeight: 600, color: 'var(--text-main)' }}
          formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
        />

        <Bar 
          dataKey="amount" 
          radius={[5, 5, 0, 0]} 
          fill="url(#barGradient)"
          barSize={45}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;