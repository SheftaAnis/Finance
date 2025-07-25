import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'users', user.uid, 'transactions'),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="transaction-list">
      <h3>Your Transactions</h3>
      {transactions.length === 0 && <p>No transactions yet.</p>}
      {transactions.map(txn => (
        <div key={txn.id} className={`transaction-card ${txn.type}`}>
          <div className="txn-row">
            <span className="txn-badge">{txn.type}</span>
            <span className="txn-amount">₹{txn.amount}</span>
          </div>
          <div className="txn-meta">
            <span className="txn-category">{txn.category}</span>
            <span className="txn-date">
              {new Date(txn.date).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
