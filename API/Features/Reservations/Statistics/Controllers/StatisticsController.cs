using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Statistics {

    [Route("api/[controller]")]
    public class StatisticsController : ControllerBase {

        #region variables

        private readonly IStatisticsRepository statisticsRepo;

        #endregion

        public StatisticsController(IStatisticsRepository statisticsRepo) {
            this.statisticsRepo = statisticsRepo;
        }

        [HttpGet("ytd")]
        [Authorize(Roles = "admin")]
        public IEnumerable<StatisticsVM> Get([FromBody] StatisticsCriteriaVM criteria) {
            return statisticsRepo.Get(criteria);
        }

        [HttpPost("customers")]
        [Authorize(Roles = "admin")]
        public IEnumerable<StatisticsVM> GetPerCustomer([FromBody] StatisticsCriteriaVM criteria) {
            return statisticsRepo.GetPerCustomer(criteria);
        }

        [HttpPost("destinations")]
        [Authorize(Roles = "admin")]
        public IEnumerable<StatisticsVM> GetPerDestination([FromBody] StatisticsCriteriaVM criteria) {
            return statisticsRepo.GetPerDestination(criteria);
        }

        // [HttpGet("drivers/year/{year}")]
        // [Authorize(Roles = "admin")]
        // public IEnumerable<StatisticsVM> GetPerDriver([FromRoute] int year) {
        //     return statisticsRepo.GetPerDriver(year);
        // }

        // [HttpGet("ports/year/{year}")]
        // [Authorize(Roles = "admin")]
        // public IEnumerable<StatisticsVM> GetPerPort([FromRoute] int year) {
        //     return statisticsRepo.GetPerPort(year);
        // }

        // [HttpGet("ships/year/{year}")]
        // [Authorize(Roles = "admin")]
        // public IEnumerable<StatisticsVM> GetPerShip([FromRoute] int year) {
        //     return statisticsRepo.GetPerShip(year);
        // }

        // [HttpGet("nationalities/year/{year}")]
        // [Authorize(Roles = "admin")]
        // public IEnumerable<StatisticsVM> GetPerNationality([FromRoute] int year) {
        //     return statisticsRepo.GetPerNationality(year);
        // }

        // [HttpPost("users")]
        // [Authorize(Roles = "admin")]
        // public IEnumerable<StatisticsVM> GetPerUser([FromBody] StatisticsCriteriaVM criteria) {
        //     return statisticsRepo.GetPerUser(criteria);
        // }

    }

}