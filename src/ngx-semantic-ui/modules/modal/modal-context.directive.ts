import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "[modalContext]" })
export class ModalContextDirective {

    /**
     * Constructor to configure a place on the page this modal should be bound to.
     *
     * @param element The element for the modal to use in building out where the modal should be located.
     */
    constructor(public element: ElementRef) {
    }
}
