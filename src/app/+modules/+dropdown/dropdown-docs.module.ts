import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';
import { NgxSemanticUiModule } from '../../shared/ngx-semantic-ui.module'

import { DropdownService, DropdownSelectMultipleValueAccessor, DropdownSelectValueAccessor, IconDropdownDirective, SearchInputComponent, MultiSelectLabelComponent, DropDownDirective, DropdownSelectComponent, InputSearchDirective, OptionDirective, DropdownItemDirective, DropdownSelectionDirective, DropdownTextDirective, DropdownMenuDirective, InputHiddenDirective } from "../../shared/ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting,
        FormsModule,
        NgxSemanticUiModule
    ],
    declarations: [
        DropDownDocsComponent,
        DropDownDirective,
        OptionDirective,
        DropdownItemDirective,
        DropdownSelectionDirective,
        DropdownTextDirective,
        DropdownMenuDirective,
        InputHiddenDirective,
        InputSearchDirective,
        DropdownSelectComponent,
        MultiSelectLabelComponent,
        SearchInputComponent,
        IconDropdownDirective,
        DropdownSelectValueAccessor,
        DropdownSelectMultipleValueAccessor
    ],
    providers: [DropdownService],
    entryComponents: [DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent]
})
export class DropDownDocsModule {
}
