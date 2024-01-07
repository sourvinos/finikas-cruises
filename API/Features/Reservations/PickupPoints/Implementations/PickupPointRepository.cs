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

namespace API.Features.Reservations.PickupPoints {

    public class PickupPointRepository : Repository<PickupPoint>, IPickupPointRepository {

        private readonly IMapper mapper;

        public PickupPointRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<PickupPointListVM>> GetAsync() {
            var pickupPoints = await context.PickupPoints
                .AsNoTracking()
                .Include(x => x.CoachRoute)
                .Include(x => x.Port)
                .OrderBy(x => x.CoachRoute.Abbreviation).ThenBy(x => x.Time).ThenBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<PickupPoint>, IEnumerable<PickupPointListVM>>(pickupPoints);
        }

        public async Task<IEnumerable<PickupPointAutoCompleteVM>> GetAutoCompleteAsync() {
            var pickupPoints = await context.PickupPoints
                .AsNoTracking()
                .Include(x => x.CoachRoute)
                .Include(x => x.Port)
                .OrderBy(x => x.Time).ThenBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<PickupPoint>, IEnumerable<PickupPointAutoCompleteVM>>(pickupPoints);
        }

        public async Task<PickupPoint> GetByIdAsync(int id, bool includeTables) {
            return includeTables
                ? await context.PickupPoints
                    .AsNoTracking()
                    .Include(x => x.CoachRoute)
                    .Include(x => x.Port)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.PickupPoints
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}