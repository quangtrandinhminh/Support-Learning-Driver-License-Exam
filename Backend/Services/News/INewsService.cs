using Backend.DTO.News;

namespace Backend.Services.News
{
    public interface INewsService
    {
        ICollection<NewsDTO>? GetNewsList();
    }
}
