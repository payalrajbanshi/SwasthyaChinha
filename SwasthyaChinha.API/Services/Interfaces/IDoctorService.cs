using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IDoctorService
    {
        Task<DoctorProfileDTO> GetProfileAsync(string doctorId);
        Task<PrescriptionQRDTO> CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId);
        Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId);
        Task<DoctorStatsDTO> GetStatsAsync(string doctorId);
        Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query);
        Task<int> GetTotalRegisteredPatientsAsync();
            Task<DoctorProfileDTO> UpdateProfileAsync(UpdateDoctorProfileDTO dto, string doctorId);


        
    }
}
