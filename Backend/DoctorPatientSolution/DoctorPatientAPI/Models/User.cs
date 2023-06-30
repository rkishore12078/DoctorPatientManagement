using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [RegularExpression("Admin|Doctor|Patient",ErrorMessage ="Role should be Admin or Doctor or Patient")]
        public string? Role { get; set; }
        public string? DoctorState { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordKey { get; set; }
    }
}
