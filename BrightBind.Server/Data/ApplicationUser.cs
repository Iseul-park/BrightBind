using BrightBind.Server.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BrightBind.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Nickname { get; set; }

        public List<Book> Books { get; set; } = new List<Book>();
        public List<Goal> Goals { get; set; } = new List<Goal>();
        public List<Review> Reviews { get; set; } = new List<Review>();

    }

    public record CreateUserDto(
        string Email,
        string Password,
        string Nickname
    );
}
