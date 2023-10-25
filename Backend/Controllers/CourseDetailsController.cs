using Backend.DTO.CourseDetails;
using Backend.Services.Course;
using Backend.Services.CourseDetails;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("/api/CourseDetails")]
        public IActionResult GetAllCourse()
        {
            try
            {
                var courseDetails = _courseDetailsService.AllCourseDetails();
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

        [HttpGet("/api/CourseDetail")]
        public IActionResult GetCourseDetails(int courseMonth) 
        {
            try
            {
                List<CourseDetailsDTO> courseDetail = new List<CourseDetailsDTO>();
                List<List<CourseDetailsDTO>> courseDetails = new List<List<CourseDetailsDTO>>();
                var courses = _courseService.GetAll().
                    Where(p => p.CourseMonth == courseMonth).ToList();
                foreach (var course in courses) 
                {
                    courseDetail = _courseDetailsService.AllCourseDetails().
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
