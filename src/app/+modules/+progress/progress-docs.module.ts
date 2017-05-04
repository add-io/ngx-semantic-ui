/**
 * Created by terry on 4/21/17.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSemanticUiModule } from '../../shared/ngx-semantic-ui.module'

import { ProgressDocsRouting } from './progress-docs.routing';
import { ProgressDocsComponent } from './progress-docs.component';

import { ProgressDirective, BarComponent, BarProgressLabelComponent } from "../../../ngx-semantic-ui";

@NgModule({
    imports: [
        CommonModule,
        ProgressDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        ProgressDocsComponent,
        ProgressDirective,
        BarComponent,
        BarProgressLabelComponent
    ],
    providers: []
})
export class ProgressDocsModule {
}
