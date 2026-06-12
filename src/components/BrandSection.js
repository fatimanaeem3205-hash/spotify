import React from 'react';

const brandsList = ["Toyota", "Honda", "BMW", "Audi", "Mercedes", "Kia"];

export default function BrandSection({ activeBrand, setActiveBrand }) {
  return (
    <div className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-xs font-semibold text-center uppercase tracking-widest text-brandTextMuted mb-6">
          Filter curated premium fleets by manufacturer
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          <button
            onClick={() => setActiveBrand("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeBrand === "All" ? "bg-brandDark text-white" : "bg-gray-50 text-brandTextMuted hover:bg-gray-100"}`}
          >
            All Brands
          </button>
          {brandsList.map((brand, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBrand(brand)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeBrand === brand ? "bg-brandDark text-white" : "bg-gray-50 text-brandTextMuted hover:bg-gray-100"}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}