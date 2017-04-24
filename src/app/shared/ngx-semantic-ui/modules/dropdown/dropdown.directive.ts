import { Directive, ContentChildren, QueryList, AfterViewInit, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { OptionDirective } from "./helper-directives";

import { DropdownComponent } from "./dropdown.component";

@Directive({ selector: "select.ui.dropdown" })
export class DropDownDirective implements AfterViewInit {

    @ContentChildren(OptionDirective) options: QueryList<OptionDirective>;

    constructor(private _container: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        let factory = this._componentFactoryResolver.resolveComponentFactory(DropdownComponent);
        let ref = this._container.createComponent(factory);
        ref.instance.directive = this;
    }
}
