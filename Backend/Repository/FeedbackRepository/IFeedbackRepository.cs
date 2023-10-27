using Backend.DB.Models;

namespace Backend.Repository.FeedbackRepository
{
    public interface IFeedbackRepository
    {
        IQueryable<Feedback>? GetAll();

        Task<Feedback?> GetByIdAsync(int id);

        Task<Feedback?> CreateAsync(Feedback Feedback);
    }
}
