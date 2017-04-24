/**
 * Created by bradleybrandon on 4/22/17.
 */
import {NgModule} from "@angular/core";
import {TabDirective} from "./tab.directive";
import {TabService} from "./tab.service";
import {TabContextDirective} from "./tab-context.directive";
import {TabTriggerDirective} from "./tab-trigger.directive";

import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [TabDirective, TabContextDirective, TabTriggerDirective],
    exports: [TabDirective, TabContextDirective, TabTriggerDirective],
    providers:[TabService]
})
export class NgxsuiTabsModule{}
