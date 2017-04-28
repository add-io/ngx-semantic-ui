import { Directive, ContentChildren, ContentChild, QueryList, ElementRef, Renderer2, forwardRef } from "@angular/core";

import { ItemDirective } from "./item.directive";
import { SearchInputDirective } from "./search-input.directive";
import { TransitionService } from "../../";

@Directive({ selector: ".menu" })
export class MenuDirective {

    private _isHidden: boolean = true;
    private _isAnimating: boolean = false;
    private _transition: TransitionService;

    @ContentChildren(forwardRef(() => ItemDirective)) items: QueryList<ItemDirective>;
    @ContentChild(forwardRef(() => SearchInputDirective)) searchInput: SearchInputDirective;

    constructor(private _element: ElementRef, private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    initializeMenu() {
        let items = this.items.filter(x => x.hasMenu);
        for(let i = 0; i < items.length; ++i) {
            items[i].initializeItemMenu();
        }
    }

    get visible(): boolean {
        return !this._isHidden;
    }

    get hidden(): boolean {
        return this._isHidden;
    }

    toggle() {
        if (this._isHidden) {
            this.open();
        } else {
            this.close();
        }
    }

    open() {
        if (this._isHidden && !this._isAnimating) {
            this._isAnimating = true;
            this._renderer.setStyle(this._element.nativeElement, "z-index", "10000");
            this._transition.removeClasses(this._element.nativeElement, "hidden");
            this._transition.addClasses(this._element.nativeElement, "visible active");
            this._transition.animate(this._element.nativeElement, "slide down").then(() => {
                this._isAnimating = false;
            });
            this._isHidden = false;
        }
    }

    close() {
        if (!this._isHidden && !this._isAnimating) {
            this._isAnimating = true;
            this._transition.animate(this._element.nativeElement, "slide down", 400, "out").then(() => {
                this._renderer.setStyle(this._element.nativeElement, "z-index", "1");
                this._transition.removeClasses(this._element.nativeElement, "visible active");
                this._transition.addClasses(this._element.nativeElement, "hidden");
                this._isHidden = true;
                this._isAnimating = false;
            });
        }
    }
}
