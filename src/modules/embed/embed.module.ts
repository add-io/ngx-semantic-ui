import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { EmbedComponent } from "./embed.component";
import { EmbedConfig } from "./embed.config";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ EmbedComponent ],
    exports: [ EmbedComponent ]
})
export class EmbedModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: EmbedModule, providers: [ EmbedConfig ] }; }
}
