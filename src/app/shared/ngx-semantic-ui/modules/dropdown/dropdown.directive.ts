import { Directive, forwardRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterContentInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";
import { MenuDirective, TextDirective, ItemDirective, IconDirective, InputHiddenDirective } from "./directives";
import { IDropdownProcessor, DropdownMenuProcessor, DropdownSelectionProcessor } from "./processors";
import { DropdownService } from "./dropdown.service";
import { IDropdownSettings } from "./dropdown-settings.interface";
import { CommonService } from "../common.service";

@Directive({ selector: ".ui.dropdown:not(select)" })
export class DropdownDirective implements AfterContentInit, OnDestroy {

    /**
     * The processor that should handle this dropdown item.
     */
    private _processor: IDropdownProcessor;
    /**
     * The cached value that should be used once the processor is built.
     */
    private _cacheValue: any|any[]
    /**
     * The class property to determine if this dropdown is a search or multi select dropdown.
     */
    @Input("class") klass: string;
    /**
     * Internal input that will tell this directive that we need to use the search option.
     */
    @Input("search") search: boolean;
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
     * Event that will be fired when a change occurs.
     */
    @Output("change") onChange: EventEmitter<ItemDirective|ItemDirective[]> = new EventEmitter<ItemDirective>();
    /**
     * Event that will occur whent he dropdown is closed.
     */
    @Output("blur") onBlur: EventEmitter<void> = new EventEmitter<void>();
    /**
     * Get that determines if this dropdown is multiple or not.
     */
    @HostBinding("class.multiple")
    get isMultiple(): boolean {
        return this.klass.indexOf("multiple") > -1;
    }
    /**
     * Get that will gather the settings and pass them on to the processors for use.
     */
    get settings(): IDropdownSettings {
        return {
            allowReselection: CommonService.checkBooleanType(this.allowReselection),
            action: this.action,
            minCharacters: parseInt(<any>this.minCharacters, 10),
            match: this.match,
            maxSelections: this.maxSelections,
            labelTransition: this.labelTransition,
            labelDuration: parseInt(<any>this.labelDuration, 10),
            transition: this.transition,
            duration: parseInt(<any>this.duration, 10)
        };
    }
    /**
     * Query that will search for all the items in the dropdown for use in searching and selection.
     */
    @ContentChildren(ItemDirective, { descendants: true }) items: QueryList<ItemDirective>;
    /**
     * Query that will get the menu.
     */
    @ContentChild(forwardRef(() => MenuDirective)) menu: MenuDirective;
    /**
     * Query that will gather the text label.
     */
    @ContentChild(TextDirective) text: TextDirective;
    /**
     * Query that will gather the hidden input for use in storing selected values.
     */
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;
    /**
     * Query that will gather the icon for use when inserting new labels for selection.
     */
    @ContentChild(forwardRef(() => IconDirective)) icon: IconDirective;

    /**
     * Constructor to build on the window event as well as to inject various services into the directive.
     *
     * @param _service The dropdown service that is used to store the processors so that all processor can be controlled at once.
     * @param _renderer The renderer from angular.
     * @param _element The elemnt this directive is bound to.
     * @param _container The container of this directive.
     * @param _componentFactoryResolver The factory resolver for this directive.
     */
    constructor(
        private _service: DropdownService,
        private _renderer: Renderer2,
        private _element: ElementRef,
        private _container: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver
        ) {
        this._renderer.listen("window", "click", () => {
            this._service.hideAll();
        });
    }

    /**
     * Method is meant to deal with click operations on this element.
     *
     * @param event Mouse event for the click operation.
     */
    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        if (this._processor != null) {
            this._processor.trigger(event);

            event.stopPropagation();
            event.preventDefault();
        }
    }

    /**
     * The initial value for the element.
     *
     * @param value The value that should be initialized.
     */
    initilizeValue(value: any|any[]) {
        if (this._processor == null) {
            this._cacheValue = value;
        } else {
            this._processor.initilizeValue(value);
        }
    }

    /**
     * Workflow callback that will be called after the content for this directive is initialzed.  Meant to determine what
     * processor this dropdown will be using for rendering and processing.
     */
    ngAfterContentInit() {
        if (this.input != null || this.menu.searchInput != null) {
            this._processor = new DropdownSelectionProcessor(
                this.settings,
                this._service,
                this._renderer,
                this._element,
                this._container,
                this._componentFactoryResolver,
                this.klass,
                this.search,
                this.items,
                this.menu,
                this.text,
                this.input,
                this.menu.searchInput,
                this.icon,
                this.onChange,
                this.onBlur
            );
        } else {
            this._processor = new DropdownMenuProcessor(this.settings, this._service, this.menu);
        }
        this._processor.ngAfterContentInit();

        if (this._cacheValue != null) {
            this._processor.initilizeValue(this._cacheValue);
        }
    }

    /**
     * Workflow callback that will clean up the processor so that not leaks happen.
     */
    ngOnDestroy() {
        if (this._processor != null) {
            this._processor.ngOnDestroy();
        }
    }
}
