import pharmacistIcon from "../../assets/phar.png";

export default function PharmacistProfileCard({ pharmacist }) {
  if (!pharmacist) return null;

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded shadow-md mb-6">
      {/* Profile Picture */}
      <img
        src={pharmacist.profileImageUrl || pharmacistIcon}
        alt="Pharmacist"
        className="w-20 h-20 rounded-full object-cover border"
      />

      {/* Basic Info */}
      <div className="flex-1">
        <h2 className="text-xl font-bold">{pharmacist.fullName}</h2>
        <p className="text-gray-600">Pharmacy: {pharmacist.pharmacyName || "N/A"}</p>
        <p className="text-gray-600">License: {pharmacist.licenseNumber || "N/A"}</p>
        <p className="text-gray-600">Phone: {pharmacist.phoneNumber || "N/A"}</p>
        <p className="text-gray-600">Email: {pharmacist.email || "N/A"}</p>
      </div>
    </div>
  );
}
