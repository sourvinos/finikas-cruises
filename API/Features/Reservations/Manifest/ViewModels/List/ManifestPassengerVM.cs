using API.Infrastructure.Classes;

namespace API.Features.Reservations.Manifest {

    public class ManifestPassengerVM {

        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public SimpleEntity Gender { get; set; }
        public ManifestNationalityVM Nationality { get; set; }
        public string Birthdate { get; set; }
        public string PassportNo { get; set; }
        public string PassportExpiryDate { get; set; }
        public string Phones { get; set; }
        public string Remarks { get; set; }
        public string SpecialCare { get; set; }
        public ManifestPortVM Port { get; set; }

    }

}