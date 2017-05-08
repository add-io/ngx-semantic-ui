import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { ShapeComponent } from "./shape.component";
import { SidesDirective } from "./sides.directive";
import { SideDirective } from "./side.directive";
import { ShapeConfig } from "./shape.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ShapeComponent, SidesDirective, SideDirective ],
    exports: [ ShapeComponent, SidesDirective, SideDirective ]
})
export class ShapeModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: ShapeModule, providers: [ ShapeConfig ] }; }
}
