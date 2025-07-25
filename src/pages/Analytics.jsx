import React from 'react';
import MonthlyExpenseChart from '../components/Charts/MonthlyExpenseChart';
import MonthlyIncomeChart from '../components/Charts/MonthlyIncomeChart';

const Analytics = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h2 className="dashboard-heading">Analytics Dashboard</h2>
        <MonthlyIncomeChart/>
        <MonthlyExpenseChart />
      </div>
    </div>
  );
};

export default Analytics;
