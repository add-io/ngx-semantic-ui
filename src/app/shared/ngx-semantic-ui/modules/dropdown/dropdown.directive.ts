import { Directive, Optional, Input, ContentChildren, QueryList, AfterViewInit, ViewContainerRef, HostBinding, ComponentFactoryResolver } from "@angular/core";
import { NgModel } from "@angular/forms";
import { OptionDirective } from "./helper-directives";

import { DropdownComponent } from "./dropdown.component";
import { IDropdownItem } from "./dropdown-selection.directive";

@Directive({ selector: "select.ui.dropdown" })
export class DropDownDirective implements AfterViewInit {

    @ContentChildren(OptionDirective) options: QueryList<OptionDirective>;
    private selectedValue: IDropdownItem = null;

    constructor(private _container: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver, @Optional() private _model: NgModel) {
    }

    ngAfterViewInit() {
        let factory = this._componentFactoryResolver.resolveComponentFactory(DropdownComponent);
        let ref = this._container.createComponent(factory);
        ref.instance.directive = this;
    }

    @HostBinding("style.display")
    get hidden() {
        return "none";
    }

    onChange(item: IDropdownItem) {
        if (this._model != null) {
            this._model.control.setValue(item.value);
        }
    }
}
