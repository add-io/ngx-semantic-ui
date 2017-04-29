import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";

import { DropdownSelectDirective } from "../dropdown-select.directive";
import { BehaviorSubject } from "rxjs";
import { ItemDirective } from "../directives";

@Component({
    selector: "ngx-dropdown-select",
    template:
`<div class="ui dropdown selection" *ngIf="!isMultiple" [allowReselection]="allowReselection" [action]="action" [minCharacters]="minCharacters" [match]="match" [maxSelections]="maxSelections" [labelTransition]="labelTransition" [labelDuration]="labelDuration" [transition]="transition" [duration]="duration" [search]='isSearch' (change)="change($event)" #dropdown>
    <input type="hidden" />
    <i class="dropdown icon"></i>
    <div class="default text">{{defaultText}}</div>
    <div class="menu">
        <div class="item" *ngFor="let item of items" data-value="{{item.value}}">{{item.label}}</div>
    </div>
</div>
<div class="ui dropdown selection multiple" *ngIf="isMultiple" [allowReselection]="allowReselection" [action]="action" [minCharacters]="minCharacters" [match]="match" [maxSelections]="maxSelections" [labelTransition]="labelTransition" [labelDuration]="labelDuration" [transition]="transition" [duration]="duration" [search]='isSearch' (change)="change($event)" #dropdown>
    <input type="hidden" />
    <i class="dropdown icon"></i>
    <div class="default text">{{defaultText}}</div>
    <div class="menu">
        <div class="item" *ngFor="let item of items" data-value="{{item.value}}">{{item.label}}</div>
    </div>
</div>`
})
export class DropdownSelectComponent implements AfterViewInit {

    directive: DropdownSelectDirective = null;

    allowReselection: boolean = false;
    action: string = "activate";
    minCharacters: number = 1;
    match: string = "both";
    maxSelections: number|boolean = false;
    labelTransition: string = "horizontal flip";
    labelDuration: number = 200;
    transition: string = "slide down";
    duration: number = 200;

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

    change(item: ItemDirective|ItemDirective[]) {
        if (this.directive !== null) {
            this.directive.onChange(item);
        }
    }
}
