import { SimpleEntity } from './../../../../../shared/classes/simple-entity'
export interface ShipCrewListVM {

    id: number
    ship: SimpleEntity
    specialty: SimpleEntity
    lastname: string
    firstname: string
    birthdate: string
    formattedBirthdate: string
    isActive: boolean

}
