using BrightBind.Server.Data;

namespace BrightBind.Server.Models
{
    public class Book
    {
        
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;

        public string? Brand { get; set; } = string.Empty;
        public int TotalPage { get; set; }

        public string? ImagePath { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool isComplete { get; set; }
        public bool isWishList { get; set; }

        public string? UserId { get; set; } // Naviagation

        public ApplicationUser? User { get; set; }
        //public string UserId { get; set; }

        // public DateTime CreateDate { get; set; }
        //public DateTime UpdateDate { get; set; }

        // One to Many relationship
        // public ICollection<Review>? Reviews { get; set; }
        public List<Review> reviews { get; set; } = new List<Review> { };


    }
}
