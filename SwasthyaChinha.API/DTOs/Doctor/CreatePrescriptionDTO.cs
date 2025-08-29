using System.Collections.Generic;
using SwasthyaChinha.API.DTOs.Doctor;

namespace SwasthyaChinha.API.DTOs.Doctor
{

    public class CreatePrescriptionDTO
    {
        public string PatientId { get; set; }
        public string HospitalId { get; set; }
        public List<CreateMedicineDTO> Medicines { get; set; }
        public string Diagnosis { get; set; }
    }
}
