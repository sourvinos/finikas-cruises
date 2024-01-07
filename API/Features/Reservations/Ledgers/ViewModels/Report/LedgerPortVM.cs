using System.Collections.Generic;
using API.Infrastructure.Classes;

namespace API.Features.Reservations.Ledgers {

    public class LedgerPortVM {

        public SimpleEntity Port { get; set; }
        public int Adults { get; set; }
        public int Kids { get; set; }
        public int Free { get; set; }
        public int TotalPax { get; set; }
        public int TotalPassengers { get; set; }
        public int TotalNoShow { get; set; }
        public IEnumerable<LedgerPortGroupVM> HasTransferGroup { get; set; }

    }

}