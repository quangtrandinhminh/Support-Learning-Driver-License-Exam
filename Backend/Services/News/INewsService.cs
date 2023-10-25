using Backend.DTO.News;

namespace Backend.Services.News
{
    public interface INewsService
    {
        ServiceResult<ICollection<NewsDTO>> GetNewsList();

        ServiceResult<ICollection<NewsDTO>> GetInactiveNewsList();

        Task<ServiceResult<NewsDTO>> GetNewsById(int id);

        Task<ServiceResult<int>> PostNews(NewsRequestDTO newsRequestDto);

        Task<ServiceResult<int>> UpdateNews(NewsRequestDTO newsRequestDto);

        Task<ServiceResult<int>> DeactivateNews(int id);
    }
}
