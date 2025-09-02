// namespace SwasthyaChinha.API.DTOs.Doctor
// {
//     public class PrescriptionQRCodeDTO
//     {
//         public string QRCode { get; set; }       // Base64 QR image
//         public string QRCodeData { get; set; }   // Raw QRID fallback
//     }
// }

namespace SwasthyaChinha.API.DTOs.Doctor
{
    public class PrescriptionQRDTO   // <-- match interface
    {
        public string PrescriptionId { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string HospitalName { get; set; }
        public List<MedicineDTO> Medicines { get; set; } = new List<MedicineDTO>();
        public bool IsDispensed { get; set; }
        public string QRCode { get; set; }       // Base64 QR image
        public string QRCodeData { get; set; }   // Raw QRID fallback
    }

    // public class MedicineDTO
    // {
    //     public string Name { get; set; }
    //     public string Dosage { get; set; }
    //     public decimal Price { get; set; }
    // }
}
