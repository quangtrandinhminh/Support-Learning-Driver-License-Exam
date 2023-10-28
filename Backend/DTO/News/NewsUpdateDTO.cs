namespace Backend.DTO.News
{
    public class NewsUpdateDTO
    {
        public int NewsId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }
        
        public bool Status { get; set; }
    }
}
