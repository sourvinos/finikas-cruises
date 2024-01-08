import { Guid } from 'guid-typescript'

export interface PassengerWriteDto {

    reservationId: Guid
    genderId: number
    nationalityId: number
    occupantId: number
    lastname: string
    firstname: string
    birthdate: string
    passportNo: string
    passportExpireDate: string
    remarks: string
    specialCare: string
    isBoarded: boolean

}
