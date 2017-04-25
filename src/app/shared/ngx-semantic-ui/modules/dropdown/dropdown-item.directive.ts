import { Directive, HostListener, ElementRef, Input, Optional } from "@angular/core";
import { DropdownSelectionDirective } from "./dropdown-selection.directive";

@Directive({ selector: ".item", host: { "[class.filtered]": "isFiltered" } })
export class DropdownItemDirective {

    @Input("value") value: string;

    get label(): string {
        return this.element.nativeElement.innerHTML;
    }

    public isFiltered: boolean = false;

    constructor(public element: ElementRef) {
    }
}
