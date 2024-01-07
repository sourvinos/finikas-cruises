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

namespace API.Features.Reservations.Nationalities {

    public class NationalityRepository : Repository<Nationality>, INationalityRepository {

        private readonly IMapper mapper;

        public NationalityRepository(AppDbContext appDbContext, IHttpContextAccessor httpContext, IMapper mapper, IOptions<TestingEnvironment> settings, UserManager<UserExtended> userManager) : base(appDbContext, httpContext, settings, userManager) {
            this.mapper = mapper;
        }

        public async Task<IEnumerable<NationalityListVM>> GetAsync() {
            var nationalities = await context.Nationalities
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Nationality>, IEnumerable<NationalityListVM>>(nationalities);
        }

        public async Task<IEnumerable<NationalityAutoCompleteVM>> GetAutoCompleteAsync() {
            var nationalities = await context.Nationalities
                .AsNoTracking()
                .OrderBy(x => x.Description)
                .ToListAsync();
            return mapper.Map<IEnumerable<Nationality>, IEnumerable<NationalityAutoCompleteVM>>(nationalities);
        }

        public async Task<Nationality> GetByIdAsync(int id) {
            return await context.Nationalities
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == id);
        }

    }

}