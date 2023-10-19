using AutoMapper;
using Backend.DTO.News;
using Backend.Repository.NewsRepository;

namespace Backend.Services.News
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;

        public NewsService(INewsRepository newsRepository, IMapper mapper)
        {
            _newsRepository = newsRepository;
            _mapper = mapper;
        }

        public ICollection<NewsDTO>? GetNewsList()
        {
            try
            {
                var news = _newsRepository.GetAll();
                return news is null || !news.Any() ? null : _mapper.Map<ICollection<NewsDTO>>(news);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
