/**
 * Created by bradleybrandon on 4/22/17.
 */
import {NgModule} from "@angular/core";

import {CheckboxDirective} from "./checkbox.directive";
import {RadioCheckboxDirective} from "./radio.directive";

import {CommonModule} from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [CheckboxDirective, RadioCheckboxDirective,],
    exports: [CheckboxDirective, RadioCheckboxDirective,],
    providers:[]
})
export class NgxsuiCheckboxModule{}