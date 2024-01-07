import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'
// Common
import { HttpDataService } from 'src/app/shared/services/http-data.service'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })

export class RegistrarService extends HttpDataService {

    constructor(httpClient: HttpClient) {
        super(httpClient, environment.apiUrl + '/registrars')
    }

    public async validateRegistrarsForManifest(shipId: number): Promise<any> {
        return firstValueFrom(this.http.get<any>(this.url + '/validateForManifest/' + shipId))
    }

}
