namespace Backend.DTO.TeachingSchedule
{
    public class TeachingScheduleDTO
    {
        public string CourseId { get; set; }

        public int ClassId { get; set; }

        public string LessonContent { get; set; }

        public string DayOfWeek { get; set; }

        public bool IsTheory { get; set; }

        public DateTime Date { get; set; }

        public bool IsNight { get; set; }

        public string Shift { get; set; }

        public string Location { get; set; }
    }
}
