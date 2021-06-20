
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class UserModel
    {
        
        public int Id { set; get;  }
        public string Name { set; get;  }
        public string ImgUrl { set; get; }
        public DateTime CreatedAt { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }
        public string UserName { set; get;  }
        
        
         // one  to many with repos   
         [JsonIgnore]
         public List<RepoModel> Repos { set; get; }
        
    }
}