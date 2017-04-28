import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';
import { NgxSemanticUiModule } from '../../shared/ngx-semantic-ui.module'

import {
    DropdownSelectDirective, DropdownDirective, DropdownService, InputDirective, SearchInputDirective,
    DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent, IconDirective, InputHiddenDirective,
    ItemDirective, MenuDirective, OptionDirective, TextDirective, DropdownSelectValueAccessor, DropdownSelectMultipleValueAccessor
} from "../../shared/ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting,
        FormsModule,
        NgxSemanticUiModule
    ],
    declarations: [
        DropDownDocsComponent,
        DropdownSelectDirective,
        DropdownDirective,
        DropdownSelectComponent,
        MultiSelectLabelComponent,
        SearchInputComponent,
        IconDirective,
        InputHiddenDirective,
        InputDirective,
        ItemDirective,
        MenuDirective,
        OptionDirective,
        SearchInputDirective,
        TextDirective,
        DropdownSelectValueAccessor,
        DropdownSelectMultipleValueAccessor
    ],
    providers: [DropdownService],
    entryComponents: [DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent]
})
export class DropDownDocsModule {
}
