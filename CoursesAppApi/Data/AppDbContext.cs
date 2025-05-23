public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<CourseOwnership> CourseOwnerships { get; set; }
    public DbSet<CourseRating> CourseRatings { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
