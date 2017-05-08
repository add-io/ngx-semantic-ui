import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { ProgressDirective } from "./progress.directive";
import { BarComponent } from "./bar.component";
import { BarProgressLabelComponent } from "./bar-progress-label.component";
import { ProgressConfig } from "./progress.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ProgressDirective, BarComponent, BarProgressLabelComponent ],
    exports: [ ProgressDirective, BarComponent, BarProgressLabelComponent ]
})
export class ProgressModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: ProgressModule, providers: [ ProgressConfig ] }; }
}
