import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const MonthlyIncomeChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'transactions'), (snapshot) => {
      const monthMap = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const date = new Date(data.date);
        const month = date.toLocaleString('default', { month: 'short' });

        if (data.type === 'income') {
          if (!monthMap[month]) {
            monthMap[month] = 0;
          }
          monthMap[month] += Number(data.amount);
        }
      });

      const formatted = Object.entries(monthMap).map(([month, total]) => ({
        month,
        income: total
      }));

      setMonthlyData(formatted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chart-container">
      <h3>Monthly Income</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#00c49f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeChart;
