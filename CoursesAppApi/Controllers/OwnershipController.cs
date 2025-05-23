[ApiController]
[Route("api/[controller]")]
public class OwnershipController : ControllerBase
{
    private readonly AppDbContext _context;
    public OwnershipController(AppDbContext context) => _context = context;

    [HttpPost("buy")]
    public async Task<IActionResult> BuyCourse(int userId, int courseId)
    {
        var ownership = new CourseOwnership
        {
            UserId = userId,
            CourseId = courseId,
            PurchaseDate = DateTime.UtcNow
        };

        _context.CourseOwnerships.Add(ownership);
        await _context.SaveChangesAsync();

        return Ok("Kurs satın alındı");
    }

    [HttpGet("my-courses/{userId}")]
    public async Task<IActionResult> GetMyCourses(int userId)
    {
        var myCourses = await _context.CourseOwnerships
            .Where(x => x.UserId == userId)
            .Select(x => x.Course)
            .ToListAsync();

        return Ok(myCourses);
    }
}
