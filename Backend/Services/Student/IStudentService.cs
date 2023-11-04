using Backend.DTO.Course;
using Backend.DTO.Members;
using Backend.DTO.Student;
using Backend.DTO.Users;

namespace Backend.Services.Student
{
    public interface IStudentService
    {
        public ICollection<StudentDTO>? GetAllStudent();
        Task<ServiceResult<StudentDTO>> GetStudentById(int memberID);
    }
}
