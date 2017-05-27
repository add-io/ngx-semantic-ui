import { Directive, Input, HostListener, OnDestroy, OnInit } from '@angular/core';

export type Trigger = "hover" | "click" | "outsideClick" | "focus" | "manual"
export const Trigger = {
    HOVER: "hover" as Trigger,
    CLICK: "click" as Trigger,
    OUTSIDECLICK: "outsideClick" as Trigger,
    FOCUS: "focus" as Trigger,
    Manual: "manual" as Trigger
}

@Directive({ selector: "[data-tooltip]" })
export class PopupTriggerDirective implements OnDestroy, OnInit {

    @Input()
    trigger: Trigger;

    @HostListener("mouseenter")
    private onMouseEnter() {
        if (this.trigger == Trigger.HOVER) {
            this.openPopup();
        }
    }

    @HostListener("mouseleave")
    private onMouseLeave() {
        if (this.trigger == Trigger.HOVER) {
            this.closePopup();
        }
    }

    @HostListener("click")
    private onClick() {
        if (this.trigger == Trigger.CLICK || this.trigger == Trigger.OUTSIDECLICK) {
            event.stopPropagation();
            this.togglePopup();
        }
    }

    @HostListener("document:click", ["$event"])
    public onDocumentClick(event: MouseEvent) {
        if (this.trigger == Trigger.OUTSIDECLICK) {
            this.closePopup();
        }
    }

    @HostListener("focus")
    private onFocus() {
        if (this.trigger == Trigger.FOCUS) {
            this.openPopup();
        }
    }

    @HostListener("focusout")
    private onFocusOut() {
        if (this.trigger == Trigger.FOCUS) {
            this.closePopup();
        }
    }

    public ngOnDestroy () { }
    public ngOnInit (): void { }

    public togglePopup () { 

    }

    public openPopup () {

    }

    public closePopup () {

    }
    
}