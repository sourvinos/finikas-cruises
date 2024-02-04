import { ActivatedRoute, Router } from '@angular/router'
import { Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Table } from 'primeng/table'
// Custom
import { DeleteRangeDialogComponent } from 'src/app/shared/components/delete-range-dialog/delete-range-dialog.component'
import { DialogService } from 'src/app/shared/services/modal-dialog.service'
import { EmojiService } from 'src/app/shared/services/emoji.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { InteractionService } from 'src/app/shared/services/interaction.service'
import { ListResolved } from 'src/app/shared/classes/list-resolved'
import { MessageDialogService } from 'src/app/shared/services/message-dialog.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { PickupPointHttpService } from '../classes/services/pickupPoint-http.service'
import { PickupPointListVM } from '../classes/view-models/pickupPoint-list-vm'
import { PickupPointPdfService } from '../classes/services/pickupPoint-pdf.service'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'
import { PickupPointWriteDto } from '../classes/dtos/pickupPoint-write-dto'

@Component({
    selector: 'pickupPoint-list',
    templateUrl: './pickupPoint-list.component.html',
    styleUrls: ['../../../../../assets/styles/custom/lists.css', './pickupPoint-list.component.css']
})

export class PickupPointListComponent {

    //#region common

    @ViewChild('table') table: Table

    private url = 'pickupPoints'
    private virtualElement: any
    public feature = 'pickupPointList'
    public featureIcon = 'pickupPoints'
    public icon = 'home'
    public parentUrl = '/home'
    public records: PickupPointListVM[]
    public recordsFilteredCount: number

    //#endregion

    //#region dropdown filters

    public dropdownCoachRoutes = []
    public dropdownDestinations = []
    public dropdownPorts = []

    //#endregion

    //#region specific

    public recordsFiltered: PickupPointListVM[]
    public selectedIds: string[] = []
    public selectedRecords: PickupPointListVM[] = []

    //#endregion

    constructor(private activatedRoute: ActivatedRoute, private dialogService: DialogService, private emojiService: EmojiService, private helperService: HelperService, private interactionService: InteractionService, private messageDialogService: MessageDialogService, private messageLabelService: MessageLabelService, private pickupPointHttpService: PickupPointHttpService, private pickupPointPdfService: PickupPointPdfService, private router: Router, private sessionStorageService: SessionStorageService, public dialog: MatDialog) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.loadRecords().then(() => {
            this.populateDropdownFilters()
            this.filterTableFromStoredFilters()
            this.subscribeToInteractionService()
            this.setTabTitle()
            this.setSidebarsHeight()
        })
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.getVirtualElement()
            this.scrollToSavedPosition()
            this.hightlightSavedRow()
            this.enableDisableFilters()
        }, 500)
    }

    //#endregion

    //#region public methods

    public cancelArrowKeys(event: any): void {
        event.stopPropagation()
    }

    public filterRecords(event: any): void {
        this.sessionStorageService.saveItem(this.feature + '-' + 'filters', JSON.stringify(this.table.filters))
        this.recordsFiltered = event.filteredValue
        this.recordsFilteredCount = event.filteredValue.length
    }

    public getEmoji(anything: any): string {
        return typeof anything == 'string'
            ? this.emojiService.getEmoji(anything)
            : anything ? this.emojiService.getEmoji('green-box') : this.emojiService.getEmoji('red-box')
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public onEditComplete(event: any): void {
        console.log(event.data)
    }

    public onEditRecord(id: number): void {
        this.storeScrollTop()
        this.storeSelectedId(id)
        this.navigateToRecord(id)
    }

    public onHighlightRow(id: any): void {
        this.helperService.highlightRow(id)
    }

    public onNewRecord(): void {
        this.router.navigate([this.url + '/new'])
    }

    public onRowEditInit(record: PickupPointWriteDto): void {
        console.log(record)
    }

    public onRowEditSave(record: PickupPointWriteDto): void {
        console.log(record)
    }

    public onRowEditCancel(record: PickupPointWriteDto, index: number): void {
        console.log(index, record)
    }

    public resetTableFilters(): void {
        this.helperService.clearTableTextFilters(this.table, ['description', 'exactPoint', 'time'])
    }

    //#endregion

    //#region private methods

    private enableDisableFilters(): void {
        this.records.length == 0 ? this.helperService.disableTableFilters() : this.helperService.enableTableFilters()
    }

    private filterColumn(element: { value: any }, field: string, matchMode: string): void {
        if (element != undefined && (element.value != null || element.value != undefined)) {
            this.table.filter(element.value, field, matchMode)
        }
    }

    private filterTableFromStoredFilters(): void {
        const filters = this.sessionStorageService.getFilters(this.feature + '-' + 'filters')
        if (filters != undefined) {
            setTimeout(() => {
                this.filterColumn(filters.isActive, 'isActive', 'contains')
                this.filterColumn(filters.coachRoute, 'coachRoute', 'in')
                this.filterColumn(filters.destination, 'destination', 'in')
                this.filterColumn(filters.port, 'port', 'in')
                this.filterColumn(filters.description, 'description', 'contains')
                this.filterColumn(filters.exactPoint, 'exactPoint', 'contains')
                this.filterColumn(filters.time, 'time', 'contains')
            }, 500)
        }
    }

    private getVirtualElement(): void {
        this.virtualElement = document.getElementsByClassName('p-scroller-inline')[0]
    }

    private goBack(): void {
        this.router.navigate([this.parentUrl])
    }

    private hightlightSavedRow(): void {
        this.helperService.highlightSavedRow(this.feature)
    }

    private loadRecords(): Promise<any> {
        return new Promise((resolve) => {
            const listResolved: ListResolved = this.activatedRoute.snapshot.data[this.feature]
            if (listResolved.error == null) {
                this.records = listResolved.list
                this.recordsFiltered = listResolved.list
                this.recordsFilteredCount = this.records.length
                resolve(this.records)
            } else {
                this.dialogService.open(this.messageDialogService.filterResponse(listResolved.error), 'error', ['ok']).subscribe(() => {
                    this.goBack()
                })
            }
        })
    }

    private navigateToRecord(id: any): void {
        this.router.navigate([this.url, id])
    }

    private scrollToSavedPosition(): void {
        this.helperService.scrollToSavedPosition(this.virtualElement, this.feature)
    }

    private setSidebarsHeight(): void {
        this.helperService.setSidebarsTopMargin('0')
    }

    private setTabTitle(): void {
        this.helperService.setTabTitle(this.feature)
    }

    private storeSelectedId(id: number): void {
        this.sessionStorageService.saveItem(this.feature + '-id', id.toString())
    }

    private storeScrollTop(): void {
        this.sessionStorageService.saveItem(this.feature + '-scrollTop', this.virtualElement.scrollTop)
    }

    private subscribeToInteractionService(): void {
        this.interactionService.refreshTabTitle.subscribe(() => {
            this.setTabTitle()
        })
    }

    //#endregion

    //#region specific methods

    public onCreatePdf(): void {
        this.pickupPointPdfService.createReport(this.recordsFiltered)
    }

    public onDeleteRange(): void {
        if (this.isAnyRowSelected()) {
            const dialogRef = this.dialog.open(DeleteRangeDialogComponent, {
                data: 'question',
                panelClass: 'dialog',
                height: '18.75rem',
                width: '31.25rem'
            })
            dialogRef.afterClosed().subscribe(result => {
                if (result != undefined) {
                    this.saveSelectedIds()
                    this.pickupPointHttpService.deleteRange(this.selectedIds).subscribe({
                        complete: () => {
                            this.dialogService.open(this.messageDialogService.success(), 'ok', ['ok']).subscribe(() => {
                                this.clearSelectedRecords()
                                this.refreshList()
                            })
                        },
                        error: (errorFromInterceptor) => {
                            this.dialogService.open(this.messageDialogService.filterResponse(errorFromInterceptor), 'error', ['ok'])
                        }
                    })
                }
            })
        }
    }

    private clearSelectedRecords(): void {
        this.selectedRecords = []
    }

    private isAnyRowSelected(): boolean {
        if (this.selectedRecords.length == 0) {
            this.dialogService.open(this.messageDialogService.noRecordsSelected(), 'error', ['ok'])
            return false
        }
        return true
    }

    private populateDropdownFilters(): void {
        this.dropdownCoachRoutes = this.helperService.getDistinctRecords(this.records, 'coachRoute', 'abbreviation')
        this.dropdownDestinations = this.helperService.getDistinctRecords(this.records, 'destination', 'description')
        this.dropdownPorts = this.helperService.getDistinctRecords(this.records, 'port', 'abbreviation')
    }

    private refreshList(): void {
        this.router.navigateByUrl(this.router.url)
    }

    private saveSelectedIds(): void {
        const ids = []
        this.selectedRecords.forEach(record => {
            ids.push(record.id)
        })
        this.selectedIds = ids
    }

    //#endregion

    public onMouseEnter(row: HTMLElement): void {
        const parent = document.getElementById(row.id)
        const childDiv = parent.getElementsByTagName('td')[8]
        const requiredDiv = childDiv.getElementsByTagName('span')[0]
        requiredDiv.style.visibility = 'visible'
    }

    public onMouseOut(row: HTMLElement): void {
        const parent = document.getElementById(row.id)
        const childDiv = parent.getElementsByTagName('td')[8]
        const requiredDiv = childDiv.getElementsByTagName('span')[0]
        requiredDiv.style.visibility = 'hidden'
    }

}
