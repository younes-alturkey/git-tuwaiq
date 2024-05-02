using backend.Models.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            string _directory = $"{Environment.GetEnvironmentVariable("TEMP")}/repos/";
            switch (Environment.OSVersion.Platform)
            {
                case PlatformID.Unix:
                case PlatformID.MacOSX:
                    _directory = "/tmp/repos/";
                    break;
            }
            if (!new FileInfo(_directory).Exists)
                Directory.CreateDirectory(_directory);
        }
        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "GitTuwaiq", Version = "v1" });
            });
            services.AddControllers();
            services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("GitTuwaiq-db"));
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .WithExposedHeaders("Content-Disposition");
            }));
           
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppDbContext context)
        {
            context.Database.EnsureCreated();
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "GitTuwaiq API v1"));
            app.UseCors("CorsPolicy");
            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}