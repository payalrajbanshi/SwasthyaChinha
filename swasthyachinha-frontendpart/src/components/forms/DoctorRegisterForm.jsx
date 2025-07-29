// src/components/forms/DoctorRegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const DoctorRegisterForm = ({ hospitalId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    specialty: '',
    password: ''
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/Hospital/register-doctor', {
        ...formData,
        hospitalId
      });
      setSuccess('Doctor registered successfully.');
      setError(null);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      setSuccess(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register New Doctor</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullName" onChange={handleChange} value={formData.fullName} placeholder="Full Name" className="w-full border p-2 rounded" required />
        <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full border p-2 rounded" required />
        <input name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Phone Number" className="w-full border p-2 rounded" required />
        <input name="specialty" onChange={handleChange} value={formData.specialty} placeholder="Specialty" className="w-full border p-2 rounded" required />
        <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" className="w-full border p-2 rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register Doctor</button>
      </form>
    </div>
  );
};

export default DoctorRegisterForm;
