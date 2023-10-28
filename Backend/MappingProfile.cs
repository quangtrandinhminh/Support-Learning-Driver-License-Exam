using AutoMapper.Configuration;
using Backend.DB.Models;
using Backend.DTO.CourseDetails;
using Backend.DTO.Members;
using Backend.DTO.Mentor;
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
            CreateMap<CourseDetail, CourseDetailsDTO>()
                .ForMember(dto => dto.CourseId, otp => otp.MapFrom(entity => entity.Course.CourseId))
                .ForMember(dto => dto.CourseMonth, otp => otp.MapFrom(entity => entity.Course.CourseMonth))
                .ForMember(dto => dto.LimitStudent, otp => otp.MapFrom(entity => entity.Course.LimitStudent));
            CreateMap<DTO.CourseDetails.CourseDetailsDTO, DB.Models.CourseDetail>();

            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsDTO, DB.Models.News>();

            //User
            CreateMap<DB.Models.User, DTO.Users.UserDTO>();
            CreateMap<DTO.Users.UserDTO, DB.Models.User>();

            //Member
            CreateMap<Member, MemberDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.FullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone));

            CreateMap<DTO.Members.MemberDTO, DB.Models.Member>();
            CreateMap<DTO.Course.CourseRequestDTO, DB.Models.Course>();
            
            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsCreateDTO, DB.Models.News>();
            CreateMap<DTO.News.NewsUpdateDTO, DB.Models.News>();

            // Mentor
            CreateMap<Mentor, MentorDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.fullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.UserName, opt => opt.MapFrom(entity => entity.User.Username))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone))
                .ForMember(dto => dto.RoleId, opt => opt.MapFrom(entity => entity.User.RoleId))
                .ForMember(dto => dto.CreatedTime, opt => opt.MapFrom(entity => entity.User.CreateTime))
                .ForMember(dto => dto.Status, opt => opt.MapFrom(entity => entity.User.Status));
            CreateMap<DTO.Mentor.MentorDTO, DB.Models.Mentor>();

            // TeachingSchedule
            //CreateMap<DB.Models.TeachingSchedule, DTO.TeachingSchedule.TeachingScheduleDTO>()
                //.ForMember(dto => dto.CourseId, opt => opt.MapFrom(entity => entity.Course.CourseId));
            //CreateMap<DTO.TeachingSchedule.TeachingScheduleDTO, DB.Models.TeachingSchedule>();
        }
    }
}
