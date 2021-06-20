﻿using LibGit2Sharp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using backend.Models.Data;

namespace backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class ReposController : ControllerBase
    {
        private readonly string _directory = $"{Environment.GetEnvironmentVariable("TEMP")}/repos/";
        private readonly string _domain = "https://backend20210620132023.azurewebsites.net/";
        private readonly AppDbContext _db;
        public record file(string name, string type, string url);

        public record commit
        {
            public string sha { set; get; }
            public string message { set; get; }
            public string autherName { set; get; }
            public string autherEmail { set; get; }
            public string time { set; get; }
            public string firstParentSha { set; get; }
            public string secondParentSha { set; get; }
        }

        public ReposController(AppDbContext db)
        {
            _db = db;
            switch (Environment.OSVersion.Platform)
            {
                case PlatformID.Unix:
                case PlatformID.MacOSX:
                    _directory = "/tmp/repos/";
                    break;
            }
            Debug.WriteLine($"{_directory}");
        }

        [HttpGet("files")]
        public ActionResult GetFiles(string username, string repo, string path = "")
        {
            try
            {
                string repoPath = $"{_directory}{username}/{repo}/{path}";
                if (!new DirectoryInfo(repoPath).Exists) return NotFound("The repo does not exist");
                List<file> files = new List<file>();
                foreach (var f in Directory.GetFiles(repoPath))
                {
                    var splittedFileName = f.Split('/');
                    var fileName = splittedFileName[splittedFileName.Length - 1];

                    var type = "";
                    if (fileName.Contains('.'))
                    {
                        var tmp = fileName.Split('.');
                        type = tmp[tmp.Length - 1];
                    }
                    var url = $"{_domain}/api/files?username={username}&repo={repo}&path={path}/{fileName}";
                    files.Add(new file(fileName, type == "" ? "regular file" : type, url));
                }
                foreach (var f in Directory.GetDirectories(repoPath))
                {
                    var splittedDirName = f.Split('/');
                    var dirName = splittedDirName[splittedDirName.Length - 1];
                    var url = $"{_domain}/api/files?username={username}&repo={repo}&path={path}/{dirName}";

                    // var url = $"{_domain}{repo}/{dirName}";
                    files.Add(new file(dirName, "directory", url));
                }
                return Ok(new { files = files.ToArray() });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpGet("download")]
        public ActionResult Download(string username, string repo)
        {
            var repoDir = new DirectoryInfo($"{_directory}{username}/{repo}/");
            var zipName = new FileInfo($"{_directory}{username}/{repo}.zip");
            if (!repoDir.Exists) return NotFound(repoDir);
            if (zipName.Exists) System.IO.File.Delete(zipName.FullName);
            ZipFile.CreateFromDirectory(repoDir.FullName, zipName.FullName);
            return new FileContentResult(System.IO.File.ReadAllBytes(zipName.FullName), "application/zip");
        }

        [HttpPatch("star")]
        public ActionResult Star(string username, string repository)
        {
            var user = _db.Users.Where(u => u.UserName == username).FirstOrDefault();
            if (user == null) NotFound($"User `{username}` not found");
            var repo = _db.Repos.Where(r => r.Name == repository && r.UserId == user.Id).FirstOrDefault();
            if (repo == null) return NotFound($"Repository `{repository}` not found");
            try
            {
                _db.Repos.Where(r => r.Name == repo.Name && r.UserId == repo.UserId).Single().Stars++;
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest("Repo does not exist in our DB (our DBA is drunk)");
            }
        }

        [HttpGet("watch")]
        public ActionResult Watch(string username, string repository)
        {
            var user = _db.Users.Where(u => u.UserName == username).FirstOrDefault();
            if (user == null) NotFound($"User `{username}` not found");
            var repo = _db.Repos.Where(r => r.Name == repository && r.UserId == user.Id).FirstOrDefault();
            if (repo == null) return NotFound($"Repository `{repository}` not found");
            try
            {
                _db.Repos.Where(r => r.Name == repo.Name && r.UserId == repo.UserId).Single().Watch++;
                _db.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest("Repo does not exist in our DB (our DBA is drunk)");
            }
        }

        [HttpGet("fork")]
        public ActionResult Fork(string fromUsername, string repository, string toUsername)
        {
            var fromDir = new DirectoryInfo($"{_directory}{fromUsername}/{repository}");
            if (fromDir.Exists)
            {
                var toDir = new DirectoryInfo($"{_directory}{toUsername}/{repository}");
                if (toDir.Exists)
                    return Conflict("The repository {toUsername}/{repository} already exists");
                Directory.CreateDirectory(toDir.FullName);
                this.CopyFilesRecursively(fromDir, toDir);
                return Ok();
            }
            else
            {
                return NotFound($"The repo {fromUsername}/{repository} was not found");
            }
        }

        [HttpGet("branches/{RepoName}")]
        public ActionResult GetBranches(string RepoName)
        {
            try
            {
                string repoPath = _directory + RepoName;
                var repo = new Repository(repoPath);
                var branches = repo.Branches.ToArray();
                List<string> branchesNames = new List<string>();
                foreach (var branch in branches)
                {
                    branchesNames.Add(branch.FriendlyName);
                }

                return Ok(new
                {
                    branches = branchesNames
                });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpGet("commits/{RepoName}")]
        public ActionResult GetCommits(string RepoName)
        {
            try
            {
                string repoPath = _directory + RepoName;
                var repo = new Repository(repoPath);
                var commits = repo.Commits.ToArray();
                List<commit> commitsNames = new List<commit>();

                for (int i = 0; i < commits.Length; i++)
                {
                    commitsNames.Add(new commit
                    {
                        sha = commits[i].Sha,
                        message = commits[i].Message,
                        autherName = commits[i].Author.Name,
                        autherEmail = commits[i].Author.Email,
                        time = commits[i].Author.When.ToString()
                    });
                    if (commits[i].Parents.ToArray().Length > 0)
                    {

                        int length = commits[i].Parents.ToArray().Length;
                        Console.WriteLine(commits[i].Parents.ToArray()[0].Sha);
                        commitsNames[i].firstParentSha = commits[i].Parents.ToArray()[0].Sha;
                        length--;

                        if (length > 0)
                        {
                            commitsNames[i].firstParentSha = commits[i].Parents.ToArray()[1].Sha;
                        }
                    }
                }

                return Ok(new
                {
                    commits = commitsNames
                });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpPost("clone")]
        public IActionResult Clone(string Url, string username)
        {
            var user = _db.Users.Where(user => user.UserName == username).FirstOrDefault();
            if (user == null) return StatusCode(401, "User does not exist");
            var userDir = new DirectoryInfo(_directory + username);
            if (!userDir.Exists) userDir.Create();
            string repoName = Url.Split("/")[^1];
            if (!userDir.Exists) userDir.Create();
            string repoPath = userDir.FullName + repoName;
            try
            {
                Repository.Clone(Url, repoPath);
                _db.Repos.Add(new Models.RepoModel()
                {
                    CreatedAt = DateTime.Now,
                    Description = "New Repo",
                    Name = repoName,
                    User_Id = user,
                    UserId = user.Id,
                });
                return Ok(new { Status = "Cloned", Repo = repoName });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpGet("repo")]
        public IActionResult Repo(string username, string repo)
        {
            try
            {
                var repoDir = new DirectoryInfo(_directory + username + repo);
                var repoObj = new Repository(repoDir.FullName);
                return Ok(new { repo });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpPost("init")]
        public IActionResult Init(string username, string repo)
        {
            try
            {
                var user = _db.Users.Where(user => user.UserName == username).FirstOrDefault();
                if (user == null) return StatusCode(401, "User does not exist");
                var userDir = new DirectoryInfo(_directory + username);
                if (!userDir.Exists) userDir.Create();

                string newRepo = userDir.FullName + repo;
                Repository.Init(newRepo);
                _db.Repos.Add(new Models.RepoModel()
                {
                    CreatedAt = DateTime.Now,
                    Description = "New Repo",
                    Name = repo,
                    User_Id = user,
                    UserId = user.Id,
                });
                return Ok(new { Status = "Initialized", Repo = repo });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = "Error", Message = error.Message });
            }
        }

        [HttpDelete("delete")]
        public IActionResult Delete(string username, string repo)
        {
            try
            {
                string repoPath = _directory + username + repo;
                var repos = Directory.GetDirectories(_directory);
                foreach (var directory in repos)
                {
                    if (directory == repoPath)
                    {
                        DeleteDirectory(repoPath);
                        return Ok(new { Status = "Deleted", Repo = repo });
                    }
                }
                return NotFound(new { Status = "Doesn't Exist", Repo = repo });
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

        private void CopyFilesRecursively(DirectoryInfo source, DirectoryInfo target)
        {
            foreach (DirectoryInfo dir in source.GetDirectories())
                CopyFilesRecursively(dir, target.CreateSubdirectory(dir.Name));
            foreach (FileInfo file in source.GetFiles())
                file.CopyTo(Path.Combine(target.FullName, file.Name));
        }
    }
}