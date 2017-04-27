import { Component, HostListener, HostBinding, ElementRef, QueryList } from "@angular/core";

import { DropdownItemDirective } from "../dropdown-item.directive";
import { DropdownTextDirective } from "../dropdown-text.directive";

@Component({
    selector: "input.search.ngx-select-search-input[type='text']",
    template: ""
})
export class SearchInputComponent {

    public items: QueryList<DropdownItemDirective> = null;
    public text: DropdownTextDirective = null;

    private get _input(): HTMLInputElement {
        return this._element.nativeElement;
    }

    constructor(private _element: ElementRef) {
    }

    @HostListener("input", ["$event"])
    onInput(event: Event) {
        if (this.items !== null) {
            this.items.forEach(x => {
                x.isFiltered = x.text.toLowerCase().indexOf(this._input.value.toLowerCase()) === -1;
            });
        }
        if (this.text !== null) {
            this.text.isFiltered = this._input.value.length > 0;
        }
    }

    focus() {
        this._element.nativeElement.focus();
    }
}
