
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
