import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
// Custom
import { MessageLabelService } from 'src/app/shared/services/message-label.service'

@Component({
    selector: 'modal-debug-dialog',
    templateUrl: './modal-debug-dialog.component.html',
    styleUrls: ['./modal-debug-dialog.component.css']
})

export class ModalDebugDialogComponent {

    //#region variables

    private feature = 'dialog'
    public content: any

    //#endregion

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ModalDebugDialogComponent>, private messageLabelService: MessageLabelService) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.content = this.data.message
    }

    //#endregion

    //#region public methods

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onClose(): void {
        this.dialogRef.close()
    }

    //#endregion

}
