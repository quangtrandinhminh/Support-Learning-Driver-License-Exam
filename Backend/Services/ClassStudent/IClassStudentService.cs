using Backend.DTO.ClassStudent;

namespace Backend.Services.ClassStudent
{
    public interface IClassStudentService
    {
        ICollection<ClassStudentDTO> GetAllCllassStudent();

        Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO);

        Task<ServiceResult<int>> AddAllStudentIntoClass(string courseId, int classId);
    }
}
