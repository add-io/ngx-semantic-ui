/**
 * Created by webappaloosa on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {SearchDocsRouting} from "./search-docs.routing";
import {SearchDocsComponent} from "./search-docs.component";

import { SearchModule } from "../../../ngx-semantic-ui/modules/search";


@NgModule({

    imports: [
        CommonModule,
        SearchDocsRouting,
        NgxSemanticUiModule,
        SearchModule.forRoot()
    ],
    declarations: [
        SearchDocsComponent
    ],
    providers: [],
})
export class SearchDocsModule {

}
