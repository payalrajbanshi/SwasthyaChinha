// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
// import { useNavigate } from "react-router-dom";

// const RegisterDoctor = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <button
//         onClick={() => navigate("/dashboard")}
//         className="mb-4 text-blue-600 hover:underline"
//       >
//         ← Back to Dashboard
//       </button>
//       <DoctorForm onSuccess={() => navigate("/dashboard")} />
//     </div>
//   );
// };

// export default RegisterDoctor;
import DoctorRegisterForm from "../../components/forms/DoctorRegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {
  const navigate = useNavigate();

  // Assuming you have hospitalId stored somewhere, e.g. localStorage or context
  const hospitalId = localStorage.getItem("hospitalId"); 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <DoctorRegisterForm
        hospitalId={hospitalId}
        onSuccess={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default RegisterDoctor;
