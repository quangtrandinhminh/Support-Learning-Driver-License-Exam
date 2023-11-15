using Backend.DTO.ClassStudent;

namespace Backend.Services.ClassStudent
{
    public interface IClassStudentService
    {
        ICollection<ClassStudentDTO> GetAllClassStudent();

        Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO);

        Task<ServiceResult<int>> AddAllStudentsIntoTheoryClass(string courseId);
    }
}
