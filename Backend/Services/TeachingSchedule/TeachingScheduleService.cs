using AutoMapper;
using Backend.DTO.TeachingSchedule;
using Backend.Repository.TeachingScheduleRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.TeachingSchedule
{
    public class TeachingScheduleService : ITeachingScheduleService
    {
        private readonly ITeachingScheduleRepository _teachingScheduleRepository;
        private readonly IMapper _mapper;

        public TeachingScheduleService(
            ITeachingScheduleRepository teachingScheduleRepository
            , IMapper mapper)
        {
            _teachingScheduleRepository = teachingScheduleRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<TeachingScheduleDTO>> GetAllTeachingSchedules()
        {
            var result = new ServiceResult<ICollection<TeachingScheduleDTO>>();
            try
            {
                var teachingSchedules = _teachingScheduleRepository.GetAll()
                    .Include(t => t.Course).ToList();

                if (!teachingSchedules.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lịch dạy!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<TeachingScheduleDTO>>(teachingSchedules);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        /// <summary>
        /// return exactly all teaching schedules of a mentor in a course
        /// </summary>
        /// <param name="mentorId"></param>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public ServiceResult<ICollection<TeachingScheduleDTO>> GetTeachingScheduleByMentorIdAndCourseId
            (int mentorId, string courseId)
        {
            var result = new ServiceResult<ICollection<TeachingScheduleDTO>>();
            try
            {
                var teachingSchedules = _teachingScheduleRepository.GetAll()
                    .Include(t => t.Course)
                    .Where(t => t.CourseId == courseId && t.MentorId == mentorId)
                    .OrderBy(t => t.CourseId)
                    .ThenBy(t => t.TeachingDate);

                if (!teachingSchedules.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lịch dạy!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<TeachingScheduleDTO>>(teachingSchedules);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }

            return result;
        }

        /// <summary>
        /// return all teaching schedules in course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        public ServiceResult<ICollection<TeachingScheduleDTO>> GetTeachingScheduleByCourseId(string courseId)
        {
            var result = new ServiceResult<ICollection<TeachingScheduleDTO>>();
            try
            {
                var teachingSchedules = _teachingScheduleRepository.GetAll()
                    .Include(t => t.Course)
                    .Where(x => x.CourseId == courseId)
                    
                    .OrderBy(t => t.CourseId);

                if (!teachingSchedules.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy lịch dạy!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<TeachingScheduleDTO>>(teachingSchedules);
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
