import { Directive, ElementRef, Renderer2, HostBinding, Input } from "@angular/core";

@Directive({ selector: ".side" })
export class SideDirective {

    /**
     * The current state this side is in.
     */
    private _state: string = "none";
    /**
     * The bounds of the element before animation starts, this needs to not be updated during animation.
     */
    private _bounds: ClientRect = null;
    /**
     * Determine if this side is active or not.
     */
    @HostBinding("class.active")
    isActive: boolean = false;
    /**
     * Determine if this side is animating
     */
    @HostBinding("class.animating")
    isAnimating: boolean = false;
    /**
     * Binding to keep track of the hidden class for this element.
     */
    @HostBinding("class.hidden")
    get hidden(): boolean {
        return this.isAnimating && this.isActive;
    }
    /**
     * Binding to keep track of the top style of this element.
     */
    @HostBinding("style.top")
    get top() {
        if (!this.isAnimating || this.isActive) return null;
        return "0px";
    }
    /**
     * Binding to keep track of the width style of this element.
     */
    @HostBinding("style.width")
    get width() {
        if (!this.isAnimating) return null;
        return this._bounds.width + "px";
    }
    /**
     * Binding to keep track of the height style of this element.
     */
    @HostBinding("style.height")
    get height() {
        if (!this.isAnimating) return null;
        return this._bounds.height + "px";
    }
    /**
     * Input to determine if this is the active starting side or not.
     */
    @Input("class")
    set klass(klass: string) {
        this.isActive = klass.indexOf("active") > -1;
    }
    /**
     * the current state of this side and what transform should be used during that state.
     */
    set state(state: string) {
        this._state = state;
        let translate: string = "";
        this._bounds = this.bounds;
        switch(state) {
            case "up":
                this.isAnimating = true;
                translate = this.isActive ?
                    "rotateX(0deg) translateZ(" + (this.bounds.height / 2) + "px)"
                    : "rotateX(90deg) translateZ(" + (this.bounds.height / 2) + "px)";

                this._renderer.setStyle(this.element, "transform", translate);
                break;
            case "down":
                this.isAnimating = true;
                translate = this.isActive ?
                    "rotateX(0deg) translateZ(" + (this.bounds.height / 2) + "px)"
                    : "rotateX(-90deg) translateZ(" + (this.bounds.height / 2) + "px)";

                this._renderer.setStyle(this.element, "transform", translate);
                break;
            case "left":
                this.isAnimating = true;
                translate = this.isActive ?
                    "rotateY(0deg) translateZ(" + (this.bounds.width / 2) + "px)"
                    : "rotateY(-90deg) translateZ(" + (this.bounds.width / 2) + "px)";
                this._renderer.setStyle(this.element, "transform", translate);
                break;
            case "right":
                this.isAnimating = true;
                translate = this.isActive ?
                    "rotateY(0deg) translateZ(" + (this.bounds.width / 2) + "px)"
                    : "rotateY(90deg) translateZ(" + (this.bounds.width / 2) + "px)";
                this._renderer.setStyle(this.element, "transform", translate);
                break;
            case "back":
            case "over":
                this.isAnimating = true;
                translate = this.isActive ? "rotateY(0deg)" : "rotateY(-180deg)";
                this._renderer.setStyle(this.element, "transform", translate);
                break;
            case "none":
                this.isActive = !this.isActive;
                this.isAnimating = false;
                this._renderer.removeStyle(this.element, "transform");
                break;
        }
    }
    get state(): string {
        return this._state;
    }
    /**
     * Getter for the html element representing this directive.
     */
    get element(): HTMLElement {
        return this._element.nativeElement;
    }
    /**
     * Getter to determine the bounds of this element for calculations in transformation.
     */
    get bounds(): ClientRect {
        if (this.isActive) {
            return this.element.getBoundingClientRect();
        } else {
            this._renderer.addClass(this.element, "active");
            let bounds = this.element.getBoundingClientRect();
            this._renderer.removeClass(this.element, "active");
            return bounds;
        }
    }

    /**
     * Constructor to bind the renderer and element to this directive.
     *
     * @param _element The element of the underlining html.
     * @param _renderer The renderer to comunicate with the html.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
    }
}
