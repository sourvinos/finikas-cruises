using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Customers {

    public interface ICustomerRepository : IRepository<Customer> {

        Task<IEnumerable<CustomerListVM>> GetAsync();
        Task<IEnumerable<CustomerAutoCompleteVM>> GetForAutoCompleteAsync();
        Task<IEnumerable<SimpleEntity>> GetForCriteriaAsync();
        Task<Customer> GetByIdAsync(int id, bool includeTables);

    }

}