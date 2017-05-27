import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { StickyDirective } from "./sticky.directive";
import { StickyContextDirective } from "./sticky-context.directive";
import { StickyConfig } from "./sticky.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ StickyDirective, StickyContextDirective ],
    exports: [ StickyDirective, StickyContextDirective ]
})
export class StickyModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: StickyModule, providers: [ StickyConfig ] }; }
}
