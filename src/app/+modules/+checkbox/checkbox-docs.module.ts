
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxDocsRouting } from './checkbox-docs.routing';
import { CheckboxDocsComponent } from './checkbox-docs.component';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'


@NgModule({
    imports: [
        CommonModule,
        CheckboxDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        CheckboxDocsComponent,
    ],
    exports: []
})
export class CheckboxDocsModule {
}
