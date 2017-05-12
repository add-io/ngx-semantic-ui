import { Directive, ElementRef, HostBinding } from "@angular/core";

@Directive({ selector: ".ui.dimmer" })
export class DimmerDirective {

    /**
     * Determine if the dimmer is visible or not.
     */
    @HostBinding("class.visible")
    @HostBinding("class.active")
    isVisible: boolean = false;
    /**
     * Determine if the dimmer is hidden or not.
     */
    @HostBinding("class.hidden")
    get isHidden(): boolean {
        return !this.isVisible;
    }
    /**
     * The underlining HTML element attached to this dimmer.
     */
    get element(): HTMLElement {
        return this._element.nativeElement;
    }

    /**
     * Constructor to build out the dimmer and ask for the underlining HTML element.
     *
     * @param _element The underling HTML element.
     */
    constructor(private _element: ElementRef) {
    }
}
