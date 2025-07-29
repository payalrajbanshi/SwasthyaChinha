using SwasthyaChinha.API.DTOs.Hospital;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IHospitalService
    {
        Task RegisterDoctorAsync(RegisterDoctorDTO dto);
        Task<List<DoctorStatsDTO>> GetDoctorStatsAsync(string hospitalId);
        Task<List<PatientStatsDTO>> GetPatientStatsAsync(string hospitalId);
        Task<HospitalStatsDTO> GetOverallStatsAsync(string hospitalId);
        // ✅ Added to match controller:
        Task<List<DoctorStatsDTO>> GetAllDoctorsAsync();
        Task<List<PatientStatsDTO>> GetAllPatientsAsync();
    }
}
