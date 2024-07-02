using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Models;

namespace BrightBind.Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviewsByUserIdAsync(string userId);

        Task<List<Review>?> GetReviewsByBookIdAsync(int book_id); // getting all reviews by book ID
        Task<Review?> GetReviewByIdAsync(int id); // get only one review by review id

       // Task<List<Review?>> GetReviewsByUserIdAsync(string user_id);
        Task<Review> CreateReviewByBookIdAsync(int book_id, Review review);

        Task<Review?> UpdateReviewAsync(int id, ReviewRequest reviewDto); 
       
        Task<Review?> DeleteReviewAsync(int id);
    }
}
