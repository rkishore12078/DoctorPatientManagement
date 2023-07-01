using DoctorPatientAPI.Models;
using DoctorPatientAPI.Models.DTOs;

namespace DoctorPatientAPI.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO?> Login(UserDTO? userDTO);
        public Task<UserDTO?> ChangeStatus(UserIdsDTO userID);
        public Task<User?> UpdatePassword(PasswordDTO passwordDTO);
        public Task<User?> GetUser(UserIdsDTO userIds);
    }
}
