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
using Microsoft.EntityFrameworkCore.Storage;
using System;
using API.Infrastructure.Responses;

namespace API.Features.Reservations.PickupPoints {

    public class PickupPointRepository : Repository<PickupPoint>, IPickupPointRepository {

        private readonly IMapper mapper;
        private readonly TestingEnvironment testingSettings;

        public PickupPointRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> testingSettings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, testingSettings, userManager) {
            this.mapper = mapper;
            this.testingSettings = testingSettings.Value;
        }

        public async Task<IEnumerable<PickupPointListVM>> GetAsync() {
            var pickupPoints = await context.PickupPoints
                .AsNoTracking()
                .Include(x => x.CoachRoute)
                .Include(x => x.Destination)
                .Include(x => x.Port)
                .OrderBy(x => x.Destination.Description).ThenBy(x => x.CoachRoute.Abbreviation).ThenBy(x => x.Time).ThenBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<PickupPoint>, IEnumerable<PickupPointListVM>>(pickupPoints);
        }

        public async Task<IEnumerable<PickupPointAutoCompleteVM>> GetAutoCompleteAsync() {
            var pickupPoints = await context.PickupPoints
                .AsNoTracking()
                .Include(x => x.CoachRoute)
                .Include(x => x.Destination)
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
                    .Include(x => x.Destination)
                    .Include(x => x.Port)
                    .SingleOrDefaultAsync(x => x.Id == id)
                : await context.PickupPoints
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.Id == id);
        }

        public void DeleteRange(string[] ids) {
            using var transaction = context.Database.BeginTransaction();
            try {
                context.PickupPoints
                    .RemoveRange(context.PickupPoints
                    .Where(x => ids.Contains(x.Id.ToString()))
                    .ToList());
                context.SaveChanges();
                DisposeOrCommit(transaction);
            }
            catch (Exception) {
                throw new CustomException {
                    ResponseCode = 491
                };
            }
        }

        private void DisposeOrCommit(IDbContextTransaction transaction) {
            if (testingSettings.IsTesting) {
                transaction.Dispose();
            } else {
                transaction.Commit();
            }
        }

    }

}