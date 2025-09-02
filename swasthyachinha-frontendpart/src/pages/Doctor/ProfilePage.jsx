// import React, { useEffect, useState } from "react";
// import api from "../../services/api";

// const ProfilePage = () => {
//   const [doctor, setDoctor] = useState({
//     fullName: "",
//     specialty: "",
//     profilePicture: "",
//   });
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     api.get("/doctor/profile").then((res) => setDoctor(res.data));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", doctor.fullName);
//     formData.append("specialty", doctor.specialty);
//     if (file) formData.append("profilePicture", file);

//     await api.put("/doctor/profile", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert("Profile updated!");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             value={doctor.fullName}
//             onChange={(e) => setDoctor({ ...doctor, fullName: e.target.value })}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Specialty</label>
//           <input
//             type="text"
//             value={doctor.specialty}
//             onChange={(e) =>
//               setDoctor({ ...doctor, specialty: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Profile Picture</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;


// import React, { useEffect, useState } from "react";
// import api from "../../services/api";

// const ProfilePage = ({ doctor, setDoctor }) => { // receive doctor and setDoctor from parent
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (!doctor.fullName) { // fetch profile only if not already in state
//       api.get("/doctor/profile").then((res) => setDoctor(res.data));
//     }
//   }, [doctor, setDoctor]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", doctor.fullName);
//     formData.append("specialty", doctor.specialty);
//     if (file) formData.append("profilePicture", file);

//     try {
//       const res = await api.put("/doctor/profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // Update parent state so sidebar updates immediately
//       setDoctor(res.data);
//       alert("Profile updated!");
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             value={doctor.fullName}
//             onChange={(e) => setDoctor({ ...doctor, fullName: e.target.value })}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Specialty</label>
//           <input
//             type="text"
//             value={doctor.specialty}
//             onChange={(e) => setDoctor({ ...doctor, specialty: e.target.value })}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Profile Picture</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;
// import React, { useEffect, useState } from "react";
// import api from "../../services/api";

// const ProfilePage = ({ doctor = {}, setDoctor = () => {} }) => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch doctor profile only if not already in state
//   useEffect(() => {
//     if (!doctor.fullName) {
//       api
//         .get("/doctor/profile")
//         .then((res) => setDoctor(res.data))
//         .catch((err) => console.error("Failed to fetch profile:", err));
//     }
//   }, [doctor, setDoctor]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("fullName", doctor.fullName || "");
//     formData.append("specialty", doctor.specialty || "");
//     if (file) formData.append("ProfilePicture", file);

//     try {
//       const res = await api.put("/doctor/profile", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setDoctor(res.data); // update parent state immediately
//       alert("✅ Profile updated!");
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       alert("❌ Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
//         {/* Full Name */}
//         <div>
//           <label className="block mb-1 font-semibold">Full Name</label>
//           <input
//             type="text"
//             value={doctor.fullName || ""}
//             onChange={(e) =>
//               setDoctor({ ...doctor, fullName: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Specialty */}
//         <div>
//           <label className="block mb-1 font-semibold">Specialty</label>
//           <input
//             type="text"
//             value={doctor.specialty || ""}
//             onChange={(e) =>
//               setDoctor({ ...doctor, specialty: e.target.value })
//             }
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         {/* Profile Picture */}
//         <div>
//           <label className="block mb-1 font-semibold">Profile Picture</label>
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full"
//           />
//           {doctor.profilePicture && !file && (
//             <img
//               src={doctor.profilePicture}
//               alt="Current profile"
//               className="mt-2 w-20 h-20 rounded-full border"
//             />
//           )}
//           {file && (
//             <p className="mt-2 text-sm text-gray-600">
//               Selected file: {file.name}
//             </p>
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
//             loading ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };


// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Sidebar from "../../components/dashboard/Sidebar";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     specialty: "",
//     profilePicture: null
//   });
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Fetch doctor profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/doctor/profile");
//         setProfile(res.data);
//         setFormData({
//           fullName: res.data.fullName,
//           specialty: res.data.specialty,
//           profilePicture: null
//         });
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePicture") {
//       setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);

//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Specialty", formData.specialty);
//       if (formData.profilePicture) {
//         data.append("ProfilePicture", formData.profilePicture);
//       }

//       const res = await api.put("/doctor/profile", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       console.log("Profile updated:", res.data);
//       setProfile(res.data);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Failed to update profile. See console for details.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="p-10">⏳ Loading profile...</div>;
//   if (!profile) return <div className="p-10 text-red-600">❌ Failed to load profile.</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar doctor={profile} />

//       <main className="flex-1 p-10">
//         <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg"
//         >
//           {/* Profile Image */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={profile.profileImageUrl || "/default-avatar.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border"
//             />
//             <input
//               type="file"
//               name="profilePicture"
//               accept="image/*"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           {/* Specialty */}
//           <div>
//             <label className="block text-gray-700 mb-1">Specialty</label>
//             <input
//               type="text"
//               name="specialty"
//               value={formData.specialty}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           {/* Email (read-only) */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={profile.email}
//               readOnly
//               className="w-full border p-2 rounded-lg bg-gray-100"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${
//               updating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {updating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

// //export default ProfilePage;
// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Sidebar from "../../components/dashboard/Sidebar";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({ fullName: "", specialty: "", profilePicture: null });
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         //const res = await api.get("/doctor/profile");
//         const res = await api.put("/doctor/profile", data, {
//   headers: { "Content-Type": "multipart/form-data" }
// });
// const updatedProfile = res.data;
// if (updatedProfile.profileImageUrl) {
//   updatedProfile.profileImageUrl = `${updatedProfile.profileImageUrl}?t=${new Date().getTime()}`;
// }
//         setProfile(res.data);
//         setFormData({ fullName: res.data.fullName, specialty: res.data.specialty, profilePicture: null });
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePicture") setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
//     else setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Specialty", formData.specialty);
//       if (formData.profilePicture) data.append("ProfilePicture", formData.profilePicture);

//       const res = await api.put("/doctor/profile", data, { headers: { "Content-Type": "multipart/form-data" } });

//       setProfile(res.data); // Update profile state
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Failed to update profile. Check console.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="p-10">⏳ Loading profile...</div>;
//   if (!profile) return <div className="p-10 text-red-600">❌ Failed to load profile.</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar doctor={profile} />

//       <main className="flex-1 p-10">
//         <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg">
//           <div className="flex items-center space-x-4">
//             <img
//               src={profile.profileImageUrl || "/default-avatar.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border"
//             />
//             <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Specialty</label>
//             <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} className="w-full border p-2 rounded-lg" required />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input type="email" value={profile.email} readOnly className="w-full border p-2 rounded-lg bg-gray-100" />
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             {updating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Sidebar from "../../components/dashboard/Sidebar";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({ fullName: "", specialty: "", profilePicture: null });
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Fetch doctor profile on mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/doctor/profile"); // ✅ GET instead of PUT
//         setProfile(res.data);
//         setFormData({
//           fullName: res.data.fullName,
//           specialty: res.data.specialty,
//           profilePicture: null
//         });
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePicture") {
//       setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);

//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Specialty", formData.specialty);
//       if (formData.profilePicture) data.append("ProfilePicture", formData.profilePicture);

//       const res = await api.put("/doctor/profile", data, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       // ✅ Add cache-buster to force new image render
//       const updatedProfile = res.data;
//       if (updatedProfile.profileImageUrl) {
//         updatedProfile.profileImageUrl = `${updatedProfile.profileImageUrl}?t=${new Date().getTime()}`;
//       }

//       setProfile(updatedProfile);
//       setFormData({
//         fullName: updatedProfile.fullName,
//         specialty: updatedProfile.specialty,
//         profilePicture: null
//       });

//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Failed to update profile. Check console.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="p-10">⏳ Loading profile...</div>;
//   if (!profile) return <div className="p-10 text-red-600">❌ Failed to load profile.</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar doctor={profile} />

//       <main className="flex-1 p-10">
//         <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg">
//           {/* Profile Image */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={profile.profileImageUrl || "/default-avatar.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border"
//             />
//             <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
//           </div>

//           {/* Full Name */}
//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           {/* Specialty */}
//           <div>
//             <label className="block text-gray-700 mb-1">Specialty</label>
//             <input
//               type="text"
//               name="specialty"
//               value={formData.specialty}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           {/* Email (read-only) */}
//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={profile.email}
//               readOnly
//               className="w-full border p-2 rounded-lg bg-gray-100"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${
//               updating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {updating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Sidebar from "../../components/dashboard/Sidebar";
// import { Upload } from "lucide-react";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({ fullName: "", specialty: "", profilePicture: null });
//   const [previewUrl, setPreviewUrl] = useState(null); // NEW
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/doctor/profile");
//         setProfile(res.data);
//         setFormData({ fullName: res.data.fullName, specialty: res.data.specialty, profilePicture: null });
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePicture") {
//       setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
//       setPreviewUrl(URL.createObjectURL(files[0])); // NEW: create preview
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     try {
//       const data = new FormData();
//       data.append("FullName", formData.fullName);
//       data.append("Specialty", formData.specialty);
//       if (formData.profilePicture) data.append("ProfilePicture", formData.profilePicture);

//       const res = await api.put("/doctor/profile", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setProfile(Upload);
//       setPreviewUrl(null); // clear preview after upload
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Failed to update profile. Check console.");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   if (loading) return <div className="p-10">⏳ Loading profile...</div>;
//   if (!profile) return <div className="p-10 text-red-600">❌ Failed to load profile.</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Pass previewUrl if exists, otherwise profile.profileImageUrl */}
//       <Sidebar doctor={{ ...profile, profileImageUrl: previewUrl || profile.profileImageUrl }} />

//       <main className="flex-1 p-10">
//         <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg">
//           <div className="flex items-center space-x-4">
//             <img
//               src={previewUrl || profile.profileImageUrl || "/default-avatar.png"}
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover border"
//             />
//             <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Specialty</label>
//             <input
//               type="text"
//               name="specialty"
//               value={formData.specialty}
//               onChange={handleChange}
//               className="w-full border p-2 rounded-lg"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               value={profile.email}
//               readOnly
//               className="w-full border p-2 rounded-lg bg-gray-100"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={updating}
//             className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${
//               updating ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {updating ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/dashboard/Sidebar";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", specialty: "", profilePicture: null });
  const [previewUrl, setPreviewUrl] = useState(null); // temporary preview
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/doctor/profile");
        const data = res.data;
        setProfile(data);
        setFormData({
          fullName: data.fullName || "",
          specialty: data.specialty || "",
          profilePicture: null,
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files?.length > 0) {
      setFormData((prev) => ({ ...prev, profilePicture: files[0] }));
      setPreviewUrl(URL.createObjectURL(files[0])); // instant preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const data = new FormData();
      data.append("FullName", formData.fullName);
      data.append("Specialty", formData.specialty);
      if (formData.profilePicture) data.append("ProfilePicture", formData.profilePicture);

      const res = await api.put("/doctor/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedProfile = res.data;
      // Force refresh image by appending timestamp
      if (updatedProfile.profileImageUrl) {
        updatedProfile.profileImageUrl = `${updatedProfile.profileImageUrl}?t=${new Date().getTime()}`;
      }

      setProfile(updatedProfile);
      setPreviewUrl(null); // clear temporary preview
      setFormData((prev) => ({ ...prev, profilePicture: null }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile. Check console.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10">⏳ Loading profile...</div>;
  if (!profile) return <div className="p-10 text-red-600">❌ Failed to load profile.</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar doctor={{ ...profile, profileImageUrl: previewUrl || profile.profileImageUrl }} />

      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">Manage Profile</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 max-w-lg">
          <div className="flex items-center space-x-4">
            <img
              src={previewUrl || profile.profileImageUrl || "/default-avatar.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={profile.email || ""}
              readOnly
              className="w-full border p-2 rounded-lg bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </main>
    </div>
  );
}
