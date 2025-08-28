import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p><strong>Name:</strong> {profile.fullName}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Phone:</strong> {profile.phoneNumber}</p>
      <p><strong>Address:</strong> {profile.address}</p>
    </div>
  );
}
