// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;

// namespace SwasthyaChinha.API.Services
// {
//     public class PrescriptionService : IPrescriptionService
//     {
//         private readonly ApplicationDbContext _context;

//         public PrescriptionService(ApplicationDbContext context)
//         {
//             _context = context;
//         }

//         public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription)
//         {
//             _context.Prescriptions.Add(prescription);
//             await _context.SaveChangesAsync();
//             return prescription;
//         }

//         public async Task<Prescription> GetPrescriptionByIdAsync(int id)
//         {
//             return await _context.Prescriptions
//                 .Include(p => p.Items)
//                 .FirstOrDefaultAsync(p => p.Id == id);
//         }
//     }
// }
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.DTOs.Doctor;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Text;



namespace SwasthyaChinha.API.Services
{
    public class PrescriptionService : IPrescriptionService
    {
        private readonly ApplicationDbContext _context;

        public PrescriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Prescription> CreatePrescriptionAsync(Prescription prescription)
        {
            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();
            // Generate QR Code based on prescription ID
            string qrContent = $"PRESC-{prescription.Id}";

            // using (var qrGenerator = new QRCodeGenerator())
            // using (var qrData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q))
            // using (var qrCode = new QRCode(qrData))
            // using (Bitmap qrBitmap = qrCode.GetGraphic(20))
            // using (var ms = new MemoryStream())
            // {
            //     qrBitmap.Save(ms, ImageFormat.Png);
            //     var base64 = Convert.ToBase64String(ms.ToArray());
            //     prescription.QRCode = base64;
            // }
             using (var qrGenerator = new QRCodeGenerator())
    {
        var qrData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
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
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Prescription>> GetAllPrescriptionsAsync()
        {
            return await _context.Prescriptions
                .Include(p => p.Items)
                .ToListAsync();
        }
        public async Task<PrescriptionQRDTO> GetByQRCodeAsync(string qrCodeData)
        {
            var prescription = await _context.Prescriptions
                .Include(p => p.Items)
                .Include(p => p.Doctor)
                .Include(p => p.Hospital)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.QRCode == qrCodeData);

            if (prescription == null)
                throw new Exception("Prescription not found.");

            return new PrescriptionQRDTO
            {
                PrescriptionId = prescription.Id.ToString(),
                PatientName = prescription.Patient?.FullName, // Or actual name if you have relation
                DoctorName = prescription.Doctor?.FullName,
                HospitalName = prescription.Hospital?.Name,
                Medicines = prescription.Items.Select(m => new MedicineDTO
                {
                    Name = m.MedicineName,
                    Dosage = m.Dosage,
                    Price = m.Cost
                }).ToList(),
                IsDispensed = prescription.IsDispensed,
                QRCodeData = qrCodeData
            };
        }
        public async Task<bool> MarkAsDispensedAsync(string prescriptionId)
        {
            var prescription = await _context.Prescriptions.FindAsync(int.Parse(prescriptionId));
            if (prescription == null)
                return false;

            prescription.IsDispensed = true;
            await _context.SaveChangesAsync();
            return true;
        }


    }
    
}
