import { ActivatedRoute, Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
// Custom
import { DexieService } from 'src/app/shared/services/dexie.service'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { FormResolved } from 'src/app/shared/classes/form-resolved'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InputTabStopDirective } from 'src/app/shared/directives/input-tabstop.directive'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageInputHintService } from 'src/app/shared/services/message-input-hint.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { ShipRouteReadDto } from '../classes/dtos/shipRoute-read-dto'
import { ShipRouteService } from '../classes/services/shipRoute.service'
import { ShipRouteWriteDto } from '../classes/dtos/shipRoute-write-dto'
import { ValidationService } from 'src/app/shared/services/validation.service'

@Component({
    selector: 'ship-route-form',
    templateUrl: './shipRoute-form.component.html',
    styleUrls: ['../../../../../assets/styles/custom/forms.css']
})

export class ShipRouteFormComponent {

    //#region common #8

    private record: ShipRouteReadDto
    private recordId: number
    public feature = 'shipRouteForm'
    public featureIcon = 'shipRoutes'
    public form: FormGroup
    public icon = 'arrow_back'
    public input: InputTabStopDirective
    public parentUrl = '/shipRoutes'

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dexieService: DexieService, private dialogService: DialogService, private formBuilder: FormBuilder, private helperService: HelperService, private messageDialogService: MessageDialogService, private messageHintService: MessageInputHintService, private messageLabelService: MessageLabelService, private router: Router, private shipRouteService: ShipRouteService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.initForm()
        this.setRecordId()
        this.getRecord()
        this.populateFields()
    }

    ngAfterViewInit(): void {
        this.focusOnField()
    }

    //#endregion

    //#region public methods

    public getHint(id: string, minmax = 0): string {
        return this.messageHintService.getDescription(id, minmax)
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onDelete(): void {
        this.dialogService.open(this.messageDialogService.confirmDelete(), 'question', ['abort', 'ok']).subscribe(response => {
            if (response) {
                this.shipRouteService.delete(this.form.value.id).subscribe({
                    complete: () => {
                        this.dexieService.remove('shipRoutes', this.form.value.id)
                        this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
                    },
                    error: (errorFromInterceptor) => {
                        this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                    }
                })
            }
        })
    }

    public onSave(): void {
        this.saveRecord(this.flattenForm())
    }

    //#endregion

    //#region private methods

    private flattenForm(): ShipRouteWriteDto {
        return {
            id: this.form.value.id,
            description: this.form.value.description,
            fromPort: this.form.value.fromPort,
            fromTime: this.form.value.fromTime,
            viaPort: this.form.value.viaPort,
            viaTime: this.form.value.viaTime,
            toPort: this.form.value.toPort,
            toTime: this.form.value.toTime,
            isActive: this.form.value.isActive,
            putAt: this.form.value.putAt
        }
    }

    private focusOnField(): void {
        this.helperService.focusOnField()
    }

    private getRecord(): Promise<any> {
        if (this.recordId != undefined) {
            return new Promise((resolve) => {
                const formResolved: FormResolved = this.activatedRoute.snapshot.data['shipRouteForm']
                if (formResolved.error == null) {
                    this.record = formResolved.record.body
                    resolve(this.record)
                } else {
                    this.dialogService.open(this.messageDialogService.filterResponse(formResolved.error), 'error', ['ok']).subscribe(() => {
                        this.resetForm()
                        this.goBack()
                    })
                }
            })
        }
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            id: 0,
            description: ['', [Validators.required, Validators.maxLength(128)]],
            fromPort: ['', [Validators.required, Validators.maxLength(128)]], fromTime: ['', [Validators.required, ValidationService.isTime]],
            viaPort: ['', [Validators.maxLength(128)]], viaTime: ['', [ValidationService.isTime]],
            toPort: ['', [Validators.required, Validators.maxLength(128)]], toTime: ['', [Validators.required, ValidationService.isTime]],
            isActive: true,
            postAt: [''],
            postUser: [''],
            putAt: [''],
            putUser: ['']
        })
    }

    private populateFields(): void {
        if (this.recordId != undefined) {
            this.form.setValue({
                id: this.record.id,
                description: this.record.description,
                fromPort: this.record.fromPort, fromTime: this.record.fromTime,
                viaPort: this.record.viaPort, viaTime: this.record.viaTime,
                toPort: this.record.toPort, toTime: this.record.toTime,
                isActive: this.record.isActive,
                postAt: this.record.postAt,
                postUser: this.record.postUser,
                putAt: this.record.putAt,
                putUser: this.record.putUser
            })
        }
    }

    private resetForm(): void {
        this.form.reset()
    }

    private saveRecord(shipRoute: ShipRouteWriteDto): void {
        this.shipRouteService.save(shipRoute).subscribe({
            next: (response) => {
                this.dexieService.update('shipRoutes', { 'id': parseInt(response.id), 'description': shipRoute.description, 'isActive': shipRoute.isActive })
                this.helperService.doPostSaveFormTasks(this.messageDialogService.success(), 'ok', this.parentUrl, true)
            },
            error: (errorFromInterceptor) => {
                this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
            }
        })
    }

    private setRecordId(): void {
        this.activatedRoute.params.subscribe(x => {
            this.recordId = x.id
        })
    }

    //#endregion

    //#region getters

    get description(): AbstractControl {
        return this.form.get('description')
    }

    get fromPort(): AbstractControl {
        return this.form.get('fromPort')
    }

    get fromTime(): AbstractControl {
        return this.form.get('fromTime')
    }

    get viaPort(): AbstractControl {
        return this.form.get('viaPort')
    }

    get viaTime(): AbstractControl {
        return this.form.get('viaTime')
    }

    get toPort(): AbstractControl {
        return this.form.get('toPort')
    }
    get toTime(): AbstractControl {
        return this.form.get('toTime')
    }

    get isActive(): AbstractControl {
        return this.form.get('isActive')
    }

    get postAt(): AbstractControl {
        return this.form.get('postAt')
    }

    get postUser(): AbstractControl {
        return this.form.get('postUser')
    }

    get putAt(): AbstractControl {
        return this.form.get('putAt')
    }

    get putUser(): AbstractControl {
        return this.form.get('putUser')
    }

    //#endregion

}
