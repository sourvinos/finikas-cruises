import { PickupPointListCoachRouteVM } from './pickupPoint-list-coachRoute-vm'
import { PickupPointListDestinationVM } from './pickupPoint-list-destination-vm'
import { PickupPointListPortVM } from './pickupPoint-list-port-vm'

export interface PickupPointListVM {

    id: number
    description: string
    coachRoute: PickupPointListCoachRouteVM
    destination: PickupPointListDestinationVM
    port: PickupPointListPortVM
    exactPoint: string
    time: string
    remarks: string
    putAt: string
    isActive: boolean

}
