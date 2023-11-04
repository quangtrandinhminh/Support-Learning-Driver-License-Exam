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

        [HttpGet("course-student/{studentId}")]
        public async Task<IActionResult> GetLessonsByCourseIdAndStudentId(string studentId)
        {
            var result = await _lessonService.GetLessonsByCourseIdAndStudentId(studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPost("createPracticeLesson")]
        public async Task<IActionResult> CreateLesson(LessonCreateDTO lessonCreateDto){
            var result = await _lessonService.CreateLesson(lessonCreateDto);
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
        }

        [HttpPost("createTheoryLesson")]
        public async Task<IActionResult> CreateTheoryLesson(LessonTheoryCreateDTO lessonCreateDto)
        {
            var result = await _lessonService.CreateTheoryLesson(lessonCreateDto);
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
        }
    }
}
