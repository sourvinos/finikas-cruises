using System.Collections.Generic;

namespace API.Features.Reservations.Ledgers {

    public interface ILedgerRepository {

        IEnumerable<LedgerVM> Get(string fromDate, string toDate, int[] customerIds, int[] destinationIds, int[] portIds, int?[] shipIds);

    }

}