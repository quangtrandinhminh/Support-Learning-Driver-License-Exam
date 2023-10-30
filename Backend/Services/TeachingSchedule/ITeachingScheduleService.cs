using Backend.DTO.TeachingSchedule;

namespace Backend.Services.TeachingSchedule
{
    public interface ITeachingScheduleService
    {
        ServiceResult<ICollection<TeachingScheduleDTO>> GetAllTeachingSchedules();

        ServiceResult<ICollection<TeachingScheduleDTO>> GetTeachingScheduleByMentorIdAndCourseId
            (int mentorId, string courseId);

        ServiceResult<ICollection<TeachingScheduleDTO>> GetTeachingScheduleByCourseId(string courseId);
    }
}
