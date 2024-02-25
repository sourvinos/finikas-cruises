﻿using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.ShipCrews {

    [Route("api/[controller]")]
    public class ShipCrewsController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IShipCrewRepository shipCrewRepo;
        private readonly IShipCrewValidation shipCrewValidation;

        #endregion

        public ShipCrewsController(IMapper mapper, IShipCrewRepository shipCrewRepo, IShipCrewValidation shipCrewValidation) {
            this.mapper = mapper;
            this.shipCrewRepo = shipCrewRepo;
            this.shipCrewValidation = shipCrewValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ShipCrewListVM>> GetAsync() {
            return await shipCrewRepo.GetAsync();
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ShipCrewAutoCompleteVM>> GetForBrowserStorageAsync() {
            return await shipCrewRepo.GetForBrowserStorageAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await shipCrewRepo.GetByIdAsync(id, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<ShipCrew, ShipCrewReadDto>(x)
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public Response Post([FromBody] ShipCrewWriteDto shipCrew) {
            var x = shipCrewValidation.IsValid(null, shipCrew);
            if (x == 200) {
                var z = shipCrewRepo.Create(mapper.Map<ShipCrewWriteDto, ShipCrew>((ShipCrewWriteDto)shipCrewRepo.AttachMetadataToPostDto(shipCrew)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = z.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = x
                };
            }
        }

        [HttpPut]
        [Authorize(Roles = "admin")]
        [ServiceFilter(typeof(ModelValidationAttribute))]
        public async Task<Response> Put([FromBody] ShipCrewWriteDto shipCrew) {
            var x = await shipCrewRepo.GetByIdAsync(shipCrew.Id, false);
            if (x != null) {
                var z = shipCrewValidation.IsValid(x, shipCrew);
                if (z == 200) {
                    shipCrewRepo.Update(mapper.Map<ShipCrewWriteDto, ShipCrew>((ShipCrewWriteDto)shipCrewRepo.AttachMetadataToPutDto(x, shipCrew)));
                    return new Response {
                        Code = 200,
                        Icon = Icons.Success.ToString(),
                        Id = x.Id.ToString(),
                        Message = ApiMessages.OK()
                    };
                } else {
                    throw new CustomException() {
                        ResponseCode = z
                    };
                }
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<Response> Delete([FromRoute] int id) {
            var x = await shipCrewRepo.GetByIdAsync(id, false);
            if (x != null) {
                shipCrewRepo.Delete(x);
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = x.Id.ToString(),
                    Message = ApiMessages.OK()
                };
            } else {
                throw new CustomException() {
                    ResponseCode = 404
                };
            }
        }

    }

}