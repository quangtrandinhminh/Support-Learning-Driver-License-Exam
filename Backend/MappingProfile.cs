using AutoMapper.Configuration;
using System.Diagnostics;

namespace Backend
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            // Course
            CreateMap<DB.Models.Course, DTO.Course.CourseDTO>();
            CreateMap<DTO.Course.CourseDTO, DB.Models.Course>();

            //CourseDetails
            CreateMap<DB.Models.CourseDetail, DTO.CourseDetails.CourseDetailsDTO>();
            CreateMap<DTO.CourseDetails.CourseDetailsDTO, DB.Models.CourseDetail>();

            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsDTO, DB.Models.News>();

            //User
            CreateMap<DB.Models.User, DTO.Users.UserDTO>();
            CreateMap<DTO.Users.UserDTO, DB.Models.User>();

            //Member
            CreateMap<DB.Models.Member, DTO.Members.MemberDTO>();
            CreateMap<DTO.Members.MemberDTO, DB.Models.Member>();
            CreateMap<DTO.Course.CourseRequestDTO, DB.Models.Course>();
            
            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsRequestDTO, DB.Models.News>();

            // Mentor
            CreateMap<DB.Models.Mentor, DTO.Mentor.MentorDTO>();
            CreateMap<DTO.Mentor.MentorDTO, DB.Models.Mentor>();
        }
    }
}
