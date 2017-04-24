import { Directive, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener } from "@angular/core";

import { DropdownMenuDirective } from "./dropdown-menu.directive";
import { TransitionService } from "../";

export interface IDropdownItem {
    value: string;
    label: string;
}

@Directive({ selector: ".ui.dropdown.selection" })
export class DropdownSelectionDirective implements AfterViewInit {

    private _isOpen: boolean = false;
    private _transition: TransitionService;

    selectedItem: IDropdownItem = null;

    @HostBinding("class.active")
    @HostBinding("class.visible")
    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(open: boolean) {
        this._isOpen = open;

        if (open) {
            this._renderer.removeClass(this.menu.element.nativeElement, "hidden");
            this._renderer.addClass(this.menu.element.nativeElement, "visible");
            this._transition.animate(this.menu.element.nativeElement, "slide down");
        } else {
            this._renderer.removeClass(this.menu.element.nativeElement, "visible");
            this._renderer.addClass(this.menu.element.nativeElement, "hidden");
            this._transition.animate(this.menu.element.nativeElement, "slide down", 400, "out");
        }
    }

    @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;

    constructor(private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    @HostListener("click", ["$event"])
    click() {
        this.isOpen = true;
    }

    selectItem(item: IDropdownItem) {
        this.selectedItem = item;
    }

    ngAfterViewInit() {

    }
}
