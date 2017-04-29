import { Component, HostBinding, HostListener } from "@angular/core";

@Component({
    selector: "a.ui.label.visible.ngx-multi-select-label",
    template: "<span [innerHTML]='innerHTML'></span><i class='delete icon' (click)='hideItem()'></i>"
})
export class MultiSelectLabelComponent {

    @HostBinding("style.animation-duration")
    get animationDuration(): string {
        if (this.hide) return "200ms";
        return "400ms";
    }

    @HostBinding("class.transition")
    get transition(): boolean {
        return true;
    }

    @HostBinding("class.scale")
    get scale(): boolean {
        return this.show || this.hide;
    }

    @HostBinding("class.in")
    show: boolean = false;

    @HostBinding("class.out")
    hide: boolean = false;

    innerHTML: string;
    hideAnimationCallback: () => void;
    showAnimationCallback: () => void;

    hideItem() {
        this.hide = true;
    }

    @HostListener("animationend", ["$event"])
    @HostListener("oAnimationEnd", ["$event"])
    @HostListener("mozAnimationEnd", ["$event"])
    @HostListener("webkitAnimationEnd", ["$event"])
    onAnimationEnd(event: AnimationEvent) {
        if (event.animationName === "scaleIn") {
            this.show = false;
            if (this.showAnimationCallback !== undefined) {
                this.showAnimationCallback();
            }
        } else if (event.animationName === "scaleOut") {
            this.hide = false;
            if (this.hideAnimationCallback !== undefined) {
                this.hideAnimationCallback();
            }
        }
    }
}
