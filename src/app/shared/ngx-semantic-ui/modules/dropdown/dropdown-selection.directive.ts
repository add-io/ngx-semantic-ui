import { Directive, forwardRef, ComponentRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";

import { InputHiddenDirective, InputSearchDirective } from "./helper-directives";
import { DropdownMenuDirective } from "./dropdown-menu.directive";
import { DropdownTextDirective } from "./dropdown-text.directive";
import { DropdownItemDirective } from "./dropdown-item.directive";
import { DropdownService } from "./dropdown.service";
import { TransitionService, MultiSelectLabelComponent, SearchInputComponent, IconDropdownDirective } from "../";

export interface IDropdownItem {
    value: string;
    label: string;
}

export interface IDropdownMultiItem {
    item: IDropdownItem;
    element: HTMLAnchorElement;
    click?: Function;
}

export interface ISearchItem {
    element: HTMLInputElement;
    isFocus: boolean;
    focus?: Function;
    blur?: Function;
    keydown?: Function;
}

@Directive({ selector: ".ui.dropdown.selection" })
export class DropdownSelectionDirective implements AfterViewInit, OnDestroy {

    private _isOpen: boolean = false;
    private _isAnimating: boolean = false;
    private _defaultText: string = null;
    private _searchInput: ComponentRef<SearchInputComponent> = null;
    private _transition: TransitionService = null;

    initialValue: any|any[] = null;
    selectedItem: IDropdownItem|IDropdownItem[] = null;

    @Input("class") klass: string;
    @Input("multiple") multiple: boolean;
    @Input("search") search: boolean;

    @Output("change") onChange: EventEmitter<IDropdownItem|IDropdownItem[]> = new EventEmitter<IDropdownItem>();
    @Output("blur") onBlur: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding("class.active")
    @HostBinding("class.visible")
    get isOpen(): boolean {
        return this._isOpen;
    }

    @HostBinding("class.multiple")
    get isMultiple(): boolean {
        return this.klass.indexOf("multiple") > -1 || this.multiple === true;
    }

    set isOpen(open: boolean) {
        this._isOpen = open;

        if (!open) {
            this.text.isFiltered = false;
            if (this.isSearchable) {
                this._searchInput.instance.clear();
            }

            this.onBlur.emit();
        } else {
            this.unFilterList();
        }
        if (!this.menu.isAnimating) {
            this.menu.triggerAnimation(open);
        }
    }

    get isSearchable(): boolean {
        return this.klass.indexOf("search") > -1 || this.search === true;
    }

    @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
    @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;
    @ContentChild(DropdownTextDirective) text: DropdownTextDirective;
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;
    @ContentChild(forwardRef(() => IconDropdownDirective)) icon: IconDropdownDirective;


    constructor(private _service: DropdownService, private _renderer: Renderer2, private _element: ElementRef, private _container: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) {
        this._transition = new TransitionService(this._renderer);
        this._renderer.listen("window", "click", () => { if(this.isOpen) { this.isOpen = false; } });
        this._service.addSelection(this);
    }

    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        if (!this.isOpen) {
            this._service.hideAll(this);
            this.isOpen = true;
        }
        if (this.isOpen) {
            this.focusSearch();
        }
        event.stopPropagation();
        event.preventDefault();
    }

    initValue(value: any|any[]) {
        if (value !== null) {
            if (Array.isArray(value)) {
                let items = this.items.filter(x => value.indexOf(x.value) > -1);
                items.forEach(item => this.selectItem({ value: item.value, label: item.label}));
            } else {
                let item = this.items.find(x => x.value == value);
                if (item !== undefined) {
                    this.selectItem({ value: item.value, label: item.label});
                }
            }

            this.unFilterList();
        }
    }

    selectItem(item: IDropdownItem) {
        if (this.isMultiple) {
            this.selectedItem = this.selectedItem || [];
            let index = (<IDropdownItem[]>this.selectedItem).findIndex(x => x.value === item.value);
            if (index == -1) {
                let factory = this._componentFactoryResolver.resolveComponentFactory(MultiSelectLabelComponent);
                let component = this.icon.container.createComponent(factory, 0);
                component.instance.innerHTML = item.label;
                component.instance.show = true;
                component.instance.hideAnimationCallback = () => {
                    component.destroy();

                    (<IDropdownItem[]>this.selectedItem).splice((<IDropdownItem[]>this.selectedItem).indexOf(item), 1);
                    this.onChange.emit(this.selectedItem);
                    this.focusSearch();
                    this.unFilterList();
                };

                (<IDropdownItem[]>this.selectedItem).push(item);
                this.onChange.emit(this.selectedItem);
                this.focusSearch();
                this.unFilterList();
            }
        } else {
            if (this.selectedItem != item) this.onChange.emit(item);

            this.selectedItem = item;
            if (item != null) {
                this.text.label = item.label;
            }
            this.isOpen = false;
        }
    }

    ngAfterViewInit() {
        this.items.forEach(x => {
            this._renderer.listen(x.element.nativeElement, "click", this.clickItem.bind(this, x));
        });

        if (this.isSearchable) {
            this.buildSearchInput();
        }
    }

    ngOnDestroy() {
        this._service.removeSelection(this);
        if (this._searchInput != null) {
            this._searchInput.destroy();
        }
    }

    private buildSearchInput() {
        let factory = this._componentFactoryResolver.resolveComponentFactory(SearchInputComponent);
        this._searchInput = this.icon.container.createComponent(factory);
        this._searchInput.instance.items = this.items;
        this._searchInput.instance.text = this.text;
    }

    private clickItem(item: DropdownItemDirective, event: MouseEvent) {
        if (this.isSearchable) {
            this._searchInput.instance.clear();
        }
        this.selectItem({ value: item.value, label: item.label });
        event.stopPropagation();
        event.preventDefault();
    }

    private focusSearch() {
        if (this.isSearchable && this._searchInput !== null) {
            this._searchInput.instance.focus();
        }
    }

    private unFilterList() {
        this.items.forEach(x => {
            x.isFiltered = this.isMultiple && this.selectedItem !== null ? (<IDropdownItem[]>this.selectedItem).findIndex(y => y.value == x.value) > -1 : false;
        });
    }
}
