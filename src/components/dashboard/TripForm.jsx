import React, { useState } from "react";

const countryImages = {
  India: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
  Uae: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  France: "https://images.unsplash.com/photo-1418854982207-12f710b74003",
  Japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
};

export default function TripForm({ ownerId, onCreate, onClose }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("India");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name || !country || !start || !end) {
      setError("Please fill all fields");
      return;
    }

    if (new Date(end) < new Date(start)) {
      setError("End date must be after start date");
      return;
    }

    const newTrip = {
      id: Date.now(),
      name,
      country,
      startdate: start,
      enddate: end,
      image: countryImages[country],
      ownerId,
      inviteCode: Math.random().toString(36).slice(2, 8),
    };

    console.log("Creating new trip:", newTrip); // Debug log
    onCreate(newTrip);
  };

  return (
    <div className="om-create-trip-popup-new">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Create New Trip</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Trip Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Give your trip a name..."
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Destination</label>
              <select
                className="form-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {Object.keys(countryImages).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                min={start}
              />
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="om-add">
                Create Trip
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}