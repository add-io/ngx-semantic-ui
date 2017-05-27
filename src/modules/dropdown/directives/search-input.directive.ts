import { Directive, ContentChild, forwardRef } from "@angular/core";
import { InputDirective } from "./input.directive";


@Directive({ selector: ".search.input" })
export class SearchInputDirective {

    /**
     * The input in this search input div.
     */
    @ContentChild(forwardRef(() => InputDirective)) searchInput: InputDirective;
    /**
     * The inner input to this search directive.
     */
    get input(): HTMLInputElement {
        return this.searchInput.input;
    }
    /**
     * The inner value to this search directive.
     */
    get value(): string {
        return this.searchInput.value;
    }
    set value(val: string) {
        this.searchInput.value = val;
    }

    /**
     * Helper method to clear the inner input.
     */
    clear() {
        this.searchInput.clear();
    }

    /**
     * Helper method to focus the inner input.
     */
    focus() {
        this.searchInput.focus();
    }
}
