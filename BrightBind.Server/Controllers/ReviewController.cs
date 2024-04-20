using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Mappers;
using BrightBind.Server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BrightBind.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IReviewRepository _reviewRepository;
        public ReviewController(ApplicationDbContext context, IReviewRepository reviewRepository)
        {
            _context = context;
            _reviewRepository = reviewRepository;
        }

        [HttpGet("GetReviewById/{id}")]
        public async Task<IActionResult> GetReviewById([FromRoute] int id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return Ok(review.ToReviewDto());
        }

        [HttpGet("GetAllReviewsByBookId/{book_id}")]
        public async Task<IActionResult> GetReviewsByBookId([FromRoute] int book_id)
        {
            var reviews = await _reviewRepository.GetReviewsByBookIdAsync(book_id);
            if (reviews == null)
            {
                return NotFound("");
            }
            return Ok(reviews);
        }

        [HttpPost("CreateReviewByBookId/{book_id}")]
        public async Task<IActionResult> CreateReviewBybookId([FromRoute] int book_id, [FromBody] ReviewRequest reviewDto)
        {
            try
            {
                var reviewModel = reviewDto.ToReviewFromReviewRequest();
                reviewModel.BookId = book_id;

                await _reviewRepository.CreateReviewByBookIdAsync(book_id, reviewModel);

                return CreatedAtAction(nameof(GetReviewById), new { id = reviewModel.Id }, reviewModel.ToReviewDto());

            }

            catch (Exception ex)
            {
                return BadRequest("Fail to creat a review: " + ex.Message);
            }
        }

        [HttpPut("UpdateReview/{id}")]
        public async Task<IActionResult> UpdateReview([FromRoute] int id, [FromBody] ReviewRequest reviewDto)
        {
            var reviewModel = await _reviewRepository.UpdateReviewAsync(id, reviewDto);
            if (reviewModel == null)
            {
                return NotFound("");
            }

            return Ok(reviewModel.ToReviewDto());
        }

        [HttpDelete("DeleteReview/{id}")]
        public async Task<IActionResult> DeleteReview([FromRoute] int id)
        {
            var reviewModel = await _reviewRepository.DeleteReviewAsync(id);

            if (reviewModel == null)
            {
                return NotFound("");
            }

            return NoContent();
        }

    }
}
