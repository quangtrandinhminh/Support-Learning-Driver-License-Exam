using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ExamEdu.DTO
{
    public class ResponseDTO
    {
        public int Status { get; set; } = 500;
        public string Message { get; set; }
        public object Errors { get; set; } = new object();
        private IDictionary<int, string> statusMessage = new Dictionary<int, string>(){
            {200, "Request has succeed"},
            {201, "Resource has been created"},
            {204, "Server has fulfilled the request"},
            {400, "Request could not be understood by the server due to incorrect syntax"},
            {401, "Request requires user authentication information"},
            {403, "Client does not have access rights to the content"},
            {404, "Resource not found"},
            {409, "Conflict with the current state of resource"},
            {415, "Media type is not supported by the server"}
        };

        public ResponseDTO() { }

        public ResponseDTO(int status)
        {
            this.Status = status;

            if (statusMessage.TryGetValue(status, out var value))
            {
                this.Message = value;
            }
            else
            {
                this.Message = "The server encountered an unexpected condition";
            }
        }

        public ResponseDTO(int status, string message)
        {
            this.Status = status;
            this.Message = message;
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}