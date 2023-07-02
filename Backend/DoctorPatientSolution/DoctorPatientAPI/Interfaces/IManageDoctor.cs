using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Interfaces
{
    public interface IManageDoctor
    {
        public Task<UserDTO?> DoctorRegister(DoctorDTO doctorDTO);
        public Task<UserDTO?> UpdateDetails(DoctorDTO doctorDTO);
        public Task<List<Doctor>?> GetAllDoctors();
        public Task<Doctor?> GetDoctor(UserIdsDTO userIds);
        public Task<List<Doctor>?> DoctorFilters(Status status);

    }
}
