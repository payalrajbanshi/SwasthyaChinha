using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPrescriptionService
    {
        Task<Prescription> CreatePrescriptionAsync(Prescription prescription);
        Task<Prescription?> GetPrescriptionByIdAsync(int id);
        Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync();
        Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData);
        Task<bool> MarkAsDispensedAsync(string prescriptionId);
              //  Task<LastPrescriptionDTO?> GetLastPrescriptionAsync(Guid patientId);
       // Task<LastVisitDTO> GetLastVisitAsync(Guid patientId);

    }
}
