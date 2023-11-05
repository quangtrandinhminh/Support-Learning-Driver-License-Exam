using Backend.DTO.Class;

namespace Backend.Services.Class
{
    public interface IClassService
    {
        ICollection<ClassDTO> GetAllClass();

        ServiceResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId);

        Task<ServiceResult<ICollection<ClassDTO>>> GetAllClassesByMentorId(int mentorId, string courseId);

        Task<ServiceResult<int>> CreateClass(ClassCreateDTO classCreateDto);

        Task<ServiceResult<int>> CreateClassByMentor(ClassDTO classDto);
    }
}
