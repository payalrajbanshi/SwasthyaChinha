// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "Patient", // default role
//     hospitalId: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5099/api/auth/register", form);
//       const { token, role } = response.data;

//       // ✅ Save token for persistent login
//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       // ✅ Redirect based on role
//       switch (role) {
//         case "Doctor":
//           navigate("/doctor/dashboard");
//           break;
//         case "Patient":
//           navigate("/patient/dashboard");
//           break;
//         case "Pharmacist":
//           navigate("/pharmacist/dashboard");
//           break;
//         case "HospitalAdmin":
//           navigate("/hospital/dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       alert("Registration failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Register</h2>

//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={form.fullName}
//           onChange={handleChange}
//           className="w-full border p-2 rounded mb-4"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full border p-2 rounded mb-4"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full border p-2 rounded mb-4"
//           required
//         />

//         <label className="block mb-2">Select Role</label>
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full border p-2 rounded mb-4"
//         >
//           <option value="Patient">Patient</option>
//           <option value="Doctor">Doctor</option>
//           <option value="Pharmacist">Pharmacist</option>
//           <option value="HospitalAdmin">HospitalAdmin</option>
//         </select>

//         {(form.role === "Doctor" || form.role === "Pharmacist") && (
//           <input
//             type="text"
//             name="hospitalId"
//             placeholder="Hospital ID"
//             value={form.hospitalId}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-4"
//           />
//         )}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { register } from "../../services/authService";
// import Roles from "../../components/Roles";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     fullName: "", email: "", password: "", role: "Doctor", hospitalId: ""
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await register(formData);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("role", res.role);
//       localStorage.setItem("userId", res.userId);
//       navigate(`/${res.role.toLowerCase()}/dashboard`);
//     } catch (err) {
//       setError("Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Register</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input name="fullName" onChange={handleChange} value={formData.fullName} className="w-full p-2 border mb-3 rounded" placeholder="Full Name" required />
//         <input name="email" onChange={handleChange} value={formData.email} className="w-full p-2 border mb-3 rounded" placeholder="Email" required />
//         <input name="password" type="password" onChange={handleChange} value={formData.password} className="w-full p-2 border mb-3 rounded" placeholder="Password" required />
//         <RoleSelect value={formData.role} onChange={handleChange} />
//         {["Doctor", "Patient", "Pharmacist"].includes(formData.role) && (
//           <input name="hospitalId" onChange={handleChange} value={formData.hospitalId} className="w-full p-2 border mb-3 rounded" placeholder="Hospital ID" />
//         )}
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded mt-3">Register</button>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import api from '../../services/api';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     role: '',
//     hospitalId: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/Auth/register', formData);
//       alert('Registration successful! You can now log in.');
//     } catch (error) {
//       console.error('Registration failed', error.response?.data);
//       alert('Failed to register');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg bg-white">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="fullName" onChange={handleChange} placeholder="Full Name" className="input" />
//         <input type="email" name="email" onChange={handleChange} placeholder="Email" className="input" />
//         <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input" />
//         <input type="text" name="role" onChange={handleChange} placeholder="Role (Patient, Doctor, etc.)" className="input" />
//         <input type="text" name="hospitalId" onChange={handleChange} placeholder="Hospital ID" className="input" />
//         <button type="submit" className="btn">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { registerUser } from "../../services/auth"; // ✅ correct path

// const Register = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     gender: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       // "patient" is passed as the role for registration
//       const res = await registerUser("patient", formData);
//       setMessage("Registration successful!");
//       console.log("Success:", res);
//     } catch (err) {
//       setMessage("Registration failed. Please check your inputs.");
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4">Patient Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="date"
//           name="dateOfBirth"
//           placeholder="Date of Birth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="gender"
//           placeholder="Gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//       {message && (
//         <div className="mt-4 text-center text-sm text-red-600">{message}</div>
//       )}
//     </div>
//   );
// };

// export default Register;
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { registerUser } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const Register = () => {
//   const { role } = useParams(); // Get the role from URL
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Initialize form fields based on role
//   useEffect(() => {
//     switch (role?.toLowerCase()) {
//       case "patient":
//         setFormData({
//           fullName: "",
//           dateOfBirth: "",
//           gender: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       case "doctor":
//         setFormData({
//           fullName: "",
//           specialization: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       case "pharmacist":
//         setFormData({
//           fullName: "",
//           licenseNumber: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       case "hospitaladmin":
//         setFormData({
//           fullName: "",
//           hospitalName: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       default:
//         setMessage("Invalid role specified.");
//     }
//   }, [role]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await registerUser(role, formData);
//       setMessage("Registration successful!");
//       console.log("Success:", res);
//     } catch (err) {
//       console.error("Error:", err);
//       setMessage("Registration failed. Please check your inputs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4 capitalize">{role} Registration</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {Object.keys(formData).map((key) =>
//           key === "password" ? (
//             <div key={key} className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//               />
//               <div
//                 className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//               </div>
//             </div>
//           ) : (
//             <input
//               key={key}
//               type={key === "dateOfBirth" ? "date" : "text"}
//               name={key}
//               placeholder={key
//                 .replace(/([A-Z])/g, " $1")
//                 .replace(/^./, (str) => str.toUpperCase())}
//               value={formData[key]}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 rounded"
//             />
//           )
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>
//       {message && (
//         <div className="mt-4 text-center text-sm text-red-600">{message}</div>
//       )}
//     </div>
//   );
// };

// export default Register;

// src/pages/Auth/Register.jsx
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { registerUser } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const allowedRoles = ["patient", "pharmacist", "hospitaladmin"];

// const Register = () => {
//   const { role } = useParams(); // Get role from URL
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!allowedRoles.includes(role?.toLowerCase())) {
//       setMessage("🚫 Invalid role. Please use a valid registration URL like /register/patient");
//       return;
//     }

//     // Set form fields based on role
//     switch (role.toLowerCase()) {
//       case "patient":
//         setFormData({
//           fullName: "",
//           dateOfBirth: "",
//           gender: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       case "pharmacist":
//         setFormData({
//           fullName: "",
//           licenseNumber: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       case "hospitaladmin":
//         setFormData({
//           fullName: "",
//           hospitalName: "",
//           phoneNumber: "",
//           email: "",
//           password: "",
//         });
//         break;
//       default:
//         setFormData({});
//     }
//   }, [role]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await registerUser(role, formData);
//       setMessage("✅ Registration successful!");
//       console.log("Success:", res);
//     } catch (err) {
//       console.error("Registration Error:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0]?.description ||
//         "❌ Registration failed. Please check your inputs.";
//       setMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4 capitalize">
//         {allowedRoles.includes(role?.toLowerCase())
//           ? `${role} Registration`
//           : "Invalid Role"}
//       </h2>

//       {allowedRoles.includes(role?.toLowerCase()) ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((key) =>
//             key === "password" ? (
//               <div key={key} className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? (
//                     <AiFillEyeInvisible size={20} />
//                   ) : (
//                     <AiFillEye size={20} />
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <input
//                 key={key}
//                 type={key === "dateOfBirth" ? "date" : "text"}
//                 name={key}
//                 placeholder={key
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/^./, (str) => str.toUpperCase())}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             )
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       ) : null}

//       {message && (
//         <div
//           className={`mt-4 text-center text-sm ${
//             message.includes("success")
//               ? "text-green-600"
//               : "text-red-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { registerUser } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const allowedRoles = ["patient", "pharmacist", "hospitaladmin"];

// const Register = () => {
//   const { role } = useParams();
//   const normalizedRole = role?.toLowerCase();

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Validate the role
//     if (!allowedRoles.includes(normalizedRole)) {
//       setMessage("🚫 Invalid role. Please use a valid registration URL like /register/patient");
//       setFormData({});
//       return;
//     }

//     setMessage(""); // Clear any previous message

//     // Set default form fields per role
//     const defaultFields = {
//       patient: {
//         fullName: "",
//         dateOfBirth: "",
//         gender: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       },
//       pharmacist: {
//         fullName: "",
//         licenseNumber: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       },
//       hospitaladmin: {
//         fullName: "",
//         hospitalName: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       },
//     };

//     setFormData(defaultFields[normalizedRole]);
//   }, [normalizedRole]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await registerUser(normalizedRole, formData);
//       setMessage("✅ Registration successful!");
//       console.log("Registration response:", res);
//     } catch (err) {
//       console.error("Registration error:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0]?.description ||
//         "❌ Registration failed. Please check your inputs.";
//       setMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4 capitalize">
//         {allowedRoles.includes(normalizedRole)
//           ? `${normalizedRole} Registration`
//           : "Invalid Role"}
//       </h2>

//       {allowedRoles.includes(normalizedRole) ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((key) =>
//             key === "password" ? (
//               <div key={key} className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? (
//                     <AiFillEyeInvisible size={20} />
//                   ) : (
//                     <AiFillEye size={20} />
//                   )}
//                 </div>
//               </div>
//             ) : (
//               <input
//                 key={key}
//                 type={key === "dateOfBirth" ? "date" : "text"}
//                 name={key}
//                 placeholder={key
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/^./, (str) => str.toUpperCase())}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             )
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       ) : null}

//       {message && (
//         <div
//           className={`mt-4 text-center text-sm ${
//             message.includes("success") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const allowedRoles = ["patient", "pharmacist", "hospitaladmin"];

const Register = () => {
  const { role } = useParams();
  const normalizedRole = role?.toLowerCase();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!allowedRoles.includes(normalizedRole)) {
      setMessage("🚫 Invalid role. Please use a valid registration URL like /register/patient");
      setFormData({});
      return;
    }

    setMessage("");

    const defaultFields = {
      patient: {
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      pharmacist: {
        fullName: "",
        licenseNumber: "",
        pharmacyName: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      hospitaladmin: {
        hospitalName: "",
        email: "",
        password: "",
      },
    };

    setFormData(defaultFields[normalizedRole]);
  }, [normalizedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await registerUser(normalizedRole, formData);
      setMessage("✅ Registration successful!");
      console.log("Registration response:", res);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.description ||
        "❌ Registration failed. Please check your inputs.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {allowedRoles.includes(normalizedRole)
          ? `${normalizedRole} Registration`
          : "Invalid Role"}
      </h2>

      {allowedRoles.includes(normalizedRole) ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) =>
            key === "password" ? (
              <div key={key} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </div>
              </div>
            ) : (
              <input
                key={key}
                type={key === "dateOfBirth" ? "date" : "text"}
                name={key}
                placeholder={formatLabel(key)}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            )
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : null}

      {message && (
        <div
          className={`mt-4 text-center text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
