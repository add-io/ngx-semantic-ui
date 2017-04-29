import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from "@angular/core";

import { DropdownSelectDirective } from "../dropdown-select.directive";
import { BehaviorSubject } from "rxjs";
import { ItemDirective } from "../directives";

@Component({
    selector: "ngx-internal-dropdown-select",
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

    /**
     * The dropdown directive this component should be bound to.
     */
    directive: DropdownSelectDirective = null;
    /**
     * Configuration that allows for the selection to be reselected.
     */
    allowReselection: boolean = false;
    /**
     * The action that should be taken when an item is selected.
     */
    action: string = "activate";
    /**
     * The minimum amount of characters needed before search filter is done.
     */
    minCharacters: number = 1;
    /**
     * Which element on the items should be searched on, can either be value or text.
     */
    match: string = "both";
    /**
     * Max selections that can be selected in a multi select dropdown.
     */
    maxSelections: number|boolean = false;
    /**
     * The transition that should be used for the inserting of lables in a multi select dropdown.
     */
    labelTransition: string = "horizontal flip";
    /**
     * The label duration that should be used for in multi select dropdowns.
     */
    labelDuration: number = 200;
    /**
     * The transition the menu should take when opening or closing.
     */
    transition: string = "slide down";
    /**
     * The duration of the transition that should be used for the opening and closing of the transition.
     */
    duration: number = 200;
    /**
     * Getter to calculate the default text that should be used for the placeholder for this element.
     */
    get defaultText(): string {
        if (this.directive !== null) {
            let option = this.directive.options.find(x => x.value === "" || x.value === null || x.value === undefined);
            if (option !== undefined) {
                return option.label;
            }
        }
        return "";
    }
    /**
     * Getter for calculating the items that need to be rendered.
     */
    get items(): any[] {
        if (this.directive !== null) {
            return this.directive.options.filter(x => !(x.value === "" || x.value === null || x.value === undefined));
        }
        return [];
    }
    /**
     * Getter determine if this element is a multiple select or not.
     */
    get isMultiple(): boolean {
        return this.directive !== null && this.directive.multiple !== undefined;
    }
    /**
     * Getter will determine if this is a searchable element or not.
     */
    get isSearch(): boolean {
        return this.directive !== null && this.directive.klass.indexOf("search") > -1;
    }
    /**
     * Child element that represents the dropdown element in the view.
     */
    @ViewChild("dropdown") dropdown: ElementRef;

    /**
     * Constructor to import the renderer into the component.
     *
     * @param _renderer The renderer so we can migrate some of the classes over to the dropdown list.
     */
    constructor(private _renderer: Renderer2) {
    }

    /**
     * Workflow callback that will migrate all the classes over to the new dropdown element.
     */
    ngAfterViewInit() {
        if (this.directive !== null) {
            let classes = this.directive.klass.split(" ").filter(x => x != "ui" && x != "dropdown" && x != "selection" && x != "multiple");
            for(let i = 0; i < classes.length; ++i) {
                this._renderer.addClass(this.dropdown.nativeElement, classes[i]);
            }
        }
    }

    /**
     * Callback for the change event so that the two elements can be connected.
     * @param item The item that has changed.
     */
    change(item: ItemDirective|ItemDirective[]) {
        if (this.directive !== null) {
            this.directive.onChange(item);
        }
    }
}
