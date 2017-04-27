import { Directive, Input, ElementRef, Renderer2, Optional, HostBinding, ViewContainerRef } from "@angular/core";
import { IDropdownItem } from "./dropdown-selection.directive";

@Directive({ selector: ".text", host: { "[class.filtered]": "isFiltered" } })
export class DropdownTextDirective {

    public isFiltered: boolean = false;

    constructor(public element: ElementRef, public container: ViewContainerRef) {
    }

    public updateText(item: IDropdownItem) {
        this.element.nativeElement.innerHTML = item.label;
    }
}
