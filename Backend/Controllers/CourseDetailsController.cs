using Backend.DTO.CourseDetails;
using Backend.Services.Course;
using Backend.Services.CourseDetails;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Backend.Controllers
{
    public class CourseDetailsController : Controller
    {
        private readonly ICourseDetailsService _courseDetailsService;
        private readonly ICourseService _courseService;

        public CourseDetailsController(ICourseDetailsService courseDetailsService, ICourseService courseService)
        {
            _courseDetailsService = courseDetailsService;
            _courseService = courseService;
        }

        [HttpGet("CourseDetails")]
        public IActionResult GetAllCourseDetails()
        {
            try
            {
                var courseDetails = _courseDetailsService.GetAllCourseDetails();
                if (courseDetails == null)
                {
                    return NotFound();
                }
                return Ok(courseDetails);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }

        [HttpGet("CourseDetail")]
        public IActionResult GetCourseDetailsByCourseMonth(int courseMonth) 
        {
            try
            {
                List<CourseDetailsDTO> courseDetail = new List<CourseDetailsDTO>();
                List<List<CourseDetailsDTO>> courseDetails = new List<List<CourseDetailsDTO>>();
                var courses = _courseService.GetAll().
                    Where(c => c.CourseMonth == courseMonth)
                    .ToList();
                foreach (var course in courses) 
                {
                    courseDetail = _courseDetailsService.GetAllCourseDetails().
                    Where(q => q.CourseId.Equals(course.CourseId)).ToList();

                    courseDetails.Add(courseDetail);
                }
                if (courseDetails == null)
                {
                    return NotFound();
                }
                return Ok(courseDetails);
            }
            catch (Exception a)
            {
                Console.WriteLine(a);
                throw;
            }
        }
    }
}
