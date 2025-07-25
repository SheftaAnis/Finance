import React, { useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("Not logged in");
      return;
    }

    try {
      await addDoc(collection(db, 'users', user.uid, 'transactions'), {
        amount: Number(amount),
        type,
        category,
        date: new Date().toISOString(),
      });

      setAmount('');
      setCategory('');
      setType('income');
      alert("Transaction added!");
    } catch (error) {
      alert("Error adding transaction");
      console.log(error);
    }
  };

  return (
   <div className="add-transaction-page">
  <h2>Add Transaction</h2>
  <div className="add-transaction-container">
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <select value={type} onChange={(e) => setType(e.target.value)} required>
        <option value="">Select Type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button type="submit">Add</button>
    </form>
  </div>
</div>

  );
};

export default AddTransaction;
