using API.Features.Reservations.CoachRoutes;
using API.Features.Reservations.Destinations;
using API.Infrastructure.Classes;
using AutoMapper;

namespace API.Features.Reservations.PickupPoints {

    public class PickupPointMappingProfile : Profile {

        public PickupPointMappingProfile() {
            // List
            CreateMap<PickupPoint, PickupPointListVM>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new PickupPointListCoachRouteVM {
                    Id = x.CoachRoute.Id,
                    Abbreviation = x.CoachRoute.Abbreviation
                }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new PickupPointListDestinationVM {
                    Id = x.DestinationId,
                    Abbreviation = x.Destination.Abbreviation,
                    Description = x.Destination.Description
                }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new PickupPointListPortVM {
                    Id = x.Port.Id,
                    Abbreviation = x.Port.Abbreviation,
                    Description = x.Port.Description
                }));
            // Autocomplete
            CreateMap<PickupPoint, PickupPointAutoCompleteVM>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint))
                .ForMember(x => x.Time, x => x.MapFrom(x => x.Time))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Destination.Id,
                    Description = x.Destination.Description
                }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Port.Id,
                    Description = x.Port.Description
                }));
            // GetById
            CreateMap<PickupPoint, PickupPointReadDto>()
                .ForMember(x => x.CoachRoute, x => x.MapFrom(x => new CoachRouteAutoCompleteVM {
                    Id = x.CoachRoute.Id,
                    Abbreviation = x.CoachRoute.Abbreviation
                }))
                .ForMember(x => x.Destination, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Destination.Id,
                    Description = x.Destination.Description
                }))
                .ForMember(x => x.Port, x => x.MapFrom(x => new SimpleEntity {
                    Id = x.Port.Id,
                    Description = x.Port.Description
                }));
            // Write
            CreateMap<PickupPointWriteDto, PickupPoint>()
                .ForMember(x => x.Description, x => x.MapFrom(x => x.Description.Trim()))
                .ForMember(x => x.ExactPoint, x => x.MapFrom(x => x.ExactPoint.Trim()))
                .ForMember(x => x.Remarks, x => x.MapFrom(x => x.Remarks.Trim()));
        }

    }

}