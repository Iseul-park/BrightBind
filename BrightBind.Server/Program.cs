
using BrightBind.Server.Data;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BrightBind.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddControllers();
            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<ApplicationUser>().
                AddEntityFrameworkStores<ApplicationDbContext>();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IBookRepository, BookRepository>();
            builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
            builder.Services.AddScoped<IGoalRepository, GoalRepository>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapCustomIdentityApi<ApplicationUser>();

            app.MapPost("/logout", async (SignInManager<ApplicationUser> SignInManager) =>
            {
                await SignInManager.SignOutAsync();
                return Results.Ok();
            }).RequireAuthorization();

            //make a call to the server to find out if it's logined or not and who is it
            /*app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var email = user.FindFirst(ClaimTypes.Email); // get the user's email from the claim
                return Results.Json(new { Email = email }); // return the email as a plain text response


            }).RequireAuthorization();*/

            app.MapGet("/pingauth", (ClaimsPrincipal user) =>
            {
                var emailClaim = user.FindFirst(ClaimTypes.Email);

                if (emailClaim != null)
                {
                    var email = emailClaim.Value;

                    return Results.Json(new { email }); // return as JSON
                }
                else
                {
                    return Results.NotFound();
                }
            }).RequireAuthorization();



            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(x => x
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .SetIsOriginAllowed(origin => true) // allow any origin
                    .AllowCredentials());

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
