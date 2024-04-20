using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Models;

namespace BrightBind.Server.Interfaces
{
    public interface IReviewRepository
    {
        //Task<List<Book>> GetReviewsAsync();
        Task<List<Review>?> GetReviewsByBookIdAsync(int book_id); // getting all reviews by book ID
        Task<Review?> GetReviewByIdAsync(int id); // get only one review by review id

       // Task<List<Review?>> GetReviewsByUserIdAsync(string user_id);
        Task<Review> CreateReviewByBookIdAsync(int book_id, Review review);

        Task<Review?> UpdateReviewAsync(int id, ReviewRequest reviewDto); 
        // are we able to update the review by review id? or it has to be a book id?

        Task<Review?> DeleteReviewAsync(int id);
    }
}
