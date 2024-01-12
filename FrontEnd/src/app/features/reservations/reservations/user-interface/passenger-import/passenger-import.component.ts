import { Component, NgZone } from '@angular/core'
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
// Custom
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PassengerClipboard } from '../../classes/view-models/passenger/passenger-clipboard-vm'
import { DexieService } from 'src/app/shared/services/dexie.service'

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

    constructor(private dexieService: DexieService, private dialogRef: MatDialogRef<PassengerImportComponent>, private formBuilder: FormBuilder, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private ngZone: NgZone) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        console.clear()
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

    public onProcess(): void {
        this.splitRemarks()
        if (this.validateRemarks() == this.records.length) {
            alert('OK')
            console.log('OK')
        } else {
            alert('Errors')
            console.log('Errors')
        }
        // console.log(this.records)
        // this.closeDialog()
    }

    //#endregion

    //#region private methods

    private closeDialog(): void {
        this.ngZone.run(() => {
            // this.dialogRef.close(this.flattenForm())
        })
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            remarks: ['', Validators.maxLength(32768)]
        })
    }

    private splitRemarks(): void {
        this.records = []
        this.lines = this.form.value.remarks.split('\n')
        this.lines.forEach(line => {
            const x = line.split('\t')
            const record: PassengerClipboard = {
                id: parseInt(x[0]),
                lastname: x[1],
                firstname: x[2],
                birthdate: x[3],
                genderCode: x[4],
                nationalityCode: x[5],
                passportNo: x[6],
                passportExpireDate: x[7],
                remarks: x[8],
                specialCare: x[9]
            }
            this.records.push(record)
        })
    }

    // for await (const i of images) {
        // let img = await uploadDoc(i);
    // };

    // let x = 10; //this executes after
    private validateRemarks(): number {
        let x = 0
        this.records.forEach(record => {
            if (this.validateNumber(record, 'id')
                && this.validateString(record, 'lastname')
                && this.validateString(record, 'firstname')
                && this.validateObject(record, 'genders', 'genderCode', 'description')
                && this.validateObject(record, 'nationalities', 'nationalityCode', 'code')) {
                x++
            }
        })
        return x
    }

    private validateNumber(record: PassengerClipboard, field: string): boolean {
        return !isNaN(record[field])
    }

    private validateString(record: PassengerClipboard, field: string): boolean {
        return record[field].length >= 0 && record[field].length <= 128
    }

    private validateObject(record: PassengerClipboard, table: string, field: string, databaseField: string): any {
        this.dexieService.table(table).where({ [databaseField]: (record[field]) }).first().then((x) => {
            return x
        })

    }

    //#endregion

    //#region getters

    get textarea(): AbstractControl {
        return this.form.get('textarea')
    }

    //#endregion

}
