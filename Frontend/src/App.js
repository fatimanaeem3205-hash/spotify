import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import CarsGallery from './pages/CarsGallery';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
        
        <nav className="bg-neutral-900 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-black tracking-wider flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>CARENT
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 font-medium">
              <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
              <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
              <Link to="/cars" className="hover:text-yellow-400 transition">Cars</Link>
              <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
              
              {user ? (
                <div className="flex items-center space-x-4 border-l border-neutral-700 pl-6">
                  <Link 
                    to={user.role === 'admin' ? '/admin-portal' : '/dashboard'} 
                    className="bg-yellow-400 text-neutral-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                  >
                    My Account ({user.name})
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-yellow-400 text-neutral-900 px-5 py-2.5 rounded font-semibold hover:bg-yellow-500 transition">
                  Sign In
                </Link>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                type="button"
                className="text-gray-400 hover:text-white focus:outline-none p-2"
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className={`md:hidden bg-neutral-950 border-t border-neutral-800 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 py-4 flex flex-col space-y-4 font-medium text-sm">
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 py-1 transition">Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 py-1 transition">About</Link>
              <Link to="/cars" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 py-1 transition">Cars</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-400 py-1 transition">Contact</Link>
              
              <div className="pt-2 border-t border-neutral-800 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link 
                      to={user.role === 'admin' ? '/admin-portal' : '/dashboard'} 
                      onClick={() => setIsOpen(false)}
                      className="bg-yellow-400 text-neutral-900 text-center px-4 py-2.5 rounded font-semibold hover:bg-yellow-500 transition block w-full"
                    >
                      My Account ({user.name})
                    </Link>
                    <button 
                      onClick={() => { handleLogout(); setIsOpen(false); }} 
                      className="text-left text-gray-400 hover:text-white py-1 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                    className="bg-yellow-400 text-neutral-900 text-center px-5 py-2.5 rounded font-semibold hover:bg-yellow-500 transition block w-full"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cars" element={<CarsGallery user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            
            <Route path="/dashboard" element={user && user.role === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin-portal/*" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-4">
              <Link to="/" className="text-2xl font-black tracking-wider text-white">
                <span className="text-yellow-400">⚡</span>CARENT
              </Link>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                Experience complete transit versatility with high-grade, premium utility vehicles tuned directly to your custom regional requirements.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#facebook" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-xs hover:bg-yellow-400 hover:text-neutral-950 transition-colors duration-200">FB</a>
                <a href="#instagram" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-xs hover:bg-yellow-400 hover:text-neutral-950 transition-colors duration-200">IG</a>
                <a href="#twitter" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-xs hover:bg-yellow-400 hover:text-neutral-950 transition-colors duration-200">X</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-4">Our Fleet</h4>
              <ul className="space-y-2 text-base font-medium text-neutral-300">
                <li><Link to="/cars" className="hover:text-yellow-400 transition">Business Elite</Link></li>
                <li><Link to="/cars" className="hover:text-yellow-400 transition">Family Cross</Link></li>
                <li><Link to="/cars" className="hover:text-yellow-400 transition">Adventure Terrain</Link></li>
                <li><Link to="/cars" className="hover:text-yellow-400 transition">Wedding Luxury</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-4">Company</h4>
              <ul className="space-y-2 text-base font-medium text-neutral-300">
                <li><Link to="/about" className="hover:text-yellow-400 transition">Our Story</Link></li>
                <li><Link to="/cars" className="hover:text-yellow-400 transition">Browse Fleet</Link></li>
                <li><Link to="/login" className="hover:text-yellow-400 transition">Client Gateway</Link></li>
                <li><a href="#fleet-gallery" className="hover:text-yellow-400 transition">Reserve System</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-400 mb-4">Support Base</h4>
              <ul className="space-y-4 text-base font-medium text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">📞</span> 
                  <div>
                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Helpline</p>
                    <p className="text-white mt-0.5 font-mono text-sm">+92 (0) 42 111-3748-31</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">📍</span>
                  <div>
                    <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Central Hub</p>
                    <p className="text-neutral-400 mt-0.5 text-sm">Gulberg III, Lahore, Pakistan</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-neutral-500">
            <p>© {currentYear} CARENT Network. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#privacy" className="hover:text-neutral-300 transition">Privacy Charter</a>
              <a href="#terms" className="hover:text-neutral-300 transition">Lease Parameters</a>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;