import { Component, HostBinding, HostListener, ElementRef, Renderer2 } from "@angular/core";
import { TransitionService } from "../../transition";

@Component({
    selector: "a.ui.label.visible.ngx-multi-select-label",
    template: "<span [innerHTML]='innerHTML'></span><i class='delete icon' (click)='remove()'></i>"
})
export class MultiSelectLabelComponent {

    private _transition: TransitionService;

    public transition: string = "horizontal flip";
    public duration: number = 200;

    innerHTML: string;
    hideAnimationCallback: () => void;
    showAnimationCallback: () => void;

    constructor(private _element: ElementRef, private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    remove() {
        this._transition.animate(this._element.nativeElement, this.transition, this.duration, "out").then(() => {
            if (this.hideAnimationCallback !== undefined) {
                this.hideAnimationCallback();

            }
        })
    }

    show() {
        this._transition.animate(this._element.nativeElement, this.transition, this.duration).then(() => {
            if (this.showAnimationCallback !== undefined) {
                this.showAnimationCallback();
            }
        });
    }
}
