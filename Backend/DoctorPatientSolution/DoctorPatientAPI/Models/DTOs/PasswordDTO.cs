using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models.DTOs
{
    public class PasswordDTO
    {
        public int UserID { get; set; }
        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$", ErrorMessage = "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.")]
        public string? NewPassword { get; set; }
    }
}
