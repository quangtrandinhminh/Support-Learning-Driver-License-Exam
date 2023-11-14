using Backend.DTO.Feedback;
using Backend.DTO.Members;

namespace Backend.Services.FeedBacks
{
    public interface IFeedBackService
    {
        public ICollection<FeedBackDTO>? GetAllFeedBack();
        Task<ServiceResult<int>> AddFeedBack(FeedBackDTO feedBackDTO);
    }
}
