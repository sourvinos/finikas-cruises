import { NgModule } from '@angular/core'
// Custom
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TabViewModule } from 'primeng/tabview'
import { TableModule } from 'primeng/table'

@NgModule({
    exports: [
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        MultiSelectModule,
        RadioButtonModule,
        TabViewModule,
        TableModule
    ]
})

export class PrimeNgModule { }
