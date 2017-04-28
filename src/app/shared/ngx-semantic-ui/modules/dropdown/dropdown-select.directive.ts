import { Directive, Optional, Input, ContentChildren, QueryList, AfterViewInit, ViewContainerRef, HostBinding, ComponentFactoryResolver } from "@angular/core";
import { SelectControlValueAccessor, SelectMultipleControlValueAccessor } from "@angular/forms";
import { OptionDirective, ItemDirective } from "./directives";
import { DropdownSelectComponent } from "./components";

@Directive({ selector: "select.ui.dropdown" })
export class DropdownSelectDirective implements AfterViewInit {

    @Input("class") klass: string;
    @Input("multiple") multiple: string;

    @ContentChildren(OptionDirective) options: QueryList<OptionDirective>;

    constructor(
        private _container: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        @Optional() private _single: SelectControlValueAccessor,
        @Optional() private _multiple: SelectMultipleControlValueAccessor) {
    }

    ngAfterViewInit() {
        let factory = this._componentFactoryResolver.resolveComponentFactory(DropdownSelectComponent);
        let ref = this._container.createComponent(factory);
        ref.instance.directive = this;
    }

    @HostBinding("style.display")
    get hidden() {
        return "none";
    }

    onChange(item: ItemDirective|ItemDirective[]) {
        if (this._multiple != null || this._single != null) {
            if (Array.isArray(item)) {
                // The multi option requires an HTMLCollection of options so we just mimic what is used in angular 2 and pass that in.
                let items = item.map(x => { return { value: x.value } });
                this._multiple.onChange({
                    selectedOptions: {
                        item: function(index) {
                            return items[index];
                        },
                        length: items.length
                    }
                });
            } else {
                console.log(item.value);
                this._single.onChange(item.value);
            }
        }
    }
}
