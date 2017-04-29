import { Directive, Renderer2, Input, ElementRef, ViewContainerRef } from "@angular/core";

@Directive({ selector: "option" })
export class OptionDirective {

    /**
     * The value fo this option.
     */
    @Input("value") value: string;
    /**
     * The inner text of the menu used for the label.
     */
    get label(): string {
        return this._element.nativeElement.innerHTML;
    }

    /**
     * Constructor to bind various services into it.
     *
     * @param _element The html element that is bound to this directive.
     * @param _renderer The renderer for this directive.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
    }
}
