
using SwasthyaChinha.API.DTOs.Patient;
using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
                Gender = patient.Gender,
                Email = patient.User?.Email
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
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return prescriptions.Select(p => new PatientPrescriptionDTO
            {
                PrescriptionId = p.Id.ToString(),
                DoctorName = p.Doctor?.FullName ?? "N/A",
                DoctorSpecialty = p.Doctor?.Specialty ?? "N/A",
                HospitalName = p.Hospital?.Name ?? "N/A",
                DateIssued = p.CreatedAt,
                Diagnosis = p.Diagnosis,
                PatientName = p.Patient?.FullName ?? "Unknown Patient",
                PatientAge = p.Patient?.User?.DateOfBirth.HasValue == true
                             ? (int)((DateTime.Now - p.Patient.User.DateOfBirth.Value).TotalDays / 365.25)
                             : 0,
                QRCodeData = p.QRCodeData ?? $"PRESC-{p.Id}",
                Medicines = p.Items?.Select(i => new MedicineDTO
                {
                    Name = i.MedicineName,
                    Dosage = i.Dosage,
                    Price = i.Cost,
                   // Instructions = i.Instructions  // if you added Instructions field in your PrescriptionItem
                }).ToList() ?? new List<MedicineDTO>()
            }).ToList();
        }

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
