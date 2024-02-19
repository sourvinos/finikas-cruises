import { SimpleEntity } from 'src/app/shared/classes/simple-entity'
import { ManifestNationalityVM } from './manifest-nationality-vm'

export interface ManifestPassengerVM {

    id: number
    lastname: string
    firstname: string
    birthdate: string
    phones: string
    gender: SimpleEntity,
    nationality: ManifestNationalityVM,
    occupant: SimpleEntity,
    passportNo: string
    passportExpiryDate: string
    remarks: string
    specialCare: string

}
