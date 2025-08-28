import React, { useEffect, useState } from "react";
import api from "../../services/api";

const ProfilePage = () => {
  const [doctor, setDoctor] = useState({
    fullName: "",
    specialty: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get("/doctor/profile").then((res) => setDoctor(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", doctor.fullName);
    formData.append("specialty", doctor.specialty);
    if (file) formData.append("profilePicture", file);

    await api.put("/doctor/profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Profile updated!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-semibold">Full Name</label>
          <input
            type="text"
            value={doctor.fullName}
            onChange={(e) => setDoctor({ ...doctor, fullName: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Specialty</label>
          <input
            type="text"
            value={doctor.specialty}
            onChange={(e) =>
              setDoctor({ ...doctor, specialty: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Profile Picture</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
