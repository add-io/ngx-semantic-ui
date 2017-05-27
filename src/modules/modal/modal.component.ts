import { Component, Renderer2, Input, Output, EventEmitter, ElementRef, HostListener, Optional } from "@angular/core";
import { TransitionService } from "../";
import { ModalService } from "./modal.service";
import { ModalContextDirective } from "./modal-context.directive";

@Component({
    selector: ".ui.modal",
    template: "<ng-content></ng-content>"
})
export class ModalComponent {

    /**
     * The dimmer that will be shown behind the modal when opened.
     */
    private _dimmer: any;
    /**
     * The transition service to add in animations to the DOM.
     */
    private _transition: TransitionService;
    /**
     * The mutation observer to deal with changes on the DOM to refresh the modal.
     */
    private _mutations: MutationObserver;
    /**
     * Determine if the modal is active.
     */
    isActive: boolean;
    /**
     * Determine if the modal is hidden.
     */
    isHidden: boolean;
    /**
     * Input to check if we need to observe changes on the DOM.
     */
    @Input("observeChanges") observeChanges: boolean|string|number = true;
    /**
     * Input to allow for multiple modals to be open on the page at once.
     */
    @Input("allowMultiple") allowMultiple: boolean|string|number = false;
    /**
     * Input to allow the dimmer to close if it is clicked.
     */
    @Input("closable") closable: boolean|string|number = true;
    /**
     * Input to get the transition style that needs to be used for animations.
     */
    @Input("transition") transition: string = "scale";
    /**
     * Input to determine how long the animation will take.
     */
    @Input("duration") duration: number = 400;
    /**
     * Output when the modal is about to be shown.
     */
    @Output("show") onShow: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Output when the modal is shown and all animations have ended.
     */
    @Output("visible") onVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Output when the modal is about to be hidden.
     */
    @Output("hide") onHide: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Output when the modal is hidden and all animations have stopped.
     */
    @Output("hidden") onHidden: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Output when the modal is approved.
     */
    @Output("approve") onApprove: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Output when the modal is denied.
     */
    @Output("deny") onDeny: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Getter to gather the context in which the modal will be moved to.
     */
    get context(): any {
        return this._context == null ? document.body : this._context.element.nativeElement;
    }
    /**
     * Getter to determine if the modal should be observing changes.
     */
    get isObservingChanges(): boolean {
        return this.checkBooleanType(this.observeChanges);
    }
    /**
     * Getter to determine if the modal should allow for multiples.
     */
    get isAllowedMultiple(): boolean {
        return this.checkBooleanType(this.allowMultiple);
    }
    /**
     * Getter to determine if the dimmer can be closable.
     */
    get isClosable(): boolean {
        return this.checkBooleanType(this.closable);
    }

    /**
     * Constructor to build out the modal.
     *
     * @param _renderer The renderer that will mainly interact with the underlining page.
     * @param _elementRef The element reference of this modal.
     * @param _service The modal service to track all modals that are active at the moment.
     * @param _context The context in which this modal should be bound to.
     */
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _service: ModalService, @Optional() private _context: ModalContextDirective) {
        this.isActive = false;
        this.isHidden = true;
        this._transition = new TransitionService(this._renderer);

        this._dimmer = this._renderer.createElement("div");
        this.addClasses(this._dimmer, "ui", "page", "dimmer", "visible", "active");
        this._renderer.listen(this._dimmer, "click", this.onCloseWithDimmer.bind(this));

        this.bindAnimationEnd();
        this._mutations = new MutationObserver(this.onMutation.bind(this));
        this._mutations.observe(this._dimmer, { childList: true, subtree: true, attributes: true });
    }

    /**
     * Method is meant to stop propagation of the click event down to the dimmer so that the modal will not close
     * if it is clicked.
     *
     * @param event The mouse event object for when the modal is clicked.
     */
    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Method will open the modal and add it to the list of modals in the system.
     */
    open() {
        this.isActive = true;
        this._service.push(this, !this.isAllowedMultiple);
    }

    /**
     * Will approve the modal and close it.
     *
     * @param finish If a modal needs to close all other modals because the modal chain is finished processing.
     */
    approve(finish?: boolean) {
        this.onApprove.emit();
        this.close(finish);
    }

    /**
     * Will deny the modal and close it.
     *
     * @param finish If a modal needs to close all other modals because the modal chain is finished processing.
     */
    deny(finish?: boolean) {
        this.onDeny.emit();
        this.close(finish);
    }

    /**
     * Will close the modal.
     *
     * @param finish If a modal needs to close all other modals because the modal chain is finished processing.
     */
    close(finish?: boolean) {
        this.isActive = false;
        if (finish === true) {
            this._service.clearModals();
        } else {
            this._service.pop();
        }
    }

    /**
     * Will show the modal on the page.
     */
    show() {
        this.isHidden = false;
        this.onShow.emit();

        this.addClasses(this._elementRef.nativeElement, "visible", "active");
        this._transition.animate(this._elementRef.nativeElement, this.transition, this.duration);
        if (!this._service.hasActiveModal) {
            this._transition.animate(this._dimmer, "fade");
        }

        this._renderer.appendChild(this._dimmer, this._elementRef.nativeElement);
        this._renderer.appendChild(this.context, this._dimmer);
        this._renderer.addClass(document.body, "dimmed");

        setTimeout(() => {
            this.refresh();
        });
    }

    /**
     * Will hide the modal from the page.
     */
    hide() {
        this.isHidden = true;
        this.onHide.emit();
        this._renderer.removeChild(this._dimmer, this._elementRef.nativeElement);
        this._renderer.removeChild(this.context, this._dimmer);
        this._renderer.removeClass(document.body, "dimmed");
    }

    /**
     * Callback to deal with if the dimmer can close the modal or not.
     */
    private onCloseWithDimmer() {
        if (this.isClosable) {
            this.close();
        }
    }

    /**
     * Callback to deal with DOM mutations and refresh the modal on those.
     */
    private onMutation() {
        if (this.isActive && this.isObservingChanges) {
            this.refresh();
        }
    }

    /**
     * Callback to deal with extra operations when animations end.
     *
     * @param event The animation event object.
     */
    private onAnimationEnd(event: AnimationEvent) {
        if (event.animationName.toLowerCase().indexOf("in") > -1) {
            this.onShow.emit();
        } else if (event.animationName.toLowerCase().indexOf("out") > -1) {
            this.onHidden.emit();
        }
    }

    /**
     * Helper method that will update refresh the modal by updating positions and determine if the content of the modal
     * needs to be scrollable or not.
     */
    private refresh() {
        let windowHeight = this.context.offsetHeight;
        let eleHeight = this._elementRef.nativeElement.offsetHeight;
        let top = (windowHeight - eleHeight) / 2;

        this._renderer.setStyle(this._elementRef.nativeElement, "top", top + "px");
    }

    /**
     * Helper method that will add animation events to this modal so that extra operations can happen at the end of them.
     */
    private bindAnimationEnd() {
        let element = this._renderer.createElement("div");
        let animations  = {
            'animation'       :'animationend',
            'OAnimation'      :'oAnimationEnd',
            'MozAnimation'    :'mozAnimationEnd',
            'WebkitAnimation' :'webkitAnimationEnd'
        };

        for(let animation in animations) {
            if (element.style[animation] !== undefined) {
                this._renderer.listen(this._elementRef.nativeElement, animations[animation], this.onAnimationEnd.bind(this));
                break;
            }
        }
    }

    /**
     * Helper method to add classes to the element given.
     *
     * @param ele The element we need to add classes to.
     * @param classes A list of classes that need to be added to the element.
     */
    private addClasses(ele: any, ...classes: string[]) {
        for(let i = 0; i < classes.length; ++i) {
            this._renderer.addClass(ele, classes[i]);
        }
    }

    /**
     * Helper method to convert the string|number to a bollean.
     *
     * @param boolType The boolean type we need to process.
     */
    private checkBooleanType(boolType: boolean|string|number) {
        return boolType === "true"
            || boolType === true
            || boolType === "1"
            || boolType === 1;
    }
}
