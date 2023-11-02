using Backend.DTO.Class;

namespace Backend.Services.Class
{
    public interface IClassService
    {
        public ICollection<ClassDTO> GetAllCllass();

        ServiceResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId);

        Task<ServiceResult<int>> CreateClass(ClassCreateDTO classCreateDto);
    }
}
