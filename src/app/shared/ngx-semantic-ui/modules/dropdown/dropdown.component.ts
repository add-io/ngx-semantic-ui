import { Component } from "@angular/core";

import { DropDownDirective } from "./dropdown.directive";
import { BehaviorSubject } from "rxjs";
import { IDropdownItem } from "./dropdown-selection.directive";

@Component({
    selector: "ngx-dropdown",
    template:
`<div class="ui dropdown selection" (change)="change($event)">
    <i class="dropdown icon"></i>
    <div class="default text">{{defaultText}}</div>
    <div class="menu">
        <div class="item" *ngFor="let item of items" data-value="{{item.value}}">{{item.label}}</div>
    </div>
</div>`
})
export class DropdownComponent {

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

    change(item: IDropdownItem) {
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
