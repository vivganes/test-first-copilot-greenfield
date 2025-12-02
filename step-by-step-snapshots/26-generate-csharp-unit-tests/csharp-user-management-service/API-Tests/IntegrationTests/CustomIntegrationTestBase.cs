using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API_Tests.IntegrationTests
{
    [Category("Integration")]
    public class CustomIntegrationTestBase
    {
        protected WebApplicationFactory<Program> _webApplicationFactory = null!;
        protected HttpClient _client = null!;

        [SetUp]
        public void SetUp()
        {
            _webApplicationFactory = new WebApplicationFactory<Program>()
                .WithWebHostBuilder(builder =>
                {
                    builder.UseEnvironment("Testing");
                    
                    builder.ConfigureAppConfiguration((context, config) =>
                    {
                        // Clear existing sources and add Testing configuration
                        config.Sources.Clear();
                        config.AddJsonFile("appsettings.Testing.json", optional: false, reloadOnChange: false);
                    });
                });

            // Create client to trigger application build
            _client = _webApplicationFactory.CreateClient();
            
            // Initialize database with cleanup and schema scripts
            var configuration = _webApplicationFactory.Services.GetRequiredService<IConfiguration>();
            Program.InitializeDatabase(configuration, forceReinitialize: true);
        }

        [TearDown]
        public void TearDown()
        {
            _client?.Dispose();
            _webApplicationFactory?.Dispose();
        }

        public HttpClient GetClient() => _client;
    }
}
