
import { Injectable } from '@angular/core';

import { PopupDirective } from "./popup.directive";
import { PopupTriggerDirective } from "./popup-trigger.directive";
import { TooltipDirective } from './tooltip.directive';

@Injectable()
export class PopupService { 
    public hideTrigger (): void { }
    public showTrigger (): void { }
}