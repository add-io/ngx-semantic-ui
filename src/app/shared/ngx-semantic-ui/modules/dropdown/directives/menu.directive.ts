import { Directive, ContentChildren, ContentChild, QueryList, ElementRef, Renderer2, forwardRef } from "@angular/core";

import { ItemDirective } from "./item.directive";
import { SearchInputDirective } from "./search-input.directive";
import { TransitionService } from "../../";

@Directive({ selector: ".menu" })
export class MenuDirective {

    /**
     * Determines if the menu is hidden or not.
     */
    private _isHidden: boolean = true;
    /**
     * Determines if this menu is in the animation state or not.
     */
    private _isAnimating: boolean = false;
    /**
     * The transition service to create an animation on this element.
     */
    private _transition: TransitionService;
    /**
     * Getter to determine if this menu is visible.
     */
    get visible(): boolean {
        return !this._isHidden;
    }
    /**
     * Getter to determine fi the menu is hidden.
     */
    get hidden(): boolean {
        return this._isHidden;
    }
    /**
     * Query to gather all the items in this menu for initialization purposes.
     */
    @ContentChildren(forwardRef(() => ItemDirective)) items: QueryList<ItemDirective>;
    /**
     * Query to get the search input item if on exists.
     */
    @ContentChild(forwardRef(() => SearchInputDirective)) searchInput: SearchInputDirective;

    /**
     * Constructor to bind various services into it.
     *
     * @param _element The html element that is bound to this directive.
     * @param _renderer The renderer for this directive.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    /**
     * Initialization process to go down the tree and bind up the sub-menus.
     *
     * @param transition The transition to use when opening this menu.
     * @param duration The duration to use for this menu for animation.
     */
    initializeMenu(transition: string, duration: number) {
        let items = this.items.filter(x => x.hasMenu);
        for(let i = 0; i < items.length; ++i) {
            items[i].initializeItemMenu(transition, duration);
        }
    }

    /**
     * Helper method to open this menu.
     *
     * @param transition The transition that should be used when opening this menu.
     * @param duration The duration that should be used when opening this menu.
     */
    open(transition?: string, duration?: number) {
        transition = transition || "slide down";
        duration = duration || 400;

        if (this._isHidden && !this._isAnimating) {
            this._isAnimating = true;
            this._renderer.setStyle(this._element.nativeElement, "z-index", "10000");
            this._transition.removeClasses(this._element.nativeElement, "hidden");
            this._transition.addClasses(this._element.nativeElement, "visible active");
            this._transition.animate(this._element.nativeElement, transition, duration).then(() => {
                this._isAnimating = false;
            });
            this._isHidden = false;
        }
    }

    /**
     * Helper method to close the menu.
     *
     * @param transition The transition that should be used when closing this menu.
     * @param duration The duration that should be used when closing this menu.
     */
    close(transition?: string, duration?: number) {
        transition = transition || "slide down";
        duration = duration || 400;

        if (!this._isHidden && !this._isAnimating) {
            this._isAnimating = true;
            this._transition.animate(this._element.nativeElement, transition, duration, "out").then(() => {
                this._renderer.setStyle(this._element.nativeElement, "z-index", "1");
                this._transition.removeClasses(this._element.nativeElement, "visible active");
                this._transition.addClasses(this._element.nativeElement, "hidden");
                this._isHidden = true;
                this._isAnimating = false;
            });
        }
    }
}
