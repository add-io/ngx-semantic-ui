import { Directive, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: ''
})
export class TooltipDirective implements OnInit, OnDestroy {

    @Input()
    public visible: boolean = false;

    @Input()
    public disabled: boolean = false;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter<any>();

    public constructor () { }

    /**
     * This function is needed for OnInit
     */

    public ngOnInit () { }

    /**
     * This function is needed for OnDestroy
     */
    public ngOnDestroy () { }
}