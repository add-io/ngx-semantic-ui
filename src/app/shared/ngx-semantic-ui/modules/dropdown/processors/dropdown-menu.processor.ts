import { Directive, ContentChild, HostListener, AfterContentInit, OnDestroy } from "@angular/core";
import { MenuDirective } from "../directives";
import { DropdownService } from "../dropdown.service";
import { IDropdownProcessor } from "./dropdown-processor.interface";

export class DropdownMenuProcessor implements IDropdownProcessor {

    constructor(private _service: DropdownService, private _menu: MenuDirective) {
    }

    initilizeValue(value: any|any[]) {
    }

    ngAfterContentInit() {
        if (this._menu !== undefined) {
            this._service.add(this);
            this._menu.initializeMenu();
        }
    }

    ngOnDestroy() {
        this._service.remove(this);
    }

    trigger(event: MouseEvent) {
        if (this._menu.hidden) {
            this._service.hideAll(this);
        }
        if (this._menu.visible) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this._menu.hidden) {
            this._menu.open();
        }
    }

    close() {
        if (!this._menu.hidden) {
            this._menu.close();
        }
    }
}
