// // src/components/forms/DoctorRegisterForm.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const DoctorRegisterForm = ({ hospitalId }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     specialty: '',
//     password: ''
//   });

//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('/api/Hospital/register-doctor', {
//         ...formData,
//         hospitalId
//       });
//       setSuccess('Doctor registered successfully.');
//       setError(null);
//     } catch (err) {
//       setError(err.response?.data || 'Registration failed');
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Register New Doctor</h2>
//       {success && <div className="text-green-600 mb-2">{success}</div>}
//       {error && <div className="text-red-600 mb-2">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="fullName" onChange={handleChange} value={formData.fullName} placeholder="Full Name" className="w-full border p-2 rounded" required />
//         <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full border p-2 rounded" required />
//         <input name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} placeholder="Phone Number" className="w-full border p-2 rounded" required />
//         <input name="specialty" onChange={handleChange} value={formData.specialty} placeholder="Specialty" className="w-full border p-2 rounded" required />
//         <input name="password" type="password" onChange={handleChange} value={formData.password} placeholder="Password" className="w-full border p-2 rounded" required />

//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register Doctor</button>
//       </form>
//     </div>
//   );
// };

// export default DoctorRegisterForm;
// import React, { useState } from "react";
// import axios from "axios";

// const DoctorRegisterForm = ({ hospitalId, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     licenseNumber: "",
//     password: "",
//   });

//   const [success, setSuccess] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("You must be logged in to register a doctor.");

//       await axios.post(
//         "http://localhost:5099/api/hospital/register-doctor",
//         {
//           fullName: formData.fullName,
//           email: formData.email,
//           licenseNumber: formData.licenseNumber,
//           password: formData.password,
//           hospitalId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccess("Doctor registered successfully.");
//       setError(null);

//       if (onSuccess) onSuccess();
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Registration failed");
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Register New Doctor</h2>
//       {success && <div className="text-green-600 mb-2">{success}</div>}
//       {error && <div className="text-red-600 mb-2">{error}</div>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="fullName"
//           onChange={handleChange}
//           value={formData.fullName}
//           placeholder="Full Name"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="email"
//           type="email"
//           onChange={handleChange}
//           value={formData.email}
//           placeholder="Email"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="licenseNumber"
//           onChange={handleChange}
//           value={formData.licenseNumber}
//           placeholder="License Number"
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           onChange={handleChange}
//           value={formData.password}
//           placeholder="Password"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Register Doctor
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DoctorRegisterForm;
import React, { useState } from "react";
//import axios from "axios";
import api from "../../services/api";

const DoctorRegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    password: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Get HospitalId from localStorage (set when HospitalAdmin logs in)
  const hospitalId = localStorage.getItem("hospitalId");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to register a doctor.");
      if (!hospitalId) throw new Error("Hospital ID not found. Please log in as Hospital Admin.");

      await axios.post(
        // "http://localhost:5099/api/hospital/register-doctor",
        "/hospital/register-doctor",
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          specialty: formData.specialty,
          password: formData.password,
          // hospitalId: hospitalId, // ✅ Automatically included
          hospitalId, // ✅ automatically included
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            //"Content-Type": "application/json",
          },
        }
      );

      setSuccess("Doctor registered successfully.");
      setError(null);

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        specialty: "",
        password: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      setSuccess(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register New Doctor</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          onChange={handleChange}
          value={formData.fullName}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="phoneNumber"
          onChange={handleChange}
          value={formData.phoneNumber}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="specialty"
          onChange={handleChange}
          value={formData.specialty}
          placeholder="Specialty"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ HospitalId is hidden but will be sent */}
        <input type="hidden" name="hospitalId" value={hospitalId || ""} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorRegisterForm;
