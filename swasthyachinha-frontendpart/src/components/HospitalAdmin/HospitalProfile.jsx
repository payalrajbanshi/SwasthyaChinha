// import { useState } from "react";
// import { updateHospitalProfile } from "../../services/hospitalService";

// const HospitalProfile = ({ stats }) => {
//   const [formData, setFormData] = useState({
//     name: stats?.HospitalName || "",
//     address: stats?.address || "",
//     logoUrl: stats?.logoUrl || "",
//   });
//   const hospitalId = localStorage.getItem("hospitalId");

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateHospitalProfile(hospitalId, formData);
//       alert("✅ Profile updated successfully");
//     } catch (err) {
//       alert("❌ Failed to update profile");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Hospital Profile</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input name="name" value={formData.name} onChange={handleChange} placeholder="Hospital Name" className="w-full border p-2 rounded" />
//         <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
//         <input name="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="Logo URL" className="w-full border p-2 rounded" />
//         <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
//       </form>
//     </div>
//   );
// };

// export default HospitalProfile;
import { useEffect, useState } from "react";
import API from "../../services/api";

const HospitalProfile = ({ stats, onUpdated }) => {
  const hospitalId = localStorage.getItem("hospitalId");

  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    HospitalName: "",
    address: "",
    logoUrl: "",
  });

  // keep form in sync when stats load/refresh
  useEffect(() => {
    setForm({
      HospitalName: stats?.HospitalName || "",
      address: stats?.address || "",
      logoUrl: stats?.logoUrl || "",
    });
  }, [stats]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!hospitalId) return;

    try {
      setSaving(true);
      // adjust endpoint/payload to your backend contract
      const { data } = await API.put(`/hospital/updateProfile`, {
        hospitalId,
        HospitalName: form.HospitalName,
        address: form.address,
        logoUrl: form.logoUrl,
      });
      // reflect changes locally
      onUpdated?.({
        ...stats,
        ...form,
        ...data, // in case backend returns canonical fields
      });
      setEdit(false);
    } catch (err) {
      console.error("❌ Failed to update hospital profile:", err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // View mode (your top hero block look)
  if (!edit) {
    return (
      <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
        {form.logoUrl ? (
          <img
            src={form.logoUrl}
            alt="Hospital Logo"
            className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center text-green-700 font-bold">
            {form.HospitalName?.charAt(0) || "H"}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-800">{form.HospitalName || "Hospital"}</h1>
          <p className="text-gray-600">{form.address || "—"}</p>
        </div>
        <button
          onClick={() => setEdit(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  // Edit mode
  return (
    <form onSubmit={save} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Edit Hospital Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Hospital Name</label>
          <input
            name="HospitalName"
            value={form.HospitalName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div className="">
          <label className="block text-sm text-gray-600 mb-1">Logo URL</label>
          <input
            name="logoUrl"
            value={form.logoUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://..."
          />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm text-gray-600 mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => setEdit(false)}
          className="px-4 py-2 rounded-lg border shadow-sm hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default HospitalProfile;
