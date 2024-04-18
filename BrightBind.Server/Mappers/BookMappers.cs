using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Models;
namespace BrightBind.Server.Mappers
{
    public static class BookMappers
    {
        public static BookDto ToBookDto (this Book bookModel)
        {
            return new BookDto
            {
                Id = bookModel.Id,
                Title = bookModel.Title,
                Author = bookModel.Author,
                Brand = bookModel.Brand,
                TotalPage = bookModel.TotalPage,
                ImagePath = bookModel.ImagePath,
                StartDate = bookModel.StartDate,
                EndDate = bookModel.EndDate,
                IsComplete = bookModel.IsComplete,
                IsWishList = bookModel.IsWishList
            };
        }

        public static Book ToBookFromBookRequest(this BookRequest book)
        {
            return new Book
            {
                Title = book.Title,
                Author = book.Author,
                Brand = book.Brand,
                TotalPage = book.TotalPage,
                ImagePath = book.ImagePath,
                StartDate = book.StartDate,
                EndDate = book.EndDate,
                IsComplete = book.IsComplete,
                IsWishList = book.IsWishList,
               // UserId = book.UserId
            };
        }
    }
}
