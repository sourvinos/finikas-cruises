using System;
using System.Collections;
using System.Collections.Generic;

namespace Reservations {

    public class ActiveAdminsCanUpdateWhenValid : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Admins_Can_Update();
            yield return Admins_Can_Update_When_PortId_Is_Different_Than_Default();
        }

        private static object[] Admins_Can_Update() {
            return new object[] {
                new TestUpdateReservation {
                    ReservationId = Guid.Parse("08da2863-15d9-4338-81fa-637a52371163"),
                    Date = "2022-05-01",
                    CustomerId = 2,
                    DestinationId = 1,
                    PickupPointId = 248,
                    PortId = 2,
                    RefNo = "PA175",
                    TicketNo = "21",
                    Adults = 2,
                    PutAt = "2023-09-07 09:55:16"
                }
            };
        }

        private static object[] Admins_Can_Update_When_PortId_Is_Different_Than_Default() {
            return new object[] {
                new TestUpdateReservation {
                    ReservationId = Guid.Parse("08da2865-d8c0-40de-815c-eba6f09db081"),
                    Date = "2022-05-01",
                    CustomerId = 2,
                    DestinationId = 1,
                    PickupPointId = 266,
                    PortId = 2,
                    TicketNo = "23",
                    PutAt = "2023-09-07 09:55:16"
                }
            };
        }

    }

}