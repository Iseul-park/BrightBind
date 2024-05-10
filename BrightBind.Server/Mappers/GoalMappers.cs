using BrightBind.Server.Dtos.Goal;
using BrightBind.Server.Models;
namespace BrightBind.Server.Mappers
{
    public static class GoalMappers
    {
        public static GoalDto ToGoalDto (this Goal goalModel)
        {
            return new GoalDto
            {
                Id = goalModel.Id,
                YearlyGoal = goalModel.YearlyGoal,
                MonthlyGoal = goalModel.MonthlyGoal
            };
        }

        public static Goal ToGoalFromGoalRequest(this GoalRequest goal)
        {
            return new Goal
            {
                YearlyGoal = goal.YearlyGoal,
                MonthlyGoal = goal.MonthlyGoal
            };
        }
    }
}
