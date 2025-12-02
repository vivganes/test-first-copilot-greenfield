using Microsoft.Data.Sqlite;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Data;
using System.Data.Common;
using NUnit.Framework;
using API_Tests.IntegrationTests;
using Microsoft.Extensions.Configuration;

namespace API_Tests.IntegrationTests
{
    [TestFixture]
    [Category("Integration")]
    public class UserRegistrationApiTests : CustomIntegrationTestBase
    {
        private const string RegisterEndpoint = "/api/v1/users/register";
        private string _connectionString;

        [SetUp]
        public void SetupTables()
        {
            // Tables are created by base class using tables.sql
            // If additional setup is needed, add here
            var configuration = _webApplicationFactory.Services.GetService(typeof(IConfiguration)) as IConfiguration;
            _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        }

        private IDbConnection GetDbConnection()
        {
            return new SqliteConnection(_connectionString);
        }

        [Test]
        public async Task RegisterUser_ValidRequest_Returns201AndVerificationMessage_AndCreatesUserInDb()
        {
            var client = GetClient();
            var email = "newuser@example.com";
            var request = new
            {
                email,
                password = "ValidPass1!",
                name = "Test User",
                phoneNumber = "+12345678901",
                address = new
                {
                    type = "Shipping",
                    line1 = "123 Main St",
                    city = "Metropolis",
                    state = "State",
                    postalCode = "12345",
                    country = "Country",
                    isDefault = true,
                    phoneNumber = "+12345678901"
                }
            };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("message").GetString(), Does.Contain("verify your account"));
            Assert.That(body.GetProperty("emailVerified").GetBoolean(), Is.False);
            Assert.That(body.GetProperty("role").GetString(), Is.EqualTo("Customer"));

            // DB assertion: user exists
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(1), "User should be created in DB");
        }

        [Test]
        public async Task RegisterUser_MissingRequiredFields_Returns400_AndNoUserCreated()
        {
            var client = GetClient();
            var email = "";
            var request = new { email, password = "", name = "", phoneNumber = "" };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Is.Not.Empty);

            // DB assertion: no user created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User]";
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(0), "No user should be created in DB");
        }

        [Test]
        public async Task RegisterUser_InvalidEmailFormat_Returns400_AndNoUserCreated()
        {
            var client = GetClient();
            var email = "invalid-email";
            var request = new { email, password = "ValidPass1!", name = "Test User", phoneNumber = "+12345678901" };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("email"));

            // DB assertion: no user created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(0), "No user should be created in DB");
        }

        [Test]
        public async Task RegisterUser_WeakPassword_Returns400_AndNoUserCreated()
        {
            var client = GetClient();
            var email = "user2@example.com";
            var request = new { email, password = "weak", name = "Test User", phoneNumber = "+12345678901" };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("password"));

            // DB assertion: no user created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(0), "No user should be created in DB");
        }

        [Test]
        public async Task RegisterUser_DuplicateEmail_Returns409_AndOnlyOneUserCreated()
        {
            var client = GetClient();
            var email = "duplicate@example.com";
            var request = new { email, password = "ValidPass1!", name = "Test User", phoneNumber = "+12345678901" };
            // First registration should succeed
            await client.PostAsJsonAsync(RegisterEndpoint, request);
            // Second registration should fail
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Conflict));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("already registered"));

            // DB assertion: only one user with this email
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(1), "Only one user should exist in DB");
        }

        [Test]
        public async Task RegisterUser_TooManyAttempts_Returns429_AndNoExtraUsersCreated()
        {
            var client = GetClient();
            var baseEmail = "rate@example.com";
            var request = new { email = baseEmail, password = "ValidPass1!", name = "Test User", phoneNumber = "+12345678901" };
            // Simulate too many attempts
            for (int i = 0; i < 10; i++)
            {
                await client.PostAsJsonAsync(RegisterEndpoint, request with { email = $"rate{i}@example.com" });
            }
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.TooManyRequests));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("Too many"));

            // DB assertion: only 10 users created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email LIKE 'rate%@example.com'";
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(10), "Only 10 users should exist in DB");
        }

        [Test]
        public async Task RegisterUser_AddressMissingRequiredFields_Returns400_AndNoUserCreated()
        {
            var client = GetClient();
            var email = "addressfail@example.com";
            var request = new
            {
                email,
                password = "ValidPass1!",
                name = "Test User",
                phoneNumber = "+12345678901",
                address = new { type = "Shipping" } // missing required fields
            };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("address"));

            // DB assertion: no user created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(0), "No user should be created in DB");
        }

        [Test]
        public async Task RegisterUser_MaxLengthFields_Returns201_AndUserCreatedInDb()
        {
            var client = GetClient();
            var email = new string('a', 243) + "@example.com"; // 255 chars
            var request = new
            {
                email,
                password = "ValidPass1!",
                name = new string('A', 255),
                phoneNumber = "+12345678901234567890",
                address = new
                {
                    type = "Shipping",
                    line1 = new string('B', 255),
                    city = new string('C', 255),
                    state = new string('D', 255),
                    postalCode = new string('E', 20),
                    country = new string('F', 255),
                    isDefault = true,
                    phoneNumber = "+12345678901234567890"
                }
            };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));

            // DB assertion: user exists
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(1), "User should be created in DB");
        }

        [Test]
        public async Task RegisterUser_MinLengthPassword_Returns201_AndUserCreatedInDb()
        {
            var client = GetClient();
            var email = "minpass@example.com";
            var request = new
            {
                email,
                password = "Aa1!aaaa", // 8 chars, meets all requirements
                name = "Test User",
                phoneNumber = "+12345678901"
            };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));

            // DB assertion: user exists
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(1), "User should be created in DB");
        }

        [Test]
        public async Task RegisterUser_SpecialCharactersInName_Returns400_AndNoUserCreated()
        {
            var client = GetClient();
            var email = "specialchars@example.com";
            var request = new
            {
                email,
                password = "ValidPass1!",
                name = "Test@User!",
                phoneNumber = "+12345678901"
            };
            var response = await client.PostAsJsonAsync(RegisterEndpoint, request);
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
            var body = await response.Content.ReadFromJsonAsync<JsonElement>();
            Assert.That(body.GetProperty("error").GetString(), Does.Contain("name"));

            // DB assertion: no user created
            using var conn = GetDbConnection();
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            var param = cmd.CreateParameter();
            param.ParameterName = "@email";
            param.Value = email;
            cmd.Parameters.Add(param);
            var count = (long)cmd.ExecuteScalar();
            Assert.That(count, Is.EqualTo(0), "No user should be created in DB");
        }

#region Email Verification Tests

private const string VerifyEndpoint = "/api/v1/users/verify-email";

private string InsertUserAndToken(bool emailVerified = false, bool tokenUsed = false)
{
    var userId = Guid.NewGuid().ToString();
    var token = Guid.NewGuid().ToString();
    using var conn = GetDbConnection();
    conn.Open();
    using var cmd = conn.CreateCommand();
    cmd.CommandText = @"
        INSERT INTO [User] (id, name, email, password, status, createdAt, updatedAt, phoneNumber, emailVerified)
        VALUES (@id, 'Verify User', 'verifyuser@example.com', 'hashed', 'Active', datetime('now'), datetime('now'), '+12345678901', @emailVerified);
        INSERT INTO EmailVerificationToken (id, userId, token, createdAt, expiresAt, isUsed)
        VALUES (@tokenId, @userId, @token, datetime('now'), datetime('now', '+1 day'), @isUsed);
    ";
    var p1 = cmd.CreateParameter(); p1.ParameterName = "@id"; p1.Value = userId; cmd.Parameters.Add(p1);
    var p2 = cmd.CreateParameter(); p2.ParameterName = "@emailVerified"; p2.Value = emailVerified ? 1 : 0; cmd.Parameters.Add(p2);
    var p3 = cmd.CreateParameter(); p3.ParameterName = "@tokenId"; p3.Value = Guid.NewGuid().ToString(); cmd.Parameters.Add(p3);
    var p4 = cmd.CreateParameter(); p4.ParameterName = "@userId"; p4.Value = userId; cmd.Parameters.Add(p4);
    var p5 = cmd.CreateParameter(); p5.ParameterName = "@token"; p5.Value = token; cmd.Parameters.Add(p5);
    var p6 = cmd.CreateParameter(); p6.ParameterName = "@isUsed"; p6.Value = tokenUsed ? 1 : 0; cmd.Parameters.Add(p6);
    cmd.ExecuteNonQuery();
    return token;
}

[Test]
public async Task VerifyEmail_ValidToken_Returns200AndSetsEmailVerified()
{
    var token = InsertUserAndToken();
    var client = GetClient();
    var request = new { token };
    var response = await client.PostAsJsonAsync(VerifyEndpoint, request);
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    Assert.That(body.GetProperty("emailVerified").GetBoolean(), Is.True);
    Assert.That(body.GetProperty("status").GetString(), Is.EqualTo("Active"));

    // DB assertion: user emailVerified is true, token isUsed is true
    using var conn = GetDbConnection();
    conn.Open();
    using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT u.emailVerified, t.isUsed FROM [User] u JOIN EmailVerificationToken t ON u.id = t.userId WHERE t.token = @token";
    var param = cmd.CreateParameter(); param.ParameterName = "@token"; param.Value = token; cmd.Parameters.Add(param);
    using var reader = cmd.ExecuteReader();
    Assert.That(reader.Read(), Is.True);
    Assert.That(reader.GetInt32(0), Is.EqualTo(1)); // emailVerified
    Assert.That(reader.GetInt32(1), Is.EqualTo(1)); // isUsed
}

[Test]
public async Task VerifyEmail_InvalidToken_Returns400_AndNoChangeInDb()
{
    var token = "invalid-token";
    var client = GetClient();
    var request = new { token };
    var response = await client.PostAsJsonAsync(VerifyEndpoint, request);
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    Assert.That(body.GetProperty("error").GetString(), Does.Contain("token"));

    // DB assertion: no user emailVerified changed, no token used
    using var conn = GetDbConnection();
    conn.Open();
    using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT COUNT(*) FROM EmailVerificationToken WHERE token = @token";
    var param = cmd.CreateParameter(); param.ParameterName = "@token"; param.Value = token; cmd.Parameters.Add(param);
    var count = (long)cmd.ExecuteScalar();
    Assert.That(count, Is.EqualTo(0));
}

[Test]
public async Task VerifyEmail_AlreadyVerified_Returns409_AndNoChangeInDb()
{
    var token = InsertUserAndToken(emailVerified: true);
    var client = GetClient();
    var request = new { token };
    var response = await client.PostAsJsonAsync(VerifyEndpoint, request);
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Conflict));
    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    Assert.That(body.GetProperty("error").GetString(), Does.Contain("already verified"));

    // DB assertion: user emailVerified is still true, token isUsed is false
    using var conn = GetDbConnection();
    conn.Open();
    using var cmd = conn.CreateCommand();
    cmd.CommandText = "SELECT u.emailVerified, t.isUsed FROM [User] u JOIN EmailVerificationToken t ON u.id = t.userId WHERE t.token = @token";
    var param = cmd.CreateParameter(); param.ParameterName = "@token"; param.Value = token; cmd.Parameters.Add(param);
    using var reader = cmd.ExecuteReader();
    Assert.That(reader.Read(), Is.True);
    Assert.That(reader.GetInt32(0), Is.EqualTo(1)); // emailVerified
    Assert.That(reader.GetInt32(1), Is.EqualTo(0)); // isUsed
}

[Test]
public async Task VerifyEmail_ExpiredToken_Returns400_AndNoChangeInDb()
{
    var userId = Guid.NewGuid().ToString();
    var token = Guid.NewGuid().ToString();
    using (var conn = GetDbConnection())
    {
        conn.Open();
        using var cmd = conn.CreateCommand();
        cmd.CommandText = @"
            INSERT INTO [User] (id, name, email, password, status, createdAt, updatedAt, phoneNumber, emailVerified)
            VALUES (@id, 'Expired User', 'expireduser@example.com', 'hashed', 'Active', datetime('now'), datetime('now'), '+12345678901', 0);
            INSERT INTO EmailVerificationToken (id, userId, token, createdAt, expiresAt, isUsed)
            VALUES (@tokenId, @userId, @token, datetime('now', '-2 day'), datetime('now', '-1 day'), 0);
        ";
        var p1 = cmd.CreateParameter(); p1.ParameterName = "@id"; p1.Value = userId; cmd.Parameters.Add(p1);
        var p2 = cmd.CreateParameter(); p2.ParameterName = "@tokenId"; p2.Value = Guid.NewGuid().ToString(); cmd.Parameters.Add(p2);
        var p3 = cmd.CreateParameter(); p3.ParameterName = "@userId"; p3.Value = userId; cmd.Parameters.Add(p3);
        var p4 = cmd.CreateParameter(); p4.ParameterName = "@token"; p4.Value = token; cmd.Parameters.Add(p4);
        cmd.ExecuteNonQuery();
    }
    var client = GetClient();
    var request = new { token };
    var response = await client.PostAsJsonAsync(VerifyEndpoint, request);
    Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    var body = await response.Content.ReadFromJsonAsync<JsonElement>();
    Assert.That(body.GetProperty("error").GetString(), Does.Contain("expired"));

    // DB assertion: user emailVerified is still false, token isUsed is false
    using var conn2 = GetDbConnection();
    conn2.Open();
    using var cmd2 = conn2.CreateCommand();
    cmd2.CommandText = "SELECT u.emailVerified, t.isUsed FROM [User] u JOIN EmailVerificationToken t ON u.id = t.userId WHERE t.token = @token";
    var param2 = cmd2.CreateParameter(); param2.ParameterName = "@token"; param2.Value = token; cmd2.Parameters.Add(param2);
    using var reader2 = cmd2.ExecuteReader();
    Assert.That(reader2.Read(), Is.True);
    Assert.That(reader2.GetInt32(0), Is.EqualTo(0)); // emailVerified
    Assert.That(reader2.GetInt32(1), Is.EqualTo(0)); // isUsed
}

#endregion
    }
}
