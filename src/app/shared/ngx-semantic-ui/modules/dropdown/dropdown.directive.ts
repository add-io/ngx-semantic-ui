import { Directive, forwardRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterContentInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";
import { MenuDirective, TextDirective, ItemDirective, IconDirective, InputHiddenDirective } from "./directives";
import { IDropdownProcessor, DropdownMenuProcessor, DropdownSelectionProcessor } from "./processors";
import { DropdownService } from "./dropdown.service";
import { IDropdownSettings } from "./dropdown-settings.interface";
import { CommonService } from "../common.service";

@Directive({ selector: ".ui.dropdown:not(select)" })
export class DropdownDirective implements AfterContentInit, OnDestroy {

    private _processor: IDropdownProcessor;
    private _cacheValue: any|any[]

    @Input("class") klass: string;
    @Input("search") search: boolean;

    @Input("allowReselection") allowReselection: boolean = false;
    @Input("allowAdditions") allowAdditions: boolean = false;
    @Input("action") action: string = "activate";
    @Input("minCharacters") minCharacters: number = 1;
    @Input("match") match: string = "both";
    @Input("placeholder") placeholder: string|boolean = true;
    @Input("maxSelections") maxSelections: number|boolean = false;
    @Input("labelTransition") labelTransition: string = "horizontal flip";
    @Input("labelDuration") labelDuration: number = 200;
    @Input("transition") transition: string = "slide down";
    @Input("duration") duration: number = 200;

    @Output("change") onChange: EventEmitter<ItemDirective|ItemDirective[]> = new EventEmitter<ItemDirective>();
    @Output("blur") onBlur: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding("class.multiple")
    get isMultiple(): boolean {
        return this.klass.indexOf("multiple") > -1;
    }

    get settings(): IDropdownSettings {
        return {
            allowReselection: CommonService.checkBooleanType(this.allowReselection),
            allowAdditions: CommonService.checkBooleanType(this.allowAdditions),
            action: this.action,
            minCharacters: parseInt(<any>this.minCharacters, 10),
            match: this.match,
            placeholder: this.placeholder,
            maxSelections: this.maxSelections,
            labelTransition: this.labelTransition,
            labelDuration: parseInt(<any>this.labelDuration, 10),
            transition: this.transition,
            duration: parseInt(<any>this.duration, 10)
        };
    }

    @ContentChildren(ItemDirective, { descendants: true }) items: QueryList<ItemDirective>;
    @ContentChild(forwardRef(() => MenuDirective)) menu: MenuDirective;
    @ContentChild(TextDirective) text: TextDirective;
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;
    @ContentChild(forwardRef(() => IconDirective)) icon: IconDirective;

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

    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        if (this._processor != null) {
            this._processor.trigger(event);

            event.stopPropagation();
            event.preventDefault();
        }
    }

    initilizeValue(value: any|any[]) {
        if (this._processor == null) {
            this._cacheValue = value;
        } else {
            this._processor.initilizeValue(value);
        }
    }

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

    ngOnDestroy() {
        if (this._processor != null) {
            this._processor.ngOnDestroy();
        }
    }
}
