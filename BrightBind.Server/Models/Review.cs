using BrightBind.Server.Data;

namespace BrightBind.Server.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; } = DateTime.Now;

        public int BookId { get; set; } // Naviagation

        public Book Book { get; set; }
    }
}
