import { ActivatedRouteSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { catchError, map, of } from 'rxjs'
// Custom
import { ShipCrewHttpService } from '../services/shipCrew-http.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'

@Injectable({ providedIn: 'root' })

export class ShipCrewFormResolver {

    constructor(private shipCrewService: ShipCrewHttpService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        return this.shipCrewService.getSingle(route.params.id).pipe(
            map((shipCrewForm) => new FormResolved(shipCrewForm)),
            catchError((err: any) => of(new FormResolved(null, err)))
        )
    }

}
