using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data; // Correct context
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Doctor;

namespace SwasthyaChinha.API.Services
{


    public class PharmacistService : IPharmacistService
    {
        private readonly ApplicationDbContext _context;

        public PharmacistService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PrescriptionQRDTO> GetPrescriptionByQRAsync(string prescriptionId)
        {
             int id = int.Parse(prescriptionId); // ✅ Convert string to int
            var prescription = await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                
                .FirstOrDefaultAsync(p => p.Id == id); //compare int to int

            if (prescription == null) throw new Exception("Prescription not found");

            return new PrescriptionQRDTO
            {
                PrescriptionId = prescription.Id.ToString(),
                DoctorName = prescription.Doctor.FullName,
                HospitalName = prescription.Hospital.Name,
                Medicines = prescription.Items.Select(m => new MedicineDTO
                {
                    Name = m.MedicineName,
                    Dosage = m.Dosage,
                    Price = m.Cost
                }).ToList()
            };
        }

        public async Task DispenseMedicineAsync(DispenseDTO dto)
        {
            var prescription = await _context.Prescriptions.FindAsync(dto.PrescriptionId);
            if (prescription == null) throw new Exception("Prescription not found");

            prescription.IsDispensed = true;
            _context.Prescriptions.Update(prescription);
            await _context.SaveChangesAsync();
        }
    }
}