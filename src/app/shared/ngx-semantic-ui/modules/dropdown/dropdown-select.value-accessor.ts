import { Directive, Provider, forwardRef, Self, ElementRef, Renderer2 } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import { IDropdownItem, DropdownSelectionDirective } from "./dropdown-selection.directive";

export const SELECT_DROPDOWN_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownSelectValueAccessor),
    multi: true
};

@Directive({
    selector: ".ui.dropdown.selection:not(.multiple)[ngModel],.ui.dropdown.selection:not(.multiple)[formControlName],.ui.dropdown.selection:not(.multiple)[formControl]",
    host: { "(change)": "onChange($event)", "(blur)": "onTouched()" },
    providers: [ SELECT_DROPDOWN_VALUE_ACCESSOR ]
})
export class DropdownSelectValueAccessor implements ControlValueAccessor {

    onChange = (items: IDropdownItem) => {};
    onTouched = () => {};

    constructor(@Self() private _selection: DropdownSelectionDirective, private _element: ElementRef, private _renderer: Renderer2) {
    }

    writeValue(value: any): void {
        this._selection.initValue(value);
    }

    registerOnChange(fn: (value: any) => any): void {
        this.onChange = (item: IDropdownItem) => {
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
