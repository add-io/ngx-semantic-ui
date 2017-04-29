import { Input, Component, Directive, Optional, SkipSelf, ElementRef, HostListener, Renderer } from "@angular/core";

import { AccordionTitleDirective } from "./accordion-title.directive"
import { AccordionContentComponent } from "./accordion-content.component"

export interface IAccordionPanels {
 title: AccordionTitleDirective;
 content?: AccordionContentComponent;
 //active: boolean;
}

@Directive({ selector: ".accordion" })
export class AccordionDirective {
 private _panels: IAccordionPanels[];
 private _on: string = "click";

 @Input("on")
 set setOn(event: string) {
   this._on = event;
   for(let i = 0; i < this._panels.length; ++i) {
     this._panels[i].title.addShowEvent(this._on);
   }
 }

 constructor() {
   this._panels = [];
 }

 addTitle(title: AccordionTitleDirective) {
   this._panels.push({
     title: title
   });
   title.addShowEvent(this._on);
 }

 addContent(content: AccordionContentComponent) {
   let panel = this._panels.find(x => x.content == undefined);
   if (panel !== undefined) {
     panel.content = content;
   }
 }

 togglePanel(title: AccordionTitleDirective, isActive: boolean){
  let panel = this._panels.find(x => x.title === title);

this.closePanels();
   if (panel !== undefined) {
     if(isActive)
     {
        panel.title.closeContent();
        panel.content.closeContent();
     }
     else
     {
        panel.title.showContent();
        panel.content.showContent();
     }
   }
 }

 openPanel(title: AccordionTitleDirective) {
   this.closePanels();

   let panel = this._panels.find(x => x.title === title);

   if (panel !== undefined) {
     panel.title.showContent();
     panel.content.showContent();
   }
 }

 closePanels() {
   for(let i = 0; i < this._panels.length; ++i) {
     this._panels[i].title.closeContent();
     this._panels[i].content.closeContent();
   }
 }
}