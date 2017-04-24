import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { DropDownDocsRouting } from './dropdown-docs.routing';
import { DropDownDocsComponent} from './dropdown-docs.component';

import { DropDownDirective, DropDownTriggerDirective } from "../../shared/ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        DropDownDocsRouting
    ],
    declarations: [
        DropDownDocsComponent,
        DropDownDirective,
        DropDownTriggerDirective
    ],
    providers: []
})
export class DropDownDocsModule {
}