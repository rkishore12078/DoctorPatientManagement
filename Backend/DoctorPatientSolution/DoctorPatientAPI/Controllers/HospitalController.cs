using DoctorPatientAPI.Interfaces;
using DoctorPatientAPI.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoctorPatientAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        private readonly IManageDoctor _doctorService;
        private readonly IManagePatient _patientService;
        private readonly IManageUser _userService;

        public HospitalController(IManageDoctor doctorService,
                                    IManagePatient patientService,
                                    IManageUser userService)
        {
            _doctorService= doctorService;
            _patientService= patientService;
            _userService= userService;
        }
        [HttpPost]
        public async Task<ActionResult<UserDTO?>> DoctorRegister(DoctorDTO doctorDTO)
        {
            var doctor=await _doctorService.DoctorRegister(doctorDTO);
            if(doctor!=null)
                return Ok(doctor);
            return BadRequest("Error");
        }
        [HttpPost]
        public async Task<ActionResult<UserDTO?>> PatientRegister(PatientDTO patientDTO)
        {
            var patient = await _patientService.PatientRegister(patientDTO);
            if (patient != null)
                return Ok(patient);
            return BadRequest("Error");
        }
        [HttpPost]
        public async Task<ActionResult<UserDTO?>> Login(UserDTO userDTO)
        {
            var user=await _userService.Login(userDTO);
            if(user!=null)
                return Ok(user);
            return BadRequest("Error");
        }
    }
}
