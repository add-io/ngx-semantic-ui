/**
 * Created by webappaloosa on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {AccordionDocsRouting} from './accordion-docs.routing';
import {AccordionDocsComponent} from "./accordion-docs.component";
import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {AccordionDirective, AccordionContentComponent, AccordionTitleDirective} from "../../shared/ngx-semantic-ui"


@NgModule({
    imports: [
        CommonModule,
        AccordionDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        AccordionDocsComponent,
        AccordionContentComponent,
        AccordionDirective,
        AccordionTitleDirective
    ]
})

export class AccordionDocsModule {
}
