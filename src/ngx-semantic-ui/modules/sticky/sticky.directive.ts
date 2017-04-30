import { Directive, Optional, HostListener, Renderer2 } from "@angular/core";
import { StickyContextDirective } from "./sticky-context.directive";

@Directive({ selector: ".ui.sticky" })
export class StickyDirective {

    constructor(@Optional() private _context: StickyContextDirective, private _renderer: Renderer2) {
        console.log("binding sticky");
        this._renderer.listen((this._context == null ? window : this._context.element.nativeElement) , "scroll", (event) => {
            console.log("scrolling now");
        });
    }
}
