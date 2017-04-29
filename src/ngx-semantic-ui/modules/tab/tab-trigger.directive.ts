import { Directive, Input, ElementRef, Renderer2, HostListener, Optional, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";
import { TabService } from "./tab.service";
import { TabContextDirective } from "./tab-context.directive";

@Directive({ selector: "[data-tab]:not(.ui.tab)" })
export class TabTriggerDirective implements OnDestroy, OnInit {

    /**
     * The subscription if we are needing to watch the location for state changes.
     */
    private subscription: Subscription;
    /**
     * The path that this trigger should open.
     */
    @Input("tab") path: string;
    /**
     * The class of this trigger.
     */
    @Input("class") klass: string;
    /**
     * Getter to process the context if one exists, if not the "global-context" is used.
     */
    get context(): string {
        return this._context == null ? "global-context" : this._context.name;
    }
    /**
     * Getter to determine if this directive needs to track the history.
     */
    get hasHistory(): boolean {
        return this._context !== null && this._context.trackHistory;
    }
    /**
     * Getter to determine if this directive is a default tab that should be used when a parent of the path is chosen.
     */
    get isDefault(): boolean {
        return this.klass.indexOf("active") > -1;
    }

    /**
     * The constructor of the directive will inject various services into itself for use.
     *
     * @param _service The tab service which keeps track of all the tab information in the app.
     * @param _renderer The renderer so that this directive can access the DOM.
     * @param _element The element of this directive that represents the DOM element.
     * @param _context The context that should be used for this directive.
     * @param _location The location service to get where in the application this directive is.
     */
    constructor(
        private _service: TabService,
        private _renderer: Renderer2,
        private _element: ElementRef,
        @Optional() private _context: TabContextDirective,
        private _location: Location
    ) {
        this._service.addTrigger(this);
    }

    /**
     * Method will deal with processing when the user clicks on this element.
     *
     * @param event The mouse object that triggered this click event.
     */
    @HostListener("click", ["$event"])
    click(event: MouseEvent) {
        this._service.showTab(this.path, this.context);

        if (this.hasHistory) { // Deal with having to track this history.
            let path = this._location.path();
            if (path.indexOf("tabPath=") > -1) { // If the url already has tab information in it all we need to do is replace it with this directives information.
                path = path.replace(/tabContext\=[^\&]+/, "tabContext=" + this.context);
                this._location.go(path.replace(/tabPath\=[^\&]+/, "tabPath=" + this.path));
            } else { // If we are dealing with a fresh URL.
                this._location.go(this._location.path(), "tabPath=" + this.path + "&tabContext=" + this.context);
            }
        }
    }

    /**
     * Extra functionallity that needs to be processed when this directive is initialized.
     */
    ngOnInit() {
        setTimeout(() => {
            // Set a timeout becase some of the child elements still need to be processed by the event queue.
            if (this.hasHistory) {
                this.processUrl(this._location.path());

                this.subscription = <Subscription>this._location.subscribe((value) => {
                    this.processUrl(value.url);
                });
            }
        }, 0);
    }

    /**
     * Extra functionallity that needs to be processed so this directive is cleaned up before being destoryed.
     */
    ngOnDestroy() {
        if (this.subscription != null) {
            this.subscription.unsubscribe();
        }
        this._service.removeTrigger(this);
    }

    /**
     * Method is meant to put the directive into the hidden state.
     */
    hideTrigger() {
        this._renderer.removeClass(this._element.nativeElement, "active");
    }

    /**
     * Method is meant to put the directive into the visible state.
     */
    showTrigger() {
        this._renderer.addClass(this._element.nativeElement, "active");
    }

    /**
     * Helper method that will trigger the correct tabs so that everything is showing correctly.
     *
     * @param url The current url we are sitting on that needs to be processed to show the correct tab when navigating back to this page.
     */
    private processUrl(url: string) {
        let pathMatches = url.match(/tabPath\=[^\&]+/);
        if (pathMatches !== null && pathMatches.length > 0) {
            // Calculate the context and the path and compare it to this subscription information before triggering the paths.
            let contextMatches = url.match(/tabContext\=[^\&]+/)

            let context = contextMatches[0].replace("tabContext=", "");
            let path = pathMatches[0].replace("tabPath=", "");
            if (path === this.path && context === this.context) {
                this._service.showTab(this.path, this.context);
            }
        } else if (this.isDefault && this.path.split("/").length === 1) { // If the path data is not found we need to trigger the defaults for the tabs
            this._service.showTab(this.path, this.context);
        }
    }
}
