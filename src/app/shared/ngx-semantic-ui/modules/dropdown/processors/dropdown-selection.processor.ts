import { Directive, forwardRef, ComponentRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";
import { DropdownService } from "../dropdown.service";
import { TransitionService } from "../../transition";
import { MultiSelectLabelComponent, SearchInputComponent } from "../components";
import { IconDirective, SearchInputDirective, InputHiddenDirective, MenuDirective, ItemDirective, TextDirective } from "../directives";
import { IDropdownProcessor } from "./dropdown-processor.interface";
import { IDropdownSettings } from "../dropdown-settings.interface";


export class DropdownSelectionProcessor implements IDropdownProcessor {

    private _isHidden: boolean = true;
    private _isAnimating: boolean = false;
    private _defaultText: string = null;
    private _searchInput: ComponentRef<SearchInputComponent> = null;
    private _transition: TransitionService = null;
    private _selectedItem: ItemDirective|ItemDirective[] = null;

    get isMultiple(): boolean {
        return this._class.indexOf("multiple") > -1;
    }

    get isSearchable(): boolean {
        return this._class.indexOf("search") > -1 || this._search === true || this._itemSearchInput != null;
    }

    constructor(
        private _settings: IDropdownSettings,
        private _service: DropdownService,
        private _renderer: Renderer2,
        private _element: ElementRef,
        private _container: ViewContainerRef,
        private _componentFactoryResolver: ComponentFactoryResolver,

        private _class: string,
        private _search: boolean,

        private _items: QueryList<ItemDirective>,
        private _menu: MenuDirective,
        private _text: TextDirective,
        private _input: InputHiddenDirective,
        private _itemSearchInput: SearchInputDirective,
        private _icon: IconDirective,

        private _onChange: EventEmitter<ItemDirective|ItemDirective[]>,
        private _onBlur: EventEmitter<void>

        ) {
        this._transition = new TransitionService(this._renderer);
        this._service.add(this);
    }

    trigger(event: MouseEvent) {
        if (this._isHidden) {
            this._service.hideAll(this);
            this.open();
        }
    }

    open() {
        this._transition.addClasses(this._element.nativeElement, "visible active");
        this.unFilterList();
        this._menu.open(this._settings.transition, this._settings.duration);
        this._isHidden = false;
        this.focusSearch();
    }

    close() {
        this._transition.removeClasses(this._element.nativeElement, "visible active");
        this._text.isFiltered = false;
        this.clearSearch();
        this._onBlur.emit();
        this._menu.close(this._settings.transition, this._settings.duration);
        this._isHidden = true;
    }

    initilizeValue(value: any|any[]) {
        if (value != null) {
            if (Array.isArray(value)) {
                let items = this._items.filter(x => value.indexOf(x.value) > -1);
                items.forEach(item => this.selectItem(item));
            } else {
                let item = this._items.find(x => x.value == value);
                if (item !== undefined) {
                    this.selectItem(item);
                }
            }

            this.unFilterList();
        }
    }

    selectItem(item: ItemDirective) {
        if (this._settings.action != "nothing") {
            if (this.isMultiple) {
                this._selectedItem = this._selectedItem || [];
                if (Array.isArray(this._selectedItem) && (this._settings.maxSelections === false || this._selectedItem.length < this._settings.maxSelections)) {
                    let index = this._selectedItem.findIndex(x => x.value === item.value);
                    if (index == -1) {
                        let factory = this._componentFactoryResolver.resolveComponentFactory(MultiSelectLabelComponent);
                        let component = this._icon.container.createComponent(factory, 0);
                        component.instance.innerHTML = item.label;
                        component.instance.transition = this._settings.labelTransition;
                        component.instance.duration = this._settings.labelDuration;
                        component.instance.hideAnimationCallback = () => {
                            component.destroy();
                            if (Array.isArray(this._selectedItem)) {
                                this._selectedItem.splice(this._selectedItem.indexOf(item), 1);
                                this._onChange.emit(this._selectedItem);
                                this.focusSearch();
                                this.unFilterList();
                            }
                        };

                        component.instance.show();

                        this._selectedItem.push(item);
                        this._onChange.emit(this._selectedItem);
                        this.focusSearch();
                        this.unFilterList();
                    } else if (this._settings.allowReselection) {
                        this._onChange.emit(this._selectedItem);
                    }
                }
            } else {
                if (this._selectedItem != item || this._settings.allowReselection) this._onChange.emit(item);

                this._selectedItem = item;
                if (item != null && this._settings.action == "activate") {
                    this._text.label = item.label;
                }
                this.close();
            }
        } else {

        }
    }

    ngAfterContentInit() {
        this._items.forEach(x => {
            this._renderer.listen(x.element.nativeElement, "click", this.clickItem.bind(this, x));
        });

        if (this.isSearchable) {
            this.buildSearchInput();
        }
    }

    ngOnDestroy() {
        this._service.remove(this);
        if (this._searchInput != null) {
            this._searchInput.destroy();
        }
    }

    private buildSearchInput() {
        if (this._itemSearchInput == null) {
            let factory = this._componentFactoryResolver.resolveComponentFactory(SearchInputComponent);
            this._searchInput = this._icon.container.createComponent(factory);
            this._searchInput.instance.items = this._items;
            this._searchInput.instance.text = this._text;
            this._searchInput.instance.minCharacters = this._settings.minCharacters;
            this._searchInput.instance.match = this._settings.match;
            this._searchInput.instance.unfilterList = this.unFilterList.bind(this);
        } else {
            this._renderer.listen(this._itemSearchInput.input, "input", () => {
                if (this._items !== null && this._settings.minCharacters <= this._itemSearchInput.value.length) {
                    this._items.forEach(x => {
                        x.isFiltered =
                            (this._settings.match == "both" && (x.text.toLowerCase().indexOf(this._itemSearchInput.value.toLowerCase()) === -1 || x.value.toLowerCase().indexOf(this._itemSearchInput.value.toLocaleLowerCase()) === -1))
                            || (this._settings.match == "value" && (x.value.toLowerCase().indexOf(this._itemSearchInput.value.toLowerCase()) === -1))
                            || (this._settings.match == "text" && (x.text.toLowerCase().indexOf(this._itemSearchInput.value.toLowerCase()) === -1));
                    });
                } else {
                    this.unFilterList();
                }
                if (this._text !== null) {
                    this._text.isFiltered = this._itemSearchInput.value.length > 0;
                }
            });
            this._renderer.listen(this._itemSearchInput.input, "click", (event: MouseEvent) => {
                event.stopPropagation();
                event.preventDefault();
            });
        }
    }

    private clickItem(item: ItemDirective, event: MouseEvent) {
        this.clearSearch();
        this.selectItem(item);
        event.stopPropagation();
        event.preventDefault();
    }

    private clearSearch() {
        if (this.isSearchable) {
            if (this._itemSearchInput == null) {
                if (this._searchInput !== null) {
                    this._searchInput.instance.clear();
                }
            } else {
                this._itemSearchInput.clear();
            }
        }
    }

    private focusSearch() {
        if (this.isSearchable) {
            if (this._itemSearchInput == null) {
                if (this._searchInput !== null) {
                    this._searchInput.instance.focus();
                }
            } else {
                this._itemSearchInput.focus();
            }
        }
    }

    private unFilterList() {
        if (!this._settings.allowReselection) {
            this._items.forEach(x => {
                x.isFiltered = this.isMultiple && Array.isArray(this._selectedItem) ? this._selectedItem.findIndex(y => y.value == x.value) > -1 : false;
            });
        }
    }
}
