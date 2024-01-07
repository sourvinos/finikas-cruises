import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { PriceCloneCriteria } from '../models/price-clone-criteria'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class PriceService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/prices')
    }

    clonePrices(criteria: PriceCloneCriteria): Observable<any> {
        return this.http.post<any>(this.url + '/clonePrices', criteria)
    }

    public deleteRange(ids: number[]): Observable<any> {
        return this.http.request<void>('delete', this.url + '/deleteRange', { body: ids })
    }

}
