import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-brandTextMuted uppercase tracking-widest">Italian Elegance Redefined</span>
        <h1 className="text-4xl font-light text-brandDark">Our Professional History</h1>
      </div>
      <p className="text-brandTextMuted leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
        Founded inside the scenic valleys of Bolzano in 2016, Renc has grown into Italy's premier luxury car hire alternative. We offer seamless transit logistics tailored around elite, performance-tuned mechanical assets.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="bg-brandOlive text-white p-8 rounded-2xl text-left space-y-2">
          <h3 className="font-bold text-lg text-brandPeach">Our Structural Mission</h3>
          <p className="text-xs leading-relaxed text-zinc-300">Delivering exceptional grand touring encounters without procedural paperwork, delays, or premium booking friction constraints.</p>
        </div>
        <div className="bg-white border border-gray-100 text-left p-8 rounded-2xl space-y-2">
          <h3 className="font-bold text-lg text-brandDark">Our Quality Promise</h3>
          <p className="text-xs leading-relaxed text-brandTextMuted">Every asset in our high-tier collection passes specialized diagnostics profiles prior to arrival key handovers.</p>
        </div>
      </div>
    </div>
  );
}