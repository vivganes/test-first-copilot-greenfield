// GH Copilot code - starts
using API.Models;
using API.Repositories;
using API.Services;
using API.UnitOfWork;

namespace API.Services
{
    public class UserRegistrationService : IUserRegistrationService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IEmailService _emailService;
        private readonly IUserValidator _userValidator;
        private readonly IEmailVerificationService _emailVerificationService;
        private readonly IUnitOfWork _unitOfWork;

        public UserRegistrationService(
            IUserRepository userRepository,
            IPasswordHasher passwordHasher,
            IEmailService emailService,
            IUserValidator userValidator,
            IEmailVerificationService emailVerificationService,
            IUnitOfWork unitOfWork)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _emailService = emailService;
            _userValidator = userValidator;
            _emailVerificationService = emailVerificationService;
            _unitOfWork = unitOfWork;
        }

        public UserRegistrationResponse RegisterUser(UserRegistrationRequest request)
        {
            if (!_userValidator.Validate(request))
                return new UserRegistrationResponse { Message = "Invalid registration request", EmailVerified = false, Role = "Customer" };

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Name = request.Name,
                Email = request.Email,
                PasswordHash = _passwordHasher.HashPassword(request.Password),
                PhoneNumber = request.PhoneNumber,
                Status = "Active",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                EmailVerified = false,
                Roles = new List<string> { "Customer" }
            };
            if (request.Address != null)
            {
                user.Addresses.Add(request.Address);
            }
            _userRepository.CreateUser(user);
            var token = _emailVerificationService.GenerateToken(request.Email);
            _emailVerificationService.SendVerificationEmail(request.Email, token);
            _unitOfWork.Commit();
            return new UserRegistrationResponse
            {
                Message = "Please check your email to verify your account",
                EmailVerified = false,
                Role = "Customer"
            };
        }
    }
}
// GH Copilot code - end
