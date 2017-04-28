import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "i.icon.dropdown" })
export class IconDropdownDirective {

    constructor(public container: ViewContainerRef) {
    }
}
