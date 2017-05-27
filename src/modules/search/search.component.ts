import { Component, ElementRef, Renderer2, HostBinding, Input, ContentChildren, QueryList, AfterContentInit, OnDestroy, ViewChild, ContentChild, TemplateRef } from "@angular/core";
import { TransitionService } from "../transition";
import { InputPromptDirective } from "./input-prompt.directive";
import { Observable } from "rxjs";

@Component({
    selector: ".ui.search",
    template:
`<ng-content></ng-content>
<div class="results" [class.visible]="isVisible" [class.hidden]="isHidden" #results>
    <div *ngIf="hasFilteredResults && !isCategorySearch">
        <a class="result" *ngFor="let result of getFilteredResults()" (click)="clickResult(result)">
            <ng-template [ngTemplateOutlet]="resultTemplate" [ngOutletContext]="{ $implicit: result }" *ngIf="resultTemplate != null"></ng-template>
            <div class="content" *ngIf="resultTemplate == null">
                <div class="title">{{result.title}}</div>
                <div class="description">{{result.description}}</div>
            </div>
        </a>
    </div>
    <div *ngIf="hasFilteredResults && isCategorySearch">
        <div class="category" *ngFor="let category of getCategories()">
            <div class="name">{{category.name}}</div>
            <a class="result" *ngFor="let result of category.results" (click)="clickResult(result)">
                <ng-template [ngTemplateOutlet]="resultTemplate" [ngOutletContext]="{ $implicit: result }" *ngIf="resultTemplate != null"></ng-template>
                <div class="content" *ngIf="resultTemplate == null">
                    <div class="title">{{result.title}}</div>
                    <div class="description">{{result.description}}</div>
                </div>
            </a>
        </div>
    </div>
    <ng-template [ngTemplateOutlet]="resultTemplate" *ngIf="!hasFilteredResults && resultTemplate != null"></ng-template>
    <div class="message empty" *ngIf="!hasFilteredResults && resultTemplate == null">
        <div class="header">No Results</div>
        <div class="description">Your search returned no results</div>
    </div>
</div>`
})
export class SearchComponent implements AfterContentInit, OnDestroy {

    /**
     * The basic transition service for handling animations.
     */
    private _transition: TransitionService;
    /**
     * If the results are visible or not.
     */
    private _isVisible: boolean = false;
    /**
     * The input callback function that needs to be cleared once this element is destoryed.
     */
    private _inputCallback: Function = null;
    /**
     * The blur callback function that needs to be cleared once this element is destoryed.
     */
    private _blurCallback: Function = null;
    /**
     * The focus callback function that needs to be cleared once this element is destoryed.
     */
    private _focusCallback: Function = null;
    /**
     * The timeout for the debounce of the input.
     */
    private _debounceTimeout: any = null;
    /**
     * The internal results that will be used for this component.
     */
    results: any[] | { [category: string]: any } = null;
    /**
     * The transition this component needs to use when opening up the search results.
     */
    @Input("transition") transition: string = "fade";
    /**
     * The transition duration this component should use.
     */
    @Input("duration") duration: any = 200;
    /**
     * The local data source this search component should filter on.
     */
    @Input("source") source: any[] | { [category: string] : any };
    /**
     * The max results that should be trimmed down to.
     */
    @Input("maxResults") maxResults: any = 7;
    /**
     * The search callback that should be used instead of the interanl callback.
     */
    @Input("searchCallback") searchCallback: (term: string, size: number) => PromiseLike<any[]> | Observable<any[]> = null;
    /**
     * The number of milliseconds the debounce should last for.
     */
    @Input("debounce") debounce: any = 400;
    /**
     * The template that should be used for the results instead of the default.
     */
    @ContentChild('resultTemplate') resultTemplate: TemplateRef<any> = null;
    /**
     * The template that should be used for the empty results instead of the default.
     */
    @ContentChild('emptyTemplate') emptyTemplate: TemplateRef<any> = null;
    /**
     * Get all the inputs that are attached to this component.
     */
    @ContentChildren(InputPromptDirective, { descendants: true }) inputs: QueryList<InputPromptDirective>;
    /**
     * The result element so we have access to the DOM if needed, this is mainly used for animating.
     */
    @ViewChild("results", { read: ElementRef }) resultElement: ElementRef;
    /**
     * Determine if the search is loading the results or not.
     */
    @HostBinding("class.loading")
    loading: boolean = false;
    /**
     * Getter to determine if the results are hidden.
     */
    get isHidden(): boolean {
        return !this._isVisible;
    }
    /**
     * Getter to determine if the results are visible.
     */
    get isVisible(): boolean {
        return this._isVisible;
    }
    /**
     * We are only concerned with the first input that is found from the content query.
     */
    get input(): InputPromptDirective {
        return this.inputs.first;
    }
    /**
     * The results HTML element.
     */
    get element(): HTMLElement {
        if (this.resultElement == null) return null;
        return this.resultElement.nativeElement;
    }
    /**
     * Helper value to alter the underlining inputs value element.
     */
    get value(): string {
        return this.input.element.value;
    }
    set value(value: string) {
        this.input.element.value = value;
    }
    /**
     * Getter to determine if this is a category search or not.
     */
    @HostBinding("class.category")
    get isCategorySearch(): boolean {
        return this.results != null && !Array.isArray(this.results);
    }
    /**
     * Getter to determine if we have filtered results or not.
     */
    get hasFilteredResults(): boolean {
        return !(this.results == null ||
            (Array.isArray(this.results) && (<any[]>this.results).length === 0));
    }

    /**
     * Constructor to get the renderer for this element.
     *
     * @param _renderer The renderer for this element.
     */
    constructor(private _renderer: Renderer2) {
        this._transition = new TransitionService(this._renderer);
    }

    /**
     * Workflow callback to build out the listeners to the input.
     */
    ngAfterContentInit() {
        if (this.input != null) {
            this._inputCallback = this._renderer.listen(this.input.element, "input", this.promptInput.bind(this));
            this._blurCallback = this._renderer.listen(this.input.element, "blur", this.promptBlur.bind(this));
            this._focusCallback = this._renderer.listen(this.input.element, "focus", this.promptFocus.bind(this));
        }

        if (this.searchCallback == null) {
            this.searchCallback = this.filterResults.bind(this);
        }
    }

    /**
     * Workflow to destroy the listeners from the DOM.
     */
    ngOnDestroy() {
        if (this._inputCallback != null) {
            this._inputCallback();
            this._blurCallback();
            this._focusCallback();
        }
    }

    /**
     * Helper method to get the filtered results.
     */
    getFilteredResults() {
        return this.results === null ? this.source : this.results;
    }

    /**
     * Helper method to deal with clicking on a result.
     */
    clickResult(result: any) {
        this.value = result.title;
        this.results = [result];
    }

    /**
     * Helper method to build out and array for the categories.
     */
    getCategories() {
        let categories: any[] = [];
        for(let key in this.results) {
            if (this.results.hasOwnProperty(key)) {
                categories.push(this.results[key]);
            }
        }
        return categories;
    }

    /**
     * Helper method to deal with the prompt search input
     *
     * @param event The DOM event for this input event.
     */
    private promptInput(event) {
        if (this._debounceTimeout !== null) {
            clearTimeout(this._debounceTimeout);
        }

        this._debounceTimeout = setTimeout(() => {
            this._debounceTimeout = null;

            let term = this.value;
            this.loading = true;
            let promise = this.searchCallback(term, parseInt(this.maxResults));
            if (promise instanceof Observable) {
                promise = (<any>promise).toPromise();
            }
            (<PromiseLike<any[]>>promise).then((results) => {
                this.loading = false;
                this.results = results;
                this.showResults();
            });
        }, parseInt(this.debounce));
    }

    /**
     * Helper method is meant to be the default search callback for the system.
     *
     * @param term The term we are filtering on.
     * @param size The size we should be returning.
     */
    private filterResults(term: string, size: number) {
        return new Promise<any[]>((resolve, reject) => {
            if (Array.isArray(this.source)) {
                resolve(this.source.filter(x => this.shouldFilter(term, x.title) || this.shouldFilter(term, x.description)).slice(0, size));
            } else {
                let results: any = {};
                for(let key in this.source) {
                    if (this.source.hasOwnProperty(key) && this.source[key].name != null) {
                        let filter = this.source[key].results.filter(x => this.shouldFilter(term, x.title) || this.shouldFilter(term, x.description));
                        if (filter.length > 0) {
                            results[key] = {
                                name: this.source[key].name,
                                results: filter
                            };
                        }
                    }
                }
                console.log(results);
                resolve(results);
            }
        });
    }

    /**
     * Helper method will determine if the filter should be included into the results.
     *
     * @param term The term we are filtering on.
     * @param filterTerm The filter term we are filtering on.
     */
    private shouldFilter(term: string, filterTerm: string): boolean {
        return filterTerm != null && filterTerm.toLowerCase().indexOf(term.toLowerCase()) == 0;
    }

    /**
     * Helper method to watch the blur events on the prompt.
     *
     * @param event The DOM event for this blur event.
     */
    private promptBlur(event) {
        this.hideResults();
    }

    /**
     * Helper method to watch the focus events on the prompt.
     *
     * @param event The DOM event for this focus event.
     */
    private promptFocus(event) {
        if (this.value) {
            this.showResults();
        }
    }

    /**
     * Helper method to show the results with the animation.
     */
    private showResults() {
        if (!this._isVisible) {
            this._isVisible = true;
            this._transition.animate(this.element, this.transition, parseInt(this.duration));
        }
    }

    /**
     * Helper method to hide the results with the animation.
     */
    private hideResults() {
        if (this._isVisible) {
            this._transition.animate(this.element, this.transition, parseInt(this.duration), "out").then(() => {
                this._isVisible = false;
            });
        }
    }
}
