import { Directive, ContentChild, forwardRef } from "@angular/core";
import { InputDirective } from "./input.directive";


@Directive({ selector: ".search.input" })
export class SearchInputDirective {

    @ContentChild(forwardRef(() => InputDirective)) searchInput: InputDirective;

    get input(): HTMLInputElement {
        return this.searchInput.input;
    }

    get value(): string {
        return this.searchInput.value;
    }

    set value(val: string) {
        this.searchInput.value = val;
    }

    clear() {
        this.searchInput.clear();
    }

    focus() {
        this.searchInput.focus();
    }
}
