using AutoMapper;
using Backend.DTO.Feedback;
using Backend.DTO.Members;
using Backend.Repository.FeedBackRepository;

namespace Backend.Services.FeedBacks
{
    public class FeedBackService : IFeedBackService
    {
        private readonly IFeedBackRepository _feedBackRepository;
        private readonly IMapper _mapper;

        public FeedBackService(IFeedBackRepository feedBackRepository, IMapper mapper)
        {
            _feedBackRepository = feedBackRepository;
            _mapper = mapper;
        }

        public ICollection<FeedBackDTO>? GetAllFeedBack()
        {
            try
            {
                var feedBacks = _feedBackRepository.GetAll().ToList();
                return feedBacks is null ? null : _mapper.Map<ICollection<FeedBackDTO>>(feedBacks);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<int>> AddFeedBack(FeedBackDTO feedBackDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var feedBacks = _mapper.Map<DB.Models.FeedBack>(feedBackDTO);
                await _feedBackRepository.AddAsync(feedBacks);
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
