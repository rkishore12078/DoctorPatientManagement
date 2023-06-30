namespace DoctorPatientAPI.ErrorMessages
{
    public class Messages
    {
        public List<string> messages = new List<string>();
        public Messages()
        {
            messages = new List<string>() {
                "Registered Successfully",
                "User Not found",
                "Doctor Not found",
                "Patient Not found",
                "Invalid Email or password",
                "Unable to Register the User",
                "Unable to Register the Doctor",
                "Unable to Register the Patient",
                "SQL error try again",
                "Unable to Update the Doctor",
                "Unable to Update the Patient",
                "Unable to Change status",
                "Email and PhoneNumber should be unique"
            };
        }
    }
}
