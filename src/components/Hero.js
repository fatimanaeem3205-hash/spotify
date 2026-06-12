import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-brandOlive text-white overflow-hidden min-h-[640px] flex items-center px-6 md:px-12 py-12">
      {/* Visual Background Accent Graphic matching the reference mockup asset placement */}
      <div className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80')` }}></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Text Area */}
        <div className="lg:col-span-5 space-y-6">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
            Luxury car <br />
            <span className="font-serif italic text-brandPeach">rental in Italy</span>
          </h1>
          <p className="text-brandTextMuted text-sm md:text-base max-w-sm leading-relaxed">
            Premium cars engineered for selective drivers. Renting bespoke exotic experiences across all classic European paths.
          </p>
          <button 
            onClick={() => navigate('/cars')}
            className="bg-brandPeach text-brandDark font-semibold px-6 py-3 rounded hover:bg-opacity-90 transition inline-flex items-center gap-2 shadow-lg"
          >
            Rent Now <span>→</span>
          </button>
        </div>

        {/* Featured Vehicle Image Hero Side-Card */}
        <div className="lg:col-span-7 relative flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1676311894412-25d204277bbf?auto=format&fit=crop&w=1000&q=80" 
            alt="Hero Car" 
            className="w-full max-w-2xl object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.6)]"
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-60 backdrop-blur-md border border-gray-800 p-4 rounded-xl text-right">
            <p className="text-xs text-brandTextMuted tracking-wider">Rolls-Royce Spectre</p>
            <p className="text-lg font-bold text-brandPeach">$1500<span className="text-xs text-white">/day</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}