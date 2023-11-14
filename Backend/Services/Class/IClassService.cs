using Backend.DTO.Class;

namespace Backend.Services.Class
{
    public interface IClassService
    {
        ICollection<ClassDTO> GetAllClass();

        ServiceResult<ICollection<ClassDTO>> GetAllClassesByCourseId(string courseId);

        Task<ServiceResult<ICollection<ClassDTO>>> GetAllClassesByMentorId(int mentorId, string courseId);

        Task<ServiceResult<int>> CreateClass(ClassCreateDTO classCreateDto);

        Task<ServiceResult<int>> CreateClassPracticeByMentor(
            ICollection<ClassCreatePracticeDTO> classCreatePracticeDTOs);

        Task<ServiceResult<int>> AddMentorIntoClass(ClassMentorDTO classMentorDTO);

        Task<ServiceResult<ICollection<ClassDTO>>> GetAllTheoryClassesByCourseId(string courseId);
    }
}
