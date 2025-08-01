// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data; // Correct context
// using SwasthyaChinha.API.Models; // Add this if models like Prescription, Medicine are used
// using Microsoft.EntityFrameworkCore; // For ToListAsync
// namespace SwasthyaChinha.API.Services
// {

//     public class DoctorService : IDoctorService
//     {
//         private readonly ApplicationDbContext _context;

//         public DoctorService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
//         {
//             var doctor = await _context.Doctors.FindAsync(doctorId);
//             if (doctor == null) throw new Exception("Doctor not found");

//             return new DoctorProfileDTO
//             {
//                 Id = doctor.Id,
//                 FullName = doctor.FullName,
//                 Email = doctor.Email,
//                 Specialty = doctor.Specialty,
//                 HospitalName = doctor.Hospital.Name
//             };
//         }

//         public async Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
//         {
//     //         if (!int.TryParse(dto.PatientId, out var patientId))
//     // throw new Exception("Invalid patient ID");
//     //         if (!int.TryParse(dto.HospitalId, out var hospitalId))
//     //             throw new Exception("Invalid hospital ID");
//             var prescription = new Prescription
//             {
//                // Id = Guid.NewGuid().ToString(),
//                 DoctorId = doctorId,
//                 PatientId = int.Parse(dto.PatientId),
//                 HospitalId = int.Parse(dto.HospitalId),
//                 CreatedAt = DateTime.UtcNow,
//                 Items = dto.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = m.Price
//                 }).ToList(),
//                 TotalCost = dto.Medicines.Sum(m => m.Price)
//             };

//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId)
//         {
//             return await _context.Prescriptions
//                 .Where(p => p.DoctorId == doctorId)
//                 .Select(p => new DoctorPatientDTO
//                 {
//                     PatientId = p.Patient.Id,
//                     FullName = p.Patient.FullName,
//                     LastVisitDate = p.CreatedAt.ToShortDateString()
//                 })
//                 .Distinct()
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class DoctorService : IDoctorService
//     {
//         private readonly ApplicationDbContext _context;

//         public DoctorService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
//         {
//             var doctor = await _context.Doctors
//                 .Include(d => d.Hospital)
//                 .FirstOrDefaultAsync(d => d.Id == doctorId);

//             if (doctor == null) throw new Exception("Doctor not found");

//             return new DoctorProfileDTO
//             {
//                 Id = doctor.Id,
//                 FullName = doctor.FullName,
//                 Email = doctor.Email,
//                 Specialty = doctor.Specialty,
//                 HospitalName = doctor.Hospital?.Name
//             };
//         }

//         public async Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
//         {
//             var prescription = new Prescription
//             {
//                 DoctorId = doctorId,
//                 PatientId = dto.PatientId,
//                 HospitalId = dto.HospitalId, // now HospitalId is a string
//                 CreatedAt = DateTime.UtcNow,
//                 IsDispensed = false,
//                 Items = dto.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0
//                 }).ToList(),
//                 TotalCost = 0 //price will be computed by pharmacist at end
//             };

//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId)
//         {
//             return await _context.Prescriptions
//                 .Where(p => p.DoctorId == doctorId)
//                 .Select(p => new DoctorPatientDTO
//                 {
//                     PatientId = p.Patient.Id,
//                     FullName = p.Patient.FullName,
//                     LastVisitDate = p.CreatedAt.ToShortDateString()
//                 })
//                 .Distinct()
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models.Auth;
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class DoctorService : IDoctorService
//     {
//         private readonly ApplicationDbContext _context;

//         public DoctorService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
//         {
//             var doctor = await _context.Doctors
//                 .Include(d => d.Hospital)
//                 .FirstOrDefaultAsync(d => d.Id == Guid.Parse(doctorId));

//             if (doctor == null)
//                 throw new Exception("Doctor not found");

//             return new DoctorProfileDTO
//             {
//                 Id = doctor.Id.ToString(),
//                 FullName = doctor.FullName,
//                 Email = doctor.Email,
//                 Specialty = doctor.Specialty,
//                 HospitalName = doctor.Hospital?.Name
//             };
//         }

//         public async Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
//         {
//             // Convert string IDs to Guid
//             var doctorGuid = Guid.Parse(doctorId);
//             var hospitalGuid = Guid.Parse(dto.HospitalId);
//             var patientGuid = Guid.Parse(dto.PatientId);

//             var prescription = new Prescription
//             {
//                 DoctorId = doctorGuid,
//                 HospitalId = hospitalGuid,
//                 PatientId = patientGuid,
//                 CreatedAt = DateTime.UtcNow,
//                 IsDispensed = false,
//                 Items = dto.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0 // To be set by pharmacist
//                 }).ToList(),
//                 TotalCost = 0
//             };

//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId)
//         {
//             var doctorGuid = Guid.Parse(doctorId);

//             return await _context.Prescriptions
//                 .Where(p => p.DoctorId == doctorGuid)
//                 .Include(p => p.Patient)
//                 .Select(p => new DoctorPatientDTO
//                 {
//                     PatientId = p.Patient.Id.ToString(),
//                     FullName = p.Patient.FullName,
//                     LastVisitDate = p.CreatedAt.ToShortDateString()
//                 })
//                 .Distinct()
//                 .ToListAsync();
//         }
//     }
// }
// using SwasthyaChinha.API.DTOs.Doctor;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models; // ✅ Fix: Add missing model reference
// using Microsoft.EntityFrameworkCore;

// namespace SwasthyaChinha.API.Services
// {
//     public class DoctorService : IDoctorService
//     {
//         private readonly ApplicationDbContext _context;

//         public DoctorService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
//         {
//             var doctorGuid = Guid.Parse(doctorId);

//             // var doctor = await _context.Doctors
//             //     .Include(d => d.Hospital)
//             //     .FirstOrDefaultAsync(d => d.Id == Guid.Parse(doctorId)); // ✅ Guid comparison
//             var doctor = await _context.Doctors
//     .FirstOrDefaultAsync(d => d.Id == Guid.Parse(doctorId));


//             if (doctor == null)
//                 throw new Exception("Doctor not found");

//             return new DoctorProfileDTO
//             {
//                 Id = doctor.Id.ToString(),
//                 FullName = doctor.FullName,
//                 Email = doctor.Email,
//                 Specialty = doctor.Specialty,
//                 HospitalName = doctor.Hospital?.Name
//             };
//         }

//         public async Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
//         {
//             var doctorGuid = Guid.Parse(doctorId);
//             var hospitalGuid = Guid.Parse(dto.HospitalId);
//             var patientGuid = Guid.Parse(dto.PatientId);

//             var prescription = new Prescription
//             {
//                 DoctorId = doctorGuid,
//                 HospitalId = hospitalGuid,
//                 PatientId = patientGuid,
//                 CreatedAt = DateTime.UtcNow,
//                 IsDispensed = false,
//                 Items = dto.Medicines.Select(m => new PrescriptionItem
//                 {
//                     MedicineName = m.Name,
//                     Dosage = m.Dosage,
//                     Cost = 0
//                 }).ToList(),
//                 TotalCost = 0
//             };

//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//         }

//         public async Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId)
//         {
//             var doctorGuid = Guid.Parse(doctorId);

//             return await _context.Prescriptions
//                 .Where(p => p.DoctorId == doctorGuid) // ✅ Guid comparison
//                 .Include(p => p.Patient)
//                 .Select(p => new DoctorPatientDTO
//                 {
//                     PatientId = p.Patient.Id.ToString(),
//                     FullName = p.Patient.FullName,
//                     LastVisitDate = p.CreatedAt.ToShortDateString()
//                 })
//                 .Distinct()
//                 .ToListAsync();
//         }
//     }
// }
using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;  // Important for Prescription, PrescriptionItem
using Microsoft.EntityFrameworkCore;

namespace SwasthyaChinha.API.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly ApplicationDbContext _context;

        public DoctorService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
        {
            // DoctorId is string, so query directly
            var doctor = await _context.Users
                .Include(u => u.Hospital)  // Hospital has Guid Id - no problem here
                .FirstOrDefaultAsync(u => u.Id.ToString() == doctorId & u.Role =="Doctor");

            if (doctor == null)
                throw new Exception("Doctor not found");

            return new DoctorProfileDTO
            {
                Id = doctor.Id.ToString(),
                FullName = doctor.FullName,
                Email = doctor.Email,
                Specialty = doctor.Specialty,
                HospitalName = doctor.Hospital?.Name
            };
        }

        public async Task CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
        {
            // Parse HospitalId string to Guid
            if (!Guid.TryParse(dto.HospitalId, out Guid hospitalGuid))
                throw new ArgumentException("Invalid HospitalId GUID format");

            // doctorId and dto.PatientId are strings
            var prescription = new Prescription
            {
                DoctorId = Guid.Parse(doctorId),
                PatientId = Guid.Parse(dto.PatientId),
                HospitalId = hospitalGuid,
                CreatedAt = DateTime.UtcNow,
                IsDispensed = false,
                Items = dto.Medicines.Select(m => new PrescriptionItem
                {
                    MedicineName = m.Name,
                    Dosage = m.Dosage,
                    Cost = 0
                }).ToList(),
                TotalCost = 0
            };

            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
        }

        public async Task<List<DoctorPatientDTO>> GetPatientsAsync(string doctorId)
        {
                if (!Guid.TryParse(doctorId, out Guid doctorGuid))
    {
        throw new ArgumentException("Invalid doctorId");
    }
            return await _context.Prescriptions
                .Where(p => p.DoctorId == doctorGuid)  // DoctorId is string
                .Include(p => p.Patient)
                .Select(p => new DoctorPatientDTO
                {
                    PatientId = p.Patient.Id.ToString(),
                    FullName = p.Patient.FullName,
                    LastVisitDate = p.CreatedAt.ToShortDateString()
                })
                .Distinct()
                .ToListAsync();
        }
    }
}
