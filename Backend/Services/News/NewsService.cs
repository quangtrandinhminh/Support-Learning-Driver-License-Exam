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
                foreach (var newsDto in newsList)
                {
                    if (!string.IsNullOrEmpty(newsDto.Content))
                    {
                        newsDto.Description = newsDto.Content[..Math.Min(newsDto.Content.Length, 100)];
                    }
                }
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
                foreach (var newsDto in newsList)
                {
                    if (!string.IsNullOrEmpty(newsDto.Content))
                    {
                        newsDto.Description = newsDto.Content[..Math.Min(newsDto.Content.Length, 100)];
                    }
                }
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

                var newsDto = _mapper.Map<NewsDTO>(news);
                if (!string.IsNullOrEmpty(newsDto.Content))
                {
                    newsDto.Description = newsDto.Content[..Math.Min(newsDto.Content.Length, 100)];
                }

                result.Payload = newsDto;
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> PostNews(NewsCreateDTO newsCreateDto)
        {
            var result = new ServiceResult<int>();

            try
            {
                var news = _mapper.Map<DB.Models.News>(newsCreateDto);
                news.CreatedTime = DateTime.Now;

                await _newsRepository.CreateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> UpdateNews(NewsUpdateDTO newsUpdateDto)
        {
            var result = new ServiceResult<int>();

            try
            {
                var originalNews = await _newsRepository.GetByIdAsync(newsUpdateDto.NewsId);
                if (originalNews == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "The news id is not exist!";
                    return result;
                }

                var news = _mapper.Map(newsUpdateDto, originalNews);
                await _newsRepository.UpdateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> DeactivateNews(int id)
        {
            var result = new ServiceResult<int>();

            try
            {
                var news = await _newsRepository.GetByIdAsync(id);
                if (news == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "The news id is not exist!";
                    result.Payload = -1;
                    return result;
                }

                news.Status = false;
                var updatedNews = _newsRepository.UpdateAsync(news);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }
    }
}
