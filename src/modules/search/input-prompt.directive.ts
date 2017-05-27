import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "input.prompt" })
export class InputPromptDirective {

    /**
     * The underlining html element for this input.
     */
    get element(): HTMLInputElement {
        return this._element.nativeElement;
    }

    /**
     * Constructor to get the underlining HTML element.
     *
     * @param _element The underlining HTML element.
     */
    constructor(private _element: ElementRef) {
    }
}
