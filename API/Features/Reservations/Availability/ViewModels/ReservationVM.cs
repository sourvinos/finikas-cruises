namespace API.Features.Reservations.Availability {

    public class ReservationVM {

        public string Date { get; set; }
        public int DestinationId { get; set; }
        public int PortId { get; set; }
        public int TotalPax { get; set; }

    }

}