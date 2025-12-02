using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<API.Services.IUserRegistrationService, API.Services.UserRegistrationService>();
builder.Services.AddScoped<API.Repositories.IUserRepository, API.Repositories.SqliteUserRepository>();
builder.Services.AddScoped<API.Services.IPasswordHasher, API.Services.StubPasswordHasher>();
builder.Services.AddScoped<API.Services.IEmailService, API.Services.StubEmailService>();
builder.Services.AddScoped<API.Services.IUserValidator, API.Services.StubUserValidator>();
builder.Services.AddScoped<API.Services.IEmailVerificationService, API.Services.StubEmailVerificationService>();
builder.Services.AddScoped<API.UnitOfWork.IUnitOfWork, API.UnitOfWork.StubUnitOfWork>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// GH Copilot code - starts
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins(
            "http://localhost",
            "http://localhost:5173",
            "http://127.0.0.1",
            "http://127.0.0.1:5173"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
    );
});
// GH Copilot code - end

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// GH Copilot code - starts
app.UseCors("AllowLocalhost");
// GH Copilot code - end

app.UseAuthorization();

app.MapControllers();

// Initialize database on startup
InitializeDatabase(builder.Configuration);

app.Run();

// Make Program class accessible for testing
public partial class Program 
{
    public static void InitializeDatabase(IConfiguration configuration, bool forceReinitialize = false)
    {
        var sqliteCsb = new SqliteConnectionStringBuilder(configuration.GetConnectionString("DefaultConnection"));
        var dataSource = sqliteCsb.DataSource;
        var dbPath = Path.IsPathRooted(dataSource)
            ? dataSource
            : Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, dataSource));
        var dbDirectory = Path.GetDirectoryName(dbPath);
        
        if (!string.IsNullOrWhiteSpace(dbDirectory))
        {
            Directory.CreateDirectory(dbDirectory);
        }

        bool shouldInitialize = !File.Exists(dbPath) || forceReinitialize;

        if (shouldInitialize)
        {
            using var connection = new SqliteConnection(configuration.GetConnectionString("DefaultConnection"));
            connection.Open();

            // Run cleanup script if specified and forcing reinitialization
            if (forceReinitialize)
            {
                var cleanupPathSetting = configuration["SqlInit:CleanupPath"] ?? string.Empty;
                if (!string.IsNullOrWhiteSpace(cleanupPathSetting))
                {
                    var cleanupPath = Path.IsPathRooted(cleanupPathSetting)
                        ? cleanupPathSetting
                        : Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, cleanupPathSetting));
                    
                    if (File.Exists(cleanupPath))
                    {
                        var cleanupSql = File.ReadAllText(cleanupPath);
                        using var cleanupCommand = connection.CreateCommand();
                        cleanupCommand.CommandText = cleanupSql;
                        cleanupCommand.ExecuteNonQuery();
                    }
                }
            }

            // Run schema script
            var schemaPathSetting = configuration["SqlInit:SchemaPath"] ?? string.Empty;
            if (!string.IsNullOrWhiteSpace(schemaPathSetting))
            {
                var schemaPath = Path.IsPathRooted(schemaPathSetting)
                    ? schemaPathSetting
                    : Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, schemaPathSetting));
                
                if (File.Exists(schemaPath))
                {
                    var sql = File.ReadAllText(schemaPath);
                    using var command = connection.CreateCommand();
                    command.CommandText = sql;
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}
