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
    private _defaultText: string;
    private _searchInput: ISearchItem;
    private _transition: TransitionService;

    selectedItem: IDropdownItem|IDropdownMultiItem[] = null;

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
        return this.klass.indexOf("multiple") > -1 || this.multiple == true;
    }

    set isOpen(open: boolean) {
        this._isOpen = open;

        if (!open) {
            this.text.isFiltered = false;
        } else {
            this.items.forEach(x => {
                x.isFiltered = this.isMultiple && this.selectedItem !== null ? (<IDropdownMultiItem[]>this.selectedItem).findIndex(y => y.item.value == x.value) > -1 : false;
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
        return this.klass.indexOf("search") > -1 || this.search === true;
    }

    @ContentChildren(DropdownItemDirective, { descendants: true }) items: QueryList<DropdownItemDirective>;
    @ContentChild(DropdownMenuDirective) menu: DropdownMenuDirective;
    @ContentChild(DropdownTextDirective) text: DropdownTextDirective;
    @ContentChild(InputHiddenDirective) input: InputHiddenDirective;

    constructor(private _renderer: Renderer2, private _element: ElementRef, private _container: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver) {
        this._transition = new TransitionService(this._renderer);
        this._renderer.listen("window", "click", () => { if(this.isOpen) { this.isOpen = false; } });
    }

    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        if (!this.isOpen) {
            this.isOpen = true;
        }
        if (this.isSearchable && this.isOpen) {
            this._searchInput.element.focus();
        }
        event.stopPropagation();
        event.preventDefault();
    }

    selectItem(item: IDropdownItem) {
        if (this.isMultiple) {
            this.selectedItem = this.selectedItem || [];
            let index = (<IDropdownMultiItem[]>this.selectedItem).findIndex(x => x.item.value === item.value);
            if (index > -1) {
                (<IDropdownMultiItem[]>this.selectedItem).splice(index, 1);
            } else {
                let newItem: IDropdownMultiItem = {
                    element: this._renderer.createElement("a"),
                    item: item
                };

                let removeElement = this._renderer.createElement("i");
                this._renderer.setStyle(newItem.element, "display", "inline-block !important");
                this._transition.addClasses(newItem.element, "ui label visible");
                this._transition.addClasses(removeElement, "delete icon");

                newItem.click = this._renderer.listen(removeElement, "click", (event: MouseEvent) => {
                    this._transition.animate(newItem.element, "scale", 200, "out").then(() => {
                        (<IDropdownMultiItem[]>this.selectedItem).splice((<IDropdownMultiItem[]>this.selectedItem).indexOf(newItem), 1);
                        newItem.click();
                        newItem.element.remove();

                        this.onChange.emit((<IDropdownMultiItem[]>this.selectedItem).map(x => { return { value: x.item.value, label: x.item.label }; }));
                        let item = this.items.find(x => x.value === newItem.item.value);
                        if (item !== undefined) {
                            item.isFiltered = false;
                        }
                    });
                    event.preventDefault();
                    event.stopPropagation();
                });

                newItem.element.innerHTML = item.label;
                newItem.element.appendChild(removeElement);

                // Insert before the text element
                this.text.element.nativeElement.parentNode.insertBefore(newItem.element, this.text.element.nativeElement);
                this._transition.animate(newItem.element, "scale");

                (<IDropdownMultiItem[]>this.selectedItem).push(newItem);
                if (this.isSearchable) {
                    this._searchInput.element.focus();
                    this.items.forEach(x => {
                        x.isFiltered = this.isMultiple && this.selectedItem !== null ? (<IDropdownMultiItem[]>this.selectedItem).findIndex(y => y.item.value == x.value) > -1 : false;
                    });
                }
            }

            this.onChange.emit((<IDropdownMultiItem[]>this.selectedItem).map(x => { return { value: x.item.value, label: x.item.label }; }));
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
        })

        if (this.isSearchable) {
            console.log("Searcher");
            this.buildSearchInput();
        }

        if (this.klass.indexOf("multiple") == -1) {
            this._renderer.addClass(this._element.nativeElement, "multiple");
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
