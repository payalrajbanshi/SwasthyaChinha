using SwasthyaChinha.API.DTOs.Doctor;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IDoctorService
    {
        Task<DoctorProfileDTO> GetProfileAsync(string doctorId);
        Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId);
        Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId);
    }
}
