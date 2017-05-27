import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { TabDirective } from "./tab.directive";
import { TabTriggerDirective } from "./tab-trigger.directive";
import { TabContextDirective } from "./tab-context.directive";
import { TabService } from "./tab.service";
import { TabConfig } from "./tab.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ TabDirective, TabTriggerDirective, TabContextDirective ],
    exports: [ TabDirective, TabTriggerDirective, TabContextDirective ],
    providers: [ TabService ]
})
export class TabModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: TabModule, providers: [ TabConfig ] }; }
}
