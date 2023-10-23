namespace Backend
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            // Course
            CreateMap<DB.Models.Course, DTO.Course.CourseDTO>();
            CreateMap<DTO.Course.CourseDTO, DB.Models.Course>();

            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsDTO, DB.Models.News>();
            CreateMap<DTO.News.NewsRequestDTO, DB.Models.News>();
        }
    }
}
