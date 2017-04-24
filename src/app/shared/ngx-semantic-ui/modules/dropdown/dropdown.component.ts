import { Component } from "@angular/core";

import { DropDownDirective } from "./dropdown.directive";

@Component({
    selector: "ngx-dropdown",
    template:
`<div class="ui dropdown selection">
    <i class="dropdown icon"></i>
    <div class="default text">{{defaultText}}</div>
    <div class="menu">
        <div class="item" *ngFor="let item of items">{{item.label}}</div>
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

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }
}
