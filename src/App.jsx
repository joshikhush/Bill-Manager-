import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { findMinimalSubset } from './utils/subsetCalculator';
import {
  setHighlightedBills,
  setMonthlyBudget,
} from './features/bills/billsSlice';
 
import BillsList from './components/BillsList';
import BillForm from './components/BillForm';

import ChartComponent from './components/ChartComponent';

function App() {
  const dispatch = useDispatch();
  const { bills, monthlyBudget, highlightedBills } = useSelector(
    (state) => state.bills
  );

  // Recompute minimal subset whenever bills or monthlyBudget changes
  useEffect(() => {
    if (bills.length > 0) {
      const subset = findMinimalSubset(bills, monthlyBudget);
      dispatch(setHighlightedBills(subset));
    }
  }, [bills, monthlyBudget, dispatch]);

  return (
    <div style={{ margin: '10px 10px 10px 10px', fontFamily: 'Times New Roman', backgroundColor: '#f4f4f4' }}>

      <h1 style={{ color: '#333', textAlign: 'center' }}>  ---BIILL MANAGER--- </h1>
      <BillsList />
      <div style={{ marginBottom: '0px', display: 'flex', alignItems: 'center' }}>
        <label
          style={{
            fontSize: '26px',
            padding: '10px',
            fontWeight: 'bold',
            marginRight: '10px', // Adds space between label and input
            color: '#000',
          }}
        >
          Monthly Budget:
        </label>
        <input
          type="number"
          value={monthlyBudget}
          onChange={(e) => dispatch(setMonthlyBudget(Number(e.target.value)))}
          style={{
            padding: '10px',
            width: '20%',
            fontSize: '20px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#333' }}>BILLS TO BE PAID (According to the Budget)</h2>
          <ul style={{ listStyleType: 'none', padding: '0', display: 'flex', flexWrap: 'wrap'}}>
            {bills
              .filter((bill) => highlightedBills.includes(bill.id))
              .map((bill) => (
                <li
                  key={bill.id}
                  style={{
                    padding: '5px 50px',
                    borderBottom: '1px solid #ddd',
                    fontSize: '30px',
                    color: '#555',
                  }}
                >
                  {bill.description}: ₹{bill.amount}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <BillForm />
       <ChartComponent />
    </div>
  );
}

export default App;
