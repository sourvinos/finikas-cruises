﻿using System.Collections.Generic;
using System.Threading.Tasks;
using API.Infrastructure.Extensions;
using API.Infrastructure.Helpers;
using API.Infrastructure.Responses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Features.Reservations.Schedules {

    [Route("api/[controller]")]
    public class SchedulesController : ControllerBase {

        #region variables

        private readonly IMapper mapper;
        private readonly IScheduleRepository scheduleRepo;
        private readonly IScheduleValidation scheduleValidation;

        #endregion

        public SchedulesController(IMapper mapper, IScheduleRepository scheduleRepo, IScheduleValidation scheduleValidation) {
            this.mapper = mapper;
            this.scheduleRepo = scheduleRepo;
            this.scheduleValidation = scheduleValidation;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IEnumerable<ScheduleListVM>> GetAsync() {
            return await scheduleRepo.GetAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ResponseWithBody> GetByIdAsync(int id) {
            var x = await scheduleRepo.GetByIdAsync(id, true);
            if (x != null) {
                return new ResponseWithBody {
                    Code = 200,
                    Icon = Icons.Info.ToString(),
                    Message = ApiMessages.OK(),
                    Body = mapper.Map<Schedule, ScheduleReadDto>(x)
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
        public Response Post([FromBody] List<ScheduleWriteDto> schedules) {
            var x = scheduleValidation.IsValidOnNew(schedules);
            if (x == 200) {
                scheduleRepo.CreateList(mapper.Map<List<ScheduleWriteDto>, List<Schedule>>(scheduleRepo.AttachMetadataToPostDto(schedules)));
                return new Response {
                    Code = 200,
                    Icon = Icons.Success.ToString(),
                    Id = null,
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
        public async Task<Response> Put([FromBody] ScheduleWriteDto schedule) {
            var x = await scheduleRepo.GetByIdAsync(schedule.Id, false);
            if (x != null) {
                var z = scheduleValidation.IsValidOnUpdate(x, schedule);
                if (z == 200) {
                    scheduleRepo.Update(mapper.Map<ScheduleWriteDto, Schedule>((ScheduleWriteDto)scheduleRepo.AttachMetadataToPutDto(x, schedule)));
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
            var x = await scheduleRepo.GetByIdAsync(id, false);
            if (x != null) {
                scheduleRepo.Delete(x);
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