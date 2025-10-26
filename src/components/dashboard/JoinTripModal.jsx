import React, { useState } from 'react';

export default function JoinTripModal({ isOpen, onClose, onJoin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!code.trim()) {
      setError('Please enter an invite code');
      return;
    }
    
    try {
      onJoin(code);
      setCode('');
      setError('');
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid invite code');
    }
  };

  if (!isOpen) return null;

  return (
    <div id="join-popup" className="om-create-trip-popup-new" style={{ display: 'block' }}>
      <div className="form-container-join">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Join a Trip</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="mb-3">
          <label className="form-label">Enter invite code</label>
          <input 
            type="text"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code..."
          />
          {error && <div className="text-danger mt-1">{error}</div>}
        </div>

        <button className="om-add w-100" onClick={handleJoin}>
          Join Trip
        </button>
      </div>
    </div>
  );
}