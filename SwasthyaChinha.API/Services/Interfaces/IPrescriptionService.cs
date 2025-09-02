using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.DTOs.Patient;
using DoctorDTOs = SwasthyaChinha.API.DTOs.Doctor;


namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPrescriptionService
    {
        Task<Prescription> CreatePrescriptionAsync(Prescription prescription, string? manualQrId=null);
        Task<Prescription?> GetPrescriptionByIdAsync(int id);
        Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync();
        Task<DoctorDTOs.PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData);
        Task<bool> MarkAsDispensedAsync(string prescriptionId);
              //  Task<LastPrescriptionDTO?> GetLastPrescriptionAsync(Guid patientId);
       // Task<LastVisitDTO> GetLastVisitAsync(Guid patientId);

    }
}
