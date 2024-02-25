import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
// Custom
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { ShipCrewHttpService } from '../services/shipCrew-http.service'

@Injectable({ providedIn: 'root' })

export class ShipCrewListResolver {

    constructor(private shipCrewService: ShipCrewHttpService) { }

    resolve(): Observable<ListResolved> {
        return this.shipCrewService.getAll().pipe(
            map((shipCrewList) => new ListResolved(shipCrewList)),
            catchError((err: any) => of(new ListResolved(null, err)))
        )
    }

}
