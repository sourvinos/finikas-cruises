import { CoachRouteAutoCompleteVM } from '../../../coachRoutes/classes/view-models/coachRoute-autocomplete-vm'
import { Metadata } from 'src/app/shared/classes/metadata'
import { PortAutoCompleteVM } from '../../../ports/classes/view-models/port-autocomplete-vm'
import { SimpleEntity } from 'src/app/shared/classes/simple-entity'

export interface PickupPointReadDto extends Metadata {

    // PK
    id: number
    // Object fields
    coachRoute: CoachRouteAutoCompleteVM
    destination: SimpleEntity
    port: PortAutoCompleteVM
    // Fields
    description: string
    exactPoint: string
    time: string
    remarks: string
    isActive: boolean

}
