using AutoMapper;
using Backend.DB.Models;
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
        public ServiceResult<ICollection<NewsDTO>> GetNewsList()
        {
            var result = new ServiceResult<ICollection<NewsDTO>>();
            try
            {
                var news = _newsRepository.GetAll().Where(x => x.Status == true);

                if (!news.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "No news found!";
                    return result;
                }

                var newsList = _mapper.Map<ICollection<NewsDTO>>(news);
                newsList = newsList.OrderByDescending(x => x.CreatedTime).ToList();
                result.Payload = newsList;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public ServiceResult<ICollection<NewsDTO>> GetInactiveNewsList()
        {
            var result = new ServiceResult<ICollection<NewsDTO>>();
            try
            {
                var news = _newsRepository.GetAll().Where(x => x.Status == false);

                if (!news.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "No news found!";
                    return result;
                }

                var newsList = _mapper.Map<ICollection<NewsDTO>>(news);
                newsList = newsList.OrderByDescending(x => x.CreatedTime).ToList();
                result.Payload = newsList;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<NewsDTO>> GetNewsById(int id)
        {
            var result = new ServiceResult<NewsDTO>();
            try
            {
                var news = await _newsRepository.GetByIdAsync(id);

                if (news == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "No news found!";
                    return result;
                }

                result.Payload = _mapper.Map<NewsDTO>(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult> PostNews(NewsRequestDTO newsDto)
        {
            var result = new ServiceResult();

            try
            {
                var news = _mapper.Map<DB.Models.News>(newsDto);
                news.CreatedTime = DateTime.Now;

                await _newsRepository.CreateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult> UpdateNews(NewsDTO newsDto)
        {
            var result = new ServiceResult();

            try
            {
                var news = _mapper.Map<DB.Models.News>(newsDto);
                news.CreatedTime = _newsRepository.GetByIdAsync(newsDto.NewsId).Result.CreatedTime;

                await _newsRepository.UpdateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult> DeactivateNews(int id)
        {
            var result = new ServiceResult();

            try
            {
                var news = await _newsRepository.GetByIdAsync(id);
                if (news == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "The news is not exist!";
                    return result;
                }

                news.Status = false;
                var updatedNews = _newsRepository.UpdateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }
    }
}
