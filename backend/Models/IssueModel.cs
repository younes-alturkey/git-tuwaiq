using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class IssueModel
    {
        public int id { set; get; }
        public string Content { set; get; }
        public DateTime CreatedAt { set; get; }
        public string title { set; get; }
        [ForeignKey("Repo_Id")]
        public int RepoId { set; get; }
        
        
        // on to many Repo => issues
        // Navigator
        [JsonIgnore]
        public RepoModel Repo_Id { set; get; }
        
    }
}