import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { RatingValueAccessor } from "./rating.value-accessor";
import { RatingComponent } from "./rating.component";
import { RatingConfig } from "./rating.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ RatingValueAccessor, RatingComponent ],
    exports: [ RatingValueAccessor, RatingComponent ]
})
export class RatingModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: RatingModule, providers: [ RatingConfig ] }; }
}
