import { Injectable } from '@angular/core'
import Dexie from 'dexie'

@Injectable({ providedIn: 'root' })

export class DexieService extends Dexie {

    constructor() {
        super('FinikasCruises')
        this.version(1).stores({
            coachRoutes: 'id, abbreviation, isActive',
            customers: 'id, description, isActive',
            customersCriteria: 'id, description',
            codes: 'id, description, isActive',
            destinations: 'id, description, isPassportRequired, isActive',
            destinationsCriteria: 'id, description',
            drivers: 'id, description, isActive',
            genders: 'id, description, isActive',
            nationalities: 'id, code, description, isActive',
            paymentMethods: 'id, description, isActive',
            pickupPoints: 'id, description, isActive',
            ports: 'id, abbreviation, description, isActive',
            portsCriteria: 'id, description',
            shipOwners: 'id, description, isActive',
            shipRoutes: 'id, description, isActive',
            ships: 'id, description, isActive',
            shipsCriteria: 'id, description',
            crewSpecialties: 'id, description, isActive',
            taxOffices: 'id, description, isActive',
            vatRegimes: 'id, description, isActive'
        })
        this.open()
    }

    public populateTable(table: string, httpService: any): void {
        httpService.getAutoComplete().subscribe((records: any) => {
            this.table(table)
                .bulkAdd(records)
                .catch(Dexie.BulkError, () => { })
        })
    }

    public populateCriteria(table: string, httpService: any): void {
        httpService.getForCriteria().subscribe((records: any) => {
            this.table(table)
                .bulkAdd(records)
                .catch(Dexie.BulkError, () => { })
        })
    }

    public getById(table: string, id: number): Promise<any> {
        return new Promise((resolve) => {
            this.table(table).where({ id: id }).first().then(response => {
                resolve(response)
            })
        })
    }

    public update(table: string, item: any): void {
        this.table(table).put(item)
    }

    public remove(table: string, id: any): void {
        this.table(table).delete(id)
    }

}

export const db = new DexieService()
