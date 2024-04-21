import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
// Custom
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'
import { StatisticsCriteriaVM } from '../view-models/criteria/statistics-criteria-vm'

@Injectable({ providedIn: 'root' })

export class StatisticsService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/statistics')
    }

    public getStatistics(table: string, criteria: StatisticsCriteriaVM): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/statistics/' + table, criteria)
    }

}
