import { Guid } from 'guid-typescript'
// Custom
import { DestinationAutoCompleteVM } from 'src/app/features/reservations/destinations/classes/view-models/destination-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'
import { PassengerReadDto } from './passenger-read-dto'
import { PickupPointAutoCompleteVM } from '../../../../pickupPoints/classes/view-models/pickupPoint-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ReservationReadDto extends Metadata {

    // PK
    reservationId: Guid
    // Object fields
    customer: SimpleEntity
    destination: DestinationAutoCompleteVM
    driver: SimpleEntity
    pickupPoint: PickupPointAutoCompleteVM
    port: SimpleEntity
    ship: SimpleEntity
    // Fields
    date: string
    refNo: string
    email: string
    phones: string
    remarks: string
    adults: number
    kids: number
    free: number
    totalPax: number
    ticketNo: string
    passengers: PassengerReadDto

}

