import React from 'react';

export default function Contact() {

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black tracking-tight mb-4">Contact Us!</h1>
        <p className="text-gray-600 text-lg">Our central operations floor manages routing queries dynamically.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 border border-gray-200 rounded-xl shadow-sm">
        <div>
          <h3 className="text-xs uppercase tracking-widest font-bold text-yellow-600 mb-2">Corporate Headquarters</h3>
          <p className="text-xl font-bold text-neutral-900 mb-4">Carent HQ Estica Corp.</p>
          <p className="text-gray-600 leading-relaxed">Gulber III, Lahore, Pakistan</p>
        </div>
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-12">
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Support Channels</h4>
            <p className="text-gray-600">support@carent.com</p>
            <p className="text-gray-600">(+92) 125 888 666</p>
          </div>
        </div>
      </div>
    </div>
  );
}