using AutoMapper;
using Backend.DTO.CourseDetails;
using Backend.DTO.Members;
using Backend.DTO.Student;
using Backend.DTO.Users;
using Backend.Repository.MemberRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.UserRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Student
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMemberRepository _memberRepository;
        private readonly IMapper _mapper;

        public StudentService(IStudentRepository studentRepository
            , IMapper mapper
            , IMemberRepository memberRepository
            , IUserRepository userRepository)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _memberRepository = memberRepository;
        }

        public ICollection<StudentDTO>? GetAllStudent()
        {
            try
            {
                var students = _studentRepository.GetAll();
                var studentt = _mapper.Map<ICollection<StudentDTO>>(students);
                foreach ( var student in studentt ) 
                {
                    var member = _memberRepository.GetAll().
                        Where(p => p.MemberId == student.MemberId).FirstOrDefault();
                    var user = _userRepository.GetAll().
                        Where(p => p.UserId == member.UserId).FirstOrDefault();
                    student.fullName = user.FullName;
                }

                return studentt;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<StudentDTO>> GetStudentById(int memberID)
        {
            var result = new ServiceResult<StudentDTO>();
            try
            {
                var student = _studentRepository.GetAll().
                    Where(p => p.MemberId == memberID).FirstOrDefault();

                if (student is null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Student is not exist";
                    return result;
                }

                result.Payload = _mapper.Map<StudentDTO>(student);
            }
            catch (Exception e)
            {
                result.IsError = false;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
