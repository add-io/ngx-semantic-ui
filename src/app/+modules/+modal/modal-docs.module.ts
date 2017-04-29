import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import { ModalDocsRouting } from './modal-docs.routing';
import { ModalDocsComponent} from './modal-docs.component';
import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import { ModalApproveDirective, ModalContextDirective, ModalComponent, ModalDenyDirective, ModalCloseDirective, ModalService } from "../../../ngx-semantic-ui"

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        ModalDocsComponent,

        ModalComponent,
        ModalContextDirective,
        ModalApproveDirective,
        ModalDenyDirective,
        ModalCloseDirective
    ],
    providers: [ModalService]
})
export class ModalDocsModule {
}
