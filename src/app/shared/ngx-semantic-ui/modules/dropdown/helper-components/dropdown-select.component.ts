import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";

import { DropDownDirective } from "../dropdown.directive";
import { BehaviorSubject } from "rxjs";
import { IDropdownItem } from "../dropdown-selection.directive";

@Component({
    selector: "ngx-dropdown",
    template:
`<div class="ui dropdown selection" [multiple]='isMultiple' [search]='isSearch' (change)="change($event)" #dropdown>
    <i class="dropdown icon"></i>
    <div class="default text">{{defaultText}}</div>
    <div class="menu">
        <div class="item" *ngFor="let item of items" data-value="{{item.value}}">{{item.label}}</div>
    </div>
</div>`
})
export class DropdownSelectComponent implements AfterViewInit {

    isOpen: boolean = false;
    directive: DropDownDirective = null;

    get defaultText(): string {
        if (this.directive !== null) {
            let option = this.directive.options.find(x => x.value === "" || x.value === null || x.value === undefined);
            if (option !== undefined) {
                return option.label;
            }
        }
        return "";
    }

    get items(): any[] {
        if (this.directive !== null) {
            return this.directive.options.filter(x => !(x.value === "" || x.value === null || x.value === undefined));
        }
        return [];
    }

    get isMultiple(): boolean {
        return this.directive !== null && this.directive.multiple !== undefined;
    }

    get isSearch(): boolean {
        return this.directive !== null && this.directive.klass.indexOf("search") > -1;
    }

    @ViewChild("dropdown") dropdown: ElementRef;

    constructor(private _renderer: Renderer2) {

    }

    ngAfterViewInit() {
        if (this.directive !== null) {
            let classes = this.directive.klass.split(" ").filter(x => x != "ui" && x != "dropdown" && x != "selection" && x != "multiple");
            for(let i = 0; i < classes.length; ++i) {
                this._renderer.addClass(this.dropdown.nativeElement, classes[i]);
            }
        }
    }

    change(item: IDropdownItem|IDropdownItem[]) {
        if (this.directive !== null) {
            this.directive.onChange(item);
        }
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }
}
