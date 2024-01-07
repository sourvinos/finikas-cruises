using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace ShipRoutes {

    public class UpdateValidShipRoute : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestShipRoute {
                    Id = 5,
                    Description = Helpers.CreateRandomString(128),
                    FromPort = Helpers.CreateRandomString(128),
                    FromTime = "08:00",
                    ToPort =  Helpers.CreateRandomString(128),
                    ToTime = "10:00",
                    PutAt = "2023-09-07 09:56:24"
                }
            };
        }

    }

}
