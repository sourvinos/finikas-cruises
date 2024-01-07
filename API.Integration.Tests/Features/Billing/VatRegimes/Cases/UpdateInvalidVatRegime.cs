using System;
using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace VatRegimes {

    public class UpdateInvalidCode : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return Code_Must_Not_Be_Already_Updated();
        }

        private static object[] Code_Must_Not_Be_Already_Updated(){
            return new object[] {
                new TestVatRegime {
                    StatusCode = 415,
                    Id = Guid.Parse("51c16717-c294-40ff-90de-b41060c85e30"),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2022-09-07 09:55:22"
                }
            };
        }

    }

}
