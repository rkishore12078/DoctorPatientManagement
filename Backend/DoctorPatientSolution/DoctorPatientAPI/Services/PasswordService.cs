namespace DoctorPatientAPI.Services
{
    public class PasswordService
    {
        public async Task<string?> GeneratePassword(Intern intern)
        {
            string? password;
            password = intern.Name.Substring(0, 4);
            password += intern.DateOfBirth.Day;
            password += intern.DateOfBirth.Month;
            return password;
        }
    }
}
