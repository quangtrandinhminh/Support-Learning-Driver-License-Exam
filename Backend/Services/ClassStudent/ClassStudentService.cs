using AutoMapper;
using Backend.DTO.ClassStudent;
using Backend.Repository.ClassStudentRepository;

namespace Backend.Services.ClassStudent
{
    public class ClassStudentService : IClassStudentService
    {
        private readonly IClassStudentRepository _classStudentRepository;
        private readonly IMapper _mapper;

        public ClassStudentService(IClassStudentRepository classStudentRepository, IMapper mapper)
        {
            _classStudentRepository = classStudentRepository;
            _mapper = mapper;
        }

        public ICollection<ClassStudentDTO> GetAllCllassStudent()
        {
            try
            {
                var classStudents = _classStudentRepository.GetAll();
                return classStudents is null ? null : _mapper.Map<ICollection<ClassStudentDTO>>(classStudents);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<int>> AddStudentIntoClass(ClassStudentDTO classStudentDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var classStudents = _classStudentRepository.GetAll().
                    Where(p => p.StudentId == classStudentDTO.StudentId && p.ClassId == classStudentDTO.ClassId).
                    FirstOrDefault();
                if (classStudents is null) 
                {
                    var classStudent = _mapper.Map<DB.Models.ClassStudent>(classStudentDTO);
                    await _classStudentRepository.CreateAsync(classStudent);
                }
                else if (classStudents.Class.IsTheoryClass == true) 
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Học viên này đã đăng ký lớp học lý thuyết!";
                }
                else
                {
                    result.IsError = true;
                    result.Payload = -2;
                    result.ErrorMessage = "Học viên này đã đăng ký lớp học thực hành";
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
