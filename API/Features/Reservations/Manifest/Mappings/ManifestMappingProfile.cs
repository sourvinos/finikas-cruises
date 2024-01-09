using System.Linq;
using API.Infrastructure.Classes;
using API.Infrastructure.Helpers;
using AutoMapper;

namespace API.Features.Reservations.Manifest {

    public class ManifestMappingProfile : Profile {

        public ManifestMappingProfile() {
            CreateMap<ManifestInitialVM, ManifestFinalVM>()
                .ForMember(x => x.Date, x => x.MapFrom(source => source.Date))
                .ForMember(x => x.Destination, x => x.MapFrom(source => new SimpleEntity {
                    Id = source.Destination.Id,
                    Description = source.Destination.Description
                }))
                .ForMember(x => x.Ship, x => x.MapFrom(source => new ManifestFinalShipVM {
                    Id = source.Ship.Id,
                    Description = source.Ship.Description,
                    IMO = source.Ship.IMO,
                    Flag = source.Ship.Flag,
                    RegistryNo = source.Ship.RegistryNo,
                    Manager = source.Ship.Manager,
                    ManagerInGreece = source.Ship.ManagerInGreece,
                    Agent = source.Ship.Agent,
                    ShipOwner = new ManifestFinalShipOwnerVM {
                        Description = source.Ship.ShipOwner.Description,
                        Profession = source.Ship.ShipOwner.Profession,
                        Address = source.Ship.ShipOwner.Address,
                        City = source.Ship.ShipOwner.City,
                        Phones = source.Ship.ShipOwner.Phones,
                        TaxNo = source.Ship.ShipOwner.TaxNo
                    },
                    Registrars = source.Ship.Registrars
                        .ConvertAll(registrar => new ManifestFinalRegistrarVM {
                            Fullname = registrar.Fullname,
                            Phones = registrar.Phones,
                            Email = registrar.Email,
                            Fax = registrar.Fax,
                            Address = registrar.Address,
                            IsPrimary = registrar.IsPrimary
                        })
                        .OrderBy(x => !x.IsPrimary)
                        .ToList(),
                    Crew = source.Ship.ShipCrews
                        .ConvertAll(crew => new ManifestFinalCrewVM {
                            Id = crew.Id,
                            Lastname = crew.Lastname.ToUpper(),
                            Firstname = crew.Firstname.ToUpper(),
                            Birthdate = DateHelpers.DateToISOString(crew.Birthdate),
                            Phones = "",
                            PassportNo = crew.PassportNo,
                            PassportExpireDate = ReplaceYearWithSpace(DateHelpers.DateToISOString(crew.PassportExpireDate)),
                            Gender = new SimpleEntity {
                                Id = crew.Gender.Id,
                                Description = crew.Gender.Description
                            },
                            Nationality = new ManifestFinalNationalityVM {
                                Id = crew.Nationality.Id,
                                Code = crew.Nationality.Code.ToUpper(),
                                Description = crew.Nationality.Description
                            },
                            Occupant = new SimpleEntity {
                                Id = crew.Occupant.Id,
                                Description = crew.Occupant.Description
                            }
                        })
                        .OrderBy(x => x.Lastname).ThenBy(x => x.Firstname)
                        .ToList()
                }))
                .ForMember(x => x.ShipRoute, x => x.MapFrom(source => new ManifestFinalShipRouteVM {
                    Description = "",
                    FromPort = "",
                    FromTime = "",
                    ViaPort = "",
                    ViaTime = "",
                    ToPort = "",
                    ToTime = ""
                }))
                .ForMember(x => x.Passengers, x => x.MapFrom(source => source.Passengers.Select(passenger => new ManifestFinalPassengerVM {
                    Id = passenger.Id,
                    Lastname = passenger.Lastname.Trim().ToUpper(),
                    Firstname = passenger.Firstname.Trim().ToUpper(),
                    Birthdate = DateHelpers.DateToISOString(passenger.Birthdate),
                    Phones = passenger.Reservation.Phones.Trim(),
                    PassportNo = passenger.PassportNo,
                    PassportExpireDate = ReplaceYearWithSpace(DateHelpers.DateToISOString(passenger.PassportExpireDate)),
                    Remarks = passenger.Remarks.Trim(),
                    SpecialCare = passenger.SpecialCare.Trim(),
                    Gender = new SimpleEntity {
                        Id = passenger.Gender.Id,
                        Description = passenger.Gender.Description
                    },
                    Nationality = new ManifestFinalNationalityVM {
                        Id = passenger.Nationality.Id,
                        Code = passenger.Nationality.Code.ToUpper(),
                        Description = passenger.Nationality.Description
                    },
                    Occupant = new SimpleEntity {
                        Id = passenger.Occupant.Id,
                        Description = passenger.Occupant.Description
                    }
                }).OrderBy(x => x.Lastname).ThenBy(x => x.Firstname).ThenBy(x => x.Birthdate)));
        }

        private static string ReplaceYearWithSpace(string date) {
            return date[..4] == "9999" ? "" : date;
        }

    }

}