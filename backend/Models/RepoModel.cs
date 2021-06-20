using System;
using System.Collections.Generic;

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
        // one to many User => Repos 
        public UserModel User_Id { get; set; }
        
        // on to many Repo => issues 
        public List<RepoModel> Issues { set; get;  }

       
    }
}