import { Directive, forwardRef, ComponentRef, OnDestroy, ContentChildren, QueryList, ViewContainerRef, ComponentFactoryResolver, ElementRef, Input, HostBinding, ContentChild, AfterViewInit, Renderer2, HostListener, Output, EventEmitter } from "@angular/core";
import { DropdownService } from "../dropdown.service";
import { TransitionService } from "../../transition";
import { MultiSelectLabelComponent, SearchInputComponent } from "../components";
import { IconDirective, SearchInputDirective, InputHiddenDirective, MenuDirective, ItemDirective, TextDirective } from "../directives";
import { IDropdownProcessor } from "./dropdown-processor.interface";
import { IDropdownSettings } from "../dropdown-settings.interface";


export class DropdownSelectionProcessor implements IDropdownProcessor {

    /**
     * Determine if this menu is hidden.
     */
    private _isHidden: boolean = true;
    /**
     * Determine if this menu is animating.
     */
    private _isAnimating: boolean = false;
    /**
     * The internal search input that is created if one is not found.
     */
    private _searchInput: ComponentRef<SearchInputComponent> = null;
    /**
     * The transition service that should be used when animating the menu.
     */
    private _transition: TransitionService = null;
    /**
     * The internal selected item.
     */
    private _selectedItem: ItemDirective|ItemDirective[] = null;
    /**
     * Getter to determine if the dropdown needs to process as a multi select dropdown.
     */
    get isMultiple(): boolean {
        return this._class.indexOf("multiple") > -1;
    }
    /**
     * Getter to determine if this dropdown is searchable.
     */
    get isSearchable(): boolean {
        return this._class.indexOf("search") > -1 || this._search === true || this._itemSearchInput != null;
    }

    /**
     * Constructor to build out the elements needed to make this dropdown function properly.
     *
     * @param _service The dropdown service that is used to store the processors so that all processor can be controlled at once.
     * @param _renderer The renderer from angular.
     * @param _element The elemnt this directive is bound to.
     * @param _container The container of this directive.
     * @param _componentFactoryResolver The factory resolver for this directive.
     * @param _componentFactoryResolver
     * @param _class The class property to determine if this dropdown is a search or multi select dropdown.
     * @param _search Internal input that will tell this directive that we need to use the search option.
     * @param _items Query that will search for all the items in the dropdown for use in searching and selection.
     * @param _menu Query that will get the menu.
     * @param _text Query that will gather the text label.
     * @param _input Query that will gather the hidden input for use in storing selected values.
     * @param _itemSearchInput Query to get the search input item if on exists.
     * @param _icon Query that will gather the icon for use when inserting new labels for selection.
     * @param _onChange Event that will be fired when a change occurs.
     * @param _onBlur Event that will occur whent he dropdown is closed.
     */
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

    /**
     * Helper method that will be called when the event to trigger this element has been called.
     */
    trigger(event: MouseEvent) {
        if (this._isHidden) {
            this._service.hideAll(this);
            this.open();
        }
    }

    /**
     * Helper method to open this dropdown element.
     */
    open() {
        this._transition.addClasses(this._element.nativeElement, "visible active");
        this.unFilterList();
        this._menu.open(this._settings.transition, this._settings.duration);
        this._isHidden = false;
        this.focusSearch();
    }

    /**
     * Helper method to close this dropdown element.
     */
    close() {
        this._transition.removeClasses(this._element.nativeElement, "visible active");
        this._text.isFiltered = false;
        this.clearSearch();
        this._onBlur.emit();
        this._menu.close(this._settings.transition, this._settings.duration);
        this._isHidden = true;
    }

    /**
     * Helper method that will be called if this processor needs to deal with a default value.
     */
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

    /**
     * Method is meant to deal with selecting an item for the user.
     *
     * @param item The item that has been selected by the user.
     */
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

    /**
     * Workflow callback that will be called after content is initilized.
     */
    ngAfterContentInit() {
        this._items.forEach(x => {
            this._renderer.listen(x.element.nativeElement, "click", this.clickItem.bind(this, x));
        });

        if (this.isSearchable) {
            this.buildSearchInput();
        }
    }

    /**
     * Workflow callback that will be called when the processor is destroyed.
     */
    ngOnDestroy() {
        this._service.remove(this);
        if (this._searchInput != null) {
            this._searchInput.destroy();
        }
    }

    /**
     * Helper function that is used to either build out a search input or bind up the search input found on the DOM.
     */
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

    /**
     * Method is meant to deal with clicking on items in the menu.
     *
     * @param item The Item that is being selected.
     * @param event The mouse event that triggered this element.
     */
    private clickItem(item: ItemDirective, event: MouseEvent) {
        this.clearSearch();
        this.selectItem(item);
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     * Helper method to clear the search if one exists.
     */
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

    /**
     * Method is meant to focus a search on open if one exists.
     */
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

    /**
     * Helper method to filter the list based on the selected items.
     */
    private unFilterList() {
        this._items.forEach(x => {
            if (!this._settings.allowReselection) {
                x.isFiltered = this.isMultiple && Array.isArray(this._selectedItem) ? this._selectedItem.findIndex(y => y.value == x.value) > -1 : false;
            } else {
                x.isFiltered = false;
            }
        });
    }
}
