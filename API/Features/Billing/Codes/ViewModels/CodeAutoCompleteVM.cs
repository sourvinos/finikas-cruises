using System;

namespace API.Features.Billing.Codes {

    public class CodeAutoCompleteVM {

        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Batch { get; set; }

    }

}