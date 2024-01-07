using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Infrastructure.Users {

    public class UserReadDto : IMetadata {

        // Fields
        public string Id { get; set; }
        public string Username { get; set; }
        public string Displayname { get; set; }
        public bool IsFirstFieldFocused { get; set; }
        public SimpleEntity Customer { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }

    }

}