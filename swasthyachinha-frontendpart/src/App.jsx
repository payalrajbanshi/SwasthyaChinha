// import React from 'react'

// const App = () => {
//   return (
//     <div className='text-red-600'>
//       hi
//     </div>
//   )
// }

// export default App
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// // import Navbar from "./components/Navbar"; 
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/Hospital/HospitalDashboard";

// // Dashboard placeholders
// // const DoctorDashboard = () => <h1 className="text-center mt-10 text-2xl font-bold">👨‍⚕️ Doctor Dashboard</h1>;
// // const PatientDashboard = () => <h1 className="text-center mt-10 text-2xl font-bold">🧑‍💊 Patient Dashboard</h1>;
// // const PharmacistDashboard = () => <h1 className="text-center mt-10 text-2xl font-bold">💊 Pharmacist Dashboard</h1>;
// // const HospitalAdminDashboard = () => <h1 className="text-center mt-10 text-2xl font-bold">🏥 Hospital Admin Dashboard</h1>;


// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />} />
//       <Route index element={<Home />}></Route>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//       <Route path="/patient/dashboard" element={<PatientDashboard />} />
//       <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
//       <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

//             {/* Default route */}
//       <Route path="*" element={<Login />} />
//     </Routes>
//   );
// }
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/Hospital/HospitalDashboard";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />} />
//       <Route index element={<Home />} />
//       <Route path="/login" element={<Login />} />

//       {/* 🔧 Corrected dynamic register route */}
//       <Route path="/register/:role" element={<Register />} />

//       <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
//       <Route path="/patient/dashboard" element={<PatientDashboard />} />
//       <Route path="/pharmacist/dashboard" element={<PharmacistDashboard />} />
//       <Route path="/hospital/dashboard" element={<HospitalDashboard />} />

//       {/* Default fallback */}
//       <Route path="*" element={<Login />} />
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";
// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/Hospital/HospitalDashboard";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🔁 All routes wrapped inside Layout */}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register/:role" element={<Register />} />
//         <Route path="doctor/dashboard" element={<DoctorDashboard />} />
//         <Route path="patient/dashboard" element={<PatientDashboard />} />
//         <Route path="pharmacist/dashboard" element={<PharmacistDashboard />} />
//         <Route path="hospital/dashboard" element={<HospitalDashboard />} />
//         <Route path="*" element={<Login />} />
//       </Route>
//     </Routes>
//   );
// }
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";



// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
   
//       <Routes>
//         {/* Layout wrapper */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register/:role" element={<Register />} />

//           {/* ✅ Protected Dashboard Routes */}
//           <Route
//             path="doctor/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["doctor"]}>
//                 <DoctorDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="patient/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["patient"]}>
//                 <PatientDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="pharmacist/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["pharmacist"]}>
//                 <PharmacistDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="hospital/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//                 <HospitalDashboard />
//               </ProtectedRoute>
//             }
//           />
//                   <Route
//           path="hospital/register-doctor"
//           element={
//             <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//               <RegisterDoctor />
//             </ProtectedRoute>
//           }
//         />
//           {/* Catch-all */}
//           <Route path="*" element={<Login />} />
//         </Route>
//       </Routes>
    
//   );
// }

// src/App.jsx


// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
// import DoctorList from "./components/HospitalAdmin/DoctorList"; // optional

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌐 Layout wrapper for all pages */}
//       <Route path="/" element={<Layout />}>
//         {/* 🏠 Public routes */}
//         <Route index element={<Home />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register/:role" element={<Register />} />

//         {/* 🔐 Protected dashboard routes */}
//         <Route
//           path="doctor/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["doctor"]}>
//               <DoctorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="patient/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["patient"]}>
//               <PatientDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="pharmacist/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["pharmacist"]}>
//               <PharmacistDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="hospital/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//               <HospitalDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="hospital/register-doctor"
//           element={
//             <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//               <RegisterDoctor />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="hospital/doctor-list"
//           element={
//             <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//               <DoctorList />
//             </ProtectedRoute>
//           }
//         />

//         {/* 🔁 Catch-all route */}
//         <Route path="*" element={<Login />} />
//       </Route>
//     </Routes>
//   );
// }
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
// import DoctorList from "./components/HospitalAdmin/DoctorList";
// import PrescriptionPage from "./pages/doctor/PrescriptionPage";
// import PatientsPage from "./pages/doctor/PatientsPage";   
// import ProfilePage from "./pages/doctor/ProfilePage";


// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Routes (no sidebar) */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register/:role" element={<Register />} />

//       {/* 🏥 HospitalAdmin Routes (with sidebar layout) */}
//       <Route
//         path="/hospital"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HospitalDashboard />} />
//         <Route path="register-doctor" element={<RegisterDoctor />} />
//         <Route path="doctor-list" element={<DoctorList />} />
//         {/* Add more hospitaladmin child routes if needed */}
//       </Route>

//       {/* 🩺 Doctor Dashboard */}
//       <Route
//         path="/doctor/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <DoctorDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 👤 Patient Dashboard */}
//       <Route
//         path="/patient/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <PatientDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 💊 Pharmacist Dashboard */}
//       <Route
//         path="/pharmacist/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <PharmacistDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route path="/doctor/prescribe" element={<PrescriptionPage />} />

//       {/* 🛑 Fallback to Home */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
// import DoctorList from "./components/HospitalAdmin/DoctorList";

// import PrescriptionPage from "./pages/doctor/PrescriptionPage";
// import PatientsPage from "./pages/doctor/PatientsPage";   // 👈 you’ll create this
// import ProfilePage from "./pages/doctor/ProfilePage";     // 👈 you’ll create this

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Routes (no sidebar) */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register/:role" element={<Register />} />

//       {/* 🏥 HospitalAdmin Routes (with sidebar layout) */}
//       <Route
//         path="/hospital"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HospitalDashboard />} />
//         <Route path="register-doctor" element={<RegisterDoctor />} />
//         <Route path="doctor-list" element={<DoctorList />} />
//       </Route>

//       {/* 🩺 Doctor Routes (with sidebar layout) */}
//       <Route
//         path="/doctor"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <Layout />  {/* 👈 Sidebar will render inside Layout */}
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<DoctorDashboard />} />
//         <Route path="prescribe" element={<PrescriptionPage />} />
//         <Route path="patients" element={<PatientsPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//       </Route>

//       {/* 👤 Patient Dashboard */}
//       <Route
//         path="/patient/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <PatientDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 💊 Pharmacist Dashboard */}
//       <Route
//         path="/pharmacist/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <PharmacistDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 🛑 Fallback */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }


// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
// import DoctorList from "./components/HospitalAdmin/DoctorList";
// import PrescriptionPage from "./pages/doctor/PrescriptionPage";
// import PatientsPage from "./pages/doctor/PatientsPage";
// import ProfilePage from "./pages/doctor/ProfilePage";

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Routes (no sidebar) */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register/:role" element={<Register />} />

//       {/* 🏥 HospitalAdmin Routes (with sidebar layout) */}
//       <Route
//         path="/hospital"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HospitalDashboard />} />
//         <Route path="register-doctor" element={<RegisterDoctor />} />
//         <Route path="doctor-list" element={<DoctorList />} />
//       </Route>

//       {/* 🩺 Doctor Routes (with sidebar layout) */}
//       <Route
//         path="/doctor"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<DoctorDashboard />} />
//         <Route path="prescribe" element={<PrescriptionPage />} />
//         <Route path="patients" element={<PatientsPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//       </Route>

//       {/* 👤 Patient Dashboard */}
//       <Route
//         path="/patient/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <PatientDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 💊 Pharmacist Dashboard */}
//       <Route
//         path="/pharmacist/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <PharmacistDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 🛑 Fallback to Home */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/PatientDashboard";
// import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
// import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
// import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
// import DoctorList from "./components/HospitalAdmin/DoctorList";
// import PrescriptionPage from "./pages/doctor/PrescriptionPage";
// import PatientsPage from "./pages/doctor/PatientsPage";
// import ProfilePage from "./pages/doctor/ProfilePage";

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register/:role" element={<Register />} />

//       {/* 🏥 HospitalAdmin Routes */}
//       <Route
//         path="/hospital"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<HospitalDashboard />} />
//         <Route path="register-doctor" element={<RegisterDoctor />} />
//         <Route path="doctor-list" element={<DoctorList />} />
//       </Route>

//       {/* 🩺 Doctor Routes */}
//       <Route
//         path="/doctor"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<DoctorDashboard />} />
//         <Route path="prescribe" element={<PrescriptionPage />} />
//         <Route path="patients" element={<PatientsPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//       </Route>

//       {/* 👤 Patient Routes */}
//       <Route
//         path="/patient"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<PatientDashboard />} />
//       </Route>

//       {/* 💊 Pharmacist Routes */}
//       <Route
//         path="/pharmacist"
//         element={
//           <ProtectedRoute allowedRoles={["pharmacist"]}>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<PharmacistDashboard />} />
//       </Route>

//       {/* 🛑 Fallback */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/Patient/Dashboard";
import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";
import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
import DoctorList from "./components/HospitalAdmin/DoctorList";
import PrescriptionPage from "./pages/doctor/PrescriptionPage";
import PatientsPage from "./pages/doctor/PatientsPage";
import ProfilePage from "./pages/doctor/ProfilePage";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/:role" element={<Register />} />

      {/* 🏥 Hospital Admin */}
      <Route
        path="/hospital/dashboard"
        element={
          <ProtectedRoute allowedRoles={["hospitaladmin"]}>
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/register-doctor"
        element={
          <ProtectedRoute allowedRoles={["hospitaladmin"]}>
            <RegisterDoctor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/doctor-list"
        element={
          <ProtectedRoute allowedRoles={["hospitaladmin"]}>
            <DoctorList />
          </ProtectedRoute>
        }
      />

      {/* 🩺 Doctor */}
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/prescribe"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <PrescriptionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <PatientsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* 👤 Patient */}
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* 💊 Pharmacist */}
      <Route
        path="/pharmacist/dashboard"
        element={
          <ProtectedRoute allowedRoles={["pharmacist"]}>
            <PharmacistDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🛑 Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
