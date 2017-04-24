import { Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const RADIO_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioCheckboxDirective),
    multi: true
}

@Directive({ selector: '.ui.radio.checkbox', providers: [ RADIO_VALUE_ACCESSOR ] })
export class RadioCheckboxDirective implements ControlValueAccessor, OnInit {

    /**
     * Empty functions for triggers
     */

    private _onChange: any = Function.prototype;
    private _onTouched: any = Function.prototype;

    @Input()
    public value: any = "";

    @HostBinding('class.checked')
    @Input()
    public checked: boolean = false;

    @Input()
    public disabled: boolean = false;

    @HostBinding('class.read-only')
    @Input()
    public readonly: boolean = false;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Listen for click event
     */

    @HostListener('click')
    public onClick(): void {
        if (this.disabled || this.readonly) return;
        this.writeValue(this.value);
        this._onTouched();
        this.onChange.next(this.value);
    }

    public constructor () { }

    /**
     * This function is needed for OnInit
     */

    public ngOnInit(): void {

    }

    /**
     * These functions are needed for the ControlValueAccessor
     */

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(func: any): void {
        this._onChange = func;
    }

    public registerOnTouched(func: any): void {
        this._onTouched = func;
    }

}
