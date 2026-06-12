import React, { useState } from 'react';
import { carsData } from '../data/cars';
import CarCard from '../components/CarCard';

const carTypes = ["All", "Sedan", "SUV", "Hatchback", "Coupe", "Luxury", "Sports"];
const carBrands = ["All", "Toyota", "Honda", "BMW", "Audi", "Mercedes", "Kia"];

export default function Cars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Advanced simple multi-filter array computations
  const filteredCars = carsData.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || car.type === selectedType;
    const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
    return matchesSearch && matchesType && matchesBrand;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      
      {/* Dynamic Sub-header */}
      <div className="mb-10 text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-light mb-2">Our Complete Premium Fleet</h1>
        <p className="text-sm text-brandTextMuted">Select your luxury or sporting companion matching your travel requirements through Italy.</p>
      </div>

      {/* Input controls block strip */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">
        
        {/* String Keyword Search Text Box Input */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-brandTextMuted uppercase mb-1">Search Fleet Name</label>
          <input 
            type="text"
            placeholder="Type exotic car name e.g. Bentley..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:border-brandDark"
          />
        </div>

        {/* Dropdown 1: Classification Type Selector Form Element */}
        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-brandTextMuted uppercase mb-1">Car Category</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-brandDark"
          >
            {carTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Dropdown 2: Brand/Manufacturer Selector Form Element */}
        <div className="w-full md:w-48">
          <label className="block text-xs font-bold text-brandTextMuted uppercase mb-1">Brand Manufacturer</label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-brandDark"
          >
            {carBrands.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary Display Logic Container Box rendering */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl">
          <p className="text-brandTextMuted text-sm">No vehicles matched your criteria filters. Try resetting search parameters.</p>
        </div>
      )}
    </div>
  );
}