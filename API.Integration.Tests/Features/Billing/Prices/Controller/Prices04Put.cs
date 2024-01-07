using Cases;
using Infrastructure;
using Responses;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace Prices {

    [Collection("Sequence")]
    public class Prices05Put : IClassFixture<AppSettingsFixture> {

        #region variables

        private readonly AppSettingsFixture _appSettingsFixture;
        private readonly HttpClient _httpClient;
        private readonly TestHostFixture _testHostFixture = new();
        private readonly string _actionVerb = "put";
        private readonly string _baseUrl;
        private readonly string _url = "/prices";
        private readonly string _notFoundUrl = "/prices/2b5d1fcc-1c5a-43d3-b7aa-72fc89759ac7";

        #endregion

        public Prices05Put(AppSettingsFixture appsettings) {
            _appSettingsFixture = appsettings;
            _baseUrl = _appSettingsFixture.Configuration.GetSection("TestingEnvironment").GetSection("BaseUrl").Value;
            _httpClient = _testHostFixture.Client;
        }

        [Theory]
        [ClassData(typeof(UpdateValidPrice))]
        public async Task Unauthorized_Not_Logged_In(TestPrice record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "", "", record);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPrice))]
        public async Task Unauthorized_Invalid_Credentials(TestPrice record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "user-does-not-exist", "not-a-valid-password", record);
        }

        [Theory]
        [ClassData(typeof(InactiveUsersCanNotLogin))]
        public async Task Unauthorized_Inactive_Users(Login login) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, login.Username, login.Password, null);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPrice))]
        public async Task Simple_Users_Can_Not_Update(TestPrice record) {
            await Forbidden.Action(_httpClient, _baseUrl, _url, _actionVerb, "simpleuser", "1234567890", record);
        }

        [Fact]
        public async Task Admins_Can_Not_Update_When_Not_Found() {
            await RecordNotFound.Action(_httpClient, _baseUrl, _notFoundUrl, "john", "Ec11fc8c16db#");
        }

        [Theory]
        [ClassData(typeof(UpdateInvalidPrice))]
        public async Task Admins_Can_Not_Update_When_Invalid(TestPrice record) {
            var actionResponse = await RecordInvalidNotSaved.Action(_httpClient, _baseUrl, _url, _actionVerb, "john", "Ec11fc8c16db#", record);
            Assert.Equal((HttpStatusCode)record.StatusCode, actionResponse.StatusCode);
        }

        [Theory]
        [ClassData(typeof(UpdateValidPrice))]
        public async Task Admins_Can_Update_When_Valid(TestPrice record) {
            await RecordSaved.Action(_httpClient, _baseUrl, _url, _actionVerb, "john", "Ec11fc8c16db#", record);
        }

    }

}