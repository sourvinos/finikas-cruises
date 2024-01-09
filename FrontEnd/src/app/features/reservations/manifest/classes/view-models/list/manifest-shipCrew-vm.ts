import { ManifestNationalityVM } from './manifest-nationality-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface ManifestShipCrewVM {

    id: number
    lastname: string
    firstname: string
    birthdate: string
    phones: string
    gender: SimpleEntity,
    nationality: ManifestNationalityVM,
    occupant: SimpleEntity
    passportNo: string
    passportExpireDate: string
    remarks: string
    specialCare: string

}
