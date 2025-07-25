import React from 'react';
import BalanceSummary from '../components/BalanceSummary';
import AddTransaction from '../components/AddTransaction';
import TransactionList from '../components/TransactionList';
import ExpensePieChart from '../components/Charts/ExpensePieChart';

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
  <div className="dashboard-container">
    <h2 className="dashboard-heading">Finance Dashboard</h2>
    <div className="dashboard-grid">
      <div className="left-section">
        <BalanceSummary />
        <AddTransaction />
      </div>
      <div className="right-section">
        <ExpensePieChart />
      </div>
    </div>
    <TransactionList />
  </div>
</div>

  );
};

export default Dashboard;
