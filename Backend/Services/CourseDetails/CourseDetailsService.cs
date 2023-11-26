﻿using AutoMapper;
using Backend.DB.Models;
using Backend.DTO.Course;
using Backend.DTO.CourseDetails;
using Backend.Repository.CourseDetailsRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.CourseDetails
{
    public class CourseDetailsService : ICourseDetailsService
    {
        private readonly ICourseDetailsRepository _courseDetailsRepository;
        private readonly IMapper _mapper;

        public CourseDetailsService(ICourseDetailsRepository courseDetailsRepository, IMapper mapper)
        {
            _courseDetailsRepository = courseDetailsRepository;
            _mapper = mapper;
        }

        public ICollection<CourseDetailsDTO>? GetAllCourseDetails()
        {
            try
            {
                var courseDetails = _courseDetailsRepository.GetAll().
                    Include(c => c.Course).ToList(); ;
                return courseDetails is null ? null : _mapper.Map<ICollection<CourseDetailsDTO>>(courseDetails);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<ServiceResult<int>> CreateCourseDetails
            (ICollection<CourseDetailsCreateDTO> courseDetailsCreateDto)
        {
            var result = new ServiceResult<int>();
            int i = 0;
            var courseDetail = courseDetailsCreateDto.ElementAt(0);
            var m = courseDetail.CourseTimeEnd;
            try
            {
                foreach (var c in courseDetailsCreateDto) 
                { 
                    if (c.CourseTimeEnd < c.CourseTimeStart)
                    {
                        result.IsError = true;
                        result.Payload = 0;
                        result.ErrorMessage = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                        return result;
                    }
                    if (i != 0)
                    {
                        if (c.CourseTimeStart < m)
                        {
                            result.IsError = true;
                            result.Payload = -1;
                            result.ErrorMessage = "Ngày bắt đầu phải lớn hơn ngày kết thúc của kỳ trước";
                            return result;
                        }
                        var courseDetaill = _mapper.Map<DB.Models.CourseDetail>(c);
                        courseDetaill.Status = true;

                        await _courseDetailsRepository.CreateAsync(courseDetaill);
                        m = courseDetail.CourseTimeEnd;
                    }
                    else
                    {
                        var courseDetaill = _mapper.Map<DB.Models.CourseDetail>(c);
                        courseDetaill.Status = true;

                        await _courseDetailsRepository.CreateAsync(courseDetaill);
                    }
                    i++;
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<ICollection<CourseDetailsDTO>>> GetCourseDetailsByCourse(string courseId)
        {
            var result = new ServiceResult<ICollection<CourseDetailsDTO>>();
            try
            {
                var courseDetails = await _courseDetailsRepository.GetAll()
                    .Include(c => c.Course)
                    .Where(p => p.CourseId == courseId).ToListAsync();
                if (!courseDetails.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy nội dung khóa học";
                    return result;
                }
                
                result.Payload = _mapper.Map<ICollection<CourseDetailsDTO>>(courseDetails);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> UpdateCourseDetails
            (ICollection<CourseDetailsCreateDTO> courseDetailsCreateDto)
        {
            var result = new ServiceResult<int>();
            int i = 0;
            var courseDetail = courseDetailsCreateDto.ElementAt(0);
            var m = courseDetail.CourseTimeEnd;
            try
            {
                foreach (var c in courseDetailsCreateDto)
                {
                    if (c.CourseTimeEnd < c.CourseTimeStart)
                    {
                        result.IsError = true;
                        result.Payload = 0;
                        result.ErrorMessage = "Ngày kết thúc phải lớn hơn ngày bắt đầu";
                        return result;
                    }
                    if (i != 0)
                    {
                        if (c.CourseTimeStart < m)
                        {
                            result.IsError = true;
                            result.Payload = -1;
                            result.ErrorMessage = "Ngày bắt đầu phải lớn hơn ngày kết thúc của kỳ trước";
                            return result;
                        }
                        var courseDetaill = _mapper.Map<DB.Models.CourseDetail>(c);
                        courseDetaill.Status = true;

                        await _courseDetailsRepository.UpdateAsync(courseDetaill);
                        m = courseDetail.CourseTimeEnd;
                    }
                    else
                    {
                        var courseDetaill = _mapper.Map<DB.Models.CourseDetail>(c);
                        courseDetaill.Status = true;

                        await _courseDetailsRepository.CreateAsync(courseDetaill);
                    }
                    i++;
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
