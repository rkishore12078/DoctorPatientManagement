using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Interfaces
{
    public interface ITokenService
    {
        public string GenerateToken(UserDTO user);
    }
}
