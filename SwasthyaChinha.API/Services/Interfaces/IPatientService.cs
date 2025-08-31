
using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPatientService
    {
        Task<PatientProfileDTO> GetProfileAsync(string patientId);
        Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto);
        Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId);
        //Task<LastVisitDTO?> GetLastVisitAsync(string patientId);
       // Task<PatientPrescriptionDTO?> GetLastPrescriptionAsync(string patientId);
        Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query);
    }
}
