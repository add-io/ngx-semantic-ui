/**
 * Created by bradleybrandon on 4/22/17.
 */
import {NgModule} from "@angular/core";

import {SidebarDirective} from "./sidebar.directive";
import {SidebarContextDirective} from "./sidebar-context.directive";
import {SidebarTriggerDirective} from "./sidebar-trigger.directive";

import {SidebarService} from "./sidebar.service";

import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [
        SidebarDirective,
        SidebarContextDirective,
        SidebarTriggerDirective,
    ],
    exports: [
        SidebarDirective,
        SidebarContextDirective,
        SidebarTriggerDirective,
    ],
    providers:[SidebarService]
})
export class NgxsuiSidebarModule{}
