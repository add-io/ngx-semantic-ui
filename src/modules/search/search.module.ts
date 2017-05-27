import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { SearchComponent } from "./search.component";
import { InputPromptDirective } from "./input-prompt.directive";
import { SearchConfig } from "./search.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ SearchComponent, InputPromptDirective ],
    exports: [ SearchComponent, InputPromptDirective ]
})
export class SearchModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: SearchModule, providers: [ SearchConfig ] }; }
}
