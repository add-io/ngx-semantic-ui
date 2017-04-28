import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "i.icon" })
export class IconDirective {

    constructor(public container: ViewContainerRef) {
    }
}
