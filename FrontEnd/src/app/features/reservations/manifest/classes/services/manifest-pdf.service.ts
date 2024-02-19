import { Injectable } from '@angular/core'
// Custom
import { DateHelperService } from 'src/app/shared/services/date-helper.service'
import { HelperService } from 'src/app/shared/services/helper.service'
import { LogoService } from '../../../reservations/classes/services/logo.service'
import { ManifestPassengerVM } from '../view-models/list/manifest-passenger-vm'
import { ManifestVM } from '../view-models/list/manifest-vm'
// Fonts
import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import { strPrompt } from '../../../../../../assets/fonts/Prompt.Base64.encoded'
import { strPFHandbookPro } from '../../../../../../assets/fonts/PF-Handbook-Pro.Base64.encoded'

pdfMake.vfs = pdfFonts.pdfMake.vfs

@Injectable({ providedIn: 'root' })

export class ManifestPdfService {

    //#region variables

    private rowCount: number
    private pdfVM: ManifestVM

    //#endregion

    constructor(private dateHelperService: DateHelperService, private helperService: HelperService, private logoService: LogoService) { }

    //#region public methods


    public createReport(manifest: ManifestVM): void {
        this.pdfVM = JSON.parse(JSON.stringify(manifest))
        this.pdfVM.passengers = this.flattedPassengers(this.pdfVM.passengers)
        this.rowCount = 0
        this.setFonts()
        const dd = {
            pageOrientation: 'landscape',
            pageSize: 'A4',
            content:
                [
                    {
                        table: {
                            body: [
                                [this.createOurCompany(this.pdfVM), this.createTitle(this.pdfVM)],
                                [this.createShipData(this.pdfVM), this.createManager(this.pdfVM)],
                                [this.createShipRoute(this.pdfVM), ''],
                                [this.createDataEntryPrimaryPerson(this.pdfVM), this.createDataEntrySecondaryPerson(this.pdfVM)]
                            ],
                            style: 'table',
                            widths: ['50%', '50%'],
                        },
                        layout: 'noBorders'
                    },
                    [
                        this.createTable(this.pdfVM,
                            ['', '', '', '', '', 'date', '', '', '', 'date', '', ''],
                            ['', 'lastname', 'firstname', 'gender', 'nationality', 'birthdate', 'occupant', 'specialCare', 'passportNo', 'passportExpiryDate', 'phones', 'remarks'],
                            ['right', 'left', 'left', 'center', 'center', 'center', 'left', 'left', 'left', 'center', 'left', 'left'])
                    ],
                    {
                        table: {
                            body: [
                                ['', this.createSignature(this.pdfVM)]
                            ],
                            widths: ['50%', '50%']
                        },
                        layout: 'noBorders'
                    }
                ],
            styles: {
                Prompt: {
                    font: 'Prompt',
                },
                PFHandbookPro: {
                    font: 'PFHandbookPro',
                },
                paddingLeft: {
                    margin: [40, 0, 0, 0]
                },
                paddingTop: {
                    margin: [0, 15, 0, 0]
                }
            },
            defaultStyle: {
                font: 'PFHandbookPro',
                fontSize: 7
            },
            footer: (currentPage: { toString: () => string }, pageCount: string): void => {
                return this.createPageFooter(currentPage, pageCount)
            }

        }
        this.createPdf(dd)
    }

    //#endregion

    //#region private methods

    private createOurCompany(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: manifest.ship.shipOwner.description, fontSize: 14 },
                { text: manifest.ship.shipOwner.profession },
                { text: manifest.ship.shipOwner.address },
                { text: manifest.ship.shipOwner.city },
                { text: manifest.ship.shipOwner.phones },
                { text: manifest.ship.shipOwner.taxNo }
            ]
        }
    }

    private createTitle(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΗΜΕΡΟΜΗΝΙΑ ' + this.dateHelperService.formatISODateToLocale(manifest.date, false, true) },
                { text: 'ΚΑΤΑΣΤΑΣΗ ΕΠΙΒΑΙΝΟΝΤΩΝ', fontSize: 13 },
                { text: 'ΠΛΟΙΟ: ' + manifest.ship.description },
                { text: 'ΤΕΛΙΚΟΣ ΠΡΟΟΡΙΣΜΟΣ: ' + manifest.destination.description },
            ]
        }
    }

    private createShipData(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΣΤΟΙΧΕΙΑ ΠΛΟΙΟΥ', fontSize: 9 },
                { text: 'ΟΝΟΜΑ: ' + manifest.ship.description },
                { text: 'ΣΗΜΑΙΑ: ' + manifest.ship.flag },
                { text: 'ΑΡΙΘΜΟΣ ΝΗΟΛΟΓΙΟΥ: ' + manifest.ship.registryNo },
                { text: 'ΙΜΟ: ' + manifest.ship.imo },
            ]
        }
    }

    private createManager(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΣΤΟΙΧΕΙΑ ΕΤΑΙΡΙΑΣ', fontSize: 9 },
                { text: 'ΥΠΕΥΘΥΝΟΣ ΔΙΑΧΕΙΡΙΣΤΗΣ: ' + manifest.ship.manager },
                { text: 'ΔΙΑΧΕΙΡΙΣΤΗΣ ΣΤΗΝ ΕΛΛΑΔΑ: ' + manifest.ship.managerInGreece },
                { text: 'ΥΠΕΥΘΥΝΟΙ ΝΑΥΤΙΚΟΙ ΠΡΑΚΤΟΡΕΣ: ' + manifest.ship.agent }
            ]
        }
    }

    private createShipRoute(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΛΙΜΕΝΕΣ', fontSize: 9 },
                { text: 'ΛΙΜΕΝΑΣ ΑΠΟΠΛΟΥ: ' + manifest.shipRoute.fromPort + ' ΩΡΑ ' + manifest.shipRoute.fromTime },
                { text: 'ΕΝΔΙΑΜΕΣΟΙ ΛΙΜΕΝΕΣ ΠΡΟΣΕΓΓΙΣΗΣ: ' + this.buildViaPorts(manifest) },
                { text: 'ΛΙΜΕΝΑΣ ΚΑΤΑΠΛΟΥ: ' + manifest.shipRoute.toPort + ' ΩΡΑ ' + manifest.shipRoute.toTime }
            ]
        }
    }

    private createDataEntryPrimaryPerson(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΥΠΕΥΘΥΝΟΣ ΚΑΤΑΓΡΑΦΗΣ', fontSize: 9 },
                { text: 'ΟΝΟΜΑΤΕΠΩΝΥΜΟ: ' + manifest.ship.registrars[0].fullname },
                { text: 'ΤΗΛΕΦΩΝΑ: ' + manifest.ship.registrars[0].phones },
                { text: 'EMAIL: ' + manifest.ship.registrars[0].email },
                { text: 'FAX: ' + manifest.ship.registrars[0].fax },
                { text: ' ' },
                { text: ' ' }
            ]
        }
    }

    private createDataEntrySecondaryPerson(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: 'ΑΝΤΙΚΑΤΑΣΤΑΤΗΣ ΥΠΕΥΘΥΝΟΥ ΚΑΤΑΓΡΑΦΗΣ', fontSize: 9 },
                { text: 'ΟΝΟΜΑΤΕΠΩΝΥΜΟ: ' + manifest.ship.registrars[1].fullname },
                { text: 'ΤΗΛΕΦΩΝΑ: ' + manifest.ship.registrars[1].phones },
                { text: 'EMAIL: ' + manifest.ship.registrars[1].email },
                { text: 'FAX: ' + manifest.ship.registrars[1].fax },
                { text: ' ' },
                { text: ' ' }
            ]
        }
    }

    private createTableHeaders(): any[] {
        return [
            { text: 'Α/Α', style: 'tableHeader', alignment: 'center' },
            { text: 'ΕΠΩΝΥΜΟ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΟΝΟΜΑ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΦΥΛΟ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΙΘΑΓΕΝΕΙΑ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΗΜΕΡΟΜΗΝΙΑ ΓΕΝΝΗΣΗΣ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΙΔΙΟΤΗΤΑ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΕΙΔΙΚΗ ΦΡΟΝΤΙΔΑ', style: 'tableHeader', alignment: 'center' },
            { text: 'Νο ΔΙΑΒΑΤΗΡΙΟΥ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΗΜΕΡΟΜΗΝΙΑ ΛΗΞΗΣ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΤΗΛΕΦΩΝΑ', style: 'tableHeader', alignment: 'center' },
            { text: 'ΠΑΡΑΤΗΡΗΣΕΙΣ', style: 'tableHeader', alignment: 'center' },
        ]
    }

    private createTable(data: ManifestVM, columnTypes: any[], columns: any[], align: any[]): any {
        return {
            table: {
                headerRows: 1,
                dontBreakRows: true,
                body: this.createTableRows(data, columnTypes, columns, align),
                bold: false,
                style: 'table',
                widths: [15, 120, 120, 30, 30, 35, 30, 80, 40, 35, 50, 50],
            },
            layout: {
                hLineColor: function (): string {
                    return '#ececec'
                },
                vLineColor: function (): string {
                    return '#ececec'
                }
            }
        }
    }

    private createTableRows(data: any, columnTypes: any[], columns: any[], align: any[]): void {
        const body: any = []
        body.push(this.createTableHeaders())
        data.passengers.forEach((row) => {
            let dataRow = []
            dataRow = this.processRow(columnTypes, columns, row, dataRow, align)
            body.push(dataRow)
        })
        return body
    }

    private createSignature(manifest: ManifestVM): any {
        return {
            type: 'none',
            margin: [0, 0, 0, 0],
            ul: [
                { text: ' ' },
                { text: ' ' },
                { text: 'ΒΕΒΑΙΩΝΕΤΑΙ Η ΑΚΡΙΒΕΙΑ ΤΩΝ ΣΤΟΙΧΕΙΩΝ' },
                { text: 'ΚΑΙ ΠΛΗΡΟΦΟΡΙΩΝ ΑΠΟ ΤΟΝ / ΤΗΝ' },
                { text: manifest.ship.manager, fontSize: 9 },
                { text: 'ΠΟΥ ΕΧΕΙ ΟΡΙΣΤΕΙ ΑΠΟ ΤΗΝ ΕΤΑΙΡΙΑ ΓΙΑ ΤΗ ΔΙΑΒΙΒΑΣΗ ΤΟΥΣ ΣΤΗΝ ΑΡΧΗ' }
            ]
        }
    }

    private createPageFooter(currentPage: { toString: any }, pageCount: string): any {
        return {
            layout: 'noBorders',
            margin: [0, 10, 40, 10],
            table: {
                widths: ['100%'],
                body: [
                    [
                        { text: 'ΣΕΛΙΔΑ ' + currentPage.toString() + ' ΑΠΟ ' + pageCount, alignment: 'right', fontSize: 6 }
                    ]
                ]
            }
        }
    }

    private createPdf(document: any): void {
        pdfMake.createPdf(document).open()
    }

    private formatField(type: any, field: string | number | Date): string {
        switch (type) {
            case 'date':
                return field.toString() != ''
                    ? this.dateHelperService.formatISODateToLocale(field.toString(), false, true)
                    : ''
            default:
                return field != undefined ? field.toString() : ''
        }
    }

    private processRow(columnTypes: any[], columns: any[], row: any, dataRow: any[], align: any[]): any {
        columns.forEach((element: any, index) => {
            if (element != undefined) {
                if (index == 0) {
                    dataRow.push({ text: ++this.rowCount, alignment: 'right', color: '#000000', noWrap: false })
                } else {
                    dataRow.push({ text: this.formatField(columnTypes[index], row[element]), alignment: align[index].toString(), color: '#000000', noWrap: false })
                }
            }
        })
        return dataRow
    }

    private setFonts(): void {
        pdfFonts.pdfMake.vfs['Prompt'] = strPrompt
        pdfFonts.pdfMake.vfs['PFHandbookPro'] = strPFHandbookPro
        pdfMake.fonts = {
            Prompt: { normal: 'Prompt' },
            PFHandbookPro: { normal: 'PFHandbookPro' }
        }
    }

    private buildViaPorts(manifest: ManifestVM): any {
        if (manifest.shipRoute.viaPort != '') {
            return manifest.shipRoute.viaPort + ' ΩΡΑ ' + manifest.shipRoute.viaTime
        } else {
            return '-'
        }
    }

    private flattedPassengers(passengers: ManifestPassengerVM[]): any {
        passengers.forEach(passenger => {
            const nationality = this.helperService.flattenObject(passenger.nationality)
            passenger.nationality = nationality.code
            const gender = this.helperService.flattenObject(passenger.gender)
            passenger.gender = gender.description
            const occupant = this.helperService.flattenObject(passenger.occupant)
            passenger.occupant = occupant.description
        })
        return passengers
    }

    //#endregion

}
