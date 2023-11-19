using Backend.DB.Models;

namespace Backend.Repository.CurriculumRepository
{
    public interface ICurriculumRepository
    {
        IQueryable<Curriculum>? GetAll();
    }
}
