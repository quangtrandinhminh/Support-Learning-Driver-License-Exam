namespace Backend
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            // Course
            CreateMap<DB.Models.Course, DTO.Course.CourseDTO>();
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
