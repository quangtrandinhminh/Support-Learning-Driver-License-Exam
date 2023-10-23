using Backend.DTO.News;

namespace Backend.Services.News
{
    public interface INewsService
    {
        ServiceResult<ICollection<NewsDTO>> GetNewsList();

        ServiceResult<ICollection<NewsDTO>> GetInactiveNewsList();

        Task<ServiceResult<NewsDTO>> GetNewsById(int id);

        Task<ServiceResult> PostNews(NewsDTO newsDto);

        Task<ServiceResult> UpdateNews(NewsDTO newsDto);

        Task<ServiceResult> DeactivateNews(int id);
    }
}
