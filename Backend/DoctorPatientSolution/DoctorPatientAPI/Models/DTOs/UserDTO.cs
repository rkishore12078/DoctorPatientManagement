using System.ComponentModel.DataAnnotations;

namespace DoctorPatientAPI.Models.DTOs
{
    public class UserDTO
    {
        public int UserId { get; set; }
        [RegularExpression("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public string? Token { get; set; }
    }
}
