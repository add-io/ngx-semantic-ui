import { Directive, Optional, Input, ContentChildren, QueryList, AfterViewInit, ViewContainerRef, HostBinding, ComponentFactoryResolver } from "@angular/core";
import { SelectControlValueAccessor, SelectMultipleControlValueAccessor } from "@angular/forms";
import { OptionDirective, ItemDirective } from "./directives";
import { DropdownSelectComponent } from "./components";

@Directive({ selector: "select.ui.dropdown" })
export class DropdownSelectDirective implements AfterViewInit {

    /**
     * The class property to determine if this dropdown is a search or multi select dropdown.
     */
    @Input("class") klass: string;
    /**
     * Input to determine if the select statement is multiple or not.
     */
    @Input("multiple") multiple: string;
    /**
     * Configuration that allows for the selection to be reselected.
     */
    @Input("allowReselection") allowReselection: boolean = false;
    /**
     * The action that should be taken when an item is selected.
     */
    @Input("action") action: string = "activate";
    /**
     * The minimum amount of characters needed before search filter is done.
     */
    @Input("minCharacters") minCharacters: number = 1;
    /**
     * Which element on the items should be searched on, can either be value or text.
     */
    @Input("match") match: string = "both";
    /**
     * Max selections that can be selected in a multi select dropdown.
     */
    @Input("maxSelections") maxSelections: number|boolean = false;
    /**
     * The transition that should be used for the inserting of lables in a multi select dropdown.
     */
    @Input("labelTransition") labelTransition: string = "horizontal flip";
    /**
     * The label duration that should be used for in multi select dropdowns.
     */
    @Input("labelDuration") labelDuration: number = 200;
    /**
     * The transition the menu should take when opening or closing.
     */
    @Input("transition") transition: string = "slide down";
    /**
     * The duration of the transition that should be used for the opening and closing of the transition.
     */
    @Input("duration") duration: number = 200;
    /**
     * The options for this select statement.
     */
    @ContentChildren(OptionDirective) options: QueryList<OptionDirective>;

    /**
     * Host binding to hide this element from view.
     */
    @HostBinding("style.display")
    get hidden() {
        return "none";
    }

    /**
     * Constructor to all for angular to know what injections are needed.
     *
     * @param _container The view container reference for this directive so components can be added.
     * @param _componentFactoryResolver The conponenet building factory.
     * @param _single Value accessor that we need to hook into so that a connection is made for this select statement to the dropdown menu being created.
     * @param _multiple Value accessor that we need to hook into so that a connection is made for this select statement to the dropdown menu being created.
     */
    constructor(
        private _container: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        @Optional() private _single: SelectControlValueAccessor,
        @Optional() private _multiple: SelectMultipleControlValueAccessor) {
    }

    /**
     * Workflow callback that is used to build out the new component and add it to the select statement and bind everything together.
     */
    ngAfterViewInit() {
        let factory = this._componentFactoryResolver.resolveComponentFactory(DropdownSelectComponent);
        let ref = this._container.createComponent(factory);
        ref.instance.directive = this;
        ref.instance.allowReselection = this.allowReselection;
        ref.instance.action = this.action;
        ref.instance.minCharacters = this.minCharacters;
        ref.instance.match = this.match;
        ref.instance.maxSelections = this.maxSelections;
        ref.instance.labelTransition = this.labelTransition;
        ref.instance.labelDuration = this.labelDuration;
        ref.instance.transition = this.transition;
        ref.instance.duration = this.duration;

    }

    /**
     * Event to deal with the item being select has changed.
     *
     * @param item The item that is being changed, and we need to format the data and send it of the correct value accessors for use.
     */
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
