namespace BrightBind.Server.Dtos.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; }

    }
}
