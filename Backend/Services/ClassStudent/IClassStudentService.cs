using Backend.DTO.ClassStudent;

namespace Backend.Services.ClassStudent
{
    public interface IClassStudentService
    {
        ICollection<ClassStudentDTO> GetAllClassStudent();

        Task<ServiceResult<int>> AddStudentIntoClassTheory(string studentId, string courseId);

        Task<ServiceResult<int>> AddAllStudentsIntoTheoryClass(string courseId);
        Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO);
    }
}
