import { Directive, Input, Output, EventEmitter, HostBinding, HostListener, forwardRef, OnInit } from '@angular/core';

@Directive({ selector: '.ui.popup', providers: []})
export class PopupDirective implements OnInit {
    public ngOnInit () { }
}