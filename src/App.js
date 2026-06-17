import React from "react";
import "./index.css";

export default function App() {
  return (
    <div className="landing-root">
      {/* --- HERO & HEADER SECTION --- */}
      <header className="hero-wrapper">
        <nav className="navbar">
          <div className="logo">renc</div>
          <div className="nav-links">
            <a href="#about" className="nav-link-item">
              About
            </a>
            <a href="#vehicles" className="nav-link-item">
              Vehicles
            </a>
            <a href="#booking" className="nav-link-item">
              Booking
            </a>
            <a href="#contacts" className="nav-link-item">
              Contacts
            </a>
          </div>
          <div className="nav-right">
            <span>🇬🇧 ENG</span>
            <button className="profile-circle-btn">👤</button>
          </div>
        </nav>

        <div className="hero-main">
          <div className="hero-title">
            <h1 className="hero-h1">
              Luxury car
              <br />
              rental in Italy
            </h1>
            <button className="cta-pill-gold">Read More</button>
          </div>
          <div className="hero-image-container">
            <div className="main-showcase-car-place">
              <span>Bronze Rolls-Royce Image</span>
            </div>
            <div className="floating-price-card">
              <div className="mini-car-preview"></div>
              <p className="floating-price-text">$1500/day</p>
            </div>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="booking-panel">
          <div className="booking-tabs">
            <button className="tab-btn tab-btn-active">Distance</button>
            <button className="tab-btn">Hourly</button>
          </div>
          <div className="booking-grid">
            <div className="input-box">
              <label className="input-label">Pick Up Address</label>
              <input
                type="text"
                placeholder="Rome, address, hotel..."
                className="input-field"
              />
            </div>
            <div className="input-box">
              <label className="input-label">Drop Off Address</label>
              <input
                type="text"
                placeholder="Florence, Rossi Place"
                className="input-field"
              />
            </div>
            <div className="input-box">
              <label className="input-label">Pick Up Date</label>
              <input
                type="text"
                defaultValue="APR 18, 2026"
                className="input-field"
              />
            </div>
            <div className="input-box">
              <label className="input-label">Pick Up Time</label>
              <input
                type="text"
                defaultValue="12:00 PM"
                className="input-field"
              />
            </div>
            <button className="search-submit-btn">Book Now</button>
          </div>
        </div>
      </header>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="about-wrapper">
        <div className="about-left">
          <h2 className="section-heading">About Us</h2>
          <p className="about-paragraph">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p className="about-paragraph">
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>
        <div className="about-grid-display">
          <div className="large-gallery-placeholder">
            <span>Green Car Image</span>
          </div>
          <div className="about-right-stack">
            <div className="experience-box">
              <h3 className="experience-title">+10 years</h3>
              <p className="experience-text">Experience</p>
            </div>
            <div className="small-gallery-placeholder">
              <span>Convertible Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BEST OFFER SHOWCASE --- */}
      <section className="best-offer-wrapper">
        <div className="offer-card-banner">
          <div className="offer-meta">
            <h3 className="offer-sub">Best offer</h3>
            <h2 className="offer-main-title">Bentley Flying Spur</h2>
            <p className="price-tag">
              for <span className="price-tag-span">$400</span> / day
            </p>
            <button className="cta-pill-gold">Learn More</button>
          </div>
          <div className="offer-car-placeholder">
            <span>Grey Bentley Image</span>
          </div>
        </div>
      </section>

      {/* --- CAR FLEET SECTION --- */}
      <section id="vehicles" className="vehicles-wrapper">
        <div className="section-title-bar">
          <h2 className="section-heading">Vehicles</h2>
          <div className="carousel-controls">
            <button className="control-arrow-btn">←</button>
            <button className="control-arrow-btn">→</button>
          </div>
        </div>
        <div className="vehicles-row-grid">
          {[
            { name: "McLaren 720s", price: "$420/day" },
            { name: "Bentley Continental GT V8", price: "$380/day" },
            { name: "Rolls-Royce Spectre", price: "$490/day" },
            { name: "Ferrari SF90", price: "$580/day" },
          ].map((car, idx) => (
            <div className="vehicle-product-card" key={idx}>
              <div>
                <h4 className="car-card-title">{car.name}</h4>
                <p className="car-card-price">{car.price}</p>
              </div>
              <div className="fleet-car-placeholder">
                <span>Car Render</span>
              </div>
              <button className="card-action-arrow">→</button>
            </div>
          ))}
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section className="blog-wrapper">
        <h2 className="section-heading">Blog</h2>
        <div className="blog-columns-grid">
          {[1, 2, 3].map((item) => (
            <div className="blog-item-card" key={item}>
              <div className="blog-img-placeholder">
                <span>Article Thumbnail</span>
              </div>
              <p className="blog-text-preview">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          ))}
        </div>

        <div className="newsletter-strip">
          <h3 className="newsletter-heading">
            Subscribe and get 20% off
            <br />
            your first rental
          </h3>
          <div className="subscribe-box">
            <input
              type="email"
              placeholder="username@gmail.com"
              className="subscribe-input"
            />
            <button className="subscribe-btn">Submit</button>
          </div>
        </div>
      </section>

      {/* --- SITE FOOTER --- */}
      <footer className="site-footer">
        <div className="footer-main-columns">
          <div className="footer-column">
            <div className="footer-column-logo">renc</div>
            <p className="footer-text-content">
              Via Calimala 36
              <br />
              Firenze, FI 50123
              <br />
              Italy
              <br />
              <br />
              +39 055 123456
            </p>
          </div>
          <div className="footer-column">
            <h4 className="footer-column-title">For Renters</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#about" className="footer-link">
                  About Us
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#vehicles" className="footer-link">
                  Our Fleet
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#faq" className="footer-link">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <a href="#blog" className="footer-link">
                  News & Blog
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#privacy" className="footer-link">
                  Privacy policy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#terms" className="footer-link">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-column-title">Contact Us</h4>
            <p className="footer-text-content">
              Monday - Sunday
              <br />
              8:00 AM - 11:00 PM (CET)
            </p>
            <p className="footer-text-content footer-text-margin">
              Hotline:
              <br />
              978-554-3211
            </p>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© 2026 RENC LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
