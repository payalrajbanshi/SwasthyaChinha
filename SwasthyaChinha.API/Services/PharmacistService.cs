
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;   // your DbContext namespace
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Services
{
    public class PharmacistService : IPharmacistService
    {
        private readonly ApplicationDbContext _context;

        public PharmacistService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetProfileAsync(Guid userId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == userId && u.Role == "Pharmacist");
        }
        // Prescription methods are handled in PrescriptionService
        // public Task<PrescriptionQRDTO> GetPrescriptionByQRAsync(string prescriptionId)
        // {
        //     throw new NotImplementedException();
        // }

        // public Task DispenseMedicineAsync(DispenseDTO dto)
        // {
        //     throw new NotImplementedException();
        // }
        //         public async Task<Prescription> GetPrescriptionByQrIdAsync(string qrId)
        // {
        //     return await _context.Prescriptions
        //         .Include(p => p.Patient)
        //         .Include(p => p.Doctor)
        //         .Include(p => p.Items)
        //         .FirstOrDefaultAsync(p => p.QRCodeData == qrId);
        // }
public async Task<PrescriptionDTO> GetPrescriptionByQrIdAsync(string qrId)
{
    var prescription = await _context.Prescriptions
        .Include(p => p.Patient)
        .Include(p => p.Doctor)
        .FirstOrDefaultAsync(p => p.QRCodeData == qrId);

    if (prescription == null) return null;

    return new PrescriptionDTO
    {
        Id = prescription.Id.ToString(),
        PatientName = prescription.Patient.FullName,
        DoctorName = prescription.Doctor.FullName,
        Diagnosis = prescription.Diagnosis,
        Medicines = prescription.Items.Select(i => new MedicineDTO
        {
            Name = i.MedicineName,
            Dosage = i.Dosage,
            Instructions = "as directed"
        }).ToList(),
        QRCode = prescription.QRCode,
        QRCodeData = prescription.QRCodeData
    };
}



    }
}
