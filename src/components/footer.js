// components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div className="footer-brand">
          <h2>renc</h2>
          <p>
            Via Dell'orivolo 36
            <br />
            Florence, Italy 50122
          </p>
          <p>323 1243555</p>
        </div>
        <div className="footer-links">
          <h4>For Renters</h4>
          <ul>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#vehicles">Our Fleet</a>
            </li>
            <li>
              <a href="#faq">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li>
              <a href="#blog">News & Blog</a>
            </li>
            <li>
              <a href="#privacy">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Contact Us</h4>
          <p>
            Monday - Sunday
            <br />
            8:00 AM - 11:00 PM (CET)
          </p>
          <p>Hotline: 978-554-3211</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 RENC LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
