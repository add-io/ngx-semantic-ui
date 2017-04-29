import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';
import { NgxSemanticUiModule } from '../../shared/ngx-semantic-ui.module'
import { DropdownModule } from "../../../ngx-semantic-ui/modules/dropdown"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting,
        FormsModule,
        NgxSemanticUiModule,

        DropdownModule.forRoot()
    ],
    declarations: [ DropDownDocsComponent ]
})
export class DropDownDocsModule {
}
