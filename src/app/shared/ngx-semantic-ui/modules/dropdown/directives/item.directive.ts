import { Directive, ContentChild, forwardRef, ElementRef, Renderer2, Input } from "@angular/core";

import { MenuDirective } from "./menu.directive";
import { InputDirective } from "./input.directive";

@Directive({ selector: ".item", host: { "[class.filtered]": "isFiltered" } })
export class ItemDirective {

    /**
     * The transition this item should use on its sub-menu.
     */
    private _transition: string = "slide down";
    /**
     * The duration for the animation that should be used for the animation.
     */
    private _duration: number = 400;
    /**
     * Helper property to give a duration before the menu starts its animation to close.
     */
    private _hasMouseEntered: boolean = false;
    /**
     * If this item has been filtered or not.
     */
    public isFiltered: boolean = false;
    /**
     * The value of the item in question.
     */
    @Input("value") value: string;
    /**
     * The label of this item that should be used when making labels.
     */
    get label(): string {
        return this._element.nativeElement.innerHTML;
    }
    /**
     * The text of this item that should be used when trying to do searching.
     */
    get text(): string {
        return this._element.nativeElement.innerText;
    }
    /**
     * Determines if this item has a menu or not.
     */
    get hasMenu(): boolean {
        return this.menu != null;
    }
    /**
     * Getter for the inner element of this directive.
     */
    get element(): ElementRef {
        return this._element;
    }
    /**
     * Query to see if this item has an inner menu as well.
     */
    @ContentChild(forwardRef(() => MenuDirective)) menu: MenuDirective;

    /**
     * Constuctor to deal with injecting various things.
     * @param _element The html element that is bound to this directive.
     * @param _renderer The renderer for this element.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
    }

    /**
     * Method is meant to init the menu by binding various events to the item.
     *
     * @param transition The transition the menu should follow.
     * @param duration The duration of the animation.
     */
    initializeItemMenu(transition: string, duration: number) {
        this._transition = transition;
        this._duration = duration;

        this.bindItem();
        this.menu.initializeMenu(transition, duration);
    }

    /**
     * Helper method is meant to bind mouse events to the menu to open and close the menus.
     */
    private bindItem() {
        this._renderer.listen(this._element.nativeElement, "mouseenter", () => {
            this._hasMouseEntered = true;
            if (this.menu.hidden) {
                this.menu.open(this._transition, this._duration);
            }
        });
        this._renderer.listen(this._element.nativeElement, "mouseleave", () => {
            this._hasMouseEntered = false;
            setTimeout(() => {
                if (!this._hasMouseEntered && this.menu.visible) {
                    this.menu.close(this._transition, this._duration);
                }
            }, 100);
        });
    }
}
