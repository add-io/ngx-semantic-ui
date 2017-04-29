import { Component, HostListener, HostBinding, ElementRef, QueryList } from "@angular/core";
import { ItemDirective, TextDirective } from "../directives";

@Component({
    selector: "input.search.ngx-select-search-input[type='text']",
    template: ""
})
export class SearchInputComponent {

    /**
     * The items that need to be filtered.
     */
    public items: QueryList<ItemDirective> = null;
    /**
     * The text label that should be hidden when the user is typing.
     */
    public text: TextDirective = null;
    /**
     * The minimum amount of characters needed before filtering will start.
     */
    public minCharacters: number = 1;
    /**
     * The type of matching the search needs to be doing.
     */
    public match: string = "both";
    /**
     * The unfilter list that should be triggered when nothing is searching.
     */
    public unfilterList: Function;
    /**
     * The value of the search the user is typing in.
     */
    public get value(): string {
        return this._element.nativeElement.value;
    }
    public set value(val: string) {
        this._element.nativeElement.value = val;
    }

    /**
     * The input of the search element.
     */
    private get _input(): HTMLInputElement {
        return this._element.nativeElement;
    }

    /**
     * Constructor to inject the search elements underlining HTML element.
     *
     * @param _element The element of this search element.
     */
    constructor(private _element: ElementRef) {
    }

    /**
     * The event that is triggered once an input is given.
     *
     * @param event The input event object that is triggered with this event.
     */
    @HostListener("input", ["$event"])
    onInput(event: Event) {
        if (this.items !== null && this.minCharacters <= this._input.value.length) {
            this.items.forEach(x => {
                x.isFiltered =
                    (this.match == "both" && (x.text.toLowerCase().indexOf(this._input.value.toLowerCase()) === -1 || x.value.toLowerCase().indexOf(this._input.value.toLowerCase()) === -1))
                    || (this.match == "value" && x.value.toLowerCase().indexOf(this._input.value.toLowerCase()) === -1)
                    || (this.match == "text" && x.text.toLowerCase().indexOf(this._input.value.toLowerCase()) === -1);
            });
        } else if (this.unfilterList != null) {
            this.unfilterList();
        }
        if (this.text !== null) {
            this.text.isFiltered = this._input.value.length > 0;
        }
    }

    /**
     * Method to focus the element when the dropdown is opened.
     */
    focus() {
        this._element.nativeElement.focus();
    }

    /**
     * Method to clear out the search box once a selection is chosen.
     */
    clear() {
        this.value = "";
    }
}
