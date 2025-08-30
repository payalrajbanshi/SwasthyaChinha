using SwasthyaChinha.API.DTOs.Doctor;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;  // Important for Prescription, PrescriptionItem
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.DTOs.Patient;

namespace SwasthyaChinha.API.Services 
{
    public class DoctorService : IDoctorService
    {
        private readonly ApplicationDbContext _context;

        public DoctorService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<DoctorStatsDTO> GetStatsAsync(string doctorId)
        {
            // Convert doctorId string → Guid
            if (!Guid.TryParse(doctorId, out Guid doctorGuid))
                throw new Exception("Invalid doctor ID");

            var today = DateTime.UtcNow.Date;

            var patientsToday = await _context.Prescriptions
                .Where(p => p.DoctorId == doctorGuid && p.CreatedAt.Date == today)  // ✅ Use CreatedAt instead of DateIssued
                .Select(p => p.PatientId)
                .Distinct()
                .CountAsync();

            var prescriptionsToday = await _context.Prescriptions
                .Where(p => p.DoctorId == doctorGuid && p.CreatedAt.Date == today)  // ✅
                .CountAsync();

            return new DoctorStatsDTO
            {
                PatientsToday = patientsToday,
                PrescriptionsGiven = prescriptionsToday
            };
        }

        public async Task<DoctorProfileDTO> GetProfileAsync(string doctorId)
        {
            // DoctorId is string, so query directly
            var doctor = await _context.Users
                .Include(u => u.Hospital)  // Hospital has Guid Id - no problem here
                .FirstOrDefaultAsync(u => u.Id.ToString() == doctorId && u.Role == "Doctor");

            if (doctor == null)
                throw new Exception("Doctor not found");

            return new DoctorProfileDTO
            {
                Id = doctor.Id.ToString(),
                FullName = doctor.FullName,
                Email = doctor.Email,
                Specialty = doctor.Specialty,
                HospitalName = doctor.Hospital?.Name,
                HospitalAddress = doctor.Hospital?.Address,
                ProfileImageUrl = doctor.ProfileImageUrl,
                SignatureUrl = doctor.SignatureUrl,
                HospitalId = doctor.HospitalId ?? Guid.Empty,
            };
        }

        // public async Task<string> CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
        // {
        //     // Parse HospitalId string to Guid
        //     if (!Guid.TryParse(dto.HospitalId, out Guid hospitalGuid))
        //         throw new ArgumentException("Invalid HospitalId GUID format");

        //     // doctorId and dto.PatientId are strings
        //     var prescription = new Prescription
        //     {
        //         DoctorId = Guid.Parse(doctorId),
        //         PatientId = Guid.Parse(dto.PatientId),
        //         HospitalId = hospitalGuid,
        //         CreatedAt = DateTime.UtcNow,
        //         IsDispensed = false,
        //         Items = dto.Medicines.Select(m => new PrescriptionItem
        //         {
        //             MedicineName = m.Name,
        //             Dosage = m.Dosage,
        //             Cost = 0
        //         }).ToList(),
        //         TotalCost = 0
        //     };

        //     _context.Prescriptions.Add(prescription);
        //     await _context.SaveChangesAsync();
        //     // ✅ Generate QR code with prescription ID
        //     var qrService = new QRService();
        //     var qrCodeBase64 = qrService.GenerateQRCode($"PRESC-{prescription.Id}");

        //     // Save QR in DB if needed
        //     prescription.QRCode = qrCodeBase64;
        //     await _context.SaveChangesAsync();

        //     // Return QR for frontend
        //     return qrCodeBase64;
        // }



        //         public async Task<string> CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
        // {
        //     if (!Guid.TryParse(doctorId, out var doctorGuid))
        //         throw new UnauthorizedAccessException("Invalid doctor token");

        //     if (!Guid.TryParse(dto.PatientId, out var patientGuid))
        //         throw new ArgumentException("Invalid PatientId GUID format");

        //     if (!Guid.TryParse(dto.HospitalId, out var hospitalGuid))
        //         throw new ArgumentException("Invalid HospitalId GUID format");

        //     var prescription = new Prescription
        //     {
        //         DoctorId = doctorGuid,
        //         PatientId = patientGuid,
        //         HospitalId = hospitalGuid,
        //         CreatedAt = DateTime.UtcNow,
        //         IsDispensed = false,
        //         Items = dto.Medicines.Select(m => new PrescriptionItem
        //         {
        //             MedicineName = m.Name,
        //             Dosage = m.Dosage,
        //             Cost = 0
        //         }).ToList(),
        //         TotalCost = 0
        //     };

        //     _context.Prescriptions.Add(prescription);
        //     await _context.SaveChangesAsync();

        //     // Generate & store QR
        //     var qrService = new QRService();
        //     var qrData = $"PRESC-{prescription.Id}";
        //     var qrCodeBase64 = qrService.GenerateQRCode(qrData);

        //     prescription.QRCodeData = qrData;   // <-- new field (Step 2)
        //     prescription.QRCode = qrCodeBase64; // base64 image
        //     await _context.SaveChangesAsync();

        //     return qrCodeBase64;
        // }


        //         public async Task<string> CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
        // {
        //     // Validate GUIDs
        //     if (!Guid.TryParse(doctorId, out var doctorGuid))
        //         throw new UnauthorizedAccessException("Invalid doctor token");

        //     if (!Guid.TryParse(dto.PatientId, out var patientGuid))
        //         throw new ArgumentException("Invalid PatientId GUID format");

        //     if (!Guid.TryParse(dto.HospitalId, out var hospitalGuid))
        //         throw new ArgumentException("Invalid HospitalId GUID format");

        //     // Create Prescription entity
        //     var prescription = new Prescription
        //     {
        //         DoctorId = doctorGuid,
        //         PatientId = patientGuid,
        //         HospitalId = hospitalGuid,
        //         CreatedAt = DateTime.UtcNow,
        //         IsDispensed = false,
        //         Items = dto.Medicines.Select(m => new PrescriptionItem
        //         {
        //             MedicineName = m.Name,
        //             Dosage = m.Dosage,
        //             Cost = 0
        //         }).ToList(),
        //         TotalCost = 0
        //     };

        //     // Save initially to generate Prescription.Id
        //     _context.Prescriptions.Add(prescription);
        //     await _context.SaveChangesAsync();

        //     // Generate QR code using Prescription ID
        //     var qrService = new QRService();
        //     var qrData = $"PRESC-{prescription.Id}";           // You can include more info if needed
        //     var qrCodeBase64 = qrService.GenerateQRCode(qrData);

        //     // Store QR code in the entity
        //     prescription.QRCodeData = qrData;                  // optional: store raw data
        //     prescription.QRCode = qrCodeBase64;               // base64 image for DB
        //     await _context.SaveChangesAsync();

        //     return qrCodeBase64;
        // }


        public async Task<string> CreatePrescriptionAsync(CreatePrescriptionDTO dto, string doctorId)
        {
            // Validate GUIDs
            if (!Guid.TryParse(doctorId, out var doctorGuid))
                throw new UnauthorizedAccessException("Invalid doctor token");

            if (!Guid.TryParse(dto.PatientId, out var patientGuid))
                throw new ArgumentException("Invalid PatientId GUID format");

            if (!Guid.TryParse(dto.HospitalId, out var hospitalGuid))
                throw new ArgumentException("Invalid HospitalId GUID format");

            // Create prescription entity
            var prescription = new Prescription
            {
                DoctorId = doctorGuid,
                PatientId = patientGuid,
                HospitalId = hospitalGuid,
                CreatedAt = DateTime.UtcNow,
                Diagnosis = dto.Diagnosis,
                IsDispensed = false,
                Items = dto.Medicines.Select(m => new PrescriptionItem
                {
                    MedicineName = m.Name,
                    Dosage = m.Dosage,
                    Cost = 0
                }).ToList(),
                TotalCost = 0,
                QRCode = "TEMP"  // temporary placeholder to satisfy NOT NULL column
            };

            // Add and save to get the database-generated Id
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            // Now generate QR code with actual prescription.Id
            var qrService = new QRService();
            var qrData = $"PRESC-{prescription.Id}";
            var qrCodeBase64 = qrService.GenerateQRCode(qrData);

            // Update the prescription with the real QR
            prescription.QRCodeData = qrData;
            prescription.QRCode = qrCodeBase64;
            await _context.SaveChangesAsync();

            return qrCodeBase64;
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
                //.GroupBy(p => p.Patient.Id)
                //.Select(g => g.OrderByDescending(p => p.CreatedAt).First())
                .Select(p => new DoctorPatientDTO
                {
                    PatientId = p.Patient.Id.ToString(),
                    FullName = p.Patient.FullName,
                    LastVisitDate = p.CreatedAt.ToShortDateString(),
                    PhoneNumber = p.Patient.PhoneNumber
                })
                .Distinct()
                .ToListAsync();
        }


        public async Task<IEnumerable<PatientSearchResultDTO>> SearchPatientsAsync(string query)
        {
            query = query.Trim().ToLower();

            var patients = await _context.Patients
                .Where(p => p.FullName.ToLower().Contains(query)
                         || p.PhoneNumber.Contains(query))
                .Select(p => new PatientSearchResultDTO
                {
                    Id = p.Id.ToString(),       // convert GUID to string
                    Name = p.FullName,
                    Email = "",
                    Phone = p.PhoneNumber
                })
                .ToListAsync();

            return patients;
        }
        
        public async Task<int> GetTotalRegisteredPatientsAsync()
{
    // Count all patients in the system
    return await _context.Patients.CountAsync();
}




    }
}
