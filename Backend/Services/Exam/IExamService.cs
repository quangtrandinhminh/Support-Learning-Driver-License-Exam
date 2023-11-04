using Backend.DTO.Exam;

namespace Backend.Services.Exam
{
    public interface IExamService
    {
        ServiceResult<ICollection<ExamDTO>> GetAll();

        Task<ServiceResult<ExamDTO>> GetById(int id);

        Task<ServiceResult<int>> Create(ExamCreateDTO examDTO);

        Task<ServiceResult<int>> Update(ExamDTO examDTO);

        Task<ServiceResult<int>> ChangeStatus(int id);
    }
}
