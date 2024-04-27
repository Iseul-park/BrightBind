using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Book;
using BrightBind.Server.Dtos.Goal;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BrightBind.Server.Repository
{
    public class GoalRepository : IGoalRepository
    {
        private readonly ApplicationDbContext _context;

        public GoalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Goal> CreateGoalByUserIdAsync(string user_id, Goal goal)
        {
            await _context.Goals.AddAsync(goal);
            await _context.SaveChangesAsync();
            return goal;
        }

        public async Task<Goal?> DeleteGoalAsync(string user_id)
        {
            var goalModel = await _context.Goals.FirstOrDefaultAsync(g => g.UserId == user_id);

            if (goalModel == null)
            {
                return null;
            }
            _context.Goals.Remove(goalModel);
            await _context.SaveChangesAsync();
            return goalModel;
        }

        public async Task<List<Goal>> GetGoalAsync()
        {
            return await _context.Goals.ToListAsync();
        }

        public async Task<Goal?> GetGoalByIdAsync(int id)
        {
            return await _context.Goals.FindAsync(id);
        }

        public async Task<Goal?> GetGoalByUserIdAsync(string user_id)
        {
            return await _context.Goals.FirstOrDefaultAsync(g => g.UserId == user_id);
        }

        public async Task<Goal?> UpdateGoalAsync(string user_id, GoalRequest goalDto)
        {
            var goalModel = await _context.Goals.FirstOrDefaultAsync(g => g.UserId == user_id);
            if (goalModel == null)
            {
                return null;
            }

            goalModel.YearlyGoal = goalDto.YearlyGoal;
            goalModel.MonthlyGoal = goalDto.MonthlyGoal;

            await _context.SaveChangesAsync();
            return goalModel;
        }
    }
}
