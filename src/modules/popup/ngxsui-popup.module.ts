import { NgModule } from "@angular/core";

import { PopupDirective } from "./popup.directive";
import { TooltipDirective } from './tooltip.directive';

import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [PopupDirective],
    exports: [PopupDirective],
    providers:[]
})
export class NgxsuiPopupModule{}