namespace API.Features.Reservations.Manifest {

    public class ManifestCriteriaVM {

        public bool OnlyBoarded { get; set; }
        public string Date { get; set; }
        public int DestinationId { get; set; }
        public int PortId { get; set; }
        public int? ShipId { get; set; }

    }

}