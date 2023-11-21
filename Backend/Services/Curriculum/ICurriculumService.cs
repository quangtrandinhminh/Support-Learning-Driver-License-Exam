using Backend.DB.Models;
using Backend.DTO.Curriculum;

namespace Backend.Services.Curriculum
{
    public interface ICurriculumService
    {
        ServiceResult<ICollection<CurriculumDTO>> GetAll();

        Task<ServiceResult<int>> CreateCurriculum(CurriculumCreateDTO curriculumCreateDto);

        Task<ServiceResult<int>> UpdateCurriculum(CurriculumDTO curriculumDto);

        Task<ServiceResult<int>> DeleteCurriculum(int id);
    }
}
