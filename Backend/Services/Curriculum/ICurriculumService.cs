using Backend.DB.Models;

namespace Backend.Services.Curriculum
{
    public interface ICurriculumService
    {
        ServiceResult<ICollection<DB.Models.Curriculum>> GetAll();
    }
}
