using Backend.DTO.StudentAnswer;

namespace Backend.Services.StudentAnswer
{
    public interface IStudentAnswerService
    {
        ServiceResult<ICollection<StudentAnswerDTO>> GetAllStudentAnswer();
        Task<ServiceResult<int>> CreateRandomQuestion(string studentID);

    }
}
