namespace Backend.DTO.CourseDetails
{
    public class CourseDetailsCreateDTO
    {
        public string CourseContent { get; set; }
        public DateTime CourseTimeStart { get; set; }
        public DateTime CourseTimeEnd { get; set; }
        public string CourseId { get; set; }
    }
}
