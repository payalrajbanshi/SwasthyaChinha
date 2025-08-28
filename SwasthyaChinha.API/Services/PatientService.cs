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
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Hospital;
// using SwasthyaChinha.API.Services.Interfaces;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data;
// using Microsoft.AspNetCore.Authorization.Infrastructure;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.DTOs.Patient;


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
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
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
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(String patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patientId");
//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 }).ToListAsync();
//             // Medicines = p.Items.Select(m => MedicineDTO
//             //     {
//             //         Name = m.MedicineName,
//             //         Dosage = m.Dosage,
//             //         Price=m.Cost
//             //     }).ToList()
//             // }).ToListAsync();
//         }

//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patientId");

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 }).ToListAsync();
//         }
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
// {
//     return await _context.Users
//         .Where(u => u.Role == "Patient" &&
//                     (u.FullName.Contains(query) ||
//                      u.Email.Contains(query) ||
//                      u.PhoneNumber.Contains(query)))
//         .Select(u => new PatientSearchResultDTO
//         {
//             Id = u.Id.ToString(),
//             Name = u.FullName,
//             Email = u.Email,
//             Phone = u.PhoneNumber
//         })
//         .Take(10)
//         .ToListAsync();
// }

//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Hospital;
// using SwasthyaChinha.API.Services.Interfaces;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.DTOs.Doctor;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<PatientProfileDTO?> GetProfileAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 return null;

//             var patient = await _context.Patients
//                 .AsNoTracking()
//                 .FirstOrDefaultAsync(p => p.Id == patientGuid);

//             if (patient == null)
//                 return null;

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName ?? "N/A",
//                 Address = patient.Address ?? "N/A",
//                 PhoneNumber = patient.PhoneNumber ?? "N/A",
//                 Gender = patient.Gender ?? "N/A"
//             };
//         }

//         public async Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patientId");

//             var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == patientGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 return new List<PatientPrescriptionDTO>();

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .OrderByDescending(p => p.CreatedAt)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 })
//                 .ToListAsync();
//         }

//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 return new List<PatientExpenseDTO>();

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .OrderByDescending(p => p.CreatedAt)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 })
//                 .ToListAsync();
//         }

//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return new List<PatientSearchResultDTO>();

//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // ✅ Get Profile
//         public async Task<PatientProfileDTO> GetProfileAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new Exception("Invalid patient ID");

//             var patient = await _context.Patients.FindAsync(patientGuid);
//             if (patient == null) throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender,
//                // Email = patient.Email // optional
//             };
//         }

//         // ✅ Update Profile
//         public async Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new Exception("Invalid patient ID");

//             var patient = await _context.Patients.FindAsync(patientGuid);
//             if (patient == null) throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         // ✅ Get Prescriptions
//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patient ID");

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 }).ToListAsync();
//         }

//         // ✅ Get Expenses
//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patient ID");

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 }).ToListAsync();
//         }

//         // ✅ Search Patients
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // ✅ Get patient profile
//         public async Task<PatientProfileDTO> GetProfileAsync(string patientId)
//         {
//             if (string.IsNullOrEmpty(patientId))
//                 throw new ArgumentException("Invalid patientId");

//             var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id.ToString() == patientId);
//             if (patient == null)
//                 throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 //Email = patient.Email,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         // ✅ Update patient profile
//         public async Task UpdatePatientProfileAsync(string patientId, UpdatePatientDTO dto)
//         {
//             if (string.IsNullOrEmpty(patientId))
//                 throw new ArgumentException("Invalid patientId");

//             var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id.ToString() == patientId);
//             if (patient == null)
//                 throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         // ✅ Get prescriptions
//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patient ID");

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 }).ToListAsync();
//         }

//         // ✅ Get expenses
//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out Guid patientGuid))
//                 throw new ArgumentException("Invalid patient ID");

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 }).ToListAsync();
//         }

//         // ✅ Search patients
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Models;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         //✅ Get patient profile by UserId
//         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             var patient = await _context.Patients
//                 .Include(p => p.User)
//                 .FirstOrDefaultAsync(p => p.UserId.ToString() == userId);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         //✅ Update patient profile
//         public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId.ToString() == userId);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         // ✅ Get prescriptions
//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//         {
//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId.ToString() == userId);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 }).ToListAsync();
//         }

//         // ✅ Get expenses
//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string userId)
//         {
//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId.ToString() == userId);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 }).ToListAsync();
//         }

//         // ✅ Search patients
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return new List<PatientSearchResultDTO>();

//             return await _context.Patients
//                 .Include(p => p.User)
//                 .Where(p => p.User != null &&
//                             (p.User.FullName.Contains(query) ||
//                              p.User.Email.Contains(query) ||
//                              p.User.PhoneNumber.Contains(query)))
//                 .Select(p => new PatientSearchResultDTO
//                 {
//                     Id = p.Id.ToString(),
//                     Name = p.FullName,
//                     Email = p.User!.Email,
//                     Phone = p.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Models;
//  using SwasthyaChinha.API.DTOs.Patient;
// // using SwasthyaChinha.API.DTOs.Doctor;
// // using SwasthyaChinha.API.Services.Interfaces;
// namespace SwasthyaChinha.API.Services
// {
//     //     public class PatientService : IPatientService
//     //     {
//     //         private readonly ApplicationDbContext _context;

//     //         public PatientService(ApplicationDbContext context)
//     //         {
//     //             _context = context;
//     //         }

//     //         // ✅ Get patient profile by UserId
//     //         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//     //         {
//     //             if (string.IsNullOrEmpty(userId))
//     //                 throw new ArgumentException("Invalid userId");

//     //             if (!Guid.TryParse(userId, out var userGuid))
//     //                 throw new Exception("Invalid userId format");

//     //             var patient = await _context.Patients
//     //                 .Include(p => p.User)
//     //                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//     //             if (patient == null)
//     //                 throw new Exception("Patient not found");

//     //             return new PatientProfileDTO
//     //             {
//     //                 Id = patient.Id.ToString(),
//     //                 FullName = patient.FullName,
//     //                 Address = patient.Address,
//     //                 PhoneNumber = patient.PhoneNumber,
//     //                 Gender = patient.Gender
//     //             };
//     //         }

//     //         // ✅ Update patient profile
//     //         public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
//     //         {
//     //             if (string.IsNullOrEmpty(userId))
//     //                 throw new ArgumentException("Invalid userId");

//     //             if (!Guid.TryParse(userId, out var userGuid))
//     //                 throw new Exception("Invalid userId format");

//     //             var patient = await _context.Patients
//     //                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//     //             if (patient == null)
//     //                 throw new Exception("Patient not found");

//     //             patient.FullName = dto.FullName;
//     //             patient.Address = dto.Address;
//     //             patient.PhoneNumber = dto.PhoneNumber;
//     //             patient.Gender = dto.Gender;

//     //             _context.Patients.Update(patient);
//     //             await _context.SaveChangesAsync();
//     //         }

//     //         // ✅ Get prescriptions
//     //         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//     //         {
//     //             if (!Guid.TryParse(userId, out var userGuid))
//     //                 throw new Exception("Invalid userId format");

//     //             var patient = await _context.Patients
//     //                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//     //             if (patient == null)
//     //                 throw new Exception("Patient not found");

//     //             var patientGuid = patient.Id;

//     //             return await _context.Prescriptions
//     //                 .Where(p => p.PatientId == patientGuid)
//     //                 .Include(p => p.Doctor)
//     //                 .Include(p => p.Hospital)
//     //                 .Include(p => p.Items)
//     //                 .Select(p => new PatientPrescriptionDTO
//     //                 {
//     //                     PrescriptionId = p.Id.ToString(),
//     //                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//     //                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//     //                     DateIssued = p.CreatedAt,
//     //                     Medicines = p.Items.Select(m => new MedicineDTO
//     //                     {
//     //                         Name = m.MedicineName,
//     //                         Dosage = m.Dosage,
//     //                         Price = m.Cost
//     //                     }).ToList()
//     //                 }).ToListAsync();
//     //         }

//     //         // ✅ Get expenses
//     //         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string userId)
//     //         {
//     //             if (!Guid.TryParse(userId, out var userGuid))
//     //                 throw new Exception("Invalid userId format");

//     //             var patient = await _context.Patients
//     //                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//     //             if (patient == null)
//     //                 throw new Exception("Patient not found");

//     //             var patientGuid = patient.Id;

//     //             return await _context.Prescriptions
//     //                 .Where(p => p.PatientId == patientGuid)
//     //                 .Select(p => new PatientExpenseDTO
//     //                 {
//     //                     Date = p.CreatedAt,
//     //                     Total = p.TotalCost
//     //                 }).ToListAsync();
//     //         }

//     //         // ✅ Search patients
//     //         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//     //         {
//     //             if (string.IsNullOrWhiteSpace(query))
//     //                 return new List<PatientSearchResultDTO>();

//     //             return await _context.Patients
//     //                 .Include(p => p.User)
//     //                 .Where(p => p.User != null &&
//     //                             (p.User.FullName.Contains(query) ||
//     //                              p.User.Email.Contains(query) ||
//     //                              p.User.PhoneNumber.Contains(query)))
//     //                 .Select(p => new PatientSearchResultDTO
//     //                 {
//     //                     Id = p.Id.ToString(),
//     //                     Name = p.FullName,
//     //                     Email = p.User!.Email,
//     //                     Phone = p.PhoneNumber
//     //                 })
//     //                 .Take(10)
//     //                 .ToListAsync();
//     //         }
//     //     }
//     // }
//     // PatientService.cs (quick fix)
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var guid))
//                 throw new Exception("Invalid userId");

//             var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == guid && u.Role == "Patient");
//             if (user == null) throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = user.Id.ToString(),
//                 FullName = user.FullName,
//                 Email = user.Email,
//                 PhoneNumber = user.PhoneNumber,
//                 Gender = user.Gender,
//                 DateOfBirth = user.DateOfBirth,
//                 ProfileImageUrl = user.ProfileImageUrl
//             };
//         }

//         public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
//         {
//             if (!Guid.TryParse(userId, out var guid))
//                 throw new Exception("Invalid userId");

//             var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == guid && u.Role == "Patient");
//             if (user == null) throw new Exception("Patient not found");

//             user.FullName = dto.FullName;
//             user.PhoneNumber = dto.PhoneNumber;
//             user.Gender = dto.Gender;
//             user.DateOfBirth = dto.DateOfBirth;

//             _context.Users.Update(user);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var guid))
//                 throw new Exception("Invalid userId");

//             // Use PatientId = user.Id for prescriptions
//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == guid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 }).ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Models;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // ✅ Get patient profile by UserId
//         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .Include(p => p.User)
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         // ✅ Update patient profile
//         public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             patient.FullName = dto.FullName;
//             patient.Address = dto.Address;
//             patient.PhoneNumber = dto.PhoneNumber;
//             patient.Gender = dto.Gender;

//             _context.Patients.Update(patient);
//             await _context.SaveChangesAsync();
//         }

//         // ✅ Get prescriptions for logged-in patient
//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 })
//                 .ToListAsync();
//         }

//         // ✅ Get expenses for logged-in patient
//         public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Select(p => new PatientExpenseDTO
//                 {
//                     Date = p.CreatedAt,
//                     Total = p.TotalCost
//                 })
//                 .ToListAsync();
//         }

//         // ✅ Search patients (for doctors/hospital admin)
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return new List<PatientSearchResultDTO>();

//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//         public async Task<LastVisitDTO?> GetLastVisitAsync(string patientId)
//         {
//             var lastVisit = await _dbContext.Prescriptions
//                 .Where(p => p.PatientId == patientId)
//                 .OrderByDescending(p => p.DateIssued)
//                 .FirstOrDefaultAsync();

//             if (lastVisit == null) return null;

//             return new LastVisitDTO
//             {
//                 // PrescriptionId = lastVisit.Id,
//                 // Date = lastVisit.DateIssued,
//                 // DoctorName = lastVisit.Doctor.FullName
//                     HospitalName = lastVisit.Hospital != null ? lastVisit.Hospital.Name : "N/A",
//     DoctorName = lastVisit.Doctor != null ? lastVisit.Doctor.FullName : "N/A",
//     VisitDate = lastVisit.DateIssued
//             };
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Models;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         // Get patient profile by UserId
//         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .Include(p => p.User)
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         // // Update patient profile
//         // public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
//         // {
//         //     if (string.IsNullOrEmpty(userId))
//         //         throw new ArgumentException("Invalid userId");

//         //     if (!Guid.TryParse(userId, out var userGuid))
//         //         throw new Exception("Invalid userId format");

//         //     var patient = await _context.Patients
//         //         .FirstOrDefaultAsync(p => p.UserId == userGuid);

//         //     if (patient == null)
//         //         throw new Exception("Patient not found");

//         //     patient.FullName = dto.FullName;
//         //     patient.Address = dto.Address;
//         //     patient.PhoneNumber = dto.PhoneNumber;
//         //     patient.Gender = dto.Gender;

//         //     _context.Patients.Update(patient);
//         //     await _context.SaveChangesAsync();
//         // }

//         // Get prescriptions for logged-in patient
//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 })
//                 .ToListAsync();
//         }

//         // Get expenses for logged-in patient
//         // public async Task<List<PatientExpenseDTO>> GetExpensesAsync(string userId)
//         // {
//         //     if (!Guid.TryParse(userId, out var userGuid))
//         //         throw new Exception("Invalid userId format");

//         //     var patient = await _context.Patients
//         //         .FirstOrDefaultAsync(p => p.UserId == userGuid);

//         //     if (patient == null)
//         //         throw new Exception("Patient not found");

//         //     var patientGuid = patient.Id;

//         //     return await _context.Prescriptions
//         //         .Where(p => p.PatientId == patientGuid)
//         //         .Select(p => new PatientExpenseDTO
//         //         {
//         //             Date = p.CreatedAt,
//         //             Total = p.TotalCost
//         //         })
//         //         .ToListAsync();
//         // }

//         // Search patients (for doctors/hospital admin)
//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return new List<PatientSearchResultDTO>();

//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }

//      //   Get last visit for a patient
//     //     public async Task<LastVisitDTO?> GetLastVisitAsync(string patientId)
//     //     {
//     //             // ✅ Convert string to Guid
//     // if (!Guid.TryParse(patientId, out var patientGuid))
//     //     throw new Exception("Invalid patientId format");

//     //         var lastVisit = await _context.Prescriptions
//     //             .Where(p => p.PatientId == patientGuid)
//     //             .OrderByDescending(p => p.CreatedAt)
//     //             .Include(p => p.Doctor)
//     //             .Include(p => p.Hospital)
//     //             .FirstOrDefaultAsync();

//     //         if (lastVisit == null) return null;

//     //         return new LastVisitDTO
//     //         {
//     //             HospitalName = lastVisit.Hospital != null ? lastVisit.Hospital.Name : "N/A",
//     //             DoctorName = lastVisit.Doctor != null ? lastVisit.Doctor.FullName : "N/A",
//     //             VisitDate = lastVisit.CreatedAt
//     //         };
//     //     }
//     }
// }
// using SwasthyaChinha.API.DTOs.Patient;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class PatientService : IPatientService
//     {
//         private readonly ApplicationDbContext _context;

//         public PatientService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<PatientProfileDTO> GetProfileAsync(string userId)
//         {
//             if (string.IsNullOrEmpty(userId))
//                 throw new ArgumentException("Invalid userId");

//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .Include(p => p.User)
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             return new PatientProfileDTO
//             {
//                 Id = patient.Id.ToString(),
//                 FullName = patient.FullName,
//                 Address = patient.Address,
//                 PhoneNumber = patient.PhoneNumber,
//                 Gender = patient.Gender
//             };
//         }

//         public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
//         {
//             if (!Guid.TryParse(userId, out var userGuid))
//                 throw new Exception("Invalid userId format");

//             var patient = await _context.Patients
//                 .FirstOrDefaultAsync(p => p.UserId == userGuid);

//             if (patient == null)
//                 throw new Exception("Patient not found");

//             var patientGuid = patient.Id;

//             return await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .Include(p => p.Items)
//                 .Select(p => new PatientPrescriptionDTO
//                 {
//                     PrescriptionId = p.Id.ToString(),
//                     DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
//                     HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
//                     DateIssued = p.CreatedAt,
//                     Medicines = p.Items.Select(m => new MedicineDTO
//                     {
//                         Name = m.MedicineName,
//                         Dosage = m.Dosage,
//                         Price = m.Cost
//                     }).ToList()
//                 })
//                 .ToListAsync();
//         }

//         public async Task<LastVisitDTO?> GetLastVisitAsync(string patientId)
//         {
//             if (!Guid.TryParse(patientId, out var patientGuid))
//                 throw new Exception("Invalid patientId format");

//             var lastVisit = await _context.Prescriptions
//                 .Where(p => p.PatientId == patientGuid)
//                 .OrderByDescending(p => p.CreatedAt)
//                 .Include(p => p.Doctor)
//                 .Include(p => p.Hospital)
//                 .FirstOrDefaultAsync();

//             if (lastVisit == null) return null;

//             return new LastVisitDTO
//             {
//                 HospitalName = lastVisit.Hospital != null ? lastVisit.Hospital.Name : "N/A",
//                 DoctorName = lastVisit.Doctor != null ? lastVisit.Doctor.FullName : "N/A",
//                 VisitDate = lastVisit.CreatedAt
//             };
//         }

//         public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
//         {
//             if (string.IsNullOrWhiteSpace(query))
//                 return new List<PatientSearchResultDTO>();

//             return await _context.Users
//                 .Where(u => u.Role == "Patient" &&
//                             (u.FullName.Contains(query) ||
//                              u.Email.Contains(query) ||
//                              u.PhoneNumber.Contains(query)))
//                 .Select(u => new PatientSearchResultDTO
//                 {
//                     Id = u.Id.ToString(),
//                     Name = u.FullName,
//                     Email = u.Email,
//                     Phone = u.PhoneNumber
//                 })
//                 .Take(10)
//                 .ToListAsync();
//         }
//     }
// }
using SwasthyaChinha.API.DTOs.Patient;
using SwasthyaChinha.API.DTOs.Doctor;

using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.Data;
using Microsoft.EntityFrameworkCore;

namespace SwasthyaChinha.API.Services
{
    public class PatientService : IPatientService
    {
        private readonly ApplicationDbContext _context;

        public PatientService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PatientProfileDTO> GetProfileAsync(string userId)
        {
            if (!Guid.TryParse(userId, out var userGuid))
                throw new Exception("Invalid userId format");

            var patient = await _context.Patients
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userGuid);

            if (patient == null)
                throw new Exception("Patient not found");

            return new PatientProfileDTO
            {
                Id = patient.Id.ToString(),
                FullName = patient.FullName,
                Address = patient.Address,
                PhoneNumber = patient.PhoneNumber,
                Gender = patient.Gender
            };
        }

        public async Task UpdatePatientProfileAsync(string userId, UpdatePatientDTO dto)
        {
            if (!Guid.TryParse(userId, out var userGuid))
                throw new Exception("Invalid userId format");

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userGuid);
            if (patient == null) throw new Exception("Patient not found");

            patient.FullName = dto.FullName;
            patient.Address = dto.Address;
            patient.PhoneNumber = dto.PhoneNumber;
            patient.Gender = dto.Gender;

            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        // public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
        // {
        //     if (!Guid.TryParse(userId, out var userGuid))
        //         throw new Exception("Invalid userId format");

        //     var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userGuid);
        //     if (patient == null) throw new Exception("Patient not found");

        //     return await _context.Prescriptions
        //         .Where(p => p.PatientId == patient.Id)
        //         .Include(p => p.Doctor)
        //         .Include(p => p.Hospital)
        //         .Include(p => p.Items)
        //         .Include(p => p.Patient)               // include Patient
        // .ThenInclude(pt => pt.User)       // include User for DOB
        //         .Select(p => new PatientPrescriptionDTO
        //         {
        //             PrescriptionId = p.Id.ToString(),
        //             DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
        //             HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
        //             DateIssued = p.CreatedAt,
        //             Medicines = p.Items.Select(i => new MedicineDTO
        //             {
        //                 Name = i.MedicineName,
        //                 Dosage = i.Dosage,
        //                 Price = i.Cost
        //             }).ToList(),
        //              PatientName = p.Patient?.FullName ?? "Unknown Patient",
        // PatientAge = p.Patient?.User?.DateOfBirth.HasValue == true 
        //              ? (int)((DateTime.Now - p.Patient.User.DateOfBirth.Value).TotalDays / 365.25) 
        //              : 0
        //         })
        //         .ToListAsync();
        // }
        public async Task<List<PatientPrescriptionDTO>> GetPrescriptionsAsync(string userId)
{
    if (!Guid.TryParse(userId, out var userGuid))
        throw new Exception("Invalid userId format");

    var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userGuid);
    if (patient == null) throw new Exception("Patient not found");

    var prescriptions = await _context.Prescriptions
        .Where(p => p.PatientId == patient.Id)
        .Include(p => p.Doctor)
        .Include(p => p.Hospital)
        .Include(p => p.Items)
        .Include(p => p.Patient)
            .ThenInclude(pt => pt.User)
        .ToListAsync();   // 🚀 move to memory

    return prescriptions.Select(p => new PatientPrescriptionDTO
    {
        PrescriptionId = p.Id.ToString(),
        DoctorName = p.Doctor != null ? p.Doctor.FullName : "N/A",
        HospitalName = p.Hospital != null ? p.Hospital.Name : "N/A",
        DateIssued = p.CreatedAt,
        Medicines = p.Items.Select(i => new MedicineDTO
        {
            Name = i.MedicineName,
            Dosage = i.Dosage,
            Price = i.Cost
        }).ToList(),

        // ✅ Now safe, EF already materialized the objects
        PatientName = p.Patient?.FullName ?? "Unknown Patient",
        PatientAge = p.Patient?.User?.DateOfBirth.HasValue == true
                     ? (int)((DateTime.Now - p.Patient.User.DateOfBirth.Value).TotalDays / 365.25)
                     : 0
    }).ToList();
}


        // public async Task<LastVisitDTO?> GetLastVisitAsync(string userId)
        // {
        //     if (!Guid.TryParse(userId, out var userGuid))
        //         throw new Exception("Invalid userId format");

        //     var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userGuid);
        //     if (patient == null) return null;

        //     var lastVisit = await _context.Prescriptions
        //         .Where(p => p.PatientId == patient.Id)
        //         .OrderByDescending(p => p.CreatedAt)
        //         .Include(p => p.Doctor)
        //         .Include(p => p.Hospital)
        //         .FirstOrDefaultAsync();

        //     if (lastVisit == null) return null;

        //     return new LastVisitDTO
        //     {
        //         DoctorName = lastVisit.Doctor?.FullName ?? "N/A",
        //         HospitalName = lastVisit.Hospital?.Name ?? "N/A",
        //         VisitDate = lastVisit.CreatedAt
        //     };
        // }

        // public async Task<PatientPrescriptionDTO?> GetLastPrescriptionAsync(string userId)
        // {
        //     if (!Guid.TryParse(userId, out var userGuid))
        //         throw new Exception("Invalid userId format");

        //     var patient = await _context.Patients.FirstOrDefaultAsync(p => p.UserId == userGuid);
        //     if (patient == null) return null;

        //     var lastPrescription = await _context.Prescriptions
        //         .Where(p => p.PatientId == patient.Id)
        //         .OrderByDescending(p => p.CreatedAt)
        //         .Include(p => p.Doctor)
        //         .Include(p => p.Hospital)
        //         .Include(p => p.Items)
        //         .FirstOrDefaultAsync();

        //     if (lastPrescription == null) return null;

        //     return new PatientPrescriptionDTO
        //     {
        //         PrescriptionId = lastPrescription.Id.ToString(),
        //         DoctorName = lastPrescription.Doctor?.FullName ?? "N/A",
        //         HospitalName = lastPrescription.Hospital?.Name ?? "N/A",
        //         DateIssued = lastPrescription.CreatedAt,
        //         Medicines = lastPrescription.Items.Select(i => new MedicineDTO
        //         {
        //             Name = i.MedicineName,
        //             Dosage = i.Dosage,
        //             Price = i.Cost
        //         }).ToList()
        //     };
        // }

        public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query)) return new List<PatientSearchResultDTO>();

            return await _context.Users
                .Where(u => u.Role == "Patient" &&
                            (u.FullName.Contains(query) || u.Email.Contains(query) || u.PhoneNumber.Contains(query)))
                .Select(u => new PatientSearchResultDTO
                {
                    Id = u.Id.ToString(),
                    Name = u.FullName,
                    Email = u.Email,
                    Phone = u.PhoneNumber
                })
                .Take(10)
                .ToListAsync();
        }
    }
}
