import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { TransitionService } from "../";

@Directive({ selector: ".menu" })
export class DropdownMenuDirective {
    private _transition: TransitionService;
    private _isAnimating: boolean;

    get isAnimating(): boolean { return this._isAnimating; }

    constructor(private _element: ElementRef, private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    triggerAnimation(open: boolean) {
        this._isAnimating = true;
        if (open) {
            this._renderer.removeClass(this._element.nativeElement, "hidden");
            this._renderer.addClass(this._element.nativeElement, "visible");
            this._transition.animate(this._element.nativeElement, "slide down").then(() => {
                this._isAnimating = false;
            });
        } else {
            this._transition.animate(this._element.nativeElement, "slide down", 200, "out").then(() => {
                this._renderer.removeClass(this._element.nativeElement, "visible");
                this._renderer.addClass(this._element.nativeElement, "hidden");
                this._isAnimating = false;
            });
        }
    }
}
