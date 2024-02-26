import { HttpClient } from '@angular/common/http'
import { Injectable, NgZone } from '@angular/core'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { map } from 'rxjs/operators'
// Custom
import { ChangePasswordViewModel } from './../../features/reservations/users/classes/view-models/change-password-view-model'
import { CoachRouteService } from './../../features/reservations/coachRoutes/classes/services/coachRoute.service'
import { CodeHttpService } from 'src/app/features/billing/codes/classes/services/code-http.service'
import { CrewSpecialtyHttpService } from 'src/app/features/reservations/crewSpecialties/classes/services/crewSpecialty-http.service'
import { CryptoService } from './crypto.service'
import { CustomerHttpService } from '../../features/reservations/customers/classes/services/customer-http.service'
import { DestinationService } from './../../features/reservations/destinations/classes/services/destination.service'
import { DexieService } from './dexie.service'
import { DotNetVersion } from '../classes/dotnet-version'
import { DriverService } from './../../features/reservations/drivers/classes/services/driver.service'
import { GenderService } from './../../features/reservations/genders/classes/services/gender.service'
import { HttpDataService } from './http-data.service'
import { InteractionService } from './interaction.service'
import { NationalityService } from './../../features/reservations/nationalities/classes/services/nationality.service'
import { PaymentMethodHttpService } from 'src/app/features/billing/paymentMethods/classes/services/paymentMethod-http.service'
import { PickupPointHttpService } from '../../features/reservations/pickupPoints/classes/services/pickupPoint-http.service'
import { PortService } from './../../features/reservations/ports/classes/services/port.service'
import { ResetPasswordViewModel } from './../../features/reservations/users/classes/view-models/reset-password-view-model'
import { SessionStorageService } from './session-storage.service'
import { ShipOwnerService } from './../../features/reservations/shipOwners/classes/services/shipOwner.service'
import { ShipRouteService } from './../../features/reservations/shipRoutes/classes/services/shipRoute.service'
import { ShipService } from './../../features/reservations/ships/classes/services/ship.service'
import { TaxOfficeService } from './../../features/billing/taxOffices/classes/services/taxOffice.service'
import { VatRegimeService } from 'src/app/features/billing/vatRegimes/services/vatRegime-http.service'
import { environment } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })

export class AccountService extends HttpDataService {

    //#region variables

    private apiUrl = environment.apiUrl
    private urlForgotPassword = this.apiUrl + '/account/forgotPassword'
    private urlResetPassword = this.apiUrl + '/account/resetPassword'
    private urlToken = this.apiUrl + '/auth/auth'

    //#endregion

    constructor(private cryptoService: CryptoService, httpClient: HttpClient, private coachRouteService: CoachRouteService, private codeHttpService: CodeHttpService, private crewSpecialtyHttpService: CrewSpecialtyHttpService, private customerHttpService: CustomerHttpService, private destinationService: DestinationService, private dexieService: DexieService, private driverService: DriverService, private genderService: GenderService, private interactionService: InteractionService, private nationalityService: NationalityService, private ngZone: NgZone, private paymentMethodService: PaymentMethodHttpService, private pickupPointService: PickupPointHttpService, private portService: PortService, private router: Router, private sessionStorageService: SessionStorageService, private shipOwnerService: ShipOwnerService, private shipRouteService: ShipRouteService, private shipService: ShipService, private taxOfficeService: TaxOfficeService, private vatRegimeService: VatRegimeService) {
        super(httpClient, environment.apiUrl)
    }

    //#region public methods

    public changePassword(formData: ChangePasswordViewModel): Observable<any> {
        return this.http.post<any>(environment.apiUrl + '/account/changePassword/', formData)
    }

    public clearSessionStorage(): void {
        this.sessionStorageService.deleteItems([
            // Auth
            { 'item': 'displayName', 'when': 'always' },
            { 'item': 'expiration', 'when': 'always' },
            { 'item': 'isAdmin', 'when': 'always' },
            { 'item': 'jwt', 'when': 'always' },
            { 'item': 'now', 'when': 'always' },
            { 'item': 'refreshToken', 'when': 'always' },
            { 'item': 'returnUrl', 'when': 'always' },
            { 'item': 'userId', 'when': 'always' },
            { 'item': 'customerId', 'when': 'always' },
            // Reservations
            { 'item': 'date', 'when': 'always' },
            { 'item': 'destination', 'when': 'always' },
            { 'item': 'fromDate', 'when': 'always' },
            { 'item': 'toDate', 'when': 'always' },
            { 'item': 'dayCount', 'when': 'always' },
            // Criteria
            { 'item': 'boarding-criteria', 'when': 'production' },
            { 'item': 'ledger-criteria', 'when': 'production' },
            { 'item': 'manifest-criteria', 'when': 'production' },
            // Table filters
            { 'item': 'coachRouteList-filters', 'when': 'always' }, { 'item': 'coachRouteList-id', 'when': 'always' }, { 'item': 'coachRouteList-scrollTop', 'when': 'always' },
            { 'item': 'customerList-filters', 'when': 'always' }, { 'item': 'customerList-id', 'when': 'always' }, { 'item': 'customerList-scrollTop', 'when': 'always' },
            { 'item': 'destinationList-filters', 'when': 'always' }, { 'item': 'destinationList-id', 'when': 'always' }, { 'item': 'destinationList-scrollTop', 'when': 'always' },
            { 'item': 'driverList-filters', 'when': 'always' }, { 'item': 'driverList-id', 'when': 'always' }, { 'item': 'driverList-scrollTop', 'when': 'always' },
            { 'item': 'genderList-filters', 'when': 'always' }, { 'item': 'genderList-id', 'when': 'always' }, { 'item': 'genderList-scrollTop', 'when': 'always' },
            { 'item': 'pickupPointList-filters', 'when': 'always' }, { 'item': 'pickupPointList-id', 'when': 'always' }, { 'item': 'pickupPointList-scrollTop', 'when': 'always' },
            { 'item': 'portList-filters', 'when': 'always' }, { 'item': 'portList-id', 'when': 'always' }, { 'item': 'portList-scrollTop', 'when': 'always' },
            { 'item': 'priceList-filters', 'when': 'always' }, { 'item': 'priceList-id', 'when': 'always' }, { 'item': 'priceList-scrollTop', 'when': 'always' },
            { 'item': 'registrarList-filters', 'when': 'always' }, { 'item': 'registrarList-id', 'when': 'always' }, { 'item': 'registrarList-scrollTop', 'when': 'always' },
            { 'item': 'scheduleList-filters', 'when': 'always' }, { 'item': 'scheduleList-id', 'when': 'always' }, { 'item': 'scheduleList-scrollTop', 'when': 'always' },
            { 'item': 'shipCrewList-filters', 'when': 'always' }, { 'item': 'shipCrewList-id', 'when': 'always' }, { 'item': 'shipCrewList-scrollTop', 'when': 'always' },
            { 'item': 'shipList-filters', 'when': 'always' }, { 'item': 'shipList-id', 'when': 'always' }, { 'item': 'shipList-scrollTop', 'when': 'always' },
            { 'item': 'shipOwnerList-filters', 'when': 'always' }, { 'item': 'shipOwnerList-id', 'when': 'always' }, { 'item': 'shipOwnerList-scrollTop', 'when': 'always' },
            { 'item': 'shipRouteList-filters', 'when': 'always' }, { 'item': 'shipRouteList-id', 'when': 'always' }, { 'item': 'shipRouteList-scrollTop', 'when': 'always' },
            { 'item': 'userList-filters', 'when': 'always' }, { 'item': 'userList-id', 'when': 'always' }, { 'item': 'userList-scrollTop', 'when': 'always' },
            // Tasks filters
            { 'item': 'reservationList-filters', 'when': 'always' }, { 'item': 'reservationList-id', 'when': 'always' }, { 'item': 'reservationList-scrollTop', 'when': 'always' },
            { 'item': 'boardingList-filters', 'when': 'always' }, { 'item': 'boardingList-id', 'when': 'always' }, { 'item': 'boardingList-scrollTop', 'when': 'always' },
            { 'item': 'ledgerList-filters', 'when': 'always' }, { 'item': 'ledgerList-id', 'when': 'always' }, { 'item': 'ledgerList-scrollTop', 'when': 'always' },
            // Statistics
            { 'item': 'selectedYear', 'when': 'always' },
        ])
    }

    public forgotPassword(formData: any): Observable<any> {
        return this.http.post<any>(this.urlForgotPassword, formData)
    }

    public getNewRefreshToken(): Observable<any> {
        const userId = this.cryptoService.decrypt(this.sessionStorageService.getItem('userId'))
        const refreshToken = sessionStorage.getItem('refreshToken')
        const grantType = 'refresh_token'
        return this.http.post<any>(this.urlToken, { userId, refreshToken, grantType }).pipe(
            map(response => {
                if (response.token) {
                    this.setAuthSettings(response)
                }
                return <any>response
            })
        )
    }

    public login(userName: string, password: string): Observable<void> {
        const grantType = 'password'
        const language = localStorage.getItem('language') || 'en-GB'
        return this.http.post<any>(this.urlToken, { language, userName, password, grantType }).pipe(map(response => {
            this.setUserData(response)
            this.setDotNetVersion(response)
            this.setAuthSettings(response)
            this.populateDexieFromAPI()
            this.setSelectedYear()
            this.refreshMenus()
        }))
    }

    public logout(): void {
        this.clearSessionStorage()
        this.refreshMenus()
        this.navigateToLogin()
    }

    public resetPassword(vm: ResetPasswordViewModel): Observable<any> {
        return this.http.post<any>(this.urlResetPassword, vm)
    }

    //#endregion

    //#region private methods

    private navigateToLogin(): void {
        this.ngZone.run(() => {
            this.router.navigate(['/'])
        })
    }

    private refreshMenus(): void {
        this.interactionService.updateMenus()
    }

    private setAuthSettings(response: any): void {
        sessionStorage.setItem('expiration', response.expiration)
        sessionStorage.setItem('jwt', response.token)
        sessionStorage.setItem('refreshToken', response.refreshToken)
    }

    private populateDexieFromAPI(): void {
        this.dexieService.populateTable('coachRoutes', this.coachRouteService)
        this.dexieService.populateTable('codes', this.codeHttpService)
        this.dexieService.populateTable('crewSpecialties', this.crewSpecialtyHttpService)
        this.dexieService.populateTable('crewSpecialties', this.paymentMethodService)
        this.dexieService.populateTable('customers', this.customerHttpService)
        this.dexieService.populateCriteria('customersCriteria', this.customerHttpService)
        this.dexieService.populateTable('destinations', this.destinationService)
        this.dexieService.populateTable('drivers', this.driverService)
        this.dexieService.populateTable('genders', this.genderService)
        this.dexieService.populateTable('nationalities', this.nationalityService)
        this.dexieService.populateTable('paymentMethods', this.paymentMethodService)
        this.dexieService.populateTable('pickupPoints', this.pickupPointService)
        this.dexieService.populateTable('ports', this.portService)
        this.dexieService.populateTable('shipOwners', this.shipOwnerService)
        this.dexieService.populateTable('shipRoutes', this.shipRouteService)
        this.dexieService.populateTable('ships', this.shipService)
        this.dexieService.populateTable('taxOffices', this.taxOfficeService)
        this.dexieService.populateTable('vatRegimes', this.vatRegimeService)
    }

    private setDotNetVersion(response: any): void {
        DotNetVersion.version = response.dotNetVersion
    }

    private setSelectedYear(): void {
        this.sessionStorageService.saveItem('selectedYear', new Date().getFullYear().toString())
    }

    private setUserData(response: any): void {
        this.sessionStorageService.saveItem('userId', this.cryptoService.encrypt(response.userId))
        this.sessionStorageService.saveItem('displayName', this.cryptoService.encrypt(response.displayname))
        this.sessionStorageService.saveItem('isAdmin', this.cryptoService.encrypt(response.isAdmin))
        this.sessionStorageService.saveItem('customerId', this.cryptoService.encrypt(response.customerId != undefined ? response.customerId : 'null'))
        this.sessionStorageService.saveItem('isFirstFieldFocused', response.isFirstFieldFocused)
    }

    //#endregion

    //#region  getters

    get isLoggedIn(): boolean {
        if (this.sessionStorageService.getItem('userId')) {
            return true
        }
        return false
    }

    //#endregion

}
