using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models
{
    public class Patient
    {
        public Patient()
        {
            Name = string.Empty;
            Gender = "Unknown";
        }
        [Key]
        public int PatientId { get; set; }
        [ForeignKey("PatientId")]
        public User? Users { get; set; }
        [RegularExpression("^[a-zA-Z0-9\\s]*$", ErrorMessage = "Special characters are not allowed.")]
        public string? Name { get; set; }
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age {
            get
            {
                var year = DateTime.Now.Year - DateOfBirth.Year;
                if (DateTime.Now.Month > DateOfBirth.Month)
                    year--;
                return year;
            }
            set { Age = value; } 
        }
        public string? Gender { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? MedicalHistory { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactNumber { get; set; }
        public DateTime RegistrationDate {
            get
            {
                return DateTime.Now;
            }
            set
            { }
        }
    }
}
