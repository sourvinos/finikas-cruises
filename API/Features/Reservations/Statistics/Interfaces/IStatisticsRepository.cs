using System.Collections.Generic;
using API.Features.Reservations.Reservations;
using API.Infrastructure.Interfaces;

namespace API.Features.Reservations.Statistics {

    public interface IStatisticsRepository : IRepository<Reservation> {

        IEnumerable<StatisticsVM> Get(StatisticsCriteriaVM criteria);
        IEnumerable<StatisticsVM> GetPerCustomer(StatisticsCriteriaVM criteria);
        IEnumerable<StatisticsVM> GetPerDestination(StatisticsCriteriaVM criteria);
        // IEnumerable<StatisticsVM> GetPerPort(int year);
        // IEnumerable<StatisticsVM> GetPerShip(int year);
        // IEnumerable<StatisticsVM> GetPerDriver(int year);
        // IEnumerable<StatisticsVM> GetPerCustomer(int year);
        // IEnumerable<StatisticsVM> GetPerUser(StatisticsCriteriaVM criteria);
        // IEnumerable<StatisticsNationalityVM> GetPerNationality(int year);

    }

}