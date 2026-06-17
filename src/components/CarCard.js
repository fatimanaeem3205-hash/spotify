import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CarCard({ car }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
      <div>
        {/* Metadata Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brandTextMuted">{car.type}</span>
            <h3 className="text-lg font-bold text-brandDark mt-0.5">{car.name}</h3>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${car.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
            {car.status}
          </span>
        </div>

        {/* Costing */}
        <p className="text-base font-bold text-brandDark">
          <span className="text-xl text-brandDark font-serif italic">${car.pricePerDay}</span>
          <span className="text-xs text-brandTextMuted font-normal"> / day</span>
        </p>

        {/* Vehicle Render Profile */}
        <div className="my-6 h-40 flex items-center justify-center overflow-hidden rounded-lg">
          <img src={car.image} alt={car.name} className="object-cover w-full h-full hover:scale-105 transition duration-300" />
        </div>
      </div>

      {/* Primary Link Button Action */}
      <button 
        onClick={() => navigate(`/car/${car.id}`)}
        className="w-full border border-brandDark text-brandDark hover:bg-brandDark hover:text-white font-medium text-sm py-2.5 rounded-xl transition flex items-center justify-center gap-2"
      >
        View Details <span>→</span>
      </button>
    </div>
  );
}