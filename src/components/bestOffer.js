// components/BestOffer.jsx
import React from "react";

export default function BestOffer() {
  return (
    <section className="best-offer-section">
      <div className="offer-info">
        <h3>Best offer</h3>
        <h2>Bentley Flying Spur</h2>
        <p className="price">
          for <span>$400</span>/day
        </p>
        <button className="details-btn">Learn More</button>
      </div>
      <div className="offer-image">
        <img src="path-to-grey-bentley.png" alt="Bentley Flying Spur" />
      </div>
    </section>
  );
}
