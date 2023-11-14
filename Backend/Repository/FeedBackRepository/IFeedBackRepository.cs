using Backend.DB.Models;

namespace Backend.Repository.FeedBackRepository
{
    public interface IFeedBackRepository
    {
        IQueryable<FeedBack>? GetAll();
        Task<bool> AddAsync(FeedBack feedBack);

        Task<bool> UpdateAsync(FeedBack feedBack);
    }
}
