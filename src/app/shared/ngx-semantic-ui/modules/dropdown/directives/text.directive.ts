import { Directive, AfterViewInit, Input, ElementRef, Renderer2, Optional, HostBinding, ViewContainerRef } from "@angular/core";
import { ItemDirective } from "./item.directive";

@Directive({ selector: ".text", host: { "[class.filtered]": "isFiltered" } })
export class TextDirective implements AfterViewInit {

    /**
     * Determine if this text element is filtered.
     */
    public isFiltered: boolean = false;
    /**
     * The default text that should be used if nothing is selected.
     */
    public defaultText: string = null;
    /**
     * The label of this text element.
     */
    get label(): string {
        return this._element.nativeElement.innerHTML;
    }
    set label(text: string) {
        this._element.nativeElement.innerHTML = text;
        if (text != this.defaultText) {
            this._renderer.removeClass(this._element.nativeElement, "default");
        }
    }

    /**
     * Initialization process to go down the tree and bind up the sub-menus.
     *
     * @param _element The html element that is bound to this directive.
     * @param _renderer The renderer for this directive.
     * @param container The container for this directive.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2, public container: ViewContainerRef) {
    }

    /**
     * Workflow callback to get the default text for this element.
     */
    ngAfterViewInit() {
        this.defaultText = this._element.nativeElement.innerHTML;
    }

    /**
     * Helper method to update the text.
     *
     * @param item The item that needs to update the text on this directive.
     */
    public updateText(item: ItemDirective) {
        this.label = item.label;
    }
}
