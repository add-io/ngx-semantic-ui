import { Directive, Provider, forwardRef, Self, ElementRef, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { DropdownDirective } from "../dropdown.directive";
import { ItemDirective } from "../directives";

export const SELECT_DROPDOWN_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownSelectValueAccessor),
    multi: true
};

@Directive({
    selector: ".ui.dropdown:not(.multiple):not(select)[ngModel],.ui.dropdown:not(.multiple):not(select)[formControlName],.ui.dropdown:not(.multiple):not(select)[formControl]",
    host: { "(change)": "onChange($event)", "(blur)": "onTouched()" },
    providers: [ SELECT_DROPDOWN_VALUE_ACCESSOR ]
})
export class DropdownSelectValueAccessor implements ControlValueAccessor {

    onChange = (items: ItemDirective) => {};
    onTouched = () => {};

    constructor(@Self() private _dropdown: DropdownDirective, private _element: ElementRef, private _renderer: Renderer2) {
    }

    writeValue(value: any): void {
        this._dropdown.initilizeValue(value);
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = (item: ItemDirective) => {
            fn(item.value);
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
