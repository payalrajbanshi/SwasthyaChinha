using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPrescriptionService
    {
        Task<Prescription> CreatePrescriptionAsync(Prescription prescription);
        Task<Prescription?> GetPrescriptionByIdAsync(int id);
        Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync();
        Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData);
        Task<bool> MarkAsDispensedAsync(string prescriptionId);


    }
}
