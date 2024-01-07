using Infrastructure;
using Responses;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Cases;

namespace ShipOwners {

    [Collection("Sequence")]
    public class ShipOwners04Post : IClassFixture<AppSettingsFixture> {

        #region variables

        private readonly AppSettingsFixture _appSettingsFixture;
        private readonly HttpClient _httpClient;
        private readonly TestHostFixture _testHostFixture = new();
        private readonly string _actionVerb = "post";
        private readonly string _baseUrl;
        private readonly string _url = "/shipOwners";

        #endregion

        public ShipOwners04Post(AppSettingsFixture appsettings) {
            _appSettingsFixture = appsettings;
            _baseUrl = _appSettingsFixture.Configuration.GetSection("TestingEnvironment").GetSection("BaseUrl").Value;
            _httpClient = _testHostFixture.Client;
        }

        [Theory]
        [ClassData(typeof(CreateValidShipOwner))]
        public async Task Unauthorized_Not_Logged_In(TestShipOwner record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "", "", record);
        }

        [Theory]
        [ClassData(typeof(CreateValidShipOwner))]
        public async Task Unauthorized_Invalid_Credentials(TestShipOwner record) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, "user-does-not-exist", "not-a-valid-password", record);
        }

        [Theory]
        [ClassData(typeof(InactiveUsersCanNotLogin))]
        public async Task Unauthorized_Inactive_Users(Login login) {
            await InvalidCredentials.Action(_httpClient, _baseUrl, _url, _actionVerb, login.Username, login.Password, null);
        }

        [Theory]
        [ClassData(typeof(CreateValidShipOwner))]
        public async Task Simple_Users_Can_Not_Create(TestShipOwner record) {
            await Forbidden.Action(_httpClient, _baseUrl, _url, _actionVerb, "simpleuser", "1234567890", record);
        }

        [Theory]
        [ClassData(typeof(CreateValidShipOwner))]
        public async Task Admins_Can_Create_When_Valid(TestShipOwner record) {
            await RecordSaved.Action(_httpClient, _baseUrl, _url, _actionVerb, "john", "Ec11fc8c16db#", record);
        }

    }

}