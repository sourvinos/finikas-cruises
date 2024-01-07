using System;
using System.Threading.Tasks;
using API.Infrastructure.Users;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Serilog;

namespace API.Infrastructure.Middleware {

    public class ResponseMiddleware : IMiddleware {

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UserManager<UserExtended> userManager;

        public ResponseMiddleware(IHttpContextAccessor httpContextAccessor, UserManager<UserExtended> userManager) {
            this.httpContextAccessor = httpContextAccessor;
            this.userManager = userManager;
        }

        public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next) {
            try {
                await next(httpContext);
            }
            catch (CustomException exception) {
                await CreateCustomErrorResponse(httpContext, exception);
            }
            catch (DbUpdateConcurrencyException exception) {
                await CreateConcurrencyErrorResponse(httpContext, exception);
            }
            catch (Exception exception) {
                LogError(exception, httpContextAccessor, userManager);
                await CreateServerErrorResponse(httpContext, exception);
            }
        }

        private static Task CreateCustomErrorResponse(HttpContext httpContext, CustomException e) {
            httpContext.Response.StatusCode = e.ResponseCode;
            httpContext.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response {
                Code = e.ResponseCode,
                Icon = Icons.Error.ToString(),
                Id = null,
                Message = GetErrorMessage(e.ResponseCode)
            });
            return httpContext.Response.WriteAsync(result);
        }

        private static Task CreateConcurrencyErrorResponse(HttpContext httpContext, DbUpdateConcurrencyException exception) {
            httpContext.Response.StatusCode = 415;
            httpContext.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response {
                Code = 415,
                Icon = Icons.Error.ToString(),
                Id = null,
                Message = GetErrorMessage(httpContext.Response.StatusCode)
            });
            return httpContext.Response.WriteAsync(result);
        }

        private static Task CreateServerErrorResponse(HttpContext httpContext, Exception e) {
            httpContext.Response.StatusCode = 500;
            httpContext.Response.ContentType = "application/json";
            var result = JsonConvert.SerializeObject(new Response {
                Code = 500,
                Icon = Icons.Error.ToString(),
                Id = null,
                Message = e.Message
            });
            return httpContext.Response.WriteAsync(result);
        }

        private static string GetErrorMessage(int httpResponseCode) {
            return httpResponseCode switch {
                401 => ApiMessages.AuthenticationFailed(),
                404 => ApiMessages.RecordNotFound(),
                408 => ApiMessages.InvalidCoachRoute(),
                409 => ApiMessages.DuplicateRecord(),
                410 => ApiMessages.InvalidDateDestinationOrPickupPoint(),
                411 => ApiMessages.InvalidPort(),
                412 => ApiMessages.InvalidAccountFields(),
                413 => ApiMessages.CustomerIdDoesNotMatchConnectedSimpleUserCustomerId(),
                414 => ApiMessages.DuplicateRefNo(),
                415 => ApiMessages.ConcurrencyError(),
                416 => ApiMessages.NewAdminShouldNotHaveCustomerId(),
                417 => ApiMessages.NewSimpleUserShouldHaveCustomerId(),
                418 => ApiMessages.NewSimpleUserShouldHaveCustomerId(),
                419 => ApiMessages.PriceCloningNotCompleted(),
                431 => ApiMessages.SimpleUserCanNotAddReservationAfterDepartureTime(),
                433 => ApiMessages.PortHasNoFreeSeats(),
                449 => ApiMessages.InvalidShipOwner(),
                450 => ApiMessages.InvalidCustomer(),
                451 => ApiMessages.InvalidDestination(),
                452 => ApiMessages.InvalidPickupPoint(),
                460 => ApiMessages.InvalidPort(),
                461 => ApiMessages.PriceFieldsMustBeZeroOrGreater(),
                462 => ApiMessages.InvalidDatePeriod(),
                453 => ApiMessages.InvalidDriver(),
                454 => ApiMessages.InvalidShip(),
                455 => ApiMessages.InvalidPassengerCount(),
                456 => ApiMessages.InvalidNationality(),
                457 => ApiMessages.InvalidGender(),
                458 => ApiMessages.InvalidTaxOffice(),
                463 => ApiMessages.InvalidVatRegime(),
                459 => ApiMessages.SimpleUserNightRestrictions(),
                490 => ApiMessages.NotOwnRecord(),
                491 => ApiMessages.RecordInUse(),
                493 => ApiMessages.InvalidPortOrder(),
                492 => ApiMessages.NotUniqueUsernameOrEmail(),
                498 => ApiMessages.EmailNotSent(),
                _ => ApiMessages.UnknownError(),
            };
        }

        private static void LogError(Exception exception, IHttpContextAccessor httpContextAccessor, UserManager<UserExtended> userManager) {
            Log.Error("USER {userId} | MESSAGE {message}", Identity.GetConnectedUserDetails(userManager, Identity.GetConnectedUserId(httpContextAccessor)).UserName, exception.Message);
        }

    }

}