/**
 * Created by terry on 4/21/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {EmbedDocsRouting} from './embed-docs.routing';
import {EmbedDocsComponent} from './embed-docs.component';

import { EmbedModule } from "../../../ngx-semantic-ui/modules/embed";


@NgModule({
    imports: [
        CommonModule,
        EmbedDocsRouting,
        NgxSemanticUiModule,
        EmbedModule.forRoot()
    ],
    declarations: [
        EmbedDocsComponent
    ],
    providers: []
})
export class EmbedDocsModule {
}
