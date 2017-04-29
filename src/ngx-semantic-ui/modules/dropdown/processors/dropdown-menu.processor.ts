import { Directive, ContentChild, HostListener, AfterContentInit, OnDestroy } from "@angular/core";
import { MenuDirective } from "../directives";
import { DropdownService } from "../dropdown.service";
import { IDropdownProcessor } from "./dropdown-processor.interface";
import { IDropdownSettings } from "../dropdown-settings.interface";

export class DropdownMenuProcessor implements IDropdownProcessor {

    /**
     * Constructor of the processor to deal with the menu variant of this dropdown directive.
     *
     * @param _settings The settings for this dropdown that should be used to configure the dropdown to work in different ways.
     * @param _service The dropdown service that will need to be used to hide other dropdowns when this one is opened.
     * @param _menu The menu directive that was found through a query.
     */
    constructor(private _settings: IDropdownSettings, private _service: DropdownService, private _menu: MenuDirective) {
    }

    /**
     * Helper method that will be called if this processor needs to deal with a default value.
     */
    initilizeValue(value: any|any[]) {
    }

    /**
     * Workflow callback that will be called after content is initilized.
     */
    ngAfterContentInit() {
        if (this._menu !== undefined) {
            this._service.add(this);
            this._menu.initializeMenu(this._settings.transition, this._settings.duration);
        }
    }

    /**
     * Workflow callback that will be called when the processor is destroyed.
     */
    ngOnDestroy() {
        this._service.remove(this);
    }

    /**
     * Helper method that will be called when the event to trigger this element has been called.
     */
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

    /**
     * Helper method to open this dropdown element.
     */
    open() {
        if (this._menu.hidden) {
            this._menu.open(this._settings.transition, this._settings.duration);
        }
    }

    /**
     * Helper method to close this dropdown element.
     */
    close() {
        if (!this._menu.hidden) {
            this._menu.close(this._settings.transition, this._settings.duration);
        }
    }
}
