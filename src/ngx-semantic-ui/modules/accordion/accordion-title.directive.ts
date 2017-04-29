import { Input, Component, Directive, Optional, ElementRef, HostListener, Renderer } from "@angular/core";

import { AccordionDirective } from "./accordion.directive"

@Directive({ selector: ".title" })
export class AccordionTitleDirective {
 private cancelEvent: Function;

  @Input("class")
  set setActive(klass: string) {
    this._isActive = klass.indexOf("active") > -1;
  }

  private _isActive: boolean;

  get isActive(): boolean {
    return this._isActive;
  }

 constructor(@Optional() private _accordion: AccordionDirective, private _renderer: Renderer, private _element: ElementRef) {
   if (this._accordion != undefined) {
     this._accordion.addTitle(this);
   }
 }

 showEvent(event) {
   if (this._accordion != undefined) {
     this._accordion.openPanel(this);
   }
 }

 toggleEvent(event) {
   if(this._accordion != undefined ) {
     this._accordion.togglePanel(this, this._isActive);
   }
 }

 addShowEvent(event: string) {
   if (this.cancelEvent != undefined) {
     this.cancelEvent();
   }
   this.cancelEvent = this._renderer.listen(this._element.nativeElement, event, this.toggleEvent.bind(this));
 }

 closeContent() {
   this._renderer.setElementClass(this._element.nativeElement, "active", false);
   this._isActive = false;
 }

 showContent() {
   this._renderer.setElementClass(this._element.nativeElement, "active", true);
   this._isActive = true;
 }
}