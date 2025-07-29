using SwasthyaChinha.API.DTOs.Doctor;

namespace SwasthyaChinha.API.DTOs.Pharmacist
{
    public class PrescriptionQRDTO
    {
        public string PrescriptionId { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
public string HospitalName { get; set; }

        public List<MedicineDTO> Medicines { get; set; }
        public bool IsDispensed { get; set; }
        // Base64 image string of QR code
        public string QRCodeData { get; set; }
         
    }
}