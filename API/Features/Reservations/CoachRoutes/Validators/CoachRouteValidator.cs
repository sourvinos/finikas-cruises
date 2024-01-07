using FluentValidation;

namespace API.Features.Reservations.CoachRoutes {

    public class CoachRouteValidator : AbstractValidator<CoachRouteWriteDto> {

        public CoachRouteValidator() {
            RuleFor(x => x.Abbreviation).NotEmpty().MaximumLength(10);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(128);
        }

    }

}