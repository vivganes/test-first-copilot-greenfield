using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Tests.IntegrationTests
{
    [TestFixture]
    public class ControllerIntegrationTest:CustomIntegrationTestBase
    {
        [Test]
        public async Task ReturnsHelloWorld() {
            var response =await GetClient().GetAsync("/hello");
            Assert.That(response.Content.ReadAsStringAsync, Is.EqualTo("Hello world"));
        }
    }
}
