import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.jpg';
import homeimg from '../assets/home2.jpg';
import img3 from '../assets/home3.jpg';
import axios from 'axios';

export default function Home({ user }) {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingForm, setBookingForm] = useState({ startDate: '', endDate: '' });
  const [activeCategory, setActiveCategory] = useState("All");

  const fallbackCars = [
    { _id: 'mock1', brand: 'Toyota', name: 'Supra MK5', color: 'Matte Black', numberPlate: 'S-777', status: 'available', pricePerDay: 65000, image: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d822?auto=format&fit=crop&w=500&q=80', category: 'Business' },
    { _id: 'mock2', brand: 'Audi', name: 'RS6 Avant', color: 'Nardo Grey', numberPlate: 'A-990', status: 'available', pricePerDay: 55000, image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=500&q=80', category: 'Family' },
    { _id: 'mock3', brand: 'Land Rover', name: 'Defender 110', color: 'Sand Dune', numberPlate: 'D-110', status: 'available', pricePerDay: 48000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80', category: 'Adventure' },
    { _id: 'mock4', brand: 'Mercedes', name: 'S-Class Maybach', color: 'Obsidian Black', numberPlate: 'M-100', status: 'appointed', pricePerDay: 75000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80', category: 'Wedding' }
  ];

  useEffect(() => {
    fetchLiveFleet();
  }, []);

  const fetchLiveFleet = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/cars');
      if (res.data && res.data.length > 0) {
        setCars(res.data);
      } else {
        setCars(fallbackCars);
      }
    } catch (err) {
      console.warn("Backend dynamic data stream unreachable. Initializing local PKR fallback grid.");
      setCars(fallbackCars);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
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
    if (selectedCar._id.startsWith('mock')) {
      alert(`Simulation Mode: Successfully reserved ${selectedCar.brand} ${selectedCar.name} at ₨ ${selectedCar.pricePerDay.toLocaleString()}/day!`);
      setSelectedCar(null);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/bookings/book', {
        carId: selectedCar._id,
        startDate: bookingForm.startDate,
        endDate: bookingForm.endDate
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert('Booking Successfully Appointed!');
      setSelectedCar(null);
      fetchLiveFleet();
    } catch (err) {
      alert(err.response?.data?.message || 'Error executing booking transaction');
    }
  };

  const categories = ["All", "Business", "Family", "Adventure", "Wedding"];

  const filteredCars = activeCategory === "All" 
    ? cars 
    : cars.filter(car => car.category === activeCategory || car.brand === activeCategory);

  return (
    <div className="bg-white text-neutral-900 overflow-x-hidden antialiased font-sans">
      
      {/* 1. HERO HEADER BANNER BLOCK */}
      <section className="relative bg-neutral-950 h-[700px] flex items-center text-white">
        <div className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-45 transform scale-105 animate-[pulse_8s_infinite_alternate]" 
             style={{ backgroundImage: `url(${bgImage})` }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-none max-w-3xl">
            Quick and affordable <br/><span className="text-yellow-400 relative inline-block">car rentals</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-300 mb-8 max-w-xl font-medium leading-relaxed">
            Experience complete deployment versatility with premium vehicles tuned directly to your custom city transit requirements.
          </p>
          <a href="#fleet-gallery" className="inline-flex items-center gap-3 bg-yellow-400 text-neutral-950 font-medium px-8 py-4 rounded shadow-lg text-sm transition-all duration-200 group">
            Explore Collection 
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </a>
        </div>
      </section>

      {/* 2. DYNAMIC INTERACTIVE VALUE TILES */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-b border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
            Enjoy flexibility and unbeatable rates with our city car rentals
          </h2>
          <div className="h-1 w-16 bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "🚗", title: "No hidden charges", desc: "Our prices include taxes and insurance. No surprise checkout variables." },
            { icon: "📆", title: "Long term leasing", desc: "Flexible month-to-month extensions and high-tier corporate accounts." },
            { icon: "🛡️", title: "Free cancellation", desc: "Change of plans? Adjust reservations up to 24 hours prior with no penalties." },
            { icon: "📞", title: "24/7 Support", desc: "Our localized network response teams keep you rolling securely anytime." }
          ].map((f, idx) => (
            <div key={idx} className="bg-neutral-50 p-6 rounded-xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center group">
              <div className="text-4xl mb-4 p-3 bg-white group-hover:bg-yellow-100 rounded-full inline-block transition-colors duration-300 shadow-sm">{f.icon}</div>
              <h3 className="font-bold text-base mb-2 text-neutral-900">{f.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE INTERACTIVE RENTAL CAR COLLECTION ENGINE */}
      <section id="fleet-gallery" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">Our rental car collection</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">High-performance configurations prepared for immediate key handoff.</p>
          </div>
          
          {/* Live Tab Filters */}
          <div className="flex flex-wrap gap-2 bg-neutral-100 p-1.5 rounded-lg border">
            {categories.map((cat) => (
              <button
                key={cat}
                disabled={loading}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-neutral-900 text-white shadow-md' : 'text-neutral-600 hover:text-neutral-900'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xl flex flex-col animate-pulse transform -translate-y-1">
                <div className="h-48 bg-neutral-100 relative overflow-hidden flex items-center justify-center">
                  <div className="w-32 h-20 bg-neutral-200/70 rounded-md"></div>
                </div>
                <div className="p-5 border-t border-gray-100 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-12 h-2.5 bg-neutral-200 rounded mb-2"></div>
                    <div className="w-3/4 h-5 bg-neutral-200 rounded mb-3"></div>
                  </div>
                  <div className="pt-3 border-t border-dashed flex items-center justify-between">
                    <div className="w-20 h-5 bg-neutral-200 rounded"></div>
                    <div className="w-24 h-9 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCars.map(car => (
              <div key={car._id} className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl flex flex-col transform -translate-y-1 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                <div className="h-48 bg-gray-50 p-4 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={car.image.startsWith('http') ? car.image : `http://localhost:5000${car.image}`} 
                    alt={car.name} 
                    className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" 
                  />
                  <span className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium ${car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {car.status}
                  </span>
                </div>
                <div className="p-5 border-t border-gray-100 flex-grow flex flex-col justify-between">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-400 mb-0.5">{car.brand}</p>
                    <h3 className="font-bold text-base text-neutral-900 group-hover:text-yellow-600 transition-colors duration-200">{car.name}</h3>
                    <div className="flex gap-4 mt-2 text-xs font-medium text-gray-400">
                      <span>🎨 {car.color}</span>
                      <span className="font-mono">🔢 {car.numberPlate}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-dashed flex items-center justify-between gap-4">
                    <div>
                      <span className="text-base font-bold text-neutral-900">₨ {Number(car.pricePerDay || 45000).toLocaleString()}</span>
                      <span className="text-xs text-gray-400 block font-medium">/ Day</span>
                    </div>
                    <button 
                      disabled={car.status === 'appointed'}
                      onClick={() => handleBookAction(car)}
                      className={`px-4 py-2.5 rounded font-medium text-xs transition-all duration-200 ${car.status === 'appointed' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95'}`}
                    >
                      {car.status === 'appointed' ? 'Appointed' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. SPLIT PROCESS LAYER WITH REFRESHED BACKGROUND GRAPHIC */}
      <section className="bg-neutral-900 text-white grid grid-cols-1 md:grid-cols-2 overflow-hidden min-h-[500px]">
        <div className="relative bg-cover bg-center min-h-[350px] md:min-h-full group" 
             style={{ backgroundImage: `url(${homeimg})` }}>
          <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>
        {/* Changed background style to display image_299a66.jpg cleanly using an elegant gradient mask layer */}
        <div className="relative p-12 md:p-20 flex flex-col justify-center bg-cover bg-center text-white"
             style={{ backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.92), rgba(10, 10, 10, 0.95)), url('image_299a66.jpg')` }}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Rent your car in 3 easy steps</h2>
          <div className="space-y-8 relative before:absolute before:top-4 before:left-4 before:bottom-4 before:w-0.5 before:bg-neutral-800">
            {[
              { step: "1", title: "Choose your car", desc: "Examine our tailored workspace configurations to pick precise mechanical components." },
              { step: "2", title: "Book online", desc: "Confirm verification parameters and lock down secure digital routing transactions instantly." },
              { step: "3", title: "Pickup & drive", desc: "Present authentication access tokens to bypass reception lines on location." }
            ].map((s, idx) => (
              <div key={idx} className="flex gap-5 relative z-10 group">
                <div className="w-8 h-8 rounded-full bg-neutral-800 text-gray-400 font-medium flex items-center justify-center shrink-0 text-sm group-hover:bg-yellow-400 group-hover:text-neutral-950 transition-colors duration-300 shadow-md">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-bold text-base text-white mb-1 group-hover:text-yellow-400 transition-colors duration-200">{s.title}</h4>
                  <p className="text-sm font-medium text-gray-400 leading-relaxed max-w-md">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DRIVING EXCELLENCE PANEL */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center bg-white">
        <div className="p-12 md:p-24 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Driving excellence in car rental services
          </h2>
          <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10">
            We operate optimized service lifecycles across diverse mechanical profiles. Our validation protocols guarantee security and continuous deployment verification.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 bg-neutral-900 text-white font-medium text-xs px-6 py-4 rounded hover:bg-neutral-800 active:scale-95 transition-all">
            Our company story →
          </Link>
          
          <div className="grid grid-cols-2 gap-8 mt-16 border-t border-gray-100 pt-8">
            <div>
              <p className="text-3xl font-bold text-neutral-900">5K+</p>
              <p className="text-xs font-medium text-gray-400 mt-1">Verified Fleet Runs Complete</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-neutral-900">99%</p>
              <p className="text-xs font-medium text-gray-400 mt-1">Performance Approval Metric</p>
            </div>
          </div>
        </div>
        <div className="h-[450px] md:h-full min-h-[500px] relative bg-cover bg-center overflow-hidden group">
          <img 
            src={img3} 
            alt="Driving Excellence Layout Car" 
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        </div>
      </section>

      {/* 6. POPUP MODAL ARCHITECTURE FOR DATEPICKER SYSTEM */}
      {selectedCar && (
        <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-100 transform scale-100 animate-[slideUp_0.3s_ease-out]">
            <h3 className="text-xl font-bold mb-1 text-neutral-900">Confirm Booking Sequence</h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">Securing vehicle variant: <span className="text-neutral-900 font-bold">{selectedCar.brand} {selectedCar.name}</span></p>
            
            <form onSubmit={executeBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lease Initiation Window</label>
                <input 
                  type="date" required 
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all"
                  onChange={e => setBookingForm({...bookingForm, startDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Lease Terminus Window</label>
                <input 
                  type="date" required 
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all"
                  onChange={e => setBookingForm({...bookingForm, endDate: e.target.value})}
                />
              </div>
              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setSelectedCar(null)} className="w-1/2 py-3 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-neutral-900 transition-colors">Cancel Matrix</button>
                <button type="submit" className="w-1/2 py-3 bg-yellow-400 text-neutral-950 rounded-md text-xs font-medium hover:bg-yellow-500 shadow-md active:scale-95 transition-all">Authorize Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}