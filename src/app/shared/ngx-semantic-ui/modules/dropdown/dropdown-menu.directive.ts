import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({ selector: ".menu" })
export class DropdownMenuDirective {

    constructor(public element: ElementRef) {
    }
}
