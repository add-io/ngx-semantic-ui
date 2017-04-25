import { Directive, Input, ElementRef, Renderer2, Optional, HostBinding } from "@angular/core";
import { DropdownSelectionDirective } from "./dropdown-selection.directive";

@Directive({ selector: ".text", host: { "[class.filtered]": "isFiltered" } })
export class DropdownTextDirective {

    public isFiltered: boolean = false;

    constructor(public element: ElementRef) {
    }
}
