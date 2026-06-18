import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR COMPONENT */}
      <aside className="w-64 bg-neutral-900 text-gray-300 flex flex-col border-r border-neutral-800">
        <div className="p-6 border-b border-neutral-800">
          <p className="text-xs font-bold uppercase tracking-widest text-yellow-400">Control Plane</p>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Admin Portal</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2 font-medium">
          <Link to="" className="block px-4 py-3 rounded text-sm hover:bg-neutral-800 hover:text-white transition">📊 Overview</Link>
          <Link to="manage-cars" className="block px-4 py-3 rounded text-sm hover:bg-neutral-800 hover:text-white transition">🚗 Manage Fleet</Link>
          <Link to="customers" className="block px-4 py-3 rounded text-sm hover:bg-neutral-800 hover:text-white transition">👥 Customers Directory</Link>
        </nav>
      </aside>

      {/* DASHBOARD ROUTING INTERNALS */}
      <main className="flex-grow p-10">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="customers" element={<CustomersDirectory />} />
        </Routes>
      </main>
    </div>
  );
}

function AdminOverview() {
  return (
    <div>
      <h1 className="text-3xl font-black text-neutral-900 uppercase tracking-tight mb-6">System Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h4 className="text-sm font-bold uppercase text-gray-400 mb-2">Platform Traffic</h4><p className="text-3xl font-black text-neutral-900">Active</p></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h4 className="text-sm font-bold uppercase text-gray-400 mb-2">Payment Channels</h4><p className="text-3xl font-black text-neutral-900">Operational</p></div>
        <div className="bg-white p-6 rounded-xl border shadow-sm"><h4 className="text-sm font-bold uppercase text-gray-400 mb-2">Fleet Integrity</h4><p className="text-3xl font-black text-neutral-900">Verified</p></div>
      </div>
    </div>
  );
}

function ManageCars() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ brand: '', name: '', color: '', numberPlate: '', image: null });

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars');
      setCars(res.data);
    } catch (err) {
      alert('Error fetching car configurations from database logs.');
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    try {
      await axios.post('http://localhost:5000/api/cars', formData, { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        } 
      });
      alert('Car Asset Deployed Successfully');
      fetchCars();
    } catch (err) {
      alert('Configuration payload upload failed.');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const nextStatus = currentStatus === 'available' ? 'appointed' : 'available';
    try {
      await axios.put(`http://localhost:5000/api/cars/${id}`, { status: nextStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCars();
    } catch (err) {
      alert('Failed to modify status matrix configuration');
    }
  };

  const deleteCar = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Confirm fleet asset termination sequence?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchCars();
      } catch (err) {
        alert('Could not delete resource');
      }
    }
  };

  return (
    <div className="space-y-12">
      {/* FORM INTERFACE */}
      <div className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-neutral-900">Add Fleet Asset</h2>
        <form onSubmit={handleAddCar} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Brand (e.g. Toyota)" required className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, brand: e.target.value})} />
          <input type="text" placeholder="Model Name" required className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, name: e.target.value})} />
          <input type="text" placeholder="Color" required className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, color: e.target.value})} />
          <input type="text" placeholder="Number Plate Number" required className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, numberPlate: e.target.value})} />
          <input type="file" required className="border border-gray-300 bg-gray-50 rounded p-2 text-sm focus:outline-none" onChange={e => setForm({...form, image: e.target.files[0]})} />
          <button type="submit" className="bg-neutral-900 text-white font-bold rounded text-sm uppercase tracking-wider hover:bg-neutral-800 transition">Deploy Asset</button>
        </form>
      </div>

      {/* RENDER LOG TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b"><h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Active Fleet Registers</h2></div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
            <tr><th className="p-4">Car Details</th><th className="p-4">Plate</th><th className="p-4">Status Dropdown Selector</th><th className="p-4 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {cars.map(car => (
              <tr key={car._id} className="hover:bg-gray-50/70 transition">
                <td className="p-4 font-semibold text-neutral-900">{car.brand} - {car.name} ({car.color})</td>
                <td className="p-4 font-mono text-xs">{car.numberPlate}</td>
                <td className="p-4">
                  <select 
                    value={car.status} 
                    onChange={() => toggleStatus(car._id, car.status)}
                    className="border border-gray-300 rounded bg-white p-2 text-xs font-bold uppercase tracking-wide text-neutral-800 focus:outline-none cursor-pointer"
                  >
                    <option value="available">🟢 Available</option>
                    <option value="appointed">🔴 Appointed</option>
                  </select>
                </td>
                <td className="p-4 text-right"><button onClick={() => deleteCar(car._id)} className="text-red-600 font-bold hover:text-red-900 text-xs uppercase tracking-wide transition">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomersDirectory() {
  const [customers, setCustomers] = useState([]);
  const [userForm, setUserForm] = useState({ name: '', username: '', email: '', password: '', role: 'user' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/admin/customers', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCustomers(res.data))
    .catch(() => alert('Failed to read database directory metrics.'));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/create-user', userForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(response.data.message || 'User Provisioned Successfully!');
      
      // Reset the form fields
      setUserForm({ name: '', username: '', email: '', password: '', role: 'user' });
      
      // Pull fresh data to reveal the newly provisioned account instantly
      fetchCustomers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to initialize account creation stream.');
    }
  };

  return (
    <div className="space-y-12">
      {/* NEW USER/ADMIN ACCOUNT CREATION FORM CONTAINER */}
      <div className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-neutral-900">Provision User/Admin Account</h2>
        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input type="text" placeholder="Full Name" required value={userForm.name} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, name: e.target.value})} />
          <input type="text" placeholder="Username Handle" required value={userForm.username} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, username: e.target.value})} />
          <input type="email" placeholder="Email Address" required value={userForm.email} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, email: e.target.value})} />
          <input type="password" placeholder="Account Password" required value={userForm.password} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, password: e.target.value})} />
          
          <select 
            value={userForm.role} 
            className="border border-gray-300 bg-white rounded p-3 text-sm focus:outline-none cursor-pointer text-gray-700 font-medium"
            onChange={e => setUserForm({...userForm, role: e.target.value})}
          >
            <option value="user">Standard Customer (User)</option>
            <option value="admin">System Administrator (Admin)</option>
          </select>

          <button type="submit" className="bg-yellow-500 text-neutral-900 font-black rounded text-sm uppercase tracking-wider hover:bg-yellow-400 transition shadow-sm">
            Create Account
          </button>
        </form>
      </div>

      {/* CUSTOMERS LEDGER VIEW */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b"><h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Registered Users Ledger</h2></div>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
            <tr><th className="p-4">Name Details</th><th className="p-4">Email Axis</th><th className="p-4">Account Role Privilege</th><th className="p-4">Lease Volumes</th></tr>
          </thead>
          <tbody className="divide-y">
            {customers.map(c => (
              <tr key={c._id} className="hover:bg-gray-50/70 transition">
                <td className="p-4 font-semibold text-neutral-900">
                  {c.name} <span className="text-xs text-gray-400 font-normal">(@{c.username})</span>
                </td>
                <td className="p-4 font-mono text-xs text-gray-500">{c.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-2xs font-extrabold uppercase tracking-wide ${c.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}>
                    {c.role || 'user'}
                  </span>
                </td>
                <td className="p-4 font-semibold text-neutral-700">{c.bookedCars?.length || 0} Assets Booked</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}