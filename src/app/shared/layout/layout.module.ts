/**
 * Created by bradleybrandon on 4/21/17.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {LayoutHeaderModule} from "./header/layout-header.module";
import {LayoutFooterModule} from "./footer/layout-footer.module";
import {MainLayoutComponent} from './app-layouts/main-layout.component';
import {RouterModule} from "@angular/router";
// import {SidebarDemoModule} from "./sidebar-demo/sidebar-demo.module";


@NgModule({
    imports: [
        CommonModule,
        LayoutHeaderModule,
        LayoutFooterModule,
        // SidebarDemoModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        MainLayoutComponent,
    ],
    exports: [
        LayoutHeaderModule,
        LayoutFooterModule,
        // SidebarDemoModule
    ]
})
export class LayoutModule {

}
