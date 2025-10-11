import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>Filter by Category: </label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All</option>
        <option value="FoodNDining">FoodNDining</option>
        <option value="Food & Dining">Food & Dining</option>
        <option value="utility">Utility</option>
        <option value="shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>
    </div>
  );
};

export default Filter;
