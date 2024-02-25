using API.Infrastructure.Helpers;
using FluentValidation;

namespace API.Features.Reservations.ShipCrews {

    public class ShipCrewValidator : AbstractValidator<ShipCrewWriteDto> {

        public ShipCrewValidator() {
            // FKs
            RuleFor(x => x.GenderId).NotEmpty();
            RuleFor(x => x.NationalityId).NotEmpty();
            RuleFor(x => x.ShipId).NotEmpty();
            RuleFor(x => x.SpecialtyId).NotEmpty();
            RuleFor(x => x.Lastname).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Firstname).NotEmpty().MaximumLength(128);
            RuleFor(x => x.Birthdate).Must(DateHelpers.BeCorrectFormat);
            RuleFor(x => x.PassportNo).NotNull().MaximumLength(32);
            RuleFor(x => x.PassportExpiryDate).Must(DateHelpers.BeCorrectFormat);
        }

    }

}