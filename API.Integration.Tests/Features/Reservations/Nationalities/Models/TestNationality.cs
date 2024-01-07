using Infrastructure;

namespace Nationalities {

    public class TestNationality : ITestEntity {

        public int StatusCode { get; set; }

        public int Id { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public string PutAt { get; set; }

    }

}