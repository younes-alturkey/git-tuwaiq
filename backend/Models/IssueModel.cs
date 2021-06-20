using System;

namespace backend.Models
{
    public class IssueModel
    {
        public int id { set; get; }
        public string Content { set; get; }
        public DateTime CreatedAt { set; get; }
        public string title { set; get; }
        
        // on to many Repo => issues 
        public RepoModel RepoId { set; get; }
        
    }
}