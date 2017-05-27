import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { DimmerComponent } from "./dimmer.component";
import { DimmerDirective } from "./dimmer.directive";
import { DimmerConfig } from "./dimmer.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ DimmerComponent, DimmerDirective ],
    exports: [ DimmerComponent, DimmerDirective ]
})
export class DimmerModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: DimmerModule, providers: [ DimmerConfig ] }; }
}
