import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-brandDark text-white sticky top-0 z-50 px-6 py-4 md:px-12 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-2xl font-bold tracking-widest text-brandLight flex items-center gap-1">
          renc<span className="text-brandPeach text-xs">●</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm tracking-wide font-medium">
          <Link to="/" className="hover:text-brandPeach transition">Home</Link>
          <Link to="/cars" className="hover:text-brandPeach transition">Vehicles</Link>
          <Link to="/about" className="hover:text-brandPeach transition">About Us</Link>
          <Link to="/contact" className="hover:text-brandPeach transition">Contact</Link>
        </div>

        {/* Accent Profile CTA Block */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <span className="cursor-pointer border border-gray-700 rounded-full px-3 py-1 flex items-center gap-1">
            🇬🇧 EN
          </span>
          <Link to="/cars" className="bg-brandPeach text-brandDark font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">
            Rent Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center border-t border-gray-800 pt-4 pb-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-brandPeach">Home</Link>
          <Link to="/cars" onClick={() => setIsOpen(false)} className="hover:text-brandPeach">Vehicles</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-brandPeach">About Us</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-brandPeach">Contact</Link>
        </div>
      )}
    </nav>
  );
}