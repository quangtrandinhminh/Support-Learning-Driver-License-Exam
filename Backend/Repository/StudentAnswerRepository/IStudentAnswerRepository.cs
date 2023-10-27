using Backend.DB.Models;

namespace Backend.Repository.StudentAnswerRepository
{
    public interface IStudentAnswerRepository
    {
        IQueryable<StudentAnswer>? GetAll();

        Task<StudentAnswer?> GetByIdAsync(int id);

        Task<StudentAnswer?> CreateAsync(StudentAnswer StudentAnswer);

        Task<StudentAnswer?> UpdateAsync(StudentAnswer StudentAnswer);
    }
}
