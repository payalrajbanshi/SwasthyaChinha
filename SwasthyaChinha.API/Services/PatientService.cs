// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.Services.Interfaces;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data; // Correct context
// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<PatientProfileDTO> GetProfileAsync(string patientId)
//         {
//             var patient = await _context.Patients.FindAsync(patientId);
//             if (patient == null) throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id,
//                 FullName = patient.FullName,
//                 //Email = patient.Email
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         public async Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto)
//         {
//             var patient = await _context.Patients.FindAsync(patientId);
//             if (patient == null) throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             //patient.Email = dto.Email;
//              patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;
//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId)
//         {
//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientId)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id,
//                     DoctorName = p.Doctor.FullName,
//                     HospitalName = p.Hospital.Name,
//                     DateIssued = p.CreatedAt.ToShortDateString(),
//                     Medicines = p.Items.Select(m => m.Name).ToList()
//                 }).ToListAsync();
//         }

//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
//         {
//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientId)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 }).ToListAsync();
//         }
//     }
// }
using SwasthyaChinha.API.DTOs.Patient;
using SwasthyaChinha.API.DTOs.Hospital;
using SwasthyaChinha.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.DTOs.Patient;


namespace SwasthyaChinha.API.Services
{
    public class PatientService : IPatientService
    {
        private readonly ApplicationDbContext _context;

        public PatientService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PatientProfileDTO> GetProfileAsync(string patientId)
        {
            var patient = await _context.Patients.FindAsync(patientId);
            if (patient == null) throw new Exception("Patient not found");

            return new PatientProfileDTO
            {
                Id = patient.Id.ToString(),
                FullName = patient.FullName,
                Address = patient.Address,
                PhoneNumber = patient.PhoneNumber,
                Gender = patient.Gender
            };
        }

        public async Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto)
        {
            var patient = await _context.Patients.FindAsync(patientId);
            if (patient == null) throw new Exception("Patient not found");

            patient.FullName = dto.FullName;
            patient.Address = dto.Address;
            patient.PhoneNumber = dto.PhoneNumber;
            patient.Gender = dto.Gender;

            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(String patientId)
        {
            if (!Guid.TryParse(patientId, out Guid patientGuid))
                throw new ArgumentException("Invalid patientId");
            return await _context.Prescriptions
                .Where(p => p.PatientId == patientGuid)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Items)
                .Select(p => new PatientPrescriptionDTO
                {
                    PrescriptionId = p.Id.ToString(),
                    DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
                    HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
                    DateIssued = p.CreatedAt,
                    Medicines = p.Items.Select(m => new MedicineDTO
                    {
                        Name = m.MedicineName,
                        Dosage = m.Dosage,
                        Price = m.Cost
                    }).ToList()
                }).ToListAsync();
            // Medicines = p.Items.Select(m => MedicineDTO
            //     {
            //         Name = m.MedicineName,
            //         Dosage = m.Dosage,
            //         Price=m.Cost
            //     }).ToList()
            // }).ToListAsync();
        }

        public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
        {
            if (!Guid.TryParse(patientId, out Guid patientGuid))
                throw new ArgumentException("Invalid patientId");

            return await _context.Prescriptions
                .Where(p => p.PatientId == patientGuid)
                .Select(p => new PatientExpenseDTO
                {
                    Date = p.CreatedAt,
                    Total = p.TotalCost
                }).ToListAsync();
        }
        public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
{
    return await _context.Users
        .Where(u => u.Role == "Patient" &&
                    (u.FullName.Contains(query) ||
                     u.Email.Contains(query) ||
                     u.PhoneNumber.Contains(query)))
        .Select(u => new PatientSearchResultDTO
        {
            Id = u.Id,
            Name = u.FullName,
            Email = u.Email,
            Phone = u.PhoneNumber
        })
        .Take(10)
        .ToListAsync();
}

    }
}
