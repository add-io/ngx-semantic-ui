/**
 * Created by bradleybrandon on 4/22/17.
 */
import { Directive, Input, ElementRef, Renderer, HostListener } from "@angular/core";
import { SidebarService } from "./sidebar.service";
import { SidebarDirective } from "./sidebar.directive";

@Directive({ selector: "[sidebarContext]" })
export class SidebarContextDirective {

    /**
     * The name of this context.
     */
    @Input("sidebarContext") name: string;

    /**
     * If this context should use history when triggering sidebars.
     */
    @Input("history") history: boolean|string|number;

    /**
     * Getter that will determine if we need to track the history.
     */
    get trackHistory(): boolean {
        return this.history === "true"
            || this.history === true
            || this.history === "1"
            || this.history === 1;
    }
}
