using Backend.DB.Models;

namespace Backend.Repository.TeachingScheduleRepository
{
    public interface ITeachingScheduleRepository
    {
        IQueryable<TeachingSchedule>? GetAll();

        Task<TeachingSchedule?> CreateAsync(TeachingSchedule TeachingSchedule);

        Task<TeachingSchedule?> UpdateAsync(TeachingSchedule TeachingSchedule);
    }
}
