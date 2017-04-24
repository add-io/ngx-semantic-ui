import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';

import { DropDownDirective, OptionDirective, DropdownComponent, DropdownItemDirective, DropdownSelectionDirective, DropdownTextDirective, DropdownMenuDirective } from "../../shared/ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting
    ],
    declarations: [
        DropDownDocsComponent,
        DropDownDirective,
        OptionDirective,
        DropdownComponent,
        DropdownItemDirective,
        DropdownSelectionDirective,
        DropdownTextDirective,
        DropdownMenuDirective
    ],
    providers: [],
    entryComponents: [DropdownComponent]
})
export class DropDownDocsModule {
}
