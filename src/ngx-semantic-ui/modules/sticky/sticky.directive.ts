import { Directive, Optional, Input, HostListener, Renderer2, ElementRef, AfterContentInit, OnDestroy } from "@angular/core";
import { StickyContextDirective } from "./sticky-context.directive";

@Directive({ selector: ".ui.sticky" })
export class StickyDirective implements AfterContentInit, OnDestroy {

    /**
     * Variable that will store all the scroll functions so they can be cleaned up on destroy.
     */
    private _scrollFunctions: Function[];
    /**
     * Helper variable to determine how far this directive has moved the element so it can put it back in the right spot.
     */
    private _moveOffset: number = 0;
    /**
     * Input to deal with offsets for this element when scrolling.
     */
    @Input("offset") offsetInput: any;
    /**
     * Getter to process the incoming input so that it can be used by the directive.
     */
    get offset(): number {
        let offset = parseInt(this.offsetInput, 10);
        return Number.isNaN(offset) ? 0 : offset;
    }
    /**
     * Getter to get the underlining element this directive is bound to.
     */
    get element(): HTMLElement {
        return this._element.nativeElement;
    }
    /**
     * Getter to get the context in which this element can scroll in.
     */
    get context(): HTMLElement {
        return this._context == null ? null : this._context.element;
    }
    /**
     * Getter to determine if this element is visible.
     */
    get isVisible(): boolean {
        return this.element.getClientRects().length > 0;
    }
    /**
     * Getter to calculate the top of this element and this is the heart of moving this element around on the page.
     */
    get top(): number {
        let top = parseInt(this.element.style.top, 10);
        return Number.isNaN(top) ? 0 : top;
    }
    set top(top: number) {
        this._renderer.setStyle(this.element, "position", "relative");
        this._renderer.setStyle(this.element, "top", top + "px");
    }

    /**
     * Constructor to inject various services into itself.
     *
     * @param _context The context in which this div should stay in.
     * @param _renderer The renderer that is bound to this element.
     * @param _element The underlining element to this div.
     */
    constructor(@Optional() private _context: StickyContextDirective, private _renderer: Renderer2, private _element: ElementRef) {
        this._scrollFunctions = [];
    }

    /**
     * Workflow method to deal with destroying this directive, and clean up some of the events that were bound to it.
     */
    ngOnDestroy() {
        for(let i = 0; this._scrollFunctions.length; ++i) {
            this._scrollFunctions[i]();
        }
    }

    /**
     * Workflow method to walk up the DOM and find the scrollable elements that this element is a child of.
     */
    ngAfterContentInit() {
        this.findScrollable(this.element);
    }

    /**
     * Window scoll listener to deal with if the window scrolls.
     */
    @HostListener("window:scroll", ["$event"])
    windowScroll() {
        if (this.isVisible) {
            let thisRect = this.element.getBoundingClientRect();
            let contextRect = this.context === null ? null : this.context.getBoundingClientRect();
            let top = thisRect.top - this.offset;

            if ((this.context === null || contextRect.bottom > thisRect.bottom) && top < 0) {
                // Deal with going down the page.
                let offset = top;
                if (this.context !== null) {
                    let bottomContext = contextRect.bottom - thisRect.bottom;
                    offset = offset < bottomContext ? offset : bottomContext;
                }
                this._moveOffset -= offset;
                this.top -= offset;
            } else  if (0 < top && this._moveOffset > 0) {
                // Deal with coming back up the page.
                let offset = this._moveOffset < top ? this._moveOffset : thisRect.top;
                this._moveOffset -= offset;
                this.top -= offset;
            }
        }
    }

    /**
     * Helper method to bind scroll events to scrollable elements on the page.
     *
     * @param element The element to recursivly walk up until the body is found.
     */
    private findScrollable(element: HTMLElement) {
        if (element.tagName.toLowerCase() === "body") return;

        if (element.scrollHeight > element.clientHeight) {
            this._scrollFunctions.push(this._renderer.listen(element, "scroll", this.calculateScroll.bind(this, element)));
        }

        if(element.parentElement != null) {
            this.findScrollable(element.parentElement);
        }
    }

    /**
     * Helper method is meant to deal with scroll events that occur on element on the page and not just the window.
     *
     * @param element The element this scroll event is bound to.
     * @param event The event that triggered this callback.
     */
    private calculateScroll(element: HTMLElement, event: MouseEvent) {
        if (this.isVisible) {
            let elementRect = element.getBoundingClientRect();
            let thisRect = this.element.getBoundingClientRect();
            let contextRect = this.context === null ? null : this.context.getBoundingClientRect();

            let top = thisRect.top - this.offset;  // Calculate the offset.

            if ((this.context === null || contextRect.bottom > thisRect.bottom) && (elementRect.top > top || top <= 0)) {
                // Deal with going down the page.
                let offset = (elementRect.top <= 0 ? 0 : elementRect.top) - top;
                if (this.context !== null) {
                    let bottomContext = contextRect.bottom - thisRect.bottom;
                    offset = offset < bottomContext ? offset : bottomContext;
                }

                this.top += offset;
                this._moveOffset += offset;
            } else if (elementRect.top < top && this._moveOffset > 0) {
                // Deal with coming back up the page.
                let offset = top - (elementRect.top <= 0 ? 0 : elementRect.top);
                if (offset > this._moveOffset) {
                    offset = this._moveOffset;
                }
                this.top -= offset;
                this._moveOffset -= offset;
            }
        }
    }
}
