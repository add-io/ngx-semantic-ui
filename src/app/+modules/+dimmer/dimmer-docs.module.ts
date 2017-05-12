import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import { DimmerDocsRouting } from './dimmer-docs.routing';
import { DimmerDocsComponent} from './dimmer-docs.component';
import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module';

import { DimmerModule } from "../../../ngx-semantic-ui/modules/dimmer";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DimmerDocsRouting,
        NgxSemanticUiModule,
        DimmerModule.forRoot()
    ],
    declarations: [
        DimmerDocsComponent,
    ]
})
export class DimmerDocsModule {
}
