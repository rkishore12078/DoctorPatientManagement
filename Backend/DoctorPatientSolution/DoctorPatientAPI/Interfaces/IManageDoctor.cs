using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Interfaces
{
    public interface IManageDoctor
    {
        public Task<UserDTO?> DoctorRegister(DoctorDTO doctorDTO);

    }
}
