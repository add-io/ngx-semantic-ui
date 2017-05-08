/**
 * Created by webappaloosa on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {ShapeDocsRouting} from "./shape-docs.routing";
import {ShapeDocsComponent} from "./shape-docs.component";

import { SideDirective, SidesDirective, ShapeComponent } from "../../../ngx-semantic-ui";


@NgModule({

    imports: [
        CommonModule,
        ShapeDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        ShapeDocsComponent,
        SideDirective,
        SidesDirective,
        ShapeComponent
    ],
    providers: [],
})
export class ShapeDocsModule {

}
