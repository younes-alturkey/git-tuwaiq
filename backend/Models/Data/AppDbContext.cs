using Microsoft.EntityFrameworkCore;

namespace backend.Models.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
            
        }
        
        public DbSet<UserModel> Users { set; get; }
        public DbSet<RepoModel> Repos { set; get; }
        public DbSet<IssueModel> Issues { set; get; }

    }
}