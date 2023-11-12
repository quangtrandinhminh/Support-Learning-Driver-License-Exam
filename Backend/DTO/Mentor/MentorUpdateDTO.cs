namespace Backend.DTO.Mentor
{
    public class MentorUpdateDTO
    {
        public int MentorId { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string ResidenceAddress { get; set; } = null!;

        public bool isTeachingTheory { get; set; }

        public bool isTeachingPractice { get; set; }
    }
}
