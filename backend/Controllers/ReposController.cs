using LibGit2Sharp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReposController : ControllerBase
    {
        // Generic and works fine
        private readonly string _directory = Environment.GetEnvironmentVariable("TEMP")+"/repos/";

        public record File(string name, string type, string url);

        public ReposController()
        {
            switch (Environment.OSVersion.Platform)
            {
                case PlatformID.Unix:
                case PlatformID.MacOSX:
                    _directory = "/tmp/";
                    break;
            }
        }

        [HttpGet("Files")]
        public ActionResult GetFiles(string repo, string path = "/")
        {
            try
            {
                string repoPath = $"{_directory}{repo}/{path}";
                List<File> files = new List<File>();
                foreach (var file in Directory.GetFiles(repoPath))
                    files.Add(new File(file, "regular file", file));
                foreach (var file in Directory.GetDirectories(repoPath))
                    files.Add(new File(file, "directory", $"{file}"));

                return Ok(new {files= files.ToArray() });

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpPost("[action]")]
        public IActionResult Clone(string Url)
        {
            string repoName = Url.Split("/")[^1];
            string repoPath = _directory + repoName;
            try
            {
                var path = Repository.Clone(Url, repoPath);
                return Ok(new { Status = "Cloned", Repo = repoName, Path= path });

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
                string repoPath = _directory + RepoName;
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
                    directoryName = directory.Split("/")[^1];
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
                string newRepo = _directory + RepoName + ".git";
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
                string repoPath = _directory + RepoName + ".git";
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
