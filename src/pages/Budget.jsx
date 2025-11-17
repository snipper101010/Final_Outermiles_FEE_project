import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import profilePic from '../assets/images/profile.png';

export default function Budget() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');
  const [expensesByTrip, setExpensesByTrip] = useLocalStorage('tripExpenses', {}); // { [tripId]: Expense[] }

  // Form state
  const [payerId, setPayerId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const storedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(storedUser);
    setAllTrips(storedTrips);
    setAllUsers(storedUsers);

    // Default to first user trip if not chosen
    const myTrips = storedTrips.filter((t) => (storedUser.trips || []).includes(t.id));
    if (myTrips.length && !selectedTripId) {
      setSelectedTripId(String(myTrips[0].id));
    }
  }, [navigate, selectedTripId]);

  const myTrips = useMemo(() => {
    return allTrips.filter((t) => (user?.trips || []).includes(t.id));
  }, [allTrips, user]);

  // Participants are users who have this trip id
  const participants = useMemo(() => {
    if (!selectedTripId) return [];
    const tid = Number(selectedTripId);
    return allUsers.filter((u) => (u.trips || []).includes(tid));
  }, [allUsers, selectedTripId]);

  // Expenses for current trip
  const expenses = useMemo(() => {
    if (!selectedTripId) return [];
    return expensesByTrip[selectedTripId] || [];
  }, [expensesByTrip, selectedTripId]);

  const addExpense = () => {
    if (!selectedTripId || !payerId || !amount) return;
    const amt = parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) return;
    const newExpense = {
      id: Date.now(),
      payerId: Number(payerId),
      amount: amt,
      note: note.trim(),
      createdAt: new Date().toISOString()
    };
    const nextForTrip = [...(expensesByTrip[selectedTripId] || []), newExpense];
    setExpensesByTrip({
      ...expensesByTrip,
      [selectedTripId]: nextForTrip
    });
    setAmount('');
    setNote('');
  };

  // Calculations
  const totalsByUser = useMemo(() => {
    const map = {};
    for (const p of participants) {
      map[p.id] = 0;
    }
    for (const e of expenses) {
      map[e.payerId] = (map[e.payerId] || 0) + e.amount;
    }
    return map;
  }, [participants, expenses]);

  const totalSpend = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const perHead = useMemo(() => {
    if (!participants.length) return 0;
    return totalSpend / participants.length;
  }, [totalSpend, participants.length]);

  const balances = useMemo(() => {
    // positive -> should receive, negative -> owes
    return participants.map((p) => ({
      user: p,
      paid: totalsByUser[p.id] || 0,
      share: perHead,
      balance: (totalsByUser[p.id] || 0) - perHead
    }));
  }, [participants, totalsByUser, perHead]);

  const format = (n) => (Number.isFinite(n) ? n.toFixed(2) : '0.00');

  return (
    <div>
      {/* NAVBAR */}
      <nav className="om-navbar">
        <div className="om-heading" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          OuterMiles
        </div>
        <div className="om-middle-buttons">
          <button className="om-middle-button" onClick={() => navigate('/dashboard')}>You</button>
          <button className="om-middle-button" onClick={() => navigate('/dashboard')}>Discover</button>
        </div>
        <div className="om-right-actions">
          <button className="om-add" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
      </nav>

      <div className="om-container">
        {/* SIDEBAR */}
        <aside className="om-aside-profile">
          <div className="om-profile-pic">
            <img className="om-profile" src={profilePic} alt="Profile" />
          </div>
          <h1 className="om-name">{user?.name || 'Guest User'}</h1>
          <h3 className="om-username">@{user?.username || 'guest_usr'}</h3>

          <nav className="om-sidebar-nav">
            <div className="om-nav-item" onClick={() => navigate('/dashboard')}>Dashboard</div>
            <div className="om-nav-item" onClick={() => navigate('/dashboard')}>Friends</div>
            <div className="om-nav-item om-nav-item-active" onClick={() => navigate('/budget')}>Budget</div>
          </nav>

          <br /><br /><br />
          <button className="btn btn-outline-danger ms-3" id="logout-btn" onClick={() => { localStorage.removeItem('loggedInUser'); navigate('/'); }}>
            Logout
          </button>
        </aside>

        {/* CONTENT */}
        <main className="om-content">
          <div className="om-card" style={{ padding: 16 }}>
            <h3 style={{ marginBottom: 12 }}>Trip Budget</h3>

            {/* Trip selector */}
            <div className="mb-3">
              <label className="form-label">Select Trip</label>
              <select
                className="form-select"
                value={selectedTripId}
                onChange={(e) => {
                  setSelectedTripId(e.target.value);
                  setPayerId('');
                }}
              >
                {myTrips.length === 0 && <option value="">No trips found</option>}
                {myTrips.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name} — {t.country}
                  </option>
                ))}
              </select>
            </div>

            {/* Add expense */}
            <div className="om-card" style={{ padding: 16, marginTop: 12 }}>
              <h5 style={{ marginBottom: 12 }}>Add Expense</h5>
              <div className="row mb-2">
                <div className="col">
                  <label className="form-label">Payer</label>
                  <select
                    className="form-select"
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                    disabled={!participants.length}
                  >
                    <option value="">Select payer</option>
                    {participants.map((p) => (
                      <option key={p.id} value={String(p.id)}>
                        {p.name} (@{p.username})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Description (optional)"
                />
              </div>
              <button className="om-add" onClick={addExpense} disabled={!selectedTripId || !payerId || !amount}>
                Add
              </button>
            </div>

            {/* Summary */}
            <div className="om-card" style={{ padding: 16, marginTop: 12 }}>
              <h5 style={{ marginBottom: 8 }}>Summary</h5>
              <p>Total spend: ₹{format(totalSpend)} | Per person: ₹{format(perHead)}</p>
              <div>
                {balances.map((b) => (
                  <div key={b.user.id} className="d-flex justify-content-between align-items-center" style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                    <span>{b.user.name} (@{b.user.username})</span>
                    <span>
                      Paid: ₹{format(b.paid)} | Owes: ₹{format(Math.max(0, b.share - b.paid))} | Gets: ₹{format(Math.max(0, b.paid - b.share))}
                    </span>
                  </div>
                ))}
                {!balances.length && <p>No participants yet. Join this trip to see friends.</p>}
              </div>
            </div>

            {/* Expense list */}
            <div className="om-card" style={{ padding: 16, marginTop: 12 }}>
              <h5 style={{ marginBottom: 8 }}>Expenses</h5>
              {expenses.length === 0 ? (
                <p>No expenses yet. Add your first one above.</p>
              ) : (
                <div>
                  {expenses.slice().reverse().map((e) => {
                    const payer = allUsers.find((u) => u.id === e.payerId);
                    return (
                      <div key={e.id} className="d-flex justify-content-between align-items-center" style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
                        <div>
                          <strong>{payer ? payer.name : 'Unknown'}</strong> paid ₹{format(e.amount)}
                          {e.note ? ` — ${e.note}` : ''}
                        </div>
                        <small style={{ color: '#6c757d' }}>{new Date(e.createdAt).toLocaleString()}</small>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


