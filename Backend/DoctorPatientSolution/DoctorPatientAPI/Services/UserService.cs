using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;
using System.Security.Policy;

namespace DoctorPatientAPI.Services
{
    public class UserService
    {

        public UserService()
        {
        }
        public Task<UserDTO?> GetIdByEmail(UserDTO userDTO)
        {
            return null;
        }
    }
}
