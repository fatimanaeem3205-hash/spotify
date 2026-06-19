import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin-portal' : '/cars');
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication rejected');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 p-10 rounded-xl shadow-sm max-w-md w-full">
        <h2 className="text-3xl font-black mb-2 text-neutral-900 uppercase tracking-tight text-center">Login</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Access your personalized car leasing configuration dashboard.</p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none" 
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Password</label>
            
            <div className="relative flex items-center">
              <input 
                type={showPassword ? 'text' : 'password'}
                required 
                className="w-full border border-gray-300 rounded p-3 pr-16 text-sm focus:outline-none" 
                onChange={e => setForm({...form, password: e.target.value})} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-xs font-extrabold uppercase tracking-wider text-gray-400 hover:text-neutral-900 select-none transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-neutral-900 text-white font-bold py-3 px-4 rounded text-sm uppercase tracking-wider hover:bg-neutral-800 transition">Login</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">New to the platform? <Link to="/signup" className="text-neutral-900 font-bold underline hover:text-gray-700">Create account</Link></p>
      </div>
    </div>
  );
}