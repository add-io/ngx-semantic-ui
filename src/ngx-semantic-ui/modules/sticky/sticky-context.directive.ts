import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "[stickyContext]" })
export class StickyContextDirective {

    /**
     * Getter to get the underlining html element
     */
    get element(): HTMLElement {
        return this._element.nativeElement;
    }

    /**
     * Constructor that needs to the underlining element injected into it.
     *
     * @param _element The underlining html element representing this element.
     */
    constructor(private _element: ElementRef) {
    }
}
