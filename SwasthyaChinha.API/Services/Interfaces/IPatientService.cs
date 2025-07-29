using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IPatientService
    {
        Task<PatientProfileDTO> GetProfileAsync(string patientId);
        Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto);

        //Task UpdateProfileAsync(string patientId, UpdatePatientDTO dto);
        Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId);
        Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId);
    }
}
