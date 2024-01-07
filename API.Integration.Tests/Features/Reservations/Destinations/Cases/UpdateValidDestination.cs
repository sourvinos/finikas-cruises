using System.Collections;
using System.Collections.Generic;
using Infrastructure;

namespace Destinations {

    public class UpdateValidDestination : IEnumerable<object[]> {

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

        public IEnumerator<object[]> GetEnumerator() {
            yield return ValidRecord();
        }

        private static object[] ValidRecord() {
            return new object[] {
                new TestDestination {
                    Id = 1,
                    Abbreviation = Helpers.CreateRandomString(5),
                    Description = Helpers.CreateRandomString(128),
                    PutAt = "2023-09-07 09:52:40"
                }
            };
        }

    }

}
