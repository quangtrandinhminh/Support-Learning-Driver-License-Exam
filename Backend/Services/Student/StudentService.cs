using AutoMapper;
using Backend.DTO.Members;
using Backend.DTO.Student;
using Backend.DTO.Users;
using Backend.Repository.MemberRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.UserRepository;

namespace Backend.Services.Student
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public StudentService(IStudentRepository studentRepository, IMapper mapper)
        {
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public ICollection<StudentDTO>? GetAllStudent()
        {
            try
            {
                var students = _studentRepository.GetAll();
                return students is null ? null : _mapper.Map<ICollection<StudentDTO>>(students);
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
