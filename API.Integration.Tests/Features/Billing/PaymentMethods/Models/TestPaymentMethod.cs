using System;

namespace PaymentMethods {

    public class TestPaymentMethod {

        public int StatusCode { get; set; }

        public Guid Id { get; set; }
        // Fields
        public string Description { get; set; }
        public bool IsCash { get; set; }
        public bool IsActive { get; set; }
        public string PutAt { get; set; }

    }

}