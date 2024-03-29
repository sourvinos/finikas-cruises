import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { PickupPointHttpService } from '../services/pickupPoint-http.service'

@Injectable({ providedIn: 'root' })

export class PickupPointFormResolver {

    constructor(private pickupPointService: PickupPointHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.pickupPointService.getSingle(route.params.id).pipe(
            map((pickupPointForm) => new FormResolved(pickupPointForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
