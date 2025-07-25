import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const BalanceSummary = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(
      collection(db, 'users', user.uid, 'transactions'),
      (snapshot) => {
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type === 'income') {
            totalIncome += Number(data.amount);
          } else if (data.type === 'expense') {
            totalExpense += Number(data.amount);
          }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
      }
    );

    return () => unsub();
  }, []);

  const balance = income - expense;

  return (
    <div className="balance-summary">
      <h3>Balance Summary</h3>
      <p><strong>Income:</strong> ₹{income}</p>
      <p><strong>Expense:</strong> ₹{expense}</p>
      <p><strong>Remaining Balance:</strong> ₹{balance}</p>
    </div>
  );
};

export default BalanceSummary;
