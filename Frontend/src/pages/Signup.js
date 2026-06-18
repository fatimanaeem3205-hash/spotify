import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Signup({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/cars');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failure');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 p-10 rounded-xl shadow-sm max-w-md w-full">
        <h2 className="text-3xl font-black mb-2 text-neutral-900 uppercase tracking-tight text-center">Registration</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Establish a secure account for direct vehicle dispatch.</p>
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
            <input type="text" required className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Email Address</label>
            <input type="email" required className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Password</label>
            <input type="password" required className="w-full border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-neutral-900 text-white font-bold py-3 px-4 rounded text-sm uppercase tracking-wider hover:bg-neutral-800 transition">SignUp</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Already registered? <Link to="/login" className="text-neutral-900 font-bold underline hover:text-gray-700">Login here</Link></p>
      </div>
    </div>
  );
}