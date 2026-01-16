// GH Copilot code - starts
using API.Models;

namespace API.Repositories
{
    public interface IUserRepository
    {
        void CreateUser(User user);
        User GetUserByEmail(string email);
        void UpdateUser(User user);
        bool EmailExists(string email);
    }
}
// GH Copilot code - end
