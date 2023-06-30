using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Services
{
    public class DoctorService:IManageDoctor
    {
        private readonly IRepo<Doctor, int> _doctorRepo;

        public DoctorService(IRepo<Doctor,int> doctorRepo)
        {
            _doctorRepo= doctorRepo;
        }

        public async Task<UserDTO?> DoctorRegister(DoctorDTO doctorDTO)
        {
            var tempPassword=doctorDTO.Password;
            if (!IsStrongPassword(tempPassword))
            {
                //doctorDTO.Password=
            }



            var doctor=await _doctorRepo.Add(doctorDTO);
            if (doctor == null) return null;
            //var userDTO = null;
            return null;
        }

        private bool IsStrongPassword(string? tempPassword)
        {
            if(tempPassword.Length>=6 && 
                tempPassword.Any(char.IsUpper) && 
                tempPassword.Any(char.IsLower) &&
                tempPassword.Any(char.IsDigit) &&
                tempPassword.Any(IsSpecialCharacter))
                return true;
            return false;
        }
        private bool IsSpecialCharacter(char c)
        {
            // Define the set of special characters
            var specialCharacters = "!@#$%^&*()-_=+[]{}\\|;:'\",.<>/?";

            // Check if the character is in the set of special characters
            return specialCharacters.Contains(c);
        }
    }
}
