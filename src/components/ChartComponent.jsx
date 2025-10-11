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
    const dateKey = dayjs(bill.date).format('DD-MM-YYYY');
    if (!dataMap[dateKey]) {
      dataMap[dateKey] = 0;
    }
    dataMap[dateKey] += bill.amount;
  });

  // Convert to array, sort by date
  const chartData = Object.keys(dataMap)
    .map((dateKey) => ({
      date: dateKey,
      amount: dataMap[dateKey],
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ width: '80%', height: 300, marginTop: '20px' }}>
      <h2>MONTHLY BILLING CYCLE(TIME SERIES)</h2>
      <ResponsiveContainer>
      <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;