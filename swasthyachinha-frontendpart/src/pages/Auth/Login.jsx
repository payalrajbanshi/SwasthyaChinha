// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const roles = ["Patient", "Doctor", "Pharmacist", "HospitalAdmin"];

// export default function Login() {
//   const [role, setRole] = useState("Patient");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [pin, setPin] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const credentials =
//         role === "Patient"
//           ? { email, pin }
//           : { email, password };

//       // 🔗 Fixed backend URL
//       const response = await axios.post("http://localhost:5099/api/auth/login", {
//         ...credentials,
//         role,
//       });

//       const { token, role: returnedRole } = response.data;

//       if (rememberMe) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", returnedRole);
//       } else {
//         sessionStorage.setItem("token", token);
//         sessionStorage.setItem("role", returnedRole);
//       }

//       // 🚀 Redirect based on role
//       navigate(`/${returnedRole.toLowerCase()}/dashboard`);
//     } catch (err) {
//       alert("Login failed. Check credentials.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-300">
//       <div className="bg-white shadow-xl p-8 rounded-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login - SwasthyaChinha</h2>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Role</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             {roles.map((r) => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>
//         </div>

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {role === "Patient" ? (
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">PIN</label>
//               <input
//                 type="password"
//                 className="w-full border rounded px-3 py-2"
//                 value={pin}
//                 onChange={(e) => setPin(e.target.value)}
//                 required
//               />
//             </div>
//           ) : (
//             <div className="mb-4">
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 className="w-full border rounded px-3 py-2"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <div className="mb-4 flex items-center">
//             <input
//               type="checkbox"
//               id="rememberMe"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//               className="mr-2"
//             />
//             <label htmlFor="rememberMe" className="text-sm">Remember Me</label>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Login
//           </button>
//             <button
//     type="button"
//     onClick={() => navigate("/register")}
//     className="w-full mt-3 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
//   >
//     Don't have an account? Register
//   </button>

//         </form>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../services/authService";
// import Roles from "../../components/Roles";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "", role: "Doctor" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await login(formData);
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("role", res.role);
//       localStorage.setItem("userId", res.userId);
//       navigate(`/${res.role.toLowerCase()}/dashboard`);
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input name="email" onChange={handleChange} value={formData.email} className="w-full p-2 border mb-3 rounded" placeholder="Email" required />
//         <input name="password" type="password" onChange={handleChange} value={formData.password} className="w-full p-2 border mb-3 rounded" placeholder="Password" required />
//         <RoleSelect value={formData.role} onChange={handleChange} />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-3">Login</button>
//       </form>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import api from '../../services/api';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
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
//       const res = await api.post('/Auth/login', formData);
//       localStorage.setItem('token', res.data.token); // Save token for future use
//       alert('Login successful!');
//       // TODO: Redirect to dashboard based on role
//     } catch (error) {
//       console.error('Login failed', error.response?.data);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg bg-white">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="email" name="email" onChange={handleChange} placeholder="Email" className="input" />
//         <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input" />
//         <button type="submit" className="btn">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from 'react';
// import { loginUser } from '../../services/auth'; // adjust path if needed

// const Login = () => {
//   const [formData, setFormData] = useState({
//     emailOrPhone: '',
//     password: ''
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
//       const data = await loginUser(formData);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.role);
//       localStorage.setItem('email', data.email);
//       localStorage.setItem('userId', data.userId);
//       alert('Login successful!');
//       // TODO: redirect to dashboard based on role
//     } catch (error) {
//       console.error('Login failed:', error.response?.data || error.message);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow-md rounded-lg bg-white">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="emailOrPhone"
//           placeholder="Email or Phone"
//           onChange={handleChange}
//           className="input border p-2 w-full"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="input border p-2 w-full"
//           required
//         />
//         <button type="submit" className="btn bg-blue-600 text-white p-2 w-full">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
//import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/auth"; // ✅ correct path

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",        // ✅ was emailOrPhone — now fixed
//     password: ""
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await loginUser(formData);
//       console.log("Login Success:", data);

//       // Optionally store token or role
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       // Redirect based on role
//       switch (data.role) {
//         case "Patient":
//           navigate("/patient-dashboard");
//           break;
//         case "Doctor":
//           navigate("/doctor-dashboard");
//           break;
//         case "Pharmacist":
//           navigate("/pharmacist-dashboard");
//           break;
//         case "HospitalAdmin":
//           navigate("/hospital-dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       console.error("Login Failed:", err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="text"
//           name="email" // ✅ name fixed
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-4 border rounded"
//         />

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("🔐 Logging in with:", formData);
//     try {
//       const data  = await loginUser(formData);
//       console.log("✅ Login successful:", data);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       switch (data.role.toLowerCase()) {
//         case "patient":
//           navigate("/patient-dashboard");
//           break;
//         case "doctor":
//           navigate("/doctor-dashboard");
//           break;
//         case "pharmacist":
//           navigate("/pharmacist-dashboard");
//           break;
//         case "hospitaladmin":
//           navigate("/hospital-dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err) {
//       console.error("Login Failed:", err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="text"
//           name="emailOrPhone"
//           placeholder="Email or Phone"
//           value={formData.emailOrPhone}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//           />
//           <div
//             className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//           </div>
//         </div>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    console.log("🔐 Logging in with:", formData);

    try {
      const data = await login(formData);
      console.log("✅ Login successful:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

         if (data.role.toLowerCase() === "hospitaladmin") {
        // Assuming backend returns hospitalId or fallback to userId if missing
        localStorage.setItem("hospitalId", data.userId);
      }

      setMessage("✅ Login successful");

      // Delay navigation so user sees success message
      setTimeout(() => {
        setLoading(false);
        switch (data.role.toLowerCase()) {
          case "patient":
            navigate("/patient/dashboard");
            break;
          case "doctor":
            navigate("/doctor/dashboard");
            break;
          case "pharmacist":
            navigate("/pharmacist/dashboard");
            break;
          case "hospitaladmin":
            navigate("/hospital/dashboard");
            break;
          default:
            navigate("/");
        }
      }, 1200);
    } catch (err) {
      console.error("Login Failed:", err);
      setError(err.response?.data?.message || "❌ Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="relative mb-4">
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

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
