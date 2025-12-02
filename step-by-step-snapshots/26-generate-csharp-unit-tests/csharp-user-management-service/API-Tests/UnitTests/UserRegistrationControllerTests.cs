using NUnit.Framework;
using Moq;
using API.Controllers;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API_Tests.UnitTests
{
    [TestFixture]
    public class UserRegistrationControllerTests
    {
        [Test]
        public void RegisterUser_ValidRequest_Returns201AndExpectedResponse()
        {
            // Arrange
            var service = new Mock<IUserRegistrationService>();
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
            var expectedResponse = new UserRegistrationResponse
            {
                Message = "Please check your email to verify your account",
                EmailVerified = false,
                Role = "Customer"
            };
            service.Setup(s => s.RegisterUser(request)).Returns(expectedResponse);
            var controller = new UserRegistrationController(service.Object);

            // Act
            var result = controller.RegisterUser(request) as ObjectResult;
            var response = result?.Value as UserRegistrationResponse;

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.StatusCode, Is.EqualTo(201));
            Assert.That(response, Is.Not.Null);
            Assert.That(response.Message, Does.Contain("verify your account"));
            Assert.That(response.EmailVerified, Is.False);
            Assert.That(response.Role, Is.EqualTo("Customer"));
        }
    }
}
