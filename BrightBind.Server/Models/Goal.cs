using BrightBind.Server.Data;

namespace BrightBind.Server.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public int YearlyGoal { get; set; }
        public int MonthlyGoal { get; set; }

        public string? UserId { get; set; } // Naviagation

        public ApplicationUser? User { get; set; }

    }
}
