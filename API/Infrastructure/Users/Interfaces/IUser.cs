namespace API.Infrastructure.Users {

    public interface IUser {

        int? CustomerId { get; set; }
        string Email { get; set; }
        string Username { get; set; }
        bool IsAdmin { get; set; }

    }

}