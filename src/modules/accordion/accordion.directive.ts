import { Input, Component, Directive, Optional, SkipSelf, ElementRef, HostListener, Renderer } from "@angular/core";

import { AccordionTitleDirective } from "./accordion-title.directive"
import { AccordionContentComponent } from "./accordion-content.component"

export interface IAccordionPanels {
    title: AccordionTitleDirective;
    content?: AccordionContentComponent;
    active?: boolean;
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
            title: title,
            active: this._panels.findIndex(x => x.active) === -1 ? title.active : false
        });
        title.addShowEvent(this._on);
    }

    addContent(content: AccordionContentComponent) {
        let panel = this._panels.find(x => x.content == undefined);
        if (panel !== undefined) {
            panel.content = content;
        }
    }

    togglePanel(title: AccordionTitleDirective) {
        let panel = this._panels.find(x => x.title === title);

        if (panel.active) {
            panel.title.closeContent();
            panel.content.closeContent();
            panel.active = false;
        } else {
            this.closePanels();

            panel.title.showContent();
            panel.content.showContent();
            panel.active = true;
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
            if (this._panels[i].active) {
                this._panels[i].title.closeContent();
                this._panels[i].content.closeContent();
                this._panels[i].active = false;
            }
        }
    }
}
