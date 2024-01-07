using System;
using System.Collections;
using System.Collections.Generic;

namespace Reservations {

    public class ActiveAdminsCanCreateWhenValid : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Admins_Can_Create_Reservations_For_Past_Date();
            yield return Admins_Can_Create_Reservations_For_Future_Date();
        }

        private static object[] Admins_Can_Create_Reservations_For_Past_Date() {
            return new object[] {
                new TestNewReservation {
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 642,
                    PortId = 1,
                    Date = "2022-09-15",
                    Now = new DateTime(2022, 9, 16, 12, 00, 00),
                    TicketNo = "xxxx",
                    Adults = 2,
                    Passengers = new List<TestPassenger>() {
                        new TestPassenger {
                            Lastname = "AEDAN",
                            Firstname = "ZAYAS",
                            Birthdate = "1992-06-12",
                            NationalityId = 123,
                            GenderId = 1
                        }
                    }
                }
            };
        }

        private static object[] Admins_Can_Create_Reservations_For_Future_Date() {
            return new object[] {
                new TestNewReservation {
                    CustomerId = 1,
                    DestinationId = 1,
                    PickupPointId = 642,
                    PortId = 1,
                    Date = "2022-09-15",
                    Now = new DateTime(2022, 9, 14, 12, 00, 00),
                    TicketNo = "xxxx",
                    Adults = 2,
                    Kids = 1,
                    Passengers = new List<TestPassenger>() {
                        new TestPassenger { Lastname = "AEDAN", Firstname = "ZAYAS", Birthdate = "1992-06-12", NationalityId = 123, GenderId = 1 },
                        new TestPassenger { Lastname = "ALONA", Firstname = "CUTLER", Birthdate = "1964-04-28", NationalityId = 127, GenderId = 2 },
                        new TestPassenger { Lastname = "LYA", Firstname = "TROWBRIDGE", Birthdate = "2015-01-21", NationalityId = 211, GenderId = 1 },
                    }
                }
            };
        }

    }

}
