namespace Backend
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<DB.Models.Course, DTO.Course.CourseDTO>();
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
        }
    }
}
