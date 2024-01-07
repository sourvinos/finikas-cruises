using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Genders {

    public class UpdateValidGender : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestGender {
                    Id = 1,
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2023-09-07 09:53:15"
                }
            };
        }

    }

}
