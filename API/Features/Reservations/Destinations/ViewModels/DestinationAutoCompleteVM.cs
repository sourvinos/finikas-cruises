using API.Infrastructure.Classes;

namespace API.Features.Reservations.Destinations {

    public class DestinationAutoCompleteVM : SimpleEntity {

        public bool IsPassportRequired { get; set; }
        public bool IsActive { get; set; }

    }

}