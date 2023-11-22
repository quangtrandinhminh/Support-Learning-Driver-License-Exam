using Backend.DTO.Lesson;
using Backend.Services.Lesson;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _lessonService.GetAllLesson();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("class-student/{classStudentId}")]
        public IActionResult GetLessonsByClassStudentId(int classStudentId)
        {
            var result = _lessonService.GetLessonsByClassStudentId(classStudentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /// <summary>
        /// Return list of lessons for student by studentId from startDate to endDate
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetLessonsByCourseIdAndStudentId(DateTime startDate
            , DateTime endDate, string studentId)
        {
            var result = await _lessonService.GetLessonsByStudentId(startDate, endDate, studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /// <summary>
        /// Return list of theory lessons for student by studentId
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        [HttpGet("theory/student/{studentId}")]
        public async Task<IActionResult> GetTheoryLessonsByStudentId(string studentId)
        {
            var result = await _lessonService.GetTheoryLessonsByStudentId(studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /// <summary>
        /// Return list of practice lessons for student by studentId
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        [HttpGet("practice/student/{studentId}")]
        public async Task<IActionResult> GetPracticeLessonsByStudentId(string studentId)
        {
            var result = await _lessonService.GetPracticeLessonsByStudentId(studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /// <summary>
        /// Create practice lessons for all students in course by the practice class is created by mentor
        /// </summary>
        /// <param name="lessonCreateDto"></param>
        /// <returns></returns>
        /*[HttpPost("createPracticeLesson")]
        public async Task<IActionResult> CreateLesson(LessonCreateDTO lessonCreateDto){
            var result = await _lessonService.CreatePracticeLessons(lessonCreateDto);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm buổi học thực hành thành công!");
        }*/

        /// <summary>
        /// Create theory lesson with separate title for all students in course
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="lessonCreateDtos"></param>
        /// <returns></returns>
        [HttpPost("createTheoryLesson")]
        public async Task<IActionResult> CreateTheoryLesson(string courseId, ICollection<LessonTheoryCreateDTO> lessonCreateDtos)
        {
            var result = await _lessonService.CreateTheoryLessons(courseId, lessonCreateDtos);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm buổi học lý thuyết thành công! " + "("+result.Payload+")");
        }

        /// <summary>
        /// Create theory lesson with 1 title for all students in course
        /// </summary>
        /// <param name="lessonTheoryCreateDto"></param>
        /// <returns></returns>
        /*[HttpPost("createTheoryLessonAuto")]
        public async Task<IActionResult> CreateTheoryLessonAuto(LessonTheory lessonTheoryCreateDto)
        {
            var result = await _lessonService.CreateTheoryLessonAuto(lessonTheoryCreateDto);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm buổi học lý thuyết thành công!");
        }*/

        /// <summary>
        /// Create practice lesson with date data from courseDetails for all students in course
        /// </summary>
        /// <param name="courseId"></param>
        /// <returns></returns>
        [HttpPost("createPracticeLessonAuto")]
        public async Task<IActionResult> CreatePracticeLessonAuto(string courseId)
        {
            var result = await _lessonService.CreatePracticeLessonsAuto(courseId);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm buổi học thực hành thành công! " + "(" + result.Payload + ")");
        }

        /// <summary>
        /// Return list of teaching schedule for mentor by mentorId
        /// </summary>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <param name="mentorId"></param>
        /// <returns></returns>
        [HttpGet("teaching-schedule/{mentorId}")]
        public async Task<IActionResult> GetTeachingScheduleByMentorId(DateTime startDate
            , DateTime endDate, int mentorId, string courseId)
        {
            var result = await _lessonService.GetTeachingScheduleByMentorId(startDate, endDate, mentorId, courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        /// <summary>
        /// Return list of lessons of class by date
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="date"></param>
        /// <returns></returns>
        [HttpGet("attendance/{classId}/{date}")]
        public async Task<IActionResult> GetLessonsByClassIdAndDate(int classId, DateTime date)
        {
            var result = await _lessonService.GetLessonsByClassIdAndDate(classId, date);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPatch("attendance")]
        public async Task<IActionResult> CheckAttendanceForStudents(ICollection<LessonUpdateAttendanceDTO> lessons)
        {
            var result = await _lessonService.CheckAttendanceForStudents(lessons);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Điểm danh thành công!" + " (" + result.Payload + ")");
        }

        /// <summary>
        /// Check attendance for student by studentId
        /// </summary>
        /// <param name="studentId"></param>
        /// <returns></returns>
        [HttpPatch("attendance/{studentId}")]
        public async Task<IActionResult> CheckAttendanceForStudent(string studentId)
        {
            var result = await _lessonService.CheckAttendanceForStudent(studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Điểm danh thành công!" + " (" + result.Payload + ")");
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateLesson(LessonUpdateDTO lessonUpdateDto)
        {
            var result = await _lessonService.UpdateLesson(lessonUpdateDto);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Cập nhật buổi học thành công!");
        }
    }
}
