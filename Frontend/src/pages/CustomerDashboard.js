import React from 'react';

export default function CustomerDashboard() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="bg-white border p-10 rounded-xl shadow-sm">
        <h1 className="text-3xl font-black text-neutral-900 uppercase tracking-tight mb-2">Customer Hub</h1>
        <p className="text-gray-500 text-sm mb-6">Welcome to your workspace dashboard.</p>
        <div className="border-t pt-6 bg-gray-50 p-6 rounded-lg border border-dashed text-center">
          <p className="text-gray-600 font-medium">To view active physical contracts or log returns, coordinate directly with site check-in marshals.</p>
        </div>
      </div>
    </div>
  );
}