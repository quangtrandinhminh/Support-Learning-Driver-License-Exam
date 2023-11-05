using Backend.DTO.StudentAnswer;

namespace Backend.Services.StudentAnswer
{
    public interface IStudentAnswerService
    {
        ServiceResult<ICollection<StudentAnswerDTO>> GetAllStudentAnswer();
        ServiceResult<ICollection<StudentAnswerDTO>> GetAllStudentAnswerByStudentID(string studentID);
        Task<ServiceResult<int>> CreateRandomQuestion(string studentID);

    }
}
