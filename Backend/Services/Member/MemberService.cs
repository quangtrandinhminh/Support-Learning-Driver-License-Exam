using AutoMapper;
using Backend.DTO.Members;
using Backend.Repository.MemberRepository;

namespace Backend.Services.Member
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _memberRepository;
        private readonly IMapper _mapper;

        public MemberService(IMemberRepository memberRepository, IMapper mapper)
        {
            _memberRepository = memberRepository;
            _mapper = mapper;
        }

        public ICollection<MemberDTO>? GetAllMember()
        {
            try
            {
                var members = _memberRepository.GetAll();
                return members is null ? null : _mapper.Map<ICollection<MemberDTO>>(members);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<MemberDTO>> GetMemberById(int userID)
        {
            var result = new ServiceResult<MemberDTO>();
            try
            {
                var member = _memberRepository.GetAll()
                    .FirstOrDefault(p => p.UserId == userID);

                if (member is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "User is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<MemberDTO>(member);
            }
            catch (Exception e)
            {
                result.IsError = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public bool checkValidation(MemberDTO memberDTO)
        {
            var members = _memberRepository.GetAll().ToList();
            foreach (var member in members) 
            {
                if (member) 
            }
            
            
            return true;
        }

        public async Task<ServiceResult<int>> AddMember(MemberDTO memberDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                if ()
                {
                    result.IsError = true;
                    result.ErrorMessage = "End date must be greater than start date";
                    result.Payload = -2;
                    return result;
                }

                var courseExist = await _memberRepository.Get(courseRequestDto.CourseId);
                if (courseExist != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Course is already exist";
                    result.Payload = -1;
                    return result;
                };
                ;
                var course = _mapper.Map<DB.Models.Course>(courseRequestDto);
                course.CreateTime = DateTime.Now;
                course.CourseMonth = course.StartDate?.Month;
                course.CourseYear = course.StartDate?.Year;

                await _courseRepository.AddAsync(course);
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
