import {
  Users,
  Stethoscope,
  FileText,
  Wallet,
} from "lucide-react";

const icons = {
  doctors: <Stethoscope className="w-8 h-8 text-blue-500" />,
  patients: <Users className="w-8 h-8 text-green-500" />,
  prescriptions: <FileText className="w-8 h-8 text-yellow-500" />,
  revenue: <Wallet className="w-8 h-8 text-purple-500" />,
};

const StatCard = ({ label, value, type }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <div className="flex justify-center mb-4">{icons[type]}</div>
      <h3 className="font-semibold text-lg mb-2">{label}</h3>
      <p className="text-gray-700 text-xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
