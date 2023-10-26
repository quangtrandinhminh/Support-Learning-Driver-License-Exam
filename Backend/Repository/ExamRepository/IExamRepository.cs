using Backend.DB.Models;

namespace Backend.Repository.ExamRepository
{
    public interface IExamRepository
    {
        IQueryable<Exam>? GetAll();

        Task<Exam?> GetByIdAsync(int id);

        Task<Exam?> CreateAsync(Exam exam);

        Task<Exam?> UpdateAsync(Exam exam);
    }
}
