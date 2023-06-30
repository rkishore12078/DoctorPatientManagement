using Microsoft.EntityFrameworkCore;

namespace DoctorPatientAPI.Models
{
    public class Context:DbContext
    {
        public Context(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Doctor>()
                .HasIndex(d => new { d.Phone,d.Email })
                .IsUnique(true);
            modelBuilder.Entity<Patient>()
                .HasIndex(p => new { p.Phone, p.Email })
                .IsUnique(true);
        }
    }
}
