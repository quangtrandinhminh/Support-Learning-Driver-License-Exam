using AutoMapper;
using Backend.DTO.CourseContent;
using Backend.Repository.CourseContentRepository;
using Backend.Repository.CurriculumRepository;

namespace Backend.Services.Curriculum
{
    public class CurriculumService : ICurriculumService
    {
        private readonly ICurriculumRepository _curriculumRepository;
        private readonly IMapper _mapper;

        public CurriculumService(ICurriculumRepository curriculumRepository
            , IMapper mapper)
        {
            _curriculumRepository = curriculumRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<DB.Models.Curriculum>> GetAll()
        {
            var result = new ServiceResult<ICollection<DB.Models.Curriculum>>();
            try
            {
                var curriculum = _curriculumRepository.GetAll();

                if (!curriculum.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy curriculum!";
                }

                result.Payload = _mapper.Map<ICollection<DB.Models.Curriculum>>(curriculum);
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
