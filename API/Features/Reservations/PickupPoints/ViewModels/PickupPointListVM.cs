using API.Infrastructure.Classes;

namespace API.Features.Reservations.PickupPoints {

    public class PickupPointListVM {

        public int Id { get; set; }
        public string Description { get; set; }
        public PickupPointListCoachRouteVM CoachRoute { get; set; }
        public SimpleEntity Destination { get; set; }
        public PickupPointListPortVM Port { get; set; }
        public string ExactPoint { get; set; }
        public string Time { get; set; }
        public string Remarks { get; set; }
        public bool IsActive { get; set; }
        public string PutAt { get; set; }

    }

}