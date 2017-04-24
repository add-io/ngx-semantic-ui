import { Input, Component, Directive, Optional, ElementRef, OnInit, HostListener, Renderer, HostBinding } from "@angular/core";
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

import { AccordionDirective } from "./accordion.directive";

@Component({
  selector: ".content",
  template: "<ng-content></ng-content>",
  animations: [
      trigger("fadeMessage", [
            state("visible", style({ opacity: 1.0 })),
            state("fade", style({ opacity: 0.0 })),
            transition("visible => fade", animate(300, keyframes([ style({opacity: 1}), style({opacity: 0})]))),
            transition("fade => visible", animate(300, keyframes([ style({opacity: 0}), style({opacity: 1})])))
      ])
  ]
})
export class AccordionContentComponent implements OnInit {

  @HostBinding("@fadeMessage")
   state: string = "fade";

  @Input("class") klass: string;

  get isActive(): boolean {
    return this.klass.indexOf("active") > -1;
  }

  constructor(@Optional() private _accordion: AccordionDirective, private _renderer: Renderer, private _element: ElementRef) {
    if (this._accordion != undefined) {
      this._accordion.addContent(this);
    }
  }

  ngOnInit() {
    if (this.isActive) {
      this.state = "visible";
    }
  }

  closeContent() {
    this._renderer.setElementClass(this._element.nativeElement, "active", false);
    this.state = "fade";
  }

  showContent() {
    this._renderer.setElementClass(this._element.nativeElement, "active", true);
    this.state = "visible";
  }

}