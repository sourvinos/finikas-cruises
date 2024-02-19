using System;
using API.Features.Reservations.Genders;
using API.Features.Reservations.Nationalities;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Reservations {

    public class RepoPassenger : IBaseEntity {

        // PK
        public int Id { get; set; }
        // FKs
        public int GenderId { get; set; }
        public int NationalityId { get; set; }
        // Fields
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public DateTime Birthdate { get; set; }
        public string PassportNo { get; set; }
        public DateTime PassportExpiryDate { get; set; }
        // Navigation
        public Gender Gender { get; set; }
        public Nationality Nationality { get; set; }

    }

}