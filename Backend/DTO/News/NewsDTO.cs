namespace Backend.DTO.News
{
    public class NewsDTO
    {
        public int NewsId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }

        public int StaffId { get; set; }

        public DateTime CreatedTime { get; set; }

        public bool Status { get; set; }
    }
}
