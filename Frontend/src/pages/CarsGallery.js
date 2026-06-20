import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CarsGallery({ user }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
      
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingForm, setBookingForm] = useState({ startDate: '', endDate: '' });
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars');
      setCars(res.data);
    } catch (err) {
      alert('Error connecting to fleet data channels.');
    }
  };

  const handleBookAction = (car) => {
    if (!user) {
      navigate('/login');
    } else {
      setSelectedCar(car);
    }
  };

  const executeBooking = async (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(bookingForm.startDate);
    const end = new Date(bookingForm.endDate);

    if (start < today) {
      alert("Date validation!");
      return;
    }

    if (end <= start) {
      alert("Select a date after start date!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:5000/api/bookings/book', {
        carId: selectedCar._id,
        startDate: bookingForm.startDate,
        endDate: bookingForm.endDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Booking Successfully Appointed');
      setSelectedCar(null);
      setBookingForm({ startDate: '', endDate: '' }); // Reset form state matrix
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Error executing rental reservation transaction');
    }
  };

  const filteredCars = activeCategory === 'all' 
    ? cars 
    : cars.filter(car => car.category?.lowercase === activeCategory || car.category === activeCategory);

  // Get today's date formatted as YYYY-MM-DD for the HTML min attribute fallback
  const todayString = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-black mb-4 text-neutral-900 uppercase tracking-tight">Our Rental Collection</h1>
      
      <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
        {['all', 'business', 'family', 'adventure', 'wedding'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition ${
              activeCategory === cat
                ? 'bg-neutral-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredCars.map(car => (
          <div key={car._id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
            <div className="h-52 bg-gray-100 flex items-center justify-center relative p-4">
              <img src={`http://localhost:5000${car.image}`} alt="" className="max-h-full object-contain" />
              
              <span className="absolute top-4 left-4 px-2 py-1 bg-neutral-800/80 backdrop-blur-xs text-[10px] text-white font-extrabold uppercase tracking-widest rounded">
                {car.category || 'Standard'}
              </span>

              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {car.status}
              </span>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase font-semibold text-gray-400 tracking-wider mb-1">{car.brand}</p>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">{car.name}</h3>
                <div className="text-sm text-gray-500 space-y-1 mb-4">
                  <p>🎨 Color: {car.color}</p>
                  <p>🔢 Plate: {car.numberPlate}</p>
                  <p className="text-neutral-900 font-bold text-base mt-2">
                    Rs. {car.pricePerHour?.toLocaleString() || '0'} <span className="text-xs font-normal text-gray-500">/ hour</span>
                  </p>
                </div>
              </div>
              <button 
                disabled={car.status === 'appointed'}
                onClick={() => handleBookAction(car)}
                className={`w-full font-bold py-3 px-4 rounded transition tracking-wide uppercase text-sm ${car.status === 'appointed' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}
              >
                {car.status === 'appointed' ? 'Appointed' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
            <h3 className="text-2xl font-black mb-2 text-neutral-900 uppercase tracking-tight">Confirm Reservation</h3>
            <p className="text-sm text-gray-500 mb-6">Securing asset: <span className="font-semibold text-neutral-800">{selectedCar.brand} {selectedCar.name}</span></p>
            <form onSubmit={executeBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Lease Start Date</label>
                <input 
                  type="date" 
                  required 
                  min={todayString}
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  onChange={e => setBookingForm({...bookingForm, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Lease Terminus Date</label>
                <input 
                  type="date" 
                  required 
                  min={bookingForm.startDate || todayString}
                  className="w-full border border-gray-300 rounded p-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  onChange={e => setBookingForm({...bookingForm, endDate: e.target.value})}
                />
              </div>
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setSelectedCar(null)} className="w-1/2 py-3 border border-gray-300 rounded text-sm font-bold uppercase tracking-wider text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="w-1/2 py-3 bg-yellow-400 text-neutral-950 rounded text-sm font-bold uppercase tracking-wider hover:bg-yellow-500 transition shadow-md">Confirm Lease</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}