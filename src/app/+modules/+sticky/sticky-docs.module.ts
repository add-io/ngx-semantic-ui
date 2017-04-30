/**
 * Created by terry on 4/21/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {StickyDocsRouting} from './sticky-docs.routing';
import {StickyDocsComponent} from './sticky-docs.component';

import { StickyContextDirective, StickyDirective } from "../../../ngx-semantic-ui";


@NgModule({
    imports: [
        CommonModule,
        StickyDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        StickyDocsComponent,
        StickyContextDirective,
        StickyDirective
    ],
    providers: []
})
export class StickyDocsModule {
}
