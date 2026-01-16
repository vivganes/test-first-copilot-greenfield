// GH Copilot code - starts
using API.Models;
using System.Threading.Tasks;

namespace API.Services
{
    public interface IEmailVerificationService
    {
        string GenerateToken(string email);
        void SendVerificationEmail(string email, string token);
        bool VerifyEmail(string token);
        bool IsTokenValid(string token);
    }
}
// GH Copilot code - end
