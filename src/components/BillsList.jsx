import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBill } from '../features/bills/billsSlice';
import Filter from '../components/Filter';
import {  setFilterCategory } from '../features/bills/billsSlice';
import '../Styles/BillsList.css'; // Import the new CSS file

const BillsList = () => {
  const dispatch = useDispatch();
  const { bills, filterCategory, highlightedBills } = useSelector((state) => state.bills);

  // Filter by category
  const filteredBills =
    filterCategory === 'all'
      ? bills
      : bills.filter((bill) => bill.category === filterCategory);

  return (
    <div className="container2">
      <h2 className="heading">ALL BILLS : Total {filteredBills.length} </h2>
      <div style={{ marginBottom: '20px' }}>
  <Filter
    value={filterCategory}
    onChange={(cat) => dispatch(setFilterCategory(cat))}
  />
</div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Highlighted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => {
              const isHighlighted = highlightedBills.includes(bill.id);
              return (
                <tr
                  key={bill.id}
                  className={isHighlighted ? 'highlighted-row' : ''}
                >
                  <td>{bill.id}</td>
                  <td>{bill.description}</td>
                  <td>{bill.category}</td>
                  <td>₹{bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>{isHighlighted ? 'YES' : 'NO'}</td>
                  <td>
                    <button2
                      className="button"
                      onClick={() => dispatch(removeBill(bill.id))}
                    >
                      Remove
                    </button2>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillsList;
