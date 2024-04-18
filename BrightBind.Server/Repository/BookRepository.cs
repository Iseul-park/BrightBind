using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BrightBind.Server.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context) 
        {
            _context = context;

        }

        public async Task<Book> CreateBookByUserIdAsync(string user_id, Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<Book?> DeleteBookAsync(int id)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);

            if (bookModel == null)
            {
                return null;
            }
            _context.Books.Remove(bookModel);
            await _context.SaveChangesAsync();
            return bookModel;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
            return await _context.Books.ToListAsync();
        }

        public async Task<List<Book>?> GetBooksbyUserIdAsync(string user_id)
        {
            return await _context.Books.Where(b => b.UserId == user_id).ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        public async Task<Book?> UpdateBookAsync(int id, BookRequest bookDto)
        {
            var bookModel = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (bookModel == null)
            {
                return null;
            }

            bookModel.Title = bookDto.Title;
            bookModel.Author = bookDto.Author;
            bookModel.StartDate = bookDto.StartDate;
            bookModel.EndDate = bookDto.EndDate;
            bookModel.Brand = bookDto.Brand;
            bookModel.ImagePath = bookDto.ImagePath;
            bookModel.TotalPage = bookDto.TotalPage;
            bookModel.IsComplete = bookDto.IsComplete;
            bookModel.IsWishList = bookDto.IsWishList;

            await _context.SaveChangesAsync();
            return bookModel;

        }
    }
}
