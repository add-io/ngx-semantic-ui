import { Directive, Input, ElementRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: "option" })
export class OptionDirective {

    @Input("value") value: string;

    get label(): string {
        return this._element.nativeElement.innerHTML;
    }

    constructor(private _element: ElementRef) {
    }
}
