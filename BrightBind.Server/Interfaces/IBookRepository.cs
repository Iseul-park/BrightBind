using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace BrightBind.Server.Interfaces
{
    public interface IBookRepository
    {
        Task<List<Book>> GetBooksAsync();
        Task<Book?> GetByIdAsync(int id);

        Task<List<Book>?> GetBooksbyUserIdAsync(string user_id);
        Task<Book> CreateBookByUserIdAsync(string user_id, Book book);

        Task<Book?> UpdateBookAsync(int id, BookRequest bookDto);

        Task<Book?> DeleteBookAsync(int id);

    }
}
