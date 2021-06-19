using backend.Models.DTOs;
using LibGit2Sharp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReposController : ControllerBase
    {
        private readonly string _directory = @"C:\Users\Younes\Desktop\repos";

        [HttpPost("[action]")]
        public IActionResult Clone(string Url)
        {
            string repoName = Url.Split("/")[^1];
            string repoPath = _directory + @"\" + repoName;
            try
            {
                Repository.Clone(Url, repoPath);
                return Ok(new { Status = "Cloned", Repo = repoName });

            } catch(Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new{ Status = "Error", Message = error.Message });
            }
        }

        [HttpGet("[action]/{RepoName}")]
        public IActionResult Repo(string RepoName)
        {
            try
            {
                string repoPath = _directory + @"\" + RepoName + ".git";
                var repo = new Repository(repoPath);
                return Ok(new { repo });

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpGet("[action]/{RepoName}")]
        public IActionResult Exists(string RepoName)
        {
            try
            {
                string fullRepoName = RepoName + ".git";
                var repos = Directory.GetDirectories(_directory);
                string directoryName;
                foreach (var directory in repos)
                {
                    directoryName = directory.Split(@"\")[^1];
                    if (directoryName == fullRepoName)
                    {
                        return Ok(new { Status = "Exists", Repo = RepoName });
                    }
                }

                return NotFound(new { Status = "Doesn't Exist", Repo = RepoName });

            } catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }

        }

        [HttpPost("[action]/{RepoName}")]
        public IActionResult Init(string RepoName)
        {
            try
            {
                string newRepo = _directory + @"\" + RepoName + ".git";
                Repository.Init(newRepo);
                return Ok(new { Status = "Initialized", Repo = RepoName + ".git" });

            } catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpDelete("[action]/{RepoName}")]
        public IActionResult Delete(string RepoName)
        {
            try
            {
                string repoPath = _directory + @"\" + RepoName + ".git";
                var repos = Directory.GetDirectories(_directory);
                foreach (var directory in repos)
                {
                    if (directory == repoPath)
                    {
                        DeleteDirectory(repoPath);
                        return Ok(new { Status = "Deleted", Repo = RepoName });
                    }
                }


                return NotFound(new { Status = "Doesn't Exist", Repo = RepoName });

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        private static void DeleteDirectory(string directory)
        {
            foreach (string subdirectory in Directory.EnumerateDirectories(directory))
            {
                DeleteDirectory(subdirectory);
            }

            foreach (string fileName in Directory.EnumerateFiles(directory))
            {
                var fileInfo = new FileInfo(fileName)
                {
                    Attributes = FileAttributes.Normal
                };
                fileInfo.Delete();
            }

            Directory.Delete(directory);
        }
    }
}
