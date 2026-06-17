// components/Navbar.jsx
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">renc</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#vehicles">Vehicles</a>
        <a href="#booking">Booking</a>
        <a href="#contacts">Contacts</a>
      </div>
      <div className="nav-right">
        <span className="lang-selector">🇬🇧 ENG</span>
        <button className="profile-btn">👤</button>
      </div>
    </nav>
  );
}
