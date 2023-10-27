namespace Backend.DTO.News
{
    public class NewsCreateDTO
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }

        public int StaffId { get; set; }

        public bool Status { get; set; }
    }
}
