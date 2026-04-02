import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill, setFilterCategory, setSearchQuery } from '../features/bills/billsSlice';

import Filter from '../components/Filter';

const BillsList = () => {
  const dispatch = useDispatch();
  const { bills, filterCategory, searchQuery, highlightedBills } = useSelector((state) => state.bills);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user.role === 'ADMIN';

  const filteredBills = bills
    .filter((bill) => filterCategory === 'all' || bill.category === filterCategory)
    .filter((bill) => bill.description.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="table-container">
      <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', gap: '1rem', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700, color: 'var(--text-main)', flex: 1 }}>Recent Bills</h2>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search bills..." 
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="form-input"
              style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', fontSize: '0.875rem', width: '200px' }}
            />
            <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
          </div>

          <Filter
            value={filterCategory}
            onChange={(cat) => dispatch(setFilterCategory(cat))}
          />
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBills.length > 0 ? filteredBills.map((bill) => {
              const isHighlighted = highlightedBills.includes(bill.id);
              return (
                <tr key={bill.id}>
                  <td style={{ color: 'var(--text-muted)', fontWeight: 500 }}>#{bill.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{bill.description}</td>
                  <td>
                    <span className="badge badge-category">
                      {bill.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: '1rem' }}>₹{bill.amount.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{bill.date}</td>
                  <td>
                    {isHighlighted ? (
                      <span className="badge badge-success">Highlighted</span>
                    ) : (
                      <span className="badge badge-neutral">Standard</span>
                    )}
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        className="btn btn-remove"
                        style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                        onClick={() => dispatch(removeBill(bill.id))}
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={isAdmin ? 7 : 6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No bills found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default BillsList;



