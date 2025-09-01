
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
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import DoctorDashboard from "./pages/doctor/DoctorDashboard";
// import PatientDashboard from "./pages/Patient/Dashboard";
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

//       {/* 🏥 Hospital Admin */}
//       <Route
//         path="/hospital/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <HospitalDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/hospital/register-doctor"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <RegisterDoctor />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/hospital/doctor-list"
//         element={
//           <ProtectedRoute allowedRoles={["hospitaladmin"]}>
//             <DoctorList />
//           </ProtectedRoute>
//         }
//       />

//       {/* 🩺 Doctor */}
//       <Route
//         path="/doctor/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <DoctorDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/doctor/prescribe"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <PrescriptionPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/doctor/patients"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <PatientsPage />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/doctor/profile"
//         element={
//           <ProtectedRoute allowedRoles={["doctor"]}>
//             <ProfilePage />
//           </ProtectedRoute>
//         }
//       />

//       {/* 👤 Patient */}
//       <Route
//         path="/patient/dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["patient"]}>
//             <PatientDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* 💊 Pharmacist */}
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
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PrescriptionPage from "./pages/doctor/PrescriptionPage";
import PatientsPage from "./pages/doctor/PatientsPage";
import ProfilePage from "./pages/doctor/ProfilePage";

import PatientDashboard from "./pages/Patient/Dashboard";
import Profile from "./pages/Patient/Profile";
import Notifications from "./pages/Patient/Notifications";
import PrescriptionDetail from "./pages/Patient/PrescriptionDetail";

import PharmacistDashboard from "./pages/Pharmacist/PharmacistDashboard";

import HospitalDashboard from "./pages/HospitalAdmin/Dashboard";
import RegisterDoctor from "./pages/HospitalAdmin/RegisterDoctor";
import DoctorList from "./components/HospitalAdmin/DoctorList";

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
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/notifications"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/prescription/:id"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <PrescriptionDetail />
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
