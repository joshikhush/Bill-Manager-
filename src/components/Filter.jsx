import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>Filter:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="form-input"
        style={{ padding: '0.375rem 2rem 0.375rem 0.75rem', width: 'auto', fontSize: '0.875rem', height: 'auto' }}
      >
        <option value="all">All Categories</option>
        <option value="Food & Dining">Food & Dining</option>
        <option value="Utility">Utility</option>
        <option value="Shopping">Shopping</option>
        <option value="Education">Education</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Travel">Travel</option>
      </select>
    </div>
  );
};

export default Filter;

