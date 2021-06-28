using System;
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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().HasData(new UserModel { Id = 1, Name = "Younes Alturkey", Email="alturkeyy@gmail.com", Password= "password", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs" , CreatedAt = DateTime.Now , UserName = "younes-alturkey"}) ;
            modelBuilder.Entity<UserModel>().HasData(new UserModel { Id = 2, Name = "Abdulmajeed", Email="Abdulmajeed@gmail.com", Password="P@assWord123" , ImgUrl = "https://i.picsum.photos/id/24/200/300.jpg?blur=5&hmac=TXkpvcSKinZ53tqovqHo05FiiHPU9ZDzZH2wcoyxuHI" , CreatedAt = DateTime.Now , UserName = "Abdulmajeed"}) ;
            modelBuilder.Entity<UserModel>().HasData(new UserModel { Id = 3, Name = "Riyadh", Email="Riyadh@gmail.com", Password="P@assWord123" , ImgUrl = "https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2021/01/28/2448851-2106814390.jpg?itok=vbM4D77f" , CreatedAt = DateTime.Now , UserName = "Riyadh"}) ;
            modelBuilder.Entity<UserModel>().HasData(new UserModel { Id = 4, Name = "Fos", Email="Fos@gmail.com", Password="P@assWord123" , ImgUrl = "https://i.guim.co.uk/img/media/327e46c3ab049358fad80575146be9e0e65686e7/0_0_1023_742/master/1023.jpg?width=445&quality=45&auto=format&fit=max&dpr=2&s=331a1bc4f5d7a96a6131f4f142065662" , CreatedAt = DateTime.Now , UserName = "Fos"}) ;
        }

    }
}