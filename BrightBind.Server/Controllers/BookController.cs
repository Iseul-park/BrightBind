using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Net;

namespace BrightBind.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBookRepository _bookRepository;

        public BookController(ApplicationDbContext context, IBookRepository bookRepository)
        {
            _context = context;
            _bookRepository = bookRepository;
        }

        [HttpGet("GetAllBooks")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookRepository.GetBooksAsync();
                var bookDto = books.Select(b => b.ToBookDto());
            //   var books = _context.Books.ToList().Select(b => b);
            return Ok(books);
        }

        [HttpGet("GetBookById/{id}")]
        public async Task <IActionResult> GetById([FromRoute] int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book.ToBookDto());
        }


        [HttpGet("GetBooksByUserId/{user_id}")]
        public async Task <IActionResult> GetBooksbyUserId([FromRoute] string user_id)
        {
            var books = await _bookRepository.GetBooksbyUserIdAsync(user_id);
            if (books.Count == 0)
            {
                return NotFound("");
            }
            return Ok(books);
        }

        [HttpPost("CreateBookByUserId/{user_id}")]
        public async Task<IActionResult> CreateBookByUserId([FromRoute] string user_id, [FromBody] BookRequest bookDto)
        {
            try
            {
                var bookModel = bookDto.ToBookFromBookRequest();
            bookModel.UserId = user_id;

            await _bookRepository.CreateBookByUserIdAsync(user_id, bookModel);
         
            return CreatedAtAction(nameof(GetById), new { id = bookModel.Id }, bookModel.ToBookDto());
        
            }

            catch (Exception ex)
            {
                return BadRequest("Fail to creat a book: " + ex.Message);
            }
        }

        [HttpPut("UpdateBook/{id}")]
        public async Task <IActionResult> UpdateBook([FromRoute] int id, [FromBody] BookRequest bookDto)
        {
            var bookModel = await _bookRepository.UpdateBookAsync(id, bookDto);
            if (bookModel == null)
            {
                return NotFound("");
            }

            return Ok(bookModel.ToBookDto());
        }

        [HttpDelete("DeleteBook/{id}")]
        public async Task <IActionResult> DeleteBook([FromRoute] int id)
        {
            var bookModel = await _bookRepository.DeleteBookAsync(id);

            if (bookModel == null)
            {
                return NotFound("");
            }

            return NoContent();
        }
            /*   [HttpGet("{user_id}")]
               public IActionResult GetSingleBook([FromRoute] string user_id)
               {
                   var books = _context.Books.All(user_id);
                   if (books == null)
                   {
                       return NotFound("");
                   }
                   return Ok(books);

               }*/
        }
}
