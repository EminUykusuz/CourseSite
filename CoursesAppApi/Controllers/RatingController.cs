[ApiController]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly AppDbContext _context;
    public RatingsController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> RateCourse([FromBody] RatingDto dto)
    {
        var ownership = await _context.CourseOwnerships
            .FirstOrDefaultAsync(x => x.UserId == dto.UserId && x.CourseId == dto.CourseId);

        if (ownership == null)
            return BadRequest("Kursa sahip değilsiniz.");

        var existingRating = await _context.CourseRatings
            .FirstOrDefaultAsync(x => x.UserId == dto.UserId && x.CourseId == dto.CourseId);

        if (existingRating != null)
            return BadRequest("Zaten oy verdiniz.");

        var rating = new CourseRating
        {
            UserId = dto.UserId,
            CourseId = dto.CourseId,
            Rating = dto.Rating
        };

        _context.CourseRatings.Add(rating);
        await _context.SaveChangesAsync();

        return Ok("Derecelendirme yapıldı.");
    }
}
