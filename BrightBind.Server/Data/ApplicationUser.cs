using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BrightBind.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? Nickname { get; set; }
    }

    public record CreateUserDto(
        string Email,
    string Password,
    string Nickname
    //[Required]
);
}
