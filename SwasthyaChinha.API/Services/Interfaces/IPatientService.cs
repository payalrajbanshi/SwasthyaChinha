// using SwasthyaChinha.API.DTOs.Patient;

// namespace SwasthyaChinha.API.Services.Interfaces
// {
//     public interface IPatientService
//     {
//         Task<PatientProfileDTO> GetProfileAsync(string patientId);
//         //Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto);

//         //Task UpdateProfileAsync(string patientId, UpdatePatientDTO dto);
//         Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId);
//         //Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId);
//         Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query);
//        //  Task<LastVisitDTO?> GetLastVisitAsync(string patientId);
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;

// namespace SwasthyaChinha.API.Services.Interfaces
// {
//     public interface IPatientService
//     {
//         Task<PatientProfileDTO> GetProfileAsync(string patientId);
//         Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId);
//         Task<LastVisitDTO?> GetLastVisitAsync(string patientId); // uncommented for last visit
//         Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query);
//     }
// }
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
