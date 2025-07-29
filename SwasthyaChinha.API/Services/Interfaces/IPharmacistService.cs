using SwasthyaChinha.API.DTOs.Pharmacist;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPharmacistService
    {
        Task<PrescriptionQRDTO> GetPrescriptionByQRAsync(string prescriptionId);
        Task DispenseMedicineAsync(DispenseDTO dto);
    }
}
