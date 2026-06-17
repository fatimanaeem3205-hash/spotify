// components/Blog.jsx
import React from "react";

export default function Blog() {
  return (
    <section className="blog-section">
      <h2>Blog</h2>
      <div className="blog-grid">
        <div className="blog-card">
          <img src="path-to-blog1.png" alt="Blog post" />
          <p>Lorem ipsum is simply dummy text of the printing...</p>
        </div>
        <div className="blog-card">
          <img src="path-to-blog2.png" alt="Blog post" />
          <p>Lorem ipsum is simply dummy text of the printing...</p>
        </div>
        <div className="blog-card">
          <img src="path-to-man.png" alt="Reviewer" />
          <p>Lorem ipsum is simply dummy text of the printing...</p>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter-box">
        <h3>Subscribe and get 20% off your first rental</h3>
        <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="username@gmail.com" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
}
