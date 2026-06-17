// components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <section id="about" className="about-section">
      <div className="about-text">
        <h2>About Us</h2>
        <p>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <p>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="about-gallery">
        <div className="gallery-main">
          <img src="path-to-green-car.png" alt="Featured Car" />
        </div>
        <div className="gallery-side">
          <div className="experience-badge">
            <h3>+10 years</h3>
            <p>Experience</p>
          </div>
          <img src="path-to-white-convertible.png" alt="Convertible" />
        </div>
      </div>
    </section>
  );
}
