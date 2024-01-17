import { Component, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PassengerClipboard } from '../../classes/view-models/passenger/passenger-clipboard-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DateHelperService } from 'src/app/shared/services/date-helper.service'

@Component({
    selector: 'passenger-import',
    templateUrl: './passenger-import.component.html',
    styleUrls: ['./passenger-import.component.css']
})

export class PassengerImportComponent {

    //#region variables

    private records: PassengerClipboard[]
    public feature = 'passengerImport'
    public featureIcon = 'passenger'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = null
    public lines: string[]

    //#endregion

    constructor(private dateHelperService: DateHelperService, private dexieService: DexieService, private dialogRef: MatDialogRef<PassengerImportComponent>, private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private ngZone: NgZone) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getRemarksLength(): any {
        return this.form.value.remarks != null ? this.form.value.remarks.length : 0
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    public onDoValidationTasks(): void {
        this.createPassengerClipboardObjects()
        this.validatePassengerClipboardObjects()
    }

    public onContinue(): void {
        this.closeDialog()
    }

    //#endregion

    //#region private methods

    private closeDialog(): void {
        this.ngZone.run(() => {
            this.dialogRef.close(this.records)
        })
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            remarks: ['', Validators.maxLength(32768)]
        })
    }

    private createPassengerClipboardObjects(): void {
        this.records = []
        this.lines = this.form.value.remarks.split('\n')
        this.lines.forEach(line => {
            const x = line.split('\t')
            if (line != '') {
                const record: PassengerClipboard = {
                    id: Math.round(Math.random() * new Date().getMilliseconds()),
                    lastname: x[1],
                    firstname: x[2],
                    birthdate: x[3],
                    gender: {
                        id: parseInt(x[4]),
                        description: x[5],
                        isActive: true
                    },
                    nationality: {
                        id: parseInt(x[6]),
                        code: x[7],
                        description: x[8],
                        isActive: true
                    },
                    passportNo: x[9],
                    passportExpireDate: x[10],
                    remarks: x[11],
                    specialCare: x[12],
                    isValid: true
                }
                this.records.push(record)
            }
        })
    }

    private validatePassengerClipboardObjects(): any {
        this.records.forEach(record => {
            this.validateNumber(record, 'id')
            this.validateString(record, 'lastname', 1, 128)
            this.validateString(record, 'firstname', 1, 128)
            this.validateObjectById(record, 'gender')
            this.validateObjectById(record, 'nationality')
            this.validateDate(record, 'birthdate')
        })
    }

    private validateNumber(record: PassengerClipboard, field: string): void {
        record.isValid = record.isValid ? (!isNaN(record[field]) ? true : false) : record.isValid
    }

    private validateString(record: PassengerClipboard, field: string, minLength: number, maxLength: number): void {
        record.isValid = record.isValid ? (record[field].length >= minLength && record[field].length <= maxLength ? true : false) : record.isValid
    }

    private validateObjectById(record: PassengerClipboard, field: string): any {
        record.isValid = record.isValid ? (!isNaN(record[field].id) ? true : false) : record.isValid
    }

    private validateDate(record: PassengerClipboard, field: string): void {
        if (record.isValid) {
            const x = this.dateHelperService.addLeadingZerosToDateParts(record.birthdate, true)
            const z = this.dateHelperService.createISODateFromString(x)
            const i = this.dateHelperService.formatDateToIso(z)
            record[field] = i
            record.isValid = true
        }
    }

    //#endregion

    //#region getters

    get textarea(): AbstractControl {
        return this.form.get('textarea')
    }

    //#endregion

}
