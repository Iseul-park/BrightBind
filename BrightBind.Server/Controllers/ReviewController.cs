using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Review;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace BrightBind.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IReviewRepository _reviewRepository;
        private readonly IBookRepository _bookRepository;
        public ReviewController(ApplicationDbContext context, IReviewRepository reviewRepository, IBookRepository bookRepository)
        {
            _context = context;
            _reviewRepository = reviewRepository;
            _bookRepository = bookRepository;
        }

        [HttpGet("GetReviewsByUserId/{userId}")]
        public async Task<IActionResult> GetReviewsByUserId([FromRoute] string userId)
        {
            var reviews = await _reviewRepository.GetReviewsByUserIdAsync(userId);

            var reviewDtos = reviews.Select(review => review.ToReviewDto()).ToList();

            return Ok(reviewDtos);
        }


        [HttpGet("GetReviewByReviewId/{id}")]
        public async Task<IActionResult> GetReviewById([FromRoute] int id)
        {
            var review = await _reviewRepository.GetReviewByIdAsync(id);

            if (review == null)
            {
                return NotFound();
            }


            var book = await _bookRepository.GetByIdAsync(review.BookId);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            review.Book = book;

            return Ok(review.ToReviewDto());
        }

        [HttpGet("GetAllReviewsByBookId/{book_id}")]
        public async Task<IActionResult> GetReviewsByBookId([FromRoute] int book_id)
        {
            var book = await _bookRepository.GetByIdAsync(book_id);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            var reviews = await _reviewRepository.GetReviewsByBookIdAsync(book_id);
            if (reviews == null)
            {
                return NotFound("");
            }

            var reviewDtos = reviews.Select(review => review.ToReviewDto()).ToList();

            return Ok(reviewDtos);
        }

        [HttpPost("CreateReviewByBookId/{book_id}")]
        public async Task<IActionResult> CreateReviewBybookId([FromRoute] int book_id, [FromBody] ReviewRequest reviewDto)
        {
            try
            {
                var book = await _bookRepository.GetByIdAsync(book_id);
                if (book == null)
                {
                    return NotFound("Book not found.");
                }

                var reviewModel = reviewDto.ToReviewFromReviewRequest();
                reviewModel.BookId = book_id;
                reviewModel.Book = book;

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

            return Ok(reviewModel.ToUpdateReviewDto());
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
