import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      alert('Error connecting to active profile data lines.');
    }
  };

  const handleCancelBooking = async (carId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        const token = localStorage.getItem('token');
        console.log("Attempting cancellation for Car ID:", carId);

        const response = await axios.post('http://localhost:5000/api/bookings/cancel', 
          { carId: carId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        alert(response.data.message || 'Reservation Cancelled Successfully');
        
        setProfile(prevProfile => {
          if (!prevProfile) return null;
          return {
            ...prevProfile,
            bookedCars: prevProfile.bookedCars.filter(car => (car._id || car) !== carId)
          };
        });

        fetchProfile();
      } catch (err) {
        const errorReason = err.response?.data?.message || err.response?.data?.error || err.message;
        alert(`Cancellation Failed: ${errorReason}`);
        console.error("Full Context Debug logs:", err.response);
      }
    }
  };

  const activeBookings = profile?.bookedCars?.filter(car => car.status === 'appointed') || [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="mb-8 border-b pb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-1">Customer Workspace</p>
        <h1 className="text-4xl font-black text-neutral-900 uppercase tracking-tight">Welcome back, {profile?.name || 'Client'}</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your active reservations and transit deployments below.</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-gray-50/50">
          <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Your Current Lease Registrations</h2>
        </div>

        <div className="p-6">
          {activeBookings.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-medium">
              You do not have any active vehicle leases right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBookings.map((car) => (
                <div key={car._id} className="border rounded-xl overflow-hidden bg-white shadow-xs hover:shadow-sm transition flex flex-col justify-between">
                  
                  <div className="h-40 bg-gray-100 flex items-center justify-center relative p-4 border-b">
                    <img src={`http://localhost:5000${car.image}`} alt="" className="max-h-full object-contain" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-neutral-800/80 backdrop-blur-xs text-[9px] text-white font-extrabold uppercase tracking-widest rounded">
                      {car.category || 'Standard'}
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{car.brand} {car.name}</h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">🎨 Color: {car.color} | 🔢 Plate: {car.numberPlate}</p>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Lease Value</p>
                        <p className="text-xl font-black text-neutral-900 mt-0.5">
                          Rs. {Number(car.pricePerHour || 0).toLocaleString()} <span className="text-xs font-normal text-gray-500">/ hour</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancelBooking(car._id)}
                      className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded text-xs uppercase tracking-wider transition duration-150"
                    >
                      Cancel Lease
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}