// GH Copilot code - starts
using API.Models;
using Microsoft.Data.Sqlite;
using System;

namespace API.Repositories
{
    public class SqliteUserRepository : IUserRepository
    {
        private readonly string _connectionString;
        public SqliteUserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void CreateUser(User user)
        {
            using var conn = new SqliteConnection(_connectionString);
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"INSERT INTO [User] (id, name, email, password, phoneNumber, status, createdAt, updatedAt, emailVerified) VALUES (@id, @name, @email, @password, @phoneNumber, @status, @createdAt, @updatedAt, @emailVerified)";
            cmd.Parameters.AddWithValue("@id", user.Id ?? Guid.NewGuid().ToString());
            cmd.Parameters.AddWithValue("@name", user.Name ?? "");
            cmd.Parameters.AddWithValue("@email", user.Email ?? "");
            cmd.Parameters.AddWithValue("@password", user.PasswordHash ?? "");
            cmd.Parameters.AddWithValue("@phoneNumber", user.PhoneNumber ?? "");
            cmd.Parameters.AddWithValue("@status", user.Status ?? "Active");
            cmd.Parameters.AddWithValue("@createdAt", user.CreatedAt);
            cmd.Parameters.AddWithValue("@updatedAt", user.UpdatedAt);
            cmd.Parameters.AddWithValue("@emailVerified", user.EmailVerified);
            cmd.ExecuteNonQuery();
        }

        public User GetUserByEmail(string email)
        {
            using var conn = new SqliteConnection(_connectionString);
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT id, name, email, password, phoneNumber, status, createdAt, updatedAt, emailVerified FROM [User] WHERE email = @email";
            cmd.Parameters.AddWithValue("@email", email);
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new User
                {
                    Id = reader.GetString(0),
                    Name = reader.GetString(1),
                    Email = reader.GetString(2),
                    PasswordHash = reader.GetString(3),
                    PhoneNumber = reader.GetString(4),
                    Status = reader.GetString(5),
                    CreatedAt = reader.GetDateTime(6),
                    UpdatedAt = reader.GetDateTime(7),
                    EmailVerified = reader.GetBoolean(8)
                };
            }
            return null;
        }

        public void UpdateUser(User user) { /* Not needed for test */ }
        public bool EmailExists(string email)
        {
            using var conn = new SqliteConnection(_connectionString);
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT COUNT(*) FROM [User] WHERE email = @email";
            cmd.Parameters.AddWithValue("@email", email);
            var count = (long)cmd.ExecuteScalar();
            return count > 0;
        }
    }
}
// GH Copilot code - end
