import { Directive, ContentChild, HostListener, AfterContentInit, OnDestroy } from "@angular/core";
import { MenuDirective } from "../directives";
import { DropdownService } from "../dropdown.service";
import { IDropdownProcessor } from "./dropdown-processor.interface";
import { IDropdownSettings } from "../dropdown-settings.interface";

export class DropdownMenuProcessor implements IDropdownProcessor {

    constructor(private _settings: IDropdownSettings, private _service: DropdownService, private _menu: MenuDirective) {
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
            this._menu.open(this._settings.transition, this._settings.duration);
        }
    }

    close() {
        if (!this._menu.hidden) {
            this._menu.close(this._settings.transition, this._settings.duration);
        }
    }
}
