import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00C49F', '#FF8042'];

const ExpensePieChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(
      collection(db, 'users', user.uid, 'transactions'),
      (snapshot) => {
        let income = 0;
        let expense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type === 'income') {
            income += Number(data.amount);
          } else if (data.type === 'expense') {
            expense += Number(data.amount);
          }
        });

        setChartData([
          { name: 'Income', value: income },
          { name: 'Expense', value: expense }
        ]);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="chart-container">
      <h3>Income vs Expense</h3>
      <PieChart width={300} height={250}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpensePieChart;
