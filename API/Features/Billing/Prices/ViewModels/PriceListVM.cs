using System;
using API.Infrastructure.Classes;

namespace API.Features.Billing.Prices {

    public class PriceListVM {

        public Guid Id { get; set; }
        public SimpleEntity Customer { get; set; }
        public SimpleEntity Destination { get; set; }
        public SimpleEntity Port { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public decimal AdultsWithTransfer { get; set; }
        public decimal AdultsWithoutTransfer { get; set; }
        public decimal KidsWithTransfer { get; set; }
        public decimal KidsWithoutTransfer { get; set; }

    }

}