import { Directive, ComponentRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";

import { InputHiddenDirective, InputSearchDirective } from "./helper-directives";
import { DropdownMenuDirective } from "./dropdown-menu.directive";
import { DropdownTextDirective } from "./dropdown-text.directive";
import { DropdownItemDirective } from "./dropdown-item.directive";
import { DropdownService } from "./dropdown.service";
import { TransitionService, MultiSelectLabelComponent, SearchInputComponent } from "../";

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

@Directive({ selector: ".ui.dropdown.selection,[ngx-select-dropdown]" })
export class DropdownSelectionDirective implements AfterViewInit, OnDestroy {

    private _isOpen: boolean = false;
    private _isAnimating: boolean = false;
    private _defaultText: string = null;
    private _searchInput: ComponentRef<SearchInputComponent> = null;
    private _transition: TransitionService = null;

    selectedItem: IDropdownItem|IDropdownItem[] = null;

    @Input("class") klass: string;
    @Input("multiple") multiple: boolean;
    @Input("search") search: boolean;
    @Output("change") onChange: EventEmitter<IDropdownItem|IDropdownItem[]> = new EventEmitter<IDropdownItem>();

    @HostBinding("class.active")
    @HostBinding("class.visible")
    get isOpen(): boolean {
        return this._isOpen;
    }

    get isMultiple(): boolean {
        return this.klass.indexOf("multiple") > -1 || this.multiple === true;
    }

    set isOpen(open: boolean) {
        this._isOpen = open;

        if (!open) {
            this.text.isFiltered = false;
        } else {
            this.unFilterList();
        }

        if (!this._isAnimating) {
            this._isAnimating = true;
            if (open) {
                this._renderer.removeClass(this.menu.element.nativeElement, "hidden");
                this._renderer.addClass(this.menu.element.nativeElement, "visible");
                this._transition.animate(this.menu.element.nativeElement, "slide down").then(() => {
                    this._isAnimating = false;
                });
            } else {
                this._transition.animate(this.menu.element.nativeElement, "slide down", 200, "out").then(() => {
                    this._renderer.removeClass(this.menu.element.nativeElement, "visible");
                    this._renderer.addClass(this.menu.element.nativeElement, "hidden");
                    this._isAnimating = false;
                });
            }
        }
    }

    get isSearchable(): boolean {
        return this.klass.indexOf("search") > -1 || this.search === true;
    }

    @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
    @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;
    @ContentChild(DropdownTextDirective) text: DropdownTextDirective;
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;

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

    selectItem(item: IDropdownItem) {
        if (this.isMultiple) {
            this.selectedItem = this.selectedItem || [];
            let index = (<IDropdownItem[]>this.selectedItem).findIndex(x => x.value === item.value);
            if (index == -1) {
                let factory = this._componentFactoryResolver.resolveComponentFactory(MultiSelectLabelComponent);
                let component = this.text.container.createComponent(factory);
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
                this.text.element.nativeElement.innerHTML = item.label;
                this._renderer.removeClass(this.text.element.nativeElement, "default");
            }
            this.isOpen = false;
        }
    }

    ngAfterViewInit() {
        this._defaultText = this.text.element.nativeElement.innerHTML;

        this.items.forEach(x => {
            this._renderer.listen(x.element.nativeElement, "click", this.clickItem.bind(this, x));
        });

        if (this.isSearchable) {
            this.buildSearchInput();
        }

        if (this.isMultiple && this.klass.indexOf("multiple") === -1) {
            this._renderer.addClass(this._element.nativeElement, "multiple");
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
        this._searchInput = this.text.container.createComponent(factory);
        this._searchInput.instance.items = this.items;
        this._searchInput.instance.text = this.text;
    }

    private clickItem(item: DropdownItemDirective, event: MouseEvent) {
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
