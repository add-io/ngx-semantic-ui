import { Component, ContentChild, ViewChild, AfterViewInit, OnDestroy, Renderer2, Input } from "@angular/core";
import { DimmerDirective } from "./dimmer.directive";
import { TransitionService } from "../transition";
import { CommonService } from "../common.service";

@Component({
    selector: "[uiDimmer]",
    styles: [
        '.ui.dimmer { display: block !important }'
    ],
    template:
    `<ng-content></ng-content>
    <div class="ui dimmer" *ngIf="!hasContentDimmer" #dimmer></div>`
})
export class DimmerComponent implements AfterViewInit, OnDestroy {

    /**
     * The transition service to handle animations.
     */
    private _transition: TransitionService;
    /**
     * The closable callback to debind the click listener to the dimmer.
     */
    private _closableCallback: Function;
    /**
     * The transition the dimmer should use on open and close.
     */
    @Input("transition") transition: string = "fade";
    /**
     * The duration of the animation that should be used.
     */
    @Input("duration") duration: any = 500;
    /**
     * If the dimmer is closable by clicking on it.
     */
    @Input("closable") closable: string = "auto";
    /**
     * Setter to handle if a boolean is bound to the uiDimmer attribute.
     */
    @Input("uiDimmer")
    set uiDimmer(value: any) {
        if (CommonService.checkBooleanType(value)) {
            this.show();
        } else {
            this.hide();
        }
    }
    /**
     * The content dimmer if one is found as a child.
     */
    @ContentChild(DimmerDirective) contentDimmer: DimmerDirective;
    /**
     * The view dimmer if a content dimmer is not found.
     */
    @ViewChild("dimmer", { read: DimmerDirective }) viewDimmer: DimmerDirective;
    /**
     * Getter to determine that a dimmer is needed to be created.
     */
    get hasContentDimmer(): boolean {
        return this.contentDimmer != null;
    }
    /**
     * The dimmer that we need to and animations to.
     */
    get dimmer(): DimmerDirective {
        return this.hasContentDimmer ? this.contentDimmer : this.viewDimmer;
    }

    /**
     * Constructor to ask for the global renderer.
     *
     * @param _renderer The renderer to handle DOM changes.
     */
    constructor(private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    /**
     * Workflow method to handle adding a listener to the dimmer if the closable is auto.
     */
    ngAfterViewInit() {
        if (this.closable == "auto") {
            this._closableCallback = this._renderer.listen(this.dimmer.element, "click", this.hide.bind(this));
        }
    }

    /**
     * Workflow method to handle the destruction of this component and unbind the listener if one exists.
     */
    ngOnDestroy() {
        if (this._closableCallback != undefined) {
            this._closableCallback();
        }
    }

    /**
     * Helper method to show the dimmer to the client.
     */
    show() {
        if (this.dimmer != null && this.dimmer.isHidden) {
            this.dimmer.isVisible = true;
            this._transition.animate(this.dimmer.element, this.transition, parseInt(this.duration, 10));
        }
    }

    /**
     * Helper method to hide the dimmer from the client.
     */
    hide() {
        if (this.dimmer != null && this.dimmer.isVisible) {
            this._transition.animate(this.dimmer.element, this.transition, parseInt(this.duration, 10), "out").then(() => {
                this.dimmer.isVisible = false;
            });
        }
    }
}
