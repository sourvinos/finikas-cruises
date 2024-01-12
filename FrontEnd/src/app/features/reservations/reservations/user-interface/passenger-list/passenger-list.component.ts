import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Guid } from 'guid-typescript'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PassengerFormComponent } from '../passenger-form/passenger-form.component'
import { PassengerReadDto } from '../../classes/dtos/form/passenger-read-dto'
import { environment } from 'src/environments/environment'
import { PassengerImportComponent } from '../passenger-import/passenger-import.component'

@Component({
    selector: 'passenger-list',
    templateUrl: './passenger-list.component.html',
    styleUrls: ['../../../../../../assets/styles/custom/forms.css', './passenger-list.component.css']
})

export class PassengerListComponent {

    //#region variables

    @ViewChild('table') table: Table | undefined

    @Input() passengers: PassengerReadDto[] = []
    @Input() reservationId: Guid
    @Input() totalPax: number
    @Output() outputPassengerCount = new EventEmitter()
    @Output() outputPassengers = new EventEmitter()
    public feature = 'passengerList'

    //#endregion

    constructor(private dialog: MatDialog, private emojiService: EmojiService, private helperService: HelperService, private messageLabelService: MessageLabelService) { }

    //#region public methods

    public checkTotalPaxAgainstPassengerCount(): boolean {
        if (this.passengers != null) {
            return this.passengers.length >= this.totalPax ? true : false
        }
    }

    public onEditRecord(record: any): void {
        this.showPassengerForm(record)
    }

    public getBoardingStatusIcon(status: boolean): string {
        return status ? this.getEmoji('green-box') : this.getEmoji('red-box')
    }

    public getEmoji(emoji: string): string {
        return this.emojiService.getEmoji(emoji)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getNationalityIcon(nationalityCode: string): any {
        if (nationalityCode != undefined) {
            return environment.nationalitiesIconDirectory + nationalityCode.toLowerCase() + '.png'
        }
    }

    public onDeleteRow(record: PassengerReadDto): void {
        const index = this.passengers.indexOf(record)
        this.passengers.splice(index, 1)
        this.outputPassengerCount.emit(this.passengers.length)
        this.outputPassengers.emit(this.passengers)
    }

    public onHighlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public onNewRow(): void {
        this.showPassengerForm()
    }

    public onShowImportDialog(): void {
        const dialog = this.dialog.open(PassengerImportComponent, {
            data: {
                reservationId: this.reservationId
            }
        })
        dialog.afterClosed().subscribe(() => {
            // Run checks
        })
    }

    //#endregion

    //#region private methods

    private sendPassengerToForm(passenger: PassengerReadDto): void {
        const dialog = this.dialog.open(PassengerFormComponent, {
            disableClose: true,
            data: {
                id: passenger.id,
                reservationId: passenger.reservationId,
                gender: { 'id': passenger.gender.id, 'description': passenger.gender.description },
                nationality: { 'id': passenger.nationality.id, 'code': passenger.nationality.code, 'description': passenger.nationality.description },
                lastname: passenger.lastname,
                firstname: passenger.firstname,
                birthdate: passenger.birthdate,
                passportNo: passenger.passportNo,
                passportExpireDate: passenger.passportExpireDate,
                remarks: passenger.remarks,
                specialCare: passenger.specialCare,
                isBoarded: passenger.isBoarded,
            }
        })
        dialog.afterClosed().subscribe((result: any) => {
            if (result) {
                passenger = this.passengers.find(({ id }) => id === result.id)
                passenger.lastname = result.lastname
                passenger.firstname = result.firstname
                passenger.nationality = result.nationality
                passenger.birthdate = result.birthdate
                passenger.gender = result.gender
                passenger.passportNo = result.passportNo
                passenger.passportExpireDate = result.passportExpireDate
                passenger.specialCare = result.specialCare
                passenger.remarks = result.remarks
                passenger.isBoarded = result.isBoarded
            }
        })

    }

    private showEmptyForm(): void {
        const dialog = this.dialog.open(PassengerFormComponent, {
            data: {
                id: 0,
                reservationId: this.reservationId,
                lastname: '',
                firstname: '',
                nationality: { 'id': 1, 'description': '' },
                gender: { 'id': 1, 'description': '' },
                birthdate: '',
                passportNo: '',
                passportExpireDate: '',
                specialCare: '',
                remarks: '',
                isBoarded: false
            }
        })
        dialog.afterClosed().subscribe((newPassenger: any) => {
            if (newPassenger) {
                this.passengers.push(newPassenger)
                this.outputPassengerCount.emit(this.passengers.length)
                this.outputPassengers.emit(this.passengers)
            }
        })
    }

    private showPassengerForm(passenger?: any): void {
        if (passenger == undefined) {
            this.showEmptyForm()
        }
        if (passenger != undefined) {
            this.sendPassengerToForm(passenger)
        }
    }

    //#endregion

}
