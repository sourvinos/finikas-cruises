using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace PickupPoints {

    public class CreateInvalidPickupPoint : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return CoachRoute_Must_Exist();
            yield return CoachRoute_Must_Be_Active();
            yield return Port_Must_Exist();
            yield return Port_Must_Be_Active();
        }

        private static object[] CoachRoute_Must_Exist() {
            return new object[] {
                new TestPickupPoint {
                    StatusCode = 408,
                    CoachRouteId = 99,
                    PortId = 1,
                    Description = Helpers.CreateRandomString(128),
                    ExactPoint = Helpers.CreateRandomString(128),
                    Time = "08:00"
                }
            };
        }

        private static object[] CoachRoute_Must_Be_Active() {
            return new object[] {
                new TestPickupPoint {
                    StatusCode = 408,
                    CoachRouteId = 9,
                    PortId = 1,
                    Description = Helpers.CreateRandomString(128),
                    ExactPoint = Helpers.CreateRandomString(128),
                    Time = "08:00"
                }
            };
        }

        private static object[] Port_Must_Exist() {
            return new object[] {
                new TestPickupPoint {
                    StatusCode = 411,
                    CoachRouteId = 1,
                    PortId = 999,
                    Description = Helpers.CreateRandomString(128),
                    ExactPoint = Helpers.CreateRandomString(128),
                    Time = "08:00"
                }
            };
        }

        private static object[] Port_Must_Be_Active() {
            return new object[] {
                new TestPickupPoint {
                    StatusCode = 411,
                    CoachRouteId = 1,
                    PortId = 9,
                    Description = Helpers.CreateRandomString(128),
                    ExactPoint = Helpers.CreateRandomString(128),
                    Time = "08:00"
                }
            };
        }

    }

}
