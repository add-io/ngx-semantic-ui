import { Input, Component, Directive, Optional, ElementRef, HostListener, Renderer } from "@angular/core";

@Directive({ selector: ".ui.dropdown" })
export class DropDownDirective {

  @Input("dropdown") dropdown: string;

  constructor(private _renderer: Renderer, private _element: ElementRef) {
  }
}
