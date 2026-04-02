import React, { useEffect, useMemo, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { findMinimalSubset } from './utils/subsetCalculator';
import {
  setHighlightedBills,
  setMonthlyBudget,
} from './features/bills/billsSlice';
import { toggleRole } from './features/auth/authSlice';

import BillsList from './components/BillsList';
import BillForm from './components/BillForm';
import ChartComponent from './components/ChartComponent';
import './Styles/Dashboard.css';

function App() {
  const dispatch = useDispatch();
  const { bills, monthlyBudget, highlightedBills } = useSelector(
    (state) => state.bills
  );
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user.role === 'ADMIN';

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Recompute minimal subset whenever bills or monthlyBudget changes
  useEffect(() => {
    if (bills.length > 0) {
      const subset = findMinimalSubset(bills, monthlyBudget);
      dispatch(setHighlightedBills(subset));
    }
  }, [bills, monthlyBudget, dispatch]);

  const totalSpent = useMemo(() => 
    bills.reduce((sum, bill) => sum + Number(bill.amount), 0), 
    [bills]
  );

  const remainingBudget = monthlyBudget - totalSpent;

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`} style={{ width: '100vw' }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span style={{ fontSize: '1.75rem' }}>💳</span> 
          <span>BillManager</span>
        </div>
        
        <div style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Current Role</div>
          <div style={{ color: isAdmin ? 'var(--success)' : 'var(--warning)', fontWeight: 700, fontSize: '0.9rem' }}>
             {user.role}
          </div>
        </div>

        <nav className="sidebar-nav" style={{ flex: 1 }}>
          <a href="#" className="nav-item active">Dashboard</a>
          <a href="#" className="nav-item">Bills History</a>
          <a href="#" className="nav-item">Analytics</a>
          
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
             <button 
              onClick={() => dispatch(toggleRole())}
              className="nav-item"
              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <span style={{ marginRight: '0.75rem' }}>🔄</span>
              Switch to {isAdmin ? 'Viewer' : 'Admin'}
            </button>

             <button 
              onClick={() => setDarkMode(!darkMode)}
              className="nav-item"
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
            >
              <span style={{ marginRight: '0.75rem' }}>{darkMode ? '☀️' : '🌙'}</span>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </nav>
      </aside>


      {/* Main Content */}
      <main className="main-content">
        <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Overview</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 700 }}>{user.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.role} Account</div>
            </div>
            <div style={{ width: '45px', height: '45px', background: 'var(--primary)', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>{user.initials}</div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-title">Monthly Budget</div>
              <div className="card-value primary">₹{monthlyBudget.toLocaleString()}</div>
            </div>
            {isAdmin && (
              <div style={{ marginTop: '1.25rem' }}>
                <input
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => dispatch(setMonthlyBudget(Number(e.target.value)))}
                  className="form-input"
                  placeholder="Set Budget..."
                />
              </div>
            )}
          </div>
          <div className="card">
            <div className="card-title">Total Expenses</div>
            <div className="card-value danger">₹{totalSpent.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontWeight: 500 }}>
              <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{bills.length}</span> active bills this month
            </div>
          </div>
          <div className="card">
            <div className="card-title">Remaining Budget</div>
            <div className={`card-value ${remainingBudget >= 0 ? 'success' : 'danger'}`}>
              ₹{remainingBudget.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontWeight: 500 }}>
              {remainingBudget >= 0 ? '✓ Within budget' : '⚠ Budget exceeded!'}
            </div>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: isAdmin ? 'minmax(0, 2fr) 350px' : '1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Bills List Card */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <BillsList />
          </div>

          {/* Add Bill Form Card */}
          {isAdmin && (
            <div className="card" style={{ alignSelf: 'start', minWidth: '300px' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.75rem', fontWeight: 700 }}>Add New Bill</h2>
              <BillForm />
            </div>
          )}
        </section>


        {/* Bottom Row Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
           {/* Highlighted Bills (Subset) */}
          <section className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Payment Recommendations</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Optimized combination of bills fitting your <strong>₹{monthlyBudget}</strong> budget.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              {bills
                .filter((bill) => highlightedBills.includes(bill.id))
                .map((bill) => (
                  <div key={bill.id} style={{ 
                    padding: '1rem', 
                    background: '#f8fafc', 
                    border: '1px solid var(--border)', 
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    minWidth: '180px',
                    flex: '1'
                  }}>
                    <span className="badge badge-success" style={{ padding: '0.5rem', borderRadius: '50%' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{bill.description}</div>
                      <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1rem', marginTop: '0.25rem' }}>₹{bill.amount}</div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Chart Section */}
          <section className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>Spending Trends</h2>
            <div style={{ height: '300px' }}>
              <ChartComponent />
            </div>
          </section>
        </div>
      </main>
    </div>
  );


}

export default App;

