import React from "react";

export default function TripCard({ trip, onDelete }) {
  return (
    <div className="card" style={{ width: 280 }}>
      <img src={trip.image} alt={trip.name} />
      <div className="card-body">
        <h5 className="card-title">{trip.name}</h5>
        <p className="card-text">{trip.country}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => alert("Show details modal")}>Details</button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}