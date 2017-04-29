import { Directive, ViewContainerRef } from "@angular/core";

@Directive({ selector: "i.icon" })
export class IconDirective {

    /**
     * Method is meant to inject the view container for inserting labels.
     *
     * @param container The view container pertaining to this icon.
     */
    constructor(public container: ViewContainerRef) {
    }
}
