// GH Copilot code - starts
namespace API.Services
{
    public class StubPasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password) => "hashed-" + password;
    }
}
// GH Copilot code - end
