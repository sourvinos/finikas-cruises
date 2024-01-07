using API.Features.Reservations.CoachRoutes;
using API.Features.Reservations.Customers;
using API.Features.Reservations.Destinations;
using API.Features.Reservations.Drivers;
using API.Features.Reservations.Genders;
using API.Features.Reservations.Nationalities;
using API.Features.Reservations.PickupPoints;
using API.Features.Reservations.Ports;
using API.Features.Reservations.Registrars;
using API.Features.Reservations.Reservations;
using API.Features.Reservations.Schedules;
using API.Features.Reservations.ShipCrews;
using API.Features.Reservations.ShipRoutes;
using API.Features.Reservations.Ships;
using API.Infrastructure.Users;
using API.Infrastructure.Account;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace API.Infrastructure.Extensions {

    public static class ModelValidations {

        public static void AddModelValidation(IServiceCollection services) {
            // Account
            services.AddTransient<IValidator<ChangePasswordVM>, ChangePasswordValidator>();
            services.AddTransient<IValidator<ForgotPasswordRequestVM>, ForgotPasswordValidator>();
            services.AddTransient<IValidator<ResetPasswordVM>, ResetPasswordValidator>();
            // Tables
            services.AddTransient<IValidator<CoachRouteWriteDto>, CoachRouteValidator>();
            services.AddTransient<IValidator<CustomerWriteDto>, CustomerValidator>();
            services.AddTransient<IValidator<DestinationWriteDto>, DestinationValidator>();
            services.AddTransient<IValidator<DriverWriteDto>, DriverValidator>();
            services.AddTransient<IValidator<GenderWriteDto>, GenderValidator>();
            services.AddTransient<IValidator<NationalityWriteDto>, NationalityValidator>();
            services.AddTransient<IValidator<PickupPointWriteDto>, PickupPointValidator>();
            services.AddTransient<IValidator<PortWriteDto>, PortValidator>();
            services.AddTransient<IValidator<RegistrarWriteDto>, RegistrarValidator>();
            services.AddTransient<IValidator<ReservationWriteDto>, ReservationValidator>();
            services.AddTransient<IValidator<ScheduleWriteDto>, ScheduleValidator>();
            services.AddTransient<IValidator<ShipCrewWriteDto>, ShipCrewValidator>();
            services.AddTransient<IValidator<ShipRouteWriteDto>, ShipRouteValidator>();
            services.AddTransient<IValidator<ShipWriteDto>, ShipValidator>();
            // Users
            services.AddTransient<IValidator<UserNewDto>, UserNewValidator>();
            services.AddTransient<IValidator<UserUpdateDto>, UserUpdateValidator>();
        }

    }

}