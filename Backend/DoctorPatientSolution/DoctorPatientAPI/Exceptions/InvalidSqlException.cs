namespace DoctorPatientAPI.Exceptions
{
    public class InvalidSqlException:Exception
    {
        public string message="";
        public int number=0;
        public InvalidSqlException()
        {
            message = "Exceptions";
        }
        public InvalidSqlException(string message)
        {
            this.message = message;
        }
        public InvalidSqlException(int? number)
        {
            this.number = number ?? 0;
        }

        public override string Message
        {
            get { return message; }
        }
    }
}
