using Backend.DTO.Mentor;
using Backend.DTO.News;
using Backend.Services;

namespace Backend.Services.Mentor
{
    public interface IMentorService
    {
        ServiceResult<ICollection<MentorDTO>> GetMentorList();

        Task<ServiceResult<MentorDTO>> GetMentorById(int id);
    }
}
