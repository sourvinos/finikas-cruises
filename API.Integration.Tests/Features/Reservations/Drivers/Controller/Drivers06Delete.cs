using System.Net.Http;
using System.Threading.Tasks;
using Cases;
using Infrastructure;
using Responses;
using Xunit;

namespace Drivers {

    [Collection("Sequence")]
    public class Drivers06Delete : IClassFixture<AppSettingsFixture> {

        #region variables

        private readonly AppSettingsFixture _appSettingsFixture;
        private readonly HttpClient _httpClient;
        private readonly TestHostFixture _testHostFixture = new();
        private readonly string _actionVerb = "delete";
        private readonly string _baseUrl;
        private readonly string _url = "/drivers/4";
        private readonly string _inUseUrl = "/drivers/1";
        private readonly string _notFoundUrl = "/drivers/999";

        #endregion

        public Drivers06Delete(AppSettingsFixture appsettings) {
            _appSettingsFixture = appsettings;
            _baseUrl = _appSettingsFixture.Configuration.GetSection("TestingEnvironment").GetSection("BaseUrl").Value;
            _httpClient = _testHostFixture.Client;
        }

        [Fact]
        public async Task Unauthorized_Not_Logged_In() {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "", "", null);
        }

        [Fact]
        public async Task Unauthorized_Invalid_Credentials() {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "user-does-not-exist", "not-a-valid-password", null);
        }

        [Theory]
        [ClassData(typeof(InactiveUsersCanNotLogin))]
        public async Task Unauthorized_Inactive_Users(Login login) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, login.Username, login.Password, null);
        }

        [Fact]
        public async Task Simple_Users_Can_Not_Delete() {
            await Forbidden.Action(_httpClient, _baseUrl, _url, _actionVerb, "simpleuser", "1234567890", null);
        }

        [Fact]
        public async Task Admins_Not_Found_When_Not_Exists() {
            await RecordNotFound.Action(_httpClient, _baseUrl, _notFoundUrl, "john", "Ec11fc8c16db#");
        }

        [Fact]
        public async Task Admins_Can_Not_Delete_In_Use() {
            await RecordInUse.Action(_httpClient, _baseUrl, _inUseUrl, "john", "Ec11fc8c16db#");
        }

        [Fact]
        public async Task Admins_Can_Delete_Not_In_Use() {
            await RecordDeleted.Action(_httpClient, _baseUrl, _url, "john", "Ec11fc8c16db#");
        }

    }

}