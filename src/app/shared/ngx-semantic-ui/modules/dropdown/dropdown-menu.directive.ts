import { Directive, ElementRef, HostBinding, ViewContainerRef } from "@angular/core";

@Directive({ selector: ".menu" })
export class DropdownMenuDirective {

    constructor(public element: ElementRef) {
    }
}
