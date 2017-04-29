import { Directive, Provider, forwardRef, Self, ElementRef, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { DropdownDirective } from "../dropdown.directive";
import { ItemDirective } from "../directives";

export const SELECT_DROPDOWN_MULTIPLE_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownSelectMultipleValueAccessor),
    multi: true
};

@Directive({
    selector: ".ui.dropdown.multiple[ngModel]:not(select),.ui.dropdown.multiple[formControlName]:not(select),.ui.dropdown.multiple[formControl]:not(select)",
    host: { "(change)": "onChange($event)", "(blur)": "onTouched()" },
    providers: [ SELECT_DROPDOWN_MULTIPLE_VALUE_ACCESSOR ]
})
export class DropdownSelectMultipleValueAccessor implements ControlValueAccessor {

    /**
     * On change callback that is created once the register is called.
     */
    onChange = (items: ItemDirective[]) => {};
    /**
     * On touch callback that is created once the register is called.
     */
    onTouched = () => {};

    /**
     * Constructor to tell angular what other elements need to be included into this processor.
     *
     * @param _dropdown The dropdown that should be bound to this value accessor.
     * @param _element The element that this value accessor controls.
     * @param _renderer The render for this element.
     */
    constructor(@Self() private _dropdown: DropdownDirective, private _element: ElementRef, private _renderer: Renderer2) {
    }

    /**
     * Helper method to write values to the underlining dropdown.
     *
     * @param value The value that needs to be written to this element.
     */
    writeValue(value: any): void {
        this._dropdown.initilizeValue(value);
    }

    /**
     * Register method that will be used to get the on change event.
     *
     * @param fn The internal function that needs to be called for the form elements.
     */
    registerOnChange(fn: (value: any) => any): void {
        this.onChange = (items: ItemDirective[]) => {
            if (Array.isArray(items)) {
                fn(items.map(x => x.value));
            }
        };
    }

    /**
     * Register method that will be used to get the touch change event.
     *
     * @param fn The internal function that will be used when the element has been touched.
     */
    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    /**
     * Method to build out the disabled state for this element.
     *
     * @param isDisabled Is the element disabled.
     */
    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this._renderer.addClass(this._element.nativeElement, "disabled");
        } else {
            this._renderer.removeClass(this._element.nativeElement, "disabled");
        }
    }
}
