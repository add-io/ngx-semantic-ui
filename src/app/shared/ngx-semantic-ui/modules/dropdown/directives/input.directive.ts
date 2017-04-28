import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "input[type='text']" })
export class InputDirective {

    get value(): string {
        return this._element.nativeElement.value;
    }

    set value(val: string) {
        this._element.nativeElement.value = val;
    }

    get element(): ElementRef {
        return this._element;
    }

    get input(): HTMLInputElement {
        return this._element.nativeElement;
    }

    constructor(private _element: ElementRef) {
    }

    focus() {
        this.input.focus();
    }

    clear() {
        this.value = "";
    }
}
