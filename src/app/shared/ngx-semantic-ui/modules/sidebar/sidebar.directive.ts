/**
 * Created by bradleybrandon on 4/22/17.
 */
import { Directive, Input, Output, Renderer, ElementRef, Optional, EventEmitter, OnDestroy } from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { SidebarContextDirective } from "./sidebar-context.directive";

@Directive({ selector: ".ui.sidebar" })
export class SidebarDirective implements OnDestroy {

    /**
     * The path for this sidebar.
     */
    @Input("sidebar") path: string;
    /**
     * The class of this sidebar.
     */
    @Input("class") klass: string;
    /**
     * Event that is triggered once this sidebar is visible.
     */
    @Output("visible") onVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Getter to process the context if one exists, if not the "global-context" is used.
     */
    get context(): string {
        return this._context == null ? "global-context" : this._context.name;
    }
    /**
     * Getter to determine if this directive is a default sidebar that should be used when a parent of the path is chosen.
     */
    get isDefault(): boolean {
        return this.klass.indexOf("active") > -1;
    }

    /**
     *
     * @param _service The sidebar service which keeps track of all the sidebar information in the app.
     * @param _renderer The renderer so that this directive can access the DOM.
     * @param _element The element of this directive that represents the DOM element.
     * @param _context The context that should be used for this directive.
     */
    constructor(private _service: SidebarService, private _renderer: Renderer, private _element: ElementRef, @Optional() private _context: SidebarContextDirective) {
        this._service.addSidebar(this);
    }

    /**
     * Extra functionallity that needs to be processed so this directive is cleaned up before being destoryed.
     */
    ngOnDestroy() {
        this._service.removeSidebar(this);
    }

    /**
     * Method is meant to put the directive into the hidden state.
     */
    hideSidebar() {
        this._renderer.setElementClass(this._element.nativeElement, "active", false);
    }

    /**
     * Method is meant to put the directive into the visible state.
     */
    showSidebar() {
        this._renderer.setElementClass(this._element.nativeElement, "active", true);
        this.onVisible.emit(true);
    }
}
