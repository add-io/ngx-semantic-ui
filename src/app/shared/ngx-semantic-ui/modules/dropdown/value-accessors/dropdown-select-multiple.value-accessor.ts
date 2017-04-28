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

    onChange = (items: ItemDirective[]) => {};
    onTouched = () => {};

    constructor(@Self() private _dropdown: DropdownDirective, private _element: ElementRef, private _renderer: Renderer2) {
    }

    writeValue(value: any): void {
        this._dropdown.initilizeValue(value);
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = (items: ItemDirective[]) => {
            if (Array.isArray(items)) {
                fn(items.map(x => x.value));
            }
        };
    }

    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this._renderer.addClass(this._element.nativeElement, "disabled");
        } else {
            this._renderer.removeClass(this._element.nativeElement, "disabled");
        }
    }
}
