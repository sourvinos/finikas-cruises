using Infrastructure;

namespace ShipRoutes {

    public class TestShipRoute : ITestEntity {

        public int StatusCode { get; set; }

        public int Id { get; set; }
        public string Description { get; set; }
        public string FromPort { get; set; }
        public string FromTime { get; set; }
        public string ToPort { get; set; }
        public string ToTime { get; set; }
        public string PutAt { get; set; }

    }

}