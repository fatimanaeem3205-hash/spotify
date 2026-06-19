import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
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
  const [form, setForm] = useState({ 
    brand: '', 
    name: '', 
    color: '', 
    numberPlate: '', 
    pricePerHour: '', 
    category: 'business', 
    image: null 
  });
  
  const [editingCarId, setEditingCarId] = useState(null);

  useEffect(() => { fetchCars(); }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars');
      setCars(res.data);
    } catch (err) {
      alert('Error fetching car configurations from database logs.');
    }
  };

  const handleEditInit = (car) => {
    setEditingCarId(car._id);
    setForm({
      brand: car.brand,
      name: car.name,
      color: car.color,
      numberPlate: car.numberPlate,
      pricePerHour: car.pricePerHour || '',
      category: car.category || 'business',
      image: null 
    });
  };

  const resetFormState = () => {
    setEditingCarId(null);
    setForm({ brand: '', name: '', color: '', numberPlate: '', pricePerHour: '', category: 'business', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    
    formData.append('brand', form.brand);
    formData.append('name', form.name);
    formData.append('color', form.color);
    formData.append('numberPlate', form.numberPlate);
    formData.append('pricePerHour', form.pricePerHour);
    formData.append('category', form.category);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (editingCarId) {
        await axios.put(`http://localhost:5000/api/cars/${editingCarId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        alert('Car Asset Updated Successfully');
      } else {
        await axios.post('http://localhost:5000/api/cars', formData, { 
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          } 
        });
        alert('Car Asset Deployed Successfully');
      }
      resetFormState();
      fetchCars();
    } catch (err) {
      alert(err.response?.data?.message || 'Configuration payload processing execution failed.');
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
      <div className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-neutral-900">
          {editingCarId ? '🔧 Edit Fleet Asset' : 'Add Fleet Asset'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="text" placeholder="Brand (e.g. Toyota)" required value={form.brand} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, brand: e.target.value})} />
            <input type="text" placeholder="Model Name" required value={form.name} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, name: e.target.value})} />
            <input type="text" placeholder="Color" required value={form.color} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, color: e.target.value})} />
            <input type="text" placeholder="Number Plate Number" required value={form.numberPlate} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, numberPlate: e.target.value})} />
            <input type="number" placeholder="Price Per Hour (PKR)" required value={form.pricePerHour} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setForm({...form, pricePerHour: e.target.value})} />
            
            <select required value={form.category} className="border border-gray-300 bg-white rounded p-3 text-sm focus:outline-none text-gray-700 font-medium cursor-pointer" onChange={e => setForm({...form, category: e.target.value})}>
              <option value="business">Business</option>
              <option value="family">Family</option>
              <option value="adventure">Adventure</option>
              <option value="wedding">Wedding</option>
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:flex-grow border border-gray-300 bg-gray-50 rounded p-2 text-sm">
              <input type="file" required={!editingCarId} className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer" onChange={e => setForm({...form, image: e.target.files[0]})} />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <button type="submit" className={`flex-grow md:w-48 text-white font-bold py-3.5 px-6 rounded text-sm uppercase tracking-wider transition ${editingCarId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-900 hover:bg-neutral-800'}`}>
                {editingCarId ? 'Update Asset' : 'Deploy Asset'}
              </button>
              {editingCarId && (
                <button type="button" onClick={resetFormState} className="bg-gray-200 text-neutral-800 font-bold px-6 py-3.5 rounded text-sm uppercase tracking-wider hover:bg-gray-300 transition">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b"><h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Active Fleet Registers</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
              <tr>
                <th className="p-4">Car Details</th>
                <th className="p-4">Plate</th>
                <th className="p-4">Hourly Rate</th>
                <th className="p-4">Status Dropdown Selector</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {cars.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400 font-medium">No vehicles deployed in fleet registers.</td>
                </tr>
              ) : (
                cars.map(car => (
                  <tr key={car._id} className="hover:bg-gray-50/70 transition">
                    <td className="p-4">
                      <span className="font-semibold text-neutral-900">{car.brand} - {car.name} ({car.color})</span>
                      <span className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-0.5">{car.category || 'Standard'}</span>
                    </td>
                    <td className="p-4 font-mono text-xs">{car.numberPlate}</td>
                    <td className="p-4 font-bold text-neutral-800">Rs. {Number(car.pricePerHour || 0).toLocaleString()}/hr</td>
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
                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <button onClick={() => handleEditInit(car)} className="text-blue-600 font-bold hover:text-blue-900 text-xs uppercase tracking-wide transition">Edit</button>
                      <button onClick={() => deleteCar(car._id)} className="text-red-600 font-bold hover:text-red-900 text-xs uppercase tracking-wide transition">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function CustomersDirectory() {
  const [customers, setCustomers] = useState([]);
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setCustomers(Array.isArray(res.data) ? res.data : res.data.users || []);
    })
    .catch(() => alert('Failed to read database directory metrics. Check token structure execution logs.'));
  };

  const handleEditInit = (user) => {
    setEditingUserId(user._id);
    setUserForm({
      name: user.name,
      email: user.email,
      password: '', 
      role: user.role
    });
  };

  const resetFormState = () => {
    setEditingUserId(null);
    setUserForm({ name: '', email: '', password: '', role: 'customer' });
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      password: userForm.password,
      role: userForm.role
    };

    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5000/api/auth/users/${editingUserId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User Account Updated Successfully!');
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/admin/create-user', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert(response.data.message || 'User Provisioned Successfully!');
      }
      resetFormState();
      fetchCustomers();
    } catch (err) {
      const serverMessage = err.response?.data?.message || err.message;
      alert(`Backend Error: ${serverMessage}`);
      console.error("Full Error Context:", err.response);
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you completely sure you want to permanently delete this user account?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User account dropped from systems ledger.');
        fetchCustomers();
      } catch (err) {
        alert(err.response?.data?.message || 'Could not complete account removal processing loop.');
      }
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-xl border shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6 text-neutral-900">
          {editingUserId ? '🔧 Modify Registered User Profile' : 'Provision User/Admin Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <input type="text" placeholder="Full Name" required value={userForm.name} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, name: e.target.value})} />
            <input type="email" placeholder="Email Address" required value={userForm.email} className="border border-gray-300 rounded p-3 text-sm focus:outline-none" onChange={e => setUserForm({...userForm, email: e.target.value})} />
            
            <div className="relative flex items-center">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder={editingUserId ? "Leave blank to keep same" : "Account Password"} 
                required={!editingUserId} 
                value={userForm.password} 
                className="w-full border border-gray-300 rounded p-3 pr-16 text-sm focus:outline-none" 
                onChange={e => setUserForm({...userForm, password: e.target.value})} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-xs font-extrabold uppercase tracking-wider text-gray-400 hover:text-neutral-900 select-none transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            
            <select 
              value={userForm.role} 
              className="border border-gray-300 bg-white rounded p-3 text-sm focus:outline-none cursor-pointer text-gray-700 font-medium"
              onChange={e => setUserForm({...userForm, role: e.target.value})}
            >
              <option value="customer">Standard Customer</option>
              <option value="admin">System Administrator (Admin)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            {editingUserId && (
              <button type="button" onClick={resetFormState} className="bg-gray-200 text-neutral-800 font-bold px-6 py-3 rounded text-sm uppercase tracking-wider hover:bg-gray-300 transition">
                Cancel
              </button>
            )}
            <button type="submit" className={`w-full md:w-56 text-sm uppercase tracking-wider font-black py-3 rounded transition shadow-sm ${editingUserId ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-yellow-500 text-neutral-900 hover:bg-yellow-400'}`}>
              {editingUserId ? 'Save Account Changes' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b"><h2 className="text-xl font-black uppercase tracking-tight text-neutral-900">Registered Users Ledger</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b">
              <tr>
                <th className="p-4">Name Details</th>
                <th className="p-4">Email Axis</th>
                <th className="p-4">Account Role Privilege</th>
                <th className="p-4">Lease Volumes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400 font-medium">No registered accounts found in directory database.</td>
                </tr>
              ) : (
                customers.map(c => (
                  <tr key={c._id} className="hover:bg-gray-50/70 transition">
                    <td className="p-4 font-semibold text-neutral-900">{c.name}</td>
                    <td className="p-4 font-mono text-xs text-gray-500">{c.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-extrabold uppercase tracking-wide ${c.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}>
                        {c.role || 'customer'}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-neutral-700">{c.bookedCars ? new Set(c.bookedCars.map(car => typeof car === 'object' ? car._id : car)).size : 0} Assets Booked</td>
                    <td className="p-4 text-right space-x-3 whitespace-nowrap">
                      <button onClick={() => handleEditInit(c)} className="text-blue-600 font-bold hover:text-blue-900 text-xs uppercase tracking-wide transition">Edit</button>
                      <button onClick={() => deleteUser(c._id)} className="text-red-600 font-bold hover:text-red-900 text-xs uppercase tracking-wide transition">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}