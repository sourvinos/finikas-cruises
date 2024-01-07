using System;
using API.Infrastructure.Classes;

namespace API.Features.Reservations.Ledgers {

    public class LedgerReservationVM {

        public string Date { get; set; }
        public string RefNo { get; set; }
        public Guid ReservationId { get; set; }
        public LedgerSimpleEntityVM Destination { get; set; }
        public SimpleEntity PickupPoint { get; set; }
        public LedgerSimpleEntityVM Port { get; set; }
        public LedgerSimpleEntityVM Ship { get; set; }
        public string TicketNo { get; set; }
        public int Adults { get; set; }
        public int Kids { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public int EmbarkedPassengers { get; set; }
        public int TotalNoShow { get; set; }
        public string Remarks { get; set; }
        public bool HasTransfer { get; set; }

    }

}