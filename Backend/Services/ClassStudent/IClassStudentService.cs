using Backend.DTO.ClassStudent;

namespace Backend.Services.ClassStudent
{
    public interface IClassStudentService
    {
        ICollection<ClassStudentDTO> GetAllCllassStudent();

        Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO);
    }
}
