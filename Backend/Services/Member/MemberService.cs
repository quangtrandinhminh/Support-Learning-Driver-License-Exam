using AutoMapper;
using AutoMapper.Execution;
using Backend.DB.Models;
using Backend.DTO.Course;
using Backend.DTO.Members;
using Backend.DTO.News;
using Backend.Repository.ClassStudentRepository;
using Backend.Repository.MemberRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.UserRepository;
using Backend.Services.Class;
using Backend.Services.ClassStudent;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Member
{
    public class MemberService : IMemberService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMemberRepository _memberRepository;
        private readonly IStudentRepository _studentRepository;
        private readonly IClassStudentService _classStudentService;
        private readonly IMapper _mapper;

        public MemberService(IMemberRepository memberRepository, 
            IMapper mapper, IUserRepository userRepository,
            IStudentRepository studentRepository,
            IClassStudentService classStudentService)
        {
            _userRepository = userRepository;
            _memberRepository = memberRepository;
            _studentRepository = studentRepository;
            _classStudentService = classStudentService;
            _mapper = mapper;
        }

        public ICollection<MemberDTO>? GetAllMember()
        {
            try
            {
                var members = _memberRepository.GetAll().
                    Include(c => c.User).ToList();
                return members is null ? null : _mapper.Map<ICollection<MemberDTO>>(members);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<MemberDTO>> GetMemberById(int memberId)
        {
            var result = new ServiceResult<MemberDTO>();
            try
            {
                var member = await _memberRepository.GetAll().
                    Include(c => c.User).
                    FirstOrDefaultAsync(p => p.MemberId == memberId);

                if (member is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Member is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<MemberDTO>(member);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<MemberDTO>> GetMemberByUserId(int userID)
        {
            var result = new ServiceResult<MemberDTO>();
            try {
                var member = _memberRepository.GetAll().
                    Include(c => c.User).ToList()
                    .FirstOrDefault(p => p.UserId == userID);
                
                if (member is null) {
                    result.IsError = true;
                    result.ErrorMessage = "User is not exist";
                    return result;
                }
                result.Payload = _mapper.Map<MemberDTO>(member);
            } catch (Exception e) {
                result.IsError = false;
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

            public int checkValidation(MemberCreateDTO memberCreateDTO)
        {
            int e = 0;
            var members = _memberRepository.GetAll().ToList();
            foreach (var member in members) 
            { 
                if (member.UserId.Equals(memberCreateDTO.UserId))
                {
                    e = 1;
                }

                if (member.IdentityCardNumber.Equals(memberCreateDTO.IdentityCardNumber))
                {
                    e = 2;
                }
                var users = _userRepository.GetAll().ToList();
                var userr = _userRepository.GetAll().Where(p => p.UserId == memberCreateDTO.UserId).FirstOrDefault();
                foreach (var user in users) 
                { 
                    if (user.Phone.Equals(memberCreateDTO.Phone) && !memberCreateDTO.Phone.Equals(user.Phone))
                    {
                        e = 3;
                    }
                }
            }
            return e;
        }

        public async Task<ServiceResult<int>> AddMember(MemberCreateDTO memberCreateDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                int e = checkValidation(memberCreateDTO);
                if (e == 1)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Bạn đã tạo hồ sơ đăng ký thi";
                    result.Payload = -1;
                    return result;
                }
                else if (e == 2) 
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số CCCD/CMND đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }
                else if (e == 3)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số điện thoại đã tồn tại";
                    result.Payload = -3;
                    return result;
                }

                var members = _mapper.Map<DB.Models.Member>(memberCreateDTO);
                members.RegistrationDate = DateTime.Now;
                var user = _userRepository.GetAll().Where(p => p.UserId == members.UserId).FirstOrDefault();
                user.FullName = memberCreateDTO.FullName;   
                user.Phone = memberCreateDTO.Phone;
                user.Email = memberCreateDTO.Email;
                await _userRepository.UpdateAsync(user);
                await _memberRepository.AddAsync(members);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> UpdateIsPaid(int memberID)
        {
            var result = new ServiceResult<int>();
            try
            {
                var member = _memberRepository.GetAll().
                    Where(p => p.MemberId == memberID).FirstOrDefault();
                if (member == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Member is not exist";
                    result.Payload = -2;
                    return result;
                }
                else
                {
                    int i = 0;
                    var student = new DB.Models.Student();
                    var students = _studentRepository.GetAll().ToList();
                    foreach (var studentt  in students) 
                    {
                        i++;
                    }
                    string v = null;
                    if (i < 10)
                    {
                        v = "0" + $"{i}";
                    }
                    else
                    {
                        v = $"{i}";
                    }
                    student.StudentId = member.CourseId + "." + v;
                    student.CourseId = member.CourseId;
                    student.MemberId = memberID;

                    await _studentRepository.CreateAsync(student);
                    member.IsPaid = true;
                    await _classStudentService.AddStudentIntoClassTheory(student.StudentId, student.CourseId);
                    await _memberRepository.UpdateAsync(member);
                }
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
