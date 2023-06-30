namespace DoctorPatientAPI.Exceptions
{
    public class InvalidSqlException:Exception
    {
        public string message;
        public int number;
        public InvalidSqlException()
        {
            message = "Exceptions";
        }
        public InvalidSqlException(string message)
        {
            this.message = message;
        }
        public InvalidSqlException(int number)
        {
            this.number = number;
        }
        public override string Message
        {
            get { return message; }
        }
    }
}
