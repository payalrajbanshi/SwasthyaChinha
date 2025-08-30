using SwasthyaChinha.API.DTOs.Hospital;
using SwasthyaChinha.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwasthyaChinha.API.Services
{
    public class HospitalService : IHospitalService
    {
        private readonly ApplicationDbContext _context;

        public HospitalService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task RegisterDoctorAsync(RegisterDoctorDTO dto)
        {
            Guid? hospitalGuid = Guid.TryParse(dto.HospitalId, out Guid parsedHospitalId) ? parsedHospitalId : null;

            var doctor = new User
            {
                Id = Guid.NewGuid(),
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Role = "Doctor",
                HospitalId = hospitalGuid,
                Specialty = dto.Specialty,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password) // ⚠️ In production, hash passwords
            };

            _context.Users.Add(doctor);
            await _context.SaveChangesAsync();
        }

        public async Task<List<DoctorStatsDTO>> GetDoctorStatsAsync(string hospitalId)
        {
            if (!Guid.TryParse(hospitalId, out Guid hospitalGuid))
                throw new ArgumentException("Invalid hospitalId format");

            return await _context.Users
                .Where(u => u.Role == "Doctor" && u.HospitalId == hospitalGuid)
                .Select(d => new DoctorStatsDTO
                {
                    DoctorId = d.Id.ToString(),
                    DoctorName = d.FullName,
                    PrescriptionCount = _context.Prescriptions.Count(p => p.DoctorId == d.Id),
                    TotalPrescriptionCost = _context.Prescriptions
                        .Where(p => p.DoctorId == d.Id)
                        .Sum(p => (decimal?)p.TotalCost) ?? 0
                }).ToListAsync();
        }

        public async Task<List<PatientStatsDTO>> GetPatientStatsAsync(string hospitalId)
        {
            if (!Guid.TryParse(hospitalId, out Guid hospitalGuid))
                throw new ArgumentException("Invalid hospitalId format");

            var stats = await _context.Prescriptions
                .Where(p => p.HospitalId == hospitalGuid)
                .GroupBy(p => p.PatientId)
                .Select(g => new PatientStatsDTO
                {
                    PatientId = g.Key.ToString(),
                    TotalVisits = g.Count(),
                    TotalExpense = g.Sum(p => p.TotalCost) ??0
                }).ToListAsync();

            return stats;
        }

        public async Task<HospitalStatsDTO> GetOverallStatsAsync(string hospitalId)
        {
            if (!Guid.TryParse(hospitalId, out Guid hospitalGuid))
                throw new ArgumentException("Invalid hospitalId format");
                 var today = DateTime.Today;

            var prescriptions = await _context.Prescriptions
                .Where(p => p.HospitalId == hospitalGuid)
                .ToListAsync();

            // Fetch hospital info from Users with Role = HospitalAdmin
            // var hospitalUser = await _context.Users
            //     .FirstOrDefaultAsync(u => u.Id == hospitalGuid && u.Role == "HospitalAdmin");
            var hospitalUser = await _context.Users
        .FirstOrDefaultAsync(u => u.HospitalId == hospitalGuid && u.Role =="HospitalAdmin");

            return new HospitalStatsDTO
            {
                // TotalDoctors = await _context.Users.CountAsync(u => u.HospitalId == hospitalGuid && u.Role == "Doctor"),
                // TotalPatients = await _context.Users.CountAsync(u => u.HospitalId == hospitalGuid && u.Role == "Patient"),
                // TotalPrescriptions = prescriptions.Count,
                // TotalExpense = prescriptions.Sum(p => p.TotalCost),
                // UniquePatients = prescriptions.Select(p => p.PatientId).Distinct().Count(),
                // TotalRevenue = prescriptions.Sum(p => p.TotalCost),
                // HospitalName = hospitalUser?.FullName ?? "Unknown",
                // Address = hospitalUser?.Address ?? "Not Provided",
                // LogoUrl = hospitalUser?.LogoUrl ?? ""
                TotalDoctors = await _context.Users.CountAsync(u => u.HospitalId == hospitalGuid && u.Role == "Doctor"),
                TotalPrescriptionsIssued = prescriptions.Count,
                PrescriptionsVerifiedToday = prescriptions.Count(p => p.IsDispensed && p.CreatedAt.Date == today),
                ActivePrescriptions = prescriptions.Count(p => !p.IsDispensed),
                QRCodesGeneratedToday = prescriptions.Count(p => p.CreatedAt.Date == today),
                TotalPatients = await _context.Users.CountAsync(u => u.HospitalId == hospitalGuid && u.Role == "Patient"),
                TotalExpense = prescriptions.Sum(p => (decimal?)p.TotalCost) ?? 0,
                UniquePatients = prescriptions.Select(p => p.PatientId).Distinct().Count(),
                TotalRevenue = prescriptions.Sum(p => (decimal?)p.TotalCost) ?? 0,
                HospitalName = hospitalUser?.FullName ?? "Unknown",
                Address = hospitalUser?.Address ?? "Not Provided",
                LogoUrl = hospitalUser?.LogoUrl ?? ""
            };
        }

        public async Task<List<DoctorStatsDTO>> GetAllDoctorsAsync()
        {
            return await _context.Users
                .Where(u => u.Role == "Doctor")
                .Select(d => new DoctorStatsDTO
                {
                    DoctorId = d.Id.ToString(),
                    DoctorName = d.FullName,
                    PrescriptionCount = _context.Prescriptions.Count(p => p.DoctorId == d.Id),
                    TotalPrescriptionCost = _context.Prescriptions
                        .Where(p => p.DoctorId == d.Id)
                        .Sum(p => (decimal?)p.TotalCost) ?? 0
                }).ToListAsync();
        }

        public async Task<List<PatientStatsDTO>> GetAllPatientsAsync()
        {
            return await _context.Prescriptions
                .GroupBy(p => p.PatientId)
                .Select(g => new PatientStatsDTO
                {
                    PatientId = g.Key.ToString(),
                    TotalVisits = g.Count(),
                    TotalExpense = g.Sum(p => p.TotalCost) ??0
                }).ToListAsync();
        }
    }
}
