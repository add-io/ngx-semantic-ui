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

import {NgxsuiCheckboxModule} from './ngx-semantic-ui/modules/checkbox/ngxsui-checkbox.module';
import {NgxsuiSidebarModule} from "./ngx-semantic-ui/modules/sidebar/ngxsui-sidebar.module";
import {NgxsuiTabsModule} from "./ngx-semantic-ui/modules/tab/ngxsui-tabs.module";
import {NgxsuiPopupModule} from './ngx-semantic-ui/modules/popup/ngxsui-popup.module';

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
        NgxsuiCheckboxModule,
        NgxsuiSidebarModule,
        NgxsuiTabsModule,
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
