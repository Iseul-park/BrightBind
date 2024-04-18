namespace BrightBind.Server.Dtos.Book
{
    public class BookRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string? Brand { get; set; } = string.Empty;
        public int TotalPage { get; set; }
        public string? ImagePath { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsComplete { get; set; }
        public bool IsWishList { get; set; }
        //public string UserId { get; set; }


    }
}
