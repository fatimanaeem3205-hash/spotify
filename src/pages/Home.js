import React, { useState } from 'react';
import Hero from '../components/Hero';
import BrandSection from '../components/BrandSection';
import CarCard from '../components/CarCard';
import { carsData } from '../data/cars';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Filter functionality passed down to component blocks
  const featuredCars = carsData.filter(car => selectedBrand === "All" || car.brand === selectedBrand).slice(0, 3);

  return (
    <div>
      <Hero />
      
      {/* Interactive Quick Booking Search Strip Bar overlay mimicking mockup layout */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="p-2 border-r border-gray-100">
            <label className="block text-xs font-bold text-brandTextMuted uppercase">Pick-Up Address</label>
            <span className="text-sm text-brandDark font-medium">Rome Airport (FCO), Italy</span>
          </div>
          <div className="p-2 border-r border-gray-100">
            <label className="block text-xs font-bold text-brandTextMuted uppercase">Drop-Off Address</label>
            <span className="text-sm text-brandDark font-medium">Same Location</span>
          </div>
          <div className="p-2 border-r border-gray-100">
            <label className="block text-xs font-bold text-brandTextMuted uppercase">Pick-Up Date</label>
            <span className="text-sm text-brandDark font-medium">Anytime Available</span>
          </div>
          <button onClick={() => navigate('/cars')} className="bg-brandPeach text-brandDark font-bold py-3 px-6 rounded-xl text-center hover:opacity-90 transition">
            Book Fleet Now
          </button>
        </div>
      </div>

      {/* Dynamic Brands Ribbon */}
      <div className="mt-12">
        <BrandSection activeBrand={selectedBrand} setActiveBrand={setSelectedBrand} />
      </div>

      {/* About Us Split Grid Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs uppercase font-bold text-brandTextMuted tracking-widest">Premium Heritage</span>
          <h2 className="text-3xl md:text-4xl font-light text-brandDark">About Us</h2>
          <p className="text-brandTextMuted text-sm leading-relaxed">
            Renc offers elite transportation solutions across beautiful historic European paths. For over 10 years, we have brought our clients unmatched comfort coupled with reliable modern mechanics.
          </p>
          <p className="text-brandTextMuted text-sm leading-relaxed">
            Our white-glove bespoke vehicle deliveries ensure your exotic supercar arrives tuned, polished, and ready at your hotel doorstep.
          </p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-zinc-800 rounded-3xl overflow-hidden h-64 shadow-md">
            <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80" alt="Exotic Fleet" className="w-full h-full object-cover" />
          </div>
          <div className="bg-brandDark text-white rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg">
            <h3 className="text-4xl font-serif text-brandPeach font-bold">+10</h3>
            <p className="text-xs tracking-widest uppercase font-medium text-brandTextMuted mt-1">Years Performance Experience</p>
          </div>
        </div>
      </section>

      {/* Split Hero Promo Banner Section ("Best Offer") */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch bg-brandOlive text-white">
        <div className="p-12 md:p-24 flex flex-col justify-center space-y-6">
          <span className="text-brandPeach font-serif uppercase tracking-widest text-xs font-semibold">Special Premium Highlight</span>
          <h2 className="text-3xl md:text-4xl font-light">Bentley Flying Spur</h2>
          <p className="text-xl font-serif italic text-brandPeach">$400 <span className="text-xs text-white font-sans tracking-normal">/ day special rate</span></p>
          <button onClick={() => navigate('/car/2')} className="border-b-2 border-brandPeach text-brandPeach self-start pb-1 font-semibold hover:text-white hover:border-white transition">
            Claim This Offer →
          </button>
        </div>
        <div className="bg-center bg-cover min-h-[350px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80')` }}></div>
      </section>

      {/* Dynamically Populated Fleet Vehicles Content Section Grid Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brandTextMuted">Curated Experience</span>
            <h2 className="text-3xl font-light text-brandDark mt-1">Featured Vehicles</h2>
          </div>
          <button onClick={() => navigate('/cars')} className="text-sm font-semibold border-b border-brandDark pb-0.5 hover:text-brandTextMuted hover:border-brandTextMuted transition">
            View All Catalog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}