using AutoMapper;
using Backend.DTO.Mentor;
using Backend.Repository.MentorRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Mentor
{
    public class MentorService : IMentorService
    {
        private readonly IMentorRepository _mentorRepository;
        private readonly IMapper _mapper;

        public MentorService(IMentorRepository mentorRepository, IMapper mapper)
        {
            _mentorRepository = mentorRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<MentorDTO>> GetMentorList()
        {
            var result = new ServiceResult<ICollection<MentorDTO>>();
            try
            {
                var mentors = _mentorRepository.GetAll()
                    .Include(m => m.User)
                    .ToList();

                if (!mentors.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<MentorDTO>>(mentors);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<MentorDTO>> GetMentorById(int id)
        {
            var result = new ServiceResult<MentorDTO>();
            try
            {
                var mentor = await _mentorRepository.GetAll()
                    .Include(m => m.User)
                    .FirstOrDefaultAsync(m => m.MentorId == id && m.UserId == m.User.UserId);

                if (mentor == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giảng viên!";
                    return result;
                }

                result.Payload = _mapper.Map<MentorDTO>(mentor);
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
