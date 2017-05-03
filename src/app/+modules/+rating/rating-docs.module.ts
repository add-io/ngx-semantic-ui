/**
 * Created by terry on 4/21/17.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {RatingDocsRouting} from './rating-docs.routing';
import {RatingDocsComponent} from './rating-docs.component';

import { RatingComponent, RatingValueAccessor } from "../../../ngx-semantic-ui";


@NgModule({
    imports: [
        CommonModule,
        RatingDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        RatingDocsComponent,
        RatingValueAccessor,
        RatingComponent
    ],
    providers: []
})
export class RatingDocsModule {
}
