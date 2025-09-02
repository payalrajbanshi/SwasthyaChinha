using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Models;
namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPharmacistService
    {
        //Task<PrescriptionQRDTO> GetPrescriptionByQRAsync(string prescriptionId);
        //Task DispenseMedicineAsync(DispenseDTO dto);
        Task<User?> GetProfileAsync(Guid userId);
        Task<PrescriptionDTO> GetPrescriptionByQrIdAsync(string qrId);

        
    }
}
