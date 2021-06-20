using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class RepoModel
    {
        public int Id { set; get; }
        public string RepoAddress { set; get; }
        public string Name { set; get; }
        public DateTime CreatedAt { set; get; }
        public uint Stars { set; get; }
        public uint Forks { set; get; }
        public uint Watch { set; get; }
        public bool isPublic { set; get; }

        public string Description { get; set; }
        [ForeignKey("User_Id")]

        public int UserId { get; set; }
        
        // one to many User => Repos 
        
        // Navigator
        [JsonIgnore]
        public UserModel User_Id { get; set; }
        [JsonIgnore]
        // on to many Repo => issues 
        public List<RepoModel> Issues { set; get;  }

       
    }
}