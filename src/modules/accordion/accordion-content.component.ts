import { Input, Directive, Optional, ElementRef, OnInit, HostListener, Renderer2, HostBinding, AfterContentInit } from "@angular/core";
import { TransitionService } from "../transition";
import { AccordionDirective } from "./accordion.directive";

@Directive({ selector: ".content" })
export class AccordionContentComponent implements AfterContentInit {

    private _transition: TransitionService;

    constructor(@Optional() private _accordion: AccordionDirective, private _renderer: Renderer2, private _element: ElementRef) {
        if (this._accordion != undefined) {
            this._transition = new TransitionService(this._renderer);
        }
    }

    ngAfterContentInit() {
        if (this._accordion != undefined) {
            this._accordion.addContent(this);
        }
    }

    closeContent() {
        // TODO: Need to get easing working before doing this.
        // this._transition.animate(this._element.nativeElement, "slide down", 400, "out").then(() => {
            this._renderer.removeClass(this._element.nativeElement, "active");
        // });
    }

    showContent() {
        this._renderer.addClass(this._element.nativeElement, "active");
        // this._transition.animate(this._element.nativeElement, "slide down");
    }
}
