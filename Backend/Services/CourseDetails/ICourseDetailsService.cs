﻿using Backend.DTO.CourseDetails;

namespace Backend.Services.CourseDetails
{
    public interface ICourseDetailsService
    {
        public ICollection<CourseDetailsDTO>? GetAllCourseDetails();
        Task<ServiceResult<int>> CreateCourseDetails(CourseDetailsCreateDTO courseDetailsCreateDto);
    }
}
