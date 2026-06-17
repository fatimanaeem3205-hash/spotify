// components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Luxury car
          <br />
          rental in Italy
        </h1>
        <button className="cta-btn">Find a Car</button>
      </div>

      <div className="main-car-display">
        <img
          src="path-to-bronze-rolls-royce.png"
          alt="Rolls-Royce"
          className="hero-car"
        />
        <div className="price-badge">
          <p>$1500/day</p>
        </div>
      </div>

      {/* Booking Form Bar */}
      <div className="booking-bar">
        <div className="tab-buttons">
          <button className="active">Distance</button>
          <button>Hourly</button>
        </div>
        <div className="form-inputs">
          <div className="input-group">
            <label>Pick Up Address</label>
            <input type="text" placeholder="Rome, address, hotel..." />
          </div>
          <div className="input-group">
            <label>Drop Off Address</label>
            <input type="text" placeholder="Florence, Rossi Place" />
          </div>
          <div className="input-group">
            <label>Pick Up Date</label>
            <input type="date" defaultValue="2026-06-12" />
          </div>
          <div className="input-group">
            <label>Pick Up Time</label>
            <input type="time" defaultValue="12:00" />
          </div>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </section>
  );
}
