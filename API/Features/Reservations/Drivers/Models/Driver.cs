using System.Collections.Generic;
using API.Features.Reservations.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Drivers{

    public class Driver : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Phones { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public List<Reservation> Reservations { get; set; }

    }

}