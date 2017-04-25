import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';

import { DropDownDirective, InputSearchDirective, OptionDirective, DropdownComponent, DropdownItemDirective, DropdownSelectionDirective, DropdownTextDirective, DropdownMenuDirective, InputHiddenDirective } from "../../shared/ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting,
        FormsModule
    ],
    declarations: [
        DropDownDocsComponent,
        DropDownDirective,
        OptionDirective,
        DropdownComponent,
        DropdownItemDirective,
        DropdownSelectionDirective,
        DropdownTextDirective,
        DropdownMenuDirective,
        InputHiddenDirective,
        InputSearchDirective
    ],
    providers: [],
    entryComponents: [DropdownComponent]
})
export class DropDownDocsModule {
}
