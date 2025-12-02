// GH Copilot code - starts
using API.Models;
using System.Collections.Generic;

namespace API.Repositories
{
    public class StubUserRepository : IUserRepository
    {
        private readonly List<User> _users = new();
        public void CreateUser(User user) => _users.Add(user);
        public User GetUserByEmail(string email) => _users.Find(u => u.Email == email);
        public void UpdateUser(User user) {}
        public bool EmailExists(string email) => _users.Exists(u => u.Email == email);
    }
}
// GH Copilot code - end
