using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using System.Numerics;

namespace DoctorPatientAPI.Services
{
    public class PasswordService:IPasswordGenerate
    {
        public string? DoctorPasword(Doctor doctor)
        {
            string? password;
            if(doctor.Name==null)return null;
            password = doctor.Name[..4];
            password += doctor.DateOfBirth.Day;
            password += doctor.DateOfBirth.Month;
            return password;
        }

        public string? PatientPassword(Patient patient)
        {
            string? password;
            if(patient.Name==null)return null;
            password = patient.Name[..4];
            password += patient.DateOfBirth.Day;
            password += patient.DateOfBirth.Month;
            return password;
        }
    }
}
