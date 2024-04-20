using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BrightBind.Server.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly ApplicationDbContext _context;

        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review?> GetReviewByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<List<Review>?> GetReviewsByBookIdAsync(int book_id)
        {
            return await _context.Reviews.Where(r => r.BookId == book_id).ToListAsync();
        }

        public async Task<Review> CreateReviewByBookIdAsync(int book_id, Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review?> DeleteReviewAsync(int id)
        {
            var reviewModel = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id);

            if (reviewModel == null)
            {
                return null;
            }
            _context.Reviews.Remove(reviewModel);
            await _context.SaveChangesAsync();
            return reviewModel;
        }

        public async Task<Review?> UpdateReviewAsync(int id, ReviewRequest reviewDto)
        {
            var reviewModel = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id);
            if (reviewModel == null)
            {
                return null;
            }

            reviewModel.Title = reviewDto.Title;
            reviewModel.Comment = reviewDto.Comment;
            reviewModel.UpdateDate = reviewDto.UpdateDate;

            await _context.SaveChangesAsync();
            return reviewModel;
        }
    }
}
