import React, { useState } from "react";

const COUNTRY_IMAGES = {
  India: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
  UAE: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
  France: "https://images.unsplash.com/photo-1418854982207-12f710b74003",
  Japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
};

export default function TripForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    country: "India",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTrip = {
      id: Date.now(),
      ...formData,
      image: COUNTRY_IMAGES[formData.country],
    };
    onSubmit(newTrip);
  };

  return (
    <div className="om-create-trip-popup-new">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="d-flex justify-content-between mb-3">
              <h5>Create New Trip</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Trip name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <select
              className="form-control mb-3"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
            >
              {Object.keys(COUNTRY_IMAGES).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <input
              type="date"
              className="form-control mb-3"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />

            <input
              type="date"
              className="form-control mb-3"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              min={formData.startDate}
              required
            />

            <button type="submit" className="om-add w-100">
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}