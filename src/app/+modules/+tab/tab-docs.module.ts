/**
 * Created by terry on 4/21/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {TabDocsRouting} from './tab-docs.routing';
import {TabDocsComponent} from './tab-docs.component';


@NgModule({
    imports: [
        CommonModule,
        TabDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        TabDocsComponent,
    ],
    providers: []
})
export class TabDocsModule {
}
