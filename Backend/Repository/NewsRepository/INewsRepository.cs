using Backend.DB.Models;

namespace Backend.Repository.NewsRepository
{
    public interface INewsRepository
    {
        IQueryable<News>? GetAll();

        Task<News?> GetByIdAsync(int id);

        Task<News?> CreateAsync(News news);

        Task<News?> UpdateAsync(News news);
    }
}
