import { Directive, AfterViewInit, Input, ElementRef, Renderer2, Optional, HostBinding, ViewContainerRef } from "@angular/core";
import { ItemDirective } from "./item.directive";

@Directive({ selector: ".text", host: { "[class.filtered]": "isFiltered" } })
export class TextDirective implements AfterViewInit {

    public isFiltered: boolean = false;
    public defaultText: string = null;

    get label(): string {
        return this._element.nativeElement.innerHTML;
    }

    set label(text: string) {
        this._element.nativeElement.innerHTML = text;
        if (text != this.defaultText) {
            this._renderer.removeClass(this._element.nativeElement, "default");
        }
    }

    constructor(private _element: ElementRef, private _renderer: Renderer2, public container: ViewContainerRef) {
    }

    ngAfterViewInit() {
        this.defaultText = this._element.nativeElement.innerHTML;
    }

    public updateText(item: ItemDirective) {
        this.label = item.label;
    }
}
