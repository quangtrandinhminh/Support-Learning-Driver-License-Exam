﻿using Backend.DTO.ClassStudent;
using Backend.Services.ClassStudent;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassStudentController : Controller
    {
        private readonly IClassStudentService _classStudentService;
        public ClassStudentController(IClassStudentService classStudentService)
        {
            _classStudentService = classStudentService;
        }

        [HttpGet("/api/ClassStudent")]
        public IActionResult GetAll()
        {
            try
            {
                var classes = _classStudentService.GetAllClassStudent();
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

        [HttpGet("/api/ClassStudent/{classId}")]
        public async Task<ActionResult<ICollection<ClassStudentDetailsDTO>>> GetClassStudentByClassId(int classId)
        {
            var result = await _classStudentService.GetClassStudentByClassId(classId);
            if (result == null)
            {
                return NotFound(new
                {
                    error = "Không tìm thấy lớp học"
                });
            }
            return Ok(result.Payload);
        }

        [HttpPost("/api/ClassStudentTheory/{courseId}")]
        public async Task<ActionResult<int>> CreateAllClassStudent(string courseId)
        {
            var result = await _classStudentService.AddAllStudentsIntoTheoryClass(courseId);
            if (result.IsError)
            {
                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Đã thêm học viên vào lớp học ( " + result.Payload + " )");
        }

        [HttpPost("/api/ClassStudent")]
        public async Task<ActionResult<int>> CreateClassStudent(ClassStudentDTO classStudentDTO)
        {
            var result = await _classStudentService.AddStudentIntoClass(classStudentDTO);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                if (result.Payload == -2)
                {
                    return Conflict(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new
                {
                    error = result.ErrorMessage
                });
            }
            return Ok("Đã thêm học viên vào lớp");
        }
    }
}