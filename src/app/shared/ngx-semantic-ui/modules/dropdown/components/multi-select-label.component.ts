import { Component, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { TransitionService } from "../../transition";

@Component({
    selector: "a.ui.label.visible.ngx-multi-select-label",
    template: "<span [innerHTML]='innerHTML'></span><i class='delete icon' (click)='remove()'></i>"
})
export class MultiSelectLabelComponent {

    /**
     * Transition service that is used to create animations in the semantic system.
     */
    private _transition: TransitionService;
    /**
     * The transition that should be used when animating.
     */
    public transition: string = "horizontal flip";
    /**
     * The animation duration that this should follow.
     */
    public duration: number = 200;

    /**
     * The inner html that should be printed for this label.
     */
    innerHTML: string;
    /**
     * The internal callback for the processor so the label can be processed after animation is done.
     */
    hideAnimationCallback: () => void;
    /**
     * The internal callback for the processor so the label can be processed after animation is done.
     */
    showAnimationCallback: () => void;

    /**
     * Constructor to inject various services.
     *
     * @param _element The element that this component represents.
     * @param _renderer The renderer for this element.
     */
    constructor(private _element: ElementRef, private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    /**
     * Triggers the animation that should remove this component from the DOM.
     */
    remove() {
        this._transition.animate(this._element.nativeElement, this.transition, this.duration, "out").then(() => {
            if (this.hideAnimationCallback !== undefined) {
                this.hideAnimationCallback();

            }
        })
    }

    /**
     * Triggers the show animation for the label.
     */
    show() {
        this._transition.animate(this._element.nativeElement, this.transition, this.duration).then(() => {
            if (this.showAnimationCallback !== undefined) {
                this.showAnimationCallback();
            }
        });
    }
}
