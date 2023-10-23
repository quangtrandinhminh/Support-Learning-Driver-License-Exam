namespace Backend.Services
{
    public class ServiceResult<T>  
    {
        public bool IsError { get; set; } = false;
        public string ErrorMessage { get; set; }
        public T? Payload { get; set; }
    }

    public class ServiceResult
    {
        public bool IsError { get; set; } = false;
        public string ErrorMessage { get; set; }
    }
}
