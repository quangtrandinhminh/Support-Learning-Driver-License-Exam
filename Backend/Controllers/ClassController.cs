using Backend.DTO.Class;
using Backend.Services.Class;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;

        public ClassController(IClassService classService)
        {
            _classService = classService;
        }

        [HttpGet("/api/Class")]
        public IActionResult GetAll() 
        {
            try
            {
                var classes = _classService.GetAllClass();
                if (classes == null)
                {
                    return NotFound();
                }
                return Ok(classes);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        // get all dates of class
        [HttpGet("/api/Class/{classId}/dates")]
        public async Task<ActionResult<ICollection<DateTime>>> GetAllDatesOfClass(int classId)
        {
            var result = await _classService.GetAllDatesOfClass(classId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("/api/Class/{mentorId}")]
        public IActionResult GetClassByMentorId (int mentorId)
        {
            try
            {
                var classes = _classService.GetAllClass().
                    Where(p => p.MentorId == mentorId).
                    Where(q => q.IsTheoryClass == false);
                if (classes == null)
                {
                    return NotFound();
                }
                return Ok(classes);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<ICollection<ClassDTO>>> GetAllClassesByCourseId(string courseId)
        {
            var result = await _classService.GetAllClassesByCourseId(courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("course/mentor")]
        public async Task<ActionResult<ICollection<ClassDTO>>> GetAllClassesByMentorId(int mentorId, string courseId)
        {
            var result = await _classService.GetAllClassesByMentorId(mentorId, courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("course/{courseId}/theory")]
        public async Task<ActionResult<ICollection<ClassDTO>>> GetAllTheoryClassesByCourseId(string courseId)
        {
            var result = await _classService.GetAllTheoryClassesByCourseId(courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        // get all practice class by mentor id
        [HttpGet("course/mentor/practice")]
        public async Task<ActionResult<ICollection<ClassDTO>>> GetAllPracticeClassesByMentorId(string courseId,
            int mentorId)
        {
            var result = await _classService.GetAllPracticeClassesByMentorId(mentorId, courseId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }


        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<int>> CreateClass(ClassCreateDTO classCreateDto)
        {
            var result = await _classService.CreateClass(classCreateDto);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã thêm lớp học");
        }

        [HttpPost]
        [Route("addClassPracticeByMentor")]
        public async Task<ActionResult<int>> CreateClassByMentor(ICollection<ClassCreatePracticeDTO> classCreatePracticeDTOs)
        {
            var result = await _classService.CreateClassPracticeByMentor(classCreatePracticeDTOs);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã đăng kí lịch thành công" + " ( " + result.Payload + " )");
        }

        [HttpPut]
        [Route("addMentor")]
        public async Task<ActionResult<int>> AddMentorIntoClass(ClassMentorDTO classMentorDTO)
        {
            var result = await _classService.AddMentorIntoClass(classMentorDTO);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã đăng kí lịch thành công");
        }
    }
}
