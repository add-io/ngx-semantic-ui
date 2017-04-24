import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { CheckboxDirective } from "./checkbox.directive";
import { RadioCheckboxDirective } from "./radio.directive";
import { CheckboxConfig } from "./checkbox.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ CheckboxDirective, RadioCheckboxDirective ],
    exports: [ CheckboxDirective, RadioCheckboxDirective ]
})
export class CheckboxModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: CheckboxModule, providers: [ CheckboxConfig ] }; }
}
