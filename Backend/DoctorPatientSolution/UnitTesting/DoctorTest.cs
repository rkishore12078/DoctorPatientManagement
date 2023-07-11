using Microsoft.EntityFrameworkCore;
using DoctorPatientAPI.Models;
using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Services;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace UnitTesting
{
    [TestClass]
    public class DoctorTest
    {

        public static DbContextOptions GetContextOption() //options are immutable so we are doing by builder
        {
            var contextOptions = new DbContextOptionsBuilder<Context>()
                                    .UseInMemoryDatabase(databaseName: "anyName")
                                    .ConfigureWarnings(x => x.Ignore(InMemoryEventId.TransactionIgnoredWarning))
                                    .Options;
            return contextOptions;
        }

        private static async void Add()
        {
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            IRepo<Doctor, int> doctorRepo = new DoctorRepo(context, userRepo);
            _ = await doctorRepo.Add(new Doctor
            {
                DoctorId = 1,
                Name = "Kishore",
                Phone = "9876543210",
                DateOfBirth = new DateTime(2001, 02, 14),
                Age = 21,
                Gender = "Male",
                Users = new User() { PasswordHash = Array.Empty<byte>(), PasswordKey = Array.Empty<byte>(), Role = "Doctor", DoctorState = "Approved", Email = "kishore@gmail.com" },
                Address = "Chennai",
                Specialization = "Ortho",
                Qualification = "MBBS",
                YearsOfExperience = 12
            });
            await context.SaveChangesAsync();
        }

        [TestMethod]
        public async Task DoctorGetAll()
        {
            Add();
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            IRepo<Doctor, int> doctorRepo = new DoctorRepo(context, userRepo);
            var data = await doctorRepo.GetAll();
            if (data != null)
                Assert.AreEqual(1, data.ToList().Count);
        }
        [TestMethod]
        public async Task UserGetAll()
        {
            Add();
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            var data = await userRepo.GetAll();
            if (data != null)
                Assert.AreEqual(2, data.ToList().Count);
        }

        [TestMethod]
        public async Task UserGet()
        {
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            var data = await userRepo.Get(1);
            if (data != null)
                Assert.AreEqual(1, data.UserId);
        }
        [TestMethod]
        public async Task DoctorGet()
        {
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            IRepo<Doctor, int> doctorRepo = new DoctorRepo(context, userRepo);
            var data = await doctorRepo.Get(1);
            if (data != null)
                Assert.AreEqual(1, data.DoctorId);
        }
        [TestMethod]
        public async Task DoctorDelete()
        {
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            IRepo<Doctor, int> doctorRepo = new DoctorRepo(context, userRepo);
            await doctorRepo.Delete(1);
            var data = await doctorRepo.GetAll();
            if (data != null)
                Assert.AreEqual(0, data.ToList().Count);
        }
        [TestMethod]
        public async Task UserDelete()
        {
            using var context = new Context(GetContextOption());
            IRepo<User, int> userRepo = new UserRepo(context);
            await userRepo.Delete(1);
            var data = await userRepo.GetAll();
            if (data != null)
                Assert.AreEqual(1, data.ToList().Count);
        }
        //[TestMethod]
        //public async Task DoctorUpdate()
        //{
        //    Add();
        //    using var context = new Context(GetContextOption());
        //    IRepo<User, int> userRepo = new UserRepo(context);
        //    IRepo<Doctor, int> doctorRepo = new DoctorRepo(context, userRepo);
        //    await doctorRepo.Update(new Doctor
        //    {
        //        DoctorId = 1,
        //        Name = "Vignesh",
        //        Phone = "4566544567",
        //        DateOfBirth = new DateTime(2001, 02, 14),
        //        Gender = "Male",
        //        Users = new User() { PasswordHash = new byte[] { }, PasswordKey = new byte[] { }, Role = "Doctor", DoctorState = "Approved", Email = "kishore@gmail.com" },
        //        Address = "Coimbatore",
        //        Specialization = "Ortho",
        //        Qualification = "MBBS",
        //        YearsOfExperience = 12
        //    });
        //    var data = await doctorRepo.Get(1);
        //    if (data != null)
        //        Assert.AreEqual(data.Name, "Vignesh");
        //}

    }
}