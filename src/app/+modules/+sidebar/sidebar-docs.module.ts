/**
 * Created by bradleybrandon on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';


import {NgxSemanticUiModule} from '../../shared/ngx-semantic-ui.module'

import {SidebarDocsRouting} from "./sidebar-docs.routing";
import {SidebarDocsComponent} from "./sidebar-docs.component";


@NgModule({

    imports: [
        CommonModule,
        SidebarDocsRouting,
        NgxSemanticUiModule
    ],
    declarations: [
        SidebarDocsComponent,
    ],
    providers: [],
})
export class SidebarDocsModule {

}
