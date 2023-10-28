namespace Backend.DTO.TeachingSchedule
{
    public class TeachingScheduleDTO
    {
        public int TeachingScheduleId { get; set; }

        public int MentorId { get; set; }

        public string CourseId { get; set; }

        public bool isPractice { get; set; }

        public DateTime teachingDate { get; set; }
    }
}
