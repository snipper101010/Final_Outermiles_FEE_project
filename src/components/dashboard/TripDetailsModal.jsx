import React from 'react';

export default function TripDetailsModal({ trip, isOpen, onClose, onDelete }) {
  if (!isOpen || !trip) return null;

  return (
    <div id="trip-details-popup" className="om-create-trip-popup" style={{ display: 'block' }}>
      <div className="om-create-trip-popup-content">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>{trip.name}</h4>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="trip-details">
          <img 
            src={trip.image} 
            alt={trip.name}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '200px', width: '100%', objectFit: 'cover' }}
          />
          
          <div className="mb-3">
            <h6>Destination</h6>
            <p>{trip.country}</p>
          </div>

          <div className="mb-3">
            <h6>Dates</h6>
            <p>
              {new Date(trip.startdate).toLocaleDateString()} - {new Date(trip.enddate).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-3">
            <h6>Invite Code</h6>
            <p className="font-monospace">{trip.inviteCode}</p>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              className="btn btn-outline-danger" 
              onClick={() => {
                onDelete(trip.id);
                onClose();
              }}
            >
              Delete Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}