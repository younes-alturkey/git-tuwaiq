using backend.Controllers;
using backend.Models;
using backend.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace RSDC_UnitTests
{
    public class UsersControllerTest : IDisposable
    {

        protected readonly AppDbContext _context;

        public UsersControllerTest()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            _context.Database.EnsureCreated();

            var Users = new[]
            {
                new UserModel { Id = 5, Name = "Adel", Email="Adel@gmail.com", Password="P@assWord123" , ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs" , CreatedAt = DateTime.Now , UserName = "Adel" },
                new UserModel { Id = 6, Name = "Abdulrahman", Email = "Abdulrahman@gmail.com", Password = "P@assWord123", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", CreatedAt = DateTime.Now, UserName = "Abdulrhman" },
                new UserModel { Id = 7, Name = "Ebrahim", Email="Ebrahim@gmail.com", Password="P@assWord123" , ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs" , CreatedAt = DateTime.Now , UserName = "Ebrahim" }
             };

            _context.Users.AddRange(Users);
            _context.SaveChanges();

        }
        [Fact]
        public async Task Getuser_ReturnsCorrectType()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.GetUsers();

            // Assert
            var objectResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsAssignableFrom<IEnumerable<UserModel>>(objectResult.Value);

        }

        [Fact]
        public async Task Getuser_ReturnsAllUsers()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.GetUsers();

            // Assert
            var objectResult = Assert.IsType<OkObjectResult>(result);
            var Users = Assert.IsAssignableFrom<IEnumerable<UserModel>>(objectResult.Value);
            Assert.Equal(10, Users.Count());
        }

        [Fact]
        public async Task Getuser_ReturnsNotFound_GivenInvalidId()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.GetUserModel(50);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Getuser_Returnsuser_GivenvalidId()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.GetUserModel(5);

            // Assert
            var objectResult = Assert.IsType<OkObjectResult>(result);
            var user = Assert.IsAssignableFrom<UserModel>(objectResult.Value);
            Assert.Equal("Adel", user.Name);
        }



        [Fact]
        public async Task Postuser_ReturnsNewlyCreateduser()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.PostUserModel(new UserModel { Id = 8, Name = "Adel", Email = "Adel@gmail.com", Password = "P@assWord123", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", CreatedAt = DateTime.Now, UserName = "Adel" });

            // Assert
            Assert.IsType<CreatedAtActionResult>(result);
        }

        [Fact]
        public async Task Putuser_ReturnsBadRequest_WhenuserIdIsInvalid()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.PutUserModel(10, new UserModel { Id = 9, Name = "Adel", Email = "Adel@gmail.com", Password = "P@assWord123", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", CreatedAt = DateTime.Now, UserName = "Adel" });

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }


        [Fact]
        public async Task Putuser_ReturnsNotFound_WhenuserIdIsInvalid()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.PutUserModel(12, new UserModel { Id = 12, Name = "Adel", Email = "Adel@gmail.com", Password = "P@assWord123", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", CreatedAt = DateTime.Now, UserName = "Adel" });

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Putuser_ReturnsNoContent_WhenuserUpdated()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.PutUserModel(5, new UserModel { Id = 13, Name = "Ali", Email = "Ali@gmail.com", Password = "P@assWord123", ImgUrl = "https://i.picsum.photos/id/870/200/300.jpg?blur=2&grayscale&hmac=ujRymp644uYVjdKJM7kyLDSsrqNSMVRPnGU99cKl6Vs", CreatedAt = DateTime.Now, UserName = "Ali" });

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task Deleteuser_ReturnsNotFound_WhenuserIdIsInvalid()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.DeleteUserModel(100);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task Deleteuser_ReturnsOk_WhenuserDeleted()
        {
            // Arange
            var controller = new UsersController(_context);

            // Act
            var result = await controller.DeleteUserModel(4);

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();

            _context.Dispose();
        }
    }
}
