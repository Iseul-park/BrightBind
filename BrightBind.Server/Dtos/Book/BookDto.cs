namespace BrightBind.Server.Dtos.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? Brand { get; set; } = string.Empty;
        public int TotalPage { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsComplete { get; set; }
        public bool IsWishList { get; set; }

        public string UserId { get; set; }

        //public List<ReviewDto> Reviews { get; set; }

    }
}
