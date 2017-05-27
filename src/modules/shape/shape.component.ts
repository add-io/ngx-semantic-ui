import { Component, ContentChild, AfterContentInit, HostBinding, Input } from "@angular/core";
import { SidesDirective } from "./sides.directive";

@Component({
    selector: ".ui.shape",
    template: "<ng-content></ng-content>"
})
export class ShapeComponent implements AfterContentInit {

    /**
     * The current bounds of this shape element.
     */
    private _bounds: ClientRect = null;
    /**
     * The input duration for this shape.
     */
    @Input("duration") duration: any;
    /**
     * If this shape is being animated or not.
     */
    @HostBinding("class.animating")
    isAnimating: boolean = false;
    /**
     * Binding to deal with the width style element for this component.
     */
    @HostBinding("style.width")
    get width() {
        if (this._bounds === null) return null;
        return this._bounds.width + "px";
    }
    /**
     * Binding to deal with the height style element for this component.
     */
    @HostBinding("style.height")
    get height() {
        if (this._bounds === null) return null;
        return this._bounds.height + "px";
    }
    /**
     * The current sides container that will process all the sides.
     */
    @ContentChild(SidesDirective) sides: SidesDirective;

    /**
     * Workflow method that will deal with processing the duration once the content is initialized.
     */
    ngAfterContentInit() {
        if (this.duration != null) {
            this.sides.duration = parseInt(this.duration);
        }
    }

    /**
     * Method will flip up the shape.
     */
    flipUp() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processUp().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Method will flip down the shape.
     */
    flipDown() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processDown().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Method will flip left the shape.
     */
    flipLeft() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processLeft().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Method will flip right the shape.
     */
    flipRight() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processRight().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Method will make the shape do a card flip.
     */
    flipOver() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processOver().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Method will make the shape do a back card flip.
     */
    flipBack() {
        this.triggerAnimation(() => {
            this._bounds = this.sides.bounds;
            this.isAnimating = true;
            this.sides.processBack().then(() => {
                this._bounds = null;
                this.isAnimating = false;
            });
        });
    }

    /**
     * Helper method is meant to deal with processing the animation events and now allow more than one at a time
     *
     * @param callback the callback that should be ran to process the animation.
     */
    private triggerAnimation(callback: Function) {
        if (!this.isAnimating) {
            callback();
        }
    }
}
