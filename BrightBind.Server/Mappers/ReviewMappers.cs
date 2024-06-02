using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Models;
namespace BrightBind.Server.Mappers
{
    public static class ReviewMappers
    {
        public static ReviewDto ToReviewDto (this Review reviewModel)
        {
            return new ReviewDto
            {
                Id = reviewModel.Id,
                Title = reviewModel.Title,
                Comment = reviewModel.Comment,
                CreateDate = reviewModel.CreateDate,
                UpdateDate = reviewModel.UpdateDate,
                Book = new BookDto
                {
                    Title = reviewModel.Book.Title,
                    Author = reviewModel.Book.Author,
                    Brand = reviewModel.Book.Brand,
                    ImagePath = reviewModel.Book.ImagePath,
                    StartDate = reviewModel.Book.StartDate,
                    EndDate = reviewModel.Book.EndDate,
                    IsComplete = reviewModel.Book.IsComplete,
                    IsWishList = reviewModel.Book.IsWishList
                }
            };
        }

        public static ReviewDto ToUpdateReviewDto(this Review reviewModel)
        {
            return new ReviewDto
            {
                Id = reviewModel.Id,
                Title = reviewModel.Title,
                Comment = reviewModel.Comment,
                CreateDate = reviewModel.CreateDate,
                UpdateDate = reviewModel.UpdateDate,
            };
        }

        public static Review ToReviewFromReviewRequest(this ReviewRequest review)
        {
            return new Review
            {
                Title = review.Title,
                Comment = review.Comment,
                UpdateDate = review.UpdateDate
            };
        }
    }
}
