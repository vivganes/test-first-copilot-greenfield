// GH Copilot code - starts
namespace API.Services
{
    public class StubEmailVerificationService : IEmailVerificationService
    {
        public string GenerateToken(string email) => "stub-token";
        public void SendVerificationEmail(string email, string token) { }
        public bool VerifyEmail(string token) => true;
        public bool IsTokenValid(string token) => true;
    }
}
// GH Copilot code - end
