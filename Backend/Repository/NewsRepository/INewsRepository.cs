using Backend.DB.Models;

namespace Backend.Repository.NewsRepository
{
    public interface INewsRepository
    {
        IQueryable<News>? GetAll();
    }
}
