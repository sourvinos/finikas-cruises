import { NationalityDropdownVM } from 'src/app/features/reservations/nationalities/classes/view-models/nationality-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface PassengerClipboard {

    id: number
    rowId: string
    lastname: string
    firstname: string
    birthdate: string
    gender: SimpleEntity
    nationality: NationalityDropdownVM
    passportNo: string
    passportExpireDate: string
    remarks: string
    specialCare: string
    isValid: boolean

}
