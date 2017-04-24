import { Directive, Input, Output, Renderer2, ElementRef, Optional, EventEmitter, OnDestroy } from "@angular/core";
import { TabService } from "./tab.service";
import { TabContextDirective } from "./tab-context.directive";

@Directive({ selector: ".ui.tab" })
export class TabDirective implements OnDestroy {

    /**
     * The path for this tab.
     */
    @Input("tab") path: string;
    /**
     * The class of this tab.
     */
    @Input("class") klass: string;
    /**
     * Event that is triggered once this tab is visible.
     */
    @Output("visible") onVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Getter to process the context if one exists, if not the "global-context" is used.
     */
    get context(): string {
        return this._context == null ? "global-context" : this._context.name;
    }
    /**
     * Getter to determine if this directive is a default tab that should be used when a parent of the path is chosen.
     */
    get isDefault(): boolean {
        return this.klass.indexOf("active") > -1;
    }

    /**
     *
     * @param _service The tab service which keeps track of all the tab information in the app.
     * @param _renderer The renderer so that this directive can access the DOM.
     * @param _element The element of this directive that represents the DOM element.
     * @param _context The context that should be used for this directive.
     */
    constructor(private _service: TabService, private _renderer: Renderer2, private _element: ElementRef, @Optional() private _context: TabContextDirective) {
        this._service.addTab(this);
    }

    /**
     * Extra functionallity that needs to be processed so this directive is cleaned up before being destoryed.
     */
    ngOnDestroy() {
        this._service.removeTab(this);
    }

    /**
     * Method is meant to put the directive into the hidden state.
     */
    hideTab() {
        this._renderer.removeClass(this._element.nativeElement, "active");
    }

    /**
     * Method is meant to put the directive into the visible state.
     */
    showTab() {
        this._renderer.addClass(this._element.nativeElement, "active");
        this.onVisible.emit(true);
    }
}
