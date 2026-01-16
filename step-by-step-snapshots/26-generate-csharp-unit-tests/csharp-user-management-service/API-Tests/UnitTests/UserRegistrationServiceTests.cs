using NUnit.Framework;
using Moq;
using API;
using API.Models;
using API.Services;

namespace API_Tests.UnitTests
{
    [TestFixture]
    public class UserRegistrationServiceTests
    {
        [Test]
        public void RegisterUser_ValidRequest_CreatesUserAndReturnsExpectedResponse()
        {
            // Arrange
            var userRepository = new Mock<IUserRepository>();
            var passwordHasher = new Mock<IPasswordHasher>();
            var emailService = new Mock<IEmailService>();
            var userValidator = new Mock<IUserValidator>();
            var emailVerificationService = new Mock<IEmailVerificationService>();
            var unitOfWork = new Mock<IUnitOfWork>();

            var request = new UserRegistrationRequest
            {
                Email = "newuser@example.com",
                Password = "ValidPass1!",
                Name = "Test User",
                PhoneNumber = "+12345678901",
                Address = new Address
                {
                    Type = "Shipping",
                    Line1 = "123 Main St",
                    City = "Metropolis",
                    State = "State",
                    PostalCode = "12345",
                    Country = "Country",
                    IsDefault = true,
                    PhoneNumber = "+12345678901"
                }
            };

            userValidator.Setup(v => v.Validate(request)).Returns(true);
            passwordHasher.Setup(h => h.HashPassword(request.Password)).Returns("hashed");
            emailVerificationService.Setup(e => e.GenerateToken(request.Email)).Returns("token");

            var service = new UserRegistrationService(
                userRepository.Object,
                passwordHasher.Object,
                emailService.Object,
                userValidator.Object,
                emailVerificationService.Object,
                unitOfWork.Object
            );

            // Act
            var response = service.RegisterUser(request);

            // Assert
            Assert.That(response, Is.Not.Null);
            Assert.That(response.Message, Does.Contain("verify your account"));
            Assert.That(response.EmailVerified, Is.False);
            Assert.That(response.Role, Is.EqualTo("Customer"));
            userRepository.Verify(r => r.CreateUser(It.IsAny<User>()), Times.Once);
            emailVerificationService.Verify(e => e.SendVerificationEmail(request.Email, "token"), Times.Once);
            unitOfWork.Verify(u => u.Commit(), Times.Once);
        }
    }
}
