using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DoctorPatientAPI.Services
{
    public class PatientRepo : IRepo<Patient, int>
    {
        private readonly Context _context;
        private readonly IRepo<User, int> _userRepo;

        public PatientRepo(Context context,
                            IRepo<User,int> userRepo)
        {
            _context = context;
            _userRepo= userRepo;
        }
        public async Task<Patient?> Add(Patient item)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                transaction.CreateSavepoint("Patient");
                await _userRepo.Add(item.Users);
                var user =_context.Users.OrderByDescending(u => u.UserId).FirstOrDefault();
                item.PatientId = user.UserId;
                _context.Patients.Add(item);
                await _context.SaveChangesAsync();
                transaction.Commit();
                return item;
            }
            catch (Exception)
            {
                transaction.RollbackToSavepoint("Patient");
            }
            return null;
        }

        public Task<Patient?> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Patient?> Get(int id)
        {
            try
            {
                var patient = await _context.Patients.SingleOrDefaultAsync(p=>p.PatientId == id);
                if (patient != null)
                    return patient;
                return null;
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        public async Task<ICollection<Patient>?> GetAll()
        {
            var patients = await _context.Patients.ToListAsync();
            if (patients != null)
                return patients;
            return null;
        }

        public Task<Patient?> Update(Patient item)
        {
            throw new NotImplementedException();
        }
    }
}
