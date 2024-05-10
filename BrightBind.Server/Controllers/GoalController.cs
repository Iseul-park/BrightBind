using BrightBind.Server.Data;
using BrightBind.Server.Dtos.Goal;
using BrightBind.Server.Mappers;
using BrightBind.Server.Interfaces;
using BrightBind.Server.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BrightBind.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IGoalRepository _goalRepository;

        public GoalController(ApplicationDbContext context, IGoalRepository goalRepository)
        {
            _context = context;
            _goalRepository = goalRepository;
        }

        [HttpGet("GetAllGoals")]
        public async Task<IActionResult> GetAllGoals()
        {
            var goals = await _goalRepository.GetGoalAsync();
            var goalDto = goals.Select(b => b.ToGoalDto());
            return Ok(goals);
        }

        [HttpGet("GetGoalById/{id}")]
        public async Task<IActionResult> GetGoalById([FromRoute] int id)
        {
            var goal = await _goalRepository.GetGoalByIdAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            return Ok(goal.ToGoalDto());
        }

        [HttpGet("GetGoalByUserId/{user_id}")]
        public async Task<IActionResult> GetGoalByUserId([FromRoute] string user_id)
        {
            var goal = await _goalRepository.GetGoalByUserIdAsync(user_id);
            if (goal == null)
            {
                return NotFound("");
            }
            return Ok(goal);
        }

        [HttpPost("CreateGoalByUserId/{user_id}")]
        public async Task<IActionResult> CreateGoalByUserId([FromRoute] string user_id, [FromBody] GoalRequest goalDto)
        {
            try
            {
                var goalModel = goalDto.ToGoalFromGoalRequest();
                goalModel.UserId = user_id;

                await _goalRepository.CreateGoalByUserIdAsync(user_id, goalModel);

                return CreatedAtAction(nameof(GetGoalById), new { id = goalModel.Id }, goalModel.ToGoalDto());

            }

            catch (Exception ex)
            {
                return BadRequest("Fail to creat a book: " + ex.Message);
            }
        }

        [HttpPut("UpdateGoal/{user_id}")]
        public async Task<IActionResult> UpdateGoal([FromRoute] string user_id, [FromBody] GoalRequest goalDto)
        {
            var goalModel = await _goalRepository.UpdateGoalAsync(user_id, goalDto);
            if (goalModel == null)
            {
                return NotFound("");
            }

            return Ok(goalModel.ToGoalDto());
        }

        [HttpDelete("DeleteGoal/{user_id}")]
        public async Task<IActionResult> DeleteGoal([FromRoute] string user_id)
        {
            var goalModel = await _goalRepository.DeleteGoalAsync(user_id);

            if (goalModel == null)
            {
                return NotFound("");
            }

            return NoContent();
        }

    }
}
