

using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.DTOs.Pharmacist;

using SwasthyaChinha.API.Services.Interfaces;
using DoctorDTOs = SwasthyaChinha.API.DTOs.Doctor;
using PharmacistDTOs = SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.DTOs.Patient;
using QRCoder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SwasthyaChinha.API.Services
{
    public class PrescriptionService : IPrescriptionService
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create new prescription with optional manual QR
        public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription, string? manualQrId = null)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            prescription.QRCodeData = $"PRESC-{Guid.NewGuid().ToString().Substring(0, 8)}";

            // QR content: manual or auto
            //string qrContent = string.IsNullOrEmpty(manualQrId) ? $"PRESC-{prescription.Id}" : manualQrId;
            //prescription.QRCodeData = qrContent;

            // Generate Base64 QR code
            using (var qrGenerator = new QRCodeGenerator())
            {
                var qrData = qrGenerator.CreateQrCode(prescription.QRCodeData, QRCodeGenerator.ECCLevel.Q);
                var pngQrCode = new PngByteQRCode(qrData);
                byte[] qrCodeBytes = pngQrCode.GetGraphic(20);
                prescription.QRCode = Convert.ToBase64String(qrCodeBytes);
            }

            await _context.SaveChangesAsync();
            return prescription;
        }

        public async Task<Prescription?> GetPrescriptionByIdAsync(int id)
        {
            return await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
        {
            return await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .ToListAsync();
        }

        public async Task<DoctorDTOs.PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
        {
            var prescription = await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.QRCodeData == qrCodeData || p.QRCode == qrCodeData);

            if (prescription == null)
                throw new Exception("Prescription not found.");

            return new DoctorDTOs.PrescriptionQRDTO
            {
                PrescriptionId = prescription.Id.ToString(),
                PatientName = prescription.Patient?.FullName ?? "Unknown",
                DoctorName = prescription.Doctor?.FullName ?? "Unknown",
                HospitalName = prescription.Hospital?.Name ?? "Unknown",
                Diagnosis = prescription.Diagnosis,
                Medicines = prescription.Items.Select(m => new DoctorDTOs.MedicineDTO
                {
                    Name = m.MedicineName,
                    Dosage = m.Dosage,
                    Price = m.Cost
                }).ToList(),
                IsDispensed = prescription.IsDispensed,
                //QRCodeData = prescription.QRCodeData ?? prescription.QRCode
                QRCodeData = prescription.QRCodeData ?? $"PRESC-{prescription.Id}",
            };
        }
public async Task<bool> MarkAsDispensedAsync(string prescriptionId, List<MedicineDTO> prices)
{
    if (!int.TryParse(prescriptionId, out int id)) return false;

var prescription = await _context.Prescriptions
    .Include(p => p.Items)
    .FirstOrDefaultAsync(p => p.Id == id);

    // var prescription = await _context.Prescriptions
            //     .Include(p => p.Items)
            //     .FirstOrDefaultAsync(p => p.Id == prescriptionId);

            if (prescription == null)
                return false;

    // Update medicine prices
    foreach (var item in prescription.Items)
    {
        var priceDto = prices.FirstOrDefault(p => p.Name == item.MedicineName);
        if (priceDto != null)
        {
            item.Cost = priceDto.Price;
        }
    }

    // Mark prescription as dispensed
    prescription.IsDispensed = true;

    await _context.SaveChangesAsync();
    return true;
}


    }
}
