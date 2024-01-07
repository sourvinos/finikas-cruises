using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Features.Reservations.ShipRoutes {

    public class ShipRouteRepository : Repository<ShipRoute>, IShipRouteRepository {

        private readonly IMapper mapper;

        public ShipRouteRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<ShipRouteListVM>> GetAsync() {
            var shipRoutes = await context.ShipRoutes
                .AsNoTracking()
                .OrderBy(x => x.FromTime).ThenBy(x => x.ViaTime).ThenBy(x => x.ToTime)
                .ToListAsync();
            return mapper.Map<IEnumerable<ShipRoute>, IEnumerable<ShipRouteListVM>>(shipRoutes);
        }

        public async Task<IEnumerable<ShipRouteAutoCompleteVM>> GetAutoCompleteAsync() {
            var shipRoutes = await context.ShipRoutes
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<ShipRoute>, IEnumerable<ShipRouteAutoCompleteVM>>(shipRoutes);
        }

        public async Task<ShipRoute> GetByIdAsync(int id) {
            return await context.ShipRoutes
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}