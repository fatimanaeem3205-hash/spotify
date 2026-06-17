import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { carsData } from '../data/cars';

export default function CarDetails() {
  const { id } = useParams();
  
  // Find match via path parameter keys parsed as primitive values
  const car = carsData.find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-xl mb-4">Specified Vehicle Profile Record Not Found</h2>
        <Link to="/cars" className="bg-brandDark text-white px-5 py-2 rounded-xl text-sm">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <Link to="/cars" className="inline-flex items-center gap-2 text-sm font-medium text-brandTextMuted hover:text-brandDark mb-8 transition">
        ← Return back to catalog fleet listing
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 md:p-12 border border-gray-100 rounded-3xl shadow-sm">
        
        {/* Frame Section 1 Image Media Showcase Display */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden bg-gray-50 p-4 border border-gray-100 flex items-center justify-center">
            <img src={car.image} alt={car.name} className="w-full object-contain max-h-[400px] rounded-xl" />
          </div>
        </div>

        {/* Frame Section 2 Technical Layout Properties & Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs uppercase tracking-widest font-bold text-brandTextMuted">{car.brand} • {car.type}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${car.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                {car.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-brandDark mt-1">{car.name}</h1>
          </div>

          <p className="text-brandTextMuted text-sm leading-relaxed">{car.description}</p>

          {/* Structured Key Specs Component Block Matrix Grid Layout */}
          <div className="grid grid-cols-3 gap-3 border-y border-gray-100 py-4 text-center">
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-xs text-brandTextMuted font-semibold uppercase">Seats</p>
              <p className="text-sm font-bold text-brandDark mt-0.5">{car.seats} Adult Pax</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-xs text-brandTextMuted font-semibold uppercase">Fuel Profile</p>
              <p className="text-sm font-bold text-brandDark mt-0.5">{car.fuelType}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl">
              <p className="text-xs text-brandTextMuted font-semibold uppercase">Transmission</p>
              <p className="text-sm font-bold text-brandDark mt-0.5">{car.transmission}</p>
            </div>
          </div>

          {/* Booking Summary Checkout CTA Trigger Card Block */}
          <div className="bg-gray-50 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs text-brandTextMuted uppercase font-semibold">Total Day Cost Rate</p>
              <p className="text-2xl font-bold font-serif italic text-brandDark">${car.pricePerDay} <span className="text-xs font-sans not-italic text-brandTextMuted font-normal">/ day rate</span></p>
            </div>
            <button 
              onClick={() => alert(`Your booking request for the ${car.name} has been processed successfully!`)}
              disabled={car.status !== 'Available'}
              className={`px-6 py-3 rounded-xl font-bold text-sm shadow transition ${car.status === 'Available' ? 'bg-brandPeach text-brandDark hover:bg-opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {car.status === 'Available' ? "Rent Now →" : "Fully Rented"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}