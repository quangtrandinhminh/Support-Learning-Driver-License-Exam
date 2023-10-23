namespace Backend.DTO.News
{
    public class NewsRequestDTO
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public int StaffId { get; set; }

        public bool Status { get; set; }
    }
}
