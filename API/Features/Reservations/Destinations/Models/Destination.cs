﻿using System.Collections.Generic;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.Schedules;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Destinations {

    public class Destination : IBaseEntity, IMetadata {

        // PK
        public int Id { get; set; }
        // Fields
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public bool IsActive { get; set; }
        // Metadata
        public string PostAt { get; set; }
        public string PostUser { get; set; }
        public string PutAt { get; set; }
        public string PutUser { get; set; }
        // Navigation
        public List<Schedule> Schedules { get; set; }
        public List<Reservation> Reservations { get; set; }

    }

}