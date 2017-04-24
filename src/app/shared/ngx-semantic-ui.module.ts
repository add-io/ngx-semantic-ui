/**
 * Created by bradleybrandon on 4/21/17.
 */
import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {LayoutService} from './layout/layout.service'

import {LayoutModule} from './layout'

import {NgxsuiSidebarModule} from "./ngx-semantic-ui/modules/sidebar/ngxsui-sidebar.module";
import {NgxsuiPopupModule} from './ngx-semantic-ui/modules/popup/ngxsui-popup.module';

import { TabModule } from "./ngx-semantic-ui/modules/tab/tab.module";
import { CheckboxModule } from "./ngx-semantic-ui/modules/checkbox/checkbox.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule,
        LayoutModule,
        TabModule,
        NgxsuiSidebarModule,
        CheckboxModule,
        NgxsuiPopupModule
    ],
    providers: [LayoutService]

})
export class NgxSemanticUiModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxSemanticUiModule,
            providers: [LayoutService]
        };
    }

}
