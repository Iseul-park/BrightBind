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
                UpdateDate = reviewModel.UpdateDate
                //BookId = reviewModel.BookId
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
