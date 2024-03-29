namespace API.Infrastructure.Users {

    public interface IUserValidation<T> where T : class {

        int IsValid(IUser user);
        bool IsUserOwner(string userId);

    }

}