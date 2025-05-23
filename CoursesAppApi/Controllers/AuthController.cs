[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto dto)
    {
        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "student"
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok("Kayıt başarılı");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRegisterDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return Unauthorized("Hatalı giriş");

        return Ok("Giriş başarılı"); // JWT token eklenebilir
    }
}
