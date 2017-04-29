import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "input[type='text']" })
export class InputDirective {

    /**
     * The value of the input.
     */
    get value(): string {
        return this._element.nativeElement.value;
    }
    set value(val: string) {
        this._element.nativeElement.value = val;
    }
    /**
     * The element reference of this directive.
     */
    get element(): ElementRef {
        return this._element;
    }
    /**
     * The input element for this directive.
     */
    get input(): HTMLInputElement {
        return this._element.nativeElement;
    }

    /**
     * Constructor is meant to deal with the input of this element.
     *
     * @param _element The element that is bound with this directive.
     */
    constructor(private _element: ElementRef) {
    }

    /**
     * Focus the input element for processing.
     */
    focus() {
        this.input.focus();
    }

    /**
     * Clear the element after selection.
     */
    clear() {
        this.value = "";
    }
}
