import { Directive, Input, ElementRef, Renderer, HostListener } from "@angular/core";

@Directive({ selector: "[data-dropdown]:not(.ui.dropdown)" })
export class DropDownTriggerDirective {

  triggered: boolean;

  @Input("dropdown") dropdown: string;

  constructor(private _renderer: Renderer, private _element: ElementRef) {
  }

  @HostListener("click", ["$event"])
  click(event: MouseEvent) {
    if(this.triggered){
      this.triggered = false;
      this.showDropDown();
    }
    else{
      this.triggered = true;
      this.hideDropDown();
    }
    
  }

  showDropDown(){
    
  }

  hideDropDown(){
    
  }
}