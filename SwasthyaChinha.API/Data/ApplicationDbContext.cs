// using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore;
// using SwasthyaChinha.API.Models;

// namespace SwasthyaChinha.API.Data
// {
//     public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
//     {
//         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
//             : base(options) { }

//         public DbSet<Prescription> Prescriptions { get; set; }
//         public DbSet<PrescriptionItem> PrescriptionItems { get; set; }
//         // Add other DbSets like Hospitals, Expenses, etc.
//     }
// }
// using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Models;

namespace SwasthyaChinha.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // ✅ DbSets for all entities
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<PrescriptionItem> PrescriptionItems { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
       // public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Notification> Notifications { get; set; }



        public DbSet<Expense> Expenses { get; set; }

        // ✅ Relationships
        //     
    protected override void OnModelCreating(ModelBuilder builder)
{
    base.OnModelCreating(builder);

    // 🔗 Prescription ↔ PrescriptionItems
    builder.Entity<PrescriptionItem>()
        .HasOne(pi => pi.Prescription)
        .WithMany(p => p.Items)
        .HasForeignKey(pi => pi.PrescriptionId);

    // 🔗 User ↔ Hospital (for Patient, Pharmacist, etc.)
    builder.Entity<User>()
        .HasOne(u => u.Hospital)
        .WithMany(h => h.Users)  // 👈 You may need to rename Hospital.Doctors to Users
        .HasForeignKey(u => u.HospitalId)
        .OnDelete(DeleteBehavior.SetNull);

    // 🔗 Doctor ↔ Hospital
    // builder.Entity<Doctor>()
    //     .HasOne(d => d.Hospital)
    //     .WithMany(h => h.Doctors)
    //     .HasForeignKey(d => d.HospitalId)
    //     .OnDelete(DeleteBehavior.Cascade);

    // 🔗 Expense ↔ Patient (User)
    builder.Entity<Expense>()
        .Property(e => e.Amount)
        .HasPrecision(18, 2); // Fix decimal truncation

    builder.Entity<Expense>()
        .HasOne(e => e.Patient)
        .WithMany()
        .HasForeignKey(e => e.PatientId)
        .OnDelete(DeleteBehavior.Cascade);

    // 🔗 Prescription ↔ Hospital
    builder.Entity<Prescription>()
        .Property(p => p.TotalCost)
        .HasPrecision(18, 2);

    builder.Entity<Prescription>()
        .HasOne(p => p.Hospital)
        .WithMany(h => h.Prescriptions)
        .HasForeignKey(p => p.HospitalId)
        .OnDelete(DeleteBehavior.Restrict);

    builder.Entity<PrescriptionItem>()
        .Property(p => p.Cost)
        .HasPrecision(18, 2);
}

    }
}
