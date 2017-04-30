import { Directive, ElementRef } from "@angular/core";

@Directive({ selector: "[stickyContext]" })
export class StickyContextDirective {

    get element(): ElementRef {
        return this._element;
    }

    constructor(private _element: ElementRef) {
    }
}
