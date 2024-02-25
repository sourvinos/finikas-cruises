using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Reservations.ShipCrews {

    public class ShipCrewMappingProfile : Profile {

        public ShipCrewMappingProfile() {
            // List
            CreateMap<ShipCrew, ShipCrewListVM>()
                .ForMember(x => x.Birthdate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Birthdate)))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }));
            // Dropdown
            CreateMap<ShipCrew, ShipCrewAutoCompleteVM>()
                .ForMember(x => x.Birthdate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Birthdate)));
            // Read
            CreateMap<ShipCrew, ShipCrewReadDto>()
                .ForMember(x => x.Birthdate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.Birthdate)))
                .ForMember(x => x.Ship, x => x.MapFrom(x => new SimpleEntity { Id = x.Ship.Id, Description = x.Ship.Description }))
                .ForMember(x => x.Nationality, x => x.MapFrom(x => new SimpleEntity { Id = x.Nationality.Id, Description = x.Nationality.Description }))
                .ForMember(x => x.Gender, x => x.MapFrom(x => new SimpleEntity { Id = x.Gender.Id, Description = x.Gender.Description }))
                .ForMember(x => x.Specialty, x => x.MapFrom(x => new SimpleEntity { Id = x.Specialty.Id, Description = x.Specialty.Description }))
                .ForMember(x => x.PassportExpiryDate, x => x.MapFrom(x => DateHelpers.DateToISOString(x.PassportExpiryDate)));
            // Write
            CreateMap<ShipCrewWriteDto, ShipCrew>()
                .ForMember(x => x.OccupantId, x => x.MapFrom(x => 1))
                .ForMember(x => x.Lastname, x => x.MapFrom(x => x.Lastname.Trim()))
                .ForMember(x => x.Firstname, x => x.MapFrom(x => x.Firstname.Trim()))
                .ForMember(x => x.PassportNo, x => x.MapFrom(x => x.PassportNo.Trim()));
        }

    }

}