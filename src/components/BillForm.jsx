import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill } from '../features/bills/billsSlice';
import '../Styles/BillForm.css';

const BillForm = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !category || !amount || !date) {
      alert('Please fill out all fields');
      return;
    }
    dispatch(
      addBill({
        description,
        category,
        amount: Number(amount),
        date,
      })
    );
    setDescription('');
    setCategory('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="container">
      <div className="heading">ADD A NEW BILL</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label className="label"></label>
          <input
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter bill description"
          />
        </div>
        <div className="input-group">
          <label className="label"></label>
          <select
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="FoodNDining">Food & Dining</option>
            <option value="Utility">Utility</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Travel">Travel</option>
          </select>
        </div>
        <div className="input-group">
          <label className="label"></label>
          <input
            className="input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div className="input-group">
          <label className="label"></label>
          <input
            className="input"
            type="date"
            value={date}
            placeholder="Enter date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Add Bill
        </button>
      </form>
    </div>
  );
};

export default BillForm;
