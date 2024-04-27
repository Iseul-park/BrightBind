using BrightBind.Server.Dtos.Goal;
using BrightBind.Server.Models;

namespace BrightBind.Server.Interfaces
{
    public interface IGoalRepository
    {
        Task<Goal?> GetGoalByIdAsync(int id);
        Task<List<Goal>> GetGoalAsync();
        Task<Goal?> GetGoalByUserIdAsync(string user_id);

        Task<Goal> CreateGoalByUserIdAsync(string user_id, Goal goal);

        Task<Goal?> UpdateGoalAsync(string user_id, GoalRequest goalDto);

        Task<Goal?> DeleteGoalAsync(string user_id);
    }
}
