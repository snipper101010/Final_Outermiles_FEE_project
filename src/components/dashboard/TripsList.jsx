import React from "react";
import TripCard from "./TripCard";

export default function TripsList({ trips = [], loggedInUser, onDelete }) {
  const userTrips = trips.filter((t) => (loggedInUser?.trips || []).includes(t.id));

  if ((userTrips || []).length === 0) {
    return (
      <div className="om-card" id="trips-container">
        <div className="om-card1" id="no-trip">
          <img src="https://www.stippl.io/assets/profile-trip-placeholder-b700979b.svg" width="200" alt="placeholder" />
          <h2>Create your first trip</h2>
          <p>Planning is where the adventure starts. Create your first trip and start yours! 🚀</p>
        </div>
      </div>
    );
  }

  return (
    <div id="trips-container" className="om-card">
      <div id="trips-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {userTrips.map((t) => (
          <TripCard key={t.id} trip={t} onDelete={() => onDelete(t.id)} />
        ))}
      </div>
    </div>
  );
}