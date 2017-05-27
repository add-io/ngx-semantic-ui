import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { IconDirective, InputHiddenDirective, InputDirective, ItemDirective, MenuDirective, OptionDirective, SearchInputDirective, TextDirective } from "./directives";
import { DropdownSelectValueAccessor, DropdownSelectMultipleValueAccessor } from "./value-accessors";
import { DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent } from "./components";
import { DropdownSelectDirective } from "./dropdown-select.directive";
import { DropdownDirective } from "./dropdown.directive";
import { DropdownService } from "./dropdown.service";
import { DropdownConfig } from "./dropdown.config";

@NgModule({
    imports: [ CommonModule ],
    providers: [ DropdownService ],
    declarations: [
        IconDirective,
        InputHiddenDirective,
        InputDirective,
        ItemDirective,
        MenuDirective,
        OptionDirective,
        SearchInputDirective,
        TextDirective,
        DropdownSelectValueAccessor,
        DropdownSelectMultipleValueAccessor,
        DropdownSelectComponent,
        MultiSelectLabelComponent,
        SearchInputComponent,
        DropdownSelectDirective,
        DropdownDirective
    ],
    exports: [
        IconDirective,
        InputHiddenDirective,
        InputDirective,
        ItemDirective,
        MenuDirective,
        OptionDirective,
        SearchInputDirective,
        TextDirective,
        DropdownSelectValueAccessor,
        DropdownSelectMultipleValueAccessor,
        DropdownSelectComponent,
        MultiSelectLabelComponent,
        SearchInputComponent,
        DropdownSelectDirective,
        DropdownDirective
    ],
    entryComponents: [ DropdownSelectComponent, MultiSelectLabelComponent, SearchInputComponent ]
})
export class DropdownModule {
    public static forRoot(): ModuleWithProviders { return { ngModule: DropdownModule, providers: [ DropdownConfig ] }; }
}
