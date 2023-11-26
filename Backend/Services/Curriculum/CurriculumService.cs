using AutoMapper;
using Backend.DTO.CourseContent;
using Backend.DTO.Curriculum;
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

        public ServiceResult<ICollection<CurriculumDTO>> GetAll()
        {
            var result = new ServiceResult<ICollection<CurriculumDTO>>();
            try
            {
                var curriculum = _curriculumRepository.GetAll();

                if (!curriculum.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy giáo trình!";
                }

                result.Payload = _mapper.Map<ICollection<CurriculumDTO>>(curriculum);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateCurriculum(CurriculumCreateDTO curriculumCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var curriculum = _mapper.Map<DB.Models.Curriculum>(curriculumCreateDto);
                await _curriculumRepository.AddAsync(curriculum);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> UpdateCurriculum(CurriculumDTO curriculumDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var curriculum = await _curriculumRepository.GetByIdAsync(curriculumDto.CurriculumId);
                if (curriculum == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy giáo trình!";
                    return result;
                }

                await _curriculumRepository.UpdateAsync(curriculum);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> DeleteCurriculum(int id)
        {
            var result = new ServiceResult<int>();
            try
            {
                var curriculum = await _curriculumRepository.GetByIdAsync(id);
                if (curriculum == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy giáo trình!";
                    return result;
                }

                await _curriculumRepository.DeleteAsync(id);
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
