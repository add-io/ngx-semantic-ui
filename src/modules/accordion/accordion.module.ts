import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { AccordionTitleDirective } from "./accordion-title.directive";
import { AccordionContentComponent } from "./accordion-content.component";
import { AccordionDirective } from "./accordion.directive";
import { AccordionConfig } from "./accordion.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ AccordionDirective, AccordionContentComponent, AccordionTitleDirective ],
    exports: [ AccordionDirective, AccordionContentComponent, AccordionTitleDirective ]
})
export class AccordionModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: AccordionModule, providers: [ AccordionConfig ] }; }
}
