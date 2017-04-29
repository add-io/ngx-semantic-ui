import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSemanticUiModule } from '../../shared/ngx-semantic-ui.module'

import { PopupDocsRouting } from './popup-docs.routing';
import { PopupDocsComponent } from './popup-docs.component';

@NgModule({
    imports: [
        CommonModule,
        PopupDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        PopupDocsComponent
    ],
    providers: []
})
export class PopupDocsModule {
}
