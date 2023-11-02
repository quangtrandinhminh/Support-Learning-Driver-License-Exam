using AutoMapper;
using Backend.DTO.Class;
using Backend.DTO.CourseDetails;
using Backend.Repository.ClassRepository;

namespace Backend.Services.Class
{
    public class ClassService : IClassService
    {
        private readonly IClassRepository _classRepository;
        private readonly IMapper _mapper;

        public ClassService(IClassRepository classRepository, IMapper mapper) 
        { 
            _classRepository = classRepository;
            _mapper = mapper;
        }

        public ICollection<ClassDTO> GetAllCllass()
        {
            try
            {
                var classes = _classRepository.GetAll();
                return classes is null ? null : _mapper.Map<ICollection<ClassDTO>>(classes);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
