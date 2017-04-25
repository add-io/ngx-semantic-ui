import { Directive, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";

import { InputHiddenDirective, InputSearchDirective } from "./helper-directives";
import { DropdownMenuDirective } from "./dropdown-menu.directive";
import { DropdownTextDirective } from "./dropdown-text.directive";
import { DropdownItemDirective } from "./dropdown-item.directive";
import { TransitionService } from "../";

export interface IDropdownItem {
    value: string;
    label: string;
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
    private _transition: TransitionService;
    private _defaultText: string;
    private _searchInput: ISearchItem;

    selectedItem: IDropdownItem = null;

    @Input("class") klass: string;
    @Output("change") onChange: EventEmitter<IDropdownItem> = new EventEmitter<IDropdownItem>();

    @HostBinding("class.active")
    @HostBinding("class.visible")
    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(open: boolean) {
        this._isOpen = open;

        if (!open) {
            this.text.isFiltered = false;
        } else {
            this.items.forEach(x => {
                x.isFiltered = false;
            });
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
        return this.klass.indexOf("search") > -1;
    }

    @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
    @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;
    @ContentChild(DropdownTextDirective) text: DropdownTextDirective;
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;

    constructor(private _renderer: Renderer2, private _element: ElementRef,private _container: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) {
        this._transition = new TransitionService(this._renderer);
        this._renderer.listen("window", "click", () => { if(this.isOpen) { this.isOpen = false; } });
    }

    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        if (!this.isOpen) {
            this.isOpen = true;
        }
        event.stopPropagation();
        event.preventDefault();
    }

    selectItem(item: IDropdownItem) {
        if (this.selectedItem != item) this.onChange.emit(item);

        this.selectedItem = item;
        if (item != null) {
            this.text.element.nativeElement.innerHTML = item.label;
            this._renderer.removeClass(this.text.element.nativeElement, "default");
        }
        this.isOpen = false;
    }

    ngAfterViewInit() {
        this._defaultText = this.text.element.nativeElement.innerHTML;

        this.items.forEach(x => {
            this._renderer.listen(x.element.nativeElement, "click", this.clickItem.bind(this, x));
        })

        if (this.isSearchable) {
            this.buildSearchInput();
        }
    }

    ngOnDestroy() {
        if (this._searchInput != null) {
            this._searchInput.blur();
            this._searchInput.focus();
            this._searchInput.keydown();
        }
    }

    private buildSearchInput() {
        this._searchInput = {
            element: this._renderer.createElement("input"),
            isFocus: false
        };

        this._renderer.addClass(this._searchInput.element, "search");
        this._renderer.setAttribute(this._searchInput.element, "autocomplete", "off");
        this._renderer.setAttribute(this._searchInput.element, "tabindex", "0");

        // Add in events to deal with input
        this._searchInput.blur = this._renderer.listen(this._searchInput.element, "blur", () => {
            this._searchInput.isFocus = false;
            this._searchInput.element.value = "";
        });
        this._searchInput.focus = this._renderer.listen(this._searchInput.element, "focus", () => {
            this._searchInput.isFocus = true;
        });
        this._searchInput.keydown = this._renderer.listen(this._searchInput.element, "keydown", () => {
            setTimeout(() => {
                if (this._searchInput.isFocus) {
                    this.items.forEach(x => {
                        x.isFiltered = x.element.nativeElement.innerText.toLowerCase().indexOf(this._searchInput.element.value.toLowerCase()) === -1;
                    });
                    this.text.isFiltered = true;
                }
            });
        });

        this._renderer.appendChild(this._element.nativeElement, this._searchInput.element);
    }

    private clickItem(item: DropdownItemDirective, event: MouseEvent) {
        this.selectItem({ value: item.value, label: item.label });
        event.stopPropagation();
        event.preventDefault();
    }
}
