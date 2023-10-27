using Backend.DB.Models;

namespace Backend.Repository.QuestionRepository
{
    public interface IQuestionRepository
    {
        IQueryable<Question>? GetAll();

        Task<Question?> GetByIdAsync(int id);

        Task<Question?> CreateAsync(Question question);

        Task<Question?> UpdateAsync(Question question);
    }
}
